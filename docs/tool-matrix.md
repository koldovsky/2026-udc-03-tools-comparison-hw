# Матриця можливостей AI-інструментів (Task A)

Інструменти, що порівнюються: **Claude Code** (CLI-агент, Anthropic) та **Cursor** (agentic IDE, Anysphere)

Дані станом на липень 2026.

| Критерій | Claude Code | Cursor |
|---|---|---|
| Вибір/якість моделі | Тільки моделі Anthropic: Opus 4.8, Sonnet 5, Haiku 4.5, Fable 5. Перемикання через `/model` у сесії. Через API також доступний на AWS Bedrock / Google Vertex AI | Мульти-вендорний: Claude (Anthropic), GPT (OpenAI), Gemini (Google) + власні моделі Composer і режим Auto (сам обирає модель). Модель обирається на кожен запит |
| Агентна автономність та multi-step execution | Агентний за замовчуванням: план → правки → запуск тестів → git у одному циклі. Permission modes (від підтвердження кожної дії до auto-accept), subagents, hooks, фонові задачі. Headless-режим `claude -p` для CI/скриптів | Agent mode: багатофайлові правки, запуск команд терміналу з підтвердженням, Plan mode, Background Agents (виконання у хмарі). Плюс унікальний для IDE шар — Tab-автодоповнення (безліміт на Pro) |
| Індексація кодової бази | Без постійного індексу — agentic search (grep/glob/читання файлів) на вимогу; контекст проєкту через `CLAUDE.md`/`AGENTS.md`. Нічого не синхронізується на сервер заздалегідь | Постійний embeddings-індекс кодової бази (синхронізується із сервером Cursor); `@`-згадки файлів/доків/символів; `.cursorignore` виключає файли з індексу |
| Підтримка rules / commands / skills / MCP | `CLAUDE.md` + `AGENTS.md` (rules), кастомні slash-команди, Skills (`.claude/skills`), hooks; повний MCP-клієнт (і сам може бути MCP-сервером) | `.cursor/rules` (+ legacy `.cursorrules`), підтримує `AGENTS.md`, кастомні команди, Memories; підтримка MCP-серверів |
| Ціна та ліміти | Входить у підписку Claude: Pro $20/міс (~$17 annual), Max 5x $100, Max 20x $200. Ліміти спільні з Claude-застосунком: 5-годинні rolling-вікна + тижневі капи (загальний і по-модельний). Альтернатива — API pay-per-token без підписки | Hobby безкоштовний (обмежений), Pro $20/міс ($20 usage-кредитів на преміум-моделі + безліміт Auto/Tab), Pro+ $60 (3x usage), Ultra $200 (20x). Teams: Standard seat $40, Premium seat $120 (оновлення червня 2026, окремі пули usage для власних і сторонніх моделей) |
| Enterprise-функції (SSO/SOC2/data residency) | Team ($20–25 / $100–125 за premium seat) та Enterprise: SSO, domain capture, Compliance API, керовані policy settings. Data residency — через розгортання на Bedrock/Vertex у своєму регіоні | Business/Enterprise-плани: SAML SSO, SCIM, адмін-контролі та аналітика usage; SOC 2 Type II. Індекс кодової бази живе на серверах Cursor (US) |
| Приватність / політика навчання на даних | Consumer-плани (Pro/Max): явний вибір opt-in/opt-out щодо навчання на даних (політика з вересня 2025). Team/Enterprise та API — без навчання на даних за замовчуванням | Privacy Mode (примусовий для Teams): код не зберігається і не використовується для навчання. Поза Privacy Mode дані можуть використовуватись для покращення продукту |

## Висновок

Найсуттєвіша відмінність для нашого кейсу — **форм-фактор і модель контексту**:
Cursor — це IDE з постійним серверним індексом кодової бази та Tab-доповненням,
тобто найкращий "щоденний драйвер" для інтерактивної роботи; Claude Code — це
CLI-агент без попередньої індексації, який шукає контекст на льоту і легко
вбудовується в термінальні/CI-сценарії (headless `-p`, hooks, subagents).
Друга суттєва відмінність — **вибір моделей**: Cursor мульти-вендорний
(можна зіставляти Claude/GPT/Gemini в одному вікні), Claude Code прив'язаний до
моделей Anthropic, але дає їм глибшу агентну обв'язку (skills, hooks, MCP-сервер).
За ціною стартові плани ідентичні ($20/міс), різниця з'являється на верхніх
tier'ах: у Cursor usage-кредити на сторонні моделі, у Claude — множники лімітів
однієї екосистеми.

## Джерела

- [Cursor · Pricing](https://cursor.com/pricing)
- [Cursor Pricing 2026: $0 Hobby, $20 Pro, $60 Pro+, $200 Ultra](https://aiproductivity.ai/blog/cursor-pricing/)
- [Cursor Pricing Explained 2026 | Vantage](https://www.vantage.sh/blog/cursor-pricing-explained)
- [Use Claude Code with your Pro or Max plan | Claude Help Center](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)
- [Claude Code Pricing in 2026: Every Plan Explained | SSD Nodes](https://www.ssdnodes.com/blog/claude-code-pricing-in-2026-every-plan-explained-pro-max-api-teams/)
- [Claude Code Usage Limits and Pricing, Explained (June 2026)](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)
