# Матриця можливостей AI-інструментів (Task A)

Інструменти, що порівнюються: **Cursor** (agentic IDE) і **Claude Code** (CLI-агент).
Обидва протестовані на цьому homework-репо; Task B (BUG-101 у `truncate()`) виконано
в кожному окремо після скидання `app/src/text-utils.ts` і `text-utils.test.ts`.

| Критерій | Cursor | Claude Code |
|---|---|---|
| Вибір/якість моделі | Мульти-модельний вибір у Agent mode: GPT-5.x, Claude Sonnet/Opus, Gemini, Grok, власна Composer; модель перемикається на запит. На Task B використовувався Composer (agent mode) — фікс з першого проходу | Тільки моделі Anthropic (Opus 4.x, Sonnet 5, Haiku 4.5); перемикання через `/model`. На Task B — Sonnet, фікс з першого проходу. Немає мульти-вендорного вибору |
| Агентна автономність та multi-step execution | Agent mode у VS Code fork: паралельні read/grep/shell, точкові `StrReplace`, автозапуск `npm test`. На BUG-101: 1 промпт → читання `text-utils.ts` + тестів → правка коду й тестів → верифікація; 2-й запуск тестів через sandbox EPERM, автоматичний retry з повними правами | CLI-нативний loop: `find`/`Edit`, TodoWrite, subagents (Task tool), hooks. На BUG-101: 2 промпти (тікет + `npm test`), 1 ітерація правки, тести зелені з першого `npm test`. Сильніший headless/CI-сценарій, слабша IDE-інтеграція |
| Індексація кодової бази | Семантична індексація + `@codebase`; на крихітному `app/` (2 файли) агент одразу знайшов `text-utils.ts` через `Grep`/`Glob` без `@codebase` — індекс не був критичним | Немає embeddings-індексу; пошук через ripgrep/glob «на льоту» + контекст CLAUDE.md/AGENTS.md. На BUG-101 `find` знайшов потрібні файли за ~1 с; для великих репо потребує більше ітерацій пошуку |
| Підтримка rules / commands / skills / MCP | `.cursor/rules`, кореневий `AGENTS.md`, MCP через `.cursor/mcp.json`; Skills як окремі `.cursor/skills/*/SKILL.md`. На Task B автоматично підхопив guardrails з `AGENTS.md` (не чіпати сигнатуру, `npm test`) | `CLAUDE.md`, `AGENTS.md`, slash-commands (`.claude/commands`), Skills, subagents, MCP (stdio/SSE/HTTP). На Task B дотримався acceptance criteria тікета без додаткових нагадувань |
| Ціна та ліміти | Free tier — обмежені «slow» запити; Pro ~$20/міс — місячна квота fast requests + usage-based доплата; Business ~$40/користувача/міс. Токени/вартість за запит у UI не показуються | Pro ~$20/міс, Max $100–200/міс — rolling 5-годинні ліміти; або pay-as-you-go по API-токенах. На Task B token usage у CLI не виводився |
| Enterprise-функції (SSO/SOC2/data residency) | Business/Enterprise: SSO/SAML, SOC 2 Type II, admin dashboard, org-wide Privacy Mode; data residency обмеженіша, ніж у hyperscaler-хостингу | Team/Enterprise: SSO, SCIM, audit logs; Anthropic SOC 2 Type II; data residency через AWS Bedrock / GCP Vertex у потрібному регіоні |
| Приватність / політика навчання на даних | Privacy Mode (org-wide у Business) — код не зберігається й не тренується; на Free/Pro без режиму — історично можливе використання для покращення продукту | API/Enterprise-дані за замовчуванням не йдуть у тренування; zero data retention доступний. Consumer Pro/Max — потрібно явно вимкнути, якщо не хочете навчання на чаті |

## Висновок

На крихітному TS-репо (Task B, BUG-101) обидва інструменти впорались з першого
проходу: знайшли кореневу причину (`suffix` не входив у бюджет `maxLength`),
додали регресійні тести з acceptance criteria, `npm test` — 8/8 зелених. Різниця
виявилась не в якості фіксу, а в **UX і середовищі**: Cursor зручніший для
«тікет у чат → diff у редакторі → тести в терміналі IDE», Claude Code — для
термінального/headless workflow без відкриття редактора.

Найсуттєвіші відмінності для нашого кейсу:

1. **Індексація** — у Cursor є готова семантика (`@codebase`), але на малому
   репо обидва інструменти знайшли файли однаково швидко (grep/find). Перевага
   Cursor проявиться на великих малознайомих кодових базах.
2. **Автономність і середовище** — Claude Code сильніший для CI/скриптів і
   subagent-пайплайнів; Cursor — для щоденної роботи в IDE з візуальним diff і
   вбудованим терміналом (але sandbox іноді вимагає повторного запуску команд,
   як сталося з `npm test`).
3. **Моделі та приватність** — Cursor дає мульти-вендорний вибір «на льоту»;
   Claude Code — глибший контроль enterprise-приватності за замовчуванням на
   API/Enterprise, але без GPT/Gemini в одному CLI.

Для команди на щоденних задачах у IDE primary-кандидат — **Cursor**; для
автоматизації «тікет → PR» у CI або без GUI — **Claude Code** як secondary.
