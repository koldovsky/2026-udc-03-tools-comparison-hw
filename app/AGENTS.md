# AGENTS.md — `app/`

Cross-tool context for any AI coding agent (CLI agent, agentic IDE, or IDE
plugin) working in this sample project. This file is intentionally
tool-agnostic — it should work the same whether it's read by Claude Code,
Cursor, GitHub Copilot, or another agent that honors `AGENTS.md`.

## Stack

- TypeScript (ES modules, `"type": "module"` in `package.json`)
- Test runner: [Vitest](https://vitest.dev/)
- No frontend framework, no bundler — this is a tiny standalone lib
  (`src/text-utils.ts` + its test file) used as a common task base for the
  WS3 tool-comparison exercise.
- Node 22+.

## Commands

Run all commands from inside `app/`:

- **Install:** `npm install`
- **Test:** `npm test` (single run) or `npm run test:watch` (watch mode)
- **Typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Lint:** not configured in this project — there is no ESLint/Prettier
  config here. Treat `npm run typecheck` as the closest available static
  check before treating a change as done. If you add a lint step, wire it
  into `package.json` as `npm run lint` and document it here.
- **Build:** not applicable — this package has no build/emit step; it is
  consumed as TypeScript source directly by the test runner.

## Code conventions

1. Keep functions small, pure, and framework-free — this module has no
   side effects and no I/O; new utilities added here should follow the same
   shape (plain input → plain output, no classes, no shared mutable state).
2. Every exported function must have an accompanying test in
   `src/text-utils.test.ts` (or a sibling `*.test.ts` file next to the
   module it tests) covering the happy path **and** the edge cases called
   out in its ticket/spec.
3. Match the existing style in the file you're editing: named exports only
   (no default exports), explicit TypeScript parameter/return types on
   every exported function, comments only where behavior is non-obvious
   (not restating what the code already says).
4. Do not change the public signature of an existing exported function
   (name, parameter order/types, return type) unless the task explicitly
   asks for it — other code and tests depend on the current signatures.
5. Prefer straightforward, readable string/array operations over clever
   one-liners; this is a teaching sample, and clarity beats brevity.

## Guardrails

- Do not break existing passing tests without an explicit instruction to
  change the behavior they encode. If a ticket requires behavior that
  conflicts with an existing test's assertion, update that test
  deliberately and say so — don't silently delete or weaken assertions.
- Always run `npm test` after a change and confirm it is green before
  considering the task done.
- No real secrets, credentials, or PII belong anywhere in this repo
  (including in comments, fixtures, or example data).
- Keep changes scoped to what the ticket/task asks for — this is a small
  shared sample used by multiple exercises (Task B bug fix, Task E feature
  ticket); avoid incidental refactors of unrelated functions.
- When asked to explain or summarize this project's conventions, base the
  answer on this file rather than inferring conventions from a single
  IDE's default settings.
