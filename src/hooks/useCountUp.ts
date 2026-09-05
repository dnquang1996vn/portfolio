"use client";

import { useEffect, useRef } from "react";

/** Eased 1400ms count-up that starts the first time the element is 40% visible. */
export function useCountUp<E extends HTMLElement>(target: number, decimals = 0) {
  const ref = useRef<E>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const t0 = performance.now();
          const dur = 1400;
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const k = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * k).toFixed(decimals);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals]);

  return ref;
}
