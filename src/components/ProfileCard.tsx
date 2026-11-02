import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/Link";
import { contact, pick, profile } from "@/content/portfolio";
import { LinkedIn, Mail } from "./Icons";
import { getLabels } from "@/i18n/labels";
import { Portrait } from "./Portrait";
import styles from "./ProfileCard.module.css";

/** Sticky identity card for the About page: portrait, name, key facts and contact actions. */
export async function ProfileCard() {
  const t = await getTranslations();
  const lang = await getLocale();

  return (
    <aside data-screen-label="Profile card" className={styles.card} aria-label={t("secProfile")}>
      <div className={styles.identity}>
        <Portrait t={await getLabels(["close", "heroName", "heroRole", "viewPortrait"])} />
        <div className={styles.names}>
          <p className={styles.name}>{t("heroName")}</p>
          <p className={styles.native}>Đỗ Nhật Quang</p>
          <p className={styles.kicker}>{t("brandTagline")}</p>
        </div>
      </div>

      <dl className={styles.facts}>
        {profile.facts.map((f, i) => (
          <div key={i} className={styles.fact}>
            <dt className="mono">{pick(f.label, lang)}</dt>
            <dd>{pick(f.value, lang)}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <Link href="/contact" className={`btn btn-primary ${styles.primary}`}>
          <Mail /> {t("navContact")}
        </Link>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary btn-icon"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedIn />
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="btn btn-secondary btn-icon"
          aria-label={contact.email}
          title={contact.email}
        >
          <Mail />
        </a>
      </div>
    </aside>
  );
}
