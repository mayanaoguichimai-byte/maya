"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Work Index — Classified content index by category
   Finance / Data / AI Tools / Life
   ═══════════════════════════════════════════════════════════════════════ */

export type WorkItem = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  image: string;
  targetSection?: string;
  revealCaseId?: string;
};

export type WorkCategory = {
  id: string;
  label: string;
  description: string;
  items: WorkItem[];
};

export function RecentWorksSection({
  categories,
  onItemClick,
}: {
  categories: WorkCategory[];
  onItemClick?: (work: WorkItem & { image: string }, sourceRect: DOMRect | null) => void;
}) {
  return (
    <section className="relative bg-black py-20 md:py-28">
      <div className="mx-auto max-w-[920px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="text-[10px] md:text-[11px] tracking-[0.28em] mb-3 uppercase" style={{ color: "rgba(232,228,210,0.40)" }}>
            Index
          </div>
          <h2
            className="text-[clamp(32px,5vw,52px)] font-light leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif", color: "rgba(245,241,223,0.96)" }}
          >
            Work <em className="italic" style={{ color: "rgba(245,241,223,0.80)" }}>Index</em>
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] tracking-[0.04em] max-w-md" style={{ color: "rgba(232,228,210,0.62)" }}>
            关于金融、数据、AI 工具与生活片段的分类索引。
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-16 md:gap-20">
          {categories.map((category, catIndex) => (
            <CategoryGroup
              key={category.id}
              category={category}
              catIndex={catIndex}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryGroup({
  category,
  catIndex,
  onItemClick,
}: {
  category: WorkCategory;
  catIndex: number;
  onItemClick?: (work: WorkItem & { image: string }, sourceRect: DOMRect | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: catIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Category header */}
      <div className="mb-7 md:mb-9">
        <div className="flex items-baseline gap-4 mb-3">
          <h3
            className="uppercase"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(20px, 2.2vw, 34px)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(232,228,210,0.86)",
            }}
          >
            {category.label}
          </h3>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.14)" }} />
        </div>
        <p
          className="tracking-[0.04em]"
          style={{ fontSize: "clamp(13px, 1.1vw, 16px)", color: "rgba(232,228,210,0.56)" }}
        >
          {category.description}
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 md:gap-3">
        {category.items.map((work, itemIndex) => (
          <WorkListItem
            key={work.id}
            work={work}
            index={itemIndex}
            onClick={onItemClick}
          />
        ))}
      </div>
    </motion.div>
  );
}

function WorkListItem({
  work,
  index,
  onClick,
}: {
  work: WorkItem & { image?: string };
  index: number;
  onClick?: (work: WorkItem & { image: string }, sourceRect: DOMRect | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const rect =
      thumbnailRef.current?.getBoundingClientRect() ??
      itemRef.current?.getBoundingClientRect() ??
      null;
    if (onClick) {
      onClick(work as WorkItem & { image: string }, rect);
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="group relative cursor-pointer"
    >
      <div
        className="flex items-center gap-4 md:gap-5 rounded-2xl md:rounded-3xl border px-4 py-3.5 md:px-6 md:py-4"
        style={{
          background: hovered ? "rgba(255,255,255,0.095)" : "rgba(255,255,255,0.055)",
          borderColor: hovered ? "rgba(232,228,210,0.30)" : "rgba(255,255,255,0.14)",
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "all 300ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Left: circular thumbnail */}
        <div
          ref={thumbnailRef}
          className="relative flex-shrink-0 overflow-hidden rounded-full"
          style={{
            width: 52,
            height: 52,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            border: "1px solid rgba(255,255,255,0.14)",
            transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {work.image ? (
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{
                opacity: hovered ? 1 : 0.88,
                filter: hovered ? "saturate(0.9) brightness(1.12) contrast(1.12)" : "saturate(0.7) brightness(1) contrast(1.08)",
                transition: "all 300ms ease",
              }}
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))" }}
            >
              <span className="text-[9px] tracking-[0.12em]" style={{ color: "rgba(232,228,210,0.28)" }}>
                {work.title.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Center: title + subtitle */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-[14px] md:text-[15px] tracking-[-0.01em]"
            style={{
              fontWeight: 600,
              color: hovered ? "#FFF9E8" : "rgba(245,241,223,0.96)",
              transition: "color 300ms ease",
            }}
          >
            {work.title}
          </h3>
          <p
            className="mt-0.5 text-[11px] md:text-[12px] leading-relaxed"
            style={{
              color: hovered ? "rgba(232,228,210,0.72)" : "rgba(232,228,210,0.66)",
              transition: "color 300ms ease",
            }}
          >
            {work.subtitle}
          </p>
        </div>

        {/* Right: metadata + arrow */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <span
            className="text-[10px] md:text-[11px] tracking-[0.06em]"
            style={{
              color: hovered ? "rgba(232,228,210,0.68)" : "rgba(232,228,210,0.58)",
              transition: "color 300ms ease",
            }}
          >
            {work.meta}
          </span>
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{
              background: hovered ? "#E8E4D2" : "rgba(255,255,255,0.085)",
              border: "1px solid rgba(255,255,255,0.16)",
              transition: "all 300ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              className="text-[10px]"
              style={{
                color: hovered ? "#050505" : "rgba(232,228,210,0.86)",
                transform: hovered ? "translate(1px, -1px)" : "translate(0, 0)",
                transition: "all 300ms ease",
              }}
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
