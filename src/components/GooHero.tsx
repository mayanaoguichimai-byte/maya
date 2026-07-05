import { useEffect, useState } from "react";
import { motion } from "motion/react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const IMAGES = [p1, p2, p3, p4];

export function GooHero() {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setImgIdx((i) => (i + 1) % IMAGES.length), 3500);
    return () => clearInterval(id);
  }, []);

  // Mouse tracking removed — per-frame SVG filter recomputation was the main hot path.

  const drifters = [
    { cx: 42, cy: 50, r: 18, dur: 10, dx: 8, dy: -6 },
    { cx: 60, cy: 58, r: 14, dur: 12, dx: -7, dy: 7 },
    { cx: 50, cy: 40, r: 11, dur: 9, dx: 6, dy: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" />
          </filter>
          <mask id="blobMask">
            <rect width="100" height="100" fill="black" />
            <g filter="url(#goo)">
              {drifters.map((b, i) => (
                <motion.circle
                  key={i}
                  fill="white"
                  r={b.r}
                  initial={{ cx: b.cx, cy: b.cy }}
                  animate={{
                    cx: [b.cx, b.cx + b.dx, b.cx - b.dx * 0.6, b.cx],
                    cy: [b.cy, b.cy + b.dy, b.cy - b.dy * 0.6, b.cy],
                  }}
                  transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </g>
          </mask>
        </defs>

        {IMAGES.map((src, i) => (
          <motion.image
            key={src}
            href={src}
            x="-10"
            y="-10"
            width="120"
            height="120"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#blobMask)"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === imgIdx ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
