# AGENTS.md

Guidance for any AI coding assistant (Claude Code, Junie, Cursor, Copilot, …)
working in this `app/` package. This is the cross-tool baseline — no rules here
are specific to a single tool.

## Стек

- **Мова:** TypeScript, strict mode (`strict: true`, `noUncheckedIndexedAccess`).
- **Модулі:** ESM (`"type": "module"`), target ES2022, `module: ESNext`,
  `moduleResolution: Bundler`.
- **Тести:** Vitest (globals увімкнено через `types: ["vitest/globals"]`).
- **Без runtime-залежностей** — це навчальний sample; лише `typescript` та
  `vitest` у `devDependencies`.

## Команди

Запускати з каталогу `app/`:

- **test:** `npm test` (`vitest run`) — має бути зеленим перед завершенням.
- **test (watch):** `npm run test:watch`.
- **typecheck:** `npm run typecheck` (`tsc --noEmit`).
- **build:** не налаштовано (sample-проєкт без збірки).
- **lint:** не налаштовано.

## Конвенції коду

1. **Чисті функції з named exports** — див. `src/text-utils.ts`; жодних
   default-export і жодного прихованого стану.
2. **Функціональний стиль** — ланцюжки `map`/`filter`/`replace`, незмінні дані;
   уникати мутацій і побічних ефектів.
3. **Тести поруч із кодом** — `*.test.ts` у тому ж каталозі; структура
   `describe` / `it` / `expect` як у `src/text-utils.test.ts`.
4. **ESM-імпорти з розширенням `.js`** у тестах/між модулями
   (напр. `import { truncate } from "./text-utils.js"`), навіть коли файл — `.ts`.
5. **Коментарі лише для неочевидного** — не описувати те, що й так видно з коду.

## Guardrails

- **Не ламати наявну функціональність** — усі наявні тести лишаються зеленими.
- **Публічні сигнатури стабільні** — не змінювати параметри/типи експортованих
  функцій без явного запиту.
- **Фікс = фікс + регресійний тест** — при виправленні бага додавати тест, що
  ловить саме цей сценарій.
- **Без нових залежностей** без вагомої причини.
- Пояснювати, що і чому змінено.
