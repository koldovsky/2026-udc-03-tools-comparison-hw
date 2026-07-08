# AGENTS.md — Baseline for any AI coding tool in `app/`

**→ Critical:** Read this entire file before writing any code. All conventions and guardrails are stated here — do not ask the user to repeat them.

---

## Quick Start

**TypeScript project, no frameworks. Write small, pure, tested functions.**

| What        | Command                                                       | When                                         |
|-------------|---------------------------------------------------------------|----------------------------------------------|
| Build       | N/A — no build step for runtime (library-only); use typecheck | Not required for this sample                 |
| Typecheck   | `npm run typecheck`                                           | Before finishing any code change             |
| Test        | `npm test`                                                    | After writing/modifying code — **MUST pass** |
| Watch tests | `npm run test:watch`                                          | While developing                             |
| Lint        | Not configured — do NOT add one                               | ❌ Never unless explicitly asked             |

**Run all commands from `app/` directory.**

---

## Stack

- **TypeScript:** ES2022, ESNext modules, `strict: true`, `noUncheckedIndexedAccess: true`
- **Runtime:** Plain functions in `src/`, no framework, no external deps beyond `vitest` (tests) and `typescript` (types)
- **Testing with Vitest:** Use explicit imports — `import { describe, it, expect } from "vitest"`
- **ESM imports in tests:** Use `.js` extension in relative imports (e.g., `import { truncate } from "./text-utils.js"`)

Notes
-----
- Commands are executed from the `app/` directory.
- Linting is intentionally not set up in this sample project.
- Formatting: rely on IDE defaults; no Prettier/ESLint configs are present.

---

## Code Conventions

### Exports

| ✓ Good                                                   | ❌ Bad                                               |
|----------------------------------------------------------|------------------------------------------------------|
| `export function slugify(input: string): string { ... }` | `export default function(...) { ... }`               |
| All exported functions have explicit types               | `export function truncate(input, maxLength) { ... }` |

**Rule:** Named exports only, explicit param + return types on every exported function.

### Function Design

- **Pure functions:** No shared mutable state, no I/O in `src/` files. Same input → always same output.
- **Small & simple:** Use TypeScript built-ins (`String`, `Array`, `Set`). Don't add npm deps for utility functions at this scale.
- **No default exports.** Named exports only.
- **Explicit types.** Every exported function specifies parameter and return types.
- **File co-location.** Keep tests next to source (e.g., `src/text-utils.test.ts`).

### Example: Good vs Bad

**✓ GOOD:**
```typescript
export function truncate(input: string, maxLength: number, suffix = "..."): string {
  if (input.length <= maxLength) {
    return input;
  }
  if (suffix.length >= maxLength) {
    return suffix.slice(0, maxLength);
  }
  return input.slice(0, maxLength - suffix.length) + suffix;
}
```

**❌ BAD:**
```typescript
// Default export — don't do this
export default function truncate(input, maxLength) {
  return input.slice(0, maxLength) + "...";  // No type safety, no suffix param
}
```

---

## Test Conventions

| Rule                          | Example                                                             |
|-------------------------------|---------------------------------------------------------------------|
| **File location**             | `src/text-utils.test.ts` (next to source)                           |
| **One describe per function** | `describe("truncate", () => { it(...) })`                           |
| **Coverage**                  | Happy path + edge cases (empty input, boundaries, null-like inputs) |
| **Use explicit imports**      | `import { describe, it, expect } from "vitest"`                     |

**✓ GOOD:**
```typescript
import { describe, it, expect } from "vitest";
import { truncate } from "./text-utils.js";

describe("truncate", () => {
  it("returns input unchanged if shorter than maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("handles edge case: suffix longer than maxLength", () => {
    const result = truncate("hello world", 2, "...");
    expect(result.length).toBeLessThanOrEqual(2);
    expect(result).toBe("..");
  });
});
```

