// AI Studio 板块数据管理
// 合并两个现有 AI case，新增 AI Video Studio 数据

import {
  aiBusinessInsightCase,
  aiUserFeedbackCase,
} from "@/components/ResearchImageReveal";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type VideoWork = {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  thumbnailSrc: string;
  concept: string;
  creativeDirection: string;
  workflow: string[];
  reflection: string;
  duration?: string;
  tools?: string;
  format?: string;
  descriptionZh?: string;
  descriptionEn?: string;
};

export type AiAnalyticsModule = {
  title: string;
  subtitle: string;
  caseData: (typeof aiBusinessInsightCase | typeof aiUserFeedbackCase);
  image: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// AI Analytics Suite 数据（合并两个现有 case）
// ─────────────────────────────────────────────────────────────────────────────

export const aiAnalyticsModules: AiAnalyticsModule[] = [
  {
    title: "Module 01",
    subtitle: "AI Feedback Analysis",
    caseData: aiUserFeedbackCase,
    image: "/assets/ai-user-feedback.png",
  },
  {
    title: "Module 02",
    subtitle: "Business Analysis Assistant",
    caseData: aiBusinessInsightCase,
    image: "/assets/ai-business-insight.png",
  },
];

export const aiAnalyticsReflection =
  "我如何把 AI 应用于真实的数据分析流程，而不仅仅是聊天。从用户反馈分类到经营指标解读，AI 帮助我更快地理解数据背后的含义，并形成可行动的判断。";

// ─────────────────────────────────────────────────────────────────────────────
// AI Video Works 数据（6 个占位 — 可随时替换为真实视频）
// 新增视频：只需往 aiVideoWorks 数组末尾添加新对象，无需修改页面布局
// ─────────────────────────────────────────────────────────────────────────────

export const aiVideoWorks: VideoWork[] = [
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
    descriptionEn: "Every step through the storm is a fight to survive.",
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
    descriptionEn: "A ceremonial dance unfolds beneath an ancient desert sky.",
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
    descriptionEn: "When the battle ends, only the self remains.",
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
    descriptionEn: "The camera never moves. Destiny does.",
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
    descriptionEn: "Riding toward an untamed frontier.",
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
    descriptionEn: "Inspired by traditional Chinese ink aesthetics, using a slow cinematic reveal to create a poetic atmosphere.",
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
    descriptionEn: "The line between human and machine fades into silence.",
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
    descriptionEn: "Before sunset, only one draw remains.",
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
    descriptionEn: "One cigarette. One untold story.",
  },
];

export const aiVideoReflection =
  "AI 视频不仅提高了内容生产效率，也让我重新思考了叙事、节奏、镜头语言和视觉表达。从概念到成品，每个作品都是一次关于视觉语言的实验。";
