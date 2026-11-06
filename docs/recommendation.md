# Team recommendation (Task D)

Synthesis of Task A (`docs/tool-matrix.md`), Task B (`docs/comparison.md`) and
Task C (`docs/agents-md-notes.md`). Tools evaluated: Cursor (Pro) and Claude
Code CLI (Claude Pro). Vendor facts were checked on official pages on
2026-11-06.

## Recommended primary tool

**Cursor**

Why: Cursor works well as the team's daily IDE. Its model picker mixes
vendors: Cursor Grok models next to Claude Opus 5.5, Claude Sonnet 5.5,
GPT-5.6 Sol, Gemini 4 Argon and others, so the team is not tied to one model
provider (`docs/tool-matrix.md`, "Model choice/quality"). The observed Pro plan
costs a flat $20/month with two included usage pools ("Cursor Models" and
"Other Models"), and on-demand spending is disabled, so there are no overage
charges (`docs/tool-matrix.md`, "Price and limits"). It reads `AGENTS.md`
natively, including nested `app/AGENTS.md`, without extra files
(`docs/agents-md-notes.md`). On BUG-101 it asked for confirmation before
acting and showed per-file diffs in a Changes panel, which is a safer default
for a team, and it wrote the strongest single test of either run, an
exhaustive length loop (`docs/comparison.md`).

## Recommended secondary tool

**Claude Code CLI**, for these scenarios: ticket-to-PR automation, headless
and CI runs (`claude -p`), batch or multi-file chores, and tasks where cost
visibility matters.

Why: In auto mode Claude Code fixed BUG-101 with no permission prompts, first
confirmed that its new tests failed on the buggy code (red-first), and redid
one failed edit (CRLF line endings) on its own (`docs/comparison.md`). `/cost`
reported exact usage for the run, $0.3260 API-equivalent and 11% of the Pro
session limit, and headless mode, hooks, subagents, Skills and MCP make it
scriptable (`docs/tool-matrix.md`). It needs the one-line bridge
`app/CLAUDE.md` containing `@AGENTS.md` (an import, not a link) to load the
shared rules, because it reads `AGENTS.md` only through a bridge when a
`CLAUDE.md` exists (`docs/agents-md-notes.md`, `docs/tool-matrix.md`).

## Key trade-offs

- **Autonomy vs control:** Claude Code's auto mode edited files and ran tests
  and typecheck without asking, while Cursor asked for confirmation before
  acting. Both reached the same correct fix in 1 prompt in about a minute, so
  the difference is in oversight, not results (`docs/comparison.md`).
- **Model flexibility vs single-vendor depth:** Cursor offers models from
  several vendors in one picker; Claude Code runs Anthropic models only, with
  Opus 5.5 as the default on Pro and Haiku 5.5 for helper calls
  (`docs/tool-matrix.md`).
- **Flat price vs visible cost:** Cursor's flat subscription with usage pools
  and disabled overage makes spend predictable, but it showed no tokens or
  cost during Task B. Claude Code shows per-session cost through `/cost`, but
  Claude Pro has a 5-hour session limit and a weekly limit
  (`docs/tool-matrix.md`, `docs/comparison.md`).
- **Portability vs bridge files:** one `app/AGENTS.md` serves as the single
  source of truth for both tools, but Claude Code still needs a tool-specific
  `CLAUDE.md` bridge to load it (`docs/agents-md-notes.md`).
- **IDE visual review vs CLI scriptability:** Cursor's Changes panel suits
  reviewing diffs by hand; Claude Code's `claude -p` headless mode suits CI
  and automation (`docs/comparison.md`, `docs/tool-matrix.md`).

## Risk to watch

**Instruction drift between `AGENTS.md` and tool-specific files or caches.**
Task C showed this twice: Cursor served the old, pre-Task-C `app/AGENTS.md`
from a stale cache until it was restarted, and the root `CLAUDE.md` still
describes `app/AGENTS.md` as "deliberately thin" after it was generalized,
which Claude Code flagged as a conflict (`docs/agents-md-notes.md`). To
mitigate this, keep `AGENTS.md` as the single source of truth, allow only
one-line bridge files such as `@AGENTS.md`, restart or reload the tools after
any rule change, and review all instruction files quarterly. Pricing and plans
also change fast: the "Pro" plan seen in the Cursor account is no longer
listed on Cursor's public pricing page (`docs/tool-matrix.md`), so this choice
should be re-checked regularly.
