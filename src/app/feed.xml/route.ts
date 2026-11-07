import type { NextRequest } from "next/server";
import { pick, posts } from "@/content/portfolio";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the blog, in English. Absolute URLs come from the request origin. */
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const items = posts
    .map((p) => {
      const url = `${origin}/en/blog/${p.slug}`;
      // The guid keeps the pre-locale URL so feed readers do not see every post as new.
      return `    <item>
      <title>${escape(pick(p.title, "en"))}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${origin}/blog/${p.slug}</guid>
      <description>${escape(pick(p.lede, "en"))}</description>
      <category>${escape(pick(p.topic, "en"))}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Quinn Do — Blog</title>
    <link>${origin}/en/blog</link>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes from the codebase: architecture, compliance, performance and estimation, written from production.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
