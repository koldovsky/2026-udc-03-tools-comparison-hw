# Рекомендація для команди (Task D)

Синтез Task A (матриця можливостей), Task B (BUG-101 у двох інструментах) і Task C (крос-tool `app/AGENTS.md`).

## Рекомендований основний (primary) інструмент

**Cursor IDE**

Чому: у Task B на однаковому тікеті Cursor IDE впорався швидше (~2–3 хв проти ~3–5 хв) і з повнішим циклом «промпт → правка → `npm test`» без ручних кроків. Якість фіксу однаково висока (корінь бага знайдено з першого промпту), але Cursor дав компактніший код і ширше покриття edge-case у тестах. За матрицею (Task A) Cursor IDE сильніший у **агентній автономності** (Agent/Composer, Background/Cloud Agents), **rules/skills/MCP** без обмежень ACP і **нативній індексації** для TS/JS/Python — тобто для щоденної роботи в web/TS-репо це найменше тертя. Task C підтвердив: `app/AGENTS.md` підхоплюється точно, без tool-specific доповнень. Вартість передбачувана: Pro від $20/міс, Teams від $40/корист. з SSO та shared rules для команди.

## Рекомендований додатковий (secondary) інструмент

**IntelliJ IDEA + Cursor (ACP)** — для сценаріїв: **Java/Kotlin/Spring/Android**, важкі рефакторинги, debugging і inspections у великих багатомовних монорепо, коли команда вже сидить у JetBrains і не хоче міняти основну IDE.

Чому: той самий Cursor-агент і billing без другої AI-підписки, але з **глибокою code intelligence JetBrains** (рефакторинг, debugger, навігація), якої Cursor IDE як VS Code fork не замінює. На BUG-101 результат еквівалентний (1 промпт, коректний фікс), тож для «тікет → код» ACP працює; слабше місце — неповна передача rules/MCP і відсутність Tab/Background Agents порівняно з native Cursor. Task C: конвенції підхоплюються, але агент схильний розширювати контекст на весь репо — у промптах варто явно вказувати scope (`app/`).

## Ключові компроміси (trade-offs)

- **Агентний UX vs звична IDE:** Cursor IDE — швидший цикл і повний agentic stack; IntelliJ + ACP — зручніше для JVM-стеку, але AI Chat замість нативного Composer і без Tab від Cursor.
- **Одна підписка, дві «оболонки»:** billing Cursor спільний, але **фічі не паритетні** — rules, MCP, Cloud Agents у ACP обмежені; команді не варто очікувати ідентичної поведінки в IntelliJ і Cursor IDE.
- **Індексація vs рефакторинг:** Cursor сильніший у semantic search/`@codebase` для невеликих і web-репо; JetBrains сильніший у структурних рефакторингах і enterprise-debugging у великих кодових базах.
- **Крос-tool `AGENTS.md` vs tool-specific rules:** один `app/AGENTS.md` достатній для обох (Task C), але для максимальної якості в Cursor IDE варто додатково `.cursor/rules/`; у IntelliJ ACP це не підхоплюється автоматично.
- **Ціна vs enterprise-контроль:** Pro $20/міс доступний індивідуально; повноцінні audit logs, SCIM, MCP/repo controls — лише Teams/Enterprise; у ACP адмін-політики Cursor застосовуються ще обмеженіше, ніж у standalone IDE.

## Ризик/застереження, за яким варто стежити

**Зміна цінової політики та кредитної моделі Cursor.** Обидва інструменти залежать від однієї підписки з usage-based billing (кредитний пул + on-demand overages); при активному використанні frontier-моделей витрати можуть непередбачувано зрости, а зміна тарифів (як уже було в 2025–2026) одразу вплине і на Cursor IDE, і на IntelliJ + ACP. Для команди варто щокварталу переглядати usage dashboard і мати ліміти/alerts на on-demand spending.
