import { useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import rock from "@/assets/rock-real.png";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import bts1 from "@/assets/bts-1.jpg";
import bts2 from "@/assets/bts-2.jpg";
import bts3 from "@/assets/bts-3.jpg";
import bts4 from "@/assets/bts-4.jpg";
import { VideoWithZoom } from "./VideoWithZoom";

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
  "left-[37vw] top-[52vh] w-[28vw] md:w-[20vw] rotate-[0deg]",
];

export function ScrollRockHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [showCredit, setShowCredit] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowCredit(latest > 0.38);
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.58, 0.76], [1, 1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 0.76], ["0vh", "-20vh"]);
  const rockRotate = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.72],
    [-18, 24, -42, 38, -10],
  );
  const rockRotateY = useTransform(scrollYProgress, [0, 0.72], [-28, 34]);
  const rockRotateX = useTransform(scrollYProgress, [0, 0.72], [12, -10]);
  const rockY = useTransform(scrollYProgress, [0, 0.72], ["2vh", "-5vh"]);
  const rockBrightness = useTransform(
    scrollYProgress,
    [0, 0.25, 0.52, 0.72],
    [1.12, 0.92, 0.62, 0.3],
  );
  const rockFilter = useTransform(
    rockBrightness,
    (v) => `brightness(${v}) contrast(1.16) drop-shadow(0 34px 46px rgba(0,0,0,0.72))`,
  );
  const nextY = useTransform(scrollYProgress, [0.55, 1], ["60vh", "-6vh"]);
  const nextOpacity = useTransform(scrollYProgress, [0.55, 0.72, 1], [0, 0.75, 1]);

  return (
    <section id="home" ref={ref} className="relative h-[280vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.div style={{ opacity: sceneOpacity, y: sceneY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(120,75,38,0.18),transparent_28%)]" />
          {BACK_IMAGES.map((src, i) => (
            <BackImage key={src} src={src} index={i} progress={scrollYProgress} />
          ))}

          <div className="absolute left-1/2 top-[43%] z-20 aspect-square w-[28vmin] max-w-[280px] min-w-[150px] -translate-x-1/2 -translate-y-1/2 [perspective:900px]">
            <motion.div
              style={{
                y: rockY,
                rotate: rockRotate,
                rotateY: rockRotateY,
                rotateX: rockRotateX,
                filter: rockFilter,
              }}
              className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
            >
              <div className="absolute inset-[12%] translate-x-[7%] translate-y-[9%] rounded-[45%] bg-black/55 blur-2xl" />
              <img
                src={rock}
                alt="scroll controlled stone"
                className="relative z-10 h-full w-full object-contain"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-[18%] z-20 rounded-[42%] bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_72%_78%,rgba(0,0,0,0.62),transparent_48%)] mix-blend-overlay" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: nextY, opacity: nextOpacity }}
          className="absolute inset-x-0 bottom-0 z-30 px-4 md:px-8"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {NEXT_IMAGES.map((src, i) => {
              const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
              return (
                <motion.div
                  key={src}
                  initial={false}
                  className={`group relative aspect-[16/10] overflow-hidden bg-white/5 ${i % 3 === 1 ? "md:translate-y-14" : ""}`}
                >
                  {isVideo ? (
                    <VideoWithZoom
                      src={src}
                      className="h-full w-full object-cover brightness-[0.86]"
                    />
                  ) : (
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover brightness-[0.86] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 px-6 md:px-10 label-xs text-white/55">
          {showCredit ? (
            <>
              All videos created with Seedance 2.0 · Original works by Zhu Yujing
              <br />
              全部视频由 Seedance 2.0 制作 · 原创作品
            </>
          ) : (
            "向下滚动，让石头慢慢转动"
          )}
        </div>
      </div>
    </section>
  );
}

function BackImage({
  src,
  index,
  progress,
}: {
  src: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 0.72], [`${(index - 3) * 1.5}vw`, `${(index - 3) * -5}vw`]);
  const y = useTransform(progress, [0, 0.72], [`${(index % 2) * 2}vh`, `${-14 - index * 2}vh`]);
  const opacity = useTransform(progress, [0, 0.45, 0.72], [0.82, 0.58, 0]);

  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <motion.div
      style={{ x, y, opacity }}
      className={`absolute aspect-[16/10] overflow-hidden bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.65)] ${backLayout[index]}`}
    >
      {isVideo ? (
        <VideoWithZoom
          src={src}
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(0.15) saturate(0.65) brightness(0.72)" }}
        />
      ) : (
        <>
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover grayscale-[0.15] saturate-[0.65] brightness-[0.72]"
            loading={index < 4 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/25" />
        </>
      )}
    </motion.div>
  );
}
