---
name: wording-check
description: Use when Quinn wants the wording of the portfolio reviewed or rewritten so it reads like a person wrote it, in English or Vietnamese. Covers site copy (src/content/translations.ts, src/content/portfolio.ts, reading.ts, page metadata) and existing posts. Triggers include "review wording", "nghe giống AI", "dịch word by word", "không tự nhiên", "sửa câu này", "audit wording", "kiểm tra tiếng Việt", or /wording-check. Not for writing a new post (use blog-writer) or for the Welle repos (their skill is wording-audit).
argument-hint: "[file, page or pasted string] [--vi | --en]"
allowed-tools: Bash(pnpm exec tsc:*), Bash(pnpm lint:*), Bash(pnpm dev:*), Bash(git status:*), Bash(git diff:*), Bash(curl:*)
---

# Wording check

Find text on the portfolio that reads as generated or as translated, and rewrite it the way
Quinn would say it. Three references carry the rules:

- `references/vi-natural.md`: Vietnamese that mirrors English. Read it before touching any VI string.
- `../blog-writer/references/anti-slop.md`: the AI patterns, for both languages.
- `../blog-writer/references/style-guide.md`: Quinn's voice and what never goes in a post.

## Steps

1. **Collect.** With no argument, take every user-facing string in `src/content/translations.ts`,
   `src/content/portfolio.ts`, `src/content/reading.ts`, the `metadata` exports under `src/app/`,
   and the posts under `src/content/posts/`. With an argument, take only that.
2. **Check each language on its own.** Read the VI string without looking at the EN one and ask:
   would a Vietnamese dev say this to a colleague? Then check it still says the same thing as
   the EN. Run the patterns in `anti-slop.md` and the table in `vi-natural.md`.
3. **Rewrite by meaning.** Say what the sentence is for, then write that in the target language.
   Keep every fact; add none. A string that sits in a fixed slot (hero body, card caption,
   button, headline) keeps roughly its length, so compare character counts with the old one.
4. **Show before changing a slogan.** Hero headline, hero body, card caption and section titles
   are Quinn's own lines. Propose the new text and wait for a yes. Other strings can be changed
   directly.
5. **Report.** One table: where, before, after. Strings that pass are not listed.
6. **Review on the page, not in the file.** `pnpm exec tsc --noEmit`, then run `pnpm dev`,
   screenshot the whole page (`/vi` and `/en`, plus any other page you touched) and read every
   changed string where it sits. A string is not done until it has been read in place. For each:
   - What is this slot for? A headline, section title or CTA line must still hook: short, with
     rhythm, something a reader remembers. Making it "plain" is a regression. Body text and
     helper text are where plain wins.
   - Does it fit what is around it: the kicker above, the cards below, the button next to it?
     Is the same thing called the same word on this screen (build, team)?
   - Does it still mean what the EN line means, and what the old line meant?
   - Does it wrap badly, leave one orphan word on a line, or overflow the card?
   Report what you saw on the page, with the lines you would still change.

## Rules

- Never change a fact, a number, a name or a compliance claim to make a sentence flow.
  Healthcare and HIPAA text: say in the report which sentences changed so Quinn can check them.
- Leave the feedback quotes alone; they are other people's words.
- VI is not a translation of EN. The two may differ in sentence count and order as long as
  they carry the same facts.
- Pronouns: site copy uses "tôi", posts from November 2026 on use "mình". Do not switch one to
  the other unless asked.
- Say "team", not "đội". Keep tech terms in English in VI (deploy, release, spec, review, lead).
- Do not commit. Quinn edits the same checkout.
