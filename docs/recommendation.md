# Рекомендація для команди (Task D)

Синтез Task A (`docs/tool-matrix.md`), Task B (`docs/comparison.md`) і Task C
(`docs/agents-md-notes.md`).

> **Обмеження:** висновок базується на sample-проєкті `app/` (крихітний TS-модуль).
> Для production-монорепо варто повторити Task B на реальній задачі.

## Рекомендований основний (primary) інструмент

**Cursor (Pro — $20/міс, або $16/міс при annual; Teams — $40/міс, або $32/міс при annual)**

Чому: на задачі BUG-101 обидва інструменти показали **паритет** — знайшли
справжню причину бага (`suffix` не враховується в `maxLength`) з першого промпту,
без регресій (обидва — green test suite). OpenCode був на ~1 хв швидший (~2 хв
проти ~3 хв), але primary обрано не за швидкістю на малій задачі, а за
можливостями матриці для щоденної командної роботи: semantic search з auto-index,
Cloud Agents на VM (build/test/browser), hooks/skills/MCP і enterprise-стек
(SOC 2 Type II; SSO та audit logs — Teams+; SCIM і US data residency —
Enterprise). Task C підтвердив, що `app/AGENTS.md` підхоплюється автоматично —
окремий tool-specific конфіг не знадобився.

## Рекомендований додатковий (secondary) інструмент

**OpenCode** (Core + BYOK або Go $10/міс)

### Сценарії, де OpenCode кращий за Cursor

| Сценарій | Чому OpenCode виграє |
|---|---|
| **CLI-агент у CI/CD** | Headless-запуск (`opencode run --auto`, `--permissions`), без GUI і без cloud VM; легко вбудувати в pipeline (тікет → код → тест). Cursor Cloud Agents потребують IDE/dashboard і окремого billing. |
| **Швидкі правки без IDE** | Достатньо терміналу: `cd repo && opencode`, перемикання `build`/`plan` через Tab. Не треба відкривати Cursor/VS Code для одного бага чи утиліти (як BUG-101 за ~2 хв). |
| **Контроль витрат і вибір моделі** | Core — $0 + BYOK; Go — $10/міс з лімітом $60 usage; Zen — pay-as-you-go (DeepSeek V4 Flash $0.14/$0.28 за 1M tokens). Можна міняти модель mid-session (`/model`) без прив'язки до Cursor credit pools. |
| **BYOK і маршрутизація даних** | Ключі йдуть напряму до обраного провайдера (Anthropic, Bedrock, Ollama); OpenCode не зберігає код на своїх серверах. Cursor завжди маршрутизує через свою інфраструктуру (Privacy Mode/ZDR, але не BYOK-first). |
| **Локальні / air-gapped моделі** | Ollama та інші OpenAI-compatible endpoints «з коробки» — код не покидає периметр, окрім self-hosted LLM. У Cursor немає нативного локального inference. |
| **Read-only аналіз перед змінами** | Агент `plan` за замовчуванням deny edit/bash — зручно для audit чужого коду без ризику випадкового commit. У Cursor аналог є, але потребує IDE-контексту. |

### Чому саме OpenCode, а не інший CLI

Core — MIT і $0 + BYOK; на BUG-101 впорався з першого промпту
(deepseek-v4-flash-free), додав регресійні тести — green test suite. `AGENTS.md`
підхопив так само, як Cursor (Task C) — той самий baseline працює в обох
інструментах. OpenCode не замінює Cursor для щоденної IDE-роботи на великих репо
(немає semantic index), але закриває нішу «агент у терміналі / CI / дешево /
BYOK», де Cursor слабший або дорожчий.

### Коли НЕ обирати OpenCode замість Cursor

- Великі рефактори на незнайомому монорепо — Cursor semantic search + Cloud Agents
  ефективніші за grep/LSP OpenCode.
- Enterprise compliance: SSO і audit logs — Cursor Teams; SCIM і US data residency
  — лише Cursor Enterprise.
- Візуальна розробка, Tab completions, паралельні cloud agents з browser — Cursor-only.

## Ключові компроміси (trade-offs)

- **Ціна vs автономність:** Cursor Pro $20/міс ($16 при annual) дає Cloud Agents
  (build/test/browser на ізольованих VM), hooks lifecycle, до 20 паралельних
  cloud-агентів; OpenCode $0 (BYOK) або Go $10/міс виконується локально без cloud
  VM, але дає більше контролю над моделлю й провайдером. **Розвести сценарії:**
  cloud-автономність (паралельні VM-агенти, browser) — Cursor; headless CLI у
  CI/CD pipeline (GitHub Actions, без IDE) — OpenCode.
- **Якість індексації vs приватність/enterprise-tier:** Cursor має semantic search
  (embedding model → vector DB, auto-index, sync кожні 5 хв) — швидше
  орієнтування у великих репо, але код потрапляє в Cursor embeddings (Privacy
  Mode/ZDR, але не BYOK). OpenCode не індексує код — grep/glob/LSP; не зберігає
  код на своїх серверах, BYOK-first, але на великих незнайомих кодових базах
  поступається в швидкості пошуку.
- **Портативність AGENTS.md vs глибина tool-specific фіч:** Один `app/AGENTS.md`
  працює в обох інструментах без додаткових конфігів (Task C). Але
  Cursor-специфічні hooks (`.cursor/hooks.json`), Cloud Agents, skills marketplace
  та MCP з ~40 tools cap не переносяться в OpenCode. AGENTS.md — спільний baseline,
  але не замінює tool-specific розширень.

## Ризик/застереження, за яким варто стежити

**Непередбачувані витрати Cursor після зміни цінової політики (credit-based billing).**

У червні 2025 Cursor замінив фіксовані «500 fast requests» на credit pools
(Pro = $20 API usage + окремий first-party pool для Auto/Composer). На BUG-101
жоден інструмент не показав токени чи вартість сесії — команда не бачить
реальну ціну одного Agent-запуску до отримання рахунку.

**Що стежити:** щомісячний usage dashboard (cursor.com/settings), швидкість
вичерпання $20 API pool при ручному виборі frontier-моделей (Claude Sonnet ~225
запитів/міс на Pro), неочікуваний on-demand overage після вичерпання ліміту.

**Що зробити зараз:** увімкнути spend limit у налаштуваннях команди; для
рутинних задач — Auto mode (не списує API credits); для CI/дешевих задач —
secondary OpenCode (BYOK або Go $10/міс), щоб не роздувати Cursor bill.

## Підсумок для команди

**Cursor Pro/Teams** — щоденна IDE-робота, semantic search, cloud-агенти,
enterprise-compliance (Teams+). **OpenCode** — CI/CD pipeline, термінальні
задачі, BYOK і контроль витрат. Спільний `app/AGENTS.md` — єдиний baseline
конвенцій для обох інструментів (Task C). Стежити за Cursor usage dashboard і
spend limits; на великих репо повторити порівняння на реальній задачі.