**❌ BAD:**
```typescript
describe("utils", () => {
  // Multiple functions in one describe — don't do this
  it("slugify and truncate", () => { /* ... */ });
});
```

---

## Guardrails

### When fixing a bug:
- ❌ Do NOT change the public signature of an exported function (parameters, return type)
- ✓ Only change the implementation and add tests
- Example: if fixing `truncate()`, edit only implementation & tests, not `(input: string, maxLength: number, suffix?: string)`

### Dependencies & tooling:
- ❌ Do NOT add linter, formatter, or new npm dependency unless explicitly asked
- ❌ Do NOT run `eslint`, `prettier`, `husky`, or any tool not listed in Quick Start above
- If user says "use [library]", ask for confirmation first — do not assume
- ❌ Do NOT modify `package.json` (dependencies, scripts) unless explicitly asked

### Testing & validation:
- ❌ Do NOT declare code "done" until `npm test` passes (all green)
- If a test fails → fix it; never declare done with red tests
- When changing behavior, explain what changed and why (in comments or commit)

### Output & feedback:
- Always run `npm run typecheck` and `npm test` before declaring a task complete
- Report results: "✓ Typecheck passed" and "✓ All tests pass (X/X)"
- If tests fail, show which failed and fix them — do not ask the user
- Keep each commit focused to a single logical change

---

## Common Mistakes to Avoid

| Mistake                                               | Why it's wrong                                  | Fix                                         |
|-------------------------------------------------------|-------------------------------------------------|---------------------------------------------|
| `export default function`                             | Can't be tree-shaken, breaks imports            | Use `export function`                       |
| Missing return type: `export function foo(x) { ... }` | Type safety lost; breaks strict mode            | Add `: string` or `: boolean`               |
| `const utils = require("...")`                        | CommonJS in ESM module                          | Use ES6 `import` or named exports           |
| Adding `eslint`/`prettier`                            | Project doesn't use them; adds unnecessary deps | Never add; this is a guardrail              |
| Writing tests without edge cases                      | Won't catch real bugs                           | Add tests for empty input, boundaries, null |
| Saying "done" before running `npm test`               | Tests catch hidden errors                       | Always run both commands first              |

---

## Verification Checklist — Must Complete Before "Done"

**Run these in order. If any fails, fix it and re-run.**

```bash
cd app

# 1. Typecheck — must see NO errors
npm run typecheck

# 2. Tests — must see ALL PASS
npm test

# Example output:
# ✓ slugify (2 tests)
# ✓ parseTags (2 tests)
# ✓ truncate (5 tests)
# Test Files  1 passed (1)
#      Tests  9 passed (9)
```

**Then verify these manually:**

- [ ] 1. Typecheck: No errors → ✓
- [ ] 2. Tests: All pass → ✓
- [ ] 3. `package.json` unchanged → only `typescript` and `vitest` in devDeps
- [ ] 4. Every exported function has a `describe(...)` block in tests
- [ ] 5. No breaking changes to function signatures
- [ ] 6. No new `eslint`/`prettier`/`husky` commands added

**→ Only after all 6 checks pass: the task is done.**

---

## Summary: What This Project Expects

1. **Write small, pure, tested functions** — no frameworks
2. **Named exports with explicit types** — every exported function
3. **One test describe per function** — plus edge cases
4. **Run typecheck + test before done** — both must pass
5. **Never add dependencies or linters** — guardrail
6. **Fix broken tests yourself** — don't ask the user

That's it. Keep it simple.

## Agent Workflow Template (optional)

Copy-paste prompt skeleton for tools that expect a structured task description:

```text
Task: <one-line task summary>
Files: edit only these files: <paths>
Goal: <what must be achieved; include tests to add or failing test to fix>
Constraints: do not change public signatures; no new npm deps; follow this AGENTS.md
Run: after changes run `npm run typecheck` and `npm test` and include the relevant passing lines in the response
Output: provide a minimal git-style patch for only the changed files, a 1-line commit message, and a brief rationale for correctness.
```
