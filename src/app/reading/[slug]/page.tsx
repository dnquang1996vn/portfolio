import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingDetail } from "@/components/reading/ReadingDetail";
import { pick } from "@/content/portfolio";
import { getReadingItem, reading } from "@/content/reading";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return reading.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getReadingItem(slug);
  if (!item) return {};
  const title = `${item.title} — notes by Quinn Do`;
  const description = pick(item.verdict, "en");
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: [{ url: item.cover }] },
  };
}

export default async function ReadingItemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getReadingItem(slug);
  if (!item) notFound();

  const more = [...reading]
    .filter((r) => r.slug !== slug)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 4);

  return (
    <main id="main" className="page">
      <ReadingDetail item={item} more={more} />
    </main>
  );
}
