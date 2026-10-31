# Reading entry format

One entry = one object in `readingList` in `src/content/reading.ts` plus a cover under
`public/images/reading/`. Shown at `/reading` (list, newest `date` first) and
`/reading/<slug>` (notes). No markdown anywhere; every text is a plain string.

Insert the object right after `const readingList = [`. Order in the array does not matter
(the list sorts by `date`), but newest-first keeps the file readable.

```ts
  {
    slug: "deep-work",
    type: "book",                                   // "book" | "course" | "doc"
    title: "Deep Work",
    author: "Cal Newport",                          // authors, instructors, or the site
    year: "2016",                                   // first published
    cover: "/images/reading/deep-work.jpg",         // saved by scripts/lookup-book.mjs
    link: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/",
    blurb: P(
      "Cal Newport's case that focused, distraction-free work is the rare skill that still pays.",
      "Cal Newport lập luận rằng làm việc tập trung, không xao nhãng là kỹ năng hiếm vẫn được trả giá cao.",
    ),
    tags: ["productivity"],                         // 1–3 ids from readingTags
    date: "2024-03",                                // when Quinn finished it, YYYY-MM
    rating: 4,                                      // 1–5, from the note; ask if missing
    verdict: P(
      "For anyone whose calendar is full and whose output is not.",
      "Cho ai lịch thì kín mà việc làm ra thì không nhiều.",
    ),
    takeaways: [
      P("One takeaway in Quinn's words.", "Một ý rút ra, bằng lời của Quinn."),
      P("...", "..."),
    ],
  },
```

## Field rules

| Field | Rule |
|---|---|
| `slug` | kebab-case from the title, 2–5 words, unique in `readingList` |
| `type` | `book` for books, `course` for video or cohort courses, `doc` for docs, papers, long articles |
| `author` | people for books and courses; the site or organisation for docs |
| `year` | first publish year from Open Library or the course page; the edition read does not matter |
| `cover` | `/images/reading/<slug>.jpg`, portrait, about 2:3. Open Library `-L` size is fine |
| `link` | publisher or author page first, then the course platform, then Open Library. Never an affiliate link |
| `blurb` | one sentence, ≤ 25 words, what the thing is, in a neutral voice. From the publisher or Open Library description, rewritten, not pasted |
| `tags` | ids from the `readingTags` registry. Add a registry line only when nothing fits and it will apply again |
| `date` | from the note; else the Notion page's last-edited month; say which in the review |
| `rating` | from the note. If the note has none, pick one from the tone of the notes and flag it as a guess |
| `verdict` | who should read it and why, 1–2 sentences, Quinn's opinion |
| `takeaways` | 3–6 items, one sentence or two each, in Quinn's words from the Notion notes. Not a chapter summary |

## Tag registry

```ts
export const readingTags = {
  craft: P("Craft", "Nghề code"),
  architecture: P("Architecture", "Kiến trúc"),
  frontend: "Frontend",
  ai: "AI",
  productivity: P("Productivity", "Năng suất"),
  leadership: P("Leadership", "Lãnh đạo"),
  thinking: P("Thinking", "Tư duy"),
} as const satisfies Record<string, Bi>;
```

## Voice for verdict and takeaways

Same as the blog style guide (`.claude/skills/blog-writer/references/style-guide.md`): short
sentences, first person, concrete, no hype. Takeaways are what changed how Quinn works, not
what the book says. "Whoever allocates, releases" is a takeaway; "Chapter 4 covers resource
management" is not. Vietnamese is written from the idea, not translated from the English.

## Cover and blurb lookup

```bash
node .claude/skills/reading-note/scripts/lookup-book.mjs --title "Deep Work" --author "Cal Newport" --slug deep-work
```

Prints the top Open Library matches and saves the cover of the first (or `--pick N`) to
`public/images/reading/<slug>.jpg`. Check the match is the right book (title, author, year)
before trusting the cover. When Open Library has no description or no cover:

- blurb: WebSearch the title plus author, take the publisher's one-line description, rewrite it.
- cover: for a course or doc, fetch the page and use its `og:image`; save it with
  `curl -L <url> -o public/images/reading/<slug>.jpg`. Only use an image the publisher
  put on its own page.
