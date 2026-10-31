"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { feedback, pick } from "@/content/portfolio";
import styles from "./Feedback.module.css";

const INTERVAL_MS = 4500;

export function Feedback() {
  const { t, lang } = useSite();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Walk the highlight across the cards while the section is on screen and nobody is hovering.
  useEffect(() => {
    if (paused || reduceMotion || feedback.length < 2) return;
    let inView = false;
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.25 });
    if (section.current) io.observe(section.current);
    const id = window.setInterval(() => {
      if (!inView || document.hidden) return;
      setActive((a) => (a + 1) % feedback.length);
    }, INTERVAL_MS);
    return () => { window.clearInterval(id); io.disconnect(); };
  }, [paused, reduceMotion]);

  return (
    <section ref={section} id="feedback" data-band="" data-screen-label="Feedback">
      <p className="kicker">04 / {t.secFeedback}</p>
      <h2 className={`section-title ${styles.heading}`}>{t.feedbackTitle}</h2>
      <div
        data-feedback-grid=""
        className={styles.grid}
        onMouseLeave={() => setPaused(false)}
      >
        {feedback.map((f, i) => (
          <figure
            key={i}
            className={styles.item}
            data-active={i === active ? "" : undefined}
            data-paused={paused || reduceMotion ? "" : undefined}
            onMouseEnter={() => { setActive(i); setPaused(true); }}
          >
            <span className={styles.mark} aria-hidden="true">”</span>
            <blockquote className={styles.quote}>{pick(f.quote, lang)}</blockquote>
            <figcaption className={styles.caption}>
              <span className={styles.name}>{pick(f.name, lang)}</span>
              <span>{pick(f.role, lang)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
