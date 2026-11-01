"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import styles from "./HeroLamp.module.css";

// All geometry is in photo units: the 4:5 photo box is 320 x 400, so both SVGs share one
// coordinate space. The clamp grips the wall's top trim, which enters the crop at the left
// edge around y=36 and rises to the right at roughly 8.5 degrees.
const BODY = { w: 144, h: 120 }; // the button's slice of the photo: 45% wide, 30% tall
const BASE = { x: 14, y: 29 }; // shoulder joint on the clamp; never moves
const HEAD_ORIGIN = { x: 92, y: 36 }; // the head is drawn around this joint and moved as a group
const L1 = 44.7; // lower arm, clamp to elbow
const L2 = 56.9; // upper arm, elbow to head joint
const REST_TARGET = { x: 66, y: 6 }; // at rest the arm stands tall and the head clears the clock
const REACH = { minX: 56, maxX: 134, minY: 0, maxY: 96 }; // where the head joint may be dragged
const REST = -17; // head aims at the left monitors
const MIN = -70;
const MAX = 30;
const DRAG_THRESHOLD = 3; // px of movement before a press becomes a drag instead of a click
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const f = (n: number) => n.toFixed(1);

type Pose = { ex: number; ey: number; px: number; py: number };

/** Two-link inverse kinematics: put the head joint at (tx, ty) and bend the elbow upward. */
function solve(tx: number, ty: number): Pose {
  let dx = tx - BASE.x;
  let dy = ty - BASE.y;
  const raw = Math.hypot(dx, dy);
  const d = clamp(raw, Math.abs(L1 - L2) + 2, L1 + L2 - 2);
  dx *= d / raw;
  dy *= d / raw;
  const a = Math.atan2(dy, dx);
  const bend = Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d));
  const up = { x: BASE.x + L1 * Math.cos(a - bend), y: BASE.y + L1 * Math.sin(a - bend) };
  const down = { x: BASE.x + L1 * Math.cos(a + bend), y: BASE.y + L1 * Math.sin(a + bend) };
  const e = up.y <= down.y ? up : down;
  return { ex: e.x, ey: e.y, px: BASE.x + dx, py: BASE.y + dy };
}
const REST_POSE = solve(REST_TARGET.x, REST_TARGET.y);

/**
 * An architect's clamp lamp pinned to the wall trim inside the hero photo. The head follows
 * the cursor across the hero section (fine pointers only), dragging the head repositions it
 * with the arm folding at the joints (every pointer type), and a tap toggles the light.
 * The cone is a second SVG under the body, screen-blended and clipped to the photo, because
 * blend modes inside one SVG never reach the image behind it.
 */
