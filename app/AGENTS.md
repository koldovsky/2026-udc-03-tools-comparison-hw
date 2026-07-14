# AGENTS.md

Baseline guidance for any Agentic Tool working in **this homework repo**.

> UDC Workshop 3 homework — AI tools comparison. Participants run the same
> ticket across 2-3 tools, build a capability matrix, generalize
> `app/AGENTS.md` into a cross-tool baseline, and write a team recommendation.
> See `docs/walkthrough.md`.

## Context

- `app/` is a tiny TS sample (`slugify`, `truncate`, `parseTags`) used as the
  **common task base**: `truncate()` has a planted bug (see
  `materials/task-bug-fix.md`). Existing tests pass as-is — the bug is not
  caught by them; the task is to add a regression test that does.
- `app/AGENTS.md` (note: a DIFFERENT file from this one, nested inside `app/`)
  is deliberately thin and single-tool-flavored. Task C is to generalize it.
  Do not "fix" it on the participant's behalf unless asked.
- `materials/` holds the two tickets used across the homework:
  `task-bug-fix.md` (Task B, run identically across tools) and
  `task-feature-ticket.md` (Task E bonus, meant to be handed as-is to a CLI agent).
- The homework is graded by CodeRabbit (`.coderabbit.yaml`) against the
  Definition of Done in `docs/walkthrough.md`.


## Stack

- **Runtime:** Node.js (see `.nvmrc` or `package.json` for version)
- **Language:** TypeScript (strict mode)
- **Test framework:** Vitest
- **Lint:** не налаштовано


## Commands

```bash
cd app
npm install       # встановити залежності (один раз)
npm test          # запустити тести (vitest)
npm run build     # tsc — компіляція (якщо потрібна перевірка типів)
# lint: не налаштовано — не вигадуй команду
```

## Outputs

- Keep generated artifacts in the agreed paths so auto-review can find them:
  - `docs/tool-matrix.md` — Task A capability matrix
  - `docs/comparison.md` — Task B same-ticket comparison across ≥2 tools
  - `docs/agents-md-notes.md` — Task C cross-tool verification write-up
  - `docs/recommendation.md` — Task D team recommendation
  - `docs/cli-ticket-to-pr.md` — Task E (bonus)
  - `app/AGENTS.md` — generalized in place (Task C)

## Conventions
- One conceptual change per commit. Bug fix and its regression test go in one PR; a new feature goes in a separate one.
- Documentation language: Ukrainian or English (participant's choice).


## Guardrails

- **NEVER** commit secrets, API keys, or `.env` files. They are gitignored —
  keep it that way.
- **NEVER** add real client/NDA-protected business details — `materials/` and
  `app/` contain only synthetic, generic sample data on purpose.
- Don't change the public signature of `slugify`, `truncate`, or `parseTags`
  when fixing the bug — only the implementation and tests.
- **Windows + Git Bash:** never use `2>nul` / `>nul` (creates a literal `nul`
  file). Use `2>/dev/null` / `>/dev/null`. `nul` is gitignored as a net.


## Definition of Done

Before opening a PR: `cd app && npm test` is green, and the Task files listed
above exist with real, specific content (not placeholders) for at least the
core Tasks A–D.

