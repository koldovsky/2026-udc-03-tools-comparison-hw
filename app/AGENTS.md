# AGENTS.md

Baseline context for any AI coding tool (IDE plugin, agentic IDE, or CLI
agent) working in this directory. This file is intentionally tool-agnostic —
follow it regardless of which assistant is reading it.

## Stack

- TypeScript (ES2022 target, ESM modules, `strict` + `noUncheckedIndexedAccess`)
- [Vitest](https://vitest.dev) for tests
- No runtime dependencies; no framework — this is a small standalone module

## Commands

- Install: `npm install`
- Test: `npm test` (single run) / `npm run test:watch` (watch mode)
- Typecheck: `npm run typecheck`
- Build: not configured — there is no bundling/compile step; consumers use
  the TypeScript source directly (or run `typecheck` to validate types)
- Lint: not configured — no linter is set up in this project

## Code conventions

- Prefer functional style: small, pure, named exports (`export function ...`);
  no classes, no default exports.
- Match the existing style in the file you're editing (formatting, quote
  style, naming) rather than introducing a new convention.
- Add comments only for non-obvious logic (e.g. edge-case handling); don't
  narrate what the code already makes clear.
- Keep functions small and single-purpose, consistent with `slugify`,
  `truncate`, and `parseTags` in `src/text-utils.ts`.
- Mirror existing test structure when adding tests: `describe` per function,
  `it` per behavior, in `src/*.test.ts` next to the source file.

## Guardrails

- Don't break existing functionality — run `npm test` after any change.
- Don't change the public signature of existing exported functions unless
  the task explicitly asks for it; prefer changing the implementation.
- Don't add dependencies (runtime or dev) unless the task requires it.
- When you change behavior, explain what changed and why, and add/update a
  test that covers it.
- Never `git commit` or `git push` without explicit user approval first.
