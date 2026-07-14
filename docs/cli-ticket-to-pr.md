# CLI agent: ticket → PR (Task E, bonus)

Ticket: `materials/task-feature-ticket.md` (FEAT-102 — add `capitalizeWords()`).

## CLI agent

Claude Code (headless / `-p` mode) — a genuine separate agent run, handed only
the ticket path.

## Command run

```bash
claude -p "implement the ticket in materials/task-feature-ticket.md" \
  --allowedTools "Edit" "Write" "Bash(npm test)" "Bash(npm run typecheck)"
```

`--allowedTools` granted the agent `npm test` + `npm run typecheck`, so it could
**self-verify in its own loop** instead of just claiming correctness. No
intervention was needed — the ticket was unambiguous.

## What was implemented

The agent added `capitalizeWords(input: string): string` to
`app/src/text-utils.ts`, alongside `slugify`/`truncate`/`parseTags` (untouched).
It splits on a **capturing** whitespace group so separators are kept as tokens,
title-cases each word token, and leaves whitespace tokens verbatim:

```ts
export function capitalizeWords(input: string): string {
  return input
    .split(/(\s+)/)
    .map((token) =>
      /\s/.test(token)
        ? token
        : token.charAt(0).toUpperCase() + token.slice(1).toLowerCase(),
    )
    .join("");
}
```

Because the separators are preserved, multiple/leading/trailing spaces are kept
exactly (never collapsed) — the ticket's easy-to-miss requirement. It added a
`describe("capitalizeWords")` block covering all five table examples plus edge
cases (`""` and whitespace-only) — 6 new tests. Note it used `charAt(0)` (always
`string`), so it sidestepped the `word[0]` → `string | undefined` typecheck trap
that a checks-less run had previously hit under `noUncheckedIndexedAccess`.

## PR

Link: WS3 homework PR from branch `ws03/irakhmanov` — the change appears in the
same homework PR (no separate PR opened, per the walkthrough's "commit within
`ws03/<username>`" option).

Short diff-summary: 2 files, +40 / −1:
- `app/src/text-utils.ts` — +13 (new `capitalizeWords`)
- `app/src/text-utils.test.ts` — +28 / −1 (import + 6 tests)

Verification (re-run independently in this session): `cd app && npm test` →
12 passed; `npm run typecheck` → clean. No deviations to fix.

## Observations: CLI vs IDE agent

- **Autonomy:** the headless CLI run did the whole ticket from a single prompt —
  read the ticket, wrote code + tests, ran the suite, reported back. Great for
  scripting/CI where you want a one-shot "ticket in, diff out".
- **Self-verify depends on permissions.** Granting `npm test` + `npm run
  typecheck` via `--allowedTools` let the agent run the checks in-loop and hand
  back green code. The IDE agent (Task B) runs the suite in-loop by default.
- **Review still matters, but was cheap here.** Even self-verified output needs a
  glance at *how* it went green (an agent can pass checks the wrong way); this
  run was clean, and confirming it cost one `npm test` + `typecheck`.
- **Determinism:** two runs of the same ticket produced two different-but-valid
  implementations (`replace(/\S+/g, …)` vs `split(/(\s+)/)`). The CLI flow is
  reproducible as a *process*, not as an *output* — plan to review the diff, not
  assume it.
