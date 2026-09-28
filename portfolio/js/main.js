document.addEventListener('DOMContentLoaded',()=>{
  const caseStyles=document.createElement('link');
  caseStyles.rel='stylesheet';
  caseStyles.href='css/cases.css';
  document.head.appendChild(caseStyles);
  const style=document.createElement('style');
  style.textContent='.copyright-notice{width:min(1180px,calc(100% - 64px));margin:24px auto;padding:18px 22px;background:#171717;color:#fff;border-left:5px solid #d8f45a;display:flex;gap:20px}.copyright-notice strong{color:#d8f45a;white-space:nowrap}.copyright-notice span{font-size:12px;color:#d5d2ca}.media-case{padding:60px 0 0}.asset-gallery,.demo-grid,.solution-list,.solution-grid{display:grid;gap:14px;margin-left:63px;margin-top:25px}.workshop-gallery{grid-template-columns:repeat(5,1fr)}.scene-gallery{grid-template-columns:repeat(4,1fr)}.asset-gallery figure,.demo-grid figure,.solution-list div,.solution-grid article{margin:0;background:#e8e6de}.asset-gallery img{width:100%;height:170px;object-fit:cover;display:block}.asset-gallery figcaption{padding:10px;font-size:11px}.demo-grid{grid-template-columns:repeat(3,1fr)}.demo-grid img{width:100%;height:220px;object-fit:cover;display:block}.demo-grid figcaption{display:grid;gap:4px;padding:16px}.demo-grid figcaption span,.solution-list p,.solution-grid p{font-size:12px;color:#77736d}.solution-grid{grid-template-columns:repeat(4,1fr)}.solution-grid article,.solution-list div{padding:20px}.solution-list{grid-template-columns:repeat(2,1fr)}.copyright-footer{margin-top:70px}@media(max-width:760px){.copyright-notice{width:calc(100% - 36px);display:block}.copyright-notice strong,.copyright-notice span{display:block}.copyright-notice span{margin-top:8px}.media-case,.pain-solution,.solution-method{width:calc(100% - 36px)}.asset-gallery,.demo-grid,.solution-list,.solution-grid{display:block;margin-left:0}.asset-gallery figure,.demo-grid figure,.solution-list div,.solution-grid article{margin-bottom:12px}.asset-gallery img,.demo-grid img{height:210px}}';
  style.textContent += '.project-visual img{mix-blend-mode:normal!important}';
  document.head.appendChild(style);
  const main=document.querySelector('main');
  if(!main)return;
  const notice=document.createElement('div');
  notice.className='copyright-notice';
  notice.innerHTML='<strong>已申请版权，禁止盗图</strong><span>本页面素材、项目方案与演示内容仅用于作品集展示，未经本人授权不得转载、下载、商用或二次传播。</span>';
  main.prepend(notice);
  const extra=document.createElement('section');
  extra.className='case-block media-case wrap';
  extra.innerHTML='<div class="block-title"><span>09</span><h3>改造车间与场景证据</h3></div><p class="block-desc">以下素材对应改造车间的材质、颜色、涂鸦和环境切换能力。</p><div class="asset-gallery workshop-gallery">'+[['workshop-01-pink.png','车身材质与颜色改造'],['workshop-02-cyan.png','高光材质与场景光照'],['workshop-03-graffiti.png','涂鸦文字与图案定制'],['workshop-04-gold.png','环境与颜色组合'],['workshop-05-white.png','改造结果预览']].map(x=>'<figure><img src="assets/neurodrive/'+x[0]+'" alt="'+x[1]+'"><figcaption>'+x[1]+'</figcaption></figure>').join('')+'</div><div class="asset-gallery scene-gallery">'+[['scene-01-front.png','正面展示场景'],['scene-02-studio.png','展厅 / 摄影棚场景'],['scene-03-platform.png','平台与数字孪生场景'],['scene-04-garage.png','车库主题场景']].map(x=>'<figure><img src="assets/neurodrive/'+x[0]+'" alt="'+x[1]+'"><figcaption>'+x[1]+'</figcaption></figure>').join('')+'</div>';
  const demos=document.createElement('section');
  demos.className='case-block media-case wrap';
  demos.innerHTML='<div class="block-title"><span>10</span><h3>演示视频与模型制作</h3></div><p class="block-desc">第一个动图为团队使用 Blender 自行制作的 3D 汽车模型演示；系统首页改为静态界面图，另展示图片引入与 3D 生成流程。</p><div class="demo-grid">'+[['demo-01-blender-model.gif','Blender 自建 3D 模型演示','团队自行完成模型制作与展示。'],['workspace-preview.png','3D 创作工作台','展示创作参数与 3D 预览的统一界面。'],['demo-03-import-interface.gif','引入界面演示','展示从图片生成到 3D 模型的关键流程。']].map(x=>'<figure><img src="assets/neurodrive/'+x[0]+'" alt="'+x[1]+'"><figcaption><b>'+x[1]+'</b><span>'+x[2]+'</span></figcaption></figure>').join('')+'</div>';
  const pain=document.createElement('section');
  pain.className='case-block pain-solution wrap';
  pain.innerHTML='<div class="block-title"><span>11</span><h3>本作品要解决的痛点问题</h3></div><p class="solution-lead">本作品聚焦解决 NeuroDrive 系统在用户成果分享、社区灵感获取、资产积累留存及激励机制方面的核心痛点，通过构建一站式设计分享闭环，实现 3D 模型生成后无需切换平台即可完成发布、描述与打标签，形成“生成 → 发布 → 交互”无缝工作流；打造轻量化社区发现体验，以简洁卡片式 UI 和高效筛选功能，让用户快速精准获取优质设计内容；建立互动激励机制，通过点赞、收藏及个人作品数据展示，激发设计师创作热情，并为后续社交功能铺垫数据基础；最终推动 AI 生成资产的价值转化，将模型结果转化为可分享、可沉淀的设计成果，构建设计师专属作品库，为系统用户增长与留存提供新动力。</p><div class="solution-grid">'+[['成果分享闭环','从 3D 模型生成到发布、描述、打标签和互动，无需切换平台。'],['社区灵感获取','以简洁卡片式 UI 和高效筛选功能快速获取优质设计内容。'],['资产积累留存','将 AI 生成资产转化为可分享、可沉淀的设计成果。'],['互动激励机制','通过点赞、收藏及个人作品数据展示激发创作热情。']].map(x=>'<article><b>'+x[0]+'</b><p>'+x[1]+'</p></article>').join('')+'</div>';
  const solution=document.createElement('section');
  solution.className='case-block solution-method wrap';
  solution.innerHTML='<div class="block-title"><span>12</span><h3>解决问题的思路</h3></div><div class="solution-list">'+[['01 · 降低设计门槛','采用智谱 CogView-3-Flash 模型实现文本生成图像，用户输入文字即可获得汽车图像。'],['02 · 简化设计流程','采用 HunYuan3D 模型整合文本描述到 3D 模型的完整工作流，支持批量生成。'],['03 · 提升模型交互性','基于几何特征进行语义分割，识别汽车部件并支持悬停高亮和信息显示。'],['04 · 提供个性化定制平台','支持材质改装、轮毂替换、环境切换、涂鸦定制等选项。'],['05 · 构建社区协作生态','支持发布、浏览、点赞、套用方案，通过 UniqueConstraint 防重复。'],['06 · 实现数字孪生体验','通过 SSE 实时推流连接服务端与客户端，支持远程控制和预设场景。'],['07 · 提供便捷分享功能','通过 Three.js 截图并调用 GLM-4V 分析车辆信息，生成 PNG 分享卡片。'],['08 · 丰富视觉体验','支持广场、库房、科技馆、车道、4S 展示台、摄影棚及明暗主题切换。']].map(x=>'<div><b>'+x[0]+'</b><p>'+x[1]+'</p></div>').join('')+'</div>';
  const about=document.querySelector('#about');
  if(about){about.before(extra,demos,pain,solution)}else{main.append(extra,demos,pain,solution)}
  const evidenceTitle=[...document.querySelectorAll('.block-title h3')].find(title=>title.textContent.includes('关键功能证据'));
  if(evidenceTitle)evidenceTitle.closest('.case-block').remove();
  const backgroundTitle=[...document.querySelectorAll('#case .block-title h3')].find(title=>title.textContent.includes('背景与痛点'));
  const background=backgroundTitle?.closest('.case-block');
  if(background){
    background.append(...pain.querySelectorAll('.solution-lead,.solution-grid'));
    pain.remove();
    background.after(solution);
  }
  const backgroundNumber=background?.querySelector('.block-title span');
  if(backgroundNumber)backgroundNumber.textContent='03';
  const solutionNumber=solution.querySelector('.block-title span');
  if(solutionNumber)solutionNumber.textContent='04';
  let nextNumber=5;
  document.querySelectorAll('#case > .case-block').forEach(block=>{
    if(block===background||block===solution)return;
    const title=block.querySelector('.block-title h3');
    const number=block.querySelector('.block-title span');
    if(title?.textContent.includes('系统五大功能'))return;
    if(number)number.textContent=String(nextNumber++).padStart(2,'0');
  });
  const footerNotice=document.createElement('div');
  footerNotice.className='copyright-notice copyright-footer';
  footerNotice.innerHTML='<strong>已申请版权，禁止盗图</strong><span>本作品集内容仅用于求职展示。查看完整 PPT 或技术方案文档，请先联系本人。</span>';
  main.append(footerNotice);
  document.querySelectorAll('a[href*="NeuroDrive-"]').forEach(link=>{link.removeAttribute('target');link.href='mailto:shiyider@qq.com?subject=申请查看 NeuroDrive 项目材料';link.textContent='联系本人获取项目材料 ↗'});
  const work=document.querySelector('#work');
  const neuroPanel=document.querySelector('#case');
  if(work&&neuroPanel){
    document.querySelectorAll('.media-case,.pain-solution,.solution-method').forEach(section=>neuroPanel.append(section));
    neuroPanel.id='case-neurodrive';
    neuroPanel.classList.add('case-panel');
    const firstCard=work.querySelector('.featured-project');
    const firstToggle=firstCard?.querySelector('.button.dark');
    if(firstToggle){firstToggle.classList.add('case-toggle');firstToggle.dataset.case='case-neurodrive';firstToggle.setAttribute('aria-expanded','false');firstToggle.innerHTML='展开案例 <span>↓</span>';}
    neuroPanel.querySelectorAll('.source-links a').forEach((link,index)=>{link.removeAttribute('target');link.removeAttribute('href');link.className='material-button';link.dataset.material=index?'NeuroDrive 完整文档':'NeuroDrive 完整 PPT';link.textContent=index?'完整文档':'完整 PPT';});
    const close=document.createElement('button');close.className='case-close';close.dataset.case='case-neurodrive';close.textContent='收起案例 ↑';neuroPanel.append(close);
  }
  const nanxiCard=document.createElement('article');
  nanxiCard.className='featured-project nanxi-project';
  nanxiCard.innerHTML='<div class="project-visual"><div class="visual-label">CASE 02 / 2026</div><img src="assets/nanxi/slide-04.png" alt="梦里南溪微信小程序首页"><div class="visual-caption">梦里南溪<br><small>AI × CULTURE × RURAL TOURISM</small></div></div><div class="project-content"><p class="project-kicker">案例 02 · 智慧农文旅小程序</p><h3>梦里南溪</h3><p class="project-title">打造岭南水乡文化产业融合项目</p><p class="project-desc">面向乡镇文旅的一站式 AI 小程序，以溪小柚导览、地图打卡、农产商城与积分权益连接游客、居民、商户和运营者，形成“咨询—体验—消费—复访”闭环。报告披露农产月均销售 +30%、景点打卡率 +40%。</p><div class="tag-row"><span>微信小程序</span><span>AI 攻略</span><span>农文旅融合</span><span>乡村振兴</span></div><div class="project-meta"><div><small>项目呈现</small><b>需求分析 · 产品架构 · 交互设计</b></div><div><small>项目材料</small><b>29 页答辩 PPT + 65 页方案文档</b></div></div><a class="button dark case-toggle" href="#case-nanxi" data-case="case-nanxi" aria-expanded="false">展开案例 <span>↓</span></a></div>';
  if(work)work.append(nanxiCard);
  const nanxi=document.createElement('section');
  nanxi.id='case-nanxi';nanxi.className='case case-panel nanxi-case wrap';
  nanxi.innerHTML='<div class="nanxi-hero"><img src="assets/nanxi/slide-04.png" alt="梦里南溪产品首页"><div class="nanxi-summary"><p class="eyebrow">CASE STUDY / 梦里南溪</p><h2>用数字化连接<br>水乡文化与产业价值</h2><p>南溪镇拥有水乡生态、特色农产和非遗文化，却面临信息闭塞、人才不足、产业分散与农产销路有限等问题。产品以一站式微信小程序连接游客、居民、商户和运营者。</p><div class="nanxi-stats"><div><b>7</b><span>核心服务模块</span></div><div><b>40+</b><span>微信云函数</span></div><div><b>19</b><span>IP 交互形象</span></div><div><b>≤1.5s</b><span>页面加载目标</span></div></div><div class="material-row"><button class="material-button" data-material="梦里南溪完整 PPT">完整 PPT</button><button class="material-button" data-material="梦里南溪完整文档">完整文档</button></div></div></div><div class="case-block"><div class="block-title"><span>01</span><h3>背景与产品机会</h3></div><div class="pain-grid"><div><b>资源丰富，入口分散</b><p>景点、活动、民宿、农产与非遗信息缺少统一入口，游客决策链路长。</p></div><div><b>产业有货，转化不足</b><p>本地特色农产缺少品牌化展示、线上交易和可信溯源能力。</p></div><div><b>文化有底蕴，互动不足</b><p>传统展示偏单向，难以吸引年轻用户持续参与、分享和复访。</p></div></div></div><div class="case-block"><div class="block-title"><span>02</span><h3>用户与服务闭环</h3></div><div class="flow"><div><span>游客</span><b>攻略 / 导览 / 住宿</b></div><i>→</i><div><span>居民</span><b>活动 / 文化 / 社区</b></div><i>→</i><div><span>商户农户</span><b>商品 / 订单 / 溯源</b></div><i>→</i><div><span>运营者</span><b>内容 / 数据 / 管理</b></div></div><div class="feature-list"><p><b>核心闭环</b> 咨询 → 导览 → 活动 → 住宿 → 消费 → 互动</p><p><b>产品目标</b> 将资源展示转为可体验、可交易、可持续运营的数字化服务。</p></div></div><div class="case-block"><div class="block-title"><span>03</span><h3>核心功能体系</h3></div><div class="nanxi-functions">'+[['AI 文旅导览','自然语言咨询、个性化推荐、AI 多日攻略与动态调程。'],['景点与住宿','地图导览、AR 讲解、活动报名、民宿筛选和在线预订。'],['农产商城与溯源','商品筛选、购物车、订单支付、本地/外地配送和扫码溯源。'],['互动农场游戏','湿度、杂草、酸度养成任务，积分可兑换优惠券或门票。'],['文化与非遗','16 项文化知识内容、活动日历与非遗体验预约。'],['UGC 社区与用户中心','打卡笔记、点赞互动、订单资产、积分与收藏管理。']].map(x=>'<article><span class="feature-number">PRODUCT</span><h4>'+x[0]+'</h4><p>'+x[1]+'</p></article>').join('')+'</div></div><div class="case-block"><div class="block-title"><span>04</span><h3>AI 与技术架构</h3></div><div class="nanxi-tech"><img src="assets/nanxi/slide-25.png" alt="梦里南溪技术架构"><div><h4>从模型能力到可执行服务</h4><ul><li>Coze Bot / DeepSeek：AI 问答、行程规划与结构化输出</li><li>本地知识库与 RAG：降低景点和文化内容幻觉</li><li>微信原生框架 + Vant Weapp：小程序交互与组件体系</li><li>40+ 云函数：订单、支付、积分、UGC、导览与用户服务</li><li>微信云数据库 / 云存储：业务数据与内容资产沉淀</li><li>地图、AR、IoT 接口：连接线下场景与智慧农场</li></ul></div></div></div><div class="case-block"><div class="block-title"><span>05</span><h3>产品界面与视觉证据</h3></div><div class="nanxi-gallery">'+[['slide-04.png','首页与一站式服务入口'],['slide-06.png','溪小柚 IP 与品牌系统'],['slide-10.png','UGC 文旅社区'],['slide-12.png','景点、活动与文化详情'],['slide-18.gif','农产商城与溯源'],['slide-19.gif','互动农场游戏']].map(x=>'<figure><img src="assets/nanxi/'+x[0]+'" alt="'+x[1]+'"><figcaption>'+x[1]+'</figcaption></figure>').join('')+'</div></div><div class="case-block"><div class="block-title"><span>06</span><h3>竞品判断与差异化</h3></div><div class="matrix"><div><span>携程旅行</span><b>服务全面，但地域特色弱</b></div><div><span>普宁文旅</span><b>资讯导向，互动与交易弱</b></div><div><span>真乡小程序</span><b>跨区域查询，缺少本地闭环</b></div><div class="highlight"><span>梦里南溪</span><b>AI + AR + 电商 + 游戏 + 在地文化</b></div></div></div><div class="case-block"><div class="block-title"><span>07</span><h3>PRD 关键指标</h3></div><div class="prd-grid"><div><small>P0 · AI 攻略</small><h4>可信且可执行</h4><p>基于预算、时间、偏好、热度与位置生成多日路线，并支持编辑调整。</p><label>验收指标</label><p class="accept">结构化 JSON 输出；路线调用真实候选池；推荐可编辑。</p></div><div><small>P0 · 交易闭环</small><h4>从浏览到履约</h4><p>支持住宿预订、农产选购、支付、订单管理和物流查询。</p><label>验收指标</label><p class="accept">关键路径完整；订单状态同步；支持取消与售后入口。</p></div><div><small>P1 · 互动留存</small><h4>游戏与积分</h4><p>打卡和种植任务产生积分，连接优惠券、门票与农产消费。</p><label>验收指标</label><p class="accept">积分可追溯；奖励规则透明；任务难度可动态调整。</p></div></div></div><div class="case-block two-col"><div><div class="block-title"><span>08</span><h3>商业与运营模式</h3></div><ul class="clean-list"><li><b>交易收入</b><span>农产销售分成、住宿和活动合作收益</span></li><li><b>运营增长</b><span>内容种草、积分任务、UGC 社区与复访</span></li><li><b>品牌资产</b><span>溪小柚 IP、非遗内容和南溪特色商品</span></li><li><b>复制路径</b><span>以南溪为样板，拓展周边县域农文旅</span></li></ul></div><div><div class="block-title"><span>09</span><h3>项目价值</h3></div><p>项目不只是信息展示小程序，而是把旅游服务、文化传播、农产交易、互动激励和数据运营组织成同一平台，并提出向周边县域复制的演进路径。</p><img src="assets/nanxi/slide-27.png" alt="项目技术创新与价值" style="width:100%;margin-top:18px"></div></div><button class="case-close" data-case="case-nanxi">收起案例 ↑</button>';
  if(work)work.after(nanxi);
  const modal=document.createElement('div');modal.className='download-modal';modal.innerHTML='<div class="download-dialog"><h3>可以联系作者说明下载用意噢~</h3><p>为了保护项目材料与图片版权，请通过邮箱或电话联系作者，说明材料用途后获取完整文件。</p><div class="download-actions"><a href="mailto:shiyider@qq.com?subject=申请获取项目材料">一键发邮件</a><a href="tel:18712289371">一键拨打电话</a></div><button class="modal-close" type="button">暂不联系</button><div class="copyright-mini">已申请版权，禁止盗图</div></div>';document.body.append(modal);
  document.addEventListener('click',event=>{const material=event.target.closest('[data-material]');if(material){event.preventDefault();modal.classList.add('is-open');return}const toggle=event.target.closest('.case-toggle');if(toggle){event.preventDefault();const panel=document.getElementById(toggle.dataset.case);const open=!panel.classList.contains('is-open');document.querySelectorAll('.case-panel').forEach(item=>item.classList.remove('is-open'));document.querySelectorAll('.case-toggle').forEach(item=>item.setAttribute('aria-expanded','false'));if(open){panel.classList.add('is-open');toggle.setAttribute('aria-expanded','true');panel.scrollIntoView({behavior:'smooth'})}return}const close=event.target.closest('.case-close');if(close){document.getElementById(close.dataset.case)?.classList.remove('is-open');document.querySelector('[data-case="'+close.dataset.case+'"]')?.setAttribute('aria-expanded','false');return}if(event.target===modal||event.target.closest('.modal-close'))modal.classList.remove('is-open')});
});
