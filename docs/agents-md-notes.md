# AGENTS.md notes (Task C)

Cross-tool check: can a single `app/AGENTS.md` act as a shared context file for
several AI tools? Generalized the previously single-tool file and verified
pickup in **3 tools**: Claude Code, GitHub Copilot (in VS Code), opencode.

## What was added/changed in `app/AGENTS.md`

- **Dropped the single-tool binding.** Retitled `# Cursor Rules` → `# AGENTS.md`
  and rewrote the intro to be tool-neutral (baseline for any AI coding tool).
- **Added a Stack section:** TypeScript 5.6 strict + `noUncheckedIndexedAccess`,
  ESM with `.js` in relative imports, vitest 2.1, Node 22+.
- **Added a Commands table:** `npm test`, `npm run test:watch`,
  `npm run typecheck` — and explicitly marked **build: not configured** and
  **lint: not configured** instead of inventing commands that don't exist.
- **Made the conventions concrete** (were 4 generic style tips): named exports +
  small pure functions, `.js` extension on relative imports, colocated
  `*.test.ts`, comments only for the non-obvious, and **don't change the public
  signatures** of `slugify`/`truncate`/`parseTags`.
- **Added Guardrails + How to verify:** no secrets/`.env`, synthetic data only,
  add a regression test when fixing a bug; verify with `npm test` + `typecheck`.

## Tools verified (3)

| Tool | Picked up `AGENTS.md` with no extra config? | Notes |
|---|---|---|
| Claude Code | yes | Reads `AGENTS.md` natively (nested `app/AGENTS.md` merged with the repo root). Answer matched every convention below with no reminders. |
| opencode | yes | Reads `AGENTS.md` natively as its context/rules file. |
| GitHub Copilot | yes | VS Code Copilot supports `AGENTS.md` (can be disabled via settings). |

## Verification prompt

> Describe this project's conventions.

(Same prompt in all three tools — no extra hints, no pointing at the file.)

## Result

- **Claude Code** — correctly reported: TS strict + ESM with `.js` imports;
  named exports / small pure functions; tests colocated as `*.test.ts` (vitest);
  `npm test` / `npm run typecheck` with **build and lint not configured**; and
  the guardrail not to change `slugify`/`truncate`/`parseTags` signatures — all
  without being pointed at the file.
- **opencode** — reproduced the full file unprompted: Stack, Code Style, Testing,
  the Commands table, and all Guardrails (secrets/`.env`, the three frozen
  signatures, regression-test-on-bug-fix, synthetic data). It also inferred a
  couple of extras from reading the source (`kebab-case` filenames, `describe`
  per function / `it` per behavior) — beyond what `AGENTS.md` states, but
  consistent with it.
- **GitHub Copilot** (VS Code) — correctly reported all five conventions (named
  exports / pure functions, ESM `.js` imports, colocated `*.test.ts`, comments
  only for the non-obvious, don't change the `slugify`/`truncate`/`parseTags`
  signatures) plus the full stack, explicitly noting **"No build step or linter
  configured"** — all unprompted, citing `AGENTS.md` by name.

## Conclusion

A single generalized `AGENTS.md` works as a genuine cross-tool baseline: all
three tools read the same file — Claude Code and opencode natively, and Copilot
in VS Code via its instruction-files setting (enabled by default, so no setup is
needed unless someone has turned it off). One context file is enough; no
duplicate tool-specific files were required.
