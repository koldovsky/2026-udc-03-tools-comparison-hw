# Рекомендація для команди (Task D)

> Синтез Task A ([tool-matrix.md](./tool-matrix.md)) + Task B ([comparison.md](./comparison.md)) + Task C ([agents-md-notes.md](./agents-md-notes.md)).

## Рекомендований основний (primary) інструмент

**GitHub Copilot**

Чому: за матрицею (Task A) Copilot перемагає за enterprise-зрілістю (SOC2 Type II,
SAML SSO, audit logs, унікальна IP indemnity), найкращим free tier (2000 completions/місяць,
безкоштовно студентам) і найширшим IDE-покриттям (VS Code, JetBrains, Visual Studio,
Neovim + інлайн-автодоповнення в усіх). На практичній задачі (Task B) Copilot дав робочий фікс
за ~5 хв з 1 уточненням, 9/9 тестів зелені з першого запуску — той самий рівень якості, що й
Claude Code (по суті теж ~2 кроки: уточнення + виконання), і саме фікс Copilot зрештою
залишений у `app/src/text-utils.ts`. Task C показав, що Copilot однаково добре
розуміє узагальнений `app/AGENTS.md` із таблицями й кодовими прикладами. Головне: Copilot охоплює
як автономні задачі (coding agent у VS Code й GitHub Actions), так і щоденне написання коду в IDE
без необхідності додавати ще один інструмент — форм-фактор не розбито на дві підписки.

**Чому не JetBrains AI + Junie (найближчий конкурент саме на роль primary — не за
рахунком матриці, а за формою: обидва конкурують за ту саму щоденну роль «inline-
автодоповнення + агент в IDE», тоді як Claude Code CLI-first без інлайн-автодоповнення
претендує на іншу роль, тому й пішов у secondary, а не в «програні primary»):**
JetBrains лідирує саме за глибиною семантичної індексації та єдиною опцією повністю
локальних моделей (приватність/NDA); Task B підтвердив паритет якості — 8/8 тестів,
найсильніше дотримання guardrails. Це не програш «за якістю коду»: Copilot обрано за
двома критеріями поза межами якості фіксу — enterprise-стек, готовий до corporate-
закупівель (SOC2, SSO, IP indemnity вже в Business $19/seat), і GitHub-нативний
конвеєр «issue → draft PR», якого в JetBrains немає.

## Рекомендований додатковий (secondary) інструмент

**Claude Code** — для сценаріїв: складний дебаг й розроблення нових агентів,
автоматизація CI/CD з hooks, асинхронні беклоги та особливо для non-GitHub
код-хостингів (GitLab, Bitbucket, self-hosted Git).

Чому: за матрицею (Task A) Claude Code лідирує за розширюваністю — skills, hooks
і повна підтримка MCP-серверів, тоді як у Copilot немає еквівалента hooks/
кастомних skills; це напряму підтримує і кастомізацію CI-конвеєрів, і розробку
нових агентів через Agent SDK на тій самій основі. Task B показав, що Claude
Code знайшов першопричину бага й мав найменше ітерацій завдяки автономному
циклу `read → edit → test` без переривання — це критично для асинхронного
режиму без людського нагляду. Для non-GitHub екосистем (інші Git-хостинги)
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