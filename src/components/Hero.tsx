import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/Link";
import { contact } from "@/content/portfolio";
import { typedWords } from "@/content/translations";
import { TypedWord } from "./TypedWord";
import { getLabels } from "@/i18n/labels";
import { ArrowUpRight } from "./Icons";
import { HeroLamp } from "./HeroLamp";
import { HeroScene } from "./HeroScene";
import { HeroClock } from "./HeroClock";
import styles from "./Hero.module.css";

export async function Hero() {
  const t = await getTranslations();
  const lang = await getLocale();

  return (
    <section id="about" data-screen-label="Hero" className={styles.section}>
      <div className={styles.hero} data-hero="">
        <div className={styles.text} data-hero-text="">
          <p className="kicker kicker-dot">{t("heroKicker")}</p>
          <h1 className={styles.title}>
            {t("heroPrefix")}{" "}
            <span className={styles.typedGroup}>
              <TypedWord words={typedWords[lang]} caretClassName={styles.caret} />,
            </span>
            <br />
            {t("heroTitle2")}
          </h1>
          <p className={styles.intro}>{t("heroIntro")}</p>
          <p className={styles.body}>{t("heroBody")}</p>
          <div className={styles.actions}>
            <Link className="btn btn-primary" href="/projects">{t("exploreWork")}</Link>
            <Link className="btn btn-ghost" href="/blog">{t("readBlog")}</Link>
          </div>
          <ul className={styles.links}>
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></li>
            <li><Link href="/contact">{t("buildTogether")}</Link></li>
          </ul>
        </div>

        <figure className={styles.figure} data-hero-figure="">
          <div className={styles.polaroid}>
            <div className={styles.imgWrap}>
              <Image
                src="/images/hero-desk.png"
                alt="Isometric diorama of Quinn Do at his desk workstation"
                width={1624}
                height={1637}
                loading="eager"
                fetchPriority="high"
                sizes="316px"
                className={styles.polaroidImg}
              />
              <HeroScene />
              <HeroClock />
              <HeroLamp t={await getLabels(["lampToggle"])} />
            </div>
            <p className={styles.name}>{t("heroName")}</p>
            <p className={`mono ${styles.role}`}>{t("heroRole")}</p>
          </div>
          <Link href="/about" className="link-arrow">{t("aboutMe")}</Link>
          <figcaption className={styles.caption}>{t("heroCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
