# AGENTS.md — app/

Cross-tool baseline for this tiny TypeScript sample (WS3 tool-comparison target).

## Stack

- TypeScript, Node 22+, vitest, ESM (`"type": "module"`)
- Lint: **не налаштовано** (немає eslint/prettier скриптів)

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run vitest once |
| `npm run test:watch` | Watch mode |

## Conventions

1. One module per concern: `src/text-utils.ts` + `src/text-utils.test.ts`.
2. Pure functions, no side effects; functional style where it fits existing code.
3. Match naming and formatting already in the file you edit.
4. Export new utilities alongside `slugify`, `truncate`, `parseTags`.
5. Add a short comment only for non-obvious logic (edge cases, invariants).

## Guardrails

- Do not break existing tests or public signatures without explicit ask.
- Do not add dependencies without asking.
- Explain what changed and why when suggesting edits.
