# Agent instructions for this app

This is a small TypeScript sample project used for the workshop tool-comparison exercise. These instructions are tool-agnostic and apply to any AI coding assistant working in `app/`.

## Stack

- Runtime/module style: Node.js with ES modules (`"type": "module"`)
- Language: TypeScript
- Tests: Vitest
- Type checking: `tsc --noEmit`

## Commands

Run commands from the `app/` directory.

- Install dependencies: `npm install`
- Test: `npm test`
- Watch tests: `npm run test:watch`
- Typecheck: `npm run typecheck`
- Build: not configured
- Lint: not configured

## Code conventions

- Keep implementations small, readable, and idiomatic TypeScript.
- Follow the existing style in the file you edit; avoid broad formatting-only changes.
- Prefer pure functions and simple data transformations where they fit.
- Preserve public function signatures unless a task explicitly requires otherwise.
- Add comments only for non-obvious behavior, constraints, or edge cases.

## Guardrails

- Do not break existing behavior; add or update tests for behavior changes and bug fixes.
- Do not invent commands, dependencies, or tooling that are not present in `package.json`.
- Do not commit secrets, API keys, `.env` files, or real client/NDA-protected data.
- Keep changes focused on the requested task; avoid unrelated refactors.
- When fixing `slugify`, `truncate`, or `parseTags`, do not change their public signatures.

## Reporting changes

When suggesting or making changes, briefly explain what changed, why it changed, and which validation command was run. If validation was not run, state why.
