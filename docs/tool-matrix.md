# Матриця можливостей AI-інструментів (Task A)

Інструменти, що порівнюються: **Cursor**, **GitHub Copilot (VS Code)**, **Claude Code (CLI)**

| Критерій | Cursor | GitHub Copilot | Claude Code |
|---|---|---|---|
| Вибір/якість моделі | Composer 2.x, GPT-5.x, Claude Sonnet/Opus — перемикається в IDE | GPT-4.1 / GPT-5 mini (Copilot Pro); обмежений вибір у free tier | Claude Sonnet 4.6 / Opus 4.8; модель задається в CLI |
| Агентна автономність та multi-step execution | Agent mode: багатокрокові зміни, термінал, MCP, subagents | Copilot Edits / agent mode (обмеженіший scope, менше автономії) | Повний repo context, bash, git, багатокрокові сесії з `--continue` |
| Іndексація кодової бази | @file / @folder, codebase search, `.cursorignore` | Workspace index у VS Code; `@workspace` | Читає файли через tools; немає окремого UI-індексу |
| Підтримка rules / commands / skills / MCP | `.cursor/rules`, `.cursor/commands`, skills, MCP servers | Copilot instructions (`.github/copilot-instructions.md`), обмежені custom instructions | `CLAUDE.md`, `.claude/commands`, MCP через config |
| Ціна та ліміти | Pro ~$20/міс; usage-based на premium models | Pro ~$10/міс; free tier — 2000 completions/міс | Pro ~$20/міс (Max); CLI ліміти за tier |
| Enterprise-функції (SSO/SOC2/data residency) | Business: SSO, privacy mode, zero retention опції | Enterprise: SSO, policy, IP indemnity | Team/Enterprise: SSO, audit, data controls |
| Приватність / політика навчання на даних | Privacy Mode — no train on code (Business) | Enterprise no-train; standard — aggregated telemetry | Anthropic API/Claude for Work — no train on inputs (commercial) |

## Висновок

Найбільші відмінності — **автономність** (Cursor/Claude Code >> Copilot inline) та **екосистема rules/commands** (Cursor найбагатший UI, Claude Code — найкращий для headless/CI). Copilot виграє на **ціні** та **швидких inline-доповненнях**, але програє на multi-file agent tasks. Для homework-style bug fix Cursor дав найшвидший цикл «тікет → тест → фікс» без ручного copy-paste між файлами.
