(() => {
  'use strict';

  const goals = ['参加比赛', '做出作品', '加入开源', '体验科研', '认识社区'];
  const contestModes = [
    {key: 'all', label: '全部赛制'},
    {key: 'solo', label: '可单人参加', formats: ['个人赛', '个人或组队', '可单人组队']},
    {key: 'team', label: '可组队参加', formats: ['团队赛', '个人或组队', '可单人组队']}
  ];
  const groups = window.TopicGuide;
  const topicGroupsByName = new Map(groups.flatMap(group => group.topics.map(([name]) => [name, group.id])));
  const atlas = () => window.Atlas;
  const safe = (value) => atlas().esc(String(value ?? ''));
  const root = () => document.getElementById('app');

  function hashParams() {
    const hash = location.hash.slice(1);
    const index = hash.indexOf('?');
    return new URLSearchParams(index === -1 ? '' : hash.slice(index + 1));
  }

  function remember(params) {
    const base = location.hash.split('?')[0];
    const suffix = params.toString();
    const hash = base + (suffix ? '?' + suffix : '');
    if (hash === location.hash) return;
    // This also allows the complete filter state to be copied as a link.
    try {
      history.replaceState(history.state, '', hash);
      window.dispatchEvent(new Event('atlas:view-query'));
    }
    catch { /* Browsers can restrict history writes when opened from disk. */ }
  }

  function topicURL(label) {
    return 'index.html#topic/' + encodeURIComponent(label);
  }

  function selectOptions(values, current, placeholder) {
    return '<option value="">' + safe(placeholder) + '</option>' +
      values.map(v => '<option value="' + safe(v) + '"' + (current === v ? ' selected' : '') + '>' + safe(v) + '</option>').join('');
  }

  function sectionHeading(title, extra = '') {
    return '<div class="section-heading section-head"><div class="heading-copy"><h2 class="section-title">' +
      safe(title) + '</h2></div>' + extra + '</div>';
  }

  function intro(title, body, context = '') {
    return '<header class="page-intro">' + (context ? '<p class="eyebrow">' + context + '</p>' : '') +
      '<h1>' + safe(title) + '</h1>' + (body ? '<p>' + safe(body) + '</p>' : '') + '</header>';
  }

  function cardList(items) {
    return '<div class="opportunity-grid">' + items.map(item => atlas().card(item)).join('') + '</div>';
  }

  function topicGroups() {
    return groups.map(group => '<article class="topic-group" data-color="' + group.id + '">' +
      '<header class="topic-group-title"><span class="topic-icon" data-icon="' + group.id + '" aria-hidden="true"></span>' +
      '<h3>' + safe(group.name) + '</h3></header><div class="topic-links">' +
      group.topics.map(([t]) => '<a href="' + topicURL(t) + '">' + safe(t) + '</a>').join('') +
      '</div></article>').join('');
  }

  function home() {
    const app = root();
    app.replaceChildren(document.getElementById('home-hero').content.cloneNode(true));
    const items = atlas().items();
    const featured = ['ospp', 'db-contest', 'swift-student-challenge', 'tableau-iron-viz', 'gsoc', 'fields-lean']
      .map(id => items.find(item => item.id === id)).filter(Boolean);
    app.insertAdjacentHTML('beforeend', '<section class="section" id="interests">' +
      sectionHeading('按兴趣找机会', '<a class="text-link" href="index.html#map">打开成长地图</a>') +
      '<div class="topic-grid">' + topicGroups() + '</div></section>' +
      '<div class="section home-overview"><section class="home-classics">' +
      sectionHeading('先认识这些经典活动', '<a class="text-link" href="index.html#browse">查看活动索引</a>') +
      '<p class="home-classics-intro">从一次开源贡献、一场比赛或一个暑研课题，看看自己想尝试哪种参与方式。</p>' +
      cardList(featured) + '</section>' + officialNodes(items, true) + '</div>');
  }

  function nameOfStatus(item) {
    const status = atlas().status(item);
    return typeof status === 'string' ? status : status?.label || status?.text || '';
  }

  function wordsFor(item) {
    return [item.id, item.title, item.parent, item.kind, item.region, item.summary, item.audience, item.edition,
      item.entry, item.contestFormat, item.team, ...(item.topics || []), ...(item.goals || []), ...(item.aliases || []), nameOfStatus(item)].join(' ').toLowerCase();
  }

  function empty(message, body, actions = '') {
    return '<div class="empty-state"><h3>' + safe(message) + '</h3><p>' + safe(body) + '</p>' + actions + '</div>';
  }

  function officialNodes(items, onHome = false) {
    const now = new Date();
    let upcoming = atlas().upcoming(items, now);
    if (onHome) {
      const horizon = now.getTime() + 90 * 24 * 60 * 60 * 1000;
      const enrollmentRank = ({event}) =>
        (event.kind === 'deadline' || event.kind === 'opens') && Date.parse(event.start) <= horizon ? 0 : 1;
      upcoming.sort((a, b) => enrollmentRank(a) - enrollmentRank(b));
      const seen = new Set();
      upcoming = upcoming.filter(({item}) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
    }
    // Several tracks can share one official deadline. Keep their individual links under that date.
    const announcements = new Map();
    for (const node of upcoming) {
      const event = node.event;
      const key = onHome && event.deadlineGroup
        ? JSON.stringify([event.deadlineGroup, event.kind, event.start, event.scope || ''])
        : node;
      if (!announcements.has(key)) announcements.set(key, []);
      announcements.get(key).push(node);
    }
    const rows = [...announcements.values()].slice(0, 5).map(nodes => {
      const {item, event} = nodes[0];
      const scope = event.scope ? ' · ' + safe(event.scope) : '';
      let body;
      if (nodes.length > 1) {
        const tracks = nodes.map(({item: track}) => '<a class="text-link" href="' +
          safe(atlas().detailURL(track)) + '">' + safe(track.title) + '</a>');
        body = '<strong>' + safe(event.deadlineGroup) + '</strong>' + scope + '<p>' + tracks.join(' / ') + '</p>';
      } else {
        body = '<a class="text-link" href="' + safe(atlas().detailURL(item)) + '">' + safe(event.title) +
          '</a><p>' + safe(item.title) + scope + '</p>';
      }
      return '<li class="update-row"><time datetime="' + safe(event.start) + '">' +
        safe(atlas().dateLabel(event)) + '</time><div>' + body + '</div></li>';
    }).join('');
    return '<aside class="topic-aside" aria-label="' + (onHome ? '近期节点' : '本方向近期节点') + '"><h2>近期节点</h2>' +
      (rows ? '<ul class="update-list">' + rows + '</ul>' :
        '<p>暂未收录' + (onHome ? '' : '本方向') + '已官宣的后续日期。可以先了解经典活动，试试往届题目。</p>') + '</aside>';
  }

  function filters(items, scope) {
    const p = hashParams();
    const kinds = [...new Set(items.map(i => i.kind).filter(Boolean))];
    const regions = [...new Set(items.map(i => i.region).filter(Boolean))];
    const topicNames = groups.flatMap(group => group.topics.map(entry => entry[0]));
    const kind = kinds.includes(p.get('kind')) ? p.get('kind') : '';
    const region = regions.includes(p.get('region')) ? p.get('region') : '';
    const topic = topicNames.includes(p.get('topic')) ? p.get('topic') : '';
    const search = p.get('q') || '';
    const markup = '<div class="filterbar"><label class="filter-search"><span>关键词</span><input type="search" name="q" placeholder="搜索活动、组织或关键词" value="' +
      safe(search) + '"></label>' +
      '<label><span>活动类型</span><select name="kind">' + selectOptions(kinds, kind, '全部类型') + '</select></label>' +
      (scope === 'browse' ? '<label><span>兴趣方向</span><select name="topic">' + selectOptions(topicNames, topic, '全部方向') + '</select></label>' : '') +
      '<label><span>来源范围</span><select name="region">' + selectOptions(regions, region, '全部范围') + '</select></label></div>';
    return markup;
  }

  function bindCatalog(items) {
    const app = root();
    const bar = app.querySelector('.filterbar');
    const results = app.querySelector('[data-explore-results]');
    const count = app.querySelector('[data-explore-count]');
    const query = bar.querySelector('[name=q]');
    const kind = bar.querySelector('[name=kind]');
    const region = bar.querySelector('[name=region]');
    const topic = bar.querySelector('[name=topic]');
    const reset = app.querySelector('[data-filter-clear]');

    function refresh(writeURL) {
      const search = query.value.trim();
      const parts = search.toLowerCase().split(/\s+/).filter(Boolean);
      const active = Boolean(search || kind.value || region.value || topic?.value);
      reset.hidden = !active;
      const matched = items.filter(item =>
        (!kind.value || item.kind === kind.value) &&
        (!region.value || item.region === region.value) &&
        (!topic?.value || item.topics?.includes(topic.value)) &&
        (!parts.length || parts.every(p => wordsFor(item).includes(p)))
      );
      count.textContent = '共 ' + matched.length + ' 项';
      if (matched.length) results.innerHTML = cardList(matched);
      else if (items.length) results.innerHTML = empty('暂时没有匹配的机会', '换个关键词或清除筛选，再看看其他类型。',
        '<button class="btn btn-paper" type="button" data-empty-reset>清除筛选</button>');
      else results.innerHTML = empty('这个方向正在补充', '你可以先看下面的入门路径，也可以推荐你了解的活动。',
        '<a class="btn btn-paper" href="index.html#feedback">推荐一个活动</a>');
      if (writeURL) {
        const params = new URLSearchParams();
        for (const [key, val] of [['q', search], ['kind', kind.value], ['region', region.value], ['topic', topic?.value]]) {
          if (val) params.set(key, val);
        }
        remember(params);
      }
    }

    function clear() {
      query.value = ''; kind.value = ''; region.value = '';
      if (topic) topic.value = '';
      refresh(true);
      query.focus();
    }

    reset.addEventListener('click', clear);
    results.addEventListener('click', evt => { if (evt.target.closest('[data-empty-reset]')) clear(); });
    query.addEventListener('input', () => refresh(true));
    bar.addEventListener('change', evt => {
      if (evt.target.tagName === 'SELECT') refresh(true);
    });
    refresh(false);
  }

  function resultBox(title) {
    return '<div class="result-header"><h2 id="explore-results-title">' + safe(title) +
      '</h2><span class="result-count" data-explore-count role="status"></span>' +
      '<button type="button" class="text-link" data-filter-clear hidden>清除筛选</button></div>' +
      '<div data-explore-results aria-labelledby="explore-results-title"></div>';
  }

  function relatedTopics(group, topic) {
    const available = group.topics.map(entry => entry[0]).filter(name => name !== topic &&
      atlas().items().some(item => item.topics?.includes(name)));
    return available.length ? '<div class="related-topics"><h3>同组已收录的方向</h3><div class="topic-links">' +
      available.map(name => '<a href="' + topicURL(name) + '">' + safe(name) + '</a>').join('') + '</div></div>' : '';
  }

  function topicPath(group, topicEntry, items) {
    const [name, beginner, practice] = topicEntry;
    const trial = items.find(item => item.try?.url && item.topics?.[0] === name && item.contestFormat === '个人赛') ||
      items.find(item => item.try?.url && item.topics?.[0] === name) ||
      items.find(item => item.try?.url);
    const next = items.find(item => item.goals?.some(g => ['加入开源', '体验科研', '参加比赛'].includes(g))) || items[0];
    const link = trial ? '<a class="text-link" href="' + safe(trial.try.url) +
      '" target="_blank" rel="noopener noreferrer">' + safe(trial.try.label) + '</a>' : '';
    const advanced = next ? '<p>读一项真实机会的参与条件、时间与交付要求，再对照自己的安排。</p><a class="text-link" href="' +
      safe(atlas().detailURL(next)) + '">' + safe(next.title) + '</a>' : '<p>试试相邻方向，或按自己想获得的体验筛选其他机会。</p>' +
      '<a class="text-link" href="index.html#map">看看成长地图</a>';
    return '<section class="section path-section">' + sectionHeading(name + '怎么起步') + '<ol class="path-list">' +
      '<li class="path-step"><h3>先认识</h3><p>' + safe(beginner) + '</p></li>' +
      '<li class="path-step"><h3>动手试</h3><p>' + safe(practice) + '</p>' + link + '</li>' +
      '<li class="path-step"><h3>选机会</h3>' + advanced + '</li></ol>' +
      (items.length ? '' : relatedTopics(group, name)) + '</section>';
  }

  function topicPage(name) {
    const group = groups.find(g => g.topics.some(entry => entry[0] === name));
    if (!group) {
      root().innerHTML = intro('未找到这个方向', '可以回到兴趣分类，选择已收录的方向。') +
        '<a class="btn btn-primary" href="index.html#home">查看兴趣方向</a>';
      return;
    }
    const entry = group.topics.find(row => row[0] === name);
    const items = atlas().items().filter(item => item.topics?.includes(name));
    const catalog = items.length ? filters(items, 'topic') + resultBox('经典活动与项目') :
      empty('这个方向正在补充', '可以先看下方的入门路径，或推荐一项有官方出处的活动。',
        '<a class="btn btn-paper" href="index.html#feedback">推荐一个活动</a>');
    root().innerHTML = intro(name, '', '<a href="index.html#home">兴趣方向</a> / ' + safe(group.name)) +
      '<div class="topic-layout"><div class="topic-main">' + catalog +
      topicPath(group, entry, items) + '</div>' + officialNodes(items) + '</div>';
    if (items.length) bindCatalog(items);
  }

  function browse() {
    const items = atlas().items();
    const bar = filters(items, 'browse');
    root().innerHTML = intro('活动索引', '按活动类型、兴趣方向或名称，查找参与方式与官方入口。') +
      bar + resultBox('全部机会');
    bindCatalog(items);
  }

  // Cycle through each contest's primary interest; cross-listed entries still appear under every matching filter.
  function mixContestDirections(rows) {
    const buckets = new Map();
    for (const row of rows) {
      const id = topicGroupsByName.get(row.item.topics?.[0]);
      if (!buckets.has(id)) buckets.set(id, []);
      buckets.get(id).push(row);
    }
    const mixed = [];
    for (let index = 0; mixed.length < rows.length; index++) {
      for (const bucket of buckets.values()) {
        if (index < bucket.length) mixed.push(bucket[index]);
      }
    }
    return mixed;
  }

  function mapPage() {
    const params = hashParams();
    // Keep saved links to the former team-competition goal usable.
    const linkedGoals = params.getAll('goal').map(goal => goal === '组队参赛' ? '参加比赛' : goal);
    const selected = new Set(linkedGoals.filter(goal => goals.includes(goal)));
    let mode = contestModes.find(option => option.key === params.get('format')) || contestModes[0];
    const contestTopics = new Set(atlas().items().filter(item => item.kind === '竞赛').flatMap(item => item.topics || []));
    const contestGroups = groups.filter(group => group.topics.some(([name]) => contestTopics.has(name)));
    let groupId = contestGroups.find(group => group.id === params.get('group'))?.id || '';
    const app = root();
    const goalButtons = goals.map(goal => '<button type="button" class="choice-chip" data-choice="' + safe(goal) +
      '" aria-pressed="false">' + safe(goal) + '</button>').join('');
    const modeButtons = contestModes.map(option => '<button type="button" class="choice-chip" data-format="' + option.key +
      '" aria-pressed="false">' + safe(option.label) + '</button>').join('');
    const groupButtons = [{id: '', name: '全部方向'}, ...contestGroups].map(group =>
      '<button type="button" class="choice-chip" data-group="' + safe(group.id) +
      '" aria-pressed="false">' + safe(group.name) + '</button>').join('');
    app.innerHTML = intro('成长地图', '可以选择多个目标，同时符合更多目标的活动会排在前面。') +
      '<div class="map-options"><fieldset class="option-group"><legend>我想做什么</legend><div class="chip-row">' +
      goalButtons + '</div></fieldset><fieldset class="option-group" data-contest-modes hidden><legend>参赛方式</legend>' +
      '<div class="chip-row">' + modeButtons + '</div></fieldset>' +
      '<fieldset class="option-group" data-contest-groups hidden><legend>竞赛方向</legend><div class="chip-row">' +
      groupButtons + '</div></fieldset></div>' +
      '<div class="result-header"><h2 id="map-results-title">探索建议</h2><span class="result-count" role="status" data-map-count></span>' +
      '<button type="button" class="text-link" data-map-clear>重置选择</button></div><div data-map-results aria-labelledby="map-results-title"></div>';
    const result = app.querySelector('[data-map-results]');
    const count = app.querySelector('[data-map-count]');
    const reset = app.querySelector('[data-map-clear]');
    const formatControls = app.querySelector('[data-contest-modes]');
    const groupControls = app.querySelector('[data-contest-groups]');

    function redraw() {
      const contestsOnly = selected.size === 1 && selected.has('参加比赛');
      if (!contestsOnly) {
        mode = contestModes[0];
        groupId = '';
      }
      formatControls.hidden = !contestsOnly;
      groupControls.hidden = !contestsOnly;
      reset.hidden = !selected.size;
      for (const button of app.querySelectorAll('[data-choice]')) {
        button.setAttribute('aria-pressed', String(selected.has(button.dataset.choice)));
      }
      for (const button of formatControls.querySelectorAll('[data-format]')) {
        button.setAttribute('aria-pressed', String(mode.key === button.dataset.format));
      }
      for (const button of groupControls.querySelectorAll('[data-group]')) {
        button.setAttribute('aria-pressed', String(groupId === button.dataset.group));
      }
      const query = new URLSearchParams();
      for (const goal of selected) query.append('goal', goal);
      if (mode.formats) query.set('format', mode.key);
      if (groupId) query.set('group', groupId);
      remember(query);

      if (!selected.size) {
        count.textContent = '';
        result.innerHTML = empty('你想先尝试什么？', '想做一个应用、用数据解释问题，或亲手设计芯片？选择上方目标，也可以从熟悉的技术方向开始。',
          '<a class="btn btn-paper" href="index.html#home">浏览兴趣方向</a>');
        return;
      }
      let ranked = atlas().items().map(item => {
        const hits = [...selected].filter(goal => (goal === '参加比赛' && item.kind === '竞赛') || item.goals?.includes(goal));
        return {item, hits};
      }).filter(({item, hits}) => hits.length &&
        (!mode.formats || mode.formats.includes(item.contestFormat)) &&
        (!groupId || item.topics?.some(topic => topicGroupsByName.get(topic) === groupId)))
        .sort((a, b) => b.hits.length - a.hits.length ||
          (contestsOnly ? Number(b.item.contestFormat === '个人赛') - Number(a.item.contestFormat === '个人赛') : 0));
      if (contestsOnly && !groupId) ranked = mixContestDirections(ranked);
      count.textContent = '匹配 ' + ranked.length + ' 项';
      if (!ranked.length) {
        result.innerHTML = empty('暂时没有匹配的机会', contestsOnly ? '可以保留参赛方式，切换到「全部方向」，或保留方向查看「全部赛制」。' : '试试另一个目标，或从兴趣方向继续找。');
        return;
      }
      const matchedTopics = new Set(ranked.flatMap(row => row.item.topics || []));
      const directions = contestsOnly ? [] : [...topicGroupsByName.keys()].filter(topic => matchedTopics.has(topic));
      const links = directions.map(name => '<a href="' + topicURL(name) + '">' + safe(name) + '</a>').join('');
      const cards = selected.size === 1 ? cardList(ranked.map(({item}) => item)) :
        '<div class="opportunity-grid map-matches">' + ranked.map(({item, hits}) =>
          '<div class="map-match"><div class="match-explain"><span>符合目标 · ' + safe(hits.join('、')) +
          '</span></div>' + atlas().card(item) + '</div>').join('') + '</div>';
      result.innerHTML = (links ? '<section class="map-directions"><h3>相关兴趣方向</h3><div class="topic-links">' +
        links + '</div></section>' : '') + cards;
    }

    app.querySelector('.map-options').addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.choice) {
        const goal = button.dataset.choice;
        if (selected.has(goal)) selected.delete(goal);
        else selected.add(goal);
      } else if (button.dataset.format) {
        mode = contestModes.find(option => option.key === button.dataset.format);
      } else if (button.dataset.group !== undefined) {
        groupId = button.dataset.group;
      } else return;
      redraw();
    });
    reset.addEventListener('click', () => {
      selected.clear();
      redraw();
      app.querySelector('[data-choice]').focus();
    });
    redraw();
  }

  window.Explore = {
    render(route, param = '') {
      switch (route) {
        case 'home': home(); break;
        case 'browse': browse(); break;
        case 'topic': topicPage(param); break;
        case 'map': mapPage(); break;
      }
    }
  };
})();
