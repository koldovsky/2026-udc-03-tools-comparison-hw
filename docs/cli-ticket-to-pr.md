# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md` (FEAT-102 — `capitalizeWords()`)

## CLI-агент

Claude Code (модель Claude Fable 5)

## Команда, яку запустили

Тікет віддано агенту в інтерактивній сесії Claude Code як єдиний вхід
(еквівалент headless-варіанта):

```
claude -p "implement the ticket in materials/task-feature-ticket.md"
```

Агент сам: створив гілку `feat/capitalize-words`, прочитав тікет, написав код
і тести, прогнав `npm test` та `npm run typecheck`, закомітив, запушив і
відкрив PR через `gh pr create`.

## Що реалізовано

Додано `capitalizeWords(input: string): string` у `app/src/text-utils.ts`:
Title Case через `input.replace(/\S+/g, ...)` — перша літера кожного слова
uppercase, решта lowercase; завдяки заміні лише непробільних послідовностей
усі пробіли (множинні, початкові, кінцеві) зберігаються без змін. Додано 6
unit-тестів: усі 5 прикладів із таблиці тікета + edge case рядка з самих
пробілів. Наявні функції не змінювались.

## PR

Посилання: https://github.com/omkhrystenko/2026-udc-03-tools-comparison-hw/pull/1

Короткий diff-summary: +34/−1 рядків, 2 файли (`app/src/text-utils.ts`,
`app/src/text-utils.test.ts`); тести 14/14 зелені, typecheck чистий.
Втручання людини не знадобилось (пробіли не «схлопнуто», всі acceptance
criteria виконані з першої спроби).

## Спостереження: CLI vs IDE-агент

CLI-флоу виявився помітно «наскрізнішим», ніж IDE-агент у Task B: Claude Code
сам провів увесь ланцюжок від гілки до готового PR однією сесією, без
перемикання між вікнами — саме так цей патерн можна ставити в CI чи автоматизацію
(headless `claude -p`). IDE-агент (Cursor) натомість зручніший для
інтерактивного рев'ю: GUI-diff і кнопки accept/reject дають більше контролю
над кожним кроком. Висновок: CLI — для повторюваних «тікет → PR» задач,
IDE — для роботи, де людина хоче переглядати кожну правку.
