# AGENTS.md — Project Context

**Tech stack:** TypeScript (ESM), Vitest, Node 22+

## Commands

- **test:** `cd app && npm test` (runs vitest)
- **typecheck:** `npm run typecheck` (tsc --noEmit)
- **build:** not configured (no bundler)
- **lint:** not configured

## Code Conventions

- Write clean, readable code — prefer clarity over brevity
- Follow existing code style in the file you're editing (see `src/text-utils.ts` as reference)
- Prefer functional style: no mutations, pure functions where possible
- Add comments only for non-obvious logic (why, not what)
- Function naming: descriptive (`truncate`, `parseTags`), not abbreviations

## Guardrails

- **Don't break public signatures** of exported functions (`slugify`, `truncate`, `parseTags`)
- Don't change behavior of existing, passing tests without explicit requirement
- Don't commit secrets or `.env` files — they're gitignored
- When suggesting changes, explain what you changed and why
