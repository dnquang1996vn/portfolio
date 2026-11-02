import { getLocale, getTranslations } from "next-intl/server";
import { contact, pick, profile } from "@/content/portfolio";
import { ArrowUpRight } from "./Icons";
import styles from "./AboutProfile.module.css";

/** The bio column of the About page; the identity card lives in ProfileCard. */
export async function AboutProfile() {
  const t = await getTranslations();
  const lang = await getLocale();
  return (
    <section data-screen-label="Profile">
      <p className="kicker">01 / {t("secProfile")}</p>
      <div className={styles.bio}>
        {profile.bio.map((p, i) => <p key={i}>{pick(p, lang)}</p>)}
        <ul className={styles.links}>
          <li><a href={contact.linkedin} target="_blank" rel="noreferrer" className="link-arrow">LinkedIn <ArrowUpRight /></a></li>
          <li><a href={`mailto:${contact.email}`} className="link-arrow">{contact.email}</a></li>
        </ul>
      </div>
    </section>
  );
}
