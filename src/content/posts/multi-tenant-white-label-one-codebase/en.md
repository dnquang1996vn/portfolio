## The problem we were actually solving

When the first white-label client signed, the tempting move was a fork. Copy the codebase, swap the branding, add their custom intake flow, done. Forks are fast on day one and ruinous by month six: every bug fix lands twice, every dependency upgrade lands twice, and the two products drift until nobody can say which behaviour is the product and which is the client.

So the constraint we set was blunt: one repository, one deployable artifact, one migration history. Per-client differences had to be data or configuration, never a branch.

## Tenancy is a request property, not a build property

Every request resolves a tenant early, from the hostname first and from an explicit header in service-to-service calls. That tenant object travels through the request context and is the only way code is allowed to learn who it is serving. Nothing reads an environment variable to decide client behaviour.

```ts
// Resolved once per request, then injected everywhere.
export interface TenantContext {
  id: string;
  brand: BrandConfig;          // colours, logo, legal name, support email
  features: FeatureFlags;      // what this tenant has turned on
  jurisdiction: StateRules[];  // pricing and legal rules per US state
}
```

Data isolation is enforced at the repository layer. Every query builder is created from the tenant context and appends the tenant filter itself, so a developer cannot forget it. We tried the “remember to add the where clause” approach first. We stopped after the second near miss in code review.

## Custom logic without custom builds

Most client-specific behaviour is not exotic. It is a different intake questionnaire, a different set of lab panels, a different consent form, a different email cadence. All of that is content and configuration, versioned in the database and editable by the operations team without a deploy.

For the genuinely custom pieces, we use a small set of named extension points: a hook that runs after a lab result is imported, a hook that decides which clinician a visit is routed to, a hook that can add line items at checkout. Each extension point has a default implementation and a registry keyed by tenant id. A client override is a class in the same repository, covered by the same tests, and it dies if the interface changes because the compiler says so.

- Extension points are few and named. If a new client needs a sixth, we ask whether the fifth should have been more general.
- Overrides may not import from each other. Client A must never depend on Client B’s code.
- Every override has a test that runs against the default fixtures. If the core contract changes, the client build breaks loudly in CI, not quietly in production.

## What it bought us

Features built for one client ship to all of them behind a flag. Security fixes land once. The white-label client that started as an exception is now just the tenant with the most configuration. The discipline cost a few weeks up front. The forks would have cost a team.
