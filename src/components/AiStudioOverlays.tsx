"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  CaseImageZoomReveal,
} from "./ResearchImageReveal";
import { AiVideoStudioGalleryOverlay } from "./AiVideoStudioGalleryOverlay";
import { AiVideoStudioDetail } from "./AiVideoStudioDetail";
import {
  aiAnalyticsModules,
  aiAnalyticsReflection,
  aiVideoWorks,
  type VideoWork,
} from "@/data/ai-studio";

const aiAnalyticsImg = "/ai-analytics.png";

// ─────────────────────────────────────────────────────────────────────────────
// AI Studio Overlay State 类型
// ─────────────────────────────────────────────────────────────────────────────

export type AiStudioOverlayState =
  | { type: "analytics-suite"; sourceRect: DOMRect | null }
  | { type: "video-studio"; sourceRect: DOMRect | null }
  | null;

// ─────────────────────────────────────────────────────────────────────────────
// AiStudioOverlays — AI Studio 的两个覆盖层容器
// 管理 analytics-suite 和 video-studio 两种覆盖层状态
// ─────────────────────────────────────────────────────────────────────────────

export function AiStudioOverlays({
  state,
  onClose,
}: {
  state: AiStudioOverlayState;
  onClose: () => void;
}) {
  if (!state) return null;

  return (
    <AnimatePresence>
      {state.type === "analytics-suite" && (
        <AiAnalyticsSuiteOverlay
          sourceRect={state.sourceRect}
          onClose={onClose}
        />
      )}
      {state.type === "video-studio" && (
        <AiVideoStudioOverlay
          sourceRect={state.sourceRect}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Analytics Suite 覆盖层
// 使用 CaseImageZoomReveal 展示两个 AI Analytics 模块的合成 case
// ─────────────────────────────────────────────────────────────────────────────

function AiAnalyticsSuiteOverlay({
  sourceRect,
  onClose,
}: {
  sourceRect: DOMRect | null;
  onClose: () => void;
}) {
  // 创建一个 "AI Analytics Suite" 的合成 case
  const suiteCase = {
    id: "ai-analytics-suite",
    title: "AI Analytics Suite",
    subtitle: "Two AI-powered analysis tools for data insight",
    tags: "AI / DATA ANALYSIS / USER INSIGHT / PRODUCT THINKING",
    intro: aiAnalyticsReflection,
    stats: [] as { label: string; value: string; text: string }[],
    results: [
      {
        number: "01",
        title: aiAnalyticsModules[0].subtitle,
        text: aiAnalyticsModules[0].caseData.intro,
      },
      {
        number: "02",
        title: aiAnalyticsModules[1].subtitle,
        text: aiAnalyticsModules[1].caseData.intro,
      },
    ],
    process: [
      {
        number: "01",
        title: "IDENTIFY",
        text: "识别数据中的关键问题和分析需求",
      },
      {
        number: "02",
        title: "AI-ASSISTED",
        text: "使用 AI 工具辅助分类、归纳和解读",
      },
      {
        number: "03",
        title: "EXTRACT",
        text: "提炼洞察、趋势和可行动的判断",
      },
      {
        number: "04",
        title: "DELIVER",
        text: "输出结构化的分析结论和优化建议",
      },
    ],
    capabilitiesTitle: "What I Learned",
    capabilitiesIntro: aiAnalyticsReflection,
    capabilities: [] as { title: string; text: string }[],
    findingsTitle: "两个 AI Analytics 模块。",
    processEyebrow: "APPROACH",
    processTitle: "How I use AI for data analysis.",
    footerLabel: "YUJING ZHU / AI Analytics Suite",
    hoverHint: "",
    projectLink: "https://mayanaogui.netlify.app/upload",
    projectLinkLabel: "打开 AI 经营数据分析助手 Demo",
    ariaLabel: "AI Analytics Suite",
  };

  return (
    <CaseImageZoomReveal
      image={aiAnalyticsImg}
      caseData={suiteCase}
      sourceRect={sourceRect}
      onClose={onClose}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Video Studio 覆盖层
// 包含 Gallery（AiVideoStudioGalleryOverlay）和 Video Detail（AiVideoStudioDetail）
// ─────────────────────────────────────────────────────────────────────────────

function AiVideoStudioOverlay({
  sourceRect,
  onClose,
}: {
  sourceRect: DOMRect | null;
  onClose: () => void;
}) {
  const [selectedVideo, setSelectedVideo] = useState<VideoWork | null>(null);
  const selectedIndex = selectedVideo ? aiVideoWorks.findIndex((v) => v.id === selectedVideo.id) : 0;

  return (
    <>
      {!selectedVideo && (
        <AnimatePresence>
          <AiVideoStudioGalleryOverlay
            sourceRect={sourceRect}
            onClose={onClose}
            onVideoSelect={setSelectedVideo}
          />
        </AnimatePresence>
      )}
      <AnimatePresence>
        {selectedVideo && (
          <AiVideoStudioDetail
            videoWork={selectedVideo}
            videoIndex={selectedIndex}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
