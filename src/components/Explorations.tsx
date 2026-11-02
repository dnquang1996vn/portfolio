import { Link } from "@/i18n/Link";
import { getLocale, getTranslations } from "next-intl/server";
import { explorations, pick, type ExplorationIcon } from "@/content/portfolio";
import { Cpu, Layers, Shield } from "./Icons";
import styles from "./Explorations.module.css";

const ICONS: Record<ExplorationIcon, typeof Shield> = { shield: Shield, cpu: Cpu, layers: Layers };

export async function Explorations() {
  const t = await getTranslations();
  const lang = await getLocale();
  return (
    <section data-band="" data-screen-label="Current focus">
      <div className="section-head">
        <div>
          <p className="kicker">03 / {t("secFocus")}</p>
          <h2 className="section-title">{t("focusTitle")}</h2>
        </div>
      </div>
      <div className={styles.grid}>
        {explorations.map((e) => {
          const Icon = ICONS[e.icon];
          return (
            <Link key={e.href} href={e.href} className={`card ${styles.card}`}>
              <span className={styles.icon}><Icon /></span>
              <h3 className={styles.title}>{pick(e.title, lang)}</h3>
              <p className={styles.body}>{pick(e.body, lang)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
