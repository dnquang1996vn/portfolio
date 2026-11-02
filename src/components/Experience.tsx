import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { jobs, pick, type Job } from "@/content/portfolio";
import type { Lang } from "@/content/translations";
import { BulletList } from "./BulletList";
import { Timeline } from "./Timeline";
import styles from "./Experience.module.css";

function JobRow({ job, lang }: { job: Job; lang: Lang }) {
  return (
    <div data-job-row="" className={styles.row}>
      <span data-dot="" className={styles.dot} aria-hidden="true" />
      <div className={styles.when}>
        <p className={styles.period}>{pick(job.period, lang)}</p>
        <p className={styles.length}>{pick(job.length, lang)}</p>
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          <div className={styles.logo}>
            <Image
              src={job.logo}
              alt={job.company}
              width={36}
              height={36}
              style={{ objectFit: job.logoFit }}
            />
          </div>
          <h3 className={styles.company} style={{ color: job.brand }}>{job.company}</h3>
          <span className="tag tag-accent">{job.role}</span>
        </div>
        <p className={styles.about}>
          {pick(job.about, lang)}
          <a href={job.href} target="_blank" rel="noreferrer" className={styles.site}>{job.site}</a>
        </p>
        <p className={styles.headline}>{pick(job.headline, lang)}</p>
        <BulletList items={job.points} className={styles.points} />
      </div>
    </div>
  );
}

export async function Experience() {
  const t = await getTranslations();
  const lang = await getLocale();
  return (
    <section id="experience" data-screen-label="Experience">
      <p className="kicker">03 / {t("secJourney")}</p>
      <h2 className="section-title">{t("journeyTitle")}</h2>
      <Timeline className={styles.timeline}>
        {/* Scroll-linked fill over the spine. */}
        <span className={styles.progress} aria-hidden="true" />
        {jobs.map((job) => <JobRow key={job.company} job={job} lang={lang} />)}
      </Timeline>
    </section>
  );
}
