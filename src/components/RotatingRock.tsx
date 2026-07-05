import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import rock from "@/assets/rock-real.png";

/** Rotating 3D-ish rock that scales/rotates with scroll progress. */
export function RotatingRock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 320]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 0.92, 0.7]);
  const rockFilter = useTransform(
    brightness,
    (v) => `brightness(${v}) contrast(1.18) drop-shadow(0 40px 60px rgba(0,0,0,0.65))`,
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] bg-foreground text-background overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={{ rotate, scale, y }}
        className="relative w-[60vmin] h-[60vmin] [perspective:1000px]"
      >
        <motion.div
          style={{ filter: rockFilter }}
          className="relative h-full w-full will-change-transform"
          animate={{
            rotateZ: [-2, 2, -2],
            rotateX: [-3, 3, -3],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Ambient ground shadow */}
          <div className="absolute inset-[8%] translate-x-[4%] translate-y-[14%] rounded-[48%] bg-black/60 blur-[40px]" />
          <div className="absolute inset-[14%] translate-x-[6%] translate-y-[10%] rounded-[46%] bg-black/35 blur-2xl" />

          {/* Main rock image */}
          <img
            src={rock}
            alt=""
            className="relative z-10 h-full w-full object-contain"
            style={{ backfaceVisibility: "hidden" }}
            draggable={false}
          />

          {/* Primary light highlight — top-left warm spotlight */}
          <div className="pointer-events-none absolute inset-[12%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_60%_50%_at_28%_18%,rgba(255,245,220,0.28),transparent_70%)] mix-blend-overlay" />

          {/* Secondary fill light — soft top bounce */}
          <div className="pointer-events-none absolute inset-[16%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_50%_40%_at_45%_12%,rgba(255,250,235,0.12),transparent_60%)] mix-blend-soft-light" />

          {/* Core shadow — bottom-right depth */}
          <div className="pointer-events-none absolute inset-[14%] z-20 rounded-[44%] bg-[radial-gradient(ellipse_55%_55%_at_72%_78%,rgba(0,0,0,0.55),transparent_65%)] mix-blend-multiply" />

          {/* Edge rim light — subtle contour definition */}
          <div className="pointer-events-none absolute inset-[10%] z-20 rounded-[46%] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.08),transparent_50%)] mix-blend-overlay" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none px-6 text-center">
        <p className="label-xs text-background/60 mb-6">Still observing.</p>
        <h2 className="display-hero">
          继续把问题
          <br />
          看清楚一点。
        </h2>
        <a
          href="#contact"
          className="pointer-events-auto mt-10 label-xs underline underline-offset-8 decoration-1 hover:opacity-60"
        >
          写给我 →
        </a>
      </div>
      <div className="absolute bottom-6 left-6 label-xs text-background/50">
        金融 / 数据 / AI / 日常
      </div>
    </section>
  );
}
