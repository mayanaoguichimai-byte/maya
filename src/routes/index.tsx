import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { CursorFollower } from "@/components/CursorFollower";
import { Reveal } from "@/components/Reveal";
import { RotatingRock } from "@/components/RotatingRock";
import { ScrollRockHero } from "@/components/ScrollRockHero";
import {
  digitalFinanceResearchCase,
  financialTrainingCase,
  sheinDataOperationsCase,
  aiBusinessInsightCase,
  ecommerceFunnelCase,
  aiUserFeedbackCase,
  tennisDanceCase,
  travelDailyCase,
  CaseImageZoomReveal,
  type ResearchCaseContent,
} from "@/components/ResearchImageReveal";
import { RecentWorksSection, type WorkCategory } from "@/components/RecentWorksSection";
import { CaseFolioShelf, type FolioItem } from "@/components/CaseFolioShelf";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { AiStudioOverlays, type AiStudioOverlayState } from "@/components/AiStudioOverlays";

// ─────────────────────────────────────────────────────────────────────────────
// 图片资源
// ─────────────────────────────────────────────────────────────────────────────
import lifeData from "@/assets/life-data.jpg";
import lifeAI from "@/assets/life-ai.jpg";
import lifeUsers from "@/assets/life-users.jpg";
import lifeLife from "@/assets/life-life.jpg";
const digitalFinanceImg = "/digital-finance.png";
const aiAnalyticsImg = "/ai-analytics.png";
const aiVideoImg = "/ai-video.png";
import aiBusinessImg from "@/assets/ai-business-insight.png";
import aiUserFeedbackImg from "@/assets/ai-user-feedback.png";
const sheinDataImg = "/shein-data.png";
const ecommerceFunnelImg = "/ecommerce-funnel.png";
const financialTrainingImg = "/financial-training.png";
const tennisPlayImg = "/tennis-new.jpg";
import mountainPortraitImg from "@/assets/life/mountain-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "朱雨婧 — 金融、数据与生活观察" },
      {
        name: "description",
        content:
          "朱雨婧的个人网站，记录金融工程、数据分析、AI 工具实践、用户反馈洞察，以及生活里被注意到的小事。",
      },
      { property: "og:title", content: "朱雨婧 — 金融、数据与生活观察" },
      {
        property: "og:description",
        content: "一个关于金融、数据、AI 工具实践和日常观察的个人空间。",
      },
    ],
  }),
  component: Home,
});

