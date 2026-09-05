"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { contact } from "@/content/portfolio";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useSite();
  return (
    <section id="contact" data-screen-label="Contact" className={styles.band}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <span className={styles.line}>{t.ctaLine1}</span>
          <span className={styles.line}>{t.ctaLine2}</span>
        </h2>
        <div className={styles.actions}>
          <a className="btn btn-inverse" href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className="btn btn-inverse" href={contact.phoneHref}>{contact.phone}</a>
        </div>
      </div>
    </section>
  );
}
