# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase. This is a **multi-context** monorepo: the contexts are `apps/api` (GraphQL / Pothos / Drizzle backend) and `apps/web` (Next.js frontend).

## Before exploring, read these

- **`CONTEXT-MAP.md`** at the repo root — it points at one `CONTEXT.md` per context. Read each one relevant to the topic.
- The per-context **`CONTEXT.md`** for the app you're working in (`apps/api/CONTEXT.md`, `apps/web/CONTEXT.md`).
- **`docs/adr/`** at the root for system-wide decisions, and **`apps/<app>/docs/adr/`** for context-scoped decisions in the area you're about to work in.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

Multi-context repo (presence of `CONTEXT-MAP.md` at the root):

```
/
├── CONTEXT-MAP.md                     ← points at each app's CONTEXT.md
├── docs/adr/                          ← system-wide decisions
└── apps/
    ├── api/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── web/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in the relevant `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_
