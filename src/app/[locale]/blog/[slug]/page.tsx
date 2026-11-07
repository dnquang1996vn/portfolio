import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/ArticleView";
import { ArticleEngagement, ArticleEngagementFallback } from "@/components/blog/ArticleEngagement";
import { loadArticle } from "@/content/articles";
import { pick, posts } from "@/content/portfolio";
import { alternates } from "@/i18n/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { slug, locale } = await params;
  const lang = locale === "vi" ? "vi" : "en";
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const title = pick(post.title, lang);
  return {
    title: `${title} — Quinn Do`,
    description: pick(post.summary, lang),
    alternates: alternates(`/blog/${slug}`),
    openGraph: { title, description: pick(post.lede, lang), type: "article", images: [{ url: post.image }] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug, locale } = await params;
  const index = posts.findIndex((p) => p.slug === slug);
  const Body = index === -1 ? undefined : await loadArticle(slug, locale === "vi" ? "vi" : "en");
  if (!Body) notFound();

  const post = posts[index];
  const prev = index > 0 ? posts[index - 1] : null;
  // The three posts after this one, wrapping around, so every article suggests more reading.
  const more = Array.from({ length: Math.min(3, posts.length - 1) }, (_, i) => posts[(index + 1 + i) % posts.length]);

  return (
    <>
      <main id="main" className="page">
        <ArticleView
          post={post}
          Body={Body}
          prev={prev}
          more={more}
          engagement={
            <Suspense key="engagement" fallback={<ArticleEngagementFallback />}>
              <ArticleEngagement post={post} />
            </Suspense>
          }
        />
      </main>
    </>
  );
}
