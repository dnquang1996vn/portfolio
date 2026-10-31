# Post format

A post is two TypeScript entries linked by the slug, plus a cover PNG. No markdown, no MDX.

| What | Where |
|---|---|
| Metadata (title, summary, topic, read time, tags, cover) | `src/content/portfolio.ts` → `postList` |
| Body in both languages | `src/content/articles.ts` → `articles[slug]` |
| Cover | `public/images/cover-<short>.png`, 1800×1200 |
| Tag labels | `src/content/portfolio.ts` → `tags` registry |

`tsc` fails when a slug exists in `postList` but not in `articles` (the `Record<PostSlug, Article>`
type), and when a tag id is not in the registry. Run `pnpm exec tsc --noEmit` after editing.

The example below is invented; do not reuse its slug or text.

## 1. Metadata entry: top of `postList`

Newest first. Array order is the order on `/blog`, the home page, the footer and the
prev/next links, so the new entry goes **first**, right after `const postList = [`.

```ts
  {
    slug: "retries-that-do-not-pile-up", image: "/images/cover-retries.png", date: "2026",
    title: P("Retries that do not pile up", "Retry mà không chồng chất"),
    summary: P("A budget, some jitter and a breaker, in that order.", "Một ngân sách, một chút jitter và một breaker, theo đúng thứ tự."),
    topic: P("Architecture", "Kiến trúc"), read: P("4 min", "4 phút"),
    tags: ["architecture", "performance"],
  },
```

- `slug`: kebab-case, 3–6 words, unique. It is the URL and the key into `articles`.
- `image`: `/images/cover-<short>.png`; `<short>` is 1–3 words from the slug.
- `date`: current year as a string. Existing posts only carry the year.
- `title`, `summary`, `topic`: `P(en, vi)`. A plain string when both languages share it
  (`topic: "Frontend"`).
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
} as const satisfies Record<string, Bi>;
```

Pick from these first. Add a new line only when no existing tag fits and the tag would plausibly
apply to a second post; tell the user in the review that a tag was added. Keys are lowercase,
one word where possible; they appear in `/blog?tag=<key>`.

## 3. Body entry: `articles`

Insert right after `export const articles: Record<PostSlug, Article> = {` so the order matches
the metadata.

```ts
  "retries-that-do-not-pile-up": {
    en: {
      lede: "Two or three sentences. What the reader gets, in plain words.",
      body: [
        { type: "h2", text: "The problem" },
        { type: "p", text: "Short paragraph." },
        { type: "p", text: "Another short paragraph." },
        { type: "ul", items: ["One line.", "One line.", "One line."] },
        { type: "h2", text: "What I would do again" },
        { type: "p", text: "Closing paragraph." },
      ],
    },
    vi: {
      lede: "Hai ba câu. Người đọc nhận được gì, nói thẳng.",
      body: [
        { type: "h2", text: "Vấn đề" },
        { type: "p", text: "Đoạn ngắn." },
      ],
    },
  },
```

Block types: `p`, `h2`, `ul` (items), `ol` (items), `quote`, `code` (`lang`, `code`).
Text is a plain string: no markdown, no links, no HTML. Typographic quotes and `→` are fine.

A code sample longer than one line goes in a `const` above `export const articles`, named
`<thing>Code`, and is referenced from both languages:

```ts
const retryCode = `const delay = Math.min(cap, base * 2 ** attempt) * (0.5 + Math.random());
if (budget.spent() > budget.limit) throw new GiveUp(reason);`;
// ...
{ type: "code", lang: "ts", code: retryCode },
```

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
