"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Case Folio Shelf — 3D perspective book/folio archive
   Inspired by Foliom-style editorial archive display.
   Black background, large serif title, horizontal 3D folios.
   ═══════════════════════════════════════════════════════════════════════ */

export type FolioItem = {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  caseId?: string;
  scrollTarget?: string;
};

const CATEGORIES = ["All", "AI Tools", "Finance", "Data", "Life"] as const;

export function CaseFolioShelf({
  items,
  onOpenCase,
}: {
  items: FolioItem[];
  onOpenCase?: (item: FolioItem, sourceRect: DOMRect | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX.set(x);
    },
    [mouseX]
  );

  // Wheel → horizontal scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.8;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollLeftStart(trackRef.current.scrollLeft);
  };

  const handleMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX;
    trackRef.current.scrollLeft = scrollLeftStart - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category.includes(activeCategory));

  return (
    <section className="relative bg-black overflow-hidden">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center py-16 md:py-24"
      >
        {/* Header */}
        <div className="mx-auto max-w-[1200px] w-full px-6 md:px-10 mb-10 md:mb-14 text-center">
          <div
            className="text-[10px] md:text-[11px] tracking-[0.28em] mb-4 uppercase"
            style={{ color: "rgba(232,228,210,0.40)" }}
          >
            CASE FOLIOS
          </div>
          <h2
            className="text-[clamp(48px,10vw,120px)] font-light leading-[0.95] tracking-[-0.03em]"
            style={{
              fontFamily:
                "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              color: "rgba(245,241,223,0.96)",
            }}
          >
            Work Archive
          </h2>
          <p
            className="mt-4 text-[13px] md:text-[15px] tracking-[0.04em] max-w-lg mx-auto"
            style={{ color: "rgba(232,228,210,0.52)" }}
          >
            Finance, data, AI tools, and life fragments in one visual index.
          </p>
        </div>

        {/* 3D Folio Track */}
        <div
          ref={trackRef}
          className="relative w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex items-end gap-3 md:gap-5 px-[8vw] md:px-[15vw] py-12 md:py-16" style={{ perspective: 1400 }}>
            {filteredItems.map((item, index) => (
              <FolioBook
                key={item.id}
                item={item}
                index={index}
                totalCount={filteredItems.length}
                hoveredIndex={hoveredIndex}
                mouseX={smoothMouseX}
                onHover={setHoveredIndex}
                onOpen={onOpenCase}
                isDragging={isDragging}
              />
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-[11px] md:text-[12px] tracking-[0.08em] transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  background:
                    activeCategory === cat
                      ? "rgba(232,228,210,0.92)"
                      : "transparent",
                  color:
                    activeCategory === cat
                      ? "#050505"
                      : "rgba(232,228,210,0.75)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-6 md:mt-8 text-center">
          <span
            className="text-[10px] tracking-[0.2em]"
            style={{ color: "rgba(232,228,210,0.25)" }}
          >
            DRAG OR SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
}

function FolioBook({
  item,
  index,
  totalCount,
  hoveredIndex,
  mouseX,
  onHover,
  onOpen,
  isDragging,
}: {
  item: FolioItem;
  index: number;
  totalCount: number;
  hoveredIndex: number | null;
  mouseX: ReturnType<typeof useSpring>;
  onHover: (i: number | null) => void;
  onOpen?: (item: FolioItem, sourceRect: DOMRect | null) => void;
  isDragging: boolean;
}) {
  const bookRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isAnyHovered = hoveredIndex !== null;
  const isDimmed = isAnyHovered && hoveredIndex !== index;

  // Parallax offset
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

  // 3D book transforms — alternating left/right tilt for shelf feel
  const baseRotateY = index % 2 === 0 ? -12 : 12;
  const rotateY = isHovered ? 0 : baseRotateY + (index - totalCount / 2) * 1.5;
  const scale = isHovered ? 1.08 : isDimmed ? 0.94 : 1;
  const translateY = isHovered ? -24 : 0;
  const translateZ = isHovered ? 60 : 0;
  const brightness = isHovered ? 1.1 : isDimmed ? 0.65 : 0.88;
  const opacity = isDimmed ? 0.55 : 1;

  return (
    <motion.div
      ref={bookRef}
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{
        width: "clamp(100px, 14vw, 170px)",
        height: "clamp(260px, 36vw, 400px)",
        perspective: 1200,
        x: parallaxX,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        rotateY,
        scale,
        y: translateY,
        z: translateZ,
        opacity,
      }}
      transition={{
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Book spine + cover container */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book spine (left edge) */}
        <div
          className="absolute left-0 top-1 bottom-1 w-[6px] md:w-[8px]"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            transform: "rotateY(-90deg) translateZ(3px)",
            transformOrigin: "left center",
          }}
        />

        {/* Main cover */}
        <div
          className="relative w-full h-full rounded-sm overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: isHovered
              ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,228,210,0.12)"
              : "0 16px 40px rgba(0,0,0,0.5)",
            transition: "box-shadow 0.45s cubic-bezier(0.76,0,0.24,1)",
          }}
        >
          {/* Background image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: `brightness(${brightness}) contrast(1.05) saturate(0.7)`,
              transition: "filter 0.45s ease",
            }}
            draggable={false}
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isHovered
                ? "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)",
              transition: "background 0.45s ease",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-3 md:p-4">
            {/* Top: category */}
            <div
              className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase"
              style={{
                color: isHovered ? "rgba(232,228,210,0.65)" : "rgba(232,228,210,0.40)",
                transition: "color 0.4s ease",
              }}
            >
              {item.category}
            </div>

            {/* Bottom: title + subtitle + CTA */}
            <div>
              <h3
                className="text-[11px] md:text-[13px] font-medium leading-tight tracking-[-0.01em]"
                style={{
                  color: isHovered ? "#FFF9E8" : "rgba(245,241,223,0.90)",
                  transition: "color 0.4s ease",
                }}
              >
                {item.title}
              </h3>
              <p
                className="mt-1 text-[8px] md:text-[9px] tracking-[0.04em]"
                style={{
                  color: isHovered ? "rgba(232,228,210,0.60)" : "rgba(232,228,210,0.38)",
                  transition: "color 0.4s ease",
                }}
              >
                {item.subtitle}
              </p>

              {/* VIEW CASE → */}
              <motion.div
                className="mt-3 flex items-center gap-1.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="text-[8px] md:text-[9px] tracking-[0.14em]"
                  style={{ color: "rgba(232,228,210,0.75)" }}
                >
                  VIEW CASE
                </span>
                <span style={{ color: "rgba(232,228,210,0.50)" }}>→</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
