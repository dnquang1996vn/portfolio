#!/usr/bin/env node
/**
 * Look a book up on Open Library and download its cover.
 *
 *   node lookup-book.mjs --title "Deep Work" [--author "Cal Newport"] --slug deep-work [--pick 2]
 *
 * Prints JSON with the top matches (title, authors, first year, pages, work key, cover id)
 * and, for the chosen match (first by default, or --pick N, 1-based), the work description
 * when Open Library has one. Saves the cover to public/images/reading/<slug>.jpg relative
 * to the repo root (cwd). No API key needed. Exit 1 when nothing matches or no cover exists.
 */
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, v, i, all) => (v.startsWith("--") ? [...pairs, [v.slice(2), all[i + 1]]] : pairs), []),
);
if (!args.title || !args.slug) fail("--title and --slug are required");

const q = new URLSearchParams({ title: args.title, limit: "5", fields: "key,title,author_name,first_publish_year,number_of_pages_median,cover_i,edition_count" });
if (args.author) q.set("author", args.author);
const search = await (await fetch(`https://openlibrary.org/search.json?${q}`, { headers: { "User-Agent": "quinn-portfolio reading-note" } })).json();
const docs = (search.docs ?? []).map((d, i) => ({
  pick: i + 1,
  title: d.title,
  authors: d.author_name ?? [],
  year: d.first_publish_year,
  pages: d.number_of_pages_median,
  work: d.key,
  coverId: d.cover_i,
  editions: d.edition_count,
}));
if (docs.length === 0) fail(`no Open Library match for "${args.title}"`);

const chosen = docs[Number(args.pick ?? 1) - 1];
if (!chosen) fail(`--pick ${args.pick} is out of range (1-${docs.length})`);

let description = null;
try {
  const work = await (await fetch(`https://openlibrary.org${chosen.work}.json`)).json();
  const raw = work.description;
  description = typeof raw === "string" ? raw : raw?.value ?? null;
  if (description) description = description.split("\n")[0].trim().slice(0, 400);
} catch {}

let coverPath = null;
if (chosen.coverId) {
  const outDir = resolve("public", "images", "reading");
  if (!existsSync(outDir)) fail(`run from the repo root: ${outDir} does not exist`);
  const res = await fetch(`https://covers.openlibrary.org/b/id/${chosen.coverId}-L.jpg`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (!res.ok || bytes.length < 2000) fail(`cover ${chosen.coverId} is missing or a placeholder`);
  coverPath = `public/images/reading/${args.slug}.jpg`;
  writeFileSync(resolve(coverPath), bytes);
}

console.log(JSON.stringify({ matches: docs, chosen: { ...chosen, description, cover: coverPath } }, null, 2));

function fail(message) {
  console.error(`lookup-book: ${message}`);
  process.exit(1);
}
