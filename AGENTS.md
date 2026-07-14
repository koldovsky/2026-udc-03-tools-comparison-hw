# AI Agent Guidelines & Project Context

This file serves as the universal baseline configuration and context for all AI agents, CLI assistants, and IDE extensions interacting with the application code inside the `app/` directory.

## Project Stack & Environment

- **Language:** TypeScript (TS)
- **Runtime:** Node.js
- **Testing Framework:** Jest

## Allowed Commands

When executing automation, building, or running quality checks, use exactly these scripts:
- **Build Project:** `npm run build`
- **Run Tests:** `npm test`
- **Linting:** Not configured (do NOT attempt to invent or execute any lint commands)

## Code Conventions

1. **Hard Limit Ceilings:** Always treat maximum length limits (`maxLength`) as strict, absolute ceilings. The length of any attached `suffix` must always be counted against the total `maxLength` constraint.
2. **Pure Functions:** Maintain utility helper functions as pure, side-effect-free blocks. They must reside logically inside `app/src/text-utils.ts` or sibling utility files.
3. **No External Dependencies:** Do not import third-party libraries or packages for basic string manipulations unless explicitly instructed in the user prompt.
4. **Public Signature Stability:** Never modify, wrap, or break the existing public signature of exported functions (`slugify`, `truncate`, `parseTags`) to avoid breaking downstream consumers.

## Guardrails

- **Test-Driven Finalization:** Always run `npm test` and ensure all suites pass green before declaring any implementation or fix as finished.
- **Regression Isolation:** When resolving bugs, you must implement at least one regression unit test that safely isolates and prevents the reported scenario in the future.
- **Defensive Boundary Checks:** Always explicitly test and handle edge cases such as empty input strings, zero/negative limits, or out-of-bounds parameters.
