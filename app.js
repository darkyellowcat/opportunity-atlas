(() => {
  'use strict';
  const A = window.Atlas;
  const h = A.esc;
  const app = document.getElementById('app');
  const title = '机会路标';
  const subtitle = '给计算机学生的竞赛、科研与开源活动指南';
  const itemById = id => A.items().find(item => item.id === id);
  const link = (route, label, css = '') => '<a class="' + css + '" href="index.html#' + route + '">' + h(label) + '</a>';
  const topicLink = name => link('topic/' + encodeURIComponent(name), name, 'tag');
  let route = '';
  let param = '';
  let lastURL = '';
  let renderedDay = new Date().toDateString();
  let toastTimer;
  const decode = value => { try { return decodeURIComponent(value); } catch { return ''; } };
  const ext = (url, text, css = '') => {
    try {
      const dest = new URL(url);
      if (!['https:', 'http:'].includes(dest.protocol)) return '';
      return '<a class="' + css + '" href="' + h(dest.href) + '" target="_blank" rel="noopener noreferrer">' + h(text) + '</a>';
    } catch { return ''; }
  };

  function announce(message) {
    const el = document.getElementById('announcer');
    if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = message;
    el.hidden = false;
    el.classList.add('is-visible');
    toastTimer = setTimeout(() => {
      el.classList.remove('is-visible');
      el.textContent = '';
    }, 3400);
  }

  function selectionButton(kind, item) {
    const favorite = kind === 'save';
    const active = (favorite ? A.saved() : A.compared()).includes(item.id);
    const text = favorite ? (active ? '已收藏' : '收藏到本机') : (active ? '已加入对比' : '加入对比');
    return '<button type="button" class="btn btn-quiet" data-action="' + kind + '" data-id="' + h(item.id) + '" aria-pressed="' + active + '">' + text + '</button>';
  }

  function breadcrumb(current) {
    return '<nav class="crumbs" aria-label="当前位置">' + link('home', '首页') + '<span aria-hidden="true"> / </span><span>' + h(current) + '</span></nav>';
  }
  function head(name, description) {
    return '<header class="page-head"><h1>' + h(name) + '</h1><p>' + h(description) + '</p></header>';
  }
  function facts(item) {
    const rows = [['参与资格', item.audience], ['报名渠道', item.entry], ['个人 / 组队', item.team], ['时间投入', item.effort], ['产出与交付', item.delivery], ['参与方式', item.mode], ['费用与支持', item.cost]];
    return '<dl class="facts">' + rows.map(([k,v]) => '<div><dt>' + k + '</dt><dd>' + h(v || '官方未说明') + '</dd></div>').join('') + '</dl>';
  }
  function eventList(item) {
    if (!item.events.length) return '<p>本条暂未收录可导出的官方日期。</p>';
    return '<ul class="event-list">' + item.events.map((event, i) =>
      '<li><div><strong>' + h(event.title) + '</strong><br><time>' + h(A.dateLabel(event)) + '</time>' +
      (event.scope ? '<small> · ' + h(event.scope) + '</small>' : '') +
      '</div><button type="button" class="btn btn-quiet" data-action="calendar" data-id="' + h(item.id) + '" data-index="' + i + '">导出日历</button></li>'
    ).join('') + '</ul><p class="muted">日历文件记录导出时的安排，主办方调整后可重新导出。</p>';
  }

  function showDetail(item) {
    document.title = item.title + ' · ' + title;
    const related = A.items().filter(other => other.id !== item.id && other.topics.some(topic => item.topics.includes(topic)))
      .sort((a,b) => b.topics.filter(x => item.topics.includes(x)).length - a.topics.filter(x => item.topics.includes(x)).length).slice(0,2);
    const demo = item.try;
    app.innerHTML = breadcrumb('机会详情') +
      '<div class="reading-head page-head"><p class="eyebrow">' + h([item.kind, item.contestFormat, item.region].filter(Boolean).join(' · ')) + '</p><h1>' + h(item.title) + '</h1><p>' + h(item.parent) + ' · ' + h(item.edition) + '</p><div class="tag-list">' + item.topics.map(topicLink).join('') + '</div></div>' +
      '<div class="with-aside"><div><section class="panel"><h2>你会做什么</h2><p>' + h(item.summary) + '</p>' +
      '<div class="trial-panel"><h3>先试一下</h3><p>' + h(demo.note) + '</p>' + ext(demo.url, demo.label, 'btn btn-primary') + '</div></section>' +
      '<section class="panel"><h2>参与条件</h2>' + facts(item) + '</section>' +
      '<section class="panel"><h2>官方日程</h2>' + eventList(item) + '</section></div><aside class="sidebar-panel">' +
      '<section class="panel"><p class="eyebrow">本届状态</p><h2>' + h(A.status(item)) + '</h2><p>' + h(item.statusNote) + '</p><div class="action-row">' +
      selectionButton('save', item) + selectionButton('compare', item) + '</div></section>' +
      '<section class="panel"><h2>官方出处</h2><ul class="source-list">' + item.sources.map(s => '<li>' + ext(s.url, s.label) + '</li>').join('') +
      '</ul><p class="muted">人工核验于 ' + h(item.checked) + '</p>' + link('feedback/' + encodeURIComponent(item.id), '纠正这条信息', 'text-link') + '</section></aside></div>' +
      (related.length ? '<section class="section"><div class="section-head"><h2>看看同方向的机会</h2></div><div class="card-grid">' + related.map(i => A.card(i)).join('') + '</div></section>' : '');
  }

  function showSaved() {
    const items = A.saved().map(itemById).filter(Boolean);
    app.innerHTML = breadcrumb('我的收藏') + head('我的收藏', '留住值得回头看的机会。收藏记录保存在当前浏览器，换设备后需重新收藏。') +
      (!A.storageAvailable() ? '<p class="panel">当前环境未开放本地存储，本次选择只在这个页面会话中保留。</p>' : '') +
      (items.length ? '<div class="card-grid">' + items.map(i => A.card(i)).join('') + '</div>' :
      '<section class="empty-state"><h2>还没有收藏机会</h2><p>在活动卡上点「收藏」，之后就能在这里看它的项目说明和最新核验记录。</p>' + link('browse', '去找第一个机会', 'btn btn-primary') + '</section>');
  }

  function showCompare() {
    const items = A.compared().map(itemById).filter(Boolean);
    let body;
    if (!items.length) {
      body = '<section class="empty-state"><h2>先挑两项感兴趣的机会</h2><p>在列表或详情点「加入对比」，最多可以同时查看三项。</p>' + link('browse','去挑机会','btn btn-primary') + '</section>';
    } else {
      const rows = [['本届状态', i => A.status(i)], ['参与资格',i => i.audience], ['报名渠道',i => i.entry], ['个人 / 组队',i => i.team], ['时间投入',i => i.effort], ['产出与交付',i => i.delivery], ['参与方式',i => i.mode], ['费用与支持',i => i.cost], ['方向',i => i.topics.join('、')], ['人工核验',i => i.checked]];
      const cols = items.map(i => '<th scope="col"><a href="' + h(A.detailURL(i)) + '">' + h(i.title) + '</a><small>' + h(i.edition) + '</small><button class="text-link" data-action="compare" data-id="' + h(i.id) + '" aria-label="移除 ' + h(i.title) + '">移除</button></th>').join('');
      body = '<div class="action-row">' + (items.length < 3 ? link('browse','继续添加机会','btn btn-quiet') : '') + '</div><div class="table-scroll" role="region" tabindex="0" aria-label="活动对比表，可横向滚动"><table class="compare-table"><thead><tr><th scope="col">对比项目</th>' + cols + '</tr></thead><tbody>' +
        rows.map(([label,value]) => '<tr><th scope="row">' + label + '</th>' + items.map(i => '<td>' + h(value(i) || '官方未说明') + '</td>').join('') + '</tr>').join('') +
        '<tr><th scope="row">先试一下</th>' + items.map(i => '<td>' + ext(i.try.url, i.try.label, 'text-link') + '</td>').join('') + '</tr></tbody></table></div>';
    }
    app.innerHTML = breadcrumb('机会对比') + head('机会对比', '把感兴趣的机会放在一起，看看参与条件、时间和交付是否适合自己。') + body;
  }

  function repository() {
    const valid = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?\/[\w.-]{1,100}$/i;
    const configured = String(window.ATLAS_REPOSITORY || '').trim().replace(/^https:\/\/github\.com\//i, '').replace(/\.git$|\/$/g, '');
    if (valid.test(configured) && !/\/\.{1,2}$/.test(configured)) return configured;
    const found = location.hostname.match(/^([a-z\d-]+)\.github\.io$/i);
    if (!found) return '';
    const dir = new URL('.', document.baseURI).pathname.split('/').filter(Boolean)[0];
    const repo = found[1] + '/' + (dir || location.hostname);
    return valid.test(repo) ? repo : '';
  }

  function showFeedback(id) {
    const item = itemById(id);
    const repo = repository();
    const issues = repo ? 'https://github.com/' + repo + '/issues' : '';
    const docs = 'https://docs.github.com/zh/issues/tracking-your-work-with-issues/using-issues/creating-an-issue';

    function templateLink(template, label, issueTitle) {
      if (!issues) return '';
      const params = new URLSearchParams({template});
      if (issueTitle) params.set('title', issueTitle);
      return ext(issues + '/new?' + params.toString(), label, 'btn btn-primary');
    }

    const recommend = `
      <section class="panel issue-guide">
        <h2>推荐一项活动</h2>
        <ol>
          <li><strong>标题写活动全名。</strong> 有届次或特定赛道时也写上，每个 Issue 推荐一项活动。</li>
          <li><strong>贴主办方的公告或报名页。</strong> 可以再补一句哪些学生能参加、从哪里报名。</li>
        </ol>
        <p class="issue-example"><span>标题示例</span>推荐｜中国大学生计算机设计大赛 · 软件应用与开发</p>
        ${templateLink('suggest.md', '去 GitHub 推荐活动')}
      </section>`;
    const correction = `
      <section class="panel issue-guide">
        <h2>${item ? '纠正这条信息' : '纠正一处信息'}</h2>
        ${item ? '<p class="issue-context">当前活动 · ' + h(item.title) + '</p>' : ''}
        <ol>
          <li><strong>标题写活动名和要改的地方。</strong> 正文写清页面原来怎么写、应改成什么。涉及某一届或某个组别时，注明范围。</li>
          <li><strong>附上核对依据。</strong> 可以贴新公告或报名页。如果只发现链接失效，贴出失效地址也有帮助。</li>
        </ol>
        <p class="issue-example"><span>标题示例</span>纠错｜${h(item ? item.title : '某活动')} · 报名入口失效</p>
        ${templateLink('correct.md', '去 GitHub 提交纠错', item ? '纠错｜' + item.title + ' · ' : '')}
      </section>`;
    const existing = issues ? ext(issues, '查看已有 Issues', 'text-link') : '';
    app.innerHTML = breadcrumb('推荐与纠错') +
      head('推荐与纠错', '用一条 GitHub Issue 把线索交给维护者。维护者核对官方资料后，会更新相应的活动页面。') +
      '<div class="issue-guides">' + (item ? correction : recommend + correction) + '</div>' +
      '<section class="panel issue-submit"><h2>如何提交</h2>' +
      (issues ? '<p>先按活动名查看是否已有相同反馈。已有记录时，可以在原 Issue 下补充新依据。</p>'
              : '<p>当前预览尚未连接接收反馈的仓库。发布到 GitHub Pages 后，本页会显示推荐和纠错的提交按钮。</p>') +
      '<p>打开对应的 GitHub 模板，登录后填写标题和正文，最后确认<strong>创建 Issue</strong>。公开 Issue 会显示提交账号和正文，只填写活动的公开资料。</p>' +
      '<div class="action-row">' + (existing ? existing : ext(docs, '查看 GitHub 官方提交教程', 'btn btn-primary')) +
      (item ? link('feedback', '查看推荐活动教程', 'text-link') : '') + '</div></section>';
  }

  function updateIndicators() {
    for (const list of ['saved', 'compare']) {
      const count = (list === 'saved' ? A.saved() : A.compared()).length;
      document.querySelectorAll('[data-count="' + list + '"]').forEach(el => {
        el.textContent = count ? String(count) : '';
        el.hidden = !count;
      });
    }
    document.querySelectorAll('[data-nav]').forEach(el => {
      if (el.dataset.nav === route || (el.dataset.nav === 'home' && route === 'topic')) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  function router(force = false) {
    if (!force && lastURL === location.href) return;
    const samePath = location.href.split('?')[0] === lastURL.split('?')[0];
    lastURL = location.href;
    const token = location.hash.slice(1).split('?')[0];
    const separator = token.indexOf('/');
    route = separator === -1 ? token : token.slice(0,separator);
    param = decode(separator === -1 ? '' : token.slice(separator + 1));
    const rootId = app.dataset.detail || document.body.dataset.detail;
    if (rootId && !token) { route = 'detail'; param = rootId; }
    if (!route) route = 'home';
    // Retain links people saved from the first version.
    if (!param && itemById(route)) { param = route; route = 'detail'; }
    if (route === 'catalog') route = 'browse';
    if (route === 'updates') route = 'browse';
    if (route === 'about') route = 'home';
    document.title = ({home:title + ' · ' + subtitle,browse:'机会索引 · ' + title,map:'成长地图 · ' + title,topic:param + ' · ' + title,saved:'我的收藏 · ' + title,compare:'机会对比 · ' + title,feedback:'推荐与纠错 · ' + title})[route] || title;
    if (route === 'detail' && itemById(param)) showDetail(itemById(param));
    else if (route === 'saved') showSaved();
    else if (route === 'compare') showCompare();
    else if (route === 'feedback') showFeedback(param);
    else if (['home','browse','topic','map'].includes(route)) window.Explore.render(route,param);
    else {
      app.innerHTML = head('这个入口暂时找不到', '你可以回到机会索引继续浏览。') + link('browse','打开机会索引','btn btn-primary');
    }
    updateIndicators();
    if (!samePath && !force) window.scrollTo(0,0);
  }

  document.addEventListener('click', e => {
    if (e.target.closest('a.skip-link')) {
      e.preventDefault();
      app.focus({preventScroll:true});
      app.scrollIntoView({block:'start'});
      return;
    }
    const button = e.target.closest('[data-action]');
    if (!button) return;
    const {action,id,index} = button.dataset;
    const item = itemById(id);
    if (!item) return;
    if (action === 'calendar') {
      const outcome = A.downloadCalendar(item, Number(index)); announce(outcome.message); return;
    }
    if (action === 'save' || action === 'compare') {
      const outcome = action === 'save' ? A.toggleSave(id) : A.toggleCompare(id);
      announce(outcome.message);
    }
  });
  window.addEventListener('atlas:state', () => {
    if (route === 'saved') showSaved();
    else if (route === 'compare') showCompare();
    else {
      document.querySelectorAll('[data-action="save"],[data-action="compare"]').forEach(el => {
        const saved = el.dataset.action === 'save';
        const active = (saved ? A.saved() : A.compared()).includes(el.dataset.id);
        el.setAttribute('aria-pressed', String(active));
        const label = saved ? (active ? '已收藏' : '收藏到本机') : (active ? '已加入对比' : '加入对比');
        const target = el.querySelector('[data-label]') || el;
        if (el.getAttribute('aria-label')) el.setAttribute('aria-label', label + '：' + (itemById(el.dataset.id)?.title || ''));
        target.textContent = label;
      });
    }
    updateIndicators();
  });
  window.addEventListener('atlas:view-query', () => { lastURL = location.href; });
  window.addEventListener('hashchange', () => router());
  window.addEventListener('popstate', () => router());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const day = new Date().toDateString();
      if (renderedDay !== day && route !== 'feedback') {renderedDay = day;router(true);}
    }
  });
  router(true);
})();
