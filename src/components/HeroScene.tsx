import styles from "./HeroScene.module.css";

// Everything is in photo units (the 4:5 photo is 320 x 400), measured from the PNG.
// Screens are parallelograms: left x, top-left y, width, height and the slope of the top edge.
// Each screen is inset from the measured panel (left, top, right, bottom) so the lines
// never touch the bezel; the left panel's bottom bezel sits higher than its edge suggests.
const SCREENS = [
  { x: 0, y: 117, w: 46, h: 52, slope: -8 / 46, dur: 11, delay: -3, pad: [2, 7, 5, 13] },
  { x: 48, y: 109, w: 72, h: 52, slope: -9 / 72, dur: 13, delay: -7, pad: [4, 6, 4, 7] },
  { x: 125, y: 97, w: 80, h: 48, slope: -2 / 80, dur: 10, delay: -1, pad: [3, 4, 3, 4] },
].map(({ pad: [l, t, r, b], ...s }) => ({ ...s, x: s.x + l, y: s.y + t + s.slope * l, w: s.w - l - r, h: s.h - t - b }));
const PLATE_POINTS: [number, number][] = [[100, 319], [210, 316], [211, 347], [100, 350]];
const PLATE = PLATE_POINTS.map((p) => p.join(",")).join(" ");
/** The plate shrunk toward its centre by `d` units on every side. */
function insetPlate(d: number) {
  const cx = PLATE_POINTS.reduce((a, p) => a + p[0], 0) / 4;
  const cy = PLATE_POINTS.reduce((a, p) => a + p[1], 0) / 4;
  const kx = 1 - (2 * d) / 110;
  const ky = 1 - (2 * d) / 31;
  return PLATE_POINTS.map(([x, y]) => `${(cx + (x - cx) * kx).toFixed(1)},${(cy + (y - cy) * ky).toFixed(1)}`).join(" ");
}
const PLATE_INNER = insetPlate(2.5);
const LED = { x: 315, y: 48, w: 5, h: 97 };
const SPEAKER = { x: 281, y: 150 };
const POWER = { x: 67.5, y: 269.5, r: 3.4 }; // the ring on the PC case's power button

// A fixed "file" of code lines: [indent, width, colour]. Deterministic so SSR and client match.
const ROW = 2.4;
const PALETTE = ["#8be9fd", "#50fa7b", "#ffb86c", "#f1fa8c", "#bd93f9", "#e9e9e9"];
const CODE: [number, number, number][] = [
  [0, 18, 4], [2, 26, 0], [2, 14, 5], [4, 30, 1], [4, 22, 2], [2, 10, 5], [0, 6, 4], [0, 20, 0],
  [2, 32, 3], [4, 16, 1], [4, 28, 5], [6, 12, 2], [4, 24, 0], [2, 8, 5], [0, 16, 4], [2, 30, 1],
  [2, 20, 2], [4, 34, 5], [4, 14, 0], [2, 26, 3], [0, 6, 4], [0, 22, 1],
];
const CYCLE = CODE.length * ROW;

function CodeColumn({ width }: { width: number }) {
  // Two copies stacked so the loop is seamless.
  return (
    <>
      {[0, 1].map((copy) =>
        CODE.map(([indent, w, c], i) => (
          <rect
            key={`${copy}-${i}`}
            x={3 + indent}
            y={copy * CYCLE + i * ROW + 2}
            width={Math.min(w, width - 6 - indent)}
            height={1.4}
            rx={0.7}
            fill={PALETTE[c]}
          />
        )),
      )}
    </>
  );
}

/** An eighth note: filled head, thin stem and flag. */
function Note() {
  return (
    <>
      <ellipse rx="2.3" ry="1.6" transform="rotate(-22)" className={styles.noteHead} />
      <path d="M2 -.6V-10.5c1.4.4 3.4 1.3 3.6 4.2" className={styles.noteStem} />
    </>
  );
}
/** Two beamed eighth notes. */
function Notes() {
  return (
    <>
      <ellipse rx="2.1" ry="1.5" transform="rotate(-22)" className={styles.noteHead} />
      <ellipse cx="7" cy="-1.5" rx="2.1" ry="1.5" transform="rotate(-22 7 -1.5)" className={styles.noteHead} />
      <path d="M1.8 -.5V-10l7.2-1.6v9.6" className={styles.noteStem} />
      <path d="M1.8 -10l7.2-1.6" className={styles.noteBeam} />
    </>
  );
}

