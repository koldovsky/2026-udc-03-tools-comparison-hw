# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Claude Code (патерн «тікет як є»: ticket-файл був єдиним
вхідним промптом, без переказування своїми словами).

## Команда, яку запустили

```
materials/task-feature-ticket.md
```

(шлях до тікета передано агенту як увесь запит, без додаткового контексту —
еквівалент `claude -p "implement the ticket in materials/task-feature-ticket.md"`)

## Що реалізовано

`capitalizeWords(input: string): string` додано в `app/src/text-utils.ts`
поруч із `slugify`/`truncate`/`parseTags`: капіталізує першу літеру кожного
слова, решту — в нижній регістр, зберігаючи оригінальні пробіли
(ведучі/кінцеві/множинні) без змін. Додано 6 unit-тестів у
`app/src/text-utils.test.ts`, що покривають усі приклади з тікета,
включно з edge cases (порожній рядок, рядок із самих пробілів).
Зміну ізольовано в окрему гілку `ws03/tatiana-lapteva-feat-102`
(через `git worktree`, від чистого стану без BUG-101-фіксу), щоб не
змішувати з Task B/C у тому самому диффі.

## PR



Короткий diff-summary: 2 файли змінено, +31/-1 рядків
(`app/src/text-utils.ts`, `app/src/text-utils.test.ts`), коміт `af32c46`
на гілці `ws03/tatiana-lapteva-feat-102`.

`cd app && npm test` — 12/12 зелені; `npm run typecheck` — чисто.

## Спостереження: CLI vs IDE-агент

Тікет був самодостатнім (таблиця приклад-вхід/вихід, acceptance criteria) —
на відміну від Task B, тут не знадобилось жодного уточнювального промпту чи
ітерації: одна команда → готовий код + тести. 
