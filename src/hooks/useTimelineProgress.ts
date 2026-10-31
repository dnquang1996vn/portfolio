"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scroll-linked progress for a vertical timeline. Writes `--progress` (0..1) on the
 * container and flags each `[data-job-row]` with `data-active`
 * once it has scrolled past the reading line (72% down the viewport).
 */
export function useTimelineProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-job-row]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.72;
      const p = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      el.style.setProperty("--progress", p.toFixed(4));
      for (const row of rows) {
        if (row.getBoundingClientRect().top <= line) row.setAttribute("data-active", "");
        else row.removeAttribute("data-active");
      }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}
