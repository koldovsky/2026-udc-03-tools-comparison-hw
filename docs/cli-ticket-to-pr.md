# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Claude Code (CLI, модель Opus 4)

## Команда, яку запустили

```
claude "implement the ticket in materials/task-feature-ticket.md"
```

## Що реалізовано

Агент прочитав тікет FEAT-102, додав функцію `capitalizeWords(input: string): string` у `app/src/text-utils.ts` — Title Case перетворення з regex `\S+` (зберігає всі пробіли на місці). Додав 6 unit-тестів у `text-utils.test.ts`, що покривають усі приклади з таблиці тікету (включно з edge cases: порожній рядок, whitespace-only). Усі 15 тестів зелені з першого запуску, жодних ітерацій виправлення.

## PR

Посилання: гілка `feat/capitalize-words` (push заблокований 403 — PR створюється після авторизації)

Короткий diff-summary: +191/−10 рядків; змінено `app/src/text-utils.ts` (+12), `app/src/text-utils.test.ts` (+46), `app/AGENTS.md` (+41/−8), `docs/` (4 нових файли)

## Спостереження: CLI vs IDE-агент

CLI-флоу (Claude Code) виконав весь цикл «прочитати тікет → написати код → написати тести → запустити `npm test` → зелений результат» за один промпт без жодного ручного втручання — ~40 секунд wall-clock. IDE-агент (JetBrains AI Chat) на аналогічній задачі (Task B) вимагав 4 окремих промпти та ручний Apply кожного блоку коду — сумарно ~3.5 хвилини. CLI-підхід ідеально підходить для CI/CD automation (наприклад, auto-implement тікетів у pipeline), тоді як IDE-агент дає більше контролю та візуального review на кожному кроці — краще для складних рефакторингів, де потрібне розуміння контексту через call graph.
