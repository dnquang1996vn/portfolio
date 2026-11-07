## Start with the data flow, not the prompt

Before anyone wrote a prompt, we drew the diagram: which fields leave our boundary, to whom, under what agreement, and for how long they are retained. If a box on that diagram could not answer all four questions, it did not get PHI. That single exercise killed two vendor options and shaped the whole design.

The provider we use is covered by a Business Associate Agreement, with zero data retention and no training on our inputs. That is table stakes. It does not remove the obligation to minimise what we send.

## Minimise, then minimise again

The model does not need a name, a date of birth, an address or an insurance id to write a clinical note. So it never sees them. A pre-processing step replaces direct identifiers with stable placeholders before the request is built, and a post-processing step maps them back when the draft is stored. Free-text fields go through a scrubbing pass as well, because patients say their own names in visit transcripts more often than you would think.

```ts
const { redacted, vault } = redactPhi(transcript, {
  identifiers: ["name", "dob", "address", "phone", "email", "memberId"],
});
const draft = await model.draftSoapNote(redacted, template);
const note  = rehydrate(draft, vault); // placeholders -> real values, in our boundary only
```

## The clinician owns the note

A draft is a draft. It is stored as unsigned, shown with the source transcript beside it, and cannot be filed without a clinician reviewing and signing. Every edit between draft and signature is recorded. That audit trail is what allows us to say, truthfully, that AI assisted the note and a licensed human authored it.

- Drafts are stored encrypted with the same key hierarchy as the rest of the chart, not in a side table with weaker controls.
- Access to the draft is gated by the same role checks as the visit itself.
- The prompt template is versioned, and each note records which version produced it.

## What we deliberately did not do

No fine-tuning on patient data. No retrieval over other patients’ charts to “improve” a note. No autonomous filing, even for low-risk visit types. Each of those would have made the compliance story a paragraph longer and the trust story a paragraph shorter. The feature is popular with clinicians precisely because it is boring where it needs to be.
