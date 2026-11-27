## The main flow was right, the small things were not

I once let an AI agent build a whole large feature from the Figma file. It ran in one go, and the main part was correct.

The mistakes were small, and there were many: a wrong branch of logic, one step of the flow going the wrong way, UI a little off from Figma. I fed them back to the agent one at a time, and that took very long.

Fixing them myself was no faster. I had not written that code, so every small change meant tracking it down first.

## A process where the agent codes, reviews and tests on its own

I want the agent to run long sessions without stopping to ask me. For that it has to catch the small mistakes before they reach me, and I have to be able to look at the result quickly.

So I rearranged two things. The first is the test suite, so the agent has something to check itself against after every change. The second is a page inside the app that lays out every state of each component, so QA and I can open it and look. My part moved to the start: deciding what the feature does, how the flow goes, and which cases must exist.

## Tests in the shape of a trophy

For the agent to check itself, the tests have to be written and managed properly first. Spamming tests to raise coverage does not do that. High coverage with tests at the wrong layer runs slowly and still does not tell you whether the feature works. What I want is few tests that cover the real cases and run fast.

I split them along Kent C. Dodds's Testing Trophy: a thin unit layer, a thick layer of component tests, a thin end-to-end layer. He advises spending most of the effort, though not all of it, on the integration layer [^trophy]. On the frontend that layer is the component test: render the component with the real providers and the real router, and fake only the network.

| Layer | What it tells me | Cost |
| --- | --- | --- |
| Unit | One function computes correctly | Cheap, but blind to the screen |
| Component | With this data, what the screen shows | Moderate |
| End to end | Everything still works once joined | Slow, flaky |

On the frontend a unit test is too local. A component depends on props, context, the route and whatever data sits in the cache. Take it away from those and the test passes, but it says nothing about the screen the user sees.

End to end is the other extreme. It is the closest to real use, but it is slow and flaky, and a failure rarely points to the bug.

So each feature gets exactly one end-to-end test, following the main flow. Edge cases live in component tests. Unit tests are only for functions I pulled out on purpose: a formatter, a reducer, a date helper.

Our backend still follows the familiar pyramid: unit tests are the largest share, and the higher you go the fewer there are. A backend is fairly uniform. Its logic sits in functions with clear inputs and outputs that can be pulled apart, and the data has one source of truth, the database. Unit tests there run fast and in isolation [^vocke], while an end-to-end run has to bring up the services and the database, so the setup is expensive and you keep it small.

On the frontend the logic does not sit inside one function. It sits where components, state, the route and API data meet. Dodds himself says the trophy came from his experience as a UI engineer, and that for backends he had only considered monoliths [^classes].

## The agent writes the tests, I read the diff

The tests are now written by the agent and reviewed by me. I use Playwright Test Agents, which arrived in version 1.56 as three agents [^agents][^notes]. The planner walks through the app and writes a test plan in Markdown under `specs/`. The generator turns that plan into test files. The healer reruns failing tests and edits them until they pass.

The spec file is what I read most carefully. It is written in prose, so I can see which flow is missing and which case the agent misunderstood before any test code exists.

The healer is where I slow down. Try to spot what is wrong with this diff:

```diff
 test("cancel a pending visit", async ({ page }) => {
   await page.getByRole("button", { name: "Cancel" }).click();
-  await expect(page.getByText("Cancelled")).toBeVisible();
+  await expect(page.getByText("Pending")).toBeVisible();
 });
```

The test is green again. But a visit that still says "Pending" after someone pressed Cancel is a bug in the app, and the test was just edited to match the bug.

The prompt shipped with the healer says it does not ask the user questions and may fix assertions and expected values. It marks a test `test.fixme()` when it believes the app is the broken side [^healer].

I have found no measurement of how often it gets this wrong. Given how the prompt is written, I set two rules. Any healer diff that changes an expected value gets read by me. Every new `fixme` is a task a person has to look at.

One older rule stays: no retries to turn a red test green.

## The /design page: every state, one click away

Tests catch wrong logic. For UI that is off, Playwright has visual comparison (`toHaveScreenshot()`): the first run stores reference screenshots and later runs compare against them [^visual]. That catches a fair amount, but not everything.

Even if it caught everything, a person would still have to look. You only know whether the UI and UX feel right, and what could be better, by seeing it.

We have a long workflow where many conditions must hold before you reach the last screen. After it was built, QA reported that one part of the UI was wrong and needed a small adjustment.

