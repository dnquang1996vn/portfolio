"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import styles from "./HeroLamp.module.css";

// All geometry is in photo units: the 4:5 photo box is 320 x 400, so both SVGs share one
// coordinate space. The clamp grips the wall's top trim, which enters the crop at the left
// edge around y=36 and rises to the right at roughly 8.5 degrees.
const BODY = { w: 144, h: 96 }; // the button's slice of the photo: 45% wide, 24% tall
const PIVOT = { x: 92, y: 36 }; // head joint at the end of the upper arm
const REST = 8; // aims at the left monitors, clear of the chalkboard
const MIN = -70;
const MAX = 30;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * An architect's clamp lamp pinned to the wall trim inside the hero photo. The head follows
 * the cursor across the hero section (fine pointers only) and the lamp body is a button that
 * toggles the light. The cone is a second SVG under the body, screen-blended and clipped to
 * the photo, because blend modes inside one SVG never reach the image behind it.
 */
export function HeroLamp() {
  const { t } = useSite();
  const [on, setOn] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const zone = root.closest("section") ?? root;

    let frame = 0;
    let aim = REST;
    const flush = () => {
      frame = 0;
      root.style.setProperty("--aim", `${aim.toFixed(1)}deg`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onMove = (e: PointerEvent) => {
      const r = body.getBoundingClientRect();
      const px = r.left + (PIVOT.x / BODY.w) * r.width;
      const py = r.top + (PIVOT.y / BODY.h) * r.height;
      // The head's resting vector points straight down; a negative rotation swings it right.
      aim = clamp((-Math.atan2(e.clientX - px, e.clientY - py) * 180) / Math.PI, MIN, MAX);
      schedule();
    };
    const onLeave = () => {
      aim = REST;
      schedule();
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.lamp} data-on={on ? "" : undefined}>
      <div className={styles.light} aria-hidden="true">
        <svg viewBox="0 0 320 400" className={styles.cone}>
          <defs>
            <linearGradient id="hero-lamp-cone" gradientUnits="userSpaceOnUse" x1="0" y1="70" x2="0" y2="326">
              <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-lamp-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <g className={styles.head}>
            <polygon points="74,70 2,326 182,326 110,70" fill="url(#hero-lamp-cone)" filter="url(#hero-lamp-soft)" />
            <ellipse cx="92" cy="73" rx="26" ry="8" fill="#ffe6bf" filter="url(#hero-lamp-soft)" />
          </g>
        </svg>
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={on}
        aria-label={t.lampToggle}
        onClick={() => setOn((v) => !v)}
      >
        <svg ref={bodyRef} viewBox={`0 0 ${BODY.w} ${BODY.h}`} className={styles.body} aria-hidden="true" focusable="false">
          {/* Clamp, rotated to sit along the trim */}
          <g transform="rotate(-8.5 14 37)">
            <rect x="2" y="30" width="24" height="15" rx="3" />
            <rect x="11" y="45" width="6" height="7" rx="1.5" />
            <circle cx="21" cy="37.5" r="2.2" className={styles.screw} />
          </g>
          {/* Lower arm: up and forward, twin rods like an architect lamp */}
          <line x1="14" y1="29" x2="48" y2="0" className={styles.arm} />
          <line x1="16" y1="31.3" x2="50" y2="2.3" className={styles.rod} />
          <circle cx="14" cy="29" r="4" />
          {/* Upper arm: folds back down to the head */}
          <line x1="48" y1="0" x2="92" y2="36" className={styles.arm} />
          <circle cx="48" cy="0" r="4.5" />
          <g className={styles.head}>
            <line x1="92" y1="36" x2="92" y2="46" className={styles.arm} />
            <path d="M80 46h24l10 24H70z" />
            <ellipse cx="92" cy="70" rx="20" ry="3" className={styles.bulb} />
          </g>
          <circle cx="92" cy="36" r="4.5" />
        </svg>
      </button>
    </div>
  );
}
