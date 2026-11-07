## Payment code I never read

At the time I was using auto merge: the agent wrote the tests, wrote the code, and merged once the pipeline was green. The ticket was a fix to some payment logic. I did not look at what it wrote, because the tests passed and I was busy with something else.

By the time a user reported a bug, a long time had passed. I opened the pull request again, read the test cases, and realised I did not fully understand what they were checking. My first thought was: I'm screwed.

## 99% of the code is not 99% of the work

Looking back, typing the code was never the hard part. The hard part is knowing what correct means, then being able to check it. That time I skipped exactly that part.

In my notes I keep a table like this:

| Got cheaper | Got more expensive |
| --- | --- |
| Writing CRUD and boilerplate | Turning a vague request into a correct spec |
| Remembering APIs and syntax | Deciding architecture and trade-offs |
| Writing tests by hand | Designing how to verify |
| Finishing each task fast | Running safely in production |
|  | Knowing the domain deeply |

The right column used to be the job of architects and tech leads. The difference now is that it arrives much earlier in a career, and every developer who uses AI has to do it.

## A payment webhook that looks fine

The code below is not the code from that time. It is an example of the same kind: payment logic that reads well and passes a happy-path test. Try to find what is wrong before reading on.

```ts
app.post("/webhooks/payment", async (req, res) => {
  const event = req.body;
  if (event.type === "payment.succeeded") {
    const order = await db.orders.find(event.data.orderId);
    await db.orders.update(order.id, { status: "paid" });
    await mailer.sendReceipt(order.email);
  }
  res.sendStatus(200);
});
```

There are at least four problems:

1. No signature check, so anyone who knows the URL can send a fake event.
2. Not idempotent. Providers retry on timeouts, and the customer gets two receipts.
3. No guard on the status change, so a late event can overwrite an order that was refunded.
4. The email goes out before the 200. A slow email means a timeout, a retry, and problem 2 again.

None of these is a syntax error. You only see them if you know how webhooks behave in the wild. The tests the AI wrote alongside still pass, because the tests and the code came from the same understanding and share the same blind spots.

## “But the AI knows this too”

Ask a model about webhook pitfalls and it will list all four. But it did not raise them on its own, and I did not ask, because I did not know they existed. You cannot prompt for something you do not know is there.

Writing a skill or a checklist so the AI checks itself helps with part of it. To me, a skill only needs to be reasonable, not perfect. But knowing what reasonable looks like still takes someone who understands the problem.

And when the payment flow breaks, I am still the one who gets asked.

## When I ran many agents at once

For a while I ran several agents in parallel, one task each. I genuinely thought my productivity was high.

In practice I was jumping between tasks all day. There was so much context switching that nothing stuck, and everything I did was shallow. The payment fix that merged itself came from that period.

Now I work differently:

- I review the spec and the scenarios before the AI writes code. Fixing things there is far cheaper than fixing them in the final diff.
- I implement in thin slices, each starting with a failing test, and the AI may not change a test I have approved.
- I keep one deep task at a time. Only independent, low-risk work runs in parallel.
- The AI waits for me. I batch its feedback and go through it at set times.

Tasks are also sorted by risk. Low-risk work runs as automatically as it can. Work like payment logic gets a gate, and no more auto merge.

It is slower, yes. So far nobody has complained.

## What to learn, and how

The fundamentals still have to be learned. Data modeling and state machines, system design (consistency, idempotency, retries, caching, failure modes), security and privacy, testing strategy, frontend architecture, and the business domain are all still there. Only the goal is different:

> Learn enough to know what to ask, and enough to notice when the answer is wrong.

The way I learn now is to use the AI as an opponent. I ask it to break my design, then check each failure scenario myself. Whatever I have understood, I turn into a skill so the AI checks it next time.

There are two traps. One is losing the skill: if you only approve and never do the hard part yourself, after a while you cannot judge the output any more. The other is chasing volume, many merge requests and little understanding, which is exactly what my many-agents period was.

## AI amplifies whoever uses it

There is a line in my notes: AI amplifies people who understand deeply into very strong engineers, and people who understand shallowly into engineers who are confidently wrong. With that payment fix, I was in the second group.

Have you ever merged code an AI wrote without fully understanding it?