The fix was quick. Getting back to that exact screen to check it was the expensive part: create the data, then walk through every step again.

Take a visit card. It has the states requested, live, on hold and cancelled, and each one renders differently depending on the data. Seeing them all meant creating a data set for each.

So I built a `/design` page inside the app, close to what Storybook does. Each component has a list of states, and each state is a fixture with its API calls mocked:

```ts
export const visitCardStates = {
  requested: { visit: visit({ status: "requested" }) },
  live: { visit: visit({ status: "live" }) },
  onHold: { visit: visit({ status: "on_hold" }) },
  cancelled: { visit: visit({ status: "cancelled" }) },
};
```

After a fix I open that page and see every state of the card at once, so I know the developer side is right before it moves on. QA should still test from the start on the real flow. This page does not replace that.

The list also tells me which states the card has and which conditions it depends on. For code the agent wrote, this is where I go back to understand the feature.

For mocking I use MSW (Mock Service Worker), an API mocking library for the browser and Node.js that intercepts requests at the network level [^msw]. I follow what MSW recommends: one set of handlers describing the successful responses, and every other state as an override on top [^mswh]. Those handlers can be reused between Node and the browser [^mswq], so the component tests and the `/design` page can share fixtures.

## Why not Storybook

I did weigh Storybook. Three things put me off: another server on another port, components that sometimes do not behave as they do in the real app, and API mocking that takes real work.

The second point is not only my impression. As of November 2026, Storybook's Next.js docs say stories are not server rendered, and server component support still sits behind the `experimentalRSC` flag. A page that imports Node-only modules crashes the Storybook build [^sbnext][^sbrsc].

My approach is not free either. React Cosmos renders fixtures through a route inside the Next.js app, and it still needs a second process for its own UI [^cosmos]. The `/design` page avoids that because it is only a route. In exchange I wrote it and I maintain it, and I get none of Storybook's addons.

Then again, Claude tokens are plentiful now, and maintaining it is not hard. What matters is that it raises quality.

## The agent uses the /design page too

The agent also uses the `/design` page to compare. I have it screenshot each state on the page with Playwright and compare it with Figma, so many visual mistakes are caught early.

Comparing images is not enough, so I still have the agent run the real workflow locally. Before there was a spec file, the agent tested itself badly, because it did not know all the flows. Now it uses the Playwright spec, opens a browser and tests for real, and it finds many interaction bugs.

One caution: after the agent has run everything, I still run it once myself. That is to verify, and also to know the feature. I only spend less time fixing small mistakes.

## What it costs

Mostly tokens. When a component changes, the `/design` page has to change with it.

We keep a one-way rule: the `/design` page follows the component. A component is never changed, and never given a prop, only so it can show up on the `/design` page.

It does cost extra tokens, but not many. What matters is that the result is correct.

## What you can do tomorrow

- For each feature, write exactly one end-to-end test for the main flow, and push edge cases down into component tests.
- Read the spec file before the agent writes any test.
- Filter the healer's diffs: every changed expected value and every `fixme` gets a person's eyes.
- Pick the component with the most states and lay all of them out on one page inside the app.

The last time you had to fix a feature an agent wrote, how long did it take to get back to the screen you needed to see?

## References

[^vocke]: Ham Vocke, [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), 2018.
[^trophy]: Kent C. Dodds, [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
[^classes]: Kent C. Dodds, [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications), 2021.
[^agents]: Playwright, [Test Agents](https://playwright.dev/docs/test-agents).
[^notes]: Playwright, [Release notes, version 1.56](https://playwright.dev/docs/release-notes).
[^healer]: Playwright, [healer agent prompt, 1.64.1](https://unpkg.com/playwright@1.64.1/lib/agents/playwright-test-healer.agent.md).
[^visual]: Playwright, [Visual comparisons](https://playwright.dev/docs/test-snapshots).
[^msw]: Mock Service Worker, [Introduction](https://mswjs.io/docs/).
[^mswh]: Mock Service Worker, [Structuring handlers](https://mswjs.io/docs/best-practices/structuring-handlers).
[^mswq]: Mock Service Worker, [Quick start](https://mswjs.io/docs/quick-start).
[^sbnext]: Storybook, [Storybook for Next.js with Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite).
[^sbrsc]: Storybook, [Storybook for React Server Components](https://storybook.js.org/blog/storybook-react-server-components/), 2023.
[^cosmos]: React Cosmos, [Next.js](https://reactcosmos.org/docs/getting-started/next).
