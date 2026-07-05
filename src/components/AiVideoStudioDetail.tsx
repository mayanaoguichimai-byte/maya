"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { VideoWork } from "@/data/ai-studio";

// ─────────────────────────────────────────────────────────────────────────────
// AI Video Studio Detail — Director Portfolio 风格
// 电影作品集详情页：序号 + 作品名 + 风格 → 视频 → 技术信息
// ─────────────────────────────────────────────────────────────────────────────

export function AiVideoStudioDetail({
  videoWork,
  videoIndex,
  onClose,
}: {
  videoWork: VideoWork | null;
  videoIndex: number;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!videoWork) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [videoWork, onClose]);

  if (!videoWork) return null;

  const num = String(videoIndex + 1).padStart(2, "0");

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[130] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        style={{ background: "#0a0a0a" }}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        <div
          className="min-h-screen flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── Hero — 序号 + 作品名 + 风格标签 ─── */}
          <motion.div
            className="pt-16 md:pt-24 pb-6 md:pb-8 px-6 md:px-10 mx-auto w-full max-w-[1100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 序号 */}
            <span
              className="block mb-4 text-[10px] md:text-[11px] tracking-[0.18em] uppercase"
              style={{
                color: "rgba(232,228,210,0.30)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {num}
            </span>
            {/* 作品名 — 最大 */}
            <h1
              className="text-[32px] md:text-[52px] font-light leading-[1.05] mb-3"
              style={{
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                color: "rgba(245,241,223,0.96)",
                letterSpacing: "-0.025em",
                textTransform: "uppercase" as const,
              }}
            >
              {videoWork.title}
            </h1>
            {/* 风格标签 */}
            <span
              className="text-[11px] md:text-[12px] tracking-[0.14em] uppercase"
              style={{
                color: "rgba(232,228,210,0.45)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {videoWork.subtitle}
            </span>
          </motion.div>

          {/* ─── 简介 — 中英文 ─── */}
          {(videoWork.descriptionZh || videoWork.descriptionEn) && (
            <motion.div
              className="px-6 md:px-10 mx-auto w-full max-w-[1100px] pb-8 md:pb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {videoWork.descriptionZh && (
                <p
                  className="text-[14px] md:text-[16px] leading-relaxed mb-2"
                  style={{
                    color: "rgba(245,241,223,0.72)",
                    fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    letterSpacing: "0.01em",
                  }}
                >
                  {videoWork.descriptionZh}
                </p>
              )}
              {videoWork.descriptionEn && (
                <p
                  className="text-[12px] md:text-[13px] leading-relaxed"
                  style={{
                    color: "rgba(232,228,210,0.40)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    letterSpacing: "0.02em",
                    fontStyle: "italic",
                  }}
                >
                  {videoWork.descriptionEn}
                </p>
              )}
            </motion.div>
          )}

          {/* ─── Video ─── */}
          <motion.div
            className="flex-1 w-full px-6 md:px-10 mx-auto max-w-[1100px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full aspect-video overflow-hidden rounded-sm"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "#111",
              }}
            >
              <video
                src={videoWork.videoSrc}
                controls
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* ─── Info ─── */}
          <motion.div
            className="w-full px-6 md:px-10 mx-auto max-w-[1100px] pt-8 md:pt-12 pb-12 md:pb-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="grid grid-cols-4 gap-6 md:gap-10"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "20px",
              }}
            >
              <InfoItem label="Duration" value={videoWork.duration ?? "0:05"} />
              <InfoItem label="Tools" value={videoWork.tools ?? "Seedance 2.0"} />
              <InfoItem label="Format" value={videoWork.format ?? "MP4/1080P"} />
              <InfoItem label="Year" value="2026" />
            </div>
          </motion.div>

          {/* ─── Back ─── */}
          <motion.div
            className="w-full px-6 md:px-10 mx-auto max-w-[1100px] pb-10 md:pb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <button
              onClick={onClose}
              className="label-xs cursor-pointer transition-colors group flex items-center gap-2"
              style={{ color: "rgba(232,228,210,0.40)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(245,241,223,0.90)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(232,228,210,0.40)";
              }}
            >
              <span className="group-hover:-translate-x-1 transition-transform">&#8592;</span>
              Back to AI Video Studio
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InfoItem — 极简信息单元
// ─────────────────────────────────────────────────────────────────────────────

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        className="block mb-1.5 text-[9px] md:text-[10px] tracking-[0.16em] uppercase"
        style={{
          color: "rgba(232,228,210,0.28)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        className="text-[12px] md:text-[13px]"
        style={{
          color: "rgba(245,241,223,0.70)",
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </span>
    </div>
  );
}
