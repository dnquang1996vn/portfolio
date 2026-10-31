"use client";

import Image from "next/image";
import { useSite } from "@/components/providers/SiteProvider";
import { jobs, pick, type Job } from "@/content/portfolio";
import { BulletList } from "./BulletList";
import styles from "./Experience.module.css";

function JobRow({ job }: { job: Job }) {
  const { lang } = useSite();
  return (
    <div data-job-row="" className={styles.row}>
      <span data-dot="" className={styles.dot} aria-hidden="true" />
      <div>
        <p className={styles.period}>{pick(job.period, lang)}</p>
        <p className={styles.length}>{pick(job.length, lang)}</p>
      </div>
      <div>
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

export function Experience() {
  const { t } = useSite();
  return (
    <section id="experience" data-screen-label="Experience">
      <p className="kicker">03 / {t.secJourney}</p>
      <h2 className="section-title">{t.journeyTitle}</h2>
      <div data-timeline="" className={styles.timeline}>
        {jobs.map((job) => <JobRow key={job.company} job={job} />)}
      </div>
    </section>
  );
}
