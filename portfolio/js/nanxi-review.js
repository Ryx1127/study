document.addEventListener('DOMContentLoaded', () => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'css/nanxi-review.css';
  document.head.appendChild(stylesheet);

  const panel = document.querySelector('#case-nanxi');
  if (!panel) return;
  const originalContent = panel.innerHTML;
  const section = (n, title, intro, body) => '<section class="nanxi-review-section"><div class="nanxi-review-heading"><span>' + n + '</span><div><h3>' + title + '</h3><p>' + intro + '</p></div></div>' + body + '</section>';
  const table = (headers, rows) => '<div class="nanxi-review-table-wrap"><table class="nanxi-review-table"><thead><tr>' + headers.map(x => '<th>' + x + '</th>').join('') + '</tr></thead><tbody>' + rows.map(row => '<tr>' + row.map(x => '<td>' + x + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';

  const report =
    '<div class="nanxi-review-hero"><div><p class="eyebrow">CASE STUDY / 梦里南溪</p><h2>把乡村资源，<br>变成可体验、可消费、可复访的数字服务</h2><p class="nanxi-review-lead">面向乡镇文旅场景的一站式 AI 小程序，串联「AI 导览 → 地图打卡 → 农产商城 → 积分留存」，把分散的乡村资源变成可消费的数字资产。</p><div class="nanxi-review-tags"><span>数字乡村</span><span>农文旅融合</span><span>AI 导览</span><span>微信小程序</span></div></div><div class="nanxi-review-highlights"><small>报告披露的项目成果</small><div><b>4,329</b><span>培训人数</span></div><div><b>1.2 万</b><span>带动村民</span></div><div><b>+30%</b><span>农产月均销售</span></div><div><b>+40%</b><span>景点打卡率</span></div><div class="nanxi-review-wide-stat"><b>超 2,000 万</b><span>全镇累计增收</span></div></div></div>' +
    '<div class="nanxi-review-materials"><span>梦里南溪 · AI 产品经理项目复盘</span><div><button class="material-button" data-material="梦里南溪完整 PPT">完整 PPT</button><button class="material-button" data-material="梦里南溪完整作品集报告">完整报告</button></div></div>';

  const context = '<div class="nanxi-review-context-grid"><div><b>行业</b><span>数字乡村 / 农文旅融合 / 乡村振兴</span></div><div><b>场景</b><span>行前规划、行中体验、行后留存</span></div><div><b>用户角色</b><span>游客、本地居民、商户 / 农户、政府 / 管理员</span></div><div><b>业务目标</b><span>游客闭环、农产线上化与非遗体验化、形成可复制的南溪模式</span></div></div>';
  const pain = '<div class="nanxi-review-two"><article class="nanxi-review-card"><h4>传统流程与三大断点</h4><p>游客口头问路 → 看横幅 → 找农户买货 → 现金 / 微信转账 → 无回访；商户等客、靠熟人介绍；政府资源散落在 Excel、公众号和横幅上。</p><ul><li><b>信息孤岛：</b>景点、农产、住宿、活动分头发布</li><li><b>服务断层：</b>有内容没交互，有农产没信任</li><li><b>留存为零：</b>游客离开后失联，缺少积分、社区和私域</li></ul></article><article class="nanxi-review-card"><h4>用户真实抱怨</h4><blockquote>“不知道红松茸什么时候摘、去哪摘”<br>“古镇讲解像背书，小朋友根本不想听”<br>“农产看着好，但不知道是不是本地种的”<br>“玩完就完了，没东西让我再回来”</blockquote></article></div>' +
    '<h4 class="nanxi-review-subhead">问题对应的产业损失</h4>' + table(['损失项', '量化 / 表现'], [['农产溢价低', '鲜菇批发 5–8 元 / 斤 → 平台化后 15 元 / 斤'], ['文旅收入单票化', '只有门票 / 游船，缺少农产、住宿、非遗组合收入'], ['运营黑盒', '游客偏好和农产销售主要靠经验判断']]) + context;

  const ai = '<div class="nanxi-review-feature-grid"><article><b>自然语言咨询</b><p>游客问法多样，人工与关键词规则难以覆盖。</p></article><article><b>个性化推荐</b><p>结合时间、人群、天气和农产时令动态组合。</p></article><article><b>人格化文化讲解</b><p>由“溪小柚”IP 持续讲解，而非静态文案。</p></article></div>' +
    '<div class="nanxi-review-two nanxi-review-decision"><article><h4>AI 方案</h4><p>Coze Bot + 知识库 + conversationId 多轮上下文；比自建大模型成本低，也比关键词机器人更自然。</p></article><article><h4>技术架构</h4><p>微信小程序（Vant Weapp + 自定义组件）；微信云开发（40+ 云函数、云数据库、云存储）；Coze Bot API、微信地图 API 与微信支付。</p></article></div>' +
    '<h4 class="nanxi-review-subhead">架构取舍</h4>' + table(['方案', '选择 / 排除理由'], [['微信云开发', '三人学生团队免运维、免服务器；鉴权 / 支付 / 地图衔接直接'], ['微信小程序', '扫码即进、无需下载，中老年用户也容易使用'], ['云函数', '承载 AI 调用、订单、积分、打卡，并支持鉴权与兜底'], ['自建 Django / Java 后端', '排除：运维重，三人团队难以承担'], ['纯公众号 H5', '排除：交互弱，不适合地图、小游戏和 AR'], ['携程 / 美团', '排除：流量归平台，难沉淀南溪私域、农产与 IP'], ['自训本地大模型', '排除：缺少算力与语料，乡镇知识还需持续更新']]);

  const journey = '<div class="nanxi-review-journey"><div><small>行前规划</small><b>路线 / 活动 / 农产</b></div><i>→</i><div><small>行中体验</small><b>AI 讲解 / 地图打卡 / AR</b></div><i>→</i><div><small>消费转化</small><b>农产 / 住宿 / 活动</b></div><i>→</i><div><small>行后留存</small><b>社区 / 积分 / 复购</b></div></div>' +
    table(['模块', '核心功能', '优先级'], [['AI 文旅导览', '溪小柚多轮问答、路线生成、AR 讲解、历史对话', 'P0'], ['地图导览', '标准 / 卫星 / 3D 地图、POI、500m GPS 打卡、Haversine 校验', 'P0'], ['农产商城', '分类浏览、溯源、积分抵扣（100 积分 = 10 元）、快递 / 自提', 'P0'], ['住宿预订', '房态管理、下单、订单流转', 'P1'], ['文化知识库', '16 项非遗、红色文化、名人故事、活动预约', 'P1'], ['互动留存', '浇水小游戏、签到、排行榜、积分商城', 'P1'], ['用户中心', '订单、地址、收藏、积分、消息', 'P0']]) +
    '<div class="nanxi-review-media"><figure><img src="assets/nanxi/slide-04.png" alt="梦里南溪小程序首页"><figcaption>一站式服务入口</figcaption></figure><figure><img src="assets/nanxi/slide-06.png" alt="溪小柚 IP 形象"><figcaption>溪小柚 IP 与文化表达</figcaption></figure><figure><img src="assets/nanxi/slide-10.png" alt="梦里南溪文旅社区"><figcaption>UGC 社区与互动</figcaption></figure><figure><img src="assets/nanxi/slide-18-optimized.gif" alt="农产商城与溯源"><figcaption>农产商城与溯源</figcaption></figure><figure><img src="assets/nanxi/slide-19-optimized.gif" alt="互动农场游戏"><figcaption>互动农场与积分留存</figcaption></figure></div>';

  const dashboard = table(['看板指标', '报告中的数据', '变化 / 补充'], [['今日访客', '1,280', '▲ 12%'], ['打卡人数', '640（集齐 58 人）', '—'], ['商城 GMV', '¥18,600', '▲ 30%'], ['热销品', '红松茸 / 淮山 / 灵芝粉', '—'], ['路线 TOP1', '古镇 → 游船 → 登峰村', '—'], ['积分发放 / 兑换', '12,400 / 7,900', '—'], ['农产溯源查询', '430 次', '—']]) + '<div class="nanxi-review-note"><b>运营价值</b><span>观察游客去了哪里、买了什么、是否复访，为路线、农产供给与活动运营提供依据。</span></div>';

  const validation = '<h4 class="nanxi-review-subhead">指标目标与实测</h4>' + table(['指标', '目标', '报告实测 / 披露'], [['页面加载', '≤ 1.5s', '1.2s'], ['AR / 全景启动', '≤ 1s', '0.8s'], ['接口响应', '≤ 800ms', '650ms'], ['AI 问答准确率', '≥ 85%', '红松茸地点等用例通过'], ['景点打卡率提升', '+40%', '项目总结披露 +40%'], ['农产月销增长', '+30%', '项目总结披露 +30%'], ['单次使用时长', '8–12 min', '使用概述披露'], ['核心功能触达率', '>75%', '使用概述披露']]) +
    '<h4 class="nanxi-review-subhead">真实功能测试</h4>' + table(['测试项', '测试结果'], [['AI 问答：红松茸采摘地点', '返回登峰村基地与时间，通过'], ['地图跳转：点击南溪古镇', '成功进入详情页'], ['积分抵扣：100 积分', '抵扣 10 元'], ['GPS 打卡：500m 范围', '范围内成功；超距提示“距离不足”'], ['订单同步：退出后重登', '订单仍保留'], ['并发：100 用户同时访问导览', '无超时']]) +
    '<h4 class="nanxi-review-subhead">性能与业务结果</h4>' + table(['类别', '指标', '报告数据'], [['性能', '页面加载 / AR 启动 / 接口响应', '1.2s（标准 1.5s）/ 0.8s（标准 1s）/ 650ms（标准 800ms）'], ['性能', '兼容性', 'iOS 14+ / Android 10+，95% 机型正常'], ['业务', '景点打卡率 / 农产线上月均销售增长', '+40% / +30%'], ['业务', '培训人数 / 带动村民参与', '4,329 人 / 1.2 万人'], ['业务', '全镇累计增收', '超 2,000 万元'], ['业务', '鲜菇溢价', '15 元 / 斤（原批发 5–8 元）'], ['业务', '村集体创收（灵芝孢子粉）', '超 11 万元']]);

  const retrospection = table(['原假设', '结果 / 发现', '修正方向'], [['用户会主动问 AI', '多数先点首页卡片，AI 是兜底入口', '把 AI 嵌入景点页 / 商品页'], ['GPS 打卡足以防作弊', '模拟定位 / 代打卡仍存在', '基站 / Wi-Fi 辅助 + 扫码 + 轻量人脸核验'], ['小游戏能长期留人', '无社交对战、赛季、实物权益时易流失', '积分兑换门票、民宿、非遗课程'], ['农商政共用一个小程序', '单端信息架构过于拥挤', '拆分 C 端、商户端、政府大屏'], ['Coze 可长期不变', '知识库人工维护易过期', '后台更新知识、自动同步、人工审核']]) +
    '<h4 class="nanxi-review-subhead">优化路线图</h4>' + table(['阶段', '方向', '预期收益（报告目标）'], [['V1.1', 'AI 问答升级为地理围栏“随走随讲”', '使用时长 +50%'], ['V1.1', '积分商城接入游船券 / 民宿券 / 非遗课', '复访率 +30%'], ['V1.2', '农产订阅“每月南溪时令箱”', '客单价 +40%'], ['V1.2', '门票 + 游船 + 农产 + 民宿套票引擎', '综合收入 +25%'], ['V2.0', '统一底座替换乡镇名称、资源与 IP，复制南溪模式', '从项目走向平台']]);

  panel.innerHTML = report +
    section('01', '项目机会：资源不缺，缺的是贯通的服务链路', '南溪拥有水乡生态、特色农产和非遗文化，但信息分散、服务断层，游客离开后难以持续运营。', pain) +
    section('02', '产品策略：让 AI 解决规则和静态内容难覆盖的问题', 'AI 用于理解自然语言、组合个性化服务，并让文化讲解更有亲和力。', ai) +
    section('03', '产品产出：按优先级搭起行前、行中、行后的服务闭环', '串联路线规划、现场体验、交易和复访，并覆盖游客、居民、商户 / 农户与政府运营者。', journey) +
    section('04', '运营数据：让资源与服务效果可观察', '通过访客、打卡、交易、路线偏好和积分行为，为供给和运营调整提供依据。', dashboard) +
    section('05', '验证结果：目标、功能用例与实际披露分开展示', '以下分别列出指标目标、报告实测、功能测试和业务结果，避免将目标误读为结果。', validation) +
    section('06', '复盘与迭代：把失效假设转成下一步产品动作', '真实使用揭示了入口、激励、防作弊和多角色信息架构上的限制。', retrospection) +
    '<div class="nanxi-review-verdict"><small>一句话产品判断</small><h3>梦里南溪不是“做个小程序”，<br>而是乡镇农文旅的产业操作系统入口</h3><p>用 AI IP + 微信私域 + 积分闭环，把乡镇的“水、农、非遗”变成可浏览、可购买、可复访的数字资产。当前是农文旅 MVP 样板间，下一步要从体验产品走向产业操作系统。</p></div>' +
    '<details class="nanxi-review-legacy"><summary>原有作品集补充内容（界面、架构、竞品与商业模式）</summary><div>' + originalContent + '</div></details>' +
    '<button class="case-close" data-case="case-nanxi">收起案例 ↑</button>';
});
