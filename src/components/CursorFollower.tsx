import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(el ? el.dataset.cursor || "View" : null);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, x: pos.x - 44, y: pos.y - 44 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.4 }}
          className="pointer-events-none fixed top-0 left-0 z-[90] w-22 h-22 hidden md:flex items-center justify-center rounded-full bg-foreground text-background label-xs uppercase"
          style={{ width: 88, height: 88 }}
        >
          {label} →
        </motion.div>
      )}
    </AnimatePresence>
  );
}
