# AGENTS.md — app/

Context file for any AI tool working inside the `app/` directory.

## Stack

- **Language:** TypeScript (strict mode)
- **Runtime:** Node 22+
- **Test framework:** Vitest

## Commands

```bash
npm test         
npm run build              
```

## Code conventions

1. **Named exports only** — no default exports.
2. **Functional style** — pure functions without side effects; no classes needed.
3. **No comments** — unless the reason is non-obvious (workaround, hidden invariant). What the code does should be clear from the names.
4. **Tests next to source** — `foo.test.ts` lives alongside `foo.ts` in the same directory.
5. **One concept per function** — each util does one thing and does not accept optional flags that radically change its behaviour.

## Guardrails

- **Do not change the public signatures** of `slugify`, `truncate`, or `parseTags` — only the implementation and tests.
- Do not add new dependencies without an explicit request.
- Do not commit `.env` or any secrets — they are gitignored.
- After every change, make sure `npm test` is green.
