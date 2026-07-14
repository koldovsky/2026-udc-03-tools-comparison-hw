# Матриця можливостей AI-інструментів (Task A)

Інструменти, що порівнюються: **Cursor**, **GitHub Copilot (VS Code)**, **Claude Code (CLI)**

> **As of:** 2026-07-14. Рядки з цінами/політиками — **vendor claims** (офіційні джерела нижче). Рядки про UX/autonomy — **власні спостереження** з Task B.

| Критерій | Cursor | GitHub Copilot | Claude Code |
|---|---|---|---|
| Вибір/якість моделі | Composer 2.x, GPT-5.x, Claude Sonnet/Opus — перемикається в IDE *(vendor)* | GPT-4.1 / GPT-5 mini (Copilot Pro); обмежений вибір у free tier *(vendor)* | Claude Sonnet 4.6 / Opus 4.8; модель задається в CLI *(vendor)* |
| Агентна автономність та multi-step execution | Agent mode: багатокрокові зміни, термінал, MCP, subagents *(спостереження)* | Copilot Edits / agent mode (обмеженіший scope) *(спостереження)* | Repo context, bash, git, `--continue` *(спостереження)* |
| Іndekсація кодової бази | @file / @folder, codebase search, `.cursorignore` *(спостереження)* | Workspace index; `@workspace` *(спостереження)* | Читає файли через tools *(спостереження)* |
| Підтримка rules / commands / skills / MCP | `.cursor/rules`, `.cursor/commands`, skills, MCP *(vendor + спостереження)* | `.github/copilot-instructions.md` *(vendor)* | `CLAUDE.md`, `.claude/commands`, MCP *(vendor)* |
| Ціна та ліміти | Pro ~$20/міс *(vendor: cursor.com/pricing)* | Pro ~$10/міс; free tier 2000 completions *(vendor: github.com/features/copilot/plans)* | Pro/Max ~$20/міс *(vendor: claude.com/pricing)* |
| Enterprise-функції | Business: SSO, Privacy Mode *(vendor: cursor.com/docs/enterprise)* | Enterprise: SSO, DPA *(vendor: docs.github.com/copilot)* | Team/Enterprise: SSO, audit *(vendor: code.claude.com/docs)* |
| Приватність / навчання | Privacy Mode — no train on code (Business) *(vendor)* | Enterprise no-train; Individual may opt out *(vendor)* | Commercial — no train on inputs unless opted in *(vendor)* |

### Офіційні джерела

- Cursor: [pricing](https://cursor.com/pricing), [privacy](https://cursor.com/docs/enterprise/privacy-and-data-governance)
- GitHub Copilot: [plans](https://github.com/features/copilot/plans), [data policies](https://docs.github.com/en/copilot)
- Claude: [pricing](https://claude.com/pricing), [data usage](https://code.claude.com/docs/en/data-usage)

## Висновок

Найбільші відмінності — **автономність** (Cursor/Claude Code >> Copilot inline) та **екосистема rules/commands**. Copilot виграє на **ціні** та inline-доповненнях. Для BUG-101 (Task B) Cursor дав найшвидший цикл «тікет → тест → фікс».
