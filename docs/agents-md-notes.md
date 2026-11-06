# AGENTS.md notes (Task C)

## What was added/changed in `app/AGENTS.md`

- Rewrote `app/AGENTS.md` in place (+51/-8). Replaced the title "Cursor Rules"
  with "AGENTS.md - app/" and removed the tool-specific wording, so the file
  reads the same for any agent.
- Added a **Stack** section: TypeScript `^5.6` with ES modules, `strict`,
  `noUncheckedIndexedAccess`, `moduleResolution: "Bundler"`, Vitest `^2.1`,
  Node 22+.
- Added a **Commands** section: `npm install`, `npm test`,
  `npm run test:watch`, `npm run typecheck`; Build: none; Lint: not configured.
- Added a **Code conventions** section.
- Added a **Change rules / Guardrails** section: keep public signatures
  unchanged, add a regression test for every bug fix, keep changes scoped, run
  tests and typecheck before reporting done, no secrets, do not edit
  `materials/` or `docs/templates/`, never redirect to `nul` on Windows, no
  commit/push unless asked.
- Added a **Done means** checklist.
- Added `app/CLAUDE.md` containing only `@AGENTS.md`. This is an import, not
  a link, so Claude Code loads `app/AGENTS.md` through it. `app/AGENTS.md`
  stays the single source of truth; the bridge holds no content of its own.

## Tools tested (2+)

Both tools used the model Claude Opus 5.5 (medium effort). Each prompt ran in
a fresh chat/session started from the repo root.

| Tool | Picked up `app/AGENTS.md` without extra setup? | Notes |
|---|---|---|
| Cursor | Partially | Root `AGENTS.md` is always applied. Nested `app/AGENTS.md` loads only when the agent works on files in `app/`, and it showed stale content until Cursor was restarted. |
| Claude Code | No without a bridge; Yes with `app/CLAUDE.md` containing `@AGENTS.md` | With the bridge, `app/AGENTS.md` is loaded on demand when the agent works in `app/`. |

## Verification prompts

**Prompt 1 (no file reads).** Run after the `app/AGENTS.md` rewrite, before
`app/CLAUDE.md` existed:

> Without reading, opening or searching any files, answer only from the
> instructions that are already loaded in your context for this project:
> 1. Which instruction files (by path) were loaded into your context
> automatically? 2. What commands should be run in app/ before a change is
> considered done, and is there a linter? 3. List the code conventions and
> guardrails that apply to app/. If some of this is not in your loaded
> instructions, say "not in my loaded context" for that item instead of
> guessing. Do not edit any files.

**Prompt 2 (read one file in `app/`).** Run after `app/CLAUDE.md` was added:

> Read the file app/src/text-utils.ts (only this one file; do not read, open
> or search any other file). Then, without reading anything else, answer only
> from the instructions now loaded in your context: 1. Which instruction files
> (by path) are in your context now, and which of them were added after you
> read app/src/text-utils.ts? 2. What commands must be run in app/ before a
> change is considered done, and is there a linter? 3. List the code
> conventions and guardrails that apply when editing files in app/. If
> something is not in your loaded instructions, say "not in my loaded context"
> instead of guessing. Do not edit any files.

## Results

### Prompt 1

- **Cursor:** root `CLAUDE.md` and root `AGENTS.md` were loaded as
  always-applied rules. `app/AGENTS.md` was not loaded. Commands, linter and
  code conventions were answered with "not in my loaded context".
- **Claude Code:** only root `CLAUDE.md` was loaded. Root `AGENTS.md` was not
  loaded, because root `CLAUDE.md` refers to it with a plain Markdown link, not
  an `@` import. `app/AGENTS.md` was not loaded. Every item was answered with
  "not in my loaded context".

### Prompt 2

- **Cursor, first run:** `app/AGENTS.md` was attached on demand after reading
  the file, but with its OLD pre-Task-C content ("Write clean, readable code",
  "Prefer functional style") and no commands or linter info. The file on disk
  and in git was already the new version (checked with `git log` and
  `Get-Content`; single worktree), so this was most likely a stale cached rule.
- **Cursor, after a full restart:** `app/AGENTS.md` and `app/CLAUDE.md` were
  both loaded on demand with the NEW content: `npm test`, `npm run typecheck`,
  "Lint: not configured", and all conventions and guardrails.
- **Claude Code:** the CLI showed "Loaded app\CLAUDE.md" and
  "Loaded app\AGENTS.md" right after reading the file. The answer listed
  `npm test`, `npm run typecheck`, "Lint: not configured", and all conventions
  and guardrails from the new `app/AGENTS.md`. `/memory` at session start
  listed only the project `./CLAUDE.md`; the nested `app/CLAUDE.md` and
  `app/AGENTS.md` were loaded later, when the agent read a file in `app/`
  (shown by the CLI's own "Loaded app\CLAUDE.md" and "Loaded app\AGENTS.md"
  lines). Claude Code also flagged a conflict: the root `CLAUDE.md` still calls
  `app/AGENTS.md` "deliberately thin". The root files belong to the course
  author and were intentionally left unchanged.

## Conclusion

One `app/AGENTS.md` works as the cross-tool source of truth, but Claude Code
needed a one-line tool-specific bridge (`app/CLAUDE.md` with an `@AGENTS.md`
import) to load it. In both tools nested rules load only when the agent
touches files in that folder, and Cursor needed a restart to pick up the
edited rule.
