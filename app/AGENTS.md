# Agents Guidelines

Purpose

This file defines a short baseline for interacting with this small TypeScript project. Keep guidance brief and actionable so the same first prompt works across multiple tools.

General rules

- Use TypeScript and keep changes small and focused.
- Write clean, readable code consistent with the file's existing style.
- Prefer functional style where it makes sense.
- Add comments for anything non-obvious.
- Do not change public function signatures for slugify, truncate, or parseTags.
- Never add secrets or environment files to the repo.
- When suggesting or making changes, explain what changed and why.
- Do not break existing functionality; make sure tests remain green.

First-prompt template (works across tools)

Use this as the very first prompt when delegating work to any agent. It is intentionally explicit and self-contained.

```
Repository: (root of the project)
Task: <one-sentence description, e.g. "Fix bug in app/truncate.ts and add a regression test">
Constraints:
- Only modify files under app/ unless the task explicitly requires docs changes.
- Do not change public function signatures.
- Keep changes minimal and focused; prefer a small, testable patch.
Verification commands (what to run locally):
- cd app && npm test
Expected outcome: tests pass; if adding a regression test, the failing test before the fix must pass after the fix.
Output format: Provide a unified diff or a single-file patch, a concise commit message, and the exact commands you ran to verify locally.
```

Tool-specific notes (keeps prompts portable)

- Copilot CLI / other text-CLI assistants: include required commands and a patch output (diff) so the operator can apply changes locally.
- Cursor / Claude-style web assistants: include the same patch as a code block and a suggested commit message.
- Avoid tool-only syntax; prefer plain English and shell commands.

Verification

Before opening a PR, run:

- cd app && npm test

And ensure all tests pass. If a new test was added, demonstrate the failing->passing lifecycle in the assistant's response (show test failure output, then fix, then passing output).

When committing

- Keep commits small and focused and include a clear message describing the change and why.