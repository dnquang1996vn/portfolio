import { getTranslations } from "next-intl/server";
import { projects } from "@/content/portfolio";
import { FeaturedProject } from "./FeaturedProject";

export async function ProjectsList() {
  const t = await getTranslations();
  const [featured, ...rest] = projects;
  return (
    <>
      <section data-screen-label="Featured">
        <p className="kicker">01 / {t("secFeatured")}</p>
        <FeaturedProject project={featured} detailed />
      </section>
      <section data-screen-label="More work">
        <p className="kicker">02 / {t("secMoreWork")}</p>
        {rest.map((p) => <FeaturedProject key={p.num} project={p} detailed />)}
      </section>
    </>
  );
}
