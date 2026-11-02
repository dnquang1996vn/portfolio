import { Link } from "@/i18n/Link";
import { getTranslations } from "next-intl/server";
import { projects } from "@/content/portfolio";
import { FeaturedProject } from "./FeaturedProject";

export async function Work() {
  const t = await getTranslations();
  return (
    <section id="projects" data-screen-label="Selected work">
      <div className="section-head">
        <div>
          <p className="kicker">01 / {t("secWork")}</p>
          <h2 className="section-title">{t("workTitle")}</h2>
        </div>
        <Link href="/projects" className="link-arrow">{t("allProjects")}</Link>
      </div>
      <FeaturedProject project={projects[0]} />
    </section>
  );
}
