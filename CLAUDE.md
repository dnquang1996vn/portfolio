@AGENTS.md

# QuinnDev portfolio

Personal portfolio + blog for Do Nhat Quang (Quinn Do). Next.js 16 App Router, React 19,
TypeScript, plain CSS (no UI framework, no CSS-in-JS, no Tailwind). Deployed on Vercel.

The visual design was ported from a Claude Design "Portfolio" project (Modernist design
system). The exported design lives in `design-source/` — gitignored and eslint-ignored,
kept locally for reference only. Don't assume it exists in a fresh clone.

## Commands

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build — the real check, run before pushing
pnpm start
pnpm lint           # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

pnpm is the package manager (`packageManager: pnpm@10.33.2`); don't use npm or yarn.
There is **no test suite and no typecheck script** — `pnpm build` is what catches type
errors (`tsc --noEmit` also works if you want types only). Always run `pnpm build` and
`pnpm lint` before committing; both must be clean.

## Architecture

### Rendering model

`next.config.ts` enables **`cacheComponents: true`**. Everything prerenders statically by
default; a component becomes dynamic only when it explicitly opts out and is wrapped in
`<Suspense>`. Exactly one place does this today:

- `src/components/blog/ArticleEngagement.tsx` — a server component that calls
  `await connection()` to leave the static prerender, reads/bumps the request-time
  counters, then renders the client `ArticleActions` bar with the numbers already in HTML.
- `src/app/blog/[slug]/page.tsx` builds that Suspense boundary and passes it **as a
  `ReactNode` prop** (`engagement`) into the client `ArticleView`. This is deliberate:
  a client component can't import a server component, so the server subtree is passed
  through as children/props. The element carries `key="engagement"` — don't drop it.

If you add anything that reads request-time data (cookies, headers, `Date.now()`,
uncached fetches), it needs the same treatment or the build will fail the prerender.

### Server vs client split

- `src/app/**` pages and `src/lib/**` are server-side. Pages are thin: metadata,
  `generateStaticParams`, `notFound()`, and composition of components.
- Every component under `src/components/**` is `"use client"` except
  `blog/ArticleEngagement.tsx` — they read language and theme from `useSite()`, which is
  context, so they have to run on the client.
- Routes: `/` (single-page portfolio), `/blog`, `/blog/[slug]`,
  `GET|POST /api/articles/[slug]`.

### State: language and theme

`src/components/providers/SiteProvider.tsx` owns both. Notable conventions:

- State lives in **`localStorage`**, exposed to React through `useSyncExternalStore` over
  a custom `portfolio-prefs-change` window event (plus `storage` for cross-tab). Do not
  convert this to `useState` + `useEffect` — the external-store shape is what keeps the
  server snapshot (`"en"` / `"light"`) stable and avoids setState-in-effect.
- Keys: `portfolio-lang` (`en` | `vi`), `portfolio-theme` (`light` | `dark`),
  `portfolio-liked` (JSON array of liked slugs, in `ArticleActions`).
- `src/app/layout.tsx` inlines a small blocking `bootScript` in `<head>` that applies the
  stored theme/lang to `<html>` before hydration so there's no flash. If you add another
  persisted preference that affects first paint, extend that script too.
- `suppressHydrationWarning` on `<html>` and `<body>` is intentional (boot script writes
  attributes; browser extensions mutate `<body>`).
- Every `localStorage` access is wrapped in try/catch — keep that.

### Content lives in TypeScript, not markdown/CMS

- `src/content/portfolio.ts` — all page data: `contact`, `stats`, `jobs`, `skills`,
  `projects`, `feedback`, `posts` (blog card metadata). Each collection has an exported
  interface right above it.
- `src/content/translations.ts` — UI chrome strings. `en` is the source of truth;
  `T = typeof en` forces `vi` to have every key. Add a key to `en` first, then `vi`.
  Also exports `typedWords` for the hero typewriter.
- `src/content/articles.ts` — long-form article bodies keyed by post slug, as structured
  `Block` unions (`p | h2 | ul | ol | quote | code`) rather than markdown, so there's no
  parser dependency. Rendered by the `BlockView` switch in `blog/ArticleView.tsx` — add a
  block variant there and the switch must handle it (TS exhaustiveness will tell you).

**Bilingual convention:** `Bi = string | { en, vi }` with the helper `P(en, vi)` to build
pairs and `pick(value, lang)` to read them. A plain string means "same in both languages"
(names, tech, dates). Never index a `Bi` directly — always go through `pick`.

Adding an article means touching **both** files: a `Post` in `posts` (slug, image, date,
title, summary, topic, read) and an entry in `articles` keyed by the same slug with `en`
and `vi` bodies. `generateStaticParams` derives routes from `posts`, and the article page
404s if either half is missing. Prev/next paging follows array order in `posts`.

