/**
 * Long-form article bodies, keyed by post slug (see posts in portfolio.ts).
 * Written as structured blocks so no markdown dependency is needed.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export interface Article {
  lede: string;
  body: Block[];
}

export const articles: Record<string, Article> = {
  "multi-tenant-white-label-one-codebase": {
    lede:
      "Welle runs as a SaaS product for some customers and as a heavily customised white-label deployment for others. Both ship from the same repository, on the same release train. Here is the shape that made that possible, and the two rules that keep it from rotting.",
    body: [
      { type: "h2", text: "The problem we were actually solving" },
      {
        type: "p",
        text:
          "When the first white-label client signed, the tempting move was a fork. Copy the codebase, swap the branding, add their custom intake flow, done. Forks are fast on day one and ruinous by month six: every bug fix lands twice, every dependency upgrade lands twice, and the two products drift until nobody can say which behaviour is the product and which is the client.",
      },
      {
        type: "p",
        text:
          "So the constraint we set was blunt: one repository, one deployable artifact, one migration history. Per-client differences had to be data or configuration, never a branch.",
      },
      { type: "h2", text: "Tenancy is a request property, not a build property" },
      {
        type: "p",
        text:
          "Every request resolves a tenant early, from the hostname first and from an explicit header in service-to-service calls. That tenant object travels through the request context and is the only way code is allowed to learn who it is serving. Nothing reads an environment variable to decide client behaviour.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Resolved once per request, then injected everywhere.
export interface TenantContext {
  id: string;
  brand: BrandConfig;          // colours, logo, legal name, support email
  features: FeatureFlags;      // what this tenant has turned on
  jurisdiction: StateRules[];  // pricing and legal rules per US state
}`,
      },
      {
        type: "p",
        text:
          "Data isolation is enforced at the repository layer. Every query builder is created from the tenant context and appends the tenant filter itself, so a developer cannot forget it. We tried the “remember to add the where clause” approach first. We stopped after the second near miss in code review.",
      },
      { type: "h2", text: "Custom logic without custom builds" },
      {
        type: "p",
        text:
          "Most client-specific behaviour is not exotic. It is a different intake questionnaire, a different set of lab panels, a different consent form, a different email cadence. All of that is content and configuration, versioned in the database and editable by the operations team without a deploy.",
      },
      {
        type: "p",
        text:
          "For the genuinely custom pieces, we use a small set of named extension points: a hook that runs after a lab result is imported, a hook that decides which clinician a visit is routed to, a hook that can add line items at checkout. Each extension point has a default implementation and a registry keyed by tenant id. A client override is a class in the same repository, covered by the same tests, and it dies if the interface changes because the compiler says so.",
      },
      { type: "ul", items: [
        "Extension points are few and named. If a new client needs a sixth, we ask whether the fifth should have been more general.",
        "Overrides may not import from each other. Client A must never depend on Client B’s code.",
        "Every override has a test that runs against the default fixtures. If the core contract changes, the client build breaks loudly in CI, not quietly in production.",
      ] },
      { type: "h2", text: "What it bought us" },
      {
        type: "p",
        text:
          "Features built for one client ship to all of them behind a flag. Security fixes land once. The white-label client that started as an exception is now just the tenant with the most configuration. The discipline cost a few weeks up front. The forks would have cost a team.",
      },
    ],
  },

  "ai-soap-notes-under-hipaa": {
    lede:
      "Clinicians on Welle spend less time on documentation because a model drafts the SOAP note from the visit. Making that acceptable under HIPAA was less about the model and more about drawing a very clear line around where protected health information is allowed to travel.",
    body: [
      { type: "h2", text: "Start with the data flow, not the prompt" },
      {
        type: "p",
        text:
          "Before anyone wrote a prompt, we drew the diagram: which fields leave our boundary, to whom, under what agreement, and for how long they are retained. If a box on that diagram could not answer all four questions, it did not get PHI. That single exercise killed two vendor options and shaped the whole design.",
      },
      {
        type: "p",
        text:
          "The provider we use is covered by a Business Associate Agreement, with zero data retention and no training on our inputs. That is table stakes. It does not remove the obligation to minimise what we send.",
      },
      { type: "h2", text: "Minimise, then minimise again" },
      {
        type: "p",
        text:
          "The model does not need a name, a date of birth, an address or an insurance id to write a clinical note. So it never sees them. A pre-processing step replaces direct identifiers with stable placeholders before the request is built, and a post-processing step maps them back when the draft is stored. Free-text fields go through a scrubbing pass as well, because patients say their own names in visit transcripts more often than you would think.",
      },
      {
        type: "code",
        lang: "ts",
        code: `const { redacted, vault } = redactPhi(transcript, {
  identifiers: ["name", "dob", "address", "phone", "email", "memberId"],
});
const draft = await model.draftSoapNote(redacted, template);
const note  = rehydrate(draft, vault); // placeholders -> real values, in our boundary only`,
      },
      { type: "h2", text: "The clinician owns the note" },
      {
        type: "p",
        text:
          "A draft is a draft. It is stored as unsigned, shown with the source transcript beside it, and cannot be filed without a clinician reviewing and signing. Every edit between draft and signature is recorded. That audit trail is what allows us to say, truthfully, that AI assisted the note and a licensed human authored it.",
      },
      { type: "ul", items: [
        "Drafts are stored encrypted with the same key hierarchy as the rest of the chart, not in a side table with weaker controls.",
        "Access to the draft is gated by the same role checks as the visit itself.",
        "The prompt template is versioned, and each note records which version produced it.",
      ] },
      { type: "h2", text: "What we deliberately did not do" },
      {
        type: "p",
        text:
          "No fine-tuning on patient data. No retrieval over other patients’ charts to “improve” a note. No autonomous filing, even for low-risk visit types. Each of those would have made the compliance story a paragraph longer and the trust story a paragraph shorter. The feature is popular with clinicians precisely because it is boring where it needs to be.",
      },
    ],
  },

  "agentic-workflows-small-team": {
    lede:
      "We have used Claude Code and Cursor daily for over a year. Some of what we tried made the team faster. Some of it made pull requests longer and reviews worse. This is the honest list of what stayed.",
    body: [
      { type: "h2", text: "What stuck" },
      { type: "ol", items: [
        "Custom skills for our own conventions. A skill that knows how we structure a NestJS module, how we name migrations and how we write a Jira description removes an entire class of “please follow the pattern” review comments.",
        "Agents for the well-specified and boring. Rename across a codebase, add a field end to end, write the first draft of tests for an existing function. Anything where the spec fits in three sentences and the result is easy to verify.",
        "Plan first on anything non-trivial. Ask for the plan, read it, correct it, then let it build. Ten minutes on the plan saves an hour of undoing a confident wrong turn.",
        "Review the diff as if a new hire wrote it. Because in effect one did: fast, well read, and with no memory of last month’s incident.",
      ] },
      { type: "h2", text: "What did not" },
      { type: "ul", items: [
        "Letting agents open pull requests unattended. Volume went up, signal went down, and reviewers started skimming. We reverted to one human owner per PR who is accountable for every line in it.",
        "Prompting for whole features from a one-line ticket. The output looked complete and hid three wrong assumptions each time.",
        "Agent-written tests as the only tests. They confirm the code does what the code does. A human still has to decide what it should do.",
      ] },
      { type: "h2", text: "The usage policy that made it safe" },
      {
        type: "p",
        text:
          "We wrote a one-page policy and pinned it. Nothing in it is clever. It is the boring rules that let us hand a healthcare codebase to a tool without losing sleep.",
      },
      { type: "quote", text: "No production credentials, no customer data, no PHI in any prompt or context. If you would not paste it into a public chat, do not paste it into an agent." },
      { type: "ul", items: [
        "Agents work on a branch, never on main. Every change lands through the normal review path.",
        "Generated code is held to the same lint, type and test gates as human code. There is no “it was the AI” exemption.",
        "The person who merges is responsible. Tools do not carry blame.",
      ] },
      { type: "h2", text: "The net effect" },
      {
        type: "p",
        text:
          "Less time on boilerplate and migrations, more time on the parts that need judgement: data models, security boundaries, the conversation with the stakeholder about what they actually meant. The team did not get bigger. Its attention got better spent.",
      },
    ],
  },

  "data-tables-that-survive-10k-rows": {
    lede:
      "Bamboo’s users live in tables: inventory, orders, traceability events, thousands of rows at a time. The grid we built handles column resize, freeze, reorder, grouping, tree rows and sticky headers, and stays at 60fps. These are the decisions that mattered.",
    body: [
      { type: "h2", text: "Virtualise rows, and only rows" },
      {
        type: "p",
        text:
          "The first version virtualised rows and columns. Column virtualisation bought little on real screens, broke horizontal scroll smoothness, and made sticky columns a nightmare. We removed it. Row virtualisation alone, with a fixed row height and a small overscan, took the DOM from ten thousand rows to about forty and solved most of the performance problem in one move.",
      },
      { type: "h2", text: "Separate layout state from data state" },
      {
        type: "p",
        text:
          "Column widths, order, pinning and visibility are user preferences. Row data, sorting and grouping are query state. Mixing them in one store meant that dragging a column boundary re-rendered every cell. Splitting them, with the layout store subscribed only by headers and the cell renderer subscribed only by data, made resize a header-only operation.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Two stores, two subscriptions. Resizing a column never touches the body.
const width = useLayoutStore(s => s.columns[colId].width);
const cell  = useDataStore(s => s.rows[rowIndex]?.[colId]);`,
      },
      { type: "h2", text: "Freeze and reorder with CSS, not maths" },
      {
        type: "p",
        text:
          "Frozen columns use position: sticky with a computed left offset per pinned column. Reorder is a change to the column order array; the grid re-renders headers and the visible forty rows. We never move DOM nodes around by hand, and there is no absolute positioning anywhere in the table body.",
      },
      { type: "h2", text: "Grouping and trees are the same feature" },
      {
        type: "p",
        text:
          "A grouped table is a tree with generated parent rows. Once we modelled both as a flat list of visible rows with a depth and an expanded flag, the renderer stopped caring which one it was drawing. Expanding a node inserts its children into the flat list; the virtualiser does the rest.",
      },
      { type: "ul", items: [
        "Cell renderers are pure and memoised on (row, column). Formatting is done once per visible cell, not once per keystroke in the filter box.",
        "Filters run in a worker when the row count crosses a threshold, so typing never blocks the frame.",
        "Every interaction is measured in CI with a synthetic ten-thousand-row dataset. A regression fails the build before a user feels it.",
      ] },
      { type: "h2", text: "Why it is still the most reused component" },
      {
        type: "p",
        text:
          "Because it is boring to use. A team declares columns, points it at data, and gets resize, freeze, group and tree for free. Years later the same component sits in Portal, Trace and Sales with one design language, and new features still land in one place.",
      },
    ],
  },

  "estimating-work-you-have-never-done": {
    lede:
      "Most estimation advice assumes you have done something similar before. The hard estimates are for the things you have not: a new regulator integration, a first AI feature, a migration nobody on the team has attempted. Here is the method I use, and why it does not involve multiplying by three.",
    body: [
      { type: "h2", text: "Split the unknown from the known" },
      {
        type: "p",
        text:
          "Every scary task is mostly ordinary work wrapped around a small core of real uncertainty. Building a state regulator integration is forms, validation, persistence, retries and UI, all of which we have done, plus one genuinely unknown piece: how that regulator’s API actually behaves. Estimate the ordinary parts normally. Isolate the unknown.",
      },
      { type: "h2", text: "Buy information before you buy a number" },
      {
        type: "p",
        text:
          "For the unknown core, do not estimate yet. Time-box a spike, usually half a day to two days, with one question to answer. Can we authenticate and submit one record? Does the model give usable output on our real data? The output of a spike is not code. It is an estimate you can defend.",
      },
      { type: "quote", text: "An estimate given before the spike is a guess with a number attached. The same estimate after the spike is a plan." },
      { type: "h2", text: "Give a range and name the risk" },
      {
        type: "p",
        text:
          "A single number hides everything useful. “Two to four weeks, and the difference is whether their sandbox matches production” tells the stakeholder what could go wrong and what would resolve it. Ranges also stop the game where the optimistic number becomes the commitment.",
      },
      { type: "ul", items: [
        "The low end assumes the spike’s findings hold and nothing else surprises us.",
        "The high end assumes one named risk materialises. If you cannot name it, you have not finished the spike.",
        "Anything beyond the high end is a new conversation, not a missed estimate.",
      ] },
      { type: "h2", text: "Why not just pad it" },
      {
        type: "p",
        text:
          "Padding everything by a factor hides the unknowns from the people who need to see them and trains stakeholders to discount every number you give. It also pads the work you understand perfectly well, which is most of it. Padding buys comfort. Spikes buy knowledge. Only one of those makes the next estimate better.",
      },
      { type: "h2", text: "Re-estimate on purpose" },
      {
        type: "p",
        text:
          "When the unknown becomes known, say so and update the range, in writing, to the same people who got the original. Nobody minds an estimate that narrows. They mind an estimate that was quietly wrong for six weeks.",
      },
    ],
  },

  "one-react-app-25-regulators": {
    lede:
      "Legal cannabis in the US is regulated state by state. Bamboo’s frontend serves operators in more than twenty-five of them, each with its own traceability system, field rules and workflow quirks, from a single React codebase. The trick was refusing to write a switch statement.",
    body: [
      { type: "h2", text: "The shape of the variation" },
      {
        type: "p",
        text:
          "Three traceability regulators dominate: Metrc, BioTrack and CCRS. Each has its own identifiers, its own required fields on a transfer, its own rules about what can be edited after submission. On top of that, individual states layer their own constraints even when they share a regulator. The variation is real, but it is not random. It clusters.",
      },
      { type: "h2", text: "Rules as data, behaviour as strategy" },
      {
        type: "p",
        text:
          "We split the variation into two kinds. Declarative differences, such as which fields are required, which are read-only after submission and what a valid tag looks like, live in a per-state rule set that the backend serves and the frontend applies generically. Behavioural differences, such as how a transfer manifest is assembled or how a sync error is interpreted, live in regulator strategy modules that implement one shared interface.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export interface RegulatorStrategy {
  buildTransfer(order: Order, rules: StateRules): TransferPayload;
  parseSyncError(err: RegulatorError): UserFacingIssue;
  tagFormat: RegExp;
}

const strategies: Record<RegulatorId, RegulatorStrategy> = { metrc, biotrack, ccrs };
export const useRegulator = () => strategies[useTenant().regulator];`,
      },
      {
        type: "p",
        text:
          "A screen never asks “which state am I in”. It asks the rule set whether a field is required and asks the strategy to build a payload. Adding a state that uses an existing regulator is a data change. Adding a new regulator is one new module against a known interface.",
      },
      { type: "h2", text: "Components that read rules instead of props" },
      {
        type: "p",
        text:
          "Form fields subscribe to the rule set for their own path. A field renders itself as required, optional, hidden or locked based on the rules in context, so the same transfer form component serves every state without a single conditional in its JSX. The rule set is also what the test suite iterates over: one form component, twenty-five rule fixtures, one set of assertions.",
      },
      { type: "ul", items: [
        "Rule sets are versioned. A regulator change ships as a new rule version with an effective date, not as a code deploy at midnight.",
        "Strategy modules are forbidden from importing UI. They produce data and issues; components decide how to show them.",
        "Every strategy has a contract test against recorded regulator responses, so an upstream API change breaks CI before it breaks an operator’s day.",
      ] },
      { type: "h2", text: "What it avoided" },
      {
        type: "p",
        text:
          "There is no twenty-five-way switch anywhere in the codebase, and no per-state component folder. When a new state opened, the frontend work was measured in hours. That is the difference between polymorphism and conditionals: one grows linearly with the interface, the other grows with the number of customers.",
      },
    ],
  },
};
