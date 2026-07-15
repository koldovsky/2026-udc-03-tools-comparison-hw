# AGENTS.md

Shared context for any AI coding assistant working on this TypeScript text utilities package.

## Project

- Small TypeScript utility library for text normalization, display-safe truncation, and tag parsing.
- Runtime/package format: Node.js with ESM (`"type": "module"`).
- Source files live in `src/`.
- Tests use Vitest and sit next to the source as `*.test.ts`.

## Commands

- Install dependencies: `npm install`
- Test: `npm test`
- Build/typecheck: `npm run typecheck`
- Lint: not configured. Do not invent or run a lint command for this package.

## Code Conventions

- Keep implementations small, readable, and typed; prefer straightforward pure functions for utilities.
- Follow the existing style in `src/text-utils.ts`: named exports, no classes, no unnecessary abstractions.
- Preserve public function signatures unless the task explicitly asks for an API change.
- Add or update Vitest coverage for behavior changes, especially regression cases.
- Avoid new dependencies unless they are clearly needed for the requested task.
- Use generic test strings and examples that document utility behavior clearly.

## Guardrails

- Do not commit secrets, API keys, `.env` files, real client data, or NDA-protected details.
- Do not add real customer data, production content, or domain-specific business examples.
- Keep changes focused on the text utilities package; avoid editing unrelated files.
- Before handing off code changes, run `npm test`; run `npm run typecheck` when TypeScript behavior changed.
- If a requested command is not present in `package.json`, say so instead of guessing.
