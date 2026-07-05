"use client";

import { motion } from "motion/react";
import { useRef, useState, useCallback } from "react";
import type { VideoWork } from "@/data/ai-studio";

// ─────────────────────────────────────────────────────────────────────────────
// AI Video Gallery — Director Portfolio 风格
// 电影作品集排版：序号 → 作品名（大）→ 风格标签（小）
// ─────────────────────────────────────────────────────────────────────────────

export function AiVideoGallery({
  videos,
  onVideoSelect,
}: {
  videos: VideoWork[];
  onVideoSelect: (video: VideoWork) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]">
      {videos.map((video, index) => {
        const isLarge = index % 3 === 0;
        return (
          <motion.div
            key={video.id}
            className={isLarge ? "md:row-span-2" : "md:row-span-1"}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <VideoCard
              video={video}
              index={index}
              onSelect={() => onVideoSelect(video)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VideoCard — 导演作品集风格卡片
// ─────────────────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  index,
  onSelect,
}: {
  video: VideoWork;
  index: number;
  onSelect: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg h-full"
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
      }}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* 视频层 — hover 时播放 */}
        <video
          ref={videoRef}
          src={video.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
        />
        {/* 信息层 — 电影海报风格 */}
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)"
              : "linear-gradient(160deg, rgba(28,26,22,0.97) 0%, rgba(18,16,14,0.99) 100%)",
            transition: "background 600ms ease",
          }}
        >
          <div className="px-5 md:px-7 pb-5 md:pb-7">
            {/* 序号 */}
            <span
              className="block mb-3 text-[10px] md:text-[11px] tracking-[0.18em] uppercase"
              style={{
                color: "rgba(232,228,210,0.30)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* 作品名 — 最大字号 */}
            <h3
              className="text-[22px] md:text-[28px] font-light leading-[1.1] mb-2"
              style={{
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                color: "rgba(245,241,223,0.95)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase" as const,
              }}
            >
              {video.title}
            </h3>
            {/* 风格标签 — 更小、更浅 */}
            <span
              className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase"
              style={{
                color: "rgba(232,228,210,0.45)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {video.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