const thoughts = [
  { tag: "关于数字", line: "数字不是答案，它只是问题被看见的一种方式。" },
  { tag: "关于分析", line: "好的数据分析，应该让人更快理解下一步该做什么。" },
  {
    tag: "关于 AI",
    line: "AI 最吸引我的，不只是生成内容，而是把脑海中的电影画面真正带到现实。",
  },
  {
    tag: "关于好奇心",
    line: "好奇心不是一种性格标签，而是一种每天都可以练习的小习惯。",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Work Index 分类数据
// ─────────────────────────────────────────────────────────────────────────────
const workCategories: WorkCategory[] = [
  {
    id: "ai-studio",
    label: "AI Tools — 01",
    description: "探索 AI 如何帮助分析数据、提升效率，以及创造更具表达力的数字内容。",
    items: [
      {
        id: "as2",
        title: "AI Video Studio",
        subtitle: "通过 AI 视频探索新的表达方式，从概念到动态叙事的视觉实验。",
        meta: "AI / Video · 2026",
        image: aiVideoImg,
        revealCaseId: "__ai_video_studio__",
      },
      {
        id: "as1",
        title: "AI Analytics Suite",
        subtitle: "AI 辅助的用户反馈分析与经营数据洞察工具集。",
        meta: "AI / Analytics · 2026",
        image: aiAnalyticsImg,
        revealCaseId: "__ai_analytics_suite__",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance — 02",
    description: "关于金融工程、实证研究、价值判断和长期思考。",
    items: [
      {
        id: "f1",
        title: "数字金融与实体经济研究",
        subtitle: "基于省级面板数据的数字金融研究。",
        meta: "Finance Research · 2025",
        image: digitalFinanceImg,
        revealCaseId: "digital-finance-research",
      },
      {
        id: "f2",
        title: "金融工程专业训练",
        subtitle: "围绕估值、指标体系、公司金融与价值判断的课程训练。",
        meta: "Finance Training · 2025",
        image: financialTrainingImg,
        revealCaseId: "financial-engineering-training",
      },
    ],
  },
  {
    id: "data",
    label: "Data — 03",
    description: "关于业务数据、用户行为、指标分析和可行动判断。",
    items: [
      {
        id: "d1",
        title: "SHEIN 海外平台数据运营分析",
        subtitle: "围绕销售、库存、SKU 和用户反馈的跨境电商数据分析。",
        meta: "Data Operations · 2025",
        image: sheinDataImg,
        revealCaseId: "shein-data-operations",
      },
      {
        id: "d2",
        title: "电商用户转化漏斗分析",
        subtitle: "基于用户行为路径拆解访问、点击和转化流失节点。",
        meta: "Funnel Analysis · 2026",
        image: ecommerceFunnelImg,
        revealCaseId: "ecommerce-funnel-analysis",
      },
    ],
  },
  {
    id: "life",
    label: "Life — 04",
    description: "关于网球、跳舞、旅行、城市观察和日常灵感。",
    items: [
      {
        id: "l1",
        title: "Tennis & Dance",
        subtitle: "网球让我保持专注和反应，跳舞让我感受节奏、表达和身体里的能量。",
        meta: "Movement · Ongoing",
        image: tennisPlayImg,
        revealCaseId: "tennis-dance",
      },
      {
        id: "l2",
        title: "Travel & Daily Fragments",
        subtitle: "旅行、散步、城市观察和生活片段，记录我在工作之外如何感受世界。",
        meta: "Life · Ongoing",
        image: mountainPortraitImg,
        revealCaseId: "travel-daily",
      },
    ],
  },
];

const caseMap: Record<string, ResearchCaseContent> = {
  "digital-finance-research": digitalFinanceResearchCase,
  "financial-engineering-training": financialTrainingCase,
  "shein-data-operations": sheinDataOperationsCase,
  "ai-business-insight": aiBusinessInsightCase,
  "ecommerce-funnel-analysis": ecommerceFunnelCase,
  "ai-user-feedback": aiUserFeedbackCase,
  "tennis-dance": tennisDanceCase,
  "travel-daily": travelDailyCase,
};

// ─────────────────────────────────────────────────────────────────────────────
// Folio Shelf 数据
// ─────────────────────────────────────────────────────────────────────────────
const folioItems: FolioItem[] = [
  {
    id: "ai-video-studio",
    title: "AI Video Studio",
    category: "AI Tools — 01",
    subtitle: "AI / Video / Motion Design",
    image: aiVideoImg,
    caseId: "__ai_video_studio__",
  },
  {
    id: "ai-analytics-suite",
    title: "AI Analytics Suite",
    category: "AI Tools — 01",
    subtitle: "AI / Data Analysis / User Insight",
    image: aiAnalyticsImg,
    caseId: "__ai_analytics_suite__",
  },
  {
    id: "digital-finance",
    title: "数字金融与实体经济研究",
    category: "Finance — 02",
    subtitle: "Panel Data / Empirical Research",
    image: digitalFinanceImg,
    caseId: "digital-finance-research",
  },
  {
    id: "financial-training",
    title: "金融工程专业训练",
    category: "Finance — 02",
    subtitle: "Financial Engineering / Valuation / Quant Thinking",
    image: financialTrainingImg,
    caseId: "financial-engineering-training",
  },
  {
    id: "shein-data",
    title: "SHEIN 海外平台数据运营分析",
    category: "Data — 03",
    subtitle: "SKU / Inventory / Data Operations",
    image: sheinDataImg,
    caseId: "shein-data-operations",
  },
  {
    id: "ecommerce-funnel",
    title: "电商用户转化漏斗分析",
    category: "Data — 03",
    subtitle: "Funnel / User Behavior / Conversion",
    image: ecommerceFunnelImg,
    caseId: "ecommerce-funnel-analysis",
  },
  {
    id: "tennis-dance",
    title: "Tennis & Dance",
    category: "Life — 04",
    subtitle: "Movement / Rhythm / Expression",
    image: tennisPlayImg,
    caseId: "tennis-dance",
  },
  {
    id: "travel-daily",
    title: "Travel & Daily Fragments",
    category: "Life — 04",
    subtitle: "Travel / Learning / Photography / Daily Life",
    image: mountainPortraitImg,
    caseId: "travel-daily",
  },
];

function Home() {
  useSmoothScroll();
  const [zoomReveal, setZoomReveal] = useState<{
    caseData: ResearchCaseContent;
    image: string;
    sourceRect: DOMRect | null;
  } | null>(null);
  const [aiStudioOverlay, setAiStudioOverlay] = useState<AiStudioOverlayState>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Preloader />
      <CursorFollower />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <div className="flex items-start justify-between gap-6 px-6 md:px-10 py-5">
          <a href="#home" className="label-xs font-medium">
            朱雨婧 / Yujing Zhu
          </a>
          <nav className="flex max-w-[72vw] flex-wrap items-center justify-end gap-3 md:gap-6 label-xs">
            <a href="#home" className="hover:opacity-60 transition-opacity">
              首页
            </a>
            <a href="#about" className="hover:opacity-60 transition-opacity">
              关于
            </a>
            <a href="#works" className="hover:opacity-60 transition-opacity">
              作品
            </a>
            <a href="#thoughts" className="hover:opacity-60 transition-opacity">
              想法
            </a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">
              联系
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <ScrollRockHero />

      {/* About */}
      <section
        id="about"
        className="relative bg-black text-white px-6 md:px-10 pt-32 pb-24 md:pt-48 md:pb-32"
      >
        <Reveal>
          <span className="label-xs text-white/50 mb-6 block text-center">— About —</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-hero max-w-5xl mx-auto text-center">
            AI、金融、数据，
            <br />
            和生活里那些
            <br />
            值得停下来的小事
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl mx-auto text-center text-white/60 text-base md:text-lg leading-relaxed">
            我是一名金融工程背景的学生，同时专注于 AI 视频创作与生成式 AI 应用。我热衷于利用 AI 构建电影级场景、环境动画和视觉叙事，探索技术与艺术融合的更多可能。除了创作，我也持续关注数据、产品与 AI 工具，希望用技术把想法变成具有感染力的作品。
          </p>
        </Reveal>
      </section>

      {/* Work Index — 分类索引 */}
      <section id="works">
        <RecentWorksSection
          categories={workCategories}
          onItemClick={(work, sourceRect) => {
            if (work.revealCaseId === "__ai_analytics_suite__") {
              setAiStudioOverlay({ type: "analytics-suite", sourceRect });
            } else if (work.revealCaseId === "__ai_video_studio__") {
              setAiStudioOverlay({ type: "video-studio", sourceRect });
            } else if (work.revealCaseId) {
              const matched = caseMap[work.revealCaseId];
              if (matched) {
                setZoomReveal({
                  caseData: matched,
                  image: work.image,
                  sourceRect,
                });
              }
            }
          }}
        />
      </section>

      {/* Case Folio Shelf — 3D 档案册展示 */}
      <CaseFolioShelf
        items={folioItems}
        onOpenCase={(item, sourceRect) => {
          if (item.caseId === "__ai_analytics_suite__") {
            setAiStudioOverlay({ type: "analytics-suite", sourceRect });
          } else if (item.caseId === "__ai_video_studio__") {
            setAiStudioOverlay({ type: "video-studio", sourceRect });
          } else if (item.caseId) {
            const matched = caseMap[item.caseId];
            if (matched) {
              setZoomReveal({
                caseData: matched,
                image: item.image,
                sourceRect,
              });
            }
          } else if (item.scrollTarget) {
            const el = document.querySelector(item.scrollTarget);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      />

      {/* Thoughts */}
      <section id="thoughts" className="px-6 md:px-10 py-24 md:py-36 border-t border-white/10">
        <Reveal>
          <div className="label-xs text-white/50 mb-8">Thoughts — Notes to Self</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg max-w-5xl mb-10">
            我一直反复思考的<span className="text-white/50">一些小想法。</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="max-w-3xl mb-20 space-y-5 text-white/60 text-base md:text-lg leading-relaxed">
            <p>我想做的事，是把复杂信息变成可读、可用、可感的东西。</p>
            <p>
              有时候它是一张看板，有时候是一段分析，也可能只是一个更清楚的问题。
              我喜欢在金融、数据、AI 工具和日常生活之间来回走动，慢慢找到那些原本被忽略的联系。
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {thoughts.map((t, i) => (
            <Reveal key={t.tag} delay={i * 0.06}>
              <div className="border-t border-white/10 pt-6">
                <div className="label-xs text-white/50 mb-4">{t.tag}</div>
                <p className="text-2xl md:text-3xl leading-snug">"{t.line}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 overflow-hidden py-8">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16">
              {["分析。", "观察。", "提问。", "记录。"].map((t, i) => (
                <span key={i} className="display-lg">
                  {t} <span className="text-white/50">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <RotatingRock />

      {/* Contact */}
      <section id="contact" className="px-6 md:px-10 py-24 md:py-40 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Reveal>
            <div className="label-xs text-white/50 mb-8">Contact — 01</div>
            <h2 className="display-hero">打个招呼。</h2>
            <p className="mt-6 max-w-md text-white/60 text-base md:text-lg leading-relaxed">
              如果你想聊 AI 视频、生成式 AI、影视创作、数据、金融，或是一个有趣的创意，欢迎联系我。希望用技术、影像与美学，把想法变成作品，也期待与你一起创造新的故事。
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-10">
              <div>
                <div className="label-xs text-white/50 mb-3">地点</div>
                <p className="text-lg">杭州</p>
              </div>
              <div>
                <div className="label-xs text-white/50 mb-3">邮箱</div>
                <a href="mailto:zhuyujing666666@163.com" className="text-lg hover:opacity-60">
                  zhuyujing666666@163.com
                </a>
              </div>
              <div>
                <div className="label-xs text-white/50 mb-3">当前状态</div>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  学习金融工程，专注于 AI 视频创作、电影级场景构建与生成式 AI 应用，也持续探索 AI 工具开发，并记录生活中的灵感。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4 label-xs text-white/50">
        <span>© {new Date().getFullYear()} 朱雨婧 / Yujing Zhu</span>
        <span>金融、数据，以及生活里的小事。</span>
      </footer>

      {/* Cinematic Image Zoom Reveal for Work Index items */}
      <AnimatePresence>
        {zoomReveal && (
          <CaseImageZoomReveal
            image={zoomReveal.image}
            caseData={zoomReveal.caseData}
            sourceRect={zoomReveal.sourceRect}
            onClose={() => setZoomReveal(null)}
          />
        )}
      </AnimatePresence>

      {/* AI Studio Overlays */}
      <AiStudioOverlays
        state={aiStudioOverlay}
        onClose={() => setAiStudioOverlay(null)}
      />
    </div>
  );
}
