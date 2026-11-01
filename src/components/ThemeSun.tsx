"use client";

import styles from "./ThemeSun.module.css";

export type SunDirection = "sunrise" | "sunset";

/**
 * A sun that crosses the page while the theme flips: straight up the middle for sunrise,
 * straight down for sunset. The page's own colours fade over the same 0.9s (see
 * `html[data-sun]` in globals.css), so the light changes as the sun travels.
 */
export function ThemeSun({ dir, onDone }: { dir: SunDirection; onDone: () => void }) {
  return (
    <div className={styles.flight} data-dir={dir} aria-hidden="true" onAnimationEnd={(e) => { if (e.target === e.currentTarget) onDone(); }}>
      <div className={styles.climb}>
        <svg viewBox="-50 -50 100 100" className={styles.sun}>
          <defs>
            <radialGradient id="theme-sun-disc" cx=".38" cy=".35" r=".7">
              <stop offset="0" stopColor="#fff7d6" />
              <stop offset=".55" stopColor="#ffd45a" />
              <stop offset="1" stopColor="#ff9a2e" />
            </radialGradient>
          </defs>
          <g className={styles.rays}>
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1="0" y1="-32" x2="0" y2="-44" transform={`rotate(${i * 30})`} />
            ))}
          </g>
          <circle r="24" fill="url(#theme-sun-disc)" />
        </svg>
      </div>
    </div>
  );
}
