import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Lenis } from "../_libs/lenis.mjs";
import { A as AnimatePresence, m as motion, u as useScroll, a as useMotionValueEvent, b as useTransform, c as useMotionValue, d as useSpring } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Preloader() {
  const [progress, setProgress] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !done && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { y: 0 },
      exit: { y: "-100%" },
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      className: "fixed inset-0 z-[100] bg-background flex items-center justify-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "w-3 h-3 rounded-full bg-foreground",
            animate: { scale: [1, 1.4, 1] },
            transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-6 right-6 label-xs font-bold tabular-nums", children: [
          progress,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6 label-xs text-muted-foreground", children: "朱雨婧 / Yujing Zhu — Loading" })
      ]
    }
  ) });
}
function CursorFollower() {
  const [pos, setPos] = reactExports.useState({ x: 0, y: 0 });
  const [label, setLabel] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const el = e.target?.closest("[data-cursor]");
      setLabel(el ? el.dataset.cursor || "View" : null);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: label && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.6 },
      animate: { opacity: 1, scale: 1, x: pos.x - 44, y: pos.y - 44 },
      exit: { opacity: 0, scale: 0.6 },
      transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.4 },
      className: "pointer-events-none fixed top-0 left-0 z-[90] w-22 h-22 hidden md:flex items-center justify-center rounded-full bg-foreground text-background label-xs uppercase",
      style: { width: 88, height: 88 },
      children: [
        label,
        " →"
      ]
    }
  ) });
}
function Reveal({
  children,
  delay = 0,
  y = 30,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
const rock = "/assets/rock-real-oXiL4hmD.png";
function RotatingRock() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 320]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 0.92, 0.7]);
  const rockFilter = useTransform(
    brightness,
    (v) => `brightness(${v}) contrast(1.18) drop-shadow(0 40px 60px rgba(0,0,0,0.65))`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "relative min-h-[110vh] bg-foreground text-background overflow-hidden flex items-center justify-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            style: { rotate, scale, y },
            className: "relative w-[60vmin] h-[60vmin] [perspective:1000px]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                style: { filter: rockFilter },
                className: "relative h-full w-full will-change-transform",
                animate: {
                  rotateZ: [-2, 2, -2],
                  rotateX: [-3, 3, -3],
                  y: [0, -14, 0]
                },
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-[8%] translate-x-[4%] translate-y-[14%] rounded-[48%] bg-black/60 blur-[40px]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-[14%] translate-x-[6%] translate-y-[10%] rounded-[46%] bg-black/35 blur-2xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: rock,
                      alt: "",
                      className: "relative z-10 h-full w-full object-contain",
                      style: { backfaceVisibility: "hidden" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-[12%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_60%_50%_at_28%_18%,rgba(255,245,220,0.28),transparent_70%)] mix-blend-overlay" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-[16%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_50%_40%_at_45%_12%,rgba(255,250,235,0.12),transparent_60%)] mix-blend-soft-light" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-[14%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_55%_55%_at_72%_78%,rgba(0,0,0,0.55),transparent_65%)] mix-blend-multiply" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-[10%] z-20 rounded-[46%] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.08),transparent_50%)] mix-blend-overlay" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "label-xs text-background/60 mb-6", children: "Still observing." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display-hero", children: [
            "继续把问题",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "看清楚一点。"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contact",
              className: "pointer-events-auto mt-10 label-xs underline underline-offset-8 decoration-1 hover:opacity-60",
              children: "写给我 →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6 label-xs text-background/50", children: "金融 / 数据 / AI / 日常" })
      ]
    }
  );
}
function VideoWithZoom({ src, className = "", style }) {
  const videoRef = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {
      });
    } else {
      video.pause();
    }
  }, [isVisible]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "video",
    {
      ref: videoRef,
      src,
      loop: true,
      muted: true,
      playsInline: true,
      preload: "metadata",
      className,
      style
    }
  );
}
const HERO_VIDEO = "/hero-video.mp4";
const INK_VIDEO = "/ink-video.mp4";
const HH_VIDEO = "/hh-video.mp4";
const CHASE_VIDEO = "/chase-video.mp4";
const COWBOY_SHOOT = "/cowboy-shoot.mp4";
const COWBOY_RIDE = "/cowboy-ride.mp4";
const COWBOY_BATH = "/cowboy-bath.mp4";
const BACK_IMAGES = [HERO_VIDEO, INK_VIDEO, HH_VIDEO, CHASE_VIDEO, COWBOY_SHOOT, COWBOY_BATH, COWBOY_RIDE];
const NEXT_IMAGES = [HERO_VIDEO, INK_VIDEO, HH_VIDEO, CHASE_VIDEO, COWBOY_RIDE, COWBOY_BATH];
const backLayout = [
  "left-[9vw] top-[40vh] w-[30vw] md:w-[24vw] rotate-[-2deg]",
  "left-[30vw] top-[20vh] w-[26vw] md:w-[18vw] rotate-[1deg]",
  "left-[47vw] top-[31vh] w-[30vw] md:w-[22vw] rotate-[0deg]",
  "left-[64vw] top-[43vh] w-[32vw] md:w-[25vw] rotate-[2deg]",
  "left-[17vw] top-[67vh] w-[36vw] md:w-[29vw] rotate-[0deg]",
  "left-[57vw] top-[66vh] w-[30vw] md:w-[23vw] rotate-[-1deg]",
  "left-[37vw] top-[52vh] w-[28vw] md:w-[20vw] rotate-[0deg]"
];
function ScrollRockHero() {
  const ref = reactExports.useRef(null);
  const [showCredit, setShowCredit] = reactExports.useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowCredit(latest > 0.38);
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.58, 0.76], [1, 1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 0.76], ["0vh", "-20vh"]);
  const rockRotate = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.72],
    [-18, 24, -42, 38, -10]
  );
  const rockRotateY = useTransform(scrollYProgress, [0, 0.72], [-28, 34]);
  const rockRotateX = useTransform(scrollYProgress, [0, 0.72], [12, -10]);
  const rockY = useTransform(scrollYProgress, [0, 0.72], ["2vh", "-5vh"]);
  const rockBrightness = useTransform(
    scrollYProgress,
    [0, 0.25, 0.52, 0.72],
    [1.12, 0.92, 0.62, 0.3]
  );
  const rockFilter = useTransform(
    rockBrightness,
    (v) => `brightness(${v}) contrast(1.16) drop-shadow(0 34px 46px rgba(0,0,0,0.72))`
  );
  const nextY = useTransform(scrollYProgress, [0.55, 1], ["60vh", "-6vh"]);
  const nextOpacity = useTransform(scrollYProgress, [0.55, 0.72, 1], [0, 0.75, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "home", ref, className: "relative h-[280vh] bg-black text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 h-screen overflow-hidden bg-black", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { opacity: sceneOpacity, y: sceneY }, className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(120,75,38,0.18),transparent_28%)]" }),
      BACK_IMAGES.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BackImage, { src, index: i, progress: scrollYProgress }, src)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[43%] z-20 aspect-square w-[28vmin] max-w-[280px] min-w-[150px] -translate-x-1/2 -translate-y-1/2 [perspective:900px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          style: {
            y: rockY,
            rotate: rockRotate,
            rotateY: rockRotateY,
            rotateX: rockRotateX,
            filter: rockFilter
          },
          className: "relative h-full w-full will-change-transform [transform-style:preserve-3d]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-[12%] translate-x-[7%] translate-y-[9%] rounded-[45%] bg-black/55 blur-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: rock,
                alt: "scroll controlled stone",
                className: "relative z-10 h-full w-full object-contain",
                draggable: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-[18%] z-20 rounded-[42%] bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_72%_78%,rgba(0,0,0,0.62),transparent_48%)] mix-blend-overlay" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        style: { y: nextY, opacity: nextOpacity },
        className: "absolute inset-x-0 bottom-0 z-30 px-4 md:px-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6", children: NEXT_IMAGES.map((src, i) => {
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: false,
              className: `group relative aspect-[16/10] overflow-hidden bg-white/5 ${i % 3 === 1 ? "md:translate-y-14" : ""}`,
              children: [
                isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VideoWithZoom,
                  {
                    src,
                    className: "h-full w-full object-cover brightness-[0.86]"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src,
                    alt: "",
                    className: "h-full w-full object-cover brightness-[0.86] transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" })
              ]
            },
            src
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-6 z-40 px-6 md:px-10 label-xs text-white/55", children: showCredit ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "All videos created with Seedance 2.0 · Original works by Zhu Yujing",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "全部视频由 Seedance 2.0 制作 · 原创作品"
    ] }) : "向下滚动，让石头慢慢转动" })
  ] }) });
}
function BackImage({
  src,
  index,
  progress
}) {
  const x = useTransform(progress, [0, 0.72], [`${(index - 3) * 1.5}vw`, `${(index - 3) * -5}vw`]);
  const y = useTransform(progress, [0, 0.72], [`${index % 2 * 2}vh`, `${-14 - index * 2}vh`]);
  const opacity = useTransform(progress, [0, 0.45, 0.72], [0.82, 0.58, 0]);
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { x, y, opacity },
      className: `absolute aspect-[16/10] overflow-hidden bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.65)] ${backLayout[index]}`,
      children: isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoWithZoom,
        {
          src,
          className: "h-full w-full object-cover",
          style: { filter: "grayscale(0.15) saturate(0.65) brightness(0.72)" }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: "",
            className: "h-full w-full object-cover grayscale-[0.15] saturate-[0.65] brightness-[0.72]",
            loading: index < 4 ? "eager" : "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/25" })
      ] })
    }
  );
}
const tennisWatch = "/assets/tennis-watch-DpfwbC39.png";
const tennisPlay = "/assets/tennis-play-M9qhnael.png";
const jazz01 = "/assets/jazz-01-Don3kCjV.png";
const jazz02 = "/assets/jazz-02-uMtnWi3l.jpg";
const cafeBook = "/assets/cafe-book-Bar7ITMI.png";
const mountainPortraitImg = "/assets/mountain-portrait-k4C19UtP.jpg";
const forestLight = "/assets/forest-light-CuezEu7p.png";
const mountainVillage = "/assets/mountain-village-DnVWdmeU.png";
const mountainSelf = "/assets/mountain-self-p7Boob6J.png";
const oceanSelf = "/assets/ocean-self-CoPc_9k3.png";
const cafePortrait = "/assets/cafe-portrait-BNyUdYb-.png";
const waterVillage = "/assets/water-village-MDifEqkM.jpg";
const bookstore = "/assets/bookstore-CrnKl-3Q.png";
const studyNight = "/assets/study-night-Bob0v6PE.png";
const researchStats = [
  {
    label: "样本",
    value: "2013–2020",
    text: "中国 30 个省份面板数据，共 240 个观测值"
  },
  {
    label: "数据",
    value: "数字金融 × 实体经济",
    text: "使用数字金融指数及其结构维度，构建实体经济发展综合分析框架"
  },
  {
    label: "方法",
    value: "多模型检验",
    text: "双向固定效应、中介效应、门槛效应、稳健性检验与工具变量法"
  },
  {
    label: "输出",
    value: "研究结论",
    text: "形成完整实证研究报告，并提出数字金融服务实体经济的政策建议"
  }
];
const researchResults = [
  {
    number: "01",
    title: "数字金融显著促进实体经济发展",
    text: "实证结果表明，数字金融发展水平提升对实体经济发展具有显著正向影响。"
  },
  {
    number: "02",
    title: "结构维度作用存在差异",
    text: "数字金融的覆盖广度、使用深度和数字化程度并不是以同样方式发挥作用，其中实际使用深度和数字化水平更能体现数字金融的真实赋能效果。"
  },
  {
    number: "03",
    title: "技术创新是重要传导路径",
    text: "数字金融并不是简单提供资金支持，它还通过促进技术投入和创新活动，进一步影响实体经济发展质量。"
  },
  {
    number: "04",
    title: "影响具有阶段性特征",
    text: "门槛效应说明，数字金融对实体经济的影响不是简单线性关系，而会随着发展水平变化呈现阶段差异。"
  }
];
const researchFlow = [
  { number: "01", title: "DATA", text: "省级面板数据整理" },
  { number: "02", title: "INDEX", text: "实体经济发展综合指数构建" },
  { number: "03", title: "MODEL", text: "固定效应、中介效应、门槛效应检验" },
  { number: "04", title: "FINDING", text: "输出结论与政策建议" }
];
const researchSkills = [
  {
    title: "Financial Thinking",
    text: "理解价值、风险、资源配置和长期发展问题"
  },
  {
    title: "Data Modeling",
    text: "处理面板数据、构建指标体系并完成变量整理"
  },
  {
    title: "Empirical Analysis",
    text: "使用固定效应、中介效应、门槛效应和稳健性检验"
  },
  {
    title: "Structured Writing",
    text: "将复杂研究过程整理成清晰报告和结论表达"
  }
];
const digitalFinanceResearchCase = {
  id: "digital-finance-research",
  title: "数字金融与实体经济研究",
  subtitle: "Empirical Study on Digital Finance and the Real Economy",
  tags: "FINANCE / PANEL DATA / EMPIRICAL RESEARCH",
  intro: "我用省级面板数据和计量模型，研究数字金融如何通过资源配置、技术创新和结构差异影响实体经济发展。",
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
  copyAbstract: "我基于 2013–2020 年中国 30 个省份面板数据，构建实体经济发展综合指数，并使用数字金融指数及其结构维度，结合双向固定效应、中介效应、门槛效应和稳健性检验，分析数字金融如何影响实体经济发展。",
  heroTitle: "数字金融如何影响实体经济？",
  heroSubtitle: "A research case about finance, data, and real economy development.",
  questionLabel: "RESEARCH QUESTION"
};
const financialTrainingCase = {
  id: "financial-engineering-training",
  title: "金融工程专业训练",
  subtitle: "Financial Engineering Training",
  tags: "FINANCE / ECONOMETRICS / INVESTMENT / PYTHON",
  intro: "我通过金融工程、计量经济学、证券投资、公司金融和编程课程，建立起用数据、模型和商业语境理解问题的基础框架。",
  stats: [
    {
      label: "背景",
      value: "金融工程",
      text: "本科专业训练，建立金融、数据和模型结合的思考基础"
    },
    {
      label: "课程",
      value: "核心课程",
      text: "金融工程学、计量经济学、证券投资学、公司金融、微观与宏观经济学"
    },
    {
      label: "工具",
      value: "Python / C / Excel",
      text: "通过编程与数据工具训练，理解数据处理、模型计算和结果表达"
    },
    {
      label: "能力",
      value: "判断框架",
      text: "从价值、风险、成本、收益和长期影响角度理解业务问题"
    }
  ],
  results: [
    {
      number: "01",
      title: "用价值和风险理解问题",
      text: "金融工程训练让我不只关注表面的数字变化，也会思考数字背后的成本、收益、风险和长期价值。"
    },
    {
      number: "02",
      title: "用计量思维拆解关系",
      text: "计量经济学训练让我习惯从变量、假设、模型和结果可靠性出发，判断一个结论是否真的有解释力。"
    },
    {
      number: "03",
      title: "用市场视角观察业务",
      text: "证券投资学和公司金融训练让我更关注市场信息、企业经营、资金效率和商业决策之间的关系。"
    },
    {
      number: "04",
      title: "用工具把分析落地",
      text: "Python、C 语言和 Excel 等工具训练，让我可以把金融问题转化为可处理的数据、模型和分析结果。"
    }
  ],
  process: [
    {
      number: "01",
      title: "FINANCE",
      text: "金融工程学 / 公司金融：理解价值、风险、收益和企业决策"
    },
    {
      number: "02",
      title: "ECONOMETRICS",
      text: "计量经济学：理解变量关系、模型设定和实证检验"
    },
    {
      number: "03",
      title: "MARKET",
      text: "证券投资学：理解市场数据、资产表现和投资逻辑"
    },
    {
      number: "04",
      title: "TOOLS",
      text: "Python / C / Excel：把分析过程转化为可执行的计算和表达"
    }
  ],
  capabilitiesTitle: "What this training gives me",
  capabilitiesIntro: "这段专业训练，沉淀成我的四种能力。",
  capabilities: [
    {
      title: "Financial Lens",
      text: "从价值、风险和长期收益角度理解问题"
    },
    {
      title: "Quantitative Thinking",
      text: "用变量、模型和数据关系分析现象"
    },
    {
      title: "Business Judgment",
      text: "把金融逻辑放进真实业务和市场语境中判断"
    },
    {
      title: "Tool-based Analysis",
      text: "用 Python、Excel 和数据工具支持分析表达"
    }
  ],
  findingsTitle: "四个塑造思考方式的训练结果。",
  processEyebrow: "LEARNING PATH",
  processTitle: "从课程训练到分析能力的一条路径。",
  footerLabel: "YUJING ZHU / 金融工程专业训练",
  hoverHint: "VIEW TRAINING RESULT →",
  ariaLabel: "查看 金融工程专业训练 成果",
  copyAbstract: "我通过金融工程学、计量经济学、证券投资学、公司金融和编程课程，建立起用数据、模型和商业语境理解问题的基础框架。",
  heroTitle: "金融工程专业训练",
  heroSubtitle: "A training case about finance, econometrics, and analytical thinking.",
  questionLabel: "TRAINING OVERVIEW"
};
const sheinDataCards = [
  {
    label: "数据来源",
    value: "销售 / 库存 / SKU",
    text: "整理商品销售、库存变化、SKU 结构及相关运营数据。"
  },
  {
    label: "用户反馈",
    value: "英文评价",
    text: "结合海外用户评论，观察价格、款式、材质、物流和使用体验中的高频问题。"
  },
  {
    label: "分析方法",
    value: "指标拆解",
    text: "围绕收入、成本、利润、库存周转和商品表现建立分析视角。"
  },
  {
    label: "输出形式",
    value: "看板与建议",
    text: "通过 Excel / PowerBI 整理指标，并输出商品优化和运营复盘建议。"
  }
];
const sheinResults = [
  {
    number: "01",
    title: "识别低效 SKU",
    text: "通过销售、库存和商品表现数据，识别动销效率较低、占用库存资源较多的 SKU，为商品优化提供依据。"
  },
  {
    number: "02",
    title: "定位库存压力",
    text: "从库存周转和商品结构中观察异常积压与库存压力，辅助判断哪些商品需要调整补货、促销或下架策略。"
  },
  {
    number: "03",
    title: "连接用户反馈",
    text: "将英文用户评价中的价格、款式、材质、物流和体验问题进行整理，帮助理解数据背后的真实用户感受。"
  },
  {
    number: "04",
    title: "形成运营建议",
    text: "把分散数据转化为商品优化、选品调整、库存管理和运营复盘中可以被使用的判断。"
  }
];
const sheinProcess = [
  { number: "01", title: "COLLECT", text: "销售、库存、SKU、用户评价与竞品信息整理" },
  { number: "02", title: "CLEAN", text: "数据清洗、分类、字段统一与异常数据检查" },
  { number: "03", title: "ANALYZE", text: "指标拆解、库存压力识别、SKU 表现分析" },
  { number: "04", title: "DECIDE", text: "输出商品优化、库存调整和运营复盘建议" }
];
const sheinCapabilities = [
  {
    title: "Data Cleaning",
    text: "整理分散业务数据，统一字段、结构和分析口径"
  },
  {
    title: "Business Insight",
    text: "从销售、库存、SKU 和用户反馈中发现运营问题"
  },
  {
    title: "Dashboard Thinking",
    text: "用 Excel / PowerBI 将指标整理成可读、可复盘的看板"
  },
  {
    title: "E-commerce Sense",
    text: "理解商品表现、库存压力、用户评价和选品优化之间的关系"
  }
];
const sheinDataOperationsCase = {
  id: "shein-data-operations",
  title: "SHEIN 海外平台数据运营分析",
  subtitle: "E-commerce Data Operations Case",
  tags: "DATA OPERATIONS / SKU / INVENTORY / USER FEEDBACK",
  intro: "我围绕跨境电商业务场景，整理销售、库存、SKU、用户评价和竞品信息，把分散的数据转化为商品优化、库存调整和运营复盘建议。",
  stats: [
    {
      label: "数据量",
      value: "5000+",
      text: "销售、库存及 SKU 数据记录"
    },
    {
      label: "指标",
      value: "10+",
      text: "收入、成本、利润、库存周转等核心指标"
    },
    {
      label: "工具",
      value: "Excel / PowerBI",
      text: "Data Cleaning / Dashboard"
    },
    {
      label: "场景",
      value: "跨境电商",
      text: "SHEIN 海外平台的商品运营与库存管理"
    }
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
  businessQuestion: "在跨境电商业务中，哪些商品表现不够有效？库存压力从哪里来？用户反馈和竞品表现能否帮助我们调整商品方向？",
  dataCards: sheinDataCards,
  tools: "Excel / PowerBI / Data Cleaning / Dashboard",
  copyAbstract: "我围绕 SHEIN 海外平台业务场景，整理并分析销售、库存、SKU、英文用户评价和竞品表现等数据，搭建运营指标视角，识别低效 SKU、库存压力和商品优化方向，支持选品、库存调整与运营复盘。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "数据如何变成运营判断？",
  heroSubtitle: "A data operations case about SKU, inventory, user feedback, and business decisions.",
  questionLabel: "BUSINESS QUESTION"
};
const aiInsightDataCards = [
  {
    label: "数据入口",
    value: "Upload Data",
    text: "用户可以上传销售订单数据，作为后续分析和洞察生成的基础。"
  },
  {
    label: "指标解读",
    value: "Metric Reading",
    text: "围绕销售额、订单量、商品表现、客户和时间趋势等经营指标进行解释。"
  },
  {
    label: "AI 洞察",
    value: "AI Insight",
    text: "将原始数据转化为更容易理解的业务总结、问题识别和优化方向。"
  },
  {
    label: "网页 Demo",
    value: "Live Prototype",
    text: "项目已部署为网页 Demo，方便展示产品流程和交互体验。"
  }
];
const aiInsightResults = [
  {
    number: "01",
    title: "完成从想法到 Demo 的产品闭环",
    text: "项目从“经营数据难以快速解读”的业务痛点出发，完成了产品定位、页面流程、上传入口、AI 分析输出和部署展示。"
  },
  {
    number: "02",
    title: "把数据分析变成可交互工具",
    text: "它不是静态图表展示，而是让用户通过上传数据触发分析流程，形成更接近真实产品的使用体验。"
  },
  {
    number: "03",
    title: "强化业务指标表达",
    text: "项目重点不是炫技，而是围绕经营指标、业务异常和优化建议，让数据结果更容易被非技术用户理解。"
  },
  {
    number: "04",
    title: "形成可展示的 AI 产品原型",
    text: "通过网页 Demo 的形式，将 AI 工具想法落地为可访问、可演示、可继续迭代的产品原型。"
  }
];
const aiInsightProcess = [
  { number: "01", title: "PROBLEM", text: "识别经营数据难以快速解读的业务痛点" },
  { number: "02", title: "UPLOAD", text: "用户上传销售订单或业务数据" },
  { number: "03", title: "ANALYZE", text: "系统生成指标解读、趋势总结和异常提示" },
  { number: "04", title: "INSIGHT", text: "输出经营洞察与优化建议" },
  { number: "05", title: "DEMO", text: "部署为可访问网页原型" }
];
const aiInsightCapabilities = [
  {
    title: "AI Product Thinking",
    text: "把 AI 放进具体业务场景，而不是停留在概念层面"
  },
  {
    title: "Business Analysis",
    text: "围绕销售订单、经营指标和业务问题组织分析逻辑"
  },
  {
    title: "Prototype Building",
    text: "使用 AI coding 工具完成可交互 Demo 的搭建与部署"
  },
  {
    title: "User-oriented Expression",
    text: "将复杂数据结果转化为用户更容易理解的语言和建议"
  }
];
const aiBusinessInsightCase = {
  id: "ai-business-insight",
  title: "AI 经营数据分析助手",
  subtitle: "AI Business Insight Copilot",
  tags: "AI PRODUCT / DATA ANALYSIS / PROTOTYPE",
  intro: "我设计并实现了一个 AI 经营数据分析助手 Demo，用户上传销售订单数据后，可以获得经营指标解读、数据洞察和优化建议。",
  stats: [
    {
      label: "Upload",
      value: "支持上传",
      text: "支持上传业务数据文件"
    },
    {
      label: "Insight",
      value: "自动生成",
      text: "自动生成指标解读与经营分析"
    },
    {
      label: "Demo",
      value: "已部署",
      text: "已部署为可访问网页 Demo"
    },
    {
      label: "Stack",
      value: "AI Coding",
      text: "Trae / AI Coding / Dashboard / Netlify"
    }
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
  productQuestion: "很多业务数据本身并不难获得，真正困难的是如何快速理解数据说明了什么、异常在哪里、下一步应该如何行动。这个项目尝试回答：AI 能否帮助用户把销售订单数据转化为更清晰的经营判断？",
  dataCards: aiInsightDataCards,
  tools: "Trae / AI Coding / Data Analysis / Dashboard / Netlify",
  copyAbstract: "我设计并实现了一个 AI 经营数据分析助手 Demo，围绕真实销售订单数据场景，完成从业务痛点识别、产品流程设计、数据上传功能、AI 洞察生成到网页部署的完整原型实践。该项目尝试将经营数据转化为可读的指标解读、业务洞察和优化建议。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "AI 如何把经营数据变成可读的业务洞察？",
  heroSubtitle: "An AI product experiment about business data, metric interpretation, and decision support.",
  questionLabel: "PRODUCT QUESTION",
  projectLink: "https://mayanaogui.netlify.app/upload",
  projectLinkLabel: "打开项目 Demo"
};
const aiUserFeedbackDataCards = [
  {
    label: "价格",
    value: "Price",
    text: "整理用户对价格敏感度、性价比和促销反馈的表达。"
  },
  {
    label: "款式",
    value: "Style",
    text: "观察用户对版型、风格、颜色和使用场景的偏好。"
  },
  {
    label: "材质",
    value: "Material",
    text: "归纳用户对面料、舒适度、质感和耐用性的评价。"
  },
  {
    label: "物流",
    value: "Logistics",
    text: "识别用户对配送速度、包装体验和售后问题的反馈。"
  },
  {
    label: "体验",
    value: "User Experience",
    text: "提炼用户在购买、使用和复购过程中的高频痛点。"
  }
];
const aiUserFeedbackResults = [
  {
    number: "01",
    title: "把非结构化反馈整理成标签体系",
    text: "使用 AI 对用户评论和反馈文本进行初步分类，将杂乱信息整理为价格、款式、材质、物流和体验等可分析维度。"
  },
  {
    number: "02",
    title: "识别重复出现的用户痛点",
    text: "从高频反馈中识别影响购买、使用和复购的关键问题，让用户需求不再停留在零散评论里。"
  },
  {
    number: "03",
    title: "从文本中提炼产品信号",
    text: "将用户语言转化为可理解的产品信号，帮助判断哪些卖点需要强化，哪些问题需要优先优化。"
  },
  {
    number: "04",
    title: "形成可执行的产品建议",
    text: "把用户反馈结果整理成可被产品、运营和页面表达使用的优化方向，而不是停留在简单评论摘要。"
  }
];
const aiUserFeedbackProcess = [
  { number: "01", title: "COLLECT", text: "收集用户评论、反馈文本与竞品信息" },
  { number: "02", title: "CLASSIFY", text: "使用 AI 进行标签分类和维度整理" },
  { number: "03", title: "EXTRACT", text: "提炼高频痛点、用户偏好和重复问题" },
  { number: "04", title: "TRANSLATE", text: "转化为产品优化、卖点表达和运营建议" }
];
const aiUserFeedbackCapabilities = [
  {
    title: "User Insight",
    text: "从用户评论和真实反馈中识别需求与痛点"
  },
  {
    title: "AI-assisted Analysis",
    text: "使用 AI 工具提高信息分类、归纳和整理效率"
  },
  {
    title: "Product Thinking",
    text: "将用户反馈转化为产品优化和卖点表达"
  },
  {
    title: "Structured Communication",
    text: "把杂乱文本整理成清晰、可复用、可行动的分析结论"
  }
];
const aiUserFeedbackCase = {
  id: "ai-user-feedback",
  title: "AI 辅助用户反馈分析",
  subtitle: "AI-assisted User Feedback Analysis",
  tags: "AI CLASSIFICATION / USER INSIGHT / PRODUCT SUGGESTION",
  intro: "我使用 AI 工具对用户评论、反馈文本和竞品信息进行分类整理，从非结构化文本中提炼用户痛点、需求信号和产品优化方向。",
  stats: [
    {
      label: "评论",
      value: "100+",
      text: "用户评论与反馈文本整理"
    },
    {
      label: "维度",
      value: "5",
      text: "价格、款式、材质、物流、使用体验等分析维度"
    },
    {
      label: "输出",
      value: "Output",
      text: "用户痛点归纳与产品优化建议"
    }
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
  insightQuestion: "用户反馈往往是分散、重复、情绪化和非结构化的。真正有价值的问题不是“用户说了什么”，而是这些反馈背后反复出现的需求是什么、哪些问题影响用户决策，以及哪些信息可以转化为产品优化建议。",
  dataCards: aiUserFeedbackDataCards,
  tools: "ChatGPT / Text Classification / User Review Analysis / Product Insight",
  copyAbstract: "我使用 AI 工具对用户评论、反馈文本和竞品信息进行分类整理，从价格、款式、材质、物流和使用体验等维度提炼高频问题，并将非结构化反馈转化为用户痛点、需求信号和产品优化建议。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "AI 如何从用户反馈里读出真实需求？",
  heroSubtitle: "An AI-assisted workflow about user reviews, feedback classification, and product insight.",
  questionLabel: "Insight Question"
};
const tennisDanceImages = [
  {
    src: tennisWatch,
    number: "01",
    title: "Watching the Game",
    caption: "现场看球时，我很喜欢那种全场专注、节奏推进的氛围。"
  },
  {
    src: tennisPlay,
    number: "02",
    title: "On Court",
    caption: "真正站上球场时，我更能感受到反应、判断和身体控制带来的快乐。"
  },
  {
    src: jazz01,
    number: "03",
    title: "Jazz Practice",
    caption: "Jazz 对我来说不仅是动作，更是一种节奏和情绪的释放。"
  },
  {
    src: jazz02,
    number: "04",
    title: "Movement & Expression",
    caption: "我喜欢舞蹈带来的身体感，也喜欢它让我更自由地表达自己。"
  }
];
const tennisDanceSections = [
  {
    title: "Tennis",
    text: "网球对我来说是一种很直接的训练。它需要判断、反应、预判和稳定心态。每一次来回都不完全可控，所以我很喜欢这种“在变化中保持专注”的感觉。从现场看比赛，到自己真正站上球场，这项运动带给我的不只是竞技感，也是一种持续投入、持续调整的状态。"
  },
  {
    title: "Jazz Dance",
    text: "相比网球的专注和反应，Jazz 带给我的是另一种能量。它让我感受节奏、身体和情绪的流动，也让我从理性分析的模式里暂时抽离出来。我很喜欢舞蹈里的表达感——有力量，也有松弛；有控制，也有释放。"
  }
];
const tennisDanceCase = {
  id: "tennis-dance",
  title: "Tennis & Dance",
  subtitle: "Movement, rhythm, and energy",
  tags: "SPORT / DANCE / FOCUS / EXPRESSION",
  intro: "网球让我在快速变化里保持专注，Jazz 让我用节奏和身体表达情绪。它们是我工作之外最直接的能量来源。",
  stats: [
    { label: "Focus", value: "专注", text: "在变化中保持判断和反应" },
    { label: "Rhythm", value: "节奏", text: "感受身体和情绪的流动" },
    { label: "Expression", value: "表达", text: "用力量和松弛传递情绪" }
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
    "工作之外真实而持续的能量来源"
  ]
};
const travelDailyGroups = [
  {
    title: "Slow Learning",
    text: "我喜欢一些慢下来的学习时刻：窗边的书、夜晚的台灯、打开的电脑，或者在书店里被一本书吸引。它们不一定马上变成结果，但会慢慢变成我的理解力、表达力和对世界的兴趣。",
    images: [
      { src: cafeBook, number: "01", title: "Window Reading", caption: "窗边、书和植物，是让我慢下来的时刻。" },
      { src: studyNight, number: "02", title: "Night Study", caption: "夜晚学习的时候，我更容易进入自己的节奏。" },
      { src: bookstore, number: "03", title: "Bookstore Stop", caption: "我喜欢在书店里被偶然看到的内容吸引。" }
    ]
  },
  {
    title: "Mountains & Roads",
    text: "旅行对我来说不只是去一个地方，而是换一种环境重新感受自己。山里的空气、路边的树、远处的光和村落里的烟火气，会让我意识到生活有很多种展开方式。",
    images: [
      { src: mountainPortraitImg, number: "04", title: "In the Mountains", caption: "山里让我感觉到空间、安静和自由。" },
      { src: mountainVillage, number: "05", title: "Village Light", caption: "我喜欢旅行中那些不刻意但很有生命力的画面。" },
      { src: mountainSelf, number: "06", title: "Open Air", caption: "站在山间的时候，我会更清楚地感受到自己。" },
      { src: forestLight, number: "07", title: "Passing Trees", caption: "有时候我记录的不是景点，而是路上的光线。" }
    ]
  },
  {
    title: "Sea & Color",
    text: "海和明亮的颜色会让我变得更轻盈。水面、阳光、花、船和蓝色的天空，是旅行里最直接的快乐。它们让我从日常的逻辑里抽离出来，重新感受到一种更开放的状态。",
    images: [
      { src: oceanSelf, number: "08", title: "By the Sea", caption: "海边的风和光，会让我觉得自己重新充满电。" },
      { src: waterVillage, number: "09", title: "Bright Places", caption: "我喜欢那些颜色很鲜活、让人心情变轻的地方。" }
    ]
  },
  {
    title: "Daily Fragments",
    text: "我也喜欢记录一些普通但有质感的日常：一顿饭、一盏灯、一个下午、一段安静的时间。它们不是宏大的故事，但会让我觉得生活不是空白的，而是由很多小片段组成的。",
    images: [
      { src: cafePortrait, number: "10", title: "A Small Table", caption: "生活里有些时刻很小，但我会记得它们。" }
    ]
  }
];
const travelDailyCase = {
  id: "travel-daily",
  title: "Travel & Daily Fragments",
  subtitle: "Places, books, light, and small moments",
  tags: "TRAVEL / LEARNING / PHOTOGRAPHY / DAILY LIFE",
  intro: "旅行、阅读、学习和日常观察让我从工作之外重新感受世界。它们不是简历上的成果，却构成了我很重要的一部分。",
  stats: [
    { label: "Travel", value: "旅行", text: "换一种环境重新感受自己" },
    { label: "Reading", value: "阅读", text: "慢慢变成理解力和表达力" },
    { label: "Photography", value: "摄影", text: "学会观察细节和光线" },
    { label: "Daily Life", value: "日常", text: "由很多小片段组成的生活" }
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
  hoverHint: "VIEW LIFE →",
  ariaLabel: "查看 Travel & Daily Fragments 生活专题",
  heroTitle: "Travel & Daily Fragments",
  heroSubtitle: "Places, books, light, and small moments",
  questionLabel: "ABOUT",
  isLifeFeature: true,
  lifeImageGroups: travelDailyGroups,
  lifeClosingTitle: "What I am looking for in life",
  lifeClosingText: "我喜欢那些让我保持好奇的事情。旅行让我看到不同地方的节奏，阅读和学习让我不断更新自己的理解，摄影让我学会观察细节，而日常片段提醒我，生活不应该只由目标和结果组成。我希望自己一直保留这种感受力：能认真工作，也能认真生活；能分析问题，也能被风景、书、光线和某个普通下午打动。"
};
const funnelDataCards = [
  {
    label: "数据基础",
    value: "User Behavior",
    text: "基于 3000+ 用户行为数据，观察访问、点击、浏览与转化路径。"
  },
  {
    label: "分析方式",
    value: "Funnel Logic",
    text: "通过漏斗拆解，定位不同阶段的转化效率和流失节点。"
  },
  {
    label: "关键问题",
    value: "Drop-off Points",
    text: "识别用户在访问、点击、浏览和下单流程中的关键流失位置。"
  },
  {
    label: "优化输出",
    value: "Actionable Insight",
    text: "将分析结果转化为页面信息、推荐策略和转化路径优化建议。"
  }
];
const funnelResults = [
  {
    number: "01",
    title: "拆解完整转化路径",
    text: "将用户行为路径拆解为访问、点击、浏览、加购或转化等关键阶段，形成更清晰的漏斗分析视角。"
  },
  {
    number: "02",
    title: "识别主要流失节点",
    text: "通过不同阶段的转化率变化，找到用户流失最明显的环节，而不是只看最终下单结果。"
  },
  {
    number: "03",
    title: "发现页面与策略问题",
    text: "结合路径表现，判断页面信息表达、商品展示逻辑或推荐策略中可能影响用户继续行动的因素。"
  },
  {
    number: "04",
    title: "输出转化优化建议",
    text: "把分析结果整理为可执行建议，例如优化页面信息、强化推荐逻辑、缩短关键路径和改善引导方式。"
  }
];
const funnelProcess = [
  { number: "01", title: "TRACK", text: "整理用户访问、点击与浏览行为数据" },
  { number: "02", title: "MAP", text: "构建访问 → 点击 → 转化路径" },
  { number: "03", title: "FIND", text: "识别关键流失节点与异常阶段" },
  { number: "04", title: "OPTIMIZE", text: "输出页面、推荐与转化路径优化建议" }
];
const funnelCapabilities = [
  {
    title: "Behavior Analysis",
    text: "能够从用户行为路径中识别关键流失和异常节点"
  },
  {
    title: "Funnel Thinking",
    text: "习惯将复杂转化问题拆解为清晰阶段进行判断"
  },
  {
    title: "Business Optimization",
    text: "把分析结果转化为页面、推荐和策略层面的优化建议"
  },
  {
    title: "Structured Insight",
    text: "将用户行为数据整理成更容易被业务理解和使用的结论"
  }
];
const ecommerceFunnelCase = {
  id: "ecommerce-funnel-analysis",
  title: "电商用户转化漏斗分析",
  subtitle: "E-commerce Funnel Analysis",
  tags: "USER BEHAVIOR / FUNNEL / CONVERSION / BUSINESS INSIGHT",
  intro: "我基于电商用户行为数据拆解访问、点击和转化路径，识别用户流失节点，并将分析结果转化为页面优化、推荐策略和转化路径改进建议。",
  stats: [
    {
      label: "数据量",
      value: "3000+",
      text: "用户行为数据记录"
    },
    {
      label: "Funnel",
      value: "路径拆解",
      text: "访问 → 点击 → 转化路径拆解"
    },
    {
      label: "Output",
      value: "优化建议",
      text: "识别流失节点并输出优化建议"
    },
    {
      label: "Stack",
      value: "Excel / SQL",
      text: "Funnel Analysis / Business Insight"
    }
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
  businessQuestion: "用户并不是在最后一步才流失。真正关键的问题是：访问之后有没有产生点击？点击之后为什么没有继续浏览？哪些节点造成了转化流失？以及这些问题能否通过页面信息、推荐逻辑或路径设计得到改善？",
  dataCards: funnelDataCards,
  tools: "Excel / SQL Logic / Funnel Analysis / Business Insight",
  copyAbstract: "我基于 3000+ 电商用户行为数据，对访问、点击和转化路径进行漏斗分析，识别关键流失节点，并从页面信息、推荐策略和转化路径角度提出优化建议，帮助提升转化效率。",
  copyButtonLabel: "复制案例摘要",
  heroTitle: "用户是在哪一步流失的？",
  heroSubtitle: "A funnel analysis case about user behavior, conversion paths, and business optimization.",
  questionLabel: "BUSINESS QUESTION"
};
function ResearchCaseWindow({
  image,
  caseData,
  onClose
}) {
  const isDataOps = caseData.id === "shein-data-operations";
  const isAIProduct = caseData.id === "ai-business-insight" || caseData.id === "ai-analytics-suite";
  const isAIUserFeedback = caseData.id === "ai-user-feedback";
  caseData.isLifeFeature;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "flex w-full flex-shrink-0 flex-col justify-between border-b border-white/[0.06] bg-[#1a1a1a] p-7 md:w-[34%] md:border-b-0 md:border-r md:p-9 lg:p-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium leading-tight text-[#e1e0cc] md:text-2xl", children: caseData.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs tracking-[0.16em] text-[#e1e0cc]/50", children: caseData.subtitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[11px] tracking-[0.2em] text-gray-400", children: caseData.tags }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: caseData.stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium text-[#e1e0cc]", children: s.value })
            ] }, s.label)) }),
            (isDataOps || isAIProduct || isAIUserFeedback) && caseData.tools && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: "TOOLS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-gray-300", children: caseData.tools })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 md:mt-0 space-y-3", children: [
            isAIProduct && caseData.projectLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: caseData.projectLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex w-full items-center justify-center border border-white/[0.18] bg-transparent px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[#e1e0cc] transition-colors duration-300 hover:bg-white/[0.06]",
                children: [
                  caseData.projectLinkLabel ?? "打开项目",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[10px]", children: "↗" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CopyAbstractButton, { caseData }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-600", children: caseData.footerLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "text-[11px] text-gray-400 transition-colors duration-300 hover:text-[#e1e0cc]",
                  children: "CLOSE ×"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
        "data-lenis-prevent": true,
        "data-lenis-prevent-wheel": true,
        "data-lenis-prevent-touch": true,
        className: "relative flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "absolute right-4 top-4 z-20 text-[11px] text-gray-400 transition-colors duration-300 hover:text-white md:right-5 md:top-5",
              "aria-label": "关闭研究成果展示",
              children: "CLOSE ×"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResearchCaseContent, { image, caseData })
        ]
      }
    )
  ] });
}
function CopyAbstractButton({ caseData }) {
  const [copied, setCopied] = reactExports.useState(false);
  const abstract = caseData.copyAbstract ?? caseData.intro;
  const label = caseData.copyButtonLabel ?? "复制研究摘要";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(abstract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "w-full border border-[#e1e0cc]/20 bg-[#e1e0cc] px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[#1a1a1a] transition-colors duration-300 hover:bg-[#e1e0cc]/90",
      children: copied ? "已复制 ✓" : label
    }
  );
}
function LifeFeatureContent({
  image,
  caseData
}) {
  const images = caseData.lifeImages ?? [];
  const sections = caseData.lifeSections ?? [];
  const listItems = caseData.lifeListItems ?? [];
  const listTitle = caseData.lifeListTitle ?? "";
  const imageGroups = caseData.lifeImageGroups ?? [];
  const isGroupMode = imageGroups.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[240px] w-full md:h-[300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/50 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-7 right-7 md:bottom-8 md:left-9 md:right-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl", style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }, children: caseData.heroTitle ?? caseData.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/50", children: caseData.heroSubtitle ?? caseData.subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12 px-7 pb-10 pt-10 md:px-9 md:pb-12 md:pt-12 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: caseData.questionLabel ?? "ABOUT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-[1.85] text-gray-300 max-w-[540px]", children: caseData.intro })
      ] }),
      isGroupMode ? (
        /* ── 分组模式：Travel & Daily Fragments ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          imageGroups.map((group, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h4",
              {
                className: "text-lg font-medium text-white",
                style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" },
                children: group.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400", children: group.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 gap-4 md:gap-5", children: [
              group.images.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: group.images[0].src,
                    alt: group.images[0].title,
                    className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                    style: { height: "clamp(200px, 28vw, 340px)" },
                    draggable: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                    group.images[0].number,
                    " / ",
                    group.images[0].title
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: group.images[0].caption })
                ] })
              ] }),
              group.images.length === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: group.images.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img.src,
                    alt: img.title,
                    className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                    style: { height: "clamp(200px, 28vw, 340px)" },
                    draggable: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                    img.number,
                    " / ",
                    img.title
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: img.caption })
                ] })
              ] }, img.number)) }),
              group.images.length === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: group.images[0].src,
                      alt: group.images[0].title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                      group.images[0].number,
                      " / ",
                      group.images[0].title
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: group.images[0].caption })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: group.images.slice(1).map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.src,
                      alt: img.title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                      img.number,
                      " / ",
                      img.title
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: img.caption })
                  ] })
                ] }, img.number)) })
              ] }),
              group.images.length === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: group.images.slice(0, 2).map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.src,
                      alt: img.title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                      img.number,
                      " / ",
                      img.title
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: img.caption })
                  ] })
                ] }, img.number)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: group.images.slice(2).map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.src,
                      alt: img.title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-[0.18em] text-white/50", children: [
                      img.number,
                      " / ",
                      img.title
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-white/70", children: img.caption })
                  ] })
                ] }, img.number)) })
              ] })
            ] }),
            gi < imageGroups.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 border-t border-white/[0.06]" })
          ] }, group.title)),
          (caseData.lifeClosingTitle || caseData.lifeClosingText) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/[0.06] pt-8", children: [
            caseData.lifeClosingTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h4",
              {
                className: "text-lg font-medium text-white",
                style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" },
                children: caseData.lifeClosingTitle
              }
            ),
            caseData.lifeClosingText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400", children: caseData.lifeClosingText })
          ] })
        ] })
      ) : (
        /* ── 现有模式：Tennis & Dance ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500 mb-6", children: "GALLERY" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:gap-5", children: [
              images.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: images[0].src,
                      alt: images[0].title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: images[1].src,
                      alt: images[1].title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
                ] })
              ] }),
              images.length >= 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 md:gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: images[2].src,
                      alt: images[2].title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden", style: { borderRadius: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: images[3].src,
                      alt: images[3].title,
                      className: "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                      style: { height: "clamp(200px, 28vw, 340px)" },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
                ] })
              ] })
            ] })
          ] }),
          sections.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/[0.06] pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-medium text-white", style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }, children: sec.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[520px] text-sm leading-[1.85] text-gray-400", children: sec.text })
          ] }, sec.title)),
          listItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/[0.06] pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-medium text-white", style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }, children: listTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: listItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#e1e0cc]/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-relaxed text-gray-400", children: item })
            ] }, item)) })
          ] })
        ] })
      )
    ] })
  ] });
}
function ResearchCaseContent({
  image,
  caseData
}) {
  caseData.id === "shein-data-operations";
  const isAIProduct = caseData.id === "ai-business-insight" || caseData.id === "ai-analytics-suite";
  const isAIUserFeedback = caseData.id === "ai-user-feedback";
  const isLifeFeature = caseData.isLifeFeature;
  if (isLifeFeature) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LifeFeatureContent, { image, caseData });
  }
  const hasFiveSteps = caseData.process.length === 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[200px] w-full md:h-[260px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-7 right-7 md:bottom-8 md:left-9 md:right-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium leading-tight text-white md:text-2xl lg:text-3xl", children: caseData.heroTitle ?? caseData.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/50", children: caseData.heroSubtitle ?? caseData.subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 px-7 pb-10 pt-8 md:px-9 md:pb-12 md:pt-10 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: caseData.questionLabel ?? "RESEARCH QUESTION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-300", children: caseData.insightQuestion ?? caseData.productQuestion ?? caseData.businessQuestion ?? caseData.intro })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: isAIProduct ? "PRODUCT FEATURES" : isAIUserFeedback ? "ANALYSIS DIMENSIONS" : "DATA & METHODS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 grid gap-px border border-white/[0.08] ${isAIUserFeedback ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-2"}`, children: (caseData.dataCards ?? caseData.stats).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1c1c1c] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.2em] text-gray-500", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-medium text-[#e1e0cc]", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-gray-400", children: s.text })
        ] }, `${s.label}-${i}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: "CORE FINDINGS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-3 text-lg font-medium text-white", children: caseData.findingsTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-px border border-white/[0.06]", children: caseData.results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#1c1c1c] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-light text-white/70", children: r.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-white", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[380px] text-xs leading-relaxed text-gray-400", children: r.text })
          ] })
        ] }) }, r.number)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: caseData.processEyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-3 text-lg font-medium text-white", children: caseData.processTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-6 hidden h-px bg-white/[0.08] md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid grid-cols-2 gap-8 ${hasFiveSteps ? "md:grid-cols-5" : "md:grid-cols-4"}`, children: caseData.process.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center border border-white/[0.14] bg-[#151515] text-[11px] text-white/80", children: f.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-xs font-medium tracking-[0.18em] text-white", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[180px] text-xs leading-relaxed text-gray-400", children: f.text })
          ] }, f.number)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/[0.06] pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.22em] text-gray-500", children: caseData.capabilitiesTitle.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-3 text-lg font-medium text-white", children: caseData.capabilitiesIntro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-6 md:grid-cols-2", children: caseData.capabilities.map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l border-white/[0.1] pl-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium tracking-[0.16em] text-[#e1e0cc]", children: sk.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-gray-400", children: sk.text })
        ] }, sk.title)) })
      ] })
    ] })
  ] });
}
function CaseImageZoomReveal({
  image,
  caseData,
  sourceRect,
  onClose
}) {
  const [showWindow, setShowWindow] = reactExports.useState(false);
  const [isExiting, setIsExiting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsExiting(true);
        setShowWindow(false);
      }
    };
    window.addEventListener("keydown", onKey);
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
  const initialRect = sourceRect ?? new DOMRect(
    typeof window !== "undefined" ? window.innerWidth / 2 - 50 : 0,
    typeof window !== "undefined" ? window.innerHeight / 2 - 50 : 0,
    100,
    100
  );
  const isCircle = initialRect.width < 100 && initialRect.height < 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { onExitComplete: onClose, children: !isExiting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[120] flex items-center justify-center overflow-hidden",
      initial: { backgroundColor: "rgba(0,0,0,0)" },
      animate: { backgroundColor: "rgba(0,0,0,0.72)" },
      exit: { backgroundColor: "rgba(0,0,0,0)" },
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      onClick: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "pointer-events-none fixed z-[121] overflow-hidden",
            initial: {
              top: initialRect.top,
              left: initialRect.left,
              width: initialRect.width,
              height: initialRect.height,
              borderRadius: isCircle ? "50%" : 0
            },
            animate: {
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0
            },
            exit: { opacity: 0 },
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-0 bg-black/70",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.8, delay: 0.2 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showWindow && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.97, y: 8 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            onClick: (e) => e.stopPropagation(),
            className: "relative z-[122] flex h-[80vh] w-[74vw] max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151515] shadow-2xl shadow-black/40 md:h-[82vh] md:w-[72vw]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResearchCaseWindow,
              {
                image,
                caseData,
                onClose: handleClose
              }
            )
          }
        ) })
      ]
    }
  ) });
}
function RecentWorksSection({
  categories,
  onItemClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-black py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[920px] px-6 md:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 md:mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-[11px] tracking-[0.28em] mb-3 uppercase", style: { color: "rgba(232,228,210,0.40)" }, children: "Index" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "text-[clamp(32px,5vw,52px)] font-light leading-[1.05] tracking-[-0.02em]",
          style: { fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif", color: "rgba(245,241,223,0.96)" },
          children: [
            "Work ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", style: { color: "rgba(245,241,223,0.80)" }, children: "Index" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[13px] md:text-[14px] tracking-[0.04em] max-w-md", style: { color: "rgba(232,228,210,0.62)" }, children: "关于金融、数据、AI 工具与生活片段的分类索引。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-16 md:gap-20", children: categories.map((category, catIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryGroup,
      {
        category,
        catIndex,
        onItemClick
      },
      category.id
    )) })
  ] }) });
}
function CategoryGroup({
  category,
  catIndex,
  onItemClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, delay: catIndex * 0.08, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 md:mb-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-4 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "uppercase",
                style: {
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 34px)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(232,228,210,0.86)"
                },
                children: category.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px", style: { background: "rgba(255,255,255,0.14)" } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "tracking-[0.04em]",
              style: { fontSize: "clamp(13px, 1.1vw, 16px)", color: "rgba(232,228,210,0.56)" },
              children: category.description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 md:gap-3", children: category.items.map((work, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkListItem,
          {
            work,
            index: itemIndex,
            onClick: onItemClick
          },
          work.id
        )) })
      ]
    }
  );
}
function WorkListItem({
  work,
  index,
  onClick
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  const thumbnailRef = reactExports.useRef(null);
  const itemRef = reactExports.useRef(null);
  const handleClick = () => {
    const rect = thumbnailRef.current?.getBoundingClientRect() ?? itemRef.current?.getBoundingClientRect() ?? null;
    if (onClick) {
      onClick(work, rect);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: itemRef,
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick: handleClick,
      className: "group relative cursor-pointer",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 md:gap-5 rounded-2xl md:rounded-3xl border px-4 py-3.5 md:px-6 md:py-4",
          style: {
            background: hovered ? "rgba(255,255,255,0.095)" : "rgba(255,255,255,0.055)",
            borderColor: hovered ? "rgba(232,228,210,0.30)" : "rgba(255,255,255,0.14)",
            boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)" : "0 2px 8px rgba(0,0,0,0.3)",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 300ms cubic-bezier(0.22,1,0.36,1)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: thumbnailRef,
                className: "relative flex-shrink-0 overflow-hidden rounded-full",
                style: {
                  width: 52,
                  height: 52,
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)"
                },
                children: work.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: work.image,
                    alt: work.title,
                    loading: "lazy",
                    className: "h-full w-full object-cover",
                    style: {
                      opacity: hovered ? 1 : 0.88,
                      filter: hovered ? "saturate(0.9) brightness(1.12) contrast(1.12)" : "saturate(0.7) brightness(1) contrast(1.08)",
                      transition: "all 300ms ease"
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full w-full flex items-center justify-center",
                    style: { background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-[0.12em]", style: { color: "rgba(232,228,210,0.28)" }, children: work.title.slice(0, 2) })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "text-[14px] md:text-[15px] tracking-[-0.01em]",
                  style: {
                    fontWeight: 600,
                    color: hovered ? "#FFF9E8" : "rgba(245,241,223,0.96)",
                    transition: "color 300ms ease"
                  },
                  children: work.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mt-0.5 text-[11px] md:text-[12px] leading-relaxed",
                  style: {
                    color: hovered ? "rgba(232,228,210,0.72)" : "rgba(232,228,210,0.66)",
                    transition: "color 300ms ease"
                  },
                  children: work.subtitle
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-4 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] md:text-[11px] tracking-[0.06em]",
                  style: {
                    color: hovered ? "rgba(232,228,210,0.68)" : "rgba(232,228,210,0.58)",
                    transition: "color 300ms ease"
                  },
                  children: work.meta
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center justify-center w-7 h-7 rounded-full",
                  style: {
                    background: hovered ? "#E8E4D2" : "rgba(255,255,255,0.085)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    transition: "all 300ms cubic-bezier(0.22,1,0.36,1)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px]",
                      style: {
                        color: hovered ? "#050505" : "rgba(232,228,210,0.86)",
                        transform: hovered ? "translate(1px, -1px)" : "translate(0, 0)",
                        transition: "all 300ms ease"
                      },
                      children: "↗"
                    }
                  )
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const CATEGORIES = ["All", "AI Tools", "Finance", "Data", "Life"];
function CaseFolioShelf({
  items,
  onOpenCase
}) {
  const containerRef = reactExports.useRef(null);
  const trackRef = reactExports.useRef(null);
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [dragStartX, setDragStartX] = reactExports.useState(0);
  const [scrollLeftStart, setScrollLeftStart] = reactExports.useState(0);
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const handleMouseMove = reactExports.useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX.set(x);
    },
    [mouseX]
  );
  reactExports.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.8;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollLeftStart(trackRef.current.scrollLeft);
  };
  const handleMouseMoveDrag = (e) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX;
    trackRef.current.scrollLeft = scrollLeftStart - dx;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const filteredItems = activeCategory === "All" ? items : items.filter((item) => item.category.includes(activeCategory));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-black overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      className: "relative min-h-[90vh] md:min-h-screen flex flex-col justify-center py-16 md:py-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] w-full px-6 md:px-10 mb-10 md:mb-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-[10px] md:text-[11px] tracking-[0.28em] mb-4 uppercase",
              style: { color: "rgba(232,228,210,0.40)" },
              children: "CASE FOLIOS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-[clamp(48px,10vw,120px)] font-light leading-[0.95] tracking-[-0.03em]",
              style: {
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                color: "rgba(245,241,223,0.96)"
              },
              children: "Work Archive"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-4 text-[13px] md:text-[15px] tracking-[0.04em] max-w-lg mx-auto",
              style: { color: "rgba(232,228,210,0.52)" },
              children: "Finance, data, AI tools, and life fragments in one visual index."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: trackRef,
            className: "relative w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing",
            style: {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            },
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMoveDrag,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 md:gap-5 px-[8vw] md:px-[15vw] py-12 md:py-16", style: { perspective: 1400 }, children: filteredItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FolioBook,
              {
                item,
                index,
                totalCount: filteredItems.length,
                hoveredIndex,
                mouseX: smoothMouseX,
                onHover: setHoveredIndex,
                onOpen: onOpenCase,
                isDragging
              },
              item.id
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 md:mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 md:gap-3 flex-wrap justify-center px-4", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveCategory(cat),
            className: "px-4 py-2 rounded-full text-[11px] md:text-[12px] tracking-[0.08em] transition-all duration-300",
            style: {
              border: "1px solid rgba(255,255,255,0.18)",
              background: activeCategory === cat ? "rgba(232,228,210,0.92)" : "transparent",
              color: activeCategory === cat ? "#050505" : "rgba(232,228,210,0.75)"
            },
            children: cat
          },
          cat
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 md:mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] tracking-[0.2em]",
            style: { color: "rgba(232,228,210,0.25)" },
            children: "DRAG OR SCROLL TO EXPLORE"
          }
        ) })
      ]
    }
  ) });
}
function FolioBook({
  item,
  index,
  totalCount,
  hoveredIndex,
  mouseX,
  onHover,
  onOpen,
  isDragging
}) {
  const bookRef = reactExports.useRef(null);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const isAnyHovered = hoveredIndex !== null;
  const isDimmed = isAnyHovered && hoveredIndex !== index;
  const parallaxX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [(index - totalCount / 2) * -8, (index - totalCount / 2) * 8]
  );
  const handleClick = () => {
    if (isDragging) return;
    const rect = bookRef.current?.getBoundingClientRect() ?? null;
    if (onOpen) {
      onOpen(item, rect);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };
  const baseRotateY = index % 2 === 0 ? -12 : 12;
  const rotateY = isHovered ? 0 : baseRotateY + (index - totalCount / 2) * 1.5;
  const scale = isHovered ? 1.08 : isDimmed ? 0.94 : 1;
  const translateY = isHovered ? -24 : 0;
  const translateZ = isHovered ? 60 : 0;
  const brightness = isHovered ? 1.1 : isDimmed ? 0.65 : 0.88;
  const opacity = isDimmed ? 0.55 : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: bookRef,
      className: "relative flex-shrink-0 cursor-pointer select-none",
      style: {
        width: "clamp(100px, 14vw, 170px)",
        height: "clamp(260px, 36vw, 400px)",
        perspective: 1200,
        x: parallaxX
      },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      animate: {
        rotateY,
        scale,
        y: translateY,
        z: translateZ,
        opacity
      },
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1]
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full h-full",
          style: {
            transformStyle: "preserve-3d"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-0 top-1 bottom-1 w-[6px] md:w-[8px]",
                style: {
                  background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  transform: "rotateY(-90deg) translateZ(3px)",
                  transformOrigin: "left center"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative w-full h-full rounded-sm overflow-hidden",
                style: {
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: isHovered ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,228,210,0.12)" : "0 16px 40px rgba(0,0,0,0.5)",
                  transition: "box-shadow 0.45s cubic-bezier(0.76,0,0.24,1)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.image,
                      alt: item.title,
                      className: "absolute inset-0 w-full h-full object-cover",
                      style: {
                        filter: `brightness(${brightness}) contrast(1.05) saturate(0.7)`,
                        transition: "filter 0.45s ease"
                      },
                      draggable: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0",
                      style: {
                        background: isHovered ? "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)" : "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)",
                        transition: "background 0.45s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col justify-between p-3 md:p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-[8px] md:text-[9px] tracking-[0.2em] uppercase",
                        style: {
                          color: isHovered ? "rgba(232,228,210,0.65)" : "rgba(232,228,210,0.40)",
                          transition: "color 0.4s ease"
                        },
                        children: item.category
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "text-[11px] md:text-[13px] font-medium leading-tight tracking-[-0.01em]",
                          style: {
                            color: isHovered ? "#FFF9E8" : "rgba(245,241,223,0.90)",
                            transition: "color 0.4s ease"
                          },
                          children: item.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mt-1 text-[8px] md:text-[9px] tracking-[0.04em]",
                          style: {
                            color: isHovered ? "rgba(232,228,210,0.60)" : "rgba(232,228,210,0.38)",
                            transition: "color 0.4s ease"
                          },
                          children: item.subtitle
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          className: "mt-3 flex items-center gap-1.5",
                          initial: { opacity: 0, y: 6 },
                          animate: { opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 },
                          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[8px] md:text-[9px] tracking-[0.14em]",
                                style: { color: "rgba(232,228,210,0.75)" },
                                children: "VIEW CASE"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(232,228,210,0.50)" }, children: "→" })
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
let lenisInstance = null;
function useSmoothScroll() {
  reactExports.useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf = 0;
    const tick = (time) => {
      lenisInstance.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);
}
function AiVideoGallery({
  videos,
  onVideoSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]", children: videos.map((video, index) => {
    const isLarge = index % 3 === 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: isLarge ? "md:row-span-2" : "md:row-span-1",
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: {
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1]
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoCard,
          {
            video,
            index,
            onSelect: () => onVideoSelect(video)
          }
        )
      },
      video.id
    );
  }) });
}
function VideoCard({
  video,
  index,
  onSelect
}) {
  const videoRef = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  const handleMouseEnter = reactExports.useCallback(() => {
    setHovered(true);
    videoRef.current?.play().catch(() => {
    });
  }, []);
  const handleMouseLeave = reactExports.useCallback(() => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "group relative cursor-pointer overflow-hidden rounded-lg h-full",
      style: {
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)"
      },
      onClick: onSelect,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: video.videoSrc,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "metadata",
            className: "absolute inset-0 w-full h-full object-cover",
            style: {
              opacity: hovered ? 1 : 0,
              transition: "opacity 600ms ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex flex-col justify-end",
            style: {
              background: hovered ? "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)" : "linear-gradient(160deg, rgba(28,26,22,0.97) 0%, rgba(18,16,14,0.99) 100%)",
              transition: "background 600ms ease"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 md:px-7 pb-5 md:pb-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "block mb-3 text-[10px] md:text-[11px] tracking-[0.18em] uppercase",
                  style: {
                    color: "rgba(232,228,210,0.30)",
                    fontFamily: "'Inter', system-ui, sans-serif"
                  },
                  children: String(index + 1).padStart(2, "0")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "text-[22px] md:text-[28px] font-light leading-[1.1] mb-2",
                  style: {
                    fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    color: "rgba(245,241,223,0.95)",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase"
                  },
                  children: video.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] md:text-[11px] tracking-[0.12em] uppercase",
                  style: {
                    color: "rgba(232,228,210,0.45)",
                    fontFamily: "'Inter', system-ui, sans-serif"
                  },
                  children: video.subtitle
                }
              )
            ] })
          }
        )
      ] })
    }
  );
}
const aiAnalyticsModules = [
  {
    title: "Module 01",
    subtitle: "AI Feedback Analysis",
    caseData: aiUserFeedbackCase,
    image: "/assets/ai-user-feedback.png"
  },
  {
    title: "Module 02",
    subtitle: "Business Analysis Assistant",
    caseData: aiBusinessInsightCase,
    image: "/assets/ai-business-insight.png"
  }
];
const aiAnalyticsReflection = "我如何把 AI 应用于真实的数据分析流程，而不仅仅是聊天。从用户反馈分类到经营指标解读，AI 帮助我更快地理解数据背后的含义，并形成可行动的判断。";
const aiVideoWorks = [
  {
    id: "video-03",
    title: "Downpour",
    subtitle: "Survival Thriller",
    videoSrc: "/ai-videos/Video03.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-03.jpg",
    concept: "Concept for Video 03 — to be updated",
    creativeDirection: "Creative direction for Video 03 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 03 — to be updated",
    duration: "0:15",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "暴雨中的每一步，都是生存的选择。",
    descriptionEn: "Every step through the storm is a fight to survive."
  },
  {
    id: "video-02",
    title: "Veil",
    subtitle: "Middle Eastern Fantasy",
    videoSrc: "/ai-videos/Video02.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-02.jpg",
    concept: "Concept for Video 02 — to be updated",
    creativeDirection: "Creative direction for Video 02 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 02 — to be updated",
    duration: "0:30",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "神秘舞步在古老文明中缓缓展开。",
    descriptionEn: "A ceremonial dance unfolds beneath an ancient desert sky."
  },
  {
    id: "video-09",
    title: "Reckoning",
    subtitle: "Cinematic Character Drama",
    videoSrc: "/ai-videos/Video09.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-09.jpg",
    concept: "Concept for Video 09 — to be updated",
    creativeDirection: "Creative direction for Video 09 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 09 — to be updated",
    duration: "0:10",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "所有战斗结束之后，只剩下自己。",
    descriptionEn: "When the battle ends, only the self remains."
  },
  {
    id: "video-07",
    title: "Last Echo",
    subtitle: "Minimalist Western",
    videoSrc: "/ai-videos/Video07.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-07.jpg",
    concept: "Concept for Video 07 — to be updated",
    creativeDirection: "Creative direction for Video 07 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 07 — to be updated",
    duration: "0:05",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "镜头从未移动，命运却已改变。",
    descriptionEn: "The camera never moves. Destiny does."
  },
  {
    id: "video-08",
    title: "Frontier",
    subtitle: "Epic Western",
    videoSrc: "/ai-videos/Video08.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-08.jpg",
    concept: "Concept for Video 08 — to be updated",
    creativeDirection: "Creative direction for Video 08 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 08 — to be updated",
    duration: "0:05",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "穿越雪原，奔赴未知的边境。",
    descriptionEn: "Riding toward an untamed frontier."
  },
  {
    id: "video-04",
    title: "Mist Realm",
    subtitle: "Chinese Ink Landscape",
    videoSrc: "/ai-videos/Video04.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-04.jpg",
    concept: "Concept for Video 04 — to be updated",
    creativeDirection: "Creative direction for Video 04 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 04 — to be updated",
    duration: "0:15",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "以中国传统水墨美学为灵感，通过缓慢推进的镜头营造诗意意境。",
    descriptionEn: "Inspired by traditional Chinese ink aesthetics, using a slow cinematic reveal to create a poetic atmosphere."
  },
  {
    id: "video-01",
    title: "Synthetic Soul",
    subtitle: "Cyberpunk",
    videoSrc: "/ai-videos/Video01.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-01.jpg",
    concept: "Concept for Video 01 — to be updated",
    creativeDirection: "Creative direction for Video 01 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 01 — to be updated",
    duration: "0:05",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "人与机器的界限，在沉默中逐渐模糊。",
    descriptionEn: "The line between human and machine fades into silence."
  },
  {
    id: "video-05",
    title: "High Noon",
    subtitle: "Western",
    videoSrc: "/ai-videos/Video05.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-05.jpg",
    concept: "Concept for Video 05 — to be updated",
    creativeDirection: "Creative direction for Video 05 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 05 — to be updated",
    duration: "0:05",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "黄昏之前，只剩最后一次拔枪。",
    descriptionEn: "Before sunset, only one draw remains."
  },
  {
    id: "video-06",
    title: "Embers",
    subtitle: "Western Character Study",
    videoSrc: "/ai-videos/Video06.mp4",
    thumbnailSrc: "/assets/ai-video-thumb-06.jpg",
    concept: "Concept for Video 06 — to be updated",
    creativeDirection: "Creative direction for Video 06 — to be updated",
    workflow: ["Idea", "Prompt", "AI Generation", "Editing", "Final Output"],
    reflection: "Reflection for Video 06 — to be updated",
    duration: "0:05",
    tools: "Seedance 2.0",
    format: "MP4/1080P",
    descriptionZh: "一支香烟，一段无人知晓的故事。",
    descriptionEn: "One cigarette. One untold story."
  }
];
const aiVideoReflection = "AI 视频不仅提高了内容生产效率，也让我重新思考了叙事、节奏、镜头语言和视觉表达。从概念到成品，每个作品都是一次关于视觉语言的实验。";
function AiVideoStudioGalleryOverlay({
  onClose,
  onVideoSelect
}) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[120] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
      style: { background: "#0a0a0a" },
      "data-lenis-prevent": true,
      "data-lenis-prevent-wheel": true,
      "data-lenis-prevent-touch": true,
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mx-auto max-w-[920px] px-6 md:px-10 py-16 md:py-24 min-h-full",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "mb-16 md:mb-24",
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "label-xs block mb-4",
                      style: { color: "rgba(232,228,210,0.40)" },
                      children: "AI Studio / Video"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "display-hero mb-6",
                      style: {
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                        color: "rgba(245,241,223,0.96)"
                      },
                      children: "AI Video Studio"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[14px] md:text-[16px] max-w-lg",
                      style: {
                        color: "rgba(232,228,210,0.62)",
                        letterSpacing: "0.04em",
                        lineHeight: 1.7
                      },
                      children: "Turning ideas into moving visuals. 从概念到成品，每个视频作品都是一次关于视觉语言的实验。"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "mb-16 md:mb-24",
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "label-xs block mb-8",
                      style: { color: "rgba(232,228,210,0.40)" },
                      children: "Works"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AiVideoGallery,
                    {
                      videos: aiVideoWorks,
                      onVideoSelect
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "mb-16 md:mb-24",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "label-xs block mb-4",
                      style: { color: "rgba(232,228,210,0.40)" },
                      children: "Reflection"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[15px] md:text-[17px] leading-relaxed max-w-[680px]",
                      style: { color: "rgba(245,241,223,0.80)" },
                      children: aiVideoReflection
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "flex justify-center pb-6",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.4 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "label-xs px-8 py-4 rounded-full cursor-pointer transition-colors",
                    style: {
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.055)",
                      color: "rgba(245,241,223,0.96)"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#E8E4D2";
                      e.currentTarget.style.color = "#050505";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.055)";
                      e.currentTarget.style.color = "rgba(245,241,223,0.96)";
                    },
                    children: "Close"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "pb-8 label-xs",
                style: { color: "rgba(232,228,210,0.40)" },
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.5 },
                children: [
                  "All videos created with Seedance 2.0 · Original works by Zhu Yujing",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "全部视频由 Seedance 2.0 制作 · 原创作品"
                ]
              }
            )
          ]
        }
      )
    }
  ) });
}
function AiVideoStudioDetail({
  videoWork,
  videoIndex,
  onClose
}) {
  reactExports.useEffect(() => {
    if (!videoWork) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [videoWork, onClose]);
  if (!videoWork) return null;
  const num = String(videoIndex + 1).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[130] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
      style: { background: "#0a0a0a" },
      "data-lenis-prevent": true,
      "data-lenis-prevent-wheel": true,
      "data-lenis-prevent-touch": true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "min-h-screen flex flex-col",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "pt-16 md:pt-24 pb-6 md:pb-8 px-6 md:px-10 mx-auto w-full max-w-[1100px]",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block mb-4 text-[10px] md:text-[11px] tracking-[0.18em] uppercase",
                      style: {
                        color: "rgba(232,228,210,0.30)",
                        fontFamily: "'Inter', system-ui, sans-serif"
                      },
                      children: num
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "text-[32px] md:text-[52px] font-light leading-[1.05] mb-3",
                      style: {
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                        color: "rgba(245,241,223,0.96)",
                        letterSpacing: "-0.025em",
                        textTransform: "uppercase"
                      },
                      children: videoWork.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[11px] md:text-[12px] tracking-[0.14em] uppercase",
                      style: {
                        color: "rgba(232,228,210,0.45)",
                        fontFamily: "'Inter', system-ui, sans-serif"
                      },
                      children: videoWork.subtitle
                    }
                  )
                ]
              }
            ),
            (videoWork.descriptionZh || videoWork.descriptionEn) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "px-6 md:px-10 mx-auto w-full max-w-[1100px] pb-8 md:pb-10",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                children: [
                  videoWork.descriptionZh && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[14px] md:text-[16px] leading-relaxed mb-2",
                      style: {
                        color: "rgba(245,241,223,0.72)",
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                        letterSpacing: "0.01em"
                      },
                      children: videoWork.descriptionZh
                    }
                  ),
                  videoWork.descriptionEn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[12px] md:text-[13px] leading-relaxed",
                      style: {
                        color: "rgba(232,228,210,0.40)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                        letterSpacing: "0.02em",
                        fontStyle: "italic"
                      },
                      children: videoWork.descriptionEn
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "flex-1 w-full px-6 md:px-10 mx-auto max-w-[1100px]",
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full aspect-video overflow-hidden rounded-sm",
                    style: {
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#111"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "video",
                      {
                        src: videoWork.videoSrc,
                        controls: true,
                        autoPlay: true,
                        loop: true,
                        muted: true,
                        playsInline: true,
                        preload: "metadata",
                        className: "w-full h-full object-contain"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "w-full px-6 md:px-10 mx-auto max-w-[1100px] pt-8 md:pt-12 pb-12 md:pb-20",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "grid grid-cols-4 gap-6 md:gap-10",
                    style: {
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "20px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "Duration", value: videoWork.duration ?? "0:05" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "Tools", value: videoWork.tools ?? "Seedance 2.0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "Format", value: videoWork.format ?? "MP4/1080P" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "Year", value: "2026" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "w-full px-6 md:px-10 mx-auto max-w-[1100px] pb-10 md:pb-14",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.4, delay: 0.45 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: onClose,
                    className: "label-xs cursor-pointer transition-colors group flex items-center gap-2",
                    style: { color: "rgba(232,228,210,0.40)" },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = "rgba(245,241,223,0.90)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = "rgba(232,228,210,0.40)";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:-translate-x-1 transition-transform", children: "←" }),
                      "Back to AI Video Studio"
                    ]
                  }
                )
              }
            )
          ]
        }
      )
    }
  ) });
}
function InfoItem({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "block mb-1.5 text-[9px] md:text-[10px] tracking-[0.16em] uppercase",
        style: {
          color: "rgba(232,228,210,0.28)",
          fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-[12px] md:text-[13px]",
        style: {
          color: "rgba(245,241,223,0.70)",
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: "0.02em"
        },
        children: value
      }
    )
  ] });
}
const aiAnalyticsImg$1 = "/ai-analytics.png";
function AiStudioOverlays({
  state,
  onClose
}) {
  if (!state) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
    state.type === "analytics-suite" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiAnalyticsSuiteOverlay,
      {
        sourceRect: state.sourceRect,
        onClose
      }
    ),
    state.type === "video-studio" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiVideoStudioOverlay,
      {
        sourceRect: state.sourceRect,
        onClose
      }
    )
  ] });
}
function AiAnalyticsSuiteOverlay({
  sourceRect,
  onClose
}) {
  const suiteCase = {
    id: "ai-analytics-suite",
    title: "AI Analytics Suite",
    subtitle: "Two AI-powered analysis tools for data insight",
    tags: "AI / DATA ANALYSIS / USER INSIGHT / PRODUCT THINKING",
    intro: aiAnalyticsReflection,
    stats: [],
    results: [
      {
        number: "01",
        title: aiAnalyticsModules[0].subtitle,
        text: aiAnalyticsModules[0].caseData.intro
      },
      {
        number: "02",
        title: aiAnalyticsModules[1].subtitle,
        text: aiAnalyticsModules[1].caseData.intro
      }
    ],
    process: [
      {
        number: "01",
        title: "IDENTIFY",
        text: "识别数据中的关键问题和分析需求"
      },
      {
        number: "02",
        title: "AI-ASSISTED",
        text: "使用 AI 工具辅助分类、归纳和解读"
      },
      {
        number: "03",
        title: "EXTRACT",
        text: "提炼洞察、趋势和可行动的判断"
      },
      {
        number: "04",
        title: "DELIVER",
        text: "输出结构化的分析结论和优化建议"
      }
    ],
    capabilitiesTitle: "What I Learned",
    capabilitiesIntro: aiAnalyticsReflection,
    capabilities: [],
    findingsTitle: "两个 AI Analytics 模块。",
    processEyebrow: "APPROACH",
    processTitle: "How I use AI for data analysis.",
    footerLabel: "YUJING ZHU / AI Analytics Suite",
    hoverHint: "",
    projectLink: "https://mayanaogui.netlify.app/upload",
    projectLinkLabel: "打开 AI 经营数据分析助手 Demo",
    ariaLabel: "AI Analytics Suite"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CaseImageZoomReveal,
    {
      image: aiAnalyticsImg$1,
      caseData: suiteCase,
      sourceRect,
      onClose
    }
  );
}
function AiVideoStudioOverlay({
  sourceRect,
  onClose
}) {
  const [selectedVideo, setSelectedVideo] = reactExports.useState(null);
  const selectedIndex = selectedVideo ? aiVideoWorks.findIndex((v) => v.id === selectedVideo.id) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !selectedVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiVideoStudioGalleryOverlay,
      {
        sourceRect,
        onClose,
        onVideoSelect: setSelectedVideo
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiVideoStudioDetail,
      {
        videoWork: selectedVideo,
        videoIndex: selectedIndex,
        onClose: () => setSelectedVideo(null)
      }
    ) })
  ] });
}
const digitalFinanceImg = "/digital-finance.png";
const aiAnalyticsImg = "/ai-analytics.png";
const aiVideoImg = "/ai-video.png";
const sheinDataImg = "/shein-data.png";
const ecommerceFunnelImg = "/ecommerce-funnel.png";
const financialTrainingImg = "/financial-training.png";
const tennisPlayImg = "/tennis-new.jpg";
const thoughts = [{
  tag: "关于数字",
  line: "数字不是答案，它只是问题被看见的一种方式。"
}, {
  tag: "关于分析",
  line: "好的数据分析，应该让人更快理解下一步该做什么。"
}, {
  tag: "关于 AI",
  line: "AI 最吸引我的，不只是生成内容，而是把脑海中的电影画面真正带到现实。"
}, {
  tag: "关于好奇心",
  line: "好奇心不是一种性格标签，而是一种每天都可以练习的小习惯。"
}];
const workCategories = [{
  id: "ai-studio",
  label: "AI Tools — 01",
  description: "探索 AI 如何帮助分析数据、提升效率，以及创造更具表达力的数字内容。",
  items: [{
    id: "as2",
    title: "AI Video Studio",
    subtitle: "通过 AI 视频探索新的表达方式，从概念到动态叙事的视觉实验。",
    meta: "AI / Video · 2026",
    image: aiVideoImg,
    revealCaseId: "__ai_video_studio__"
  }, {
    id: "as1",
    title: "AI Analytics Suite",
    subtitle: "AI 辅助的用户反馈分析与经营数据洞察工具集。",
    meta: "AI / Analytics · 2026",
    image: aiAnalyticsImg,
    revealCaseId: "__ai_analytics_suite__"
  }]
}, {
  id: "finance",
  label: "Finance — 02",
  description: "关于金融工程、实证研究、价值判断和长期思考。",
  items: [{
    id: "f1",
    title: "数字金融与实体经济研究",
    subtitle: "基于省级面板数据的数字金融研究。",
    meta: "Finance Research · 2025",
    image: digitalFinanceImg,
    revealCaseId: "digital-finance-research"
  }, {
    id: "f2",
    title: "金融工程专业训练",
    subtitle: "围绕估值、指标体系、公司金融与价值判断的课程训练。",
    meta: "Finance Training · 2025",
    image: financialTrainingImg,
    revealCaseId: "financial-engineering-training"
  }]
}, {
  id: "data",
  label: "Data — 03",
  description: "关于业务数据、用户行为、指标分析和可行动判断。",
  items: [{
    id: "d1",
    title: "SHEIN 海外平台数据运营分析",
    subtitle: "围绕销售、库存、SKU 和用户反馈的跨境电商数据分析。",
    meta: "Data Operations · 2025",
    image: sheinDataImg,
    revealCaseId: "shein-data-operations"
  }, {
    id: "d2",
    title: "电商用户转化漏斗分析",
    subtitle: "基于用户行为路径拆解访问、点击和转化流失节点。",
    meta: "Funnel Analysis · 2026",
    image: ecommerceFunnelImg,
    revealCaseId: "ecommerce-funnel-analysis"
  }]
}, {
  id: "life",
  label: "Life — 04",
  description: "关于网球、跳舞、旅行、城市观察和日常灵感。",
  items: [{
    id: "l1",
    title: "Tennis & Dance",
    subtitle: "网球让我保持专注和反应，跳舞让我感受节奏、表达和身体里的能量。",
    meta: "Movement · Ongoing",
    image: tennisPlayImg,
    revealCaseId: "tennis-dance"
  }, {
    id: "l2",
    title: "Travel & Daily Fragments",
    subtitle: "旅行、散步、城市观察和生活片段，记录我在工作之外如何感受世界。",
    meta: "Life · Ongoing",
    image: mountainPortraitImg,
    revealCaseId: "travel-daily"
  }]
}];
const caseMap = {
  "digital-finance-research": digitalFinanceResearchCase,
  "financial-engineering-training": financialTrainingCase,
  "shein-data-operations": sheinDataOperationsCase,
  "ai-business-insight": aiBusinessInsightCase,
  "ecommerce-funnel-analysis": ecommerceFunnelCase,
  "ai-user-feedback": aiUserFeedbackCase,
  "tennis-dance": tennisDanceCase,
  "travel-daily": travelDailyCase
};
const folioItems = [{
  id: "ai-video-studio",
  title: "AI Video Studio",
  category: "AI Tools — 01",
  subtitle: "AI / Video / Motion Design",
  image: aiVideoImg,
  caseId: "__ai_video_studio__"
}, {
  id: "ai-analytics-suite",
  title: "AI Analytics Suite",
  category: "AI Tools — 01",
  subtitle: "AI / Data Analysis / User Insight",
  image: aiAnalyticsImg,
  caseId: "__ai_analytics_suite__"
}, {
  id: "digital-finance",
  title: "数字金融与实体经济研究",
  category: "Finance — 02",
  subtitle: "Panel Data / Empirical Research",
  image: digitalFinanceImg,
  caseId: "digital-finance-research"
}, {
  id: "financial-training",
  title: "金融工程专业训练",
  category: "Finance — 02",
  subtitle: "Financial Engineering / Valuation / Quant Thinking",
  image: financialTrainingImg,
  caseId: "financial-engineering-training"
}, {
  id: "shein-data",
  title: "SHEIN 海外平台数据运营分析",
  category: "Data — 03",
  subtitle: "SKU / Inventory / Data Operations",
  image: sheinDataImg,
  caseId: "shein-data-operations"
}, {
  id: "ecommerce-funnel",
  title: "电商用户转化漏斗分析",
  category: "Data — 03",
  subtitle: "Funnel / User Behavior / Conversion",
  image: ecommerceFunnelImg,
  caseId: "ecommerce-funnel-analysis"
}, {
  id: "tennis-dance",
  title: "Tennis & Dance",
  category: "Life — 04",
  subtitle: "Movement / Rhythm / Expression",
  image: tennisPlayImg,
  caseId: "tennis-dance"
}, {
  id: "travel-daily",
  title: "Travel & Daily Fragments",
  category: "Life — 04",
  subtitle: "Travel / Learning / Photography / Daily Life",
  image: mountainPortraitImg,
  caseId: "travel-daily"
}];
function Home() {
  useSmoothScroll();
  const [zoomReveal, setZoomReveal] = reactExports.useState(null);
  const [aiStudioOverlay, setAiStudioOverlay] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Preloader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CursorFollower, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 inset-x-0 z-50 mix-blend-difference text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6 px-6 md:px-10 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#home", className: "label-xs font-medium", children: "朱雨婧 / Yujing Zhu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex max-w-[72vw] flex-wrap items-center justify-end gap-3 md:gap-6 label-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#home", className: "hover:opacity-60 transition-opacity", children: "首页" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#about", className: "hover:opacity-60 transition-opacity", children: "关于" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#works", className: "hover:opacity-60 transition-opacity", children: "作品" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#thoughts", className: "hover:opacity-60 transition-opacity", children: "想法" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "hover:opacity-60 transition-opacity", children: "联系" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollRockHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "relative bg-black text-white px-6 md:px-10 pt-32 pb-24 md:pt-48 md:pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label-xs text-white/50 mb-6 block text-center", children: "— About —" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display-hero max-w-5xl mx-auto text-center", children: [
        "AI、金融、数据，",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "和生活里那些",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "值得停下来的小事"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 max-w-2xl mx-auto text-center text-white/60 text-base md:text-lg leading-relaxed", children: "我是一名金融工程背景的学生，同时专注于 AI 视频创作与生成式 AI 应用。我热衷于利用 AI 构建电影级场景、环境动画和视觉叙事，探索技术与艺术融合的更多可能。除了创作，我也持续关注数据、产品与 AI 工具，希望用技术把想法变成具有感染力的作品。" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "works", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecentWorksSection, { categories: workCategories, onItemClick: (work, sourceRect) => {
      if (work.revealCaseId === "__ai_analytics_suite__") {
        setAiStudioOverlay({
          type: "analytics-suite",
          sourceRect
        });
      } else if (work.revealCaseId === "__ai_video_studio__") {
        setAiStudioOverlay({
          type: "video-studio",
          sourceRect
        });
      } else if (work.revealCaseId) {
        const matched = caseMap[work.revealCaseId];
        if (matched) {
          setZoomReveal({
            caseData: matched,
            image: work.image,
            sourceRect
          });
        }
      }
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseFolioShelf, { items: folioItems, onOpenCase: (item, sourceRect) => {
      if (item.caseId === "__ai_analytics_suite__") {
        setAiStudioOverlay({
          type: "analytics-suite",
          sourceRect
        });
      } else if (item.caseId === "__ai_video_studio__") {
        setAiStudioOverlay({
          type: "video-studio",
          sourceRect
        });
      } else if (item.caseId) {
        const matched = caseMap[item.caseId];
        if (matched) {
          setZoomReveal({
            caseData: matched,
            image: item.image,
            sourceRect
          });
        }
      } else if (item.scrollTarget) {
        const el = document.querySelector(item.scrollTarget);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "thoughts", className: "px-6 md:px-10 py-24 md:py-36 border-t border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-8", children: "Thoughts — Notes to Self" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display-lg max-w-5xl mb-10", children: [
        "我一直反复思考的",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50", children: "一些小想法。" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.18, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mb-20 space-y-5 text-white/60 text-base md:text-lg leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "我想做的事，是把复杂信息变成可读、可用、可感的东西。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "有时候它是一张看板，有时候是一段分析，也可能只是一个更清楚的问题。 我喜欢在金融、数据、AI 工具和日常生活之间来回走动，慢慢找到那些原本被忽略的联系。" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10", children: thoughts.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-4", children: t.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl md:text-3xl leading-snug", children: [
          '"',
          t.line,
          '"'
        ] })
      ] }) }, t.tag)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-white/10 overflow-hidden py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track flex gap-16 whitespace-nowrap", children: [...Array(2)].map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-16", children: ["分析。", "观察。", "提问。", "记录。"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "display-lg", children: [
      t,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50", children: "✶" })
    ] }, i)) }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RotatingRock, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "px-6 md:px-10 py-24 md:py-40 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-8", children: "Contact — 01" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display-hero", children: "打个招呼。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-white/60 text-base md:text-lg leading-relaxed", children: "如果你想聊 AI 视频、生成式 AI、影视创作、数据、金融，或是一个有趣的创意，欢迎联系我。希望用技术、影像与美学，把想法变成作品，也期待与你一起创造新的故事。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-3", children: "地点" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: "杭州" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-3", children: "邮箱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:zhuyujing666666@163.com", className: "text-lg hover:opacity-60", children: "zhuyujing666666@163.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label-xs text-white/50 mb-3", children: "当前状态" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm leading-relaxed max-w-sm", children: "学习金融工程，专注于 AI 视频创作、电影级场景构建与生成式 AI 应用，也持续探索 AI 工具开发，并记录生活中的灵感。" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-white/10 px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4 label-xs text-white/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " 朱雨婧 / Yujing Zhu"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "金融、数据，以及生活里的小事。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: zoomReveal && /* @__PURE__ */ jsxRuntimeExports.jsx(CaseImageZoomReveal, { image: zoomReveal.image, caseData: zoomReveal.caseData, sourceRect: zoomReveal.sourceRect, onClose: () => setZoomReveal(null) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AiStudioOverlays, { state: aiStudioOverlay, onClose: () => setAiStudioOverlay(null) })
  ] });
}
export {
  Home as component
};
