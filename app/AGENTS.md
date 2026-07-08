# AGENTS.md

Cross-tool context for any AI coding assistant (agentic IDE, IDE plugin, or CLI
agent) working in this `app/` sample. Written to be tool-agnostic: it should be
picked up as shared project context regardless of which tool reads it.

## Project

A tiny, self-contained TypeScript library of pure text helpers
(`slugify`, `truncate`, `parseTags`, `capitalizeWords`) in `src/text-utils.ts`,
with vitest tests in `src/text-utils.test.ts`. It is the common task base for
the WS3 tool-comparison exercise — keep it small and dependency-free.

## Stack

- **Language:** TypeScript `^5.6`, `strict` mode with `noUncheckedIndexedAccess`.
- **Module system:** ESM (`"type": "module"`, `module: ESNext`,
  `moduleResolution: Bundler`). Use `import`/`export`, not `require`.
- **Target:** ES2022.
- **Runtime:** Node.js 20.9+ (the exercise setup uses Node 22+).
- **Test runner:** vitest with globals enabled (`describe`/`it`/`expect` are
  available without imports).

## Commands

Run from the `app/` directory:

- **test:** `npm test` (runs `vitest run` once)
- **test (watch):** `npm run test:watch`
- **typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **build:** not configured (this is a source-only library)
- **dev:** not configured
- **lint:** not configured — do not invent a lint command; rely on `strict`
  TypeScript and `typecheck` instead.

## Conventions

- Keep functions **pure**: no I/O, no globals, no mutation of inputs — take a
  string, return a value.
- Prefer a **functional style**: chained array/string methods over imperative
  loops, matching the existing code in `text-utils.ts`.
- Use **explicit return types** on exported functions.
- Follow the existing formatting: 2-space indent, double-quoted strings,
  semicolons.
- Add a comment only for non-obvious logic; don't restate what the code says.
- Every new util needs vitest coverage, including edge cases (empty string,
  whitespace, boundary lengths) — mirror the style of `text-utils.test.ts`.

## Guardrails

- **Do not change the public signatures** of `slugify`, `truncate`, or
  `parseTags` — only implementation and tests may change when fixing bugs.
- **No new runtime dependencies.** Keep the library dependency-free; only
  `devDependencies` (typescript, vitest) are allowed.
- Stay within the declared stack (TypeScript/ESM/vitest) — don't introduce a
  framework, bundler, or another language.
- Never commit secrets, API keys, or `.env` files.
- **Windows + Git Bash:** never redirect with `2>nul` / `>nul` (creates a
  literal `nul` file); use `2>/dev/null` / `>/dev/null`.

## How to verify

Before finishing a change: `npm test` is green and `npm run typecheck` reports
no errors.
