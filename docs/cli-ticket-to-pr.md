# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Claude Code (CLI, `claude -p`)

## Команда, яку запустили

```bash
claude -p "implement the ticket in materials/task-feature-ticket.md"
```

## Що реалізовано

Додано `capitalizeWords(input: string): string` у `app/src/text-utils.ts`
поруч з `slugify`/`truncate`/`parseTags` — реалізація через
`input.replace(/\S+/g, ...)`, яка капіталізує перше слово кожного "слова"
(non-whitespace run) і лишає пробіли (початкові/кінцеві/множинні) без змін.
Додано `describe("capitalizeWords", ...)` у `app/src/text-utils.test.ts` з
тестом на кожен приклад з таблиці тікета плюс edge cases (порожній рядок,
рядок із самих пробілів, ідемпотентність на вже-Title-Case вводі).

## PR

Посилання: https://github.com/koldovsky/2026-udc-03-tools-comparison-hw/pull/5

Оскільки репозиторій доступний лише в режимі READ (`gh repo view` →
`viewerPermission: READ`), пуш зроблено у форк
(`FeschenkoNatalia/2026-udc-03-tools-comparison-hw`, remote `fork`), а PR
відкрито cross-repo (`--head FeschenkoNatalia:ws03/FeschenkoNatalia --base main`)
проти `koldovsky/main`. Коміт з реалізацією — `e74ce70`.

Короткий diff-summary: 2 файли змінено, +31/-1 рядок
(`app/src/text-utils.ts`: +4, `app/src/text-utils.test.ts`: +27/-1).

## Спостереження: CLI vs IDE-агент

Агент з першого разу виконав усі acceptance criteria — жодних відхилень
(пробіли не "схлопнулись", тести додані на всі приклади з таблиці й на обидва
edge cases), тож ручного втручання у код не знадобилось. Порівняно з
IDE-агентом (Task B), CLI-флоу давав менше проміжної видимості по кроках (усе
вийшло одним фінальним diff, а не покроковими правками, які видно в
редакторі), зате сам цикл "тікет → код → тести → перевірка" був швидшим і
легше повторюваним (той самий промпт можна перезапустити 1:1). Головна
відмінність — рев'ю відбувається постфактум по diff, а не в реальному часі.
