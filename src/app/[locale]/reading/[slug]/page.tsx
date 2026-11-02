import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingDetail } from "@/components/reading/ReadingDetail";
import { pick } from "@/content/portfolio";
import { getReadingItem, reading } from "@/content/reading";
import { alternates } from "@/i18n/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return reading.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/reading/[slug]">): Promise<Metadata> {
  const { slug, locale } = await params;
  const item = getReadingItem(slug);
  if (!item) return {};
  const title = locale === "vi" ? `${item.title} — ghi chép của Quinn Do` : `${item.title} — notes by Quinn Do`;
  const description = pick(item.verdict, locale === "vi" ? "vi" : "en");
  return {
    title,
    description,
    alternates: alternates(`/reading/${slug}`),
    openGraph: { title, description, type: "article", images: [{ url: item.cover }] },
  };
}

export default async function ReadingItemPage({ params }: PageProps<"/[locale]/reading/[slug]">) {
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
