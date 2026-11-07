# Anti-slop

AI text is recognisable less by any single word than by patterns repeated across a post. One
of these in a post is fine. The same one three times is the tell. Run this check on the VI and
the EN draft before the review, rewrite what it catches, then pick the 3–5 sentences that
still sound most generated for the "Câu nghe giống AI" list.

## Patterns to cut

| Pattern | Example (from an earlier draft) | Instead |
|---|---|---|
| "Not X, but Y" / "X, không phải Y" | "AI lấy đi phần gõ code, không lấy đi phần chịu trách nhiệm." | Keep at most one per post, the one carrying the central point. Say the rest plainly. |
| Chiasmus and mirrored pairs | "Mình không review, mình chỉ chuyển tiếp." / "Phi công, không phải hành khách." | Describe what actually happened. |
| A paragraph that ends on a maxim | "Biết được danh sách đó mới là việc của dev." | End on the fact or the event. Let the reader draw the line. |
| A question the next sentence answers | "Còn để AI review code AI thì sao? Mình cũng dùng..." | Make the statement. Real questions go to the reader at the end. |
| Perfect symmetry | Four list items of the same length and grammar; every paragraph three sentences. | Let lengths vary. A one-sentence paragraph is fine. |
| Everything resolved | Every objection answered neatly, no doubt left. | Keep one thing Quinn is still unsure about. |
| Vague stand-ins for detail | "một diff dài", "một lúc sau", "kha khá lỗi" used as filler | A real detail from the interview, or a `[CẦN CHI TIẾT]` marker. |
| The textbook example | The four classic webhook bugs anyone could list. | The bug Quinn actually hit, generalised only enough to hide the company. |
| Signposting | "Sự thật là...", "Điều quan trọng là...", "Here's the thing", "Let's dive in", "It's worth noting" | Delete the signpost and start with the point. |
| Inflated words | mạnh mẽ, vượt trội, then chốt, hành trình, landscape, crucial, robust, seamless, leverage | The plain word, or nothing. |
| Triplets everywhere | "nhanh, rẻ và đáng tin", three adjectives, three examples, three of everything | Use the number the material has. Often two, sometimes one. |
| Hedged balance | "Điều này có ưu điểm và nhược điểm..." | Take Quinn's side and say why. |
| Bold for emphasis | "Một task **deep** tại một thời điểm." | No bold in body text. |

## Signs it reads like Quinn

- A sentence only someone who was there could write: what the screen showed, what a
  colleague said, what time it was, what they tried first.
- An opinion that someone could disagree with.
- Some unevenness: a short aside, a paragraph that is longer because the story needs it.
- Phrases from Quinn's own interview answers or draft, kept close to how they said them.

## The check

For each paragraph, ask:

1. Could this paragraph appear in someone else's post on the same topic, unchanged? If yes,
   it needs a detail from Quinn or it goes.
2. Does it end on a slogan? Cut the last sentence and see whether the paragraph still works.
3. Does it match one of the patterns above? Count how many times each pattern appears in the
   whole post; more than one is a rewrite.
