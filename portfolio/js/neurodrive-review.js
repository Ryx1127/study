document.addEventListener('DOMContentLoaded', () => {
  const reviewStyles = document.createElement('link');
  reviewStyles.rel = 'stylesheet';
  reviewStyles.href = 'css/neurodrive-review.css';
  document.head.appendChild(reviewStyles);
  const mediaStyle = document.createElement('style');
  mediaStyle.textContent = '.review-media video{display:block;width:100%;height:180px;object-fit:cover;background:#dddcd5}';
  document.head.appendChild(mediaStyle);

  const panel = document.querySelector('#case-neurodrive');
  if (!panel) return;
  const originalContent = panel.innerHTML;

  panel.innerHTML = `
    <div class="review-hero">
      <div>
        <p class="eyebrow">CASE STUDY / NEURODRIVE</p>
        <h2>把专业 3D 建模，<br>变成“说一句话就能出车”</h2>
        <p class="review-lead">面向汽车设计爱好者与半专业用户的一站式 AI 汽车设计平台，打通「文本 → 图像 → 3D 模型 → 语义交互 → 社区分享 → 数字孪生」，降低从灵感到可视化验证的门槛。</p>
        <div class="review-tags"><span>AI Agent</span><span>HunYuan3D</span><span>汽车设计</span><span>数字孪生</span></div>
      </div>
      <div class="review-outcome"><small>核心结果（报告数据）</small><b>92%</b><span>单用户平均设计验证时间下降</span><b>61% <i>非专业用户</i></b><b>74% <i>首次做出车</i></b></div>
    </div>
    <div class="review-materials"><span>项目复盘 · AI 产品经理作品集</span><div><button class="material-button" data-material="NeuroDrive 完整 PPT">完整 PPT</button><button class="material-button" data-material="NeuroDrive 完整技术方案">技术方案 PDF</button></div></div>

    <div class="review-section">
      <div class="review-heading"><span>01</span><div><h3>为什么做：把高门槛、长周期的流程接起来</h3><p>传统汽车外观设计从草图到评审要跨工具、跨角色；单方案耗时 3–10 天，协作通常需要 5 人以上。</p></div></div>
      <div class="review-two">
        <div class="review-card"><h4>用户卡点</h4><ul><li>文 → 图 → 3D 分散在 3 类工具，早期沟通成本高</li><li>非专业用户进不来；模型生成后不能点部件、改材质</li><li>设计成果难传播，社区图片多、可复用 3D 资产少</li></ul><blockquote>“我就想看看哑光黑宽体 GT 长什么样，为什么要学 Blender？”<br>“设计师改一次轮毂要半天。”<br>“教学视频里说 A 柱，我根本找不到。”</blockquote></div>
        <div class="review-card"><h4>业务机会</h4><ul><li>概念验证成本高，创新过早收敛</li><li>改装转化低，用户只逛不买</li><li>社区留存差，尚未形成 UGC 飞轮</li></ul><p class="review-note"><b>行业：</b>汽车外观设计 = 高门槛 + 长周期 + 强专业工具依赖<br><b>核心用户：</b>汽车设计学生、改装爱好者、初级设计师、汽车自媒体<br><b>场景：</b>概念车脑暴、改装预览、教学科普、社区 UGC、销售展示<br><b>业务目标：</b>降低 3D 内容生产门槛，构建“生成 → 展示 → 交互 → 社区”飞轮。</p></div>
      </div>
    </div>

    <div class="review-section">
      <div class="review-heading"><span>02</span><div><h3>怎么解决：让生成进入可编辑、可复用的工作流</h3><p>不止生成一张图，而是把方案推进到可观察、可交互、可继续改造和分享的 3D 资产。</p></div></div>
      <div class="review-flow"><div><small>输入</small><b>文本 / 参考图 / 设计约束</b></div><i>→</i><div><small>生成</small><b>CogView-3-Flash 出图</b></div><i>→</i><div><small>建模</small><b>RMBG 去背景 + HunYuan3D</b></div><i>→</i><div><small>交互</small><b>GLB + PointNet / 几何规则识别 13 类部件</b></div><i>→</i><div><small>呈现</small><b>Three.js + SSE / IoT 孪生</b></div></div>
      <div class="review-feature-grid">
        <article><b>创作中心</b><p>提示词增强、批量生成 4 张图；图生 3D 采用异步任务与 SSE 推送；支持材质、轮毂、场景和涂鸦改造。</p></article>
        <article><b>3D 语义交互</b><p>识别 13 类部件，悬停高亮并展示部件信息；从“看模型”走到“找得到、改得动”。</p></article>
        <article><b>汽车身份证</b><p>Three.js 截图 → GLM-4V 分析 → 生成可分享卡片并导出 PNG。</p></article>
        <article><b>社区与数字孪生</b><p>支持方案发布、浏览、点赞、套用（防重复）；IoT 通过 SSE 实时推送并联动 3D 场景。</p></article>
      </div>
      <div class="review-media"><figure><img src="assets/neurodrive/demo-02-system-home-optimized.gif" alt="NeuroDrive 3D 创作工作台动态演示"><figcaption><b>3D 创作工作台</b><span>从输入、生成到预览和改造的动态演示</span></figcaption></figure><figure><img src="assets/neurodrive/modification-workshop.png" alt="汽车改造车间"><figcaption><b>汽车改造车间</b><span>材质、颜色、轮毂、天气与部件查看</span></figcaption></figure><figure><video autoplay muted loop playsinline preload="metadata" poster="assets/neurodrive/iot-digital-twin.png" aria-label="IoT 数字孪生车辆与传感器状态演示"><source src="assets/neurodrive/media1.mp4" type="video/mp4"></video><figcaption><b>IoT 数字孪生</b><span>3D 车辆与实时传感器状态动态联动</span></figcaption></figure></div>
    </div>

    <div class="review-section">
      <div class="review-heading"><span>03</span><div><h3>关键产品决策：按 MVP 约束选最短闭环</h3><p>目标是先验证“用户能否完成一次汽车创作并愿意复用”，而不是堆叠技术复杂度。</p></div></div>
      <div class="review-table-wrap"><table class="review-table"><thead><tr><th>决策</th><th>考虑与取舍</th></tr></thead><tbody>
        <tr><td>原生 JS + Three.js</td><td>不引入 React，避免重前端影响 3D 性能。</td></tr>
        <tr><td>Flask 后端</td><td>便于快速接入第三方模型，适合 MVP 验证。</td></tr>
        <tr><td>SSE 实时推送</td><td>IoT 以服务端推状态为主，无需双向聊天；比 WebSocket 更轻。</td></tr>
        <tr><td>社区关系表</td><td>先跑通发布、点赞、套用，不提前做推荐系统。</td></tr>
        <tr><td>不选纯 Blender 插件</td><td>非专业用户难以上手。</td></tr>
        <tr><td>不选 Meshy 类 SaaS / 只做文生图</td><td>缺少社区、IoT 和中文汽车语境；汽车是“体”，不只是“图”。</td></tr>
        <tr><td>不自训 3D 大模型</td><td>数据、算力与成本不适合当前阶段，优先组合现有模型验证价值。</td></tr>
      </tbody></table></div>
    </div>

    <div class="review-section">
      <div class="review-heading"><span>04</span><div><h3>产品产出与指标：先定义能不能用，再看是否形成习惯</h3><p>功能、性能和留存指标同时覆盖生成质量、专业可控性与社区复用。</p></div></div>
      <div class="review-two"><div><h4 class="review-subhead">MVP 指标目标</h4><div class="review-table-wrap"><table class="review-table compact"><tbody><tr><td>文生图可用率</td><td>≥ 80%</td></tr><tr><td>图生 3D 成功率</td><td>≥ 75%</td></tr><tr><td>3D 生成 P95 时长</td><td>&lt; 90s</td></tr><tr><td>语义分割 mIoU</td><td>0.78+</td></tr><tr><td>社区套用率</td><td>&gt; 点赞率</td></tr><tr><td>7 日留存</td><td>≥ 30%</td></tr></tbody></table></div></div><div><h4 class="review-subhead">相对传统流程的效率目标</h4><div class="review-table-wrap"><table class="review-table compact"><thead><tr><th>任务</th><th>传统</th><th>NeuroDrive</th></tr></thead><tbody><tr><td>出概念图</td><td>2h</td><td>20s</td></tr><tr><td>出 3D 草模</td><td>2 天</td><td>90s</td></tr><tr><td>改轮毂方案</td><td>40min</td><td>8s</td></tr><tr><td>做分享卡片</td><td>30min</td><td>3s</td></tr></tbody></table></div></div></div>
      <div class="review-prd"><h4>PRD 验收重点</h4><p><b>P0 · 设计生成：</b>输入约束需体现在候选方案中，支持收藏、重新生成和进入详情。</p><p><b>P0 · 对比迭代：</b>保留版本关系、支持回退，系统能复述确认修改意图。</p><p><b>P1 · 评审协作：</b>批注绑定版本，结论可导出，成员和权限可管理。</p></div>
    </div>

    <div class="review-section">
      <div class="review-heading"><span>05</span><div><h3>验证结果：不只看生成，也看用户是否做得出来</h3><p>以下为报告记录的项目验证结果；效率和用户指标与上方的目标值分开呈现。</p></div></div>
      <div class="review-results"><div><b>92%</b><span>单用户平均设计验证时间下降</span></div><div><b>61%</b><span>非专业用户占比</span></div><div><b>74%</b><span>“第一次做出车”占比</span></div><div><b>套用率<br>&gt; 点赞率</b><span>真实需求更偏向“拿来用”，而不只是围观</span></div></div>
      <div class="review-insight"><b>产品判断</b><span>生成效果只是起点；部件级编辑、复用与沉淀，决定它是不是可持续使用的产品。</span></div>
    </div>

    <div class="review-section">
      <div class="review-heading"><span>06</span><div><h3>复盘与下一步：把被证伪假设变成产品动作</h3><p>用户不会天然使用专业提示词；只有模型、交互和业务闭环一起适配，生成能力才真正有价值。</p></div></div>
      <div class="review-table-wrap"><table class="review-table"><thead><tr><th>原假设</th><th>实际发现</th><th>产品启示</th></tr></thead><tbody>
        <tr><td>用户会写提示词</td><td>90% 只会写“帅一点”“像超跑”</td><td>用意图澄清、提示词增强降低表达门槛。</td></tr>
        <tr><td>3D 出来就够了</td><td>不能改部件的模型像“玩具”</td><td>优先完善部件级交互与编辑。</td></tr>
        <tr><td>社区先发图就行</td><td>3D 可套用才可能形成飞轮</td><td>把复用能力作为社区核心行为。</td></tr>
        <tr><td>IoT 模拟数据没用</td><td>教学和销售场景已经足够</td><td>先验证场景价值，再逐步接入真实设备。</td></tr>
      </tbody></table></div>
      <div class="review-feature-grid review-roadmap"><article><b>对话式设计 Agent</b><p>“车顶压低 3cm，轮毂换涡轮”即可自动改参数并重渲。</p></article><article><b>部件级 LoRA</b><p>对轮毂、尾翼、灯组分别微调，提升局部改造稳定性。</p></article><article><b>工程格式闭环</b><p>探索 GLB → STEP，让资产进入车企 CAD 流程。</p></article><article><b>社区推荐与 B 端</b><p>推荐按套用行为而非点赞加权；面向经销商验证“描述需求 → 出车 → 留资”。</p></article></div>
    </div>

    <div class="review-close"><div><small>商业判断</small><h3>不只做“AI 玩具”，而是汽车行业的<br>Canva + Figma + 数字孪生入口</h3><p>面向个人用户，以团队订阅、企业私有化部署与增值算力服务探索收入；以有效方案采纳率、单项目迭代次数和评审周期衡量价值。长期连接创作、协作、资产与展示。</p></div></div>
    <details class="review-legacy"><summary>原有作品集补充材料（功能证据、流程、PRD、原型与竞品）</summary><div class="review-legacy-body">${originalContent}</div></details>
    <button class="case-close" data-case="case-neurodrive">收起案例 ↑</button>
  `;
});
