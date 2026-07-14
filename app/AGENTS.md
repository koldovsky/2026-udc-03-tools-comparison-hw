# AGENTS.md

Baseline context for **any** AI coding tool working inside `app/`.

## Stack

- **TypeScript** 5.6, `strict` + `noUncheckedIndexedAccess`, target ES2022.
- **ESM** (`"type": "module"`) — relative imports carry the `.js` extension,
  e.g. `import { truncate } from "./text-utils.js"`.
- **vitest** 2.1 for tests; **Node 22+**.

## Commands

Run from `app/`:

| Task | Command |
|---|---|
| test | `npm test` (`vitest run`) |
| test (watch) | `npm run test:watch` |
| typecheck | `npm run typecheck` (`tsc --noEmit`) |
| build | *not configured* (no build step in this sample) |
| lint | *not configured* |

## Conventions

- **Named exports**, small **pure functions**, functional style — match
  `src/text-utils.ts`.
- Relative imports use the **`.js`** extension (ESM), even for `.ts` sources.
- Tests are **colocated** in `src/` as `*.test.ts`, use vitest, and import from
  `./name.js`.
- Comments only for the **non-obvious** — don't restate what the code says.
- **Do not change the public signatures** of `slugify`, `truncate`, or
  `parseTags` — only implementation and tests.

## Guardrails

- **NEVER** commit secrets, API keys, or `.env` files (they are gitignored).
- Use **synthetic, generic data only** — no real client/NDA details.
- Don't break existing tests; when fixing a bug, **add a regression test** that
  fails before the fix and passes after.

## How to verify

`cd app && npm test` is green and `npm run typecheck` is clean.
