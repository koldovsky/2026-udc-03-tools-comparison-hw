# AGENTS.md

Baseline context for any AI coding agent working in this `app/` package.

## Stack

- TypeScript (ES2022 target, ESM, `strict: true`, `noUncheckedIndexedAccess`)
- Runtime: Node 22+
- Test runner: Vitest
- No framework, no runtime dependencies — this is a tiny standalone module.

## Commands

- Test: `npm test` (or `npm run test:watch` for watch mode)
- Typecheck: `npm run typecheck`
- Build: none — this package is consumed as TS source, no bundling/compile step
- Lint: not configured

## Code conventions

- Keep functions small and pure — no hidden state, no I/O in `src/text-utils.ts`.
- Explicit parameter and return types on every exported function.
- Prefer functional style (map/filter/reduce over manual loops) where it doesn't hurt readability.
- Match the existing style of the file you're editing over introducing a new pattern.
- No comments unless the code's intent is genuinely non-obvious (a subtle edge case, a workaround) — well-named code should speak for itself.

## Guardrails

- Don't change the public signature of `slugify`, `truncate`, or `parseTags` — only their implementation and tests.
- Don't add runtime dependencies without a clear reason — this package is intentionally dependency-free.
- Don't break existing tests; if fixing a bug, add a regression test that would have caught it.
- Explain what changed and why when proposing edits.
