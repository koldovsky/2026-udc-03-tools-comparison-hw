# Матриця можливостей AI-інструментів (Task A)

Інструменти, що порівнюються: **GitHub Copilot** (у JetBrains IDE) та **Gemini** — Gemini Code Assist (у JetBrains IDE).

> ⚠️ Числа/ліміти залежать від вашого плану підписки — фінально звірте в самій IDE та білінгу. Нижче — конкретні відомі факти станом на 2026-07.

| Критерій | GitHub Copilot (ця IDE) | Gemini (ця IDE) |
|---|---|---|
| Вибір/якість моделі | Перемикач моделей у чаті: GPT-4.1 / GPT-4o, Claude Sonnet 3.5/4, Gemini 2.5 Pro (доступність залежить від плану); дефолт — GPT-4.1 | Gemini 2.5 Pro / 2.5 Flash; дуже великий контекст (до ~1M токенів) |
| Агентна автономність та multi-step execution | Agent mode (редагує кілька файлів, запускає команди, ітерації); у JetBrains розгортається поступово, chat + inline completions | Agent mode / multi-step у чаті IDE, inline; тісна інтеграція з Google Cloud |
| Індексація кодової бази | Контекст відкритих файлів/воркспейсу, `@`-згадки; remote index на GitHub.com | Усвідомлення локальної кодової бази; для enterprise — індексація приватних репо (Code Customization) |
| Підтримка rules / commands / skills / MCP | `.github/copilot-instructions.md` (custom instructions), slash-команди, MCP (у агенті) | Контекстні файли/правила, команди в чаті, MCP-підтримка |
| Ціна та ліміти | Free (обмеж. запити/міс), Pro $10/міс, Pro+ $39/міс, Business $19/user, Enterprise $39/user | Щедрий безкоштовний tier для individuals; Standard/Enterprise через Google Cloud (за user/міс) |
| Enterprise-функції (SSO/SOC2/data residency) | SSO, SOC 2, політики організації, audit-логи; data residency обмежена | Через Google Cloud — SSO, SOC/ISO, VPC-SC, data residency (регіони GCP) |
| Приватність / політика навчання на даних | Business/Enterprise: код НЕ використовується для навчання; Free/Pro — є opt-out | Платні (Standard/Enterprise): код НЕ для навчання; free tier — може використовуватись, є opt-out |

## Висновок

Обидва інструменти доступні прямо в JetBrains IDE й на нашій задачі (Task B)
показали порівнянну якість моделі — обидва знайшли справжню причину бага.
Найсуттєвіша для нас відмінність — не модель, а **автономність у конкретному
IDE-інтерфейсі**: Copilot самостійно застосував фікс і прогнав `npm test`/
`typecheck` за один прохід, тоді як Gemini (за переваги величезного контексту та
щедрого free tier) не зміг сам запустити тести й потребував ~10 ітерацій.
Тобто рішення залежить від того, що важливіше: зріла agent-автономність + запуск
команд (Copilot) чи обсяг контексту/індексація та ціна (Gemini).


