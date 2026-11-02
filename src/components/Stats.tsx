import { getLocale } from "next-intl/server";
import { pick, stats } from "@/content/portfolio";
import { CountUp } from "./CountUp";
import styles from "./Stats.module.css";

export async function Stats() {
  const lang = await getLocale();
  return (
    <section data-screen-label="Stats" className={styles.section}>
      <div data-stats="" className={`card ${styles.grid}`}>
        {stats.map((stat) => (
          <div key={stat.value + stat.suffix} className={styles.stat}>
            <p className={styles.value}>
              <CountUp value={stat.value} decimals={stat.decimals} />
              <span className={styles.suffix}>{stat.suffix}</span>
            </p>
            <p className={styles.label}>{pick(stat.label, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
