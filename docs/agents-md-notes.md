# Нотатки до AGENTS.md (Task C)

## Що додано/змінено в `app/AGENTS.md`

- Замінено заголовок `# Cursor Rules` на нейтральний опис проєкту (`app/` — text utilities sample) без прив'язки до IDE.
- Додано секцію **Stack**: TypeScript 5 strict, Node.js ESM, Vitest 2; явно вказано відсутність bundler/framework.
- Додано секцію **Commands** з реальними npm-скриптами (`test`, `test:watch`, `typecheck`) і чесною позначкою, що `build` і `lint` **не налаштовані**.
- Додано **5 конвенцій коду**: pure utilities, named exports, ESM-імпорти з `.js`, camelCase/functional style, colocated `*.test.ts`.
- Додано **Guardrails**: не змінювати публічні сигнатури `slugify`/`truncate`/`parseTags`, не додавати зайві deps, не вигадувати lint/build, не комітити секрети.

## У яких інструментах перевірено (2+)

| Інструмент | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки |
|---|---|---|
| Cursor (Composer) | Так | Файл підхоплений автоматично через workspace rules; промпт «опиши конвенції» виконано без нагадувань про стек чи команди. |
| OpenCode (deepseek-v4-flash-free) | Так | Файл підхоплений як project-level instructions (`/init` генерує AGENTS.md, AGENTS.md завантажується як контекст); промпт «опиши конвенції» виконано за один запит без нагадувань. |

## Промпт верифікації

> опиши конвенції цього проєкту

## Результат

**Cursor (Composer):** відповів структуровано — стек (TS 5 strict, ESM, Vitest), команди з `package.json`, явно зазначив що `build` і `lint` не налаштовані, перелічив 5 конвенцій (pure utils, named exports, `.js` imports, camelCase, `*.test.ts`), guardrails (не чіпати сигнатури, `npm test` зелений). Не запропонував ESLint, не змінив API утиліт, не вигадав неіснуючих скриптів. Конвенції взяті з `app/AGENTS.md` без додаткових tool-specific файлів.

**OpenCode (deepseek-v4-flash-free):** відповів точно так само — стек (TS 5 strict, ESM, Vitest 2), команди (`npm test`, `npm run test:watch`, `npm run typecheck`), `build`/`lint` — не налаштовані, 5 конвенцій коду (pure utilities, named exports, ESM imports з `.js`, camelCase/functional style, colocated `*.test.ts`), guardrails (не змінювати сигнатури slugify/truncate/parseTags, не додавати deps, не вигадувати скрипти, не комітити секрети). Всі дані взяті саме з `app/AGENTS.md` без підказок.

## Висновок

Один `app/AGENTS.md` спрацював як спільний baseline для **Cursor** і **OpenCode** — обидва інструменти підхопили його без окремого конфігурування, без `.cursor/rules` чи `.opencode/agents/*.md`. Промпт верифікації («опиши конвенції проєкту») виконано в обох випадках за один запит. Основні конвенції (стек, команди, стиль коду, guardrails) відтворено ідентично. Це підтверджує крос-tool портативність AGENTS.md як формат контексту.
