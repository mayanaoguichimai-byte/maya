"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// 可复用的 Cinematic Image Zoom Reveal + Split Case Window
// 支持多种 case 类型：research、data-operations、training 等

export type ResearchStat = {
  label: string;
  value: string;
  text: string;
};

export type ResearchResult = {
  number: string;
  title: string;
  text: string;
};

export type ResearchFlowStep = {
  number: string;
  title: string;
  text: string;
};

export type ResearchSkill = {
  title: string;
  text: string;
};

export type LifeImage = {
  src: string;
  number: string;
  title: string;
  caption: string;
};

export type LifeSection = {
  title: string;
  text: string;
};

export type LifeImageGroup = {
  title: string;
  text: string;
  images: LifeImage[];
};

export type ResearchCaseContent = {
  id: string;
  title: string;
  subtitle: string;
  tags: string;
  intro: string;
  stats: ResearchStat[];
  results: ResearchResult[];
  process: ResearchFlowStep[];
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: ResearchSkill[];
  findingsTitle: string;
  processEyebrow: string;
  processTitle: string;
  footerLabel: string;
  hoverHint: string;
  ariaLabel: string;
  // 可选：数据运营 / AI 产品类 case 的额外字段
  businessQuestion?: string;
  productQuestion?: string;
  insightQuestion?: string;
  dataCards?: ResearchStat[];
  tools?: string;
  copyAbstract?: string;
  copyButtonLabel?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  questionLabel?: string;
  projectLink?: string;
  projectLinkLabel?: string;
  // 可选：Life 专题页字段
  isLifeFeature?: boolean;
  lifeImages?: LifeImage[];
  lifeSections?: LifeSection[];
  lifeListItems?: string[];
  lifeListTitle?: string;
  // 可选：分组图片展示（用于 Travel & Daily Fragments 等多 section 生活专题）
  lifeImageGroups?: LifeImageGroup[];
  lifeClosingText?: string;
  lifeClosingTitle?: string;
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 1: 数字金融与实体经济研究
// ═══════════════════════════════════════════════════════════════════════

const researchStats: ResearchStat[] = [
  {
    label: "样本",
    value: "2013–2020",
    text: "中国 30 个省份面板数据，共 240 个观测值",
  },
  {
    label: "数据",
    value: "数字金融 × 实体经济",
    text: "使用数字金融指数及其结构维度，构建实体经济发展综合分析框架",
  },
  {
    label: "方法",
    value: "多模型检验",
    text: "双向固定效应、中介效应、门槛效应、稳健性检验与工具变量法",
  },
  {
    label: "输出",
    value: "研究结论",
    text: "形成完整实证研究报告，并提出数字金融服务实体经济的政策建议",
  },
];

const researchResults: ResearchResult[] = [
  {
    number: "01",
    title: "数字金融显著促进实体经济发展",
    text: "实证结果表明，数字金融发展水平提升对实体经济发展具有显著正向影响。",
  },
  {
    number: "02",
    title: "结构维度作用存在差异",
    text: "数字金融的覆盖广度、使用深度和数字化程度并不是以同样方式发挥作用，其中实际使用深度和数字化水平更能体现数字金融的真实赋能效果。",
  },
  {
    number: "03",
    title: "技术创新是重要传导路径",
    text: "数字金融并不是简单提供资金支持，它还通过促进技术投入和创新活动，进一步影响实体经济发展质量。",
  },
  {
    number: "04",
    title: "影响具有阶段性特征",
    text: "门槛效应说明，数字金融对实体经济的影响不是简单线性关系，而会随着发展水平变化呈现阶段差异。",
  },
];

const researchFlow: ResearchFlowStep[] = [
  { number: "01", title: "DATA", text: "省级面板数据整理" },
  { number: "02", title: "INDEX", text: "实体经济发展综合指数构建" },
  { number: "03", title: "MODEL", text: "固定效应、中介效应、门槛效应检验" },
  { number: "04", title: "FINDING", text: "输出结论与政策建议" },
];

const researchSkills: ResearchSkill[] = [
  {
    title: "Financial Thinking",
    text: "理解价值、风险、资源配置和长期发展问题",
  },
  {
    title: "Data Modeling",
    text: "处理面板数据、构建指标体系并完成变量整理",
  },
  {
    title: "Empirical Analysis",
    text: "使用固定效应、中介效应、门槛效应和稳健性检验",
  },
  {
    title: "Structured Writing",
    text: "将复杂研究过程整理成清晰报告和结论表达",
  },
];

export const digitalFinanceResearchCase: ResearchCaseContent = {
  id: "digital-finance-research",
  title: "数字金融与实体经济研究",
  subtitle: "Empirical Study on Digital Finance and the Real Economy",
  tags: "FINANCE / PANEL DATA / EMPIRICAL RESEARCH",
  intro:
    "我用省级面板数据和计量模型，研究数字金融如何通过资源配置、技术创新和结构差异影响实体经济发展。",
  stats: researchStats,
  results: researchResults,
  process: researchFlow,
  capabilitiesTitle: "What this shows about me",
  capabilitiesIntro: "这项研究里，藏着我的四种能力。",
  capabilities: researchSkills,
  findingsTitle: "四个被实证支持的研究结论。",
  processEyebrow: "RESEARCH FLOW",
  processTitle: "从数据到结论的一条线。",
  footerLabel: "YUJING ZHU / 数字金融与实体经济研究",
  hoverHint: "VIEW RESEARCH RESULT →",
  ariaLabel: "查看 数字金融与实体经济研究 成果",
  copyAbstract:
    "我基于 2013–2020 年中国 30 个省份面板数据，构建实体经济发展综合指数，并使用数字金融指数及其结构维度，结合双向固定效应、中介效应、门槛效应和稳健性检验，分析数字金融如何影响实体经济发展。",
  heroTitle: "数字金融如何影响实体经济？",
  heroSubtitle: "A research case about finance, data, and real economy development.",
  questionLabel: "RESEARCH QUESTION",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 2: 金融工程专业训练
// ═══════════════════════════════════════════════════════════════════════

export const financialTrainingCase: ResearchCaseContent = {
  id: "financial-engineering-training",
  title: "金融工程专业训练",
  subtitle: "Financial Engineering Training",
  tags: "FINANCE / ECONOMETRICS / INVESTMENT / PYTHON",
  intro:
    "我通过金融工程、计量经济学、证券投资、公司金融和编程课程，建立起用数据、模型和商业语境理解问题的基础框架。",
  stats: [
    {
      label: "背景",
      value: "金融工程",
      text: "本科专业训练，建立金融、数据和模型结合的思考基础",
    },
    {
      label: "课程",
      value: "核心课程",
      text: "金融工程学、计量经济学、证券投资学、公司金融、微观与宏观经济学",
    },
    {
      label: "工具",
      value: "Python / C / Excel",
      text: "通过编程与数据工具训练，理解数据处理、模型计算和结果表达",
    },
    {
      label: "能力",
      value: "判断框架",
      text: "从价值、风险、成本、收益和长期影响角度理解业务问题",
    },
  ],
  results: [
    {
      number: "01",
      title: "用价值和风险理解问题",
      text: "金融工程训练让我不只关注表面的数字变化，也会思考数字背后的成本、收益、风险和长期价值。",
    },
    {
      number: "02",
      title: "用计量思维拆解关系",
      text: "计量经济学训练让我习惯从变量、假设、模型和结果可靠性出发，判断一个结论是否真的有解释力。",
    },
    {
      number: "03",
      title: "用市场视角观察业务",
      text: "证券投资学和公司金融训练让我更关注市场信息、企业经营、资金效率和商业决策之间的关系。",
    },
    {
      number: "04",
      title: "用工具把分析落地",
      text: "Python、C 语言和 Excel 等工具训练，让我可以把金融问题转化为可处理的数据、模型和分析结果。",
    },
  ],
  process: [
    {
      number: "01",
      title: "FINANCE",
      text: "金融工程学 / 公司金融：理解价值、风险、收益和企业决策",
    },
    {
      number: "02",
      title: "ECONOMETRICS",
      text: "计量经济学：理解变量关系、模型设定和实证检验",
    },
    {
      number: "03",
      title: "MARKET",
      text: "证券投资学：理解市场数据、资产表现和投资逻辑",
    },
    {
      number: "04",
      title: "TOOLS",
      text: "Python / C / Excel：把分析过程转化为可执行的计算和表达",
    },
  ],
  capabilitiesTitle: "What this training gives me",
  capabilitiesIntro: "这段专业训练，沉淀成我的四种能力。",
  capabilities: [
    {
      title: "Financial Lens",
      text: "从价值、风险和长期收益角度理解问题",
    },
    {
      title: "Quantitative Thinking",
      text: "用变量、模型和数据关系分析现象",
    },
    {
      title: "Business Judgment",
      text: "把金融逻辑放进真实业务和市场语境中判断",
    },
    {
      title: "Tool-based Analysis",
      text: "用 Python、Excel 和数据工具支持分析表达",
    },
  ],
  findingsTitle: "四个塑造思考方式的训练结果。",
  processEyebrow: "LEARNING PATH",
  processTitle: "从课程训练到分析能力的一条路径。",
  footerLabel: "YUJING ZHU / 金融工程专业训练",
  hoverHint: "VIEW TRAINING RESULT →",
  ariaLabel: "查看 金融工程专业训练 成果",
  copyAbstract:
    "我通过金融工程学、计量经济学、证券投资学、公司金融和编程课程，建立起用数据、模型和商业语境理解问题的基础框架。",
  heroTitle: "金融工程专业训练",
  heroSubtitle: "A training case about finance, econometrics, and analytical thinking.",
  questionLabel: "TRAINING OVERVIEW",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 3: SHEIN 海外平台数据运营分析
// ═══════════════════════════════════════════════════════════════════════

const sheinDataCards: ResearchStat[] = [
  {
    label: "数据来源",
    value: "销售 / 库存 / SKU",
    text: "整理商品销售、库存变化、SKU 结构及相关运营数据。",
  },
  {
    label: "用户反馈",
    value: "英文评价",
    text: "结合海外用户评论，观察价格、款式、材质、物流和使用体验中的高频问题。",
  },
  {
    label: "分析方法",
    value: "指标拆解",
    text: "围绕收入、成本、利润、库存周转和商品表现建立分析视角。",
  },
  {
    label: "输出形式",
    value: "看板与建议",
    text: "通过 Excel / PowerBI 整理指标，并输出商品优化和运营复盘建议。",
  },
];

const sheinResults: ResearchResult[] = [
  {
    number: "01",
    title: "识别低效 SKU",
    text: "通过销售、库存和商品表现数据，识别动销效率较低、占用库存资源较多的 SKU，为商品优化提供依据。",
  },
  {
    number: "02",
    title: "定位库存压力",
    text: "从库存周转和商品结构中观察异常积压与库存压力，辅助判断哪些商品需要调整补货、促销或下架策略。",
  },
  {
    number: "03",
    title: "连接用户反馈",
    text: "将英文用户评价中的价格、款式、材质、物流和体验问题进行整理，帮助理解数据背后的真实用户感受。",
  },
  {
    number: "04",
    title: "形成运营建议",
    text: "把分散数据转化为商品优化、选品调整、库存管理和运营复盘中可以被使用的判断。",
  },
];

const sheinProcess: ResearchFlowStep[] = [
  { number: "01", title: "COLLECT", text: "销售、库存、SKU、用户评价与竞品信息整理" },
  { number: "02", title: "CLEAN", text: "数据清洗、分类、字段统一与异常数据检查" },
  { number: "03", title: "ANALYZE", text: "指标拆解、库存压力识别、SKU 表现分析" },
  { number: "04", title: "DECIDE", text: "输出商品优化、库存调整和运营复盘建议" },
];

const sheinCapabilities: ResearchSkill[] = [
  {
    title: "Data Cleaning",
    text: "整理分散业务数据，统一字段、结构和分析口径",
  },
  {
    title: "Business Insight",
    text: "从销售、库存、SKU 和用户反馈中发现运营问题",
  },
  {
    title: "Dashboard Thinking",
    text: "用 Excel / PowerBI 将指标整理成可读、可复盘的看板",
  },
  {
    title: "E-commerce Sense",
    text: "理解商品表现、库存压力、用户评价和选品优化之间的关系",
  },
];

export const sheinDataOperationsCase: ResearchCaseContent = {
  id: "shein-data-operations",
  title: "SHEIN 海外平台数据运营分析",
  subtitle: "E-commerce Data Operations Case",
  tags: "DATA OPERATIONS / SKU / INVENTORY / USER FEEDBACK",
  intro:
    "我围绕跨境电商业务场景，整理销售、库存、SKU、用户评价和竞品信息，把分散的数据转化为商品优化、库存调整和运营复盘建议。",
  stats: [
    {
      label: "数据量",
      value: "5000+",
      text: "销售、库存及 SKU 数据记录",
    },
    {
      label: "指标",
      value: "10+",
      text: "收入、成本、利润、库存周转等核心指标",
    },
    {
      label: "工具",
      value: "Excel / PowerBI",
      text: "Data Cleaning / Dashboard",
    },
    {
      label: "场景",
      value: "跨境电商",
      text: "SHEIN 海外平台的商品运营与库存管理",
    },
  ],
  results: sheinResults,
  process: sheinProcess,
  capabilitiesTitle: "What this shows about me",
  capabilitiesIntro: "这段数据运营实践，体现了我的四种能力。",
  capabilities: sheinCapabilities,
  findingsTitle: "四个从数据到运营判断的结果。",
  processEyebrow: "DATA OPERATIONS FLOW",
  processTitle: "从数据整理到运营建议的一条路径。",
  footerLabel: "YUJING ZHU / SHEIN 海外平台数据运营分析",
  hoverHint: "VIEW DATA CASE →",
  ariaLabel: "查看 SHEIN 海外平台数据运营分析 成果",
  businessQuestion:
    "在跨境电商业务中，哪些商品表现不够有效？库存压力从哪里来？用户反馈和竞品表现能否帮助我们调整商品方向？",
  dataCards: sheinDataCards,
  tools: "Excel / PowerBI / Data Cleaning / Dashboard",
  copyAbstract:
    "我围绕 SHEIN 海外平台业务场景，整理并分析销售、库存、SKU、英文用户评价和竞品表现等数据，搭建运营指标视角，识别低效 SKU、库存压力和商品优化方向，支持选品、库存调整与运营复盘。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "数据如何变成运营判断？",
  heroSubtitle: "A data operations case about SKU, inventory, user feedback, and business decisions.",
  questionLabel: "BUSINESS QUESTION",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 4: AI 经营数据分析助手
// ═══════════════════════════════════════════════════════════════════════

const aiInsightDataCards: ResearchStat[] = [
  {
    label: "数据入口",
    value: "Upload Data",
    text: "用户可以上传销售订单数据，作为后续分析和洞察生成的基础。",
  },
  {
    label: "指标解读",
    value: "Metric Reading",
    text: "围绕销售额、订单量、商品表现、客户和时间趋势等经营指标进行解释。",
  },
  {
    label: "AI 洞察",
    value: "AI Insight",
    text: "将原始数据转化为更容易理解的业务总结、问题识别和优化方向。",
  },
  {
    label: "网页 Demo",
    value: "Live Prototype",
    text: "项目已部署为网页 Demo，方便展示产品流程和交互体验。",
  },
];

const aiInsightResults: ResearchResult[] = [
  {
    number: "01",
    title: "完成从想法到 Demo 的产品闭环",
    text: "项目从“经营数据难以快速解读”的业务痛点出发，完成了产品定位、页面流程、上传入口、AI 分析输出和部署展示。",
  },
  {
    number: "02",
    title: "把数据分析变成可交互工具",
    text: "它不是静态图表展示，而是让用户通过上传数据触发分析流程，形成更接近真实产品的使用体验。",
  },
  {
    number: "03",
    title: "强化业务指标表达",
    text: "项目重点不是炫技，而是围绕经营指标、业务异常和优化建议，让数据结果更容易被非技术用户理解。",
  },
  {
    number: "04",
    title: "形成可展示的 AI 产品原型",
    text: "通过网页 Demo 的形式，将 AI 工具想法落地为可访问、可演示、可继续迭代的产品原型。",
  },
];

const aiInsightProcess: ResearchFlowStep[] = [
  { number: "01", title: "PROBLEM", text: "识别经营数据难以快速解读的业务痛点" },
  { number: "02", title: "UPLOAD", text: "用户上传销售订单或业务数据" },
  { number: "03", title: "ANALYZE", text: "系统生成指标解读、趋势总结和异常提示" },
  { number: "04", title: "INSIGHT", text: "输出经营洞察与优化建议" },
  { number: "05", title: "DEMO", text: "部署为可访问网页原型" },
];

const aiInsightCapabilities: ResearchSkill[] = [
  {
    title: "AI Product Thinking",
    text: "把 AI 放进具体业务场景，而不是停留在概念层面",
  },
  {
    title: "Business Analysis",
    text: "围绕销售订单、经营指标和业务问题组织分析逻辑",
  },
  {
    title: "Prototype Building",
    text: "使用 AI coding 工具完成可交互 Demo 的搭建与部署",
  },
  {
    title: "User-oriented Expression",
    text: "将复杂数据结果转化为用户更容易理解的语言和建议",
  },
];

export const aiBusinessInsightCase: ResearchCaseContent = {
  id: "ai-business-insight",
  title: "AI 经营数据分析助手",
  subtitle: "AI Business Insight Copilot",
  tags: "AI PRODUCT / DATA ANALYSIS / PROTOTYPE",
  intro:
    "我设计并实现了一个 AI 经营数据分析助手 Demo，用户上传销售订单数据后，可以获得经营指标解读、数据洞察和优化建议。",
  stats: [
    {
      label: "Upload",
      value: "支持上传",
      text: "支持上传业务数据文件",
    },
    {
      label: "Insight",
      value: "自动生成",
      text: "自动生成指标解读与经营分析",
    },
    {
      label: "Demo",
      value: "已部署",
      text: "已部署为可访问网页 Demo",
    },
    {
      label: "Stack",
      value: "AI Coding",
      text: "Trae / AI Coding / Dashboard / Netlify",
    },
  ],
  results: aiInsightResults,
  process: aiInsightProcess,
  capabilitiesTitle: "What this shows about me",
  capabilitiesIntro: "这个 AI 产品实验，体现了我的四种能力。",
  capabilities: aiInsightCapabilities,
  findingsTitle: "四个从想法到 Demo 的产品成果。",
  processEyebrow: "PRODUCT FLOW",
  processTitle: "从业务痛点到可访问 Demo 的一条路径。",
  footerLabel: "YUJING ZHU / AI 经营数据分析助手",
  hoverHint: "VIEW AI PRODUCT →",
  ariaLabel: "查看 AI 经营数据分析助手 成果",
  productQuestion:
    "很多业务数据本身并不难获得，真正困难的是如何快速理解数据说明了什么、异常在哪里、下一步应该如何行动。这个项目尝试回答：AI 能否帮助用户把销售订单数据转化为更清晰的经营判断？",
  dataCards: aiInsightDataCards,
  tools: "Trae / AI Coding / Data Analysis / Dashboard / Netlify",
  copyAbstract:
    "我设计并实现了一个 AI 经营数据分析助手 Demo，围绕真实销售订单数据场景，完成从业务痛点识别、产品流程设计、数据上传功能、AI 洞察生成到网页部署的完整原型实践。该项目尝试将经营数据转化为可读的指标解读、业务洞察和优化建议。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "AI 如何把经营数据变成可读的业务洞察？",
  heroSubtitle: "An AI product experiment about business data, metric interpretation, and decision support.",
  questionLabel: "PRODUCT QUESTION",
  projectLink: "https://mayanaogui.netlify.app/upload",
  projectLinkLabel: "打开项目 Demo",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 6: AI 辅助用户反馈分析
// ═══════════════════════════════════════════════════════════════════════

const aiUserFeedbackDataCards: ResearchStat[] = [
  {
    label: "价格",
    value: "Price",
    text: "整理用户对价格敏感度、性价比和促销反馈的表达。",
  },
  {
    label: "款式",
    value: "Style",
    text: "观察用户对版型、风格、颜色和使用场景的偏好。",
  },
  {
    label: "材质",
    value: "Material",
    text: "归纳用户对面料、舒适度、质感和耐用性的评价。",
  },
  {
    label: "物流",
    value: "Logistics",
    text: "识别用户对配送速度、包装体验和售后问题的反馈。",
  },
  {
    label: "体验",
    value: "User Experience",
    text: "提炼用户在购买、使用和复购过程中的高频痛点。",
  },
];

const aiUserFeedbackResults: ResearchResult[] = [
  {
    number: "01",
    title: "把非结构化反馈整理成标签体系",
    text: "使用 AI 对用户评论和反馈文本进行初步分类，将杂乱信息整理为价格、款式、材质、物流和体验等可分析维度。",
  },
  {
    number: "02",
    title: "识别重复出现的用户痛点",
    text: "从高频反馈中识别影响购买、使用和复购的关键问题，让用户需求不再停留在零散评论里。",
  },
  {
    number: "03",
    title: "从文本中提炼产品信号",
    text: "将用户语言转化为可理解的产品信号，帮助判断哪些卖点需要强化，哪些问题需要优先优化。",
  },
  {
    number: "04",
    title: "形成可执行的产品建议",
    text: "把用户反馈结果整理成可被产品、运营和页面表达使用的优化方向，而不是停留在简单评论摘要。",
  },
];

const aiUserFeedbackProcess: ResearchFlowStep[] = [
  { number: "01", title: "COLLECT", text: "收集用户评论、反馈文本与竞品信息" },
  { number: "02", title: "CLASSIFY", text: "使用 AI 进行标签分类和维度整理" },
  { number: "03", title: "EXTRACT", text: "提炼高频痛点、用户偏好和重复问题" },
  { number: "04", title: "TRANSLATE", text: "转化为产品优化、卖点表达和运营建议" },
];

const aiUserFeedbackCapabilities: ResearchSkill[] = [
  {
    title: "User Insight",
    text: "从用户评论和真实反馈中识别需求与痛点",
  },
  {
    title: "AI-assisted Analysis",
    text: "使用 AI 工具提高信息分类、归纳和整理效率",
  },
  {
    title: "Product Thinking",
    text: "将用户反馈转化为产品优化和卖点表达",
  },
  {
    title: "Structured Communication",
    text: "把杂乱文本整理成清晰、可复用、可行动的分析结论",
  },
];

export const aiUserFeedbackCase: ResearchCaseContent = {
  id: "ai-user-feedback",
  title: "AI 辅助用户反馈分析",
  subtitle: "AI-assisted User Feedback Analysis",
  tags: "AI CLASSIFICATION / USER INSIGHT / PRODUCT SUGGESTION",
  intro:
    "我使用 AI 工具对用户评论、反馈文本和竞品信息进行分类整理，从非结构化文本中提炼用户痛点、需求信号和产品优化方向。",
  stats: [
    {
      label: "评论",
      value: "100+",
      text: "用户评论与反馈文本整理",
    },
    {
      label: "维度",
      value: "5",
      text: "价格、款式、材质、物流、使用体验等分析维度",
    },
    {
      label: "输出",
      value: "Output",
      text: "用户痛点归纳与产品优化建议",
    },
  ],
  results: aiUserFeedbackResults,
  process: aiUserFeedbackProcess,
  capabilitiesTitle: "What this shows about me",
  capabilitiesIntro: "这段 AI 辅助用户反馈分析实践，体现了我的四种能力。",
  capabilities: aiUserFeedbackCapabilities,
  findingsTitle: "四个从用户反馈到产品建议的分析成果。",
  processEyebrow: "AI FEEDBACK FLOW",
  processTitle: "从用户评论到产品建议的一条路径。",
  footerLabel: "YUJING ZHU / AI 辅助用户反馈分析",
  hoverHint: "VIEW AI CASE →",
  ariaLabel: "查看 AI 辅助用户反馈分析 成果",
  insightQuestion:
    "用户反馈往往是分散、重复、情绪化和非结构化的。真正有价值的问题不是“用户说了什么”，而是这些反馈背后反复出现的需求是什么、哪些问题影响用户决策，以及哪些信息可以转化为产品优化建议。",
  dataCards: aiUserFeedbackDataCards,
  tools: "ChatGPT / Text Classification / User Review Analysis / Product Insight",
  copyAbstract:
    "我使用 AI 工具对用户评论、反馈文本和竞品信息进行分类整理，从价格、款式、材质、物流和使用体验等维度提炼高频问题，并将非结构化反馈转化为用户痛点、需求信号和产品优化建议。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "AI 如何从用户反馈里读出真实需求？",
  heroSubtitle:
    "An AI-assisted workflow about user reviews, feedback classification, and product insight.",
  questionLabel: "Insight Question",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 7: Tennis & Dance — Life Feature
// ═══════════════════════════════════════════════════════════════════════

import tennisWatch from "@/assets/tennis-watch.png";
import tennisPlay from "@/assets/tennis-play.png";
import jazz01 from "@/assets/jazz-01.png";
import jazz02 from "@/assets/jazz-02.jpg";

import cafeBook from "@/assets/life/cafe-book.png";
import mountainPortrait from "@/assets/life/mountain-portrait.jpg";
import forestLight from "@/assets/life/forest-light.png";
import mountainVillage from "@/assets/life/mountain-village.png";
import mountainSelf from "@/assets/life/mountain-self.png";
import oceanSelf from "@/assets/life/ocean-self.png";
import cafePortrait from "@/assets/life/cafe-portrait.png";
import waterVillage from "@/assets/life/water-village.jpg";
import bookstore from "@/assets/life/bookstore.png";
import studyNight from "@/assets/life/study-night.png";

const tennisDanceImages: LifeImage[] = [
  {
    src: tennisWatch,
    number: "01",
    title: "Watching the Game",
    caption: "现场看球时，我很喜欢那种全场专注、节奏推进的氛围。",
  },
  {
    src: tennisPlay,
    number: "02",
    title: "On Court",
    caption: "真正站上球场时，我更能感受到反应、判断和身体控制带来的快乐。",
  },
  {
    src: jazz01,
    number: "03",
    title: "Jazz Practice",
    caption: "Jazz 对我来说不仅是动作，更是一种节奏和情绪的释放。",
  },
  {
    src: jazz02,
    number: "04",
    title: "Movement & Expression",
    caption: "我喜欢舞蹈带来的身体感，也喜欢它让我更自由地表达自己。",
  },
];

const tennisDanceSections: LifeSection[] = [
  {
    title: "Tennis",
    text: "网球对我来说是一种很直接的训练。它需要判断、反应、预判和稳定心态。每一次来回都不完全可控，所以我很喜欢这种\u201C在变化中保持专注\u201D的感觉。从现场看比赛，到自己真正站上球场，这项运动带给我的不只是竞技感，也是一种持续投入、持续调整的状态。",
  },
  {
    title: "Jazz Dance",
    text: "相比网球的专注和反应，Jazz 带给我的是另一种能量。它让我感受节奏、身体和情绪的流动，也让我从理性分析的模式里暂时抽离出来。我很喜欢舞蹈里的表达感——有力量，也有松弛；有控制，也有释放。",
  },
];

export const tennisDanceCase: ResearchCaseContent = {
  id: "tennis-dance",
  title: "Tennis & Dance",
  subtitle: "Movement, rhythm, and energy",
  tags: "SPORT / DANCE / FOCUS / EXPRESSION",
  intro:
    "网球让我在快速变化里保持专注，Jazz 让我用节奏和身体表达情绪。它们是我工作之外最直接的能量来源。",
  stats: [
    { label: "Focus", value: "专注", text: "在变化中保持判断和反应" },
    { label: "Rhythm", value: "节奏", text: "感受身体和情绪的流动" },
    { label: "Expression", value: "表达", text: "用力量和松弛传递情绪" },
  ],
  results: [],
  process: [],
  capabilitiesTitle: "What these hobbies give me",
  capabilitiesIntro: "",
  capabilities: [],
  findingsTitle: "",
  processEyebrow: "",
  processTitle: "",
  footerLabel: "YUJING ZHU / Tennis & Dance",
  hoverHint: "VIEW LIFE →",
  ariaLabel: "查看 Tennis & Dance 生活专题",
  heroTitle: "Tennis & Dance",
  heroSubtitle: "Movement, rhythm, and energy",
  questionLabel: "ABOUT",
  isLifeFeature: true,
  lifeImages: tennisDanceImages,
  lifeSections: tennisDanceSections,
  lifeListTitle: "What these hobbies give me",
  lifeListItems: [
    "更稳定的专注力",
    "更快的反应和协调能力",
    "更强的节奏感",
    "更自然的表达欲",
    "工作之外真实而持续的能量来源",
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 8: Travel & Daily Fragments — Life Feature (Grouped)
// ═══════════════════════════════════════════════════════════════════════

const travelDailyGroups: LifeImageGroup[] = [
  {
    title: "Slow Learning",
    text: "我喜欢一些慢下来的学习时刻：窗边的书、夜晚的台灯、打开的电脑，或者在书店里被一本书吸引。它们不一定马上变成结果，但会慢慢变成我的理解力、表达力和对世界的兴趣。",
    images: [
      { src: cafeBook, number: "01", title: "Window Reading", caption: "窗边、书和植物，是让我慢下来的时刻。" },
      { src: studyNight, number: "02", title: "Night Study", caption: "夜晚学习的时候，我更容易进入自己的节奏。" },
      { src: bookstore, number: "03", title: "Bookstore Stop", caption: "我喜欢在书店里被偶然看到的内容吸引。" },
    ],
  },
  {
    title: "Mountains & Roads",
    text: "旅行对我来说不只是去一个地方，而是换一种环境重新感受自己。山里的空气、路边的树、远处的光和村落里的烟火气，会让我意识到生活有很多种展开方式。",
    images: [
      { src: mountainPortrait, number: "04", title: "In the Mountains", caption: "山里让我感觉到空间、安静和自由。" },
      { src: mountainVillage, number: "05", title: "Village Light", caption: "我喜欢旅行中那些不刻意但很有生命力的画面。" },
      { src: mountainSelf, number: "06", title: "Open Air", caption: "站在山间的时候，我会更清楚地感受到自己。" },
      { src: forestLight, number: "07", title: "Passing Trees", caption: "有时候我记录的不是景点，而是路上的光线。" },
    ],
  },
  {
    title: "Sea & Color",
    text: "海和明亮的颜色会让我变得更轻盈。水面、阳光、花、船和蓝色的天空，是旅行里最直接的快乐。它们让我从日常的逻辑里抽离出来，重新感受到一种更开放的状态。",
    images: [
      { src: oceanSelf, number: "08", title: "By the Sea", caption: "海边的风和光，会让我觉得自己重新充满电。" },
      { src: waterVillage, number: "09", title: "Bright Places", caption: "我喜欢那些颜色很鲜活、让人心情变轻的地方。" },
    ],
  },
  {
    title: "Daily Fragments",
    text: "我也喜欢记录一些普通但有质感的日常：一顿饭、一盏灯、一个下午、一段安静的时间。它们不是宏大的故事，但会让我觉得生活不是空白的，而是由很多小片段组成的。",
    images: [
      { src: cafePortrait, number: "10", title: "A Small Table", caption: "生活里有些时刻很小，但我会记得它们。" },
    ],
  },
];

export const travelDailyCase: ResearchCaseContent = {
  id: "travel-daily",
  title: "Travel & Daily Fragments",
  subtitle: "Places, books, light, and small moments",
  tags: "TRAVEL / LEARNING / PHOTOGRAPHY / DAILY LIFE",
  intro: "旅行、阅读、学习和日常观察让我从工作之外重新感受世界。它们不是简历上的成果，却构成了我很重要的一部分。",
  stats: [
    { label: "Travel", value: "旅行", text: "换一种环境重新感受自己" },
    { label: "Reading", value: "阅读", text: "慢慢变成理解力和表达力" },
    { label: "Photography", value: "摄影", text: "学会观察细节和光线" },
    { label: "Daily Life", value: "日常", text: "由很多小片段组成的生活" },
  ],
  results: [],
  process: [],
  capabilitiesTitle: "",
  capabilitiesIntro: "",
  capabilities: [],
  findingsTitle: "",
  processEyebrow: "",
  processTitle: "",
  footerLabel: "YUJING ZHU / Travel & Daily Fragments",
  hoverHint: "VIEW LIFE \u2192",
  ariaLabel: "查看 Travel & Daily Fragments 生活专题",
  heroTitle: "Travel & Daily Fragments",
  heroSubtitle: "Places, books, light, and small moments",
  questionLabel: "ABOUT",
  isLifeFeature: true,
  lifeImageGroups: travelDailyGroups,
  lifeClosingTitle: "What I am looking for in life",
  lifeClosingText: "我喜欢那些让我保持好奇的事情。旅行让我看到不同地方的节奏，阅读和学习让我不断更新自己的理解，摄影让我学会观察细节，而日常片段提醒我，生活不应该只由目标和结果组成。我希望自己一直保留这种感受力：能认真工作，也能认真生活；能分析问题，也能被风景、书、光线和某个普通下午打动。",
};

// ═══════════════════════════════════════════════════════════════════════
// CASE 5: 电商用户转化漏斗分析
// ═══════════════════════════════════════════════════════════════════════

const funnelDataCards: ResearchStat[] = [
  {
    label: "数据基础",
    value: "User Behavior",
    text: "基于 3000+ 用户行为数据，观察访问、点击、浏览与转化路径。",
  },
  {
    label: "分析方式",
    value: "Funnel Logic",
    text: "通过漏斗拆解，定位不同阶段的转化效率和流失节点。",
  },
  {
    label: "关键问题",
    value: "Drop-off Points",
    text: "识别用户在访问、点击、浏览和下单流程中的关键流失位置。",
  },
  {
    label: "优化输出",
    value: "Actionable Insight",
    text: "将分析结果转化为页面信息、推荐策略和转化路径优化建议。",
  },
];

const funnelResults: ResearchResult[] = [
  {
    number: "01",
    title: "拆解完整转化路径",
    text: "将用户行为路径拆解为访问、点击、浏览、加购或转化等关键阶段，形成更清晰的漏斗分析视角。",
  },
  {
    number: "02",
    title: "识别主要流失节点",
    text: "通过不同阶段的转化率变化，找到用户流失最明显的环节，而不是只看最终下单结果。",
  },
  {
    number: "03",
    title: "发现页面与策略问题",
    text: "结合路径表现，判断页面信息表达、商品展示逻辑或推荐策略中可能影响用户继续行动的因素。",
  },
  {
    number: "04",
    title: "输出转化优化建议",
    text: "把分析结果整理为可执行建议，例如优化页面信息、强化推荐逻辑、缩短关键路径和改善引导方式。",
  },
];

const funnelProcess: ResearchFlowStep[] = [
  { number: "01", title: "TRACK", text: "整理用户访问、点击与浏览行为数据" },
  { number: "02", title: "MAP", text: "构建访问 → 点击 → 转化路径" },
  { number: "03", title: "FIND", text: "识别关键流失节点与异常阶段" },
  { number: "04", title: "OPTIMIZE", text: "输出页面、推荐与转化路径优化建议" },
];

const funnelCapabilities: ResearchSkill[] = [
  {
    title: "Behavior Analysis",
    text: "能够从用户行为路径中识别关键流失和异常节点",
  },
  {
    title: "Funnel Thinking",
    text: "习惯将复杂转化问题拆解为清晰阶段进行判断",
  },
  {
    title: "Business Optimization",
    text: "把分析结果转化为页面、推荐和策略层面的优化建议",
  },
  {
    title: "Structured Insight",
    text: "将用户行为数据整理成更容易被业务理解和使用的结论",
  },
];

export const ecommerceFunnelCase: ResearchCaseContent = {
  id: "ecommerce-funnel-analysis",
  title: "电商用户转化漏斗分析",
  subtitle: "E-commerce Funnel Analysis",
  tags: "USER BEHAVIOR / FUNNEL / CONVERSION / BUSINESS INSIGHT",
  intro:
    "我基于电商用户行为数据拆解访问、点击和转化路径，识别用户流失节点，并将分析结果转化为页面优化、推荐策略和转化路径改进建议。",
  stats: [
    {
      label: "数据量",
      value: "3000+",
      text: "用户行为数据记录",
    },
    {
      label: "Funnel",
      value: "路径拆解",
      text: "访问 → 点击 → 转化路径拆解",
    },
    {
      label: "Output",
      value: "优化建议",
      text: "识别流失节点并输出优化建议",
    },
    {
      label: "Stack",
      value: "Excel / SQL",
      text: "Funnel Analysis / Business Insight",
    },
  ],
  results: funnelResults,
  process: funnelProcess,
  capabilitiesTitle: "What this shows about me",
  capabilitiesIntro: "这段漏斗分析实践，体现了我的四种能力。",
  capabilities: funnelCapabilities,
  findingsTitle: "四个从数据到优化建议的分析成果。",
  processEyebrow: "FUNNEL ANALYSIS FLOW",
  processTitle: "从行为数据到转化优化建议的一条路径。",
  footerLabel: "YUJING ZHU / 电商用户转化漏斗分析",
  hoverHint: "VIEW FUNNEL CASE →",
  ariaLabel: "查看 电商用户转化漏斗分析 成果",
  businessQuestion:
    "用户并不是在最后一步才流失。真正关键的问题是：访问之后有没有产生点击？点击之后为什么没有继续浏览？哪些节点造成了转化流失？以及这些问题能否通过页面信息、推荐逻辑或路径设计得到改善？",
  dataCards: funnelDataCards,
  tools: "Excel / SQL Logic / Funnel Analysis / Business Insight",
  copyAbstract:
    "我基于 3000+ 电商用户行为数据，对访问、点击和转化路径进行漏斗分析，识别关键流失节点，并从页面信息、推荐策略和转化路径角度提出优化建议，帮助提升转化效率。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "用户是在哪一步流失的？",
  heroSubtitle: "A funnel analysis case about user behavior, conversion paths, and business optimization.",
  questionLabel: "BUSINESS QUESTION",
};

// ═══════════════════════════════════════════════════════════════════════
// TRIGGER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

export function ResearchImageTrigger({
  image,
  alt,
  caption,
  className,
  caseData = digitalFinanceResearchCase,
}: {
  image: string;
  alt: string;
  caption: string;
  className?: string;
  caseData?: ResearchCaseContent;
}) {
  return (
    <ResearchTriggerBase
      image={image}
      alt={alt}
      caption={caption}
      className={className}
      caseData={caseData}
      variant="large"
    />
  );
}

export function ResearchCircleTrigger({
  image,
  alt,
  caseData,
  className,
}: {
  image: string;
  alt: string;
  caseData: ResearchCaseContent;
  className?: string;
}) {
  return (
    <ResearchTriggerBase
      image={image}
      alt={alt}
      caption=""
      className={className}
      caseData={caseData}
      variant="circle"
    />
  );
}

function ResearchTriggerBase({
  image,
  alt,
  caption,
  className,
  caseData,
  variant,
}: {
  image: string;
  alt: string;
  caption: string;
  className?: string;
  caseData: ResearchCaseContent;
  variant: "large" | "circle";
}) {
  const [open, setOpen] = useState(false);
  const layoutId = `research-image-${caseData.id}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const isCircle = variant === "circle";

  return (
    <>
      {isCircle ? (
        <motion.button
          layoutId={layoutId}
          onClick={() => setOpen(true)}
          aria-label={caseData.ariaLabel}
          className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-white/[0.16] bg-white/[0.04] ${className ?? ""}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full rounded-full object-cover opacity-[0.72] saturate-[0.65] brightness-[0.72] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1] group-hover:opacity-100 group-hover:brightness-[0.9]"
          />
          <div className="absolute inset-0 rounded-full bg-black/30 transition-colors duration-400 group-hover:bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="text-[9px] tracking-[0.18em] text-white/80">VIEW CASE →</span>
          </div>
        </motion.button>
      ) : (
        <motion.figure
          layoutId={layoutId}
          onClick={() => setOpen(true)}
          role="button"
          aria-label={caseData.ariaLabel}
          className={`group relative cursor-pointer overflow-hidden bg-white/[0.035] ${className ?? ""}`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover opacity-[0.86] saturate-[0.72] brightness-[0.76] transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
          <figcaption className="absolute left-4 top-4 label-xs text-white/60 transition-colors duration-500 group-hover:text-white md:left-5 md:top-5">
            {caption}
          </figcaption>
          <div className="absolute bottom-4 right-4 label-xs text-white/0 transition-all duration-500 group-hover:text-white/80 md:bottom-5 md:right-5">
            {caseData.hoverHint}
          </div>
        </motion.figure>
      )}

      <AnimatePresence>
        {open ? (
          <ResearchRevealOverlay
            image={image}
            layoutId={layoutId}
            caseData={caseData}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// REVEAL OVERLAY
// ═══════════════════════════════════════════════════════════════════════

export function ResearchRevealOverlay({
  image,
  layoutId,
  caseData,
  onClose,
}: {
  image: string;
  layoutId: string;
  caseData: ResearchCaseContent;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(0,0,0,0.72)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onClick={onClose}
    >
      {/* Cinematic shared image: 从原图位置丝滑放大 */}
      <motion.div
        layoutId={layoutId}
        className="pointer-events-none absolute inset-0"
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-black/80 backdrop-blur-[6px]"
        />
      </motion.div>

      {/* 居中研究档案窗口 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex h-[80vh] w-[74vw] max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151515] shadow-2xl shadow-black/40 md:h-[82vh] md:w-[72vw]"
      >
        <ResearchCaseWindow image={image} caseData={caseData} onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CASE WINDOW: 左栏固定信息 + 右栏可滚动内容
// ═══════════════════════════════════════════════════════════════════════

function ResearchCaseWindow({
  image,
  caseData,
  onClose,
}: {
  image: string;
  caseData: ResearchCaseContent;
  onClose: () => void;
}) {
  const isDataOps = caseData.id === "shein-data-operations";
  const isAIProduct = caseData.id === "ai-business-insight" || caseData.id === "ai-analytics-suite";
  const isAIUserFeedback = caseData.id === "ai-user-feedback";
  const isLifeFeature = caseData.isLifeFeature;

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* ── 左侧信息栏（桌面端固定，移动端顶部） ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full flex-shrink-0 flex-col justify-between border-b border-white/[0.06] bg-[#1a1a1a] p-7 md:w-[34%] md:border-b-0 md:border-r md:p-9 lg:p-10"
      >
        <div>
          <h2 className="text-xl font-medium leading-tight text-[#e1e0cc] md:text-2xl">
            {caseData.title}
          </h2>
          <div className="mt-2 text-xs tracking-[0.16em] text-[#e1e0cc]/50">
            {caseData.subtitle}
          </div>
          <div className="mt-4 text-[11px] tracking-[0.2em] text-gray-400">{caseData.tags}</div>

          {/* Stats */}
          <div className="mt-8 space-y-3">
            {caseData.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[10px] tracking-[0.22em] text-gray-500">{s.label}</div>
                <div className="mt-1 text-sm font-medium text-[#e1e0cc]">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Tools */}
          {(isDataOps || isAIProduct || isAIUserFeedback) && caseData.tools && (
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.22em] text-gray-500">TOOLS</div>
              <div className="mt-1 text-xs text-gray-300">{caseData.tools}</div>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-0 space-y-3">
          {/* Project Link 按钮（AI 产品类） */}
          {isAIProduct && caseData.projectLink && (
            <a
              href={caseData.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center border border-white/[0.18] bg-transparent px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[#e1e0cc] transition-colors duration-300 hover:bg-white/[0.06]"
            >
              {caseData.projectLinkLabel ?? "打开项目"} <span className="ml-1.5 text-[10px]">↗</span>
            </a>
          )}
          {/* 复制摘要按钮 */}
          <CopyAbstractButton caseData={caseData} />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] text-gray-600">{caseData.footerLabel}</span>
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-gray-400 transition-colors duration-300 hover:text-[#e1e0cc]"
            >
              CLOSE ×
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 右侧可滚动内容区 ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        className="relative flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
      >
        {/* 固定关闭按钮（桌面端右上角） */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-[11px] text-gray-400 transition-colors duration-300 hover:text-white md:right-5 md:top-5"
          aria-label="关闭研究成果展示"
        >
          CLOSE ×
        </button>

        <ResearchCaseContent image={image} caseData={caseData} />
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// COPY ABSTRACT BUTTON
// ═══════════════════════════════════════════════════════════════════════

function CopyAbstractButton({ caseData }: { caseData: ResearchCaseContent }) {
  const [copied, setCopied] = useState(false);
  const abstract = caseData.copyAbstract ?? caseData.intro;
  const label = caseData.copyButtonLabel ?? "复制研究摘要";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(abstract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full border border-[#e1e0cc]/20 bg-[#e1e0cc] px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[#1a1a1a] transition-colors duration-300 hover:bg-[#e1e0cc]/90"
    >
      {copied ? "已复制 ✓" : label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LIFE FEATURE CONTENT — 生活专题页（Tennis & Dance 等）
// ═══════════════════════════════════════════════════════════════════════

function LifeFeatureContent({
  image,
  caseData,
}: {
  image: string;
  caseData: ResearchCaseContent;
}) {
  const images = caseData.lifeImages ?? [];
  const sections = caseData.lifeSections ?? [];
  const listItems = caseData.lifeListItems ?? [];
  const listTitle = caseData.lifeListTitle ?? "";
  const imageGroups = caseData.lifeImageGroups ?? [];
  const isGroupMode = imageGroups.length > 0;

  return (
    <div className="min-h-full">
      {/* Hero 预览横幅 */}
      <div className="relative h-[240px] w-full md:h-[300px]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/50 to-transparent" />
        <div className="absolute bottom-6 left-7 right-7 md:bottom-8 md:left-9 md:right-9">
          <h3 className="text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl" style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}>
            {caseData.heroTitle ?? caseData.title}
          </h3>
          <p className="mt-2 text-xs text-white/50">
            {caseData.heroSubtitle ?? caseData.subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-12 px-7 pb-10 pt-10 md:px-9 md:pb-12 md:pt-12 lg:px-10">
        {/* Intro */}
        <div>
          <div className="text-[10px] tracking-[0.22em] text-gray-500">
            {caseData.questionLabel ?? "ABOUT"}
          </div>
          <p className="mt-4 text-sm leading-[1.85] text-gray-300 max-w-[540px]">
            {caseData.intro}
          </p>
        </div>

        {isGroupMode ? (
          /* ── 分组模式：Travel & Daily Fragments ── */
          <>
            {imageGroups.map((group, gi) => (
              <div key={group.title}>
                {/* Section 标题 */}
                <h4
                  className="text-lg font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {group.title}
                </h4>
                {/* Section 文案 */}
                <p className="mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400">
                  {group.text}
                </p>

                {/* 图片网格 - 根据数量灵活布局 */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:gap-5">
                  {group.images.length === 1 && (
                    <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                      <img
                        src={group.images[0].src}
                        alt={group.images[0].title}
                        className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        style={{ height: "clamp(200px, 28vw, 340px)" }}
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-[9px] tracking-[0.18em] text-white/50">{group.images[0].number} / {group.images[0].title}</div>
                        <p className="mt-1 text-[11px] leading-relaxed text-white/70">{group.images[0].caption}</p>
                      </div>
                    </div>
                  )}
                  {group.images.length === 2 && (
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                      {group.images.map((img) => (
                        <div key={img.number} className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                            style={{ height: "clamp(200px, 28vw, 340px)" }}
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="text-[9px] tracking-[0.18em] text-white/50">{img.number} / {img.title}</div>
                            <p className="mt-1 text-[11px] leading-relaxed text-white/70">{img.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {group.images.length === 3 && (
                    <>
                      <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                        <img
                          src={group.images[0].src}
                          alt={group.images[0].title}
                          className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          style={{ height: "clamp(200px, 28vw, 340px)" }}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-[9px] tracking-[0.18em] text-white/50">{group.images[0].number} / {group.images[0].title}</div>
                          <p className="mt-1 text-[11px] leading-relaxed text-white/70">{group.images[0].caption}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {group.images.slice(1).map((img) => (
                          <div key={img.number} className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                              style={{ height: "clamp(200px, 28vw, 340px)" }}
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="text-[9px] tracking-[0.18em] text-white/50">{img.number} / {img.title}</div>
                              <p className="mt-1 text-[11px] leading-relaxed text-white/70">{img.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {group.images.length === 4 && (
                    <>
                      <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {group.images.slice(0, 2).map((img) => (
                          <div key={img.number} className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                              style={{ height: "clamp(200px, 28vw, 340px)" }}
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="text-[9px] tracking-[0.18em] text-white/50">{img.number} / {img.title}</div>
                              <p className="mt-1 text-[11px] leading-relaxed text-white/70">{img.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {group.images.slice(2).map((img) => (
                          <div key={img.number} className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                              style={{ height: "clamp(200px, 28vw, 340px)" }}
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="text-[9px] tracking-[0.18em] text-white/50">{img.number} / {img.title}</div>
                              <p className="mt-1 text-[11px] leading-relaxed text-white/70">{img.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Group 之间的分隔线（非最后一个 group） */}
                {gi < imageGroups.length - 1 && (
                  <div className="mt-12 border-t border-white/[0.06]" />
                )}
              </div>
            ))}

            {/* Closing text section */}
            {(caseData.lifeClosingTitle || caseData.lifeClosingText) && (
              <div className="border-t border-white/[0.06] pt-8">
                {caseData.lifeClosingTitle && (
                  <h4
                    className="text-lg font-medium text-white"
                    style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    {caseData.lifeClosingTitle}
                  </h4>
                )}
                {caseData.lifeClosingText && (
                  <p className="mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400">
                    {caseData.lifeClosingText}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          /* ── 现有模式：Tennis & Dance ── */
          <>
            {/* Editorial Image Grid */}
            {images.length > 0 && (
              <div>
                <div className="text-[10px] tracking-[0.22em] text-gray-500 mb-6">GALLERY</div>
                <div className="grid grid-cols-1 gap-4 md:gap-5">
                  {/* Row 1: tennis — two images side by side, first slightly taller */}
                  {images.length >= 2 && (
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                      <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                        <img
                          src={images[0].src}
                          alt={images[0].title}
                          className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          style={{ height: "clamp(200px, 28vw, 340px)" }}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                        <img
                          src={images[1].src}
                          alt={images[1].title}
                          className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          style={{ height: "clamp(200px, 28vw, 340px)" }}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  )}
                  {/* Row 2: jazz — two images side by side */}
                  {images.length >= 4 && (
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                      <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                        <img
                          src={images[2].src}
                          alt={images[2].title}
                          className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          style={{ height: "clamp(200px, 28vw, 340px)" }}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="group relative overflow-hidden" style={{ borderRadius: 4 }}>
                        <img
                          src={images[3].src}
                          alt={images[3].title}
                          className="w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          style={{ height: "clamp(200px, 28vw, 340px)" }}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Text Sections */}
            {sections.map((sec) => (
              <div key={sec.title} className="border-t border-white/[0.06] pt-8">
                <h4 className="text-lg font-medium text-white" style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}>
                  {sec.title}
                </h4>
                <p className="mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400">
                  {sec.text}
                </p>
              </div>
            ))}

            {/* List Section */}
            {listItems.length > 0 && (
              <div className="border-t border-white/[0.06] pt-8">
                <h4 className="text-lg font-medium text-white" style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}>
                  {listTitle}
                </h4>
                <div className="mt-5 space-y-3">
                  {listItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#e1e0cc]/40" />
                      <span className="text-sm leading-relaxed text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// RIGHT CONTENT AREA
// ═══════════════════════════════════════════════════════════════════════

function ResearchCaseContent({
  image,
  caseData,
}: {
  image: string;
  caseData: ResearchCaseContent;
}) {
  const isDataOps = caseData.id === "shein-data-operations";
  const isAIProduct = caseData.id === "ai-business-insight" || caseData.id === "ai-analytics-suite";
  const isAIUserFeedback = caseData.id === "ai-user-feedback";
  const isLifeFeature = caseData.isLifeFeature;

  if (isLifeFeature) {
    return <LifeFeatureContent image={image} caseData={caseData} />;
  }
  const hasFiveSteps = caseData.process.length === 5;

  return (
    <div className="min-h-full">
      {/* Hero 预览横幅 */}
      <div className="relative h-[200px] w-full md:h-[260px]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent" />
        <div className="absolute bottom-6 left-7 right-7 md:bottom-8 md:left-9 md:right-9">
          <h3 className="text-xl font-medium leading-tight text-white md:text-2xl lg:text-3xl">
            {caseData.heroTitle ?? caseData.title}
          </h3>
          <p className="mt-2 text-xs text-white/50">
            {caseData.heroSubtitle ?? caseData.subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-10 px-7 pb-10 pt-8 md:px-9 md:pb-12 md:pt-10 lg:px-10">
        {/* 研究/业务/产品/洞察问题 */}
        <div>
          <div className="text-[10px] tracking-[0.22em] text-gray-500">
            {caseData.questionLabel ?? "RESEARCH QUESTION"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {caseData.insightQuestion ?? caseData.productQuestion ?? caseData.businessQuestion ?? caseData.intro}
          </p>
        </div>

        {/* 数据与方法卡片 */}
        <div>
          <div className="text-[10px] tracking-[0.22em] text-gray-500">
            {isAIProduct ? "PRODUCT FEATURES" : isAIUserFeedback ? "ANALYSIS DIMENSIONS" : "DATA & METHODS"}
          </div>
          <div className={`mt-4 grid gap-px border border-white/[0.08] ${isAIUserFeedback ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-2"}`}>
            {(caseData.dataCards ?? caseData.stats).map((s, i) => (
              <div key={`${s.label}-${i}`} className="bg-[#1c1c1c] p-5">
                <div className="text-[10px] tracking-[0.2em] text-gray-500">{s.label}</div>
                <div className="mt-2 text-sm font-medium text-[#e1e0cc]">{s.value}</div>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 核心发现 / 成果 */}
        <div>
          <div className="text-[10px] tracking-[0.22em] text-gray-500">CORE FINDINGS</div>
          <h4 className="mt-3 text-lg font-medium text-white">{caseData.findingsTitle}</h4>
          <div className="mt-6 space-y-px border border-white/[0.06]">
            {caseData.results.map((r) => (
              <div key={r.number} className="bg-[#1c1c1c] p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-light text-white/70">{r.number}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{r.title}</div>
                    <p className="mt-2 max-w-[380px] text-xs leading-relaxed text-gray-400">
                      {r.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 研究/运营/产品/反馈流程 */}
        <div>
          <div className="text-[10px] tracking-[0.22em] text-gray-500">
            {caseData.processEyebrow}
          </div>
          <h4 className="mt-3 text-lg font-medium text-white">{caseData.processTitle}</h4>
          <div className="relative mt-8">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/[0.08] md:block" />
            <div className={`grid grid-cols-2 gap-8 ${hasFiveSteps ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
              {caseData.process.map((f) => (
                <div key={f.number} className="relative">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/[0.14] bg-[#151515] text-[11px] text-white/80">
                    {f.number}
                  </div>
                  <div className="mt-4 text-xs font-medium tracking-[0.18em] text-white">
                    {f.title}
                  </div>
                  <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-gray-400">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 能力映射 */}
        <div className="border-t border-white/[0.06] pt-8">
          <div className="text-[10px] tracking-[0.22em] text-gray-500">
            {caseData.capabilitiesTitle.toUpperCase()}
          </div>
          <h4 className="mt-3 text-lg font-medium text-white">{caseData.capabilitiesIntro}</h4>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {caseData.capabilities.map((sk) => (
              <div key={sk.title} className="border-l border-white/[0.1] pl-5">
                <div className="text-xs font-medium tracking-[0.16em] text-[#e1e0cc]">
                  {sk.title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{sk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CASE IMAGE ZOOM REVEAL: 从图片原位置丝滑放大进入 case window
// 供 Work Index / Recent Works 等列表场景复用
// ═══════════════════════════════════════════════════════════════════════

export function CaseImageZoomReveal({
  image,
  caseData,
  sourceRect,
  onClose,
}: {
  image: string;
  caseData: ResearchCaseContent;
  sourceRect: DOMRect | null;
  onClose: () => void;
}) {
  const [showWindow, setShowWindow] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExiting(true);
        setShowWindow(false);
      }
    };
    window.addEventListener("keydown", onKey);

    // Stage 3: 图片放大接近完成后，淡入 case window
    const timer = setTimeout(() => setShowWindow(true), 850);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setShowWindow(false);
  };

  const initialRect =
    sourceRect ??
    new DOMRect(
      typeof window !== "undefined" ? window.innerWidth / 2 - 50 : 0,
      typeof window !== "undefined" ? window.innerHeight / 2 - 50 : 0,
      100,
      100
    );

  const isCircle = initialRect.width < 100 && initialRect.height < 100;

  return (
    <AnimatePresence onExitComplete={onClose}>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.72)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleClose}
        >
          {/* Transition Image: 从原位置丝滑放大到全屏 */}
          <motion.div
            className="pointer-events-none fixed z-[121] overflow-hidden"
            initial={{
              top: initialRect.top,
              left: initialRect.left,
              width: initialRect.width,
              height: initialRect.height,
              borderRadius: isCircle ? "50%" : 0,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* Case Window */}
          <AnimatePresence>
            {showWindow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-[122] flex h-[80vh] w-[74vw] max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151515] shadow-2xl shadow-black/40 md:h-[82vh] md:w-[72vw]"
              >
                <ResearchCaseWindow
                  image={image}
                  caseData={caseData}
                  onClose={handleClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
