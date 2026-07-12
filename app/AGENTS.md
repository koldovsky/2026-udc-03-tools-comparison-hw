# Agent Guidelines

This is a small TypeScript sample project used for the WS3 AI tools comparison
exercise. These instructions are tool-agnostic and apply to any coding agent or
AI-assisted IDE working in this app.

## Stack

- TypeScript with ESM modules (`"type": "module"`).
- Node.js package scripts managed with npm.
- Vitest for unit tests.
- `tsc --noEmit` for type checking.
- Source code lives in `src/`.

## Commands

Run commands from the `app/` directory:

- Install dependencies: `npm install`
- Test: `npm test`
- Watch tests: `npm run test:watch`
- Type check: `npm run typecheck`
- Build: not configured
- Lint: not configured

## Code Conventions

- Keep public function signatures stable for `slugify`, `truncate`, and
  `parseTags`.
- Use strict TypeScript and keep return types explicit on exported functions.
- Follow the existing small-helper style: simple functions, early returns, and
  readable transformation chains.
- Keep tests close to behavior and cover edge cases with clear Vitest
  assertions.
- Add comments only for non-obvious logic; avoid narrating straightforward code.

## Guardrails

- Do not introduce secrets, API keys, `.env` files, or real client data.
- Do not add new runtime dependencies unless the task clearly requires them.
- Do not invent missing project commands; if lint or build is needed, first add
  the script intentionally and document the change.
- Preserve existing behavior unless the task explicitly asks for a behavior
  change or a bug fix.
- Before handing off code changes, run `npm test` and `npm run typecheck` from
  `app/` when possible.

When reporting changes, briefly explain what changed, why it changed, and which
verification commands were run.
