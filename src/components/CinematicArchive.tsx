"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Foliom-style Portfolio Shelf — 1:1 visual recreation
   - Black bg, serif hero title, 3D book carousel, bottom pills
   - Mouse parallax on shelf, hover-to-focus on individual books
   ═══════════════════════════════════════════════════════════════════════ */

export type PortfolioBook = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  spineColor?: string;
};

const BOOK_W = 190;
const BOOK_H = 290;
const SPINE_W = 30;
const PAGE_EDGE = 16;
const TOP_EDGE = 14;

const BOOKS: PortfolioBook[] = [
  {
    id: "b1",
    title: "数字金融与实体经济研究",
    subtitle: "Panel data research on digital finance and real-economy development.",
    image: "",
  },
  {
    id: "b2",
    title: "金融工程专业训练",
    subtitle: "Course-based practice in valuation, indicators, and financial thinking.",
    image: "",
  },
  {
    id: "b3",
    title: "AI经营数据分析助手",
    subtitle: "Turning business data into insight, action, and decisions.",
    image: "",
  },
  {
    id: "b4",
    title: "商业数据分析 Demo",
    subtitle: "Visual dashboards and structured business storytelling.",
    image: "",
  },
  {
    id: "b5",
    title: "用户反馈分析",
    subtitle: "Finding product signals inside messy user comments.",
    image: "",
  },
  {
    id: "b6",
    title: "消费趋势洞察",
    subtitle: "Reading patterns behind spending behavior and market change.",
    image: "",
  },
  {
    id: "b7",
    title: "Personal Portfolio Website",
    subtitle: "A personal site about work, curiosity, and self-expression.",
    image: "",
  },
  {
    id: "b8",
    title: "Notes & Small Thoughts",
    subtitle: "Fragments, unfinished questions, and everyday observations.",
    image: "",
  },
];

const TAGS = ["Finance", "Data", "AI", "Research", "Life"];

