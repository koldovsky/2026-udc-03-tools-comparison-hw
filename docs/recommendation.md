# Рекомендація для команди (Task D)

> Синтез Task A ([tool-matrix.md](./tool-matrix.md)) + Task B ([comparison.md](./comparison.md)) + Task C ([agents-md-notes.md](./agents-md-notes.md)).

## Рекомендований основний (primary) інструмент

**GitHub Copilot**

Чому: за матрицею (Task A) Copilot перемагає за enterprise-зрілістю (SOC2, SSO,
audit logs, IP indemnity), найкращим free tier (2000 completions/місяць,
безкоштовно студентам) і найширшим IDE-покриттям (VS Code, JetBrains, Visual
Studio, Neovim — з інлайн-автодоповненням в усіх). На Task B дав робочий фікс
за ~5 хв, 9/9 тестів з першого запуску — той самий рівень якості, що й Claude
Code, і саме цей фікс залишився в `app/src/text-utils.ts`. Task C показав, що
Copilot так само добре розуміє узагальнений `app/AGENTS.md`. Головне: один
інструмент закриває і щоденне написання коду в IDE, і автономні задачі (coding
agent у VS Code й GitHub Actions) — без другої підписки.

**Чому не Claude Code, попри перевагу в Task B:** інлайн-автодоповнення в IDE —
поріг для ролі primary (обов'язкова щоденна функція), а не бал, який можна
компенсувати перевагою деінде. У Claude Code його немає взагалі — структурна
відсутність можливості, а не низький результат, — тож він не кандидат на
primary незалежно від Task B. Його перевага там (сам знайшов причину бага,
фікс без повторних ітерацій) не пропадає — вона й визначає роль secondary
нижче, де цей поріг не діє.

**Чому не JetBrains AI + Junie:** на відміну від Claude Code, JetBrains має
інлайн-автодоповнення — тобто проходить той самий поріг, і вибір тут дійсно
за вагою критеріїв. JetBrains лідирує глибиною індексації й локальними
моделями (приватність/NDA), а Task B підтвердив паритет якості (8/8 тестів,
найсильніше дотримання guardrails) — це не програш «за якістю коду». Але
Copilot виграє за двома вагомішими для цієї ролі критеріями: enterprise-стек,
готовий до corporate-закупівель (SOC2, SSO, IP indemnity вже в Business
$19/seat), і GitHub-нативний конвеєр «issue → draft PR», якого в JetBrains
немає.

## Рекомендований додатковий (secondary) інструмент

**Claude Code** — для сценаріїв: складний дебаг й розроблення нових агентів,
автоматизація CI/CD з hooks, асинхронні беклоги та особливо для non-GitHub
код-хостингів (GitLab, Bitbucket, self-hosted Git).

Чому: за матрицею (Task A) Claude Code лідирує за розширюваністю — skills, hooks
і повна підтримка MCP-серверів, тоді як у Copilot немає еквівалента hooks/
кастомних skills; це напряму підтримує і кастомізацію CI-конвеєрів, і розробку
нових агентів через Agent SDK на тій самій основі. Task B показав, що Claude
Code знайшов першопричину бага й виконав сам фікс без повторних ітерацій
завдяки автономному циклу `read → edit → test` без переривання — це критично
для асинхронного режиму без людського нагляду. Для non-GitHub екосистем (інші Git-хостинги)
Claude Code як headless-агент доступний всюди, тоді як Copilot's coding agent
працює лише в GitHub Actions.

## Ключові компроміси (trade-offs)

- **IDE-охоплення vs CI-автоматизація** — Copilot як primary охоплює весь
  IDE-стек (VS Code, JetBrains, Visual Studio, Neovim) та coding agent у
  GitHub Actions, але без hooks/subagents для non-GitHub кастомної
  автоматизації CI; Claude Code як secondary закриває цю прогалину, але
  потребує окремої підписки для headless-режиму.
- **Ціна (enterprise) vs автономність (CI)** — Copilot бідніший на free tier
  аніж JetBrains (2000 completions vs безлімітне локальне автодоповнення),
  але його enterprise-тір ($19/seat, IP indemnity, audit logs) найзрілніший
  для corporate закупівель; Claude Code натомість виграє для асинхронної
  CI-автоматизації без людського нагляду (hooks, subagents), але без
  безкоштовного тіру.
- **Портативність AGENTS.md vs tool-specific майстерність** — Task C показав,
  що один узагальнений `AGENTS.md` (таблиці, Good/Bad приклади, Common Mistakes)
  однаково добре підхоплюється Copilot, Claude Code та JetBrains без форків
  під кожен — це знижує vendor lock-in. Але усім інструментам все одно
  потрібна парна підписка, щоб закрити обидва form-фактори (IDE + CI/terminal).
- **GitHub-локальність vs універсальність** — Copilot's coding agent вбудований
  у GitHub Actions з нульовим on-boarding, але працює лише для GitHub; Claude Code
  як secondary дає universality для GitLab, Bitbucket, self-hosted Git, але
  потребує додаткової конфігурації.
- **Широта екосистеми (Copilot) vs глибина індексації та приватність (JetBrains
  AI + Junie)** — Copilot виграє ширшим IDE-покриттям і нативним GitHub coding
  agent, але JetBrains лідирує за семантичним індексом кодової бази та єдиною
  опцією локальних моделей; рішучим цей trade-off стає, якщо команда працює
  переважно в IntelliJ або має жорсткі NDA-обмеження.

## Ризик/застереження, за яким варто стежити

Вибір Copilot як primary для IDE + GitHub-центрованого конвеєра («issue → draft PR»)
створює залежність від GitHub/Microsoft-екосистеми (репозиторії, Actions, білінг,
policy-контроль) — не від однієї моделі: каталог моделей Copilot уже мультивендорний
(Claude, GPT, Gemini). Якщо проєкт розширюється на non-GitHub хостинги (GitLab,
Bitbucket) або потребує нативної CI-автоматизації з кастомними hooks поза GitHub
Actions, то Copilot без fallback на Claude Code не закриває потребу.

Пом'якшення:

1. Усім інструментам узгоджена портативна `AGENTS.md` (Task C) знижує risk
   переписування правил.
2. Вже плануємо Claude Code як secondary, що забезпечує універсальність для
   non-GitHub сценаріїв.
3. Якщо GitHub Actions вже є CI-стандартом команди, тоді lock-in до GitHub —
   усвідомлений компроміс в обмін на ширше IDE-охоплення й enterprise-готовність
   (горизонт перегляду — ~6 місяців).
4. Якщо команда виявиться переважно IntelliJ-центричною, JetBrains AI + Junie —
   сильний кандидат на заміну саме для IDE/щоденної частини ролі primary (не для
   enterprise-checklist чи GitHub-агента «issue → draft PR», яких йому бракує):
   2-е місце в матриці (Task A) нарівні з Copilot, той самий рівень якості на
   Task B (8/8 тестів, guardrails без нагадувань) і висока оцінка на Task C
   (той самий тір, що й Claude Code).
