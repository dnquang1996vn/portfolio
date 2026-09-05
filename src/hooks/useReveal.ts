"use client";

import { useEffect } from "react";

const SELECTOR =
  "section[data-screen-label] > *, [data-timeline] > [data-job-row], [data-skill-grid] > *, [data-feedback-grid] > *, [data-blog-grid] > *, [data-stats] > *";
const CONTAINERS = "[data-timeline], [data-skill-grid], [data-feedback-grid], [data-blog-grid], [data-stats]";

/**
 * Scroll-reveal, ported from the design: marks eligible elements with `data-reveal`,
 * staggers siblings by 70ms and flips `is-in` when they intersect the viewport.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const mark = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.matches(CONTAINERS)) return;
        seen.add(el);
        if (reduce) return;
        const parent = el.parentElement;
        const sib = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--d", `${Math.min(sib, 6) * 70}ms`);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
          requestAnimationFrame(() => el.classList.add("is-in"));
        } else {
          io.observe(el);
        }
      });
    };

    mark();
    const mo = new MutationObserver(mark);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
