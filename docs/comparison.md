# Same-ticket comparison (Task B)

Ticket: `materials/task-bug-fix.md` (BUG-101, `truncate()` does not count the
suffix against `maxLength`). The same unchanged ticket was used in every tool,
so the comparison is apples to apples.

## Run conditions

- The ticket was pasted verbatim as the first and only prompt, in a fresh
  chat/session.
- Code and tests were reset before each run with
  `git checkout -- app/src/text-utils.ts app/src/text-utils.test.ts`.
- Same model in both tools: Claude Opus 5.5, medium effort.
- Caveat: both tools also load the repo-root `AGENTS.md`, which says that
  `truncate()` has a planted bug, and the ticket itself names the root cause.
  So this run does **not** measure whether a tool finds the bug unaided. It
  measures how each tool carries out a well-specified fix.

## Results

| Tool | Time to working fix | Iterations/prompts | Quality (found the real bug? regressions?) | Tokens/cost (if visible) | UX notes |
|---|---|---|---|---|---|
| Cursor (Agent, "Claude Opus 5.5 Medium", Fast mode off) | ~1 min (22:19 → 22:20) | 1 prompt, no follow-ups, no corrections. Cursor asked for confirmation before acting (number of prompts not recorded); approvals not counted as iterations | Correct fix: slices to `maxLength - suffix.length`; if `suffix.length >= maxLength` returns `suffix.slice(0, Math.max(0, maxLength))`; also guards negative `maxLength` (beyond the ticket). Signature unchanged. 3 tests: exact ticket regression (`"a long ..."`, length 10); suffix-does-not-fit for `maxLength` 3, 2, 0; exhaustive property-style loop (`maxLength` 0 … input length + 2, suffixes `""`, `"."`, `"..."`, `"[more]"`, asserting length ≤ `maxLength`). 9/9 tests pass, `tsc --noEmit` clean, diff 2 files +27/−1, no regressions (verified independently with `npm test` / `git diff`) | Not visible in the Cursor UI during the run | Agent-first window; "2 Files Changed" summary with a Review button under the answer; Changes side panel with per-file diffs; built-in "Commit & Push" button (not used) |
| Claude Code CLI v2.1.319 (Claude Pro, Opus 5.5, effort medium, auto permission mode) | ~1 min (22:27 → 22:28); agent reported 44 s of work, 36 s API time | 1 prompt, no follow-ups. One internal self-correction: its first scripted edit to the test file did not match (likely CRLF line endings), wrote nothing, and was redone with the Edit tool | Correct fix, same logic as Cursor (`maxLength - suffix.length`, suffix clipped with `Math.max(0, maxLength)`, negative `maxLength` guarded). Signature unchanged. Test-first: ran the new tests against the old code and confirmed all three failed before fixing. 3 tests: ticket regression (`"a long ..."`, length ≤ 10); suffix-does-not-fit for `maxLength` 3, 2, 0; negative `maxLength` −1 returns `""`. 9/9 tests pass, `tsc --noEmit` clean, diff 2 files +24/−1, no regressions (verified independently with `npm test` / `git diff`). This is the kept fix (committed as `e32bc4d`), because its regression test was proven to fail on the buggy code before the fix | From `/cost`: $0.3260 API-equivalent, charged against the Claude Pro subscription (11% of the current session limit). Opus 5.5: 518 input, 3.8k output, 326.5k cache read, 22.8k cache write tokens; Haiku 5.5 for small helper calls (2.8k input, 313 output, $0.0004); 93% of input tokens served from prompt cache | Terminal UI with a side diff panel; in auto mode it edited files and ran tests/typecheck without asking for any permission; the final report flagged caveats on its own (the ticket already names the cause, the pre-existing `truncate` test is weak, the ticket says `text` while the code says `input`); suggested "commit this" (not used) |

## Conclusion

With the same model, both tools produced a near-identical, correct fix from a
single prompt in about a minute, but the ticket and the repo-root `AGENTS.md`
already reveal the cause, so this run does not show which tool would find the
bug unaided. The differences were in process and autonomy: in auto mode Claude
Code verified its new tests failed on the buggy code first, corrected its own
failed edit, and never asked for permission, while Cursor asked for
confirmation before acting. On test strength Cursor did better, as its
exhaustive length loop is the strongest single test from either run, and on
cost transparency Claude Code did better, with exact token and dollar figures
from `/cost` where Cursor showed none.
