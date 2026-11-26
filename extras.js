// Dates with explicit offsets preserve the organizer's local time when exported.
window.ATLAS_EXTRA = [
  {
    id:"comap-mcm",title:"美国大学生数学建模竞赛 MCM/ICM",parent:"COMAP Mathematical Contest in Modeling / Interdisciplinary Contest in Modeling",
    kind:"竞赛", contestFormat: '可单人组队',region:"国际项目",topics:["数学建模","优化与运筹","数据分析"],
    summary:"从一个现实问题出发，决定哪些数据有用、怎样建模，再用英文报告解释你的解法和结论。",
    audience:"同一所学校在读的本科生及以下学生均可组队，专业不限。",entry:"由本校 Advisor 先注册队伍；同时留意本校选拔、组织或资助安排。",team:"同校 1–3 人，另须指定本校 Advisor。",effort:"2027 届比赛从美东 1 月 28 日 17:00 到 2 月 1 日 20:00，随后另有报告提交节点。",delivery:"按赛题提交英文建模报告，依官方规则处理摘要、参考文献及附录。",cost:"2027 届每队 100 美元；校内经费和报销请向本校确认。",mode:"团队在本地完成建模并在线提交。",
    status:"本届日程已公布",statusNote:"官方给出的是美东标准时间。报名截止折合北京时间 2027 年 1 月 29 日 04:00；本校可能提前收集信息。",checked:"2026-11-23",edition:"2027 届",
    try:{label:"选一道 2026 年真题",url:"https://contest.comap.com/undergraduate/contests/mcm/contests/2026/problems/index.html",note:"先读 B 题的太空电梯运输场景，列出运量、时间和成本三个变量。"},
    sources:[{label:"COMAP 2027 规则、费用与官方日程",url:"https://contest.comap.com/undergraduate/contests/mcm/instructions.php"},{label:"历届赛题与结果",url:"https://contest.comap.com/undergraduate/contests/mcm/previous-contests.php"}],
    events:[{title:"团队注册截止",kind:"deadline",start:"2027-01-28T15:00:00-05:00",timezone:"America/New_York"},{title:"建模竞赛",kind:"event",overall:true,start:"2027-01-28T17:00:00-05:00",end:"2027-02-01T20:00:00-05:00",timezone:"America/New_York"},{title:"报告提交截止",kind:"event",start:"2027-02-01T21:00:00-05:00",timezone:"America/New_York"},{title:"官方预计公布结果",kind:"result",start:"2027-05-08",timezone:"America/New_York"}],
    goals:["参加比赛","做出作品"]
  },{
    id:"huawei-network",title:"华为 ICT 大赛 · 网络实践赛道",parent:"第十一届华为 ICT 大赛中国赛",
    kind:"竞赛",contestFormat:"团队赛",region:"国内发起",topics:["计算机网络"],
    summary:"在网络赛道从理论考试进入动手实验，检验网络技术知识能否用于实际配置与排错。",
    audience:"中国赛的学生资格须按参赛组别和院校通知确认。",entry:"从华为大赛官网找到中国赛实践赛；核实自己学校是否还有单独登记或审核。",team:"中国实践赛由同校 3 名学生和 1 位指导老师组队。",effort:"省资格赛、省赛、中国总决赛及全球总决赛分阶段进行。",delivery:"完成相应阶段的理论考试、网络实验或综合实操。",cost:"所引通知未列统一费用。",mode:"理论考试和上机实验，线下安排按赛区通知。",
    status:"本届报名已截止",statusNote:"本届实践赛报名在 2026 年 10 月 31 日截止；后续赛段面向已报名且符合晋级条件的选手。",checked:"2026-11-23",edition:"2026–2027 中国赛",
    try:{label:"查看实践赛实验与赛程",url:"https://gallery.developer.huaweicloud.com/gallery/competition/",note:"在赛道页面找「实践赛」，先区分理论考试和实验赛题；部分材料需参赛账号。"},
    sources:[{label:"华为云 · ICT 大赛实践赛",url:"https://gallery.developer.huaweicloud.com/gallery/competition/"},{label:"云南大学教务处 · 中国实践赛组队与赛制",url:"https://www.jwc.ynu.edu.cn/info/1009/4393.htm"},{label:"杭州电子科技大学校内通知（仅适用该校）",url:"https://jwc.hdu.edu.cn/2026/1020/c13022a301689/page.htm"}],
    events:[{title:"实践赛报名截止",kind:"deadline",start:"2026-10-31",timezone:"Asia/Shanghai"}],
    goals:["参加比赛","做出作品"]
  },{
    id:"crypto-contest",title:"全国密码技术竞赛 · 密码应用作品",parent:"中国密码学会 · 第十一届全国密码技术竞赛",
    kind:"竞赛",contestFormat:"团队赛",region:"国内发起",topics:["密码学","网络安全"],summary:"从密码学基本概念出发，设计原创软件、硬件或系统，并在决赛展示作品的运行效果。",
    audience:"高校和科研院所师生、密码从业人员可参加。高校参赛由学校推荐团队。",entry:"由学校领队统一注册并提交本单位盖章报名表。",team:"3 名参赛成员和 1 名指导老师。",effort:"初赛、复赛和现场决赛；2026 届从 9 月至 11 月。",delivery:"独立设计开发的原创作品，决赛现场演示。",cost:"所引官方通知未列统一费用。",mode:"初、复赛通过竞赛平台，决赛在湖南第一师范学院现场进行。",
    status:"本届报名已截止",statusNote:"2026 届报名已结束，11 月决赛只涉及入围团队。",checked:"2026-11-23",edition:"2026 届",
    try:{label:"读一遍作品要求",url:"https://www.chinacodes.com.cn/news/findNewsByTitle.do?id=254",note:"读「竞赛内容及要求」，想想怎样用一个可以演示的应用解释签名或身份验证。"},
    sources:[{label:"中国密码学会 · 举办通知与报名资格",url:"https://www.chinacodes.com.cn/news/findNewsByTitle.do?id=254"},{label:"组委会最新通知与决赛安排",url:"https://chinacodes.com.cn/news/lookAllNews.do"}],
    events:[{title:"领队提交报名信息截止",kind:"deadline",start:"2026-09-05T18:00:00+08:00",timezone:"Asia/Shanghai"},{title:"现场决赛（首日报到）",kind:"event",start:"2026-11-26",end:"2026-11-28",timezone:"Asia/Shanghai",scope:"入围团队"}],
    goals:["参加比赛","做出作品"]
  },{
    id:"ic-soc",title:"集创赛 · RISC-V CPU 设计与 FPGA 验证",parent:"全国大学生集成电路创新创业大赛 · SoC 设计",
    kind:"竞赛",contestFormat:"可单人组队",region:"国内发起",topics:["芯片设计","嵌入式系统"],summary:"以处理器设计为课题，把指令集和硬件电路联系起来，并在 FPGA 上验证设计。",
    audience:"面向集成电路、计算机科学与技术等相关专业在校生。七星微的本题页面列 A、B 两组，报名前核对组别规则。",entry:"在集创赛官网读企业命题，再查看组别和学校安排。申请举办校选的高校须按校选流程推荐。",team:"按第十届章程，每队 1–3 名学生、1–2 名指导老师，允许跨校组队。",effort:"初赛、分赛区决赛、全国总决赛分阶段进行。",delivery:"按企业命题提交处理器设计和 FPGA 验证材料。",cost:"费用与硬件支持以赛项通知为准。",mode:"硬件设计、验证及分阶段评审。",
    status:"2026 届参考",statusNote:"展示第十届的企业选题；了解下一届请查看主办方的新通知。",checked:"2026-11-23",edition:"第十届 · 2026 年",
    try:{label:"读 RISC-V 处理器企业命题",url:"https://univ.ciciec.com/col.jsp?id=301",note:"在 SoC 设计题目中找到「七星微」，先列出需要设计的模块和验证方式。"},
    sources:[{label:"SoC 设计企业命题",url:"https://univ.ciciec.com/col.jsp?id=301"},{label:"组委会 · 第十届章程与组队要求",url:"https://univ.ciciec.com/col.jsp?id=123"},{label:"第十届全部命题",url:"https://univ.ciciec.com/col.jsp?id=288"},{label:"组委会赛事通知",url:"https://univ.ciciec.com/col.jsp?id=265"}],
    events:[],goals:["参加比赛","做出作品"]
  },
  {
    id: 'swift-student-challenge', title: 'Apple Swift Student Challenge', parent: 'Apple 开发者',
    aliases: ['Swift 学生挑战赛', 'App 开发', '移动应用', '交互设计', 'SwiftUI'],
    kind: '竞赛', contestFormat: '个人赛', region: '国际项目', topics: ['前端与移动开发', '人机交互'],
    summary: '找一个值得用 App 解决的小问题，把核心体验做成三分钟内能试完的原型。例如，让第一次使用的人在离线状态下也能完成一项任务。',
    audience: '中国大陆申请人通常须年满 14 岁，符合在读或近期毕业等学籍条件，且非全职受雇开发者。符合条件的国内高校学生可以直接申请。',
    entry: '在 Apple 开发者网站免费注册，用本人账户在线申请。准备在读证明、学校联系人和英文作品。有效的中文在读证明也可提交。',
    team: '每人独立创作并提交一件作品。', effort: '在提交期前完成开发和测试，让评审能在三分钟内离线体验核心功能。',
    delivery: '提交 Xcode App 或 Swift Playground 的 App Playground。将英文内容和本地资源打包为不超过 500 MB 的 ZIP。',
    cost: '免费注册的 Apple 开发者账号即可参赛。需使用支持本届 Xcode 或 Swift Playground 的设备。',
    mode: '国内学生可在 Apple 开发者网站线上提交，由评审离线体验。', status: '提交通道尚未开放',
    statusNote: '2027 届提交期为太平洋时间 2 月 8 日至 28 日。截止折合北京时间 3 月 1 日 15:59。',
    checked: '2026-11-24', edition: '2027 届',
    try: {label: '在 Xcode 做一个聊天界面', url: 'https://developer.apple.com/tutorials/develop-in-swift/hello-swiftui', note: '跟随 Apple 的 Hello, SwiftUI 教程搭出两段对话，再改变气泡的布局，让读者一眼区分发言者。'},
    sources: [
      {label: 'Apple 开发者 · 中文参赛入口与提交期', url: 'https://developer.apple.com/cn/swift-student-challenge/'},
      {label: 'Apple 开发者 · 2027 条款、资格和截止时刻', url: 'https://developer.apple.com/cn/swift-student-challenge/policy/'},
      {label: 'Apple 开发者 · 赛前教程与作品示例', url: 'https://developer.apple.com/cn/swift-student-challenge/get-ready/'}
    ],
    events: [
      {title: 'Swift 学生挑战赛开放作品提交', start: '2027-02-08', kind: 'opens', overall: true, scope: '太平洋当地日期', timezone: 'America/Los_Angeles'},
      {title: 'Swift 学生挑战赛作品提交截止', start: '2027-02-28T23:59:00-08:00', kind: 'deadline', timezone: 'America/Los_Angeles'}
    ],
    goals: ['参加比赛', '做出作品']
  },
  {
    id: 'gmtk-game-jam', title: 'GMTK Game Jam', parent: 'Game Maker’s Toolkit',
    aliases: ['游戏创作马拉松', '独立游戏', 'Game Jam', '游戏设计'],
    kind: '竞赛', contestFormat: '个人或组队', region: '国际项目', topics: ['游戏开发', '人机交互'],
    summary: '主题在开赛时揭晓，用四天把一个游戏机制做成别人能玩的作品。2026 年的主题是「倒计时」，有选手把数字显示器做成了解谜关卡。',
    audience: '面向全球爱好者，国内高校学生可自行参加；未满 13 岁的参赛者须由监护人上传作品。',
    entry: '登录 itch.io，在主办方的本届页面点击 Join jam。开赛后按主题制作游戏，通过个人账号上传并提交参赛作品。',
    team: '可一人独立创作，也可与他人合作。多人作品只需一个人提交，并可在作品页标出其他作者。',
    effort: '本届创作期为四天，须在主题公布后开始制作参赛游戏。',
    delivery: '上传可在 Windows 电脑用键盘或鼠标游玩的免费数字游戏，可选浏览器或下载版本。',
    cost: '主办页未列参赛费，投稿游戏须向评选者免费开放。',
    mode: '全球线上投稿与试玩，通过 itch.io 交付作品。', status: '可加入本届活动',
    statusNote: '主办方已开放 2027 届 Join jam 入口。本届创作期折合北京时间 8 月 12 日 01:00 至 8 月 16 日 01:00。',
    checked: '2026-11-24', edition: '2027 届',
    try: {label: '用键盘试玩往届作品 7 Segments', url: 'https://axelvborn.itch.io/7-segments', note: '点 Run game，试过一个倒计时关卡后，写下倒计时怎样改变了你选择的路线。'},
    sources: [
      {label: 'GMTK · 2027 届报名入口与规则', url: 'https://itch.io/jam/gmtk-2027'},
      {label: 'Game Maker’s Toolkit · 活动官网', url: 'https://gamemakerstoolkit.com/jam/'},
      {label: 'GMTK · 2026 届主题与往届作品', url: 'https://itch.io/jam/gmtk-jam-2026'}
    ],
    events: [
      {title: 'GMTK Game Jam 限时创作与提交', start: '2027-08-11T17:00:00Z', end: '2027-08-15T17:00:00Z', kind: 'event', overall: true, timezone: 'UTC'}
    ],
    goals: ['参加比赛', '做出作品']
  },
  {
    id: 'lanqiao-embedded', title: '蓝桥杯 · 嵌入式设计与开发', parent: '蓝桥杯全国大学生软件和信息技术大赛 · 电子赛',
    kind: '竞赛', contestFormat: '个人赛', region: '国内发起', topics: ['嵌入式系统'],
    summary: '在开发板上实现并调试一个能工作的设备。可以先试第十二届的停车计费系统，让屏幕随车辆进出更新剩余车位。',
    audience: '嵌入式科目设大学组。具有正式全日制学籍、符合报名要求的在校学生可参加，学校审核学籍。',
    entry: '在蓝桥杯官网实名认证，选本校及电子赛「嵌入式设计与开发」，经学校审核、配备指导老师后缴费。',
    team: '选手独立参赛，由学校统一组织报名。', effort: '需要预留上板调试时间。可先在电脑上验证状态变化，再到开发板测试输入和显示。',
    delivery: '按当届赛题提交程序及规定文件，按功能要求验证开发板表现。', cost: '第十八届该科目报名费每人 300 元，食宿和交通自理。',
    mode: '在线登记，按准考证和赛点要求参加省赛。', edition: '第十八届 · 2026–2027 赛季',
    status: '报名中', statusNote: '全国系统于北京时间 12 月 18 日 14:00 停止报名。省赛拟定 2027 年 4 月 11 日 9:00–14:00，属组委会拟定安排，具体赛点和时间以准考证为准；全国总决赛计划于 2027 年 6 月 12 日。本校选拔和缴费可能提前。', checked: '2026-11-24',
    try: {label: '试做第十二届嵌入式省赛停车计费题', url: 'https://www.lanqiao.cn/courses/2786', note: '在历届真题里选第十二届电子类嵌入式省赛。先画车辆进入、离开时的状态变化，再设计车位显示。'},
    sources: [
      {label: '蓝桥杯组委会 · 个人赛科目、报名流程和日期', url: 'https://dasai.lanqiao.cn/pages/v7/dasai/competition/individual_competition.html'},
      {label: '蓝桥杯组委会 · 第十八届省赛比赛时间通知（PDF）', url: 'https://tuanwei.hbu.edu.cn/upload/files/2026/10/d12642afdc02570d.pdf'},
      {label: '蓝桥杯组委会 · 第十八届费用说明', url: 'https://x-static.lanqiao.cn/upload/202610/courseimg/bba5ad62-84ee-40be-bb68-362924f64470.pdf'},
      {label: '蓝桥云课 · 历届电子类真题', url: 'https://www.lanqiao.cn/courses/2786'}
    ],
    events: [
      {title: '嵌入式科目开始报名', start: '2026-10-08T10:00:00+08:00', kind: 'opens', timezone: 'Asia/Shanghai'},
      {title: '嵌入式科目全国报名截止', deadlineGroup: '蓝桥杯省赛全国报名截止', start: '2026-12-18T14:00:00+08:00', kind: 'deadline', timezone: 'Asia/Shanghai'},
      {title: '省赛（拟定）', start: '2027-04-11T09:00:00+08:00', end: '2027-04-11T14:00:00+08:00', kind: 'event', timezone: 'Asia/Shanghai', scope: '组委会拟定，以准考证为准', source: 'https://tuanwei.hbu.edu.cn/upload/files/2026/10/d12642afdc02570d.pdf'},
      {title: '全国总决赛（计划，仅限晋级者）', start: '2027-06-12', kind: 'event', timezone: 'Asia/Shanghai', scope: '多科晋级只能选一科参加', source: 'https://tuanwei.hbu.edu.cn/upload/files/2026/10/d12642afdc02570d.pdf'}
    ], goals: ['参加比赛', '做出作品']
  },
  {
    id: 'fpga-instrument', title: 'FPGA 创新设计赛 · 电子乐器合成引擎', parent: '全国大学生嵌入式芯片与系统设计竞赛 · 高云赛题',
    kind: '竞赛', contestFormat: '可单人组队', region: '国内发起', topics: ['芯片设计', '嵌入式系统', '人机交互'],
    summary: '用触摸、压力或手势捕捉演奏动作，让 FPGA 实时合成多声部声音。需要把传感器、硬件逻辑和音频输出连成一件可演奏的乐器。',
    audience: '面向相关专业全日制本科生和研究生，分本科组和研究生组。队员身份以报名截止日为准。',
    entry: '从当届 FPGA 创新设计赛道官网报名，选高云赛题二。所在院校另设校内选拔或备案时，同时办理校内流程。',
    team: '同校 1–3 名学生，一人可以单独成队。每队指导老师最多 2 名。',
    effort: '先验证单一音色和控制输入，再联调多声部输出、响应延迟及作品演示。',
    delivery: '提交设计报告、作品演示视频和作品图片，入围后参加现场评审。', cost: '2026 届不收报名费和评审费。板卡、配件和差旅需自行核对是否有学校支持。',
    mode: '在线报名、提交作品，入围后到南京参加全国决赛。', edition: '第九届 · 2026 年高云选题二',
    status: '2026 届已结束', statusNote: '该赛道全国决赛于 11 月 20–22 日举行。企业原题仍可用于练习。', checked: '2026-11-24',
    try: {label: '阅读高云选题二的电子乐器任务书', url: 'https://www.gowinsemi.com.cn/university/match2026', note: '找「实时多音色合成电子乐器引擎」，先画一条从触摸输入到声音输出的信号路径，选一个音高在仿真中验证。'},
    sources: [
      {label: '高云半导体 · 赛程和企业命题原文', url: 'https://www.gowinsemi.com.cn/university/match2026'},
      {label: '西安交通大学 · 全国报名方式及参赛要求', url: 'https://dice.xjtu.edu.cn/info/1009/3646.htm'},
      {label: '燕山大学 · 1–3 人组队与费用说明', url: 'https://xxgk.ysu.edu.cn/info/1008/22536.htm'},
      {label: '电子科技大学 · 全国总决赛赛后报道', url: 'https://news.uestc.edu.cn/info/1004/45777.htm'}
    ],
    events: [
      {title: 'FPGA 创新设计赛道报名截止', start: '2026-09-23T00:00:00+08:00', kind: 'deadline', timezone: 'Asia/Shanghai'},
      {title: 'FPGA 作品提交截止', start: '2026-11-04T18:00:00+08:00', kind: 'event', timezone: 'Asia/Shanghai', scope: '已报名参赛队'},
      {title: 'FPGA 赛道全国决赛', start: '2026-11-20', end: '2026-11-22', kind: 'event', timezone: 'Asia/Shanghai', scope: '入围队伍'}
    ], goals: ['参加比赛', '做出作品']
  },
  {
    id: 'tableau-iron-viz', title: 'Tableau Iron Viz · 数据可视化', parent: 'Tableau · Iron Viz 全球资格赛',
    kind: '竞赛', contestFormat: '个人赛', region: '国际项目', topics: ['数据可视化', '数据分析'],
    summary: '从公开数据里找一个值得回答的问题，用图表讲出结论。2026 届资格赛以饮食为主题，评委分别看数据分析、视觉设计和叙事。',
    audience: '2026 届规则包含中国合法居民。参赛者须在居住地已成年，注册 Tableau Public 账号，并能用英语介绍作品。另有主办方、政府或其所属机构雇员等排除条款，见当届细则。',
    entry: '从 Iron Viz 官网打开当届资格赛入口，在 Tableau Public 公开发布英文工作簿，再向组委会提交作品链接。',
    team: '仅限以个人身份独立参赛。每人可提交一份作品。', effort: '资格赛需自行选题、整理可公开的数据并设计图表。晋级现场决赛后，三位选手使用同一数据集限时 20 分钟作图。',
    delivery: '可公开访问的英文 Tableau 工作簿，附支撑结论的数据。', cost: '无需购买产品即可参赛。', mode: '资格赛线上提交；2026 届决赛在美国圣迭戈举行。',
    status: '2026 届已结束', archived: true, statusNote: '这一届的资格赛在 2025 年秋季收件，2026 年决赛已结束。可从历届作品了解评审标准，新一届赛题以官网为准。',
    checked: '2026-11-24', edition: '2026 届 · 全球资格赛',
    try: {label: '拆解入围前十的《Late-night Snacks》', url: 'https://www.tableau.com/blog/top-10-qualifiers-iron-viz-2026', note: '在作品页找到 Late-night Snacks，打开图表，试着用一句话概括作者的问题，再指出哪张图给出了证据。'},
    sources: [
      {label: 'Tableau · 官方入口与评分标准', url: 'https://www.tableau.com/community/iron-viz'},
      {label: 'Tableau · 2026 届资格与个人参赛规则（PDF）', url: 'https://wp.sfdcdigital.com/tableau/en-us/wp-content/uploads/sites/47/documents/iron-viz/Tableau-Public-Iron-Viz-2026-Global-Qualifier-Contest-Official-Rules.pdf'},
      {label: 'Tableau · 本届决赛与获奖作品', url: 'https://www.tableau.com/blog/iron-viz-2026-iron-viz-championship'}
    ],
    events: [{title: '2026 届资格赛停止收件', start: '2025-11-21T23:59:00-08:00', kind: 'deadline', timezone: 'America/Los_Angeles'}], goals: ['参加比赛', '做出作品']
  },
  {
    id: 'dgs-interactive', title: '全国大学生广告艺术大赛 · 线上互动广告', parent: '大广赛 · Da 线上互动广告',
    kind: '竞赛', contestFormat: '个人或组队', region: '国内发起', topics: ['人机交互', '前端与移动开发'],
    summary: '把指定命题做成可在手机上体验的互动作品。可以做 H5 页面或小程序，让读者通过一次选择、点击或操作理解你的创意。',
    audience: '面向国内各类高校全日制在校学生，含本科生、研究生和在华留学生。可先向本校负责大广赛的老师确认校内选拔安排。',
    entry: '在官网选命题，完成作品后到提交平台注册上传，再把参赛编号及对应材料交学校。作品由学校和赛区逐级推荐至全国总评审。',
    team: '可独立创作，也可由同校最多 3 名学生合作。第 18 届全国获奖名单中有单人署名的线上互动作品。', effort: '给交互流程设计、手机端实现和真机测试留出时间。全国平台收件与学校初评各有安排。',
    delivery: '提交线上作品链接及二维码，并将两者交给学校。第 18 届要求作品适配主流手机屏幕、最多 15 页，并保持一年可访问。',
    cost: '全国组委会不收参赛费用。', mode: '线上上传作品，按本校要求另行报送材料并参加分级评审。',
    status: '2026 届已结束', archived: true, statusNote: '第 18 届已公布评审结果。本条保留该届互动作品要求，可供了解下一届比赛前练习。', checked: '2026-11-24', edition: '第 18 届 · 2026 年',
    try: {label: '看线上互动广告真题要求，画出三个界面', url: 'https://www.sun-ada.net/home/about_intrs2.html', note: '打开第四部分的「D.互动类」，画出进入作品、用户做选择、得到反馈三个界面，再用手机原型走一遍。'},
    sources: [
      {label: '大广赛组委会 · 参赛指南与互动类作品要求', url: 'https://www.sun-ada.net/home/about_intrs2.html'},
      {label: '西北农林科技大学 · 当届个人与团队报名说明', url: 'https://zhxy.nwsuaf.edu.cn/bksjy/jxdt/43565ff5238e4e03881a4c94701f0ecc.htm'},
      {label: '大广赛组委会 · 当届获奖作品查询', url: 'https://www.sun-ada.net/home/search/index'}
    ],
    events: [{title: '第 18 届作品线上提交截止', start: '2026-06-12T16:00:00+08:00', kind: 'deadline', timezone: 'Asia/Shanghai', scope: '全国提交平台，校内初评时间另定'}], goals: ['参加比赛', '做出作品']
  },
  {
    id: 'james-dyson-award',
    title: '戴森设计大奖 · 工程产品创新',
    parent: 'James Dyson Award · 詹姆斯·戴森基金会',
    aliases: ['James Dyson Award', '产品原型', '无障碍设计', 'CaneSight'],
    kind: '竞赛', contestFormat: '个人或组队', region: '国际项目',
    topics: ['产品设计与创新', '人机交互'],
    summary: '找到一个具体使用难题，制作原型，展示哪次试验改变了你的设计。北京邮电大学的 CaneSight 从手机应用改为可装在已有盲杖上的模块，获 2026 年中国大陆赛区冠军。',
    audience: '中国大陆属于参赛地区。个人须在读工程、产品设计或工业设计等符合条件的专业，或从相关专业毕业不超过四年。计算机相关专业可按官网要求核对课程与学籍证明。',
    entry: '在大赛官网创建账号，上传学生或毕业证明，用英文填写产品介绍和设计过程。跨专业团队由符合专业条件的成员担任队长。',
    team: '可以个人报名，也可以组队。团队成员均须符合在读或毕业年限等条件。',
    effort: '2026 届 3 月开放征集、7 月停止收件。适合已有课程设计或工程原型、能整理出测试与迭代记录的同学。',
    delivery: '提交英文作品说明、原理和迭代过程，配上草图、原型或实验照片。官网会公开展示参赛项目。',
    cost: '官方报名指南未列报名费。准备模型或样机的材料成本取决于作品。',
    mode: '官网在线提交，经所在国家或地区评审后进入国际遴选。',
    status: '2026 届已结束', statusNote: '2026 届全球结果已于 11 月公布。官网已预告 2027 届，具体报名日期待公布。',
    checked: '2026-11-24', edition: '2026 届 · 中国大陆赛区',
    try: {label: '拆解北邮作品 CaneSight 的三次设计选择', url: 'https://www.jamesdysonaward.org/en-US/2026/project/canesight-bridging-the-last-ten-metres-of-travel', note: '阅读 Design process，把手机应用、电子盲杖和可拆模块并排列出，写下每次测试发现的问题以及下一版怎样回应。'},
    sources: [
      {label: '主办方 · 参赛要求、地区与报名材料', url: 'https://www.jamesdysonaward.org/en-us/how-to-enter/'},
      {label: '主办方 · 年度日程与结果', url: 'https://www.jamesdysonaward.org/en-us/home/'},
      {label: '戴森 · 2026 年各地区获奖作品', url: 'https://www.dyson.co.uk/discover/sustainability/james-dyson-award/introducing-our-james-dyson-award-2026-national-winners'}
    ],
    events: [{title: '2026 届全球获奖作品公布', start: '2026-11-04', kind: 'result', scope: '全球结果公告'}],
    goals: ['参加比赛', '做出作品']
  },
  {
    id: 'meiya-forensics', title: '美亚杯 · 取证智能体个人赛', parent: '中国电子数据取证大赛',
    kind: '竞赛', contestFormat: '个人赛', region: '国内发起', topics: ['数字取证', '网络安全', '数据分析'],
    summary: '读懂一批电子记录中的时间、来源与关联，让程序依据组委会提供的检材回答问题，再核对结论是否有证据支持。',
    audience: '面向能在厦门现场完成作品的参赛者。高校学生报名时须区分取证智能体组与另外设置的学生组。',
    entry: '在美亚杯官网注册，按当届通知选择取证智能体组、核对本单位信息并缴费。',
    team: '取证智能体组只设线下个人赛。', effort: '第十二届在 11 月 14 日分制作调试和自主答题两个阶段进行。',
    delivery: '按赛制提交现场开发的文件、关键截图和针对指定检材的答案。', mode: '厦门线下参赛，组委会提供考试机和算力。',
    cost: '第十二届线下注册费每人 600 元，另需考虑到厦门的差旅。',
    status: '本届已结束', statusNote: '此卡记录 2026 年线下取证智能体组。组委会已公布获奖名单，可从往届个人赛案例了解题型。',
    edition: '第十二届 · 2026 年', checked: '2026-11-24',
    try: {label: '用第十届个人赛案情画一条时间线', url: 'https://meiyacup.sdic.com.cn/Mo_index_gci_36.html', note: '先列出题目给出的时间和材料来源，区分已知事实与仍需验证的信息，再查看官方题目和答案。'},
    sources: [
      {label: '组委会 · 取证智能体组两阶段赛制', url: 'https://meiyacup.sdic.com.cn/Ne_d_gci_3_id_107.html'},
      {label: '组委会 · 赛程和个人赛形式', url: 'https://meiyacup.sdic.com.cn/In_index_gci_8.html'},
      {label: '组委会 · 报名要求与费用', url: 'https://meiyacup.sdic.com.cn/In_index_gci_66.html'},
      {label: '组委会 · 本届获奖名单公告', url: 'https://meiyacup.sdic.com.cn/Ne_d_gci_3_id_113.html'}
    ],
    events: [{title: '取证智能体组现场比赛', start: '2026-11-14', kind: 'event', timezone: 'Asia/Shanghai', overall: true}],
    goals: ['参加比赛', '做出作品']
  }
];
