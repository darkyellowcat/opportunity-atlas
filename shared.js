// Shared catalog, personal lists and calendar exports for every static page.
(() => {
  'use strict';

  function items() {
    return [window.ATLAS_PROGRAMS, window.ATLAS_ADDITIONS, window.ATLAS_EXTRA].flatMap(group => Array.isArray(group) ? group : []);
  }

  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => entities[char]);
  const detailURL = item => 'opportunities/' + encodeURIComponent(item.id) + '.html';

  const keys = { saved: 'opportunity-atlas.saved.v1', compared: 'opportunity-atlas.compared.v1' };
  const memory = { saved: [], compared: [] };
  let persistent = true;

  // Storage may be disabled by the browser, even when a localStorage property exists.
  function readList(kind) {
    let raw;
    if (persistent) {
      try { raw = window.localStorage.getItem(keys[kind]); }
      catch { persistent = false; }
    }
    if (!persistent) return memory[kind].slice();
    let decoded;
    try { decoded = raw ? JSON.parse(raw) : []; }
    catch { decoded = []; }
    const valid = new Set(items().map(item => item.id));
    const values = Array.isArray(decoded) ? decoded.filter(id => typeof id === 'string' && valid.has(id)) : [];
    const unique = [...new Set(values)];
    memory[kind] = kind === 'compared' ? unique.slice(0, 3) : unique;
    return memory[kind].slice();
  }

  function notifyState(kind, id, external) {
    window.dispatchEvent(new CustomEvent('atlas:state', { detail: { kind, id, external } }));
  }

  function toggle(kind, id) {
    if (!items().some(item => item.id === id)) {
      return { ok: false, active: false, message: '未找到这项活动。', persistent };
    }
    const list = readList(kind);
    const active = !list.includes(id);
    if (kind === 'compared' && active && list.length >= 3) {
      return { ok: false, active: false, message: '最多对比 3 项，请先移除一项。', persistent };
    }
    memory[kind] = active ? [...list, id] : list.filter(entry => entry !== id);
    if (persistent) {
      try { window.localStorage.setItem(keys[kind], JSON.stringify(memory[kind])); }
      catch { persistent = false; }
    }
    const label = kind === 'saved' ? '收藏' : '对比';
    let message = active ? '已加入' + label + '。' : '已移出' + label + '。';
    if (!persistent) message += '浏览器限制了本地存储，当前选择仅保留到离开此页。';
    notifyState(kind, id, false);
    return { ok: true, active, message, persistent };
  }

  window.addEventListener('storage', event => {
    const kind = Object.keys(keys).find(key => keys[key] === event.key);
    if (!kind && event.key !== null) return;
    if (kind) readList(kind);
    else { readList('saved'); readList('compared'); }
    notifyState(kind || 'all', null, true);
  });

  const allDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
  const timed = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
  const dateFields = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatters = new Map();

  function localDay(instant, zone) {
    const key = zone || 'local';
    try {
      if (!formatters.has(key)) formatters.set(key, new Intl.DateTimeFormat('en-CA', { ...dateFields, ...(zone ? { timeZone: zone } : {}) }));
      const parts = Object.fromEntries(formatters.get(key).formatToParts(instant).map(p => [p.type, p.value]));
      return parts.year + '-' + parts.month + '-' + parts.day;
    } catch {
      return new Date(instant).toISOString().slice(0, 10);
    }
  }

  function validDay(value) {
    return allDay(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  }

  function datePassed(value, event, now) {
    if (validDay(value)) return localDay(now, event.timezone) > value;
    return timed(value) && now.getTime() >= Date.parse(value);
  }

  function dateStarted(value, event, now) {
    if (validDay(value)) return localDay(now, event.timezone) >= value;
    return timed(value) && now.getTime() >= Date.parse(value);
  }

  function dateLabel(event) {
    if (!event?.start) return '';
    const display = date => {
      if (validDay(date)) return date;
      if (!timed(date)) return '';
      const match = date.match(/^(\d{4}-\d\d-\d\d)T(\d\d:\d\d)(?::\d\d(?:\.\d+)?)?(Z|[+-]\d\d:\d\d)$/);
      const local = match[1] + ' ' + match[2];
      if (match[3] === '+08:00') return local + ' 北京时间';
      const offset = match[3] === 'Z' ? 'UTC' : 'UTC' + match[3];
      const zone = event.timezone === 'America/New_York' ? '美东时间 ' + offset : offset;
      const beijing = new Date(Date.parse(date) + 8 * 3600000).toISOString().slice(0, 16).replace('T', ' ');
      return local + ' ' + zone + '（北京时间 ' + beijing + '）';
    };
    const first = display(event.start);
    if (!first) return '';
    const last = event.end && event.end !== event.start ? display(event.end) : '';
    return last ? first + ' 至 ' + last : first;
  }

  const finalStatus = /已中选|已公布中选|已有中选|已截止|已结束|已关闭|已满额|已录满|已归档|已完成|已停止|已收官|已选定|已选出/;

  function status(item, now = new Date()) {
    const declared = item.status || '查看官方安排';
    if (finalStatus.test(declared)) return declared;
    const events = (item.events || []).filter(event => (!event.scope || event.overall === true) && dateLabel(event));
    // Only the whole program's time span may retire its card; individual rounds cannot.
    const period = events.find(e => e.overall === true && e.kind === 'event');
    if (period && datePassed(period.end || period.start, period, now)) return '本届已结束';
    const lastDeadline = events.filter(e => e.kind === 'deadline').sort((a, b) => Date.parse(b.start) - Date.parse(a.start))[0];
    if (lastDeadline && datePassed(lastDeadline.start, lastDeadline, now)) return '本届申请已截止';
    const openings = events.filter(e => e.kind === 'opens');
    if (openings.length && !openings.some(e => dateStarted(e.start, e, now))) return '尚未开放申请';
    if (lastDeadline && openings.some(e => dateStarted(e.start, e, now))) return '申请进行中';
    return declared;
  }

  function upcoming(selection = items(), now = new Date()) {
    const result = [];
    for (const item of selection) {
      for (const event of item.events || []) {
        if (!dateLabel(event) || datePassed(event.end || event.start, event, now)) continue;
        if ((event.kind === 'opens' || event.kind === 'deadline') && finalStatus.test(item.status || '')) continue;
        result.push({ item, event });
      }
    }
    // A date without an official time is ordered as a day, with no hour shown to readers.
    return result.sort((a, b) => Date.parse(a.event.start) - Date.parse(b.event.start) || a.item.title.localeCompare(b.item.title, 'zh-CN'));
  }

  function card(item) {
    const id = esc(item.id);
    const saved = readList('saved').includes(item.id);
    const compared = readList('compared').includes(item.id);
    const tags = (item.topics || []).slice(0, 3).map(t => '<span>' + esc(t) + '</span>').join('');
    const practice = item.try;
    const practiceTitle = esc('先试一下：' + (practice?.label || item.title) + '（在新标签页打开）');
    const practiceLink = practice && /^https?:\/\/[^\s]+$/i.test(practice.url)
      ? '<a class="op-try" href="' + esc(practice.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + practiceTitle +
        '" title="' + practiceTitle + '">先试一下 <span aria-hidden="true">↗</span></a>' : '';
    return '<article class="op-card" data-kind="' + esc(item.kind) + '">' +
      '<div class="op-meta"><span class="badge op-kind">' + esc(item.contestFormat || item.kind) + '</span><span class="op-status">' + esc(status(item)) + '</span></div>' +
      '<h3 class="op-name"><a href="' + esc(detailURL(item)) + '">' + esc(item.title) + '</a></h3>' +
      (item.parent && item.parent !== item.title ? '<p class="op-parent">' + esc(item.parent) + '</p>' : '') +
      '<p class="op-summary">' + esc(item.summary) + '</p>' +
      '<div class="tag-list"><span>' + esc(item.region) + '</span>' + tags + '</div>' +
      '<div class="op-actions">' + practiceLink +
      '<button type="button" class="btn btn-quiet" data-action="save" data-id="' + id + '" aria-pressed="' + saved + '">' + (saved ? '已收藏' : '收藏到本机') + '</button>' +
      '<button type="button" class="btn btn-quiet" data-action="compare" data-id="' + id + '" aria-pressed="' + compared + '">' + (compared ? '已加入对比' : '加入对比') + '</button>' +
      '</div></article>';
  }

  // RFC 5545 all-day DTEND is exclusive; the publisher's end date is inclusive.
  function nextDay(day) {
    const date = new Date(day + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  function utcStamp(value) {
    return new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z').replace(/[-:]/g, '');
  }

  function calendarEscape(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }

  // Each physical line is at most 75 octets, including the continuation space.
  function fold(line) {
    const encoder = new TextEncoder();
    let physical = '', bytes = 0;
    const lines = [];
    for (const char of line) {
      const size = encoder.encode(char).length;
      if (bytes + size > 75) {
        lines.push(physical);
        physical = ' ';
        bytes = 1;
      }
      physical += char;
      bytes += size;
    }
    lines.push(physical);
    return lines.join('\r\n');
  }

  function calendarText(item, event, now = new Date()) {
    if (!event || (!validDay(event.start) && !timed(event.start))) return '';
    const dayEvent = validDay(event.start);
    if (event.end && (dayEvent ? !validDay(event.end) : !timed(event.end))) return '';
    if (event.end && Date.parse(event.end) < Date.parse(event.start)) return '';
    // event.uid 冻结已发布事件的日历标识：之后修改 edition、标题或同一条目的其他场次，
    // 都不应改变它，否则学生重复导入同一节点会多出一条提醒。未给出时按条目与节点推导。
    const uid = event.uid
      ? event.uid.split('/').map(encodeURIComponent).join('/') + '@opportunity-atlas'
      : [item.id, item.edition, event.id || [event.kind, event.title, event.scope].filter(Boolean).join(':')].map(v => encodeURIComponent(v || '')).join('/') + '@opportunity-atlas';
    const title = [item.title, event.title, event.scope].filter(Boolean).join(' · ');
    const source = event.source || item.sources?.[0]?.url;
    const description = [item.edition, event.scope, '资料核验：' + item.checked, source].filter(Boolean).join('\n');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Opportunity Atlas//ZH', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + uid, 'DTSTAMP:' + utcStamp(now), 'SUMMARY:' + calendarEscape(title), 'DESCRIPTION:' + calendarEscape(description)];
    if (dayEvent) {
      lines.push('DTSTART;VALUE=DATE:' + event.start.replaceAll('-', ''), 'DTEND;VALUE=DATE:' + nextDay(event.end || event.start).replaceAll('-', ''));
    } else {
      lines.push('DTSTART:' + utcStamp(event.start));
      if (event.end && Date.parse(event.end) > Date.parse(event.start)) lines.push('DTEND:' + utcStamp(event.end));
    }
    if (typeof source === 'string' && /^https?:\/\/[^\s]+$/.test(source)) lines.push('URL:' + source);
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.map(fold).join('\r\n') + '\r\n';
  }

  function downloadCalendar(item, index) {
    const event = item.events?.[index];
    const content = calendarText(item, event);
    if (!content) return { ok: false, message: '此节点缺少可导出的官方日期。' };
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = item.id + '-' + event.start.slice(0, 10) + '.ics';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return { ok: true, message: '已导出日历文件。它记录本次日期，后续变动请查看官方通知。' };
  }

  window.Atlas = {
    items, esc, detailURL, card, status, upcoming, dateLabel, calendarText, downloadCalendar,
    saved: () => readList('saved'), compared: () => readList('compared'),
    toggleSave: id => toggle('saved', id), toggleCompare: id => toggle('compared', id),
    storageAvailable: () => { readList('saved'); return persistent; }
  };
})();
