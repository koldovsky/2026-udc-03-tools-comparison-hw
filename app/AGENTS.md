# AGENTS.md

Guidance for any AI coding agent (IDE plugin, agentic IDE, or CLI agent)
working in this `app/` package.

## Project

Tiny TypeScript utility library of pure text helpers (`slugify`, `truncate`,
`parseTags`) in `src/text-utils.ts`. It is the shared task base for a
tool-comparison exercise — keep changes minimal and focused.

## Stack

- TypeScript 5, strict mode, ESM (`"type": "module"`)
- Node 22+
- Vitest for tests (`src/*.test.ts`, colocated with source)

## Commands

Run from this `app/` directory:

- Test: `npm test` (vitest run)
- Test watch: `npm run test:watch`
- Typecheck: `npm run typecheck` (tsc --noEmit)
- Lint: **not configured** — don't invent a lint command
- Build: **not configured** — this package is never bundled; typecheck is the only compile check

## Code conventions

- Pure, side-effect-free functions with named exports; no classes, no shared state.
- Explicit parameter and return types on every exported function.
- Follow the existing formatting: 2-space indent, double quotes, semicolons.
- Prefer chained string/array operations (`map`/`filter`/regex replace) over
  imperative loops, matching the existing style.
- Tests live next to the source as `*.test.ts`, using Vitest
  `describe`/`it`/`expect`; group cases per function in a `describe` block.

## Guardrails

- Do **not** change the public signatures of `slugify`, `truncate`, or
  `parseTags` — other exercise materials depend on them.
- Every bug fix must come with a regression test that fails on the old code.
- Don't break existing tests; run `npm test` before finishing any change.
- Never commit secrets, API keys, or `.env` files.
- Explain what you changed and why when proposing edits.
