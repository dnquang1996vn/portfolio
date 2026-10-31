"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { useCountUp } from "@/hooks/useCountUp";
import { pick, stats, type Stat } from "@/content/portfolio";
import styles from "./Stats.module.css";

function StatCell({ stat }: { stat: Stat }) {
  const { lang } = useSite();
  const ref = useCountUp<HTMLSpanElement>(stat.value, stat.decimals);
  return (
    <div className={styles.stat}>
      <p className={styles.value}>
        <span ref={ref}>{stat.value.toFixed(stat.decimals)}</span>
        <span className={styles.suffix}>{stat.suffix}</span>
      </p>
      <p className={styles.label}>{pick(stat.label, lang)}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section data-screen-label="Stats" className={styles.section}>
      <div data-stats="" className={`card ${styles.grid}`}>
        {stats.map((s) => <StatCell key={s.value + s.suffix} stat={s} />)}
      </div>
    </section>
  );
}
