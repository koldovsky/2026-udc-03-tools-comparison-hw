# AGENTS.md — app/

Small TypeScript sample package. Applies to any AI coding tool working in this directory.

## Stack

- TypeScript (ES2022, ESNext modules, strict mode), Node.js, `type: module` (ESM only).
- Tests: Vitest.
- No framework, no runtime dependencies — just plain functions in `src/`.

## Commands

- Test: `npm test` (runs `vitest run` once) / `npm run test:watch` for watch mode.
- Typecheck: `npm run typecheck` (`tsc --noEmit`).
- Build: not configured — this package is not published or bundled.
- Lint: not configured — no ESLint/Biome/Prettier setup in this project.

## Conventions

- Keep functions small, pure, and dependency-free, matching the existing style in `src/text-utils.ts`.
- Use named exports; no default exports.
- Import local modules with explicit `.js` extensions (ESM requirement), e.g. `from "./text-utils.js"`.
- Write Vitest tests colocated as `*.test.ts` next to the source file, using `describe`/`it` blocks grouped by function.
- Prefer functional style (no classes, no mutation of inputs) where it fits naturally.
- Add comments only for non-obvious logic; don't restate what the code already says.

## Guardrails

- Don't change the public signature of `slugify`, `truncate`, or `parseTags` — only implementations and tests.
- Don't break existing passing tests; add new tests rather than weakening assertions to make code pass.
- Don't add new dependencies or a build/lint toolchain unless explicitly asked.
- When suggesting changes, explain what changed and why.
