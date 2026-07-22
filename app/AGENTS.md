# `app/` — text utilities sample

Tiny TypeScript module used as the **common task base** for the WS3 AI-tools
comparison homework. All source lives in `src/`; there is no runtime app or UI.

## Stack

- TypeScript 5 (strict, `noUncheckedIndexedAccess`)
- Node.js ESM (`"type": "module"`)
- Vitest 2 for unit tests
- No bundler, no framework

## Commands

Run from the `app/` directory:

| Command | What it does |
| --- | --- |
| `npm test` | Run the full test suite once (`vitest run`) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Type-check without emitting (`tsc --noEmit`) |
| `build` | **Not configured** — no compile/bundle step in this sample |
| `lint` | **Not configured** — no ESLint or other linter in this project |

Before opening a PR or finishing a task: `npm test` must be green. Run
`npm run typecheck` when you change types or signatures.

## Conventions

1. **Pure utilities** — keep functions in `src/` stateless and side-effect free;
   one concern per file (see `text-utils.ts`).
2. **Named exports** — export functions with `export function name()`; avoid
   default exports.
3. **ESM imports** — use `.js` extensions in relative imports
   (e.g. `from "./text-utils.js"`), matching TypeScript ESM resolution.
4. **Match existing style** — camelCase for functions/variables; follow the
   chaining/functional patterns already in the file you edit.
5. **Tests alongside source** — colocate tests as `*.test.ts` next to the module
   under test; use Vitest `describe` / `it` / `expect`.

## Guardrails

- Do **not** change the public signatures of `slugify`, `truncate`, or
  `parseTags` unless the task explicitly asks for it — fix bugs in the
  implementation and add tests instead.
- Do **not** add dependencies without a clear reason; this repo stays minimal on
  purpose.
- Do **not** invent a `lint` or `build` script — they are not set up here.
- Do **not** commit secrets or `.env` files.
- Keep changes focused: fix the reported issue, add regression tests, leave
  unrelated code alone.