export function HeroLamp() {
  const { t } = useSite();
  const [on, setOn] = useState(true);
  const [pose, setPose] = useState<Pose>(REST_POSE);
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGSVGElement>(null);
  const poseRef = useRef(pose);
  const drag = useRef<{ id: number; offX: number; offY: number; startX: number; startY: number; moved: boolean } | null>(null);
  const lastPressMoved = useRef(false); // set per press, read by the click that follows it

  useEffect(() => {
    poseRef.current = pose;
  }, [pose]);

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
      if (drag.current) return; // the head is pressed or dragged; keep its aim steady
      const r = body.getBoundingClientRect();
      const px = r.left + (poseRef.current.px / BODY.w) * r.width;
      const py = r.top + (poseRef.current.py / BODY.h) * r.height;
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

  const toUnits = (e: ReactPointerEvent) => {
    const r = bodyRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * BODY.w, y: ((e.clientY - r.top) / r.height) * BODY.h };
  };
  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const u = toUnits(e);
    const p = poseRef.current;
    drag.current = { id: e.pointerId, offX: u.x - p.px, offY: u.y - p.py, startX: e.clientX, startY: e.clientY, moved: false };
    lastPressMoved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < DRAG_THRESHOLD) return;
    if (!d.moved) setDragging(true);
    d.moved = true;
    const u = toUnits(e);
    setPose(solve(clamp(u.x - d.offX, REACH.minX, REACH.maxX), clamp(u.y - d.offY, REACH.minY, REACH.maxY)));
  };
  const onPointerEnd = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    lastPressMoved.current = d.moved; // a click that follows a drag must not toggle
  };
  const onClick = () => {
    if (lastPressMoved.current) return;
    setOn((v) => !v);
  };

  // Head parts are drawn around the resting joint (92, 36) and moved as a group.
  const dx = pose.px - HEAD_ORIGIN.x;
  const dy = pose.py - HEAD_ORIGIN.y;
  const nx = (-(pose.ey - BASE.y) / L1) * 3; // offset for the second rod of the lower arm
  const ny = ((pose.ex - BASE.x) / L1) * 3;
  const headShift = `translate(${f(dx)} ${f(dy)})`;

  return (
    <div ref={rootRef} className={styles.lamp} data-on={on ? "" : undefined} data-dragging={dragging ? "" : undefined}>
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
          <g transform={headShift}>
            <g className={styles.head}>
              <polygon points="74,70 2,326 182,326 110,70" fill="url(#hero-lamp-cone)" filter="url(#hero-lamp-soft)" />
              <ellipse cx="92" cy="73" rx="26" ry="8" fill="#ffe6bf" filter="url(#hero-lamp-soft)" />
            </g>
          </g>
        </svg>
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={on}
        aria-label={t.lampToggle}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <svg ref={bodyRef} viewBox={`0 0 ${BODY.w} ${BODY.h}`} className={styles.body} aria-hidden="true" focusable="false">
          {/* Clamp, rotated to sit along the trim */}
          <g transform="rotate(-8.5 14 37)">
            <rect x="2" y="30" width="24" height="15" rx="3" />
            <rect x="11" y="45" width="6" height="7" rx="1.5" />
            <circle cx="21" cy="37.5" r="2.2" className={styles.screw} />
          </g>
          {/* Lower arm: up and forward, twin rods like an architect lamp */}
          <line x1={BASE.x} y1={BASE.y} x2={f(pose.ex)} y2={f(pose.ey)} className={styles.arm} />
          <line x1={f(BASE.x + nx)} y1={f(BASE.y + ny)} x2={f(pose.ex + nx)} y2={f(pose.ey + ny)} className={styles.rod} />
          <circle cx={BASE.x} cy={BASE.y} r="4" />
          {/* Upper arm: folds back down to the head */}
          <line x1={f(pose.ex)} y1={f(pose.ey)} x2={f(pose.px)} y2={f(pose.py)} className={styles.arm} />
          <circle cx={f(pose.ex)} cy={f(pose.ey)} r="4.5" />
          <g transform={headShift}>
            <g className={styles.head}>
              <line x1="92" y1="36" x2="92" y2="46" className={styles.arm} />
              {/* Owl ears poke up from the shade's corners */}
              <path d="M78 48L79 34L90 46.5z" />
              <path d="M106 48L105 34L94 46.5z" />
              <path d="M80 46h24l10 24H70z" />
              <ellipse cx="92" cy="70" rx="20" ry="3" className={styles.bulb} />
              {/* Owl face: eyes blink and glance; they close when the lamp is off */}
              <g className={styles.eye}>
                <circle cx="84" cy="57.5" r="5.5" className={styles.sclera} />
                <g className={styles.pupil}><circle cx="84" cy="57.5" r="2.6" /><circle cx="83" cy="56.5" r=".8" className={styles.glint} /></g>
              </g>
              <g className={styles.eye}>
                <circle cx="100" cy="57.5" r="5.5" className={styles.sclera} />
                <g className={styles.pupil}><circle cx="100" cy="57.5" r="2.6" /><circle cx="99" cy="56.5" r=".8" className={styles.glint} /></g>
              </g>
              <path d="M89.6 63.5h4.8L92 67.5z" className={styles.beak} />
            </g>
            <circle cx="92" cy="36" r="4.5" />
          </g>
        </svg>
      </button>
    </div>
  );
}
