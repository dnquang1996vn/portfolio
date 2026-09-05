"use client";

import { useEffect } from "react";

const SELECTOR =
  "section[data-screen-label] > *, [data-timeline] > [data-job-row], [data-skill-grid] > *, [data-feedback-grid] > *, [data-blog-grid] > *, [data-stats] > *";
const CONTAINERS = "[data-timeline], [data-skill-grid], [data-feedback-grid], [data-blog-grid], [data-stats]";

/**
 * Scroll-reveal, ported from the design: marks eligible elements inside `rootSelector`
 * with `data-reveal`, staggers siblings by 70ms and flips `is-in` when they intersect.
 * Scoped to a root so client-side navigation to other pages is never affected, and
 * anything still hidden when the hook unmounts is revealed so no page is left blank.
 */
export function useReveal(rootSelector = "[data-page]") {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();
    const pending = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            pending.delete(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const mark = () => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
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
          pending.add(el);
          io.observe(el);
        }
      });
    };

    mark();
    const mo = new MutationObserver(mark);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      // Never leave elements stuck at opacity 0 after unmount.
      pending.forEach((el) => el.classList.add("is-in"));
      pending.clear();
    };
  }, [rootSelector]);
}
