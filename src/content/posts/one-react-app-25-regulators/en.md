## The shape of the variation

Three traceability regulators dominate: Metrc, BioTrack and CCRS. Each has its own identifiers, its own required fields on a transfer, its own rules about what can be edited after submission. On top of that, individual states layer their own constraints even when they share a regulator. The variation is real, but it is not random. It clusters.

## Rules as data, behaviour as strategy

We split the variation into two kinds. Declarative differences, such as which fields are required, which are read-only after submission and what a valid tag looks like, live in a per-state rule set that the backend serves and the frontend applies generically. Behavioural differences, such as how a transfer manifest is assembled or how a sync error is interpreted, live in regulator strategy modules that implement one shared interface.

```ts
export interface RegulatorStrategy {
  buildTransfer(order: Order, rules: StateRules): TransferPayload;
  parseSyncError(err: RegulatorError): UserFacingIssue;
  tagFormat: RegExp;
}

const strategies: Record<RegulatorId, RegulatorStrategy> = { metrc, biotrack, ccrs };
export const useRegulator = () => strategies[useTenant().regulator];
```

A screen never asks “which state am I in”. It asks the rule set whether a field is required and asks the strategy to build a payload. Adding a state that uses an existing regulator is a data change. Adding a new regulator is one new module against a known interface.

## Components that read rules instead of props

Form fields subscribe to the rule set for their own path. A field renders itself as required, optional, hidden or locked based on the rules in context, so the same transfer form component serves every state without a single conditional in its JSX. The rule set is also what the test suite iterates over: one form component, twenty-five rule fixtures, one set of assertions.

- Rule sets are versioned. A regulator change ships as a new rule version with an effective date, not as a code deploy at midnight.
- Strategy modules are forbidden from importing UI. They produce data and issues; components decide how to show them.
- Every strategy has a contract test against recorded regulator responses, so an upstream API change breaks CI before it breaks an operator’s day.

## What it avoided

There is no twenty-five-way switch anywhere in the codebase, and no per-state component folder. When a new state opened, the frontend work was measured in hours. That is the difference between polymorphism and conditionals: one grows linearly with the interface, the other grows with the number of customers.