export function CinematicArchive({ items }: { items: (PortfolioBook & { image: string })[] }) {
  const books = items.length > 0 ? items : BOOKS;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef(0);
  const rafRef = useRef(0);

  // Subtle floating animation
  useEffect(() => {
    const tick = () => {
      floatRef.current += 0.006;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!shelfRef.current) return;
    const r = shelfRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  const floatY = Math.sin(floatRef.current) * 6;
  const floatX = Math.cos(floatRef.current * 0.7) * 3;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex flex-col select-none">
      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
        <div className="text-[13px] md:text-[14px] font-medium tracking-[-0.01em] text-white">
          朱雨婧 / YUJING ZHU
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Portfolio", "Notes", "About", "Contact"].map((t) => (
            <span
              key={t}
              className="text-[13px] md:text-[14px] text-white/80 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="text-[12px] md:text-[13px] font-medium bg-white text-black px-5 py-2.5 rounded-full transition-transform duration-300 hover:scale-[1.04]"
        >
          View Resume
        </button>
      </nav>

      {/* ── Hero Title ── */}
      <div className="relative z-10 flex-shrink-0 pt-12 md:pt-16 pb-4 text-center">
        <h1
          className="text-[clamp(64px,12vw,160px)] font-light leading-[0.95] tracking-[0.02em] text-white"
          style={{
            fontFamily:
              "'EB Garamond', 'Cormorant Garamond', 'Playfair Display', 'Fraunces', Georgia, serif",
          }}
        >
          Portfolio
        </h1>
        <p className="mt-3 md:mt-5 text-[12px] md:text-[14px] tracking-[0.08em] text-white/40 max-w-md mx-auto">
          A selection of projects, ideas, and work in progress.
        </p>
      </div>

      {/* ── 3D Book Shelf ── */}
      <div
        ref={shelfRef}
        className="relative z-10 flex-1 flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredIdx(null);
          setMousePos({ x: 0.5, y: 0.5 });
        }}
      >
        <div
          className="relative flex items-end justify-center gap-[18px] md:gap-[22px]"
          style={{
            perspective: "1400px",
            perspectiveOrigin: `${50 + (mousePos.x - 0.5) * 8}% ${45 + (mousePos.y - 0.5) * 6}%`,
            transform: `translateY(${floatY}px) translateX(${floatX}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {books.map((book, i) => {
            const isHovered = hoveredIdx === i;
            const distFromHover = hoveredIdx !== null ? Math.abs(i - hoveredIdx) : 99;
            const distFromCenter = Math.abs(i - (books.length - 1) / 2);
            const baseRotY = 38 - distFromCenter * 4; // center books face more forward
            const baseZ = -distFromCenter * 15;
            const baseScale = 1 - distFromCenter * 0.03;

            // Hover adjustments
            const hoverRotY = isHovered ? baseRotY - 22 : baseRotY;
            const hoverZ = isHovered ? baseZ + 70 : baseZ;
            const hoverScale = isHovered ? baseScale * 1.18 : baseScale;
            const hoverOpacity =
              hoveredIdx !== null ? (isHovered ? 1 : Math.max(0.35, 1 - distFromHover * 0.22)) : 1;
            const hoverY = isHovered ? -18 : 0;

            // Adjacent nudge
            const nudgeX = distFromHover === 1 ? (i < hoveredIdx ? -8 : 8) : 0;

            return (
              <div
                key={book.id}
                className="relative cursor-pointer"
                style={{
                  width: BOOK_W,
                  height: BOOK_H,
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease-out",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: `translateX(${nudgeX}px) translateY(${hoverY}px) rotateY(${hoverRotY}deg) translateZ(${hoverZ}px) scale(${hoverScale})`,
                    opacity: hoverOpacity,
                    transition:
                      "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease-out",
                  }}
                >
                  {/* ── Book Cover (front face) ── */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      transform: `translateZ(${SPINE_W / 2 + 2}px)`,
                      borderRadius: "2px 5px 5px 2px",
                      background: "#1c1c1c",
                      boxShadow: isHovered
                        ? "0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)"
                        : "0 10px 30px rgba(0,0,0,0.5)",
                      transition: "box-shadow 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          opacity: isHovered ? 0.6 : 0.4,
                          filter: isHovered
                            ? "saturate(0.7) brightness(0.9)"
                            : "saturate(0.4) brightness(0.6)",
                          transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
                    )}

                    {/* Cover gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(20,20,20,0.92) 0%, rgba(20,20,20,0.6) 35%, rgba(20,20,20,0.25) 65%, rgba(20,20,20,0.1) 100%)",
                      }}
                    />

                    {/* Cover text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className="text-[12px] md:text-[13px] font-medium leading-[1.2] tracking-[-0.01em]"
                        style={{
                          color: isHovered ? "#e8e4d8" : "rgba(255,255,255,0.5)",
                          transition: "color 0.4s ease",
                        }}
                      >
                        {book.title}
                      </h3>
                      <p
                        className="mt-1.5 text-[9px] md:text-[10px] leading-relaxed"
                        style={{
                          color: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0)",
                          maxHeight: isHovered ? 36 : 0,
                          overflow: "hidden",
                          transition: "all 0.4s ease",
                        }}
                      >
                        {book.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* ── Book Spine (left face) ── */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: SPINE_W,
                      height: BOOK_H,
                      transform: `rotateY(-90deg) translateZ(0px)`,
                      transformOrigin: "left center",
                      background:
                        "linear-gradient(to bottom, #2e2820 0%, #221e18 50%, #2a241c 100%)",
                      borderRadius: "2px 0 0 2px",
                      boxShadow: "inset -1px 0 6px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        writingMode: "vertical-rl",
                        fontSize: 7,
                        letterSpacing: "0.22em",
                        color: "rgba(255,255,255,0.2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {book.title.split("·")[0]?.trim().slice(0, 12) || "YUJING"}
                    </div>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[50%] h-px bg-white/[0.06]" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[50%] h-px bg-white/[0.06]" />
                  </div>

                  {/* ── Top Edge ── */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: BOOK_W,
                      height: TOP_EDGE,
                      transform: `rotateX(90deg) translateZ(0px)`,
                      transformOrigin: "top center",
                      background:
                        "linear-gradient(to right, #2e2820, #d8d3c6 2px, #e8e4d8 4px, #d8d3c6 6px, #221e18)",
                      borderRadius: "2px 2px 0 0",
                    }}
                  />

                  {/* ── Bottom Edge ── */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: BOOK_W,
                      height: TOP_EDGE,
                      transform: `rotateX(-90deg) translateZ(0px)`,
                      transformOrigin: "bottom center",
                      background:
                        "linear-gradient(to right, #2e2820, #ccc8bc 2px, #ddd8cc 4px, #ccc8bc 6px, #221e18)",
                      borderRadius: "0 0 2px 2px",
                    }}
                  />

                  {/* ── Right Edge (pages) ── */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: PAGE_EDGE,
                      height: BOOK_H,
                      transform: `rotateY(90deg) translateZ(${BOOK_W - PAGE_EDGE}px)`,
                      transformOrigin: "right center",
                      background:
                        "linear-gradient(to bottom, #d8d3c8, #e8e4d8 30%, #ddd8cc 70%, #c8c3b8)",
                      borderRadius: "0 3px 3px 0",
                    }}
                  >
                    {Array.from({ length: 24 }).map((_, pi) => (
                      <div
                        key={pi}
                        className="absolute left-1 right-1 h-px bg-black/[0.05]"
                        style={{ top: `${(pi / 24) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* ── Hover Title Tooltip ── */}
                <motion.div
                  className="absolute left-1/2 z-30 pointer-events-none whitespace-nowrap"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 8,
                    x: "-50%",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    bottom: BOOK_H + 16,
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {book.title}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Tags ── */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center gap-3 pb-8 md:pb-12 pt-2">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onMouseEnter={() => setActiveTag(tag)}
            onMouseLeave={() => setActiveTag(null)}
            className={`text-[12px] md:text-[13px] px-5 py-2 rounded-full border transition-all duration-300 ${
              activeTag === tag
                ? "border-white/60 text-white bg-white/[0.08]"
                : "border-white/[0.15] text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
