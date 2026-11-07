## The question that decides everything

Every test is a trade: confidence that the feature works, against the cost of writing, running and fixing it. The confidence side has a simple rule. The more a test resembles how the software is used, the more it tells me. The cost side has one too: a red test helps nobody until it leads to a fix, so I judge a test by how fast it points at the cause.

So before writing a test I ask where the knowledge lives. If a type or a lint rule can prove it, it is not a test. If it is a rule that holds on its own, it is a unit test. If it only exists when several things are wired together, it goes higher, and higher is rarer.

## Backend: the knowledge is isolated

Most backend logic is a rule with clean inputs and outputs. Pricing, eligibility, date arithmetic, which clinician a visit is routed to. The dependencies are injected, so the function runs alone in milliseconds with no database and no network. That is where the weight of the backend suite sits.

The service boundary gets one more layer. HTTP in, database out, against a real database in a container, because faking my own persistence only tests the fake. Anything that talks to another team’s system is a contract check, not a test that depends on their uptime.

This is the classic pyramid, and it fits because backend units carry logic. When something fails, the test names the rule that broke.

## Frontend: the component is the unit

A frontend unit is a different animal. A component is a function of its props and of its context, the route, the viewport, the locale and whatever the server cache holds. Isolate it from all of that and the test proves very little. Most frontend bugs are two of those sources of state disagreeing.

So on the frontend I test the component with its real providers and real router, and fake only the network. Given this data, what does the screen show, and what happens when the user clicks. That is enough interaction to catch the bugs that actually ship.

Unit tests still exist, but only for functions I pulled out on purpose: a formatter, a reducer, a date helper. The rest of the suite is component tests, so the shape is a trophy rather than a pyramid. Same trade, different system.

## End to end: expensive, so one happy path

End-to-end tests are slow, flaky, and vague when they fail. I keep them anyway, because some claims only exist when everything is wired together: login, routing, the proxy, a checkout that crosses two services. I just keep the list short.

Each feature gets one end-to-end test on its main path. It creates its own data through the API, unique per run, and cleans up on success. That is the test that proves the real database, the real auth and the real screen agree with each other.

- Not the edge cases. Those are already covered a level below, where they are cheap.
- When it catches a bug that no lower test caught, I add the lower test. Otherwise the pyramid inverts one bug at a time.
- Never a blind retry to turn red into green. Retries are for surviving infrastructure, not for hiding a race.

## What it bought me

The backend suite is a pyramid, the frontend suite is a trophy, and a thin line of happy paths runs across both. Nothing proves at a higher level what a lower one already proved. The run is fast enough that people actually read a red build.

The question I keep coming back to is the simplest one. If this breaks in three months, who notices? If the answer is a customer, it gets an automated test at the lowest level that can see it. If the answer is everyone, right away, a quick manual check is enough.
