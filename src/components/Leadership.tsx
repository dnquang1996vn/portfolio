"use client";

import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, principles } from "@/content/portfolio";
import styles from "./Leadership.module.css";

export function Leadership() {
  const { t, lang } = useSite();
  return (
    <section data-band="ink" data-screen-label="How I lead">
      <div className={styles.grid}>
        <div>
          <p className="kicker">02 / {t.secLead}</p>
          <h2 className={`section-title ${styles.title}`}>
            {t.leadTitle1}
            <br />
            {t.leadTitle2}
          </h2>
          <p className={styles.body}>{t.leadBody}</p>
          <Link href="/about" className={`link-arrow ${styles.link}`}>{t.leadLink}</Link>
        </div>
        <ol className={styles.list}>
          {principles.map((p, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.itemTitle}>{pick(p.title, lang)}</h3>
                <p className={styles.itemBody}>{pick(p.body, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
