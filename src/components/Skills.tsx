import { getLocale, getTranslations } from "next-intl/server";
import { pick, skills } from "@/content/portfolio";
import { getLabels } from "@/i18n/labels";
import { SkillsGrid } from "./SkillsGrid";
import styles from "./Skills.module.css";

export async function Skills() {
  const t = await getTranslations();
  const lang = await getLocale();
  const views = skills.map((s) => ({
    ...s,
    summary: pick(s.summary, lang),
    built: s.built.map((b) => pick(b, lang)),
    apply: s.apply.map((b) => pick(b, lang)),
  }));
  return (
    <section id="skills" data-band="" data-screen-label="Skills">
      <p className="kicker">02 / {t("secSkills")}</p>
      <h2 className={`section-title ${styles.heading}`}>{t("skillsTitle")}</h2>
      <SkillsGrid
        skills={views}
        t={await getLabels(["skillDetails", "close", "skillApply", "skillBuilt", "skillSince", "skillYear", "skillYears"])}
      />
    </section>
  );
}
