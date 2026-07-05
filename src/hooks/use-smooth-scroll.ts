import { useEffect } from "react";
import Lenis from "lenis";

// ─────────────────────────────────────────────────────────────────────────────
// 全局 Lenis 实例 — 单例模式
// 覆盖层可以通过 stop()/start() 控制平滑滚动
// ─────────────────────────────────────────────────────────────────────────────

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useSmoothScroll() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenisInstance!.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenisInstance!.destroy();
      lenisInstance = null;
    };
  }, []);
}
