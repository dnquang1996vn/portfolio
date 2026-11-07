## What stuck

1. Custom skills for our own conventions. A skill that knows how we structure a NestJS module, how we name migrations and how we write a Jira description removes an entire class of “please follow the pattern” review comments.
2. Agents for the well-specified and boring. Rename across a codebase, add a field end to end, write the first draft of tests for an existing function. Anything where the spec fits in three sentences and the result is easy to verify.
3. Plan first on anything non-trivial. Ask for the plan, read it, correct it, then let it build. Ten minutes on the plan saves an hour of undoing a confident wrong turn.
4. Review the diff as if a new hire wrote it. Because in effect one did: fast, well read, and with no memory of last month’s incident.

## What did not

- Letting agents open pull requests unattended. Volume went up, signal went down, and reviewers started skimming. We reverted to one human owner per PR who is accountable for every line in it.
- Prompting for whole features from a one-line ticket. The output looked complete and hid three wrong assumptions each time.
- Agent-written tests as the only tests. They confirm the code does what the code does. A human still has to decide what it should do.

## The usage policy that made it safe

We wrote a one-page policy and pinned it. Nothing in it is clever. It is the boring rules that let us hand a healthcare codebase to a tool without losing sleep.

> No production credentials, no customer data, no PHI in any prompt or context. If you would not paste it into a public chat, do not paste it into an agent.

- Agents work on a branch, never on main. Every change lands through the normal review path.
- Generated code is held to the same lint, type and test gates as human code. There is no “it was the AI” exemption.
- The person who merges is responsible. Tools do not carry blame.

## The net effect

Less time on boilerplate and migrations, more time on the parts that need judgement: data models, security boundaries, the conversation with the stakeholder about what they actually meant. The team did not get bigger. Its attention got better spent.
