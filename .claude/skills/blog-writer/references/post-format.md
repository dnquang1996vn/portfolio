# Post format

A post is one metadata entry in TypeScript, one Markdown file per language, and a cover PNG.

| What | Where |
|---|---|
| Metadata (title, summary, lede, topic, read time, tags, cover) | `src/content/portfolio.ts` → `postList` |
| Body, Vietnamese | `src/content/posts/<slug>/vi.md` |
| Body, English | `src/content/posts/<slug>/en.md` |
| Cover | `public/images/cover-<short>.png`, 1800×1200 |
| Tag labels | `src/content/portfolio.ts` → `tags` registry |

The Markdown is compiled at build time by `@next/mdx` (see `next.config.ts`) with GitHub
Flavored Markdown and syntax highlighting. `pnpm exec tsc --noEmit` checks the metadata and the
tag ids; `pnpm build` fails when a post in `postList` has no Markdown file.

The example below is invented; do not reuse its slug or text.

## 1. Metadata entry: top of `postList`

Newest first. Array order is the order on `/blog`, the home page, the footer and the
prev/next links, so the new entry goes **first**, right after `const postList = [`.

```ts
  {
    slug: "retries-that-do-not-pile-up", image: "/images/cover-retries.png", date: "2026",
    title: P("Retries that do not pile up", "Retry mà không chồng chất"),
    summary: P("A budget, some jitter and a breaker, in that order.", "Một ngân sách, một chút jitter và một breaker, theo đúng thứ tự."),
    lede: P(
      "Two or three sentences. The situation, and why it mattered.",
      "Hai ba câu. Chuyện gì đã xảy ra, và vì sao nó quan trọng.",
    ),
    topic: P("Architecture", "Kiến trúc"), read: P("4 min", "4 phút"),
    tags: ["architecture", "performance"],
  },
```

- `slug`: kebab-case, 3–6 words, unique. It is the URL and the folder name under `posts/`.
- `image`: `/images/cover-<short>.png`; `<short>` is 1–3 words from the slug.
- `date`: current year as a string. Existing posts only carry the year.
- `title`, `summary`, `lede`, `topic`: `P(en, vi)`. A plain string when both languages share it
  (`topic: "Frontend"`).
- `lede`: shown under the title, and used as the RSS and Open Graph description. It is not
  repeated in the Markdown.
- `read`: EN word count of lede + body ÷ 200, rounded, minimum 3. `P("4 min", "4 phút")`.
- `tags`: 1–3 ids from the registry below.

## 2. Tag registry

```ts
export const tags = {
  architecture: P("Architecture", "Kiến trúc"),
  ai: "AI",
  compliance: P("Compliance", "Tuân thủ"),
  performance: P("Performance", "Hiệu năng"),
  frontend: "Frontend",
  leadership: P("Leadership", "Lãnh đạo"),
  tooling: P("Dev tooling", "Công cụ dev"),
  testing: P("Testing", "Kiểm thử"),
} as const satisfies Record<string, Bi>;
```

Pick from these first. Add a new line only when no existing tag fits and the tag would plausibly
apply to a second post; tell the user in the review that a tag was added. Keys are lowercase,
one word where possible; they appear in `/blog?tag=<key>`.

## 3. Body: `src/content/posts/<slug>/<lang>.md`

Plain Markdown, no frontmatter, no JSX, no title (the page renders the title and the lede from
the metadata). Start with the first `##` heading.

````md
## Retries that made the outage worse

Short paragraph. Another sentence.

| Before | After |
| --- | --- |
| Retry at once | Retry with jitter |
| No limit | A budget per minute |

```ts
const delay = Math.min(cap, base * 2 ** attempt) * (0.5 + Math.random());
if (budget.spent() > budget.limit) throw new GiveUp(reason);
```

- A list item, as a full sentence.
- Another one.

> One sentence that carries the whole post, at most once.
````

| Element | Renders as |
|---|---|
| `##`, `###` | Section heading, sub-heading. No `#`: the page already has the title. |
| Paragraph | Body text. |
| `-` / `1.` lists | Accent bullets / accent numbers. |
| `> quote` | Large pull quote with an accent bar. |
| Fenced code with a language (`ts`, `tsx`, `js`, `sql`, `bash`, `json`, `css`...) | Highlighted block with the language label and a copy button. Always give the language. |
| GFM table | Table with an accent header, scrolls sideways on a phone. 2–3 columns. |
| `` `inline code` `` | Inline code chip. |

Not used in posts: bold for emphasis, links (sources go in the PR body), images, raw HTML.
Typographic quotes and `→` are fine.

## 4. Cover

```bash
node .claude/skills/blog-writer/scripts/make-cover.mjs --slug retries \
  --kicker "ARCHITECTURE / 07" \
  --headline "Retries that do not pile up." --subline "Budget, jitter, breaker." \
  --steps "RETRY BUDGET|JITTER|CIRCUIT BREAKER|GIVE UP LOUDLY" \
  --footer "3 rules · 0 retry storms"
```

- `--slug` is the `<short>` part of the image path, not the post slug.
- Kicker: EN topic in caps + ` / NN`, NN = number of posts after this one, zero-padded.
- Steps: 3–5 labels in caps, ≤ 28 characters each. `--dropped "A|B"` adds a struck-through row.
- For a custom diagram write the SVG markup to a file and pass `--svg <file>` instead; see
  `templates/cover.html` for the classes and `design/blog-covers.html` for six examples.
- Rendering needs Google Chrome (exact fonts) or falls back to `rsvg-convert`.
