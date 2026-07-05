import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export type FieldMapItem = {
  label: string;
  title: string;
  image: string;
  targetId: string;
};

type FieldNotesMapProps = {
  items: FieldMapItem[];
};

export function FieldNotesMap({ items }: FieldNotesMapProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6vw", "-112vw"]);

  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="field-map"
      ref={ref}
      className="relative border-t border-white/10 bg-black md:h-[240vh]"
    >
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-10 label-xs text-white/55">
          <span>Field Notes & Inner Map</span>
          <span>DRAG · SCROLL →</span>
        </div>

        <div className="flex min-h-[72vh] items-center overflow-x-auto px-6 py-12 md:h-[calc(100vh-73px)] md:overflow-hidden md:px-0 md:py-0">
          <motion.div
            style={{ x }}
            drag="x"
            dragElastic={0.08}
            dragConstraints={{ left: -1200, right: 220 }}
            className="flex cursor-grab gap-8 pr-8 active:cursor-grabbing md:gap-14 md:px-10 md:pr-[40vw] will-change-transform"
          >
            {items.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="group relative block shrink-0 w-[78vw] max-w-[720px] overflow-hidden text-left md:w-[54vw] lg:w-[46vw]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover brightness-[0.72] saturate-[0.75] transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:brightness-[0.58]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute left-5 top-5 label-xs text-white/80 md:left-7 md:top-7">
                    {item.label}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                    <h3 className="text-4xl leading-none tracking-[-0.045em] text-white md:text-6xl">
                      {item.title}
                    </h3>
                    <div className="mt-5 label-xs text-white/45 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                      View Section →
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
