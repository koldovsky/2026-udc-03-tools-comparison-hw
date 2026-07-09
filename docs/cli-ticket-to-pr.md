# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md` (FEAT-102 — `capitalizeWords()`)

## CLI-агент

Claude Code (CLI, модель Opus 4.8).

## Команда, яку запустили

```
read @materials\task-feature-ticket.md and make it please with test
```

(У цій сесії тікет було передано агенту як єдиний вхід — він сам прочитав
`materials/task-feature-ticket.md`, наявний код і тести, після чого написав
реалізацію та unit-тести.)

## Що реалізовано

- Додано `capitalizeWords(input: string): string` у `app/src/text-utils.ts`
  поряд із `slugify`/`truncate`/`parseTags` (той самий стиль експорту).
- Функція робить першу літеру кожного слова великою, решту — маленькими.
  Ключова деталь: розбиття через `split(/(\s+)/)` із **захопленням**
  роздільників, тож множинні/початкові/кінцеві пробіли зберігаються точно —
  змінюється лише регістр літер (не «схлопуються»).
- Додано 6 unit-тестів у `app/src/text-utils.test.ts` — усі рядки з таблиці
  прикладів тікета + edge cases (порожній рядок, рядок із самих пробілів).

## PR

Гілка: `ws03/hod-i`

Посилання: https://github.com/hod-i/2026-udc-03-tools-comparison-hw/commit/f72c56acce7ab5477891e6c3099d642488d4f530

Короткий diff-summary:
- `app/src/text-utils.ts` — +14 рядків (нова функція `capitalizeWords`)
- `app/src/text-utils.test.ts` — +23 рядки (імпорт + блок `describe`)
- Сигнатури/поведінка `slugify`, `truncate`, `parseTags` — без змін.

Перевірка: `cd app && npm test` → 14/14 зелені; `npm run typecheck` → чисто.

## Спостереження: CLI vs IDE-агент

- **Розбіжність зі специфікацією (важливо для порівняння).** Перша спроба
  реалізації використала `.trim().split(/\s+/).join(" ")`, що **схлопує**
  пробіли й прибирає початкові/кінцеві — це порушувало acceptance criteria
  (рядки `"red   t-shirt"` та `"  hello world  "`). CLI-агент виявив це на
  кроці `npm run typecheck` + звірки з таблицею тікета й переписав через
  captured-split. IDE-агент inline-режиму цю деталь легше пропускає, бо не
  проганяє тести/typecheck автоматично.
- **Строгий TS зловив баг.** `part[0]` дав помилку `TS2532` через
  `noUncheckedIndexedAccess` — агент замінив на `charAt(0)`. CLI-флоу
  автоматично запускає `typecheck`, тож помилка спливла одразу, а не під час
  ревʼю.
- **Контроль і придатність для CI.** CLI показує кожну дію (які файли читає,
  які команди запускає) і завершується зеленим `npm test` — цей патерн
  «тікет → код → тести → PR» природно лягає в headless/CI, на відміну від
  інтерактивного IDE-асистента.
