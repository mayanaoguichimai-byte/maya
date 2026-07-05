import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import bts1 from "@/assets/bts-1.jpg";
import bts2 from "@/assets/bts-2.jpg";
import bts3 from "@/assets/bts-3.jpg";
import bts4 from "@/assets/bts-4.jpg";

const ITEMS = [bts1, p1, bts2, p2, bts3, p3, bts4, p4, bts1, p1];

/** Horizontal scroll driven by vertical scroll — pinned section. */
export function HorizontalScroll({ label = "Behind the Scenes" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Scroll 80% of width to the left
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={ref} className="relative h-[300vh] border-t border-border">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 md:px-10 py-6 label-xs text-muted-foreground border-b border-border">
          <span>{label}</span>
          <span>Drag · Scroll →</span>
        </div>
        <div className="flex-1 flex items-center">
          <motion.div style={{ x }} className="flex gap-6 px-6 md:px-10 will-change-transform">
            {ITEMS.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[70vw] md:w-[40vw] lg:w-[32vw] aspect-[4/5] overflow-hidden bg-muted"
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-4 left-4 label-xs text-white mix-blend-difference">
                  {String(i + 1).padStart(2, "0")} / Field
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
