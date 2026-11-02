import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ReadingList } from "@/components/reading/ReadingList";
import { pick } from "@/content/portfolio";
import { reading, readingTags, readingTypes, type ReadingType } from "@/content/reading";
import type { Lang } from "@/content/translations";
import { alternates } from "@/i18n/metadata";
import { localePath } from "@/i18n/navigation";
import { getLabels } from "@/i18n/labels";

export const metadata: Metadata = {
  title: "Reading — Quinn Do",
  description: "Books, courses and documents worth your time, with the few things from each that changed how I work.",
  alternates: alternates("/reading"),
};

/** "2025-06" → "Jun 2025" / "06/2025". */
function formatDate(date: string, lang: Lang) {
  const [y, m] = date.split("-");
  if (lang === "vi") return `${m}/${y}`;
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("en", { month: "short", year: "numeric" });
}

export default async function ReadingPage() {
  const lang = await getLocale();
  const rows = [...reading]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((item) => ({
      slug: item.slug,
      href: localePath(lang, `/reading/${item.slug}`),
      cover: item.cover,
      type: item.type,
      typeLabel: pick(readingTypes[item.type], lang),
      author: item.author,
      year: item.year,
      title: item.title,
      blurb: pick(item.blurb, lang),
      verdict: pick(item.verdict, lang),
      rating: item.rating,
      finished: formatDate(item.date, lang),
      tags: item.tags.map((id) => pick(readingTags[id], lang)),
    }));
  const used = (Object.keys(readingTypes) as ReadingType[]).filter((type) => reading.some((r) => r.type === type));
  const types = Object.fromEntries(used.map((type) => [type, pick(readingTypes[type], lang)]));
  return (
    <main id="main" className="page">
      <ReadingList
        items={rows}
        types={types}
        t={await getLabels([
          "readingAll", "readingFinished", "readingIntro", "readingKicker", "readingNotes", "readingOutOf", "readingRating", "readingTitle",
        ])}
      />
    </main>
  );
}
