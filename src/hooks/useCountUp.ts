"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Eased 1400ms count-up that starts the first time the element is 40% visible.
 *
 * The element must render `target` as its server text: crawlers, link previews and
 * readers without JS then see the real number instead of "0". The count-up only runs
 * when motion is allowed and the element starts below the fold; anything already on
 * screen at hydration keeps its value, so it never jumps from the final number to 0.
 */
export function useCountUp<E extends HTMLElement>(target: number, decimals = 0) {
  const ref = useRef<E>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = target.toFixed(decimals);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScreen = el.getBoundingClientRect().top < window.innerHeight;
    if (reduced || onScreen || typeof IntersectionObserver === "undefined") {
      el.textContent = final;
      return;
    }

    el.textContent = (0).toFixed(decimals);
    let raf = 0;
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
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [target, decimals]);

  return ref;
}
