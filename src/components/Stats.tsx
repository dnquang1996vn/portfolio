"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { useCountUp } from "@/hooks/useCountUp";
import { pick, stats, type Stat } from "@/content/portfolio";
import styles from "./Stats.module.css";

function StatCard({ stat }: { stat: Stat }) {
  const { lang } = useSite();
  const ref = useCountUp<HTMLSpanElement>(stat.value, stat.decimals);
  return (
    <div className={styles.stat}>
      <p className={styles.value}>
        <span ref={ref} className={styles.number}>0</span>
        <span>{stat.suffix}</span>
      </p>
      <p className={styles.label}>{pick(stat.label, lang)}</p>
      <p className={styles.detail}>{pick(stat.detail, lang)}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section data-screen-label="Stats" data-band="" data-stats="" className={styles.grid}>
      {stats.map((s) => <StatCard key={s.value + s.suffix} stat={s} />)}
    </section>
  );
}
