import { Link } from "@/i18n/Link";
import { getTranslations } from "next-intl/server";
import { contact } from "@/content/portfolio";
import styles from "./Contact.module.css";

export async function Contact() {
  const t = await getTranslations();
  return (
    <section id="contact" data-band="" data-screen-label="Contact">
      <div className={styles.inner}>
        <p className="kicker">{t("ctaKicker")}</p>
        <h2 className={styles.title}>
          {t("ctaLine1")}
          <br />
          {t("ctaLine2")}
        </h2>
        <Link className={`btn btn-primary ${styles.cta}`} href="/contact">{t("letsTalk")}</Link>
        <p className={styles.note}>{t("ctaBody")}</p>
        <ul className={styles.details}>
          <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><a href={contact.phoneHref}>{contact.phone}</a></li>
        </ul>
      </div>
    </section>
  );
}
