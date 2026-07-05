# AGENTS.md

Cross-tool contract for AI coding agents working in this `app/` sample — a tiny
TypeScript text-utilities module used as the common task base for the WS3
tool-comparison exercise. This file is tool-agnostic: it should be picked up by
any agent (GitHub Copilot, Gemini, Cursor, Claude Code, etc.) without extra setup.

## Stack

- **Language:** TypeScript (ESM — `"type": "module"`), targeting Node 22+.
- **Tests:** Vitest.
- **Build:** no bundling step; code is typechecked and run directly.

## Commands (run from `app/`)

- Install: `npm install`
- Test: `npm test` (`vitest run`) — must stay green
- Watch tests: `npm run test:watch`
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Lint: **не налаштовано** (не вигадуй команду лінтера — її немає)

## Code conventions

- Keep it simple and readable; match the style of the file you are editing.
- Prefer pure functions and a functional style where it fits (see `src/text-utils.ts`).
- Two-space indentation, double quotes, semicolons — as in existing files.
- Import local modules with the explicit `.js` extension (ESM), e.g.
  `import { truncate } from "./text-utils.js";`.
- Every behavior change ships with a Vitest test in `src/*.test.ts`.
- Add a short comment only for non-obvious logic; avoid over-commenting.

## Guardrails

- Do **not** change the public signatures of `slugify`, `truncate`, `parseTags`
  — implementation and tests only.
- Keep `npm test` **and** `npm run typecheck` green before finishing.
- End every file with a trailing newline.
- Never commit secrets, API keys, or `.env` files.
- Explain what you changed and why; do not break existing functionality.
