"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { contact } from "@/content/portfolio";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useSite();
  return (
    <section id="contact" data-band="" data-screen-label="Contact">
      <div className={styles.inner}>
        <p className="kicker">{t.ctaKicker}</p>
        <h2 className={styles.title}>
          {t.ctaLine1}
          <br />
          {t.ctaLine2}
        </h2>
        <a className={`btn btn-primary ${styles.cta}`} href={`mailto:${contact.email}`}>{t.letsTalk}</a>
        <p className={styles.note}>{t.ctaBody}</p>
        <ul className={styles.details}>
          <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><a href={contact.phoneHref}>{contact.phone}</a></li>
        </ul>
      </div>
    </section>
  );
}
