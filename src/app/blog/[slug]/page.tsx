import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleView } from "@/components/blog/ArticleView";
import { articles } from "@/content/articles";
import { pick, posts } from "@/content/portfolio";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const article = articles[slug];
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
  const article = articles[slug];
  if (index === -1 || !article) notFound();

  const post = posts[index];
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <>
      <Nav />
      <div className="page">
        <ArticleView post={post} article={article} prev={prev} next={next} />
      </div>
      <Footer />
    </>
  );
}
