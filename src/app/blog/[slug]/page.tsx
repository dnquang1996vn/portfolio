import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/ArticleView";
import { ArticleEngagement, ArticleEngagementFallback } from "@/components/blog/ArticleEngagement";
import { getArticle } from "@/content/articles";
import { pick, posts } from "@/content/portfolio";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const article = getArticle(slug);
  if (!post || !article) return {};
  const title = pick(post.title, "en");
  return {
    title: `${title} — Quinn Do`,
    description: pick(post.summary, "en"),
    openGraph: { title, description: article.en.lede, type: "article", images: [{ url: post.image }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = posts.findIndex((p) => p.slug === slug);
  const article = getArticle(slug);
  if (index === -1 || !article) notFound();

  const post = posts[index];
  const prev = index > 0 ? posts[index - 1] : null;
  // The three posts after this one, wrapping around, so every article suggests more reading.
  const more = Array.from({ length: Math.min(3, posts.length - 1) }, (_, i) => posts[(index + 1 + i) % posts.length]);

  return (
    <>
      <main id="main" className="page">
        <ArticleView
          post={post}
          article={article}
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
