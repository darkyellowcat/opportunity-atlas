// 日期型事件使用主办方当地日期；end 是活动最后一天。具体时刻均带时区偏移。
window.ATLAS_PROGRAMS = [
  {
    id: 'db-contest', title: '数据库管理系统设计赛', parent: '全国大学生计算机系统能力大赛',
    kind: '竞赛', contestFormat: '可单人组队', region: '国内发起', edition: '2026 届',
    topics: ['数据库'], goals: ['参加比赛', '做出作品'],
    summary: '用 C++ 给数据库原型补上存储、查询和事务处理，让自己写的数据库通过指定测试。',
    audience: '2026 届面向普通高校全日制在校本科生，以报名时的学籍为准。校内选拔安排需查看本校通知。',
    entry: '先向本校教务处或院系确认是否有校选，再按全国赛通知报名。云南民族大学校选在赛事冠名的前一年就开始了。',
    team: '同校 1–3 名学生组成一队，允许一名学生单独参赛。校内选拔方式由学校确定。', effort: '按阶段实现并调试数据库，2026 年国赛初赛提交到 7 月。',
    delivery: '在指定环境通过测试的 C++ 源代码；决赛另有技术文档和答辩。', cost: '校方通知载明国赛报名免费；赴现场的费用按学校安排。', mode: '线上评测，决赛含线下环节。',
    status: '本届已结束', archived: true, statusNote: '2026 届的线下决赛安排在 8 月。校内报名与全国作品提交是两个独立节点。',
    checked: '2026-11-23',
    try: {label: '试一个数据库存储实验', url: 'https://github.com/ruc-dbsys/rucbase-lab/blob/main/docs/RUCBase-Lab1%5B%E5%AD%98%E5%82%A8%E7%AE%A1%E7%90%86%5D.md', note: '本站选用的相关练习。先阅读中国人民大学 RUCBase Lab 1，看看如何把数据放进磁盘页面。'},
    sources: [
      {label: '组委会 · 2026 年数据库管理系统设计赛章程（PDF）', url: 'https://gitlab.eduxiji.net/csc1/csc-db/db2026/-/raw/main/2026年全国大学生计算机系统能力大赛-数据库管理系统设计赛章程.pdf'},
      {label: '全国赛评测与日程', url: 'https://course.educg.net/pages/contest/contest.jsp?contestCID=0&contestID=6gutcJNDUrw&my=false&tabDocID=301000'},
      {label: '云南民族大学校选通知', url: 'https://web.ymu.edu.cn/jwc/info/1081/2581.htm'}
    ],
    events: [
      {title: '云南民族大学校选报名截止', start: '2025-12-17T11:00:00+08:00', kind: 'event', scope: '仅云南民族大学', timezone: 'Asia/Shanghai'},
      {title: '国赛初赛作品提交截止', start: '2026-07-13', kind: 'event', scope: '全国赛参赛队', timezone: 'Asia/Shanghai'},
      {title: '国赛线下决赛', start: '2026-08-17', kind: 'event', scope: '入围线下决赛的队伍', timezone: 'Asia/Shanghai'}
    ]
  },
  {
    id: 'gsoc', title: 'Google Summer of Code', parent: 'Google · GSoC',
    kind: '开源导师项目', region: '国际项目', edition: '2026 届',
    topics: ['计算机网络', '编译器'], goals: ['加入开源', '做出作品'],
    summary: '选一个社区、与导师讨论，再提交个人项目提案。2026 年的 P4 Language Consortium 提供了网络编程语言和编译器方向的入口。',
    audience: '面向年满 18 岁的学生或开源新人；居住地、身份及既往参与等条件以官方资格说明为准。',
    entry: '阅读感兴趣组织的项目想法，先与社区沟通，再到 GSoC 网站提交提案。', team: '个人申请；入选后与社区导师协作。',
    effort: '根据项目规模和与导师商定的开发计划安排时间。', delivery: '按获选提案交付代码、项目总结和最终评估。', cost: '项目设贡献者津贴，发放条件见官方 FAQ。', mode: '线上参与。',
    status: '本届申请已截止', enrollmentClosed: true, archived: true, statusNote: '2026 届报名与评估已经结束。往届组织适合提前了解项目，新一届时间须另行核实。',
    checked: '2026-11-23',
    try: {label: '试一个 P4 网络编程练习', url: 'https://github.com/p4lang/tutorials', note: '本站选用的社区入门材料。找到 Basic Forwarding，先读数据包在交换机中如何转发。'},
    sources: [
      {label: '2026 组织实例 · P4', url: 'https://summerofcode.withgoogle.com/programs/2026/organizations/the-p4-language-consortium'},
      {label: '官方日程', url: 'https://developers.google.com/open-source/gsoc/timeline'},
      {label: '资格与 FAQ', url: 'https://developers.google.com/open-source/gsoc/faq'}
    ],
    events: [
      {title: '贡献者申请开始', start: '2026-03-16T18:00:00Z', kind: 'opens', scope: '2026 届贡献者', timezone: 'UTC'},
      {title: '贡献者申请截止', start: '2026-03-31T18:00:00Z', kind: 'deadline', scope: '2026 届贡献者', timezone: 'UTC'}
    ]
  },
  {
    id: 'fields-lean', title: '用 Lean 研究数学证明', parent: 'Fields Institute 上海本科生暑研',
    kind: '科研机会', region: '国际项目', edition: '2026 年 · 课题 04',
    topics: ['形式化方法', '机器学习'], goals: ['体验科研'],
    summary: '在上海跟随导师研究形式化证明，探索模型如何利用 Lean 的语法树、类型和证明状态。',
    audience: '面向世界各地的本科生，包括国内其他高校在读本科生；由项目方遴选。',
    entry: '通过当届项目页的学生申请表提交申请。课题 04 的导师来自复旦大学上海数学中心。',
    team: '个人申请；每个课题最多 4 名学生。', effort: '2026 年 7 月 1 日至 8 月 31 日。',
    delivery: '围绕正式课题开展研究；具体结项材料以导师安排为准。', cost: '主办方承担入选学生的交通与住宿费用。', mode: '上海线下科研。',
    status: '本届已结束', enrollmentClosed: true, archived: true, statusNote: '2026 届申请表已关闭。公布的起止日期指科研开展时间，官方页未注明申请截止日。',
    checked: '2026-11-23',
    try: {label: '玩一关自然数证明游戏', url: 'https://adam.math.hhu.de/#/g/leanprover-community/NNG4', note: '本站选用的方向体验。跟随第一关写出证明，让 Lean 检查每一步。'},
    sources: [
      {label: '官方课题、资格与申请状态', url: 'https://www2.fields.utoronto.ca/activities/26-27/FUSRP-Shanghai'},
      {label: 'Lean 官方入门指南', url: 'https://lean-lang.org/learn/'}
    ],
    events: [{title: '上海本科生暑研开展', start: '2026-07-01', end: '2026-08-31', kind: 'event', scope: '2026 届入选学生', timezone: 'Asia/Shanghai'}]
  },
  {
    id: 'opencamp', title: '开源操作系统训练营', parent: 'OpenCamp · 开源操作系统社区',
    kind: '训练营', region: '国内发起', edition: '2026 秋冬季',
    topics: ['操作系统'], goals: ['做出作品', '加入开源', '认识社区'],
    summary: '从 Rustlings 走到 rCore 内核，再把文件系统等组件迁移到 ArceOS。想写第一个内核的同学可以从导学开始。',
    audience: '对 Rust 或系统编程感兴趣的学生和开发者。导学阶段可自学，项目阶段需要通过前面阶段的晋级。',
    entry: '到本期页面点击报名，按起点选择导学回放或相应阶段。', team: '个人报名，按阶段学习和评测。',
    effort: '官方建议基础和专业阶段每周至少投入约 10 小时。', delivery: '提交阶段实验并通过评测，晋级后可参与项目实践。',
    cost: '训练营全程免费。', mode: '线上授课、回放与编程实验。',
    status: '可报名看回放', statusNote: '全年可报名观看回放。列出的项目实践节点只适用于已晋级学员。',
    checked: '2026-11-23',
    try: {label: '做第一道 Rustlings 练习', url: 'https://github.com/LearningOS/rustlings', note: '从训练营导学材料入手。先修正一道练习并通过测试，再决定是否进入内核实验。'},
    sources: [{label: '2026 秋冬季课程与报名', url: 'https://opencamp.cn/os2edu/camp/2026fall'}],
    events: [{title: '项目实践阶段', start: '2026-11-29', end: '2026-12-27', kind: 'event', scope: '已完成前置阶段晋级的学员', timezone: 'Asia/Shanghai'}]
  },
  {
    id: 'ospp', title: '开源之夏', parent: '中国科学院软件研究所发起 · OSPP',
    kind: '开源导师项目', region: '国内发起', edition: '2026 届 · 计划总览',
    topics: ['操作系统', '开发工具'], goals: ['加入开源', '做出作品'],
    summary: '根据社区需求选任务，提交申请书，在导师指导下完成开发。本届项目实例包括星绽 OS 的进程调试支持和 openKylin 的测试工具。',
    audience: '年满 18 周岁且在项目开发周期内保持高校在读状态的学生。',
    entry: '查项目列表和中选情况，阅读具体交付物；按该题说明沟通导师、准备并提交个人申请。',
    team: '个人申请，社区导师指导。', effort: '开发周期按任务单独标注。', delivery: '按照具体选题提交代码、结项材料等成果。',
    cost: '通过结项考核者按项目安排获得劳务报酬。', mode: '通过社区仓库和导师沟通渠道参与，具体安排看项目。',
    status: '按项目查看', statusNote: '项目陆续发布、按题目审核。在项目列表确认该题是否已公布中选者。',
    checked: '2026-11-23',
    try: {label: '拆解一份真实任务书', url: 'https://www.openkylin.top/news/4158-cn.html', note: '读“项目四”的产出要求，把你能独立完成的一项和想向导师确认的一项分别写下来。'},
    sources: [
      {label: '2026 项目与中选情况', url: 'https://summer.ospp.ac.cn/org/projectlist?lang=zh'},
      {label: '学生资格与参与流程', url: 'https://docs2026.summer.ospp.ac.cn/help/student%20guide'}
    ], events: []
  },
  {
    id: 'openkylin-qa', title: '给 openKylin 社区网站做自动化测试', parent: '开源之夏 · openKylin',
    kind: '开源导师项目', region: '国内发起', edition: '2026 届 · 267180092',
    topics: ['开发工具', '软件测试'], goals: ['加入开源', '做出作品'],
    summary: '用 TypeScript、Node.js 和 Playwright 走通真实网页操作，把失败截图、日志和检查结果变成可复查的测试报告。',
    audience: '年满 18 周岁、开发周期内保持高校在读的学生。此进阶选题要求熟悉 Web 开发与自动化测试。',
    entry: '在开源之夏列表查项目 267180092，阅读社区任务书，确认具体题目的中选状态。',
    team: '个人申请，与社区导师协作。', effort: '该题开发周期 4 个月。', delivery: '交付测试平台及文档，覆盖至少 5 条只读使用流程和 30 个测试节点。',
    cost: '按开源之夏的结项规则执行。', mode: '围绕社区网站与开源仓库开发。',
    status: '已公布中选者', selected: true, statusNote: '2026 届官方列表已公布本题中选者。本卡保留作为任务样例。',
    checked: '2026-11-23',
    try: {label: '写一个浏览器测试', url: 'https://playwright.dev/docs/writing-tests#first-test', note: '本站选用的入门练习。让浏览器打开页面、点击链接，再检查页面标题。'},
    sources: [
      {label: '社区任务书 · 项目四', url: 'https://www.openkylin.top/news/4158-cn.html'},
      {label: '官方项目与中选情况', url: 'https://summer.ospp.ac.cn/org/projectlist?lang=zh'},
      {label: '官方项目主页', url: 'https://m.summer.ospp.ac.cn/org/prodetail/267180092'},
      {label: '2026 学生指南', url: 'https://docs2026.summer.ospp.ac.cn/help/student%20guide'}
    ], events: []
  },
  {
    id: 'rhino-bird', title: '腾讯犀牛鸟开源人才培养计划', parent: '腾讯开源 · 腾讯高校合作',
    kind: '训练营', region: '国内发起', edition: '2026 届',
    topics: ['数据库', '前端与移动开发', '编译器', '计算机网络'], goals: ['加入开源', '做出作品', '认识社区'],
    summary: '从基础学习进入开源实战。2026 届公布 14 个项目，覆盖大前端、数据库、编译器等方向。',
    audience: '在校学生及其他开发者。各项目的技术要求不同，选题前先读项目介绍。',
    entry: '按腾讯高校合作发布的当届通知报名；2026 届页面仍可查看项目海报与实践方向。',
    team: '个人报名，具体任务按培养阶段和项目安排。', effort: '2026 届活动从 6 月持续到 9 月，分三个阶段。',
    delivery: '按阶段完成练习和选题任务。', cost: '报名公告未列出统一参与费用。', mode: '主要在线学习与实践，另设限额的线下夏令营。',
    status: '本届已结束', archived: true, enrollmentClosed: true, statusNote: '2026 届于 7 月 31 日截止报名，9 月 14 日结束。可从当届介绍中寻找平时就能参与的开源仓库。',
    checked: '2026-11-23',
    try: {label: '选一张项目海报读任务', url: 'https://ur.tencent.com/article/1529', note: '在“有哪些项目”中挑一个方向，摘出它的项目名、主要技术和想完成的任务。'},
    sources: [
      {label: '2026 届通知与项目清单', url: 'https://ur.tencent.com/article/1529'},
      {label: '历届活动入口', url: 'https://opensource.tencent.com/summer-of-code/'}
    ],
    events: [
      {title: '当届报名开始', start: '2026-06-18', kind: 'opens', scope: '2026 届', timezone: 'Asia/Shanghai'},
      {title: '当届报名截止', start: '2026-07-31', kind: 'deadline', scope: '2026 届', timezone: 'Asia/Shanghai'},
      {title: '当届活动结束', start: '2026-09-14', kind: 'event', scope: '2026 届', timezone: 'Asia/Shanghai'}
    ]
  },
  {
    id: 'lfx', title: '参与 Kubernetes API 校验改进', parent: 'LFX Mentorship · CNCF · Kubernetes',
    kind: '开源导师项目', region: '国际项目', edition: '2026 第三期',
    topics: ['分布式与云原生', '后端开发'], goals: ['加入开源', '做出作品'],
    summary: '把 Kubernetes 核心对象的部分手写校验迁移到声明式规则。跟着维护者阅读 API 代码、写测试并参与补丁评审。',
    audience: '对 Kubernetes、API 或后端基础设施感兴趣，能投入本期时间的开发者；具体资格按 LFX 项目页确认。',
    entry: '从 CNCF 当季项目表进入对应导师计划，按 LFX 平台列出的要求申请。不同社区和批次的窗口会变动。',
    team: '个人申请，与社区维护者合作。', effort: 'CNCF 2026 第三期按三个月全时安排。', delivery: '迁移 Pod 和 ObjectMeta 的校验逻辑，推进已有规则稳定化。',
    cost: '该期设津贴支付节点，个人资格和发放条件按项目规则。', mode: '远程开源开发。',
    status: '本期申请已截止', enrollmentClosed: true, statusNote: '此处展示 Kubernetes 的 2026 第三期样例。其他 LFX 计划请查各自项目页。',
    checked: '2026-11-23',
    try: {label: '做一节 Kubernetes 基础教程', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', note: '本站选用的入门体验。先看应用和 Pod 的关系，再回到课题描述找出待校验的对象。'},
    sources: [
      {label: 'CNCF 当季项目与日程', url: 'https://github.com/cncf/mentoring/blob/main/programs/lfx-mentorship/2026/03-Sep-Nov/README.md'},
      {label: 'Kubernetes 导师课题', url: 'https://github.com/cncf/mentoring/issues/1960'},
      {label: 'LFX 全部项目', url: 'https://mentorship.linuxfoundation.org/programs'}
    ],
    events: [
      {title: 'CNCF 第三期申请截止', start: '2026-08-18T23:59:00Z', kind: 'deadline', scope: 'CNCF 2026 第三期', timezone: 'UTC'},
      {title: 'CNCF 第三期项目结束', start: '2026-11-27', kind: 'event', scope: 'CNCF 2026 第三期学员'}
    ]
  },
  {
    id: 'gnome', title: '参与 GNOME 桌面交互设计', parent: 'GNOME 社区贡献指南',
    kind: '社区活动', region: '国际项目', edition: '长期参与',
    topics: ['人机交互'], goals: ['加入开源', '认识社区', '做出作品'],
    summary: '从每天会用到的桌面应用出发，学习按钮、导航与无障碍设计，再参与社区的设计讨论。',
    audience: '对用户体验、界面设计或可用性测试感兴趣的人。社区也提供翻译、编程和文档贡献路线。',
    entry: '阅读 Design 团队入门页，查看正在讨论的议题，按团队流程沟通想做的任务。',
    team: '个人贡献，与设计团队协作。', effort: '长期入口，可从一个组件或一项可用性观察开始。', delivery: '按任务贡献界面草图、可用性反馈或设计规范改进。',
    cost: '入门与设计指南可公开阅读。', mode: '线上阅读与社区协作。',
    status: '长期入口', statusNote: '可随时阅读和准备贡献；实际任务与维护者确认。',
    checked: '2026-11-23',
    try: {label: '用设计指南检查一个界面', url: 'https://developer.gnome.org/hig/', note: '选一项有关按钮或导航的设计模式，用它检查自己常用的 GNOME 应用。'},
    sources: [
      {label: 'GNOME 设计团队入门', url: 'https://welcome.gnome.org/team/design/'},
      {label: '其他贡献方向', url: 'https://welcome.gnome.org/en-GB/'}
    ], events: []
  },
  {
    id: 'outreachy', title: '改进 Git 命令行参数解析', parent: 'Outreachy · Git 社区',
    kind: '开源导师项目', region: '国际项目', edition: '2026 年 12 月批次',
    topics: ['开发工具'], goals: ['加入开源', '做出作品'],
    summary: '参与带津贴的远程开源实习。本届 Git 项目之一让实习生研究命令参数和选项如何被扫描、解析。',
    audience: '面向在当地技术行业面临代表性不足、系统性偏见或歧视者；另有可投入时间及在读安排等资格要求。',
    entry: '先提交资格初审申请，通过后进入贡献阶段，记录实际贡献，再提交最终申请。',
    team: '个人申请，按社区项目参与导师指导。', effort: '三个月，须满足官方申请指南中的时间要求。', delivery: '参与社区代码贡献，与导师约定阶段目标；本项目偏向 C、Git 和 Shell。',
    cost: '带津贴的实习，资格和发放安排以官方说明为准。', mode: '远程。',
    status: '本轮申请已截止', enrollmentClosed: true, statusNote: '2026 年 12 月批次的最终申请已截止。录取名单公布与实习开展属于已申请者的后续节点。',
    checked: '2026-11-23',
    try: {label: '读懂 Git 的命令行约定', url: 'https://git-scm.com/docs/gitcli', note: '本站选用的入门练习。查找双连字符的用途，尝试用它区分一个 Git 命令中的路径和选项。'},
    sources: [
      {label: '本届项目及日程', url: 'https://www.outreachy.org/apply/project-selection/'},
      {label: '资格与申请指南', url: 'https://www.outreachy.org/docs/applicant/'}
    ],
    events: [
      {title: '最终申请截止', start: '2026-11-09T16:00:00Z', kind: 'deadline', scope: '已通过初审的申请人', timezone: 'UTC'},
      {title: '公布录取名单', start: '2026-11-30T16:00:00Z', kind: 'result', scope: '2026 年 12 月批次', timezone: 'UTC'},
      {title: '远程实习开展', start: '2026-12-07', end: '2027-03-08', kind: 'event', scope: '本期入选者'}
    ]
  },
  {
    id: 'kubecon', title: 'KubeCon + CloudNativeCon 欧洲站', parent: 'CNCF · 云原生社区旗舰大会',
    kind: '社区活动', region: '国际项目', edition: '2027 欧洲站',
    topics: ['分布式与云原生'], goals: ['认识社区'],
    summary: '从 Kubernetes 与云原生社区的分享中发现项目。在国内也可以先看往届议题，确定值得追踪的社区。',
    audience: '对云原生感兴趣的学生、开发者及其他参与者；线下参会需自行确认注册和出行条件。',
    entry: '由欧洲站官网进入注册和奖助页面；只想先探索方向可从公开往届内容开始。',
    team: '个人参会。', effort: '按当地会期参加，可先挑一场往届分享。', delivery: '参会交流，可按感兴趣的主题规划自己的议程。',
    cost: '现场票价按票种和购票时间区分；另有旅行与住宿成本。', mode: '线下会场在西班牙巴塞罗那；往届内容可在线查看。',
    status: '会期已公布', statusNote: '2027 欧洲站为 3 月 15–18 日；3 月 15 日含会前活动，具体活动所需票种看当届说明。',
    checked: '2026-11-23',
    try: {label: '逛一届真实大会的议程', url: 'https://events.linuxfoundation.org/archive/2026/kubecon-cloudnativecon-europe/', note: '打开 2026 年欧洲站的议程或回顾，挑一个感兴趣的主题，找出演讲中出现的开源项目。'},
    sources: [
      {label: '2027 欧洲站会期与注册', url: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/'},
      {label: '2026 欧洲站回顾', url: 'https://events.linuxfoundation.org/archive/2026/kubecon-cloudnativecon-europe/'}
    ],
    events: [{title: 'KubeCon 欧洲站会期', start: '2027-03-15', end: '2027-03-18', kind: 'event', overall: true, scope: '巴塞罗那 · 当地日期', timezone: 'Europe/Madrid'}]
  }
];
