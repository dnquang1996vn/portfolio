"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { credentials, pick } from "@/content/portfolio";
import styles from "./Credentials.module.css";

export function Credentials() {
  const { t, lang } = useSite();
  return (
    <section data-screen-label="Credentials">
      <div className="section-head">
        <div>
          <p className="kicker">05 / {t.secCredentials}</p>
          <h2 className="section-title">{t.credentialsTitle}</h2>
        </div>
      </div>
      <ul className={styles.list}>
        {credentials.map((c, i) => (
          <li key={i} className={styles.item}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{pick(c.title, lang)}</span>
            <span className={styles.detail}>{pick(c.detail, lang)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