/** Ambient life inside the hero photo: scrolling code on the screens, an RGB LED strip and
 *  name plate, and notes bobbing over the speaker. Purely decorative. */
export function HeroScene() {
  return (
    <>
      {/* Light-emitting layers: screen-blended so they only brighten the photo. */}
      <svg viewBox="0 0 320 400" preserveAspectRatio="none" className={styles.glow} aria-hidden="true">
        <defs>
          {SCREENS.map((s, i) => (
            <clipPath key={i} id={`hero-screen-${i}`}>
              <polygon points={`${s.x},${s.y} ${s.x + s.w},${s.y + s.w * s.slope} ${s.x + s.w},${s.y + s.w * s.slope + s.h} ${s.x},${s.y + s.h}`} />
            </clipPath>
          ))}
          <filter id="hero-halo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          {/* Keeps the halo off the plate face so the name stays crisp; a thin inner band remains. */}
          <mask id="hero-halo-outside" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="400">
            <rect width="320" height="400" fill="#fff" />
            <polygon points={PLATE_INNER} fill="#000" />
          </mask>
        </defs>
        {/* Warm halo, as if a lamp behind the name plate lit the wood around it. */}
        <polygon points={PLATE} className={styles.halo} filter="url(#hero-halo)" mask="url(#hero-halo-outside)" />
        {SCREENS.map((s, i) => (
          <g key={i} clipPath={`url(#hero-screen-${i})`}>
            <g transform={`translate(${s.x} ${s.y}) skewY(${(Math.atan(s.slope) * 180) / Math.PI})`}>
              <g className={styles.scroll} style={{ "--dur": `${s.dur}s`, "--delay": `${s.delay}s`, "--cycle": CYCLE } as React.CSSProperties}>
                <CodeColumn width={s.w} />
              </g>
            </g>
          </g>
        ))}
      </svg>

      <svg viewBox="0 0 320 400" preserveAspectRatio="none" className={styles.scene} aria-hidden="true">
        <defs>
          <filter id="hero-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* LED strip on the right wall: one solid colour at a time, stepping yellow, green, red. */}
        <g className={styles.led}>
          <rect x={LED.x - 5} y={LED.y - 2} width={LED.w + 10} height={LED.h + 4} rx={4} opacity=".5" filter="url(#hero-soft)" />
          <rect x={LED.x} y={LED.y} width={LED.w} height={LED.h} rx={2} opacity=".95" />
        </g>

        {/* Name plate: a faint accent ring with a bright streak running around it. */}
        <g className={styles.ring}>
          <polygon points={PLATE} className={styles.ringBase} />
          <polygon points={PLATE} pathLength={100} className={styles.ringGlow} filter="url(#hero-soft)" />
          <polygon points={PLATE} pathLength={100} className={styles.ringSweep} />
        </g>

        {/* Power button on the PC case: an RGB ring with a soft halo, colour cycling slowly. */}
        <g className={styles.power}>
          <circle cx={POWER.x} cy={POWER.y} r={POWER.r + 4} className={styles.powerHalo} filter="url(#hero-soft)" />
          <circle cx={POWER.x} cy={POWER.y} r={POWER.r} className={styles.powerRing} />
          <circle cx={POWER.x} cy={POWER.y} r={1} className={styles.powerDot} />
        </g>

        {/* Notes bobbing over the speaker. */}
        <g transform={`translate(${SPEAKER.x} ${SPEAKER.y})`} className={styles.notes}>
          {[
            { beamed: false, x: -10, y: -2, delay: "0s" },
            { beamed: true, x: 0, y: -8, delay: "-.8s" },
            { beamed: false, x: 14, y: -3, delay: "-1.6s" },
          ].map((n, i) => (
            <g key={i} transform={`translate(${n.x} ${n.y})`}>
              <g className={styles.note} style={{ animationDelay: n.delay }}>{n.beamed ? <Notes /> : <Note />}</g>
            </g>
          ))}
        </g>
      </svg>
    </>
  );
}
