"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { AiVideoGallery } from "./AiVideoGallery";
import { aiVideoWorks, aiVideoReflection, type VideoWork } from "@/data/ai-studio";

// ─────────────────────────────────────────────────────────────────────────────
// AI Video Studio Gallery Overlay
// 全屏黑底覆盖层，包含 Hero + Video Gallery + Reflection
// ─────────────────────────────────────────────────────────────────────────────

export function AiVideoStudioGalleryOverlay({
  onClose,
  onVideoSelect,
}: {
  sourceRect: DOMRect | null;
  onClose: () => void;
  onVideoSelect: (video: VideoWork) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        style={{ background: "#0a0a0a" }}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onClick={onClose}
      >
        <div
          className="mx-auto max-w-[920px] px-6 md:px-10 py-16 md:py-24 min-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── Hero 区 ─── */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="label-xs block mb-4"
              style={{ color: "rgba(232,228,210,0.40)" }}
            >
              AI Studio / Video
            </span>
            <h1
              className="display-hero mb-6"
              style={{
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                color: "rgba(245,241,223,0.96)",
              }}
            >
              AI Video Studio
            </h1>
            <p
              className="text-[14px] md:text-[16px] max-w-lg"
              style={{
                color: "rgba(232,228,210,0.62)",
                letterSpacing: "0.04em",
                lineHeight: 1.7,
              }}
            >
              Turning ideas into moving visuals. 从概念到成品，每个视频作品都是一次关于视觉语言的实验。
            </p>
          </motion.div>

          {/* ─── Video Gallery ─── */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="label-xs block mb-8"
              style={{ color: "rgba(232,228,210,0.40)" }}
            >
              Works
            </span>
            <AiVideoGallery
              videos={aiVideoWorks}
              onVideoSelect={onVideoSelect}
            />
          </motion.div>

          {/* ─── Reflection ─── */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="label-xs block mb-4"
              style={{ color: "rgba(232,228,210,0.40)" }}
            >
              Reflection
            </span>
            <p
              className="text-[15px] md:text-[17px] leading-relaxed max-w-[680px]"
              style={{ color: "rgba(245,241,223,0.80)" }}
            >
              {aiVideoReflection}
            </p>
          </motion.div>

          {/* ─── 底部关闭按钮 ─── */}
          <motion.div
            className="flex justify-center pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={onClose}
              className="label-xs px-8 py-4 rounded-full cursor-pointer transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.055)",
                color: "rgba(245,241,223,0.96)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#E8E4D2";
                (e.currentTarget as HTMLElement).style.color = "#050505";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.055)";
                (e.currentTarget as HTMLElement).style.color = "rgba(245,241,223,0.96)";
              }}
            >
              Close
            </button>
          </motion.div>

          {/* ─── 底部版权信息 ─── */}
          <motion.div
            className="pb-8 label-xs"
            style={{ color: "rgba(232,228,210,0.40)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            All videos created with Seedance 2.0 · Original works by Zhu Yujing
            <br />
            全部视频由 Seedance 2.0 制作 · 原创作品
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
