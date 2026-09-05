# QuinnDev portfolio

Single-page portfolio for Do Nhat Quang, ported from the Claude Design "Portfolio" project
(Modernist design system) to Next.js 16 (App Router, TypeScript, React 19).

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/portfolio.ts` | All page content: stats, jobs, skills, projects, feedback, posts. Bilingual strings are `{ en, vi }`. |
| `src/content/translations.ts` | UI strings (nav, section titles, CTA, footer) and the hero typewriter words. |
| `src/app/globals.css` | Design-system tokens (light + dark), buttons, tags, cards, nav, section layout, motion, breakpoints. |
| `src/components/*` | One component per section, each with a colocated CSS module. |
| `src/components/providers/SiteProvider.tsx` | EN/VI and light/dark state, persisted in `localStorage` (`portfolio-lang`, `portfolio-theme`). |
| `src/hooks/*` | Scroll reveal, stat count-up, typewriter. |
| `public/images/` | Portrait, project covers, blog covers, job logos, brand marks. |
| `design-source/` | The exported Claude Design project (ignored by git and eslint), kept for reference. |

## Content notes

- The three feedback quotes are placeholders from the design; replace them in `portfolio.ts`.
- Blog cards and "All posts" link to `#blog` until real posts exist.
- Skill logos load from `cdn.simpleicons.org`.
