"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./HeroClock.module.css";

/**
 * The painted dials in the hero photo, in photo units (the 4:5 photo is 320 x 400).
 * Each drawing below uses a unit circle, scaled onto its dial's ellipse.
 */
const DIALS = [
  // Wall clock above the monitors.
  { id: "wall", cx: 39.5, cy: 71.5, rx: 21, ry: 23.5, face: ["#bda792", "#a58d79"], className: undefined },
  // Cat alarm clock on the desk, beside the books.
  { id: "alarm", cx: 17, cy: 190.1, rx: 8.4, ry: 8.1, face: ["#f1ebdf", "#d9cfbd"], className: styles.alarm },
] as const;
const NUMERALS = Array.from({ length: 12 }, (_, i) => i + 1);

/** Where each hand should point right now, as negative animation delays. */
function offsets() {
  const now = new Date();
  const s = now.getSeconds();
  const m = now.getMinutes() * 60 + s;
  const h = (now.getHours() % 12) * 3600 + m;
  return { "--h": `-${h}s`, "--m": `-${m}s`, "--s": `-${s}s` } as CSSProperties;
}

/**
 * Live clock faces laid over the painted ones in the hero photo. Each covers the painted
 * hands with a dial in the same colour and runs real hands off the viewer's clock: each
 * hand is a CSS rotation whose negative delay sets it to the current time, so nothing
 * ticks in JS. Rendered only after mount, so the server never guesses a time.
 */
export function HeroClock() {
  const [vars, setVars] = useState<CSSProperties | null>(null);
  useEffect(() => {
    // Read the clock on the first frame after mount, so the hands start from the real time.
    const frame = requestAnimationFrame(() => setVars(offsets()));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!vars) return null;

  return (
    <svg viewBox="0 0 320 400" preserveAspectRatio="none" className={styles.clock} aria-hidden="true" style={vars}>
      <defs>
        {DIALS.map((d) => (
          <radialGradient key={d.id} id={`hero-dial-${d.id}`} cx=".4" cy=".35" r=".75">
            <stop offset="0" stopColor={d.face[0]} />
            <stop offset="1" stopColor={d.face[1]} />
          </radialGradient>
        ))}
      </defs>
      {DIALS.map((d) => (
        <g key={d.id} className={d.className} transform={`translate(${d.cx} ${d.cy}) scale(${d.rx} ${d.ry})`}>
          <circle r="1" fill={`url(#hero-dial-${d.id})`} />
          <circle r=".985" className={styles.rim} />
          {NUMERALS.map((n) => {
            const a = (n / 12) * Math.PI * 2;
            const major = n % 3 === 0;
            return (
              <g key={n}>
                <line
                  x1={Math.sin(a) * 0.86} y1={-Math.cos(a) * 0.86}
                  x2={Math.sin(a) * (major ? 0.94 : 0.92)} y2={-Math.cos(a) * (major ? 0.94 : 0.92)}
                  className={major ? styles.tickMajor : styles.tick}
                />
                <text x={Math.sin(a) * 0.68} y={-Math.cos(a) * 0.68} className={styles.numeral}>{n}</text>
              </g>
            );
          })}
          <line x1="0" y1=".1" x2="0" y2="-.5" className={styles.hour} />
          <line x1="0" y1=".12" x2="0" y2="-.74" className={styles.minute} />
          <line x1="0" y1=".2" x2="0" y2="-.82" className={styles.second} />
          <circle r=".06" className={styles.cap} />
        </g>
      ))}
    </svg>
  );
}
