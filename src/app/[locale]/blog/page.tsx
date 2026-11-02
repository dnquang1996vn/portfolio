import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { pick, posts, tags, type TagId } from "@/content/portfolio";
import { alternates } from "@/i18n/metadata";
import { localePath } from "@/i18n/navigation";
import { getLabels } from "@/i18n/labels";

export const metadata: Metadata = {
  title: "Blog — Quinn Do",
  description: "Notes from the codebase: architecture, compliance, performance and estimation, written from production.",
  alternates: alternates("/blog"),
};

export default async function BlogPage() {
  const lang = await getLocale();
  const cards = posts.map((p) => ({
    slug: p.slug,
    href: localePath(lang, `/blog/${p.slug}`),
    image: p.image,
    date: p.date,
    title: pick(p.title, lang),
    summary: pick(p.summary, lang),
    topic: pick(p.topic, lang),
    read: pick(p.read, lang),
    tags: [...p.tags],
  }));
  // Only tags that at least one post uses, in registry order, so the filter never shows an empty result.
  const used = (Object.keys(tags) as TagId[]).filter((id) => posts.some((p) => p.tags.includes(id)));
  const labels = Object.fromEntries(used.map((id) => [id, pick(tags[id], lang)]));
  return (
    <main id="main" className="page">
      <BlogIndex posts={cards} tags={labels} t={await getLabels(["blogIndexIntro", "blogIndexTitle", "filterAll", "secBlog", "tagsLabel"])} />
    </main>
  );
}
