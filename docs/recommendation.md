# Team recommendation (Task D)

Synthesis of Task A (capability matrix), Task B (same-task comparison), and
Task C (cross-tool `AGENTS.md`).

## Recommended primary tool

**GitHub Copilot (in VS Code)**

Why: On the capability matrix (Task A) it has the lowest entry price ($10 Pro),
a multi-vendor model picker (Claude + GPT-5.x + Gemini), and native VS Code /
GitHub integration (issue→PR coding agent, `@workspace` indexing) — and most of
the team already works in VS Code, so adoption cost is near zero. On the shared
bug-fix task (Task B) it produced the **exact same correct fix** as Claude Code,
in one prompt via agent mode (with an approval step), at ~**$0.10** (10.2 AI
Credits) versus **$1.14** — roughly 10× cheaper for the same result. For everyday
coding across a team, that combination of low cost, model flexibility, and
in-editor fit makes it the sensible default.

## Recommended secondary tool

**Claude Code** — for: deep multi-step autonomy, large/complex refactors, and
headless **CLI ticket→PR in CI** (Task E), plus plan mode / subagents / hooks.

Why: it is the stronger fully-autonomous agent with a 1M-token context, so it
earns its keep on the hardest, longest-horizon work where Copilot's per-seat
convenience matters less. Task C showed a single `AGENTS.md` is honored by both
tools, so running Claude Code alongside Copilot carries **low switching cost** —
the same project context works in either.

## Key trade-offs

- **Cost vs autonomy** — Copilot is cheaper per task; Claude Code goes deeper on
  multi-step, autonomous work.
- **Model breadth vs single-vendor depth** — Copilot's picker (Claude + GPT +
  Gemini) vs Claude-only with a 1M context.
- **Indexing vs on-demand search** — Copilot's embeddings / `@workspace` retrieval
  vs Claude Code's agentic live-file search.
- **Portability vs tool depth** — a shared, portable `AGENTS.md` (Task C) vs
  each tool's deeper tool-specific features.
- **SaaS-managed vs self-routable** — Copilot's GitHub-managed model serving vs
  Claude Code targeting AWS Bedrock or an internal LLM gateway (Task A enterprise
  section) for orgs that need models inside their own boundary.

## ⚠️ Important caveat — this pick is provisional

The Task B head-to-head was **not a decisive, like-for-like test**, on two axes:

- **Different models.** Copilot ran **GPT-5.4**; Claude Code ran **Opus 4.8**. The
  correctness "tie" and the ~10× cost gap reflect **model and pricing tier as much
  as the tools themselves** — the comparison is not model-normalized. (Copilot can
  also run Claude models; we simply didn't force that here.)
- **Task simplicity.** Task B was **one small, precisely-specified bug** — the
  ticket even stated the exact expected output. Easy, well-scoped tasks compress
  the differences between tools. On **hard, ambiguous, multi-step** work, model
  capability and agent autonomy dominate, and the ranking could flip toward
  Claude Code.

**Before committing org-wide,** re-run the comparison on a harder, under-specified
task and **normalize the model** (e.g. point Copilot at the same Claude model) so
cost and quality are compared on equal footing.

## Risk / caveat to watch

**Copilot's usage-based "AI Credits" billing** (since 2026-06-01). Cost now scales
with agentic usage, and GitHub states credit allotments "may change over time."
A pricing/allotment change — or heavy agent sessions blowing past the monthly
allowance — could erode the very cost advantage that made Copilot the primary
pick. Track per-team credit burn and set spending budgets so the economics stay
in the range this recommendation assumes.