### Engagement counters

`src/lib/engagement.ts` — views/likes per slug, one Redis hash `engagement:<slug>`.

- Backed by Upstash Redis (Vercel KV) when `KV_REST_API_URL`/`KV_REST_API_TOKEN` (or the
  `UPSTASH_REDIS_REST_*` equivalents) are set; otherwise falls back to an in-memory `Map`
  so local dev works with no store. The client is cached on `globalThis` to survive HMR.
- Seeded at `{ views: 323, likes: 36 }` on first touch via `hsetnx`.
- Locally, `vercel env pull .env.local` to use the real store.
- `src/app/api/articles/[slug]/route.ts` exposes `GET` (read, `Cache-Control: no-store`)
  and `POST { action: "view" | "like" | "unlike" }`. Slugs are validated against the
  `articles` map — keep that check on any new handler.
- The like button is optimistic client-side, with per-browser liked state in
  `localStorage`; there is no per-user auth, so counters are best-effort by design.

### Styling

- `src/app/globals.css` holds the design tokens and the shared component layer:
  `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-icon`, `.tag`, `.card`, `.nav`,
  `.page`, `.kicker`, `.section-title`, `.bullets`, `.grayscale`, plus motion and the two
  responsive breakpoints (1000px, 720px).
- Everything else is a **colocated CSS module** next to its component
  (`Hero.tsx` ↔ `Hero.module.css`). Compose as `` className={`card ${styles.card}`} `` —
  global class for the shared look, module class for the local layout.
- Theming is `html[data-theme="dark"]` overriding CSS custom properties on `:root`. Never
  hardcode a hex in a component; use `var(--color-*)`. `html[data-rounded]` is a second
  variant switch (on by default) for border radii.
- **`data-*` attributes are structural hooks**, not decoration: `data-page`,
  `data-screen-label`, `data-band`, `data-media`, `data-timeline`, `data-job-row`,
  `data-skill-grid`, `data-feedback-grid`, `data-blog-grid`, `data-stats`, `data-reveal`,
  `data-caret`. The scroll-reveal hook and the responsive overrides in `globals.css`
  select on them. Removing or renaming one silently breaks animation or layout.

### Hooks (`src/hooks/`)

- `useReveal()` — page-wide scroll reveal. Mounted once via `<PageEffects />` on the home
  page, scoped to `[data-page]`. Marks eligible children with `data-reveal`, staggers
  siblings 70ms, flips `is-in` on intersection, honours `prefers-reduced-motion`, and
  reveals anything still pending on unmount so a page is never left blank.
- `useCountUp(target, decimals)` — returns a ref; animates a stat number into view.
- `useTypewriter(words)` — hero heading cycle; re-runs when the language changes.

## Conventions

- Named exports for components (`export function Hero()`), default export only where the
  App Router requires it (pages, layouts).
- `@/*` path alias → `src/*`. Use it for cross-directory imports; relative imports within
  the same folder (`./BulletList`, `./ArticleActions.module.css`) are fine.
- TypeScript `strict` is on. Don't add `any`; the existing casts around Redis pipeline
  results are the only deliberate exceptions.
- Images go through `next/image` with explicit `width`/`height` and `sizes`. The one
  exception is Simple Icons logos in `Skills.tsx` (remote SVG, plain `<img>` with a
  targeted `eslint-disable-next-line @next/next/no-img-element` and a comment saying why).
  If you add an eslint-disable, keep it line-scoped and explain it.
- Comments explain *why* (the non-obvious constraint), not *what*. Match that density —
  the codebase is lightly commented and each comment earns its place.
- Accessibility is not optional here: `aria-label` on icon-only buttons, `aria-pressed`
  on toggles, `aria-hidden` on decorative SVG/spans, `alt=""` on decorative images.
- External links carry `target="_blank" rel="noreferrer"`.
- Skill logos load from `cdn.simpleicons.org` by slug.

## Gotchas

- `AGENTS.md` contains a `<!-- BEGIN:nextjs-agent-rules -->` block that `next dev`
  rewrites. If it shows up as an uncommitted change, commit it with your work rather than
  reverting it — reverting just recreates the diff.
- Next.js 16 route params are **Promises**: `async function Page({ params }: { params: Promise<Params> })`
  then `const { slug } = await params`. Same for `generateMetadata` and route handlers.
- Layout props use the generated `LayoutProps<"/">` type rather than a hand-written one.
- `.claude/`, `.agents/`, and `skills-lock.json` are gitignored (Vercel CLI agent-skills
  integration) — don't commit files there.
- The feedback quotes in `portfolio.ts` are attributed by role and company, not by name,
  pending permission from the people quoted. Keep it that way unless told otherwise.
