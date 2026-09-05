"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { feedback, pick } from "@/content/portfolio";
import styles from "./Feedback.module.css";

export function Feedback() {
  const { t, lang } = useSite();
  return (
    <section id="feedback" data-band="" data-screen-label="Feedback">
      <p className="kicker">{t.secFeedback}</p>
      <h2 className={`section-title ${styles.heading}`}>{t.feedbackTitle}</h2>
      <div data-feedback-grid="" className={styles.grid}>
        {feedback.map((f, i) => (
          <figure key={i} className={styles.item}>
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
