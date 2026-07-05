# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex CLI, Antigravity,
OpenCode, GitHub Copilot, etc.) working in this sample project.

## Stack

- TypeScript, ES modules (`"type": "module"` in `package.json`), Node 22+
- Vitest for tests
- No bundler/build step — this is a small library consumed as source, not
  a shipped artifact

## Commands

- Install: `npm install`
- Build: not applicable — nothing to compile/bundle; `npm run typecheck`
  is the closest check
- Test: `npm test` (runs `vitest run`)
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Lint: not configured in this sample project — don't invent a lint command

## Conventions

1. Prefer small, pure functions (see `slugify`, `truncate`, `parseTags` in
   `src/text-utils.ts`) — no classes, no shared mutable state.
2. Explicit parameter and return types on every exported function signature.
3. Every exported function has matching tests in the colocated `*.test.ts`
   file (same basename as the source file).
4. Comments only for non-obvious logic (e.g., a subtle edge-case invariant)
   — well-named code shouldn't need narration.
5. When fixing a bug, add a regression test that fails on the old behavior
   and passes on the fix, instead of only patching the symptom.

## Guardrails

- Don't change the public signature of `slugify`, `truncate`, or `parseTags`
  — only the implementation and tests.
- Don't break existing tests; run `npm test` before calling a change done.
- Explain what changed and why when proposing an edit — don't just apply a
  silent diff.
