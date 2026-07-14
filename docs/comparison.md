# Same-task comparison (Task B)

Task: `materials/task-bug-fix.md` (**BUG-101** — `truncate()` returns a string
longer than `maxLength` because the suffix is appended after slicing). The exact
same, unmodified ticket was given to both tools; code + tests were reset to the
buggy baseline between runs so the comparison is apples-to-apples.

Expected fix: reserve room for the suffix (`slice(0, maxLength - suffix.length) + suffix`)
and handle the `suffix.length >= maxLength` edge case without throwing.

| Tool | Time to working fix | Iterations / prompts | Quality (found real bug? regressions?) | Tokens / cost | UX notes |
|---|---|---|---|---|---|
| **Claude Code** (Opus 4.8) | ~35 s API time (single turn; ~18 s tool execution) | **1** — single pass, no back-and-forth | Found the **real cause** (reserve suffix room + edge case); **no regressions**; kept both existing tests and **added 3** (ticket example → `"a long ..."`, "never exceeds maxLength", too-long-suffix). 15 tests green, typecheck clean. | **$1.14** for the run (Δ from `/usage`): ~2.1k output, ~2.2M cache-read, ~0 new input tokens | CLI/IDE agent: edited files directly, ran `npm test` + `npm run typecheck` itself, and reported green in one turn. |
| **GitHub Copilot** (VS Code, **GPT-5.4**) | ~1 min 25 s (17:33:14 → 17:34:39 UTC) | **1** — fixed from the pasted ticket in one pass | Found the **real cause** — produced the **identical** canonical fix; **no regressions**; added a "never exceeds maxLength" regression test + an edge test that also covers the `suffix.length == maxLength` boundary (`truncate("hello world", 3, "...")` → `"..."`). **Rewrote** one existing test into a stricter exact-match rather than leaving it. 14 tests green, typecheck clean. | **~10.2 AI Credits ≈ $0.10**; 173.4k input (157.7k cached) / 1.6k output (325 reasoning); model **gpt-5.4** | Agent mode; **requested approval** before applying the edit. |

## Conclusion

Both tools independently identified the **true root cause** and produced the
**same canonical fix** (reserve suffix room + edge case) on a single prompt — a
tie on correctness, and both fully met the acceptance criteria. The only
differences were in test authoring: **Claude Code** preserved both existing
tests and added three; **Copilot** rewrote one existing test and added two, and
its edge test additionally covers the `suffix.length == maxLength` boundary.
For a small, precisely-specified bug like this — the ticket even states the exact
expected output — the two tools were essentially equivalent on correctness; the
ticket's clarity likely drove both to the same solution.

The one real gap was **cost**: Copilot (on **GPT-5.4**) spent ~**$0.10** (10.2
AI Credits, heavily cached), versus Claude Code (on **Opus 4.8**) at **$1.14** —
a ~10× difference. Most of that is model choice and cache footprint rather than
the fix itself, so it says more about the model/pricing tier than the tool's
bug-fixing ability. Speed was close (Claude ~18 s wall / ~35 s API vs Copilot
~1 min 25 s). The final fix left in `app/src/text-utils.ts` is Copilot's version
(functionally identical, with the marginally broader edge test); `npm test` is green.
