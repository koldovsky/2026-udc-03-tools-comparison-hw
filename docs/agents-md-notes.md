# Нотатки до AGENTS.md (Task C)

## Що додано/змінено в `app/AGENTS.md`

- Прибрав прив'язку до Cursor і замінив заголовок `Cursor Rules` на крос-tool `AGENTS.md` для будь-якого AI coding assistant.
- Додав опис стеку: TypeScript, Node.js ESM, Vitest, `src/` для коду і `*.test.ts` поруч із source-файлами.
- Додав секцію команд: `npm install`, `npm test`, `npm run typecheck`; lint явно позначений як `not configured`.
- Уточнив кодові конвенції: маленькі typed pure utilities, named exports, без зайвих абстракцій, збереження публічних сигнатур, тести для behavior changes.
- Додав guardrails: не додавати secrets/real client data, тримати зміни сфокусованими на пакеті текстових утиліт, не вигадувати відсутні package scripts.

## У яких інструментах перевірено (2+)

| Інструмент | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки |
|---|---|---|
| Claude Code | частково | Prompt запускався з папки `app/`, але інструмент бачив увесь контекст репозиторію і відповів переважно за root `AGENTS.md`: описав UDC homework, Tasks A-E, фіксовані docs-шляхи, guardrails і `cd app && npm test`. |
| Codex | так | Підхопив локальний `app/AGENTS.md`: описав пакет текстових утиліт, `src/`, `*.test.ts`, Node.js ESM, Vitest, `npm test`, `npm run typecheck` і те, що lint не налаштований. |

## Промпт верифікації

> Опиши конвенції цього проєкту.

## Результат

Claude Code відповів у ширшому контексті всього репозиторію: визначив проєкт як домашнє завдання UDC Workshop 3 з порівняння AI-інструментів, описав `app/` як маленький TS sample зі `slugify`, `truncate`, `parseTags`, згадав planted bug у `truncate()`, матеріали Task B/E, фіксовані docs-шляхи для Task A-D/E і root-level guardrails. Це корисно для загального репозиторію, але для Task C показало, що при запуску з `app/` Claude Code все одно орієнтувався на верхньорівневий `AGENTS.md`, а не тільки на локальний `app/AGENTS.md`.

Codex відповів саме в термінах локального пакета текстових утиліт: описав структуру `src/`, тести поруч із кодом як `*.test.ts`, Node.js ESM, команди `npm install`, `npm test`, `npm run typecheck`, і явно зазначив, що лінтер не налаштований. Також перелічив кодові правила з `app/AGENTS.md`: маленькі типізовані функції, named exports, без класів і зайвих абстракцій, не змінювати публічні сигнатури `slugify`, `truncate`, `parseTags`, додавати Vitest regression cases для змін поведінки, не додавати залежності без потреби.

## Висновок

Одного `app/AGENTS.md` достатньо для інструмента, який пріоритезує локальний контекст директорії, як Codex у цій перевірці. Але результат Claude Code показав важливий нюанс: якщо інструмент бачить увесь репозиторій, root `AGENTS.md` може переважити локальний файл, тому для крос-tool baseline краще узгоджувати root і nested `AGENTS.md` або в prompt явно просити орієнтуватися на `app/AGENTS.md`.
