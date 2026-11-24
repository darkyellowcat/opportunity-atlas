"""Report changes to official sources; the public catalog is never modified."""
import argparse
import concurrent.futures
from datetime import date, datetime, timedelta
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET
from zoneinfo import ZoneInfo


SHANGHAI = ZoneInfo("Asia/Shanghai")
BYTE_LIMIT = 4 * 1024 * 1024
SKIP_TAGS = {"script", "style", "nav", "footer", "noscript", "svg", "head", "template"}
SOURCES = Path(__file__).with_name("watch-sources.json")


class PageText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.main_parts = []
        self.links = []
        self.main_links = []
        self.skip = 0
        self.main = 0

    def record(self, data):
        self.parts.append(data)
        if self.main:
            self.main_parts.append(data)

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self.skip += 1
        if tag in {"article", "main"}:
            self.main += 1
        if tag == "a" and not self.skip:
            href = dict(attrs).get("href") or ""
            if href and not href.startswith(("#", "javascript:", "mailto:")):
                self.links.append(href)
                if self.main:
                    self.main_links.append(href)

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS:
            self.skip = max(0, self.skip - 1)
        if tag in {"article", "main"}:
            self.main = max(0, self.main - 1)

    def handle_data(self, data):
        if not self.skip:
            self.record(data)


def fingerprint(raw, media_type, charset):
    if media_type == "application/pdf" or raw.startswith(b"%PDF-"):
        return sha256(raw).hexdigest()
    if "xml" in media_type or raw.lstrip().startswith(b"<?xml"):
        root = ET.fromstring(raw)
        headlines = []
        for elem in root.iter():
            if elem.tag.split("}")[-1] in {"entry", "item"}:
                headlines.extend(" ".join(child.itertext()) + child.attrib.get("href", "")
                                 for child in elem if child.tag.split("}")[-1] in {"title", "link", "id", "guid"})
        if headlines:
            return sha256(" ".join(headlines).encode()).hexdigest()
    if not charset:
        declaration = re.search(rb"""<meta[^>]*charset\s*=\s*["']?([a-zA-Z0-9_-]+)""", raw[:8192], re.I)
        charset = declaration.group(1).decode("ascii") if declaration else "utf-8"
    decoded = raw.decode(charset, errors="replace")
    page = PageText()
    page.feed(decoded)
    visible = " ".join(" ".join(page.main_parts or page.parts).split())
    if len(visible) < 60 or re.search(r"just a moment\.\.\.|requires javascript|请开启javascript|doesn't work properly without javascript", visible[:300], re.I):
        raise ValueError("页面正文不可自动读取，请人工打开")
    links = page.main_links if page.main_parts else page.links
    return sha256((visible + "\n" + "\n".join(links)).encode()).hexdigest()


def inspect(url):
    request = Request(url, headers={"User-Agent": "OpportunityGuide-SourceWatch/1.0", "Accept-Encoding": "identity"})
    try:
        with urlopen(request, timeout=9) as response:
            raw = response.read(BYTE_LIMIT + 1)
            if len(raw) > BYTE_LIMIT:
                raise ValueError("超过巡查大小上限，请人工打开")
            value = fingerprint(raw, response.headers.get_content_type(), response.headers.get_content_charset())
            return value, ""
    except HTTPError as error:
        return None, f"HTTP {error.code}"
    except (OSError, URLError, ValueError, LookupError, ET.ParseError) as error:
        return None, str(error)[:160]


def update_source_state(old, result, today, checked):
    state = dict(old)
    if checked != old.get("checked"):
        state.pop("pending_change", None)
    state["checked"] = checked
    digest, error = result
    if digest:
        if checked == old.get("checked") and old.get("digest") and old["digest"] != digest:
            state["pending_change"] = today
        state.update(digest=digest, errors=0, last_ok=today)
        state.pop("error", None)
    else:
        # Re-running a failed job on the same day counts as one observation.
        new_day = state.get("last_run") != today or not state.get("errors")
        state["errors"] = state.get("errors", 0) + int(new_day)
        state["error"] = error
    state["last_run"] = today
    return state


def local_day(iso):
    if len(iso) == 10:
        return date.fromisoformat(iso)
    value = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    if value.tzinfo is None:
        raise ValueError(f"时间缺少时区 {iso}")
    return value.astimezone(SHANGHAI).date()


def select_urls(item, directory_sources):
    configured = list(item.get("watch") or directory_sources.get(item["id"], []))
    configured.extend(source["url"] for source in item["sources"][:1])
    return list(dict.fromkeys(url for url in configured if urlsplit(url).scheme == "https"))


def queue(items, inputs, observations, previous, today):
    state = {}
    tasks = []
    for item in items:
        title, item_id, checked = item["title"], item["id"], item["checked"]
        review_day = date.fromisoformat(checked)
        if review_day + timedelta(days=item.get("reviewDays") or 30) <= today:
            tasks.append((2, title, "到期复核", f"上次人工核验 {checked}", item["sources"][0]["url"]))
        for event in item["events"]:
            days = (local_day(event["start"]) - today).days
            if 0 <= days <= 7:
                note = event["title"] + (f"（{event['scope']}）" if event.get("scope") else "")
                tasks.append((1, title, "核对近期节点", f"{event['start']} · {note}", item["sources"][0]["url"]))
        for url in inputs[item_id]:
            key = f"{item_id}:{url}"
            current = update_source_state(previous.get(key, {}), observations[url], today.isoformat(), checked)
            state[key] = current
            if current.get("pending_change"):
                tasks.append((0, title, "官方内容有变化", f"最近发现于 {current['pending_change']}", url))
            if current["errors"] >= 2:
                tasks.append((1, title, "连续未能读取", f"{current['errors']} 次；{current['error']}", url))
    return state, sorted(set(tasks))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--items", type=Path, required=True)
    parser.add_argument("--directory", type=Path, required=True)
    args = parser.parse_args()
    now = datetime.now(SHANGHAI)
    items = json.loads(args.items.read_text("utf-8"))
    overrides = json.loads(SOURCES.read_text("utf-8"))
    inputs = {item["id"]: select_urls(item, overrides) for item in items}
    urls = sorted({url for group in inputs.values() for url in group})
    args.directory.mkdir(parents=True, exist_ok=True)
    state_file = args.directory / "state.json"
    old = json.loads(state_file.read_text("utf-8")) if state_file.exists() else {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        observations = dict(zip(urls, pool.map(inspect, urls)))
    state, tasks = queue(items, inputs, observations, old, now.date())
    temp = state_file.with_suffix(".tmp")
    temp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
    temp.replace(state_file)
    failures = sum(result[0] is None for result in observations.values())
    lines = ["# 机会路标 · 待核实清单", "",
             f"机器检查于 {now:%Y-%m-%d %H:%M}（北京时间），覆盖 {len(items)} 项、{len(urls)} 个来源。"
             f"本次有 {failures} 个来源未能自动读取。", ""]
    if not old:
        lines += ["本次建立比较基线；已收集的页面将在下次巡查时比较。", ""]
    if not tasks:
        lines.append("本次没有待处理项目。")
    for _, title, reason, note, url in tasks:
        lines.append(f"- **{title}** · {reason} · {note} · [打开官方来源](<{url}>)")
    lines += ["", "核对公告的届次、资格与日程后更新条目的 checked。报告中的机器检查时间只反映读取情况。"]
    (args.directory / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{len(items)} 项，{len(urls)} 个独立来源，{len(tasks)} 条待核实。")


if __name__ == "__main__":
    main()
