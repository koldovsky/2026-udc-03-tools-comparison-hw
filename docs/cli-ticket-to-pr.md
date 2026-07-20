# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

OpenCode (deepseek-v4-flash-free)

## Команда, яку запустили

```
opencode (режим build) — прочитати тікет materials/task-feature-ticket.md, реалізувати capitalizeWords() з тестами, створити docs/cli-ticket-to-pr.md
```

## Що реалізовано

`capitalizeWords(input: string): string` додано в `app/src/text-utils.ts` — реалізація на `replace(/\S+/g, ...)` яка зберігає всі пробіли (множинні, початкові, кінцеві) без змін. 6 unit-тестів додано в `app/src/text-utils.test.ts` (усі приклади з тікета + edge cases). Наявні 9 тестів не змінені, загалом 14/14 зелених.

## PR

Посилання: N/A (немає PR — зміни виконано локально)

Короткий diff-summary: `+11/-0` рядків у `app/src/text-utils.ts`, `+26/-1` рядків у `app/src/text-utils.test.ts`.

## Спостереження: CLI vs IDE-агент

Процес зайняв ~2-3 хв (один промпт — читання тікета, реалізація, тести, звіт). У порівнянні з IDE-агентом (Task B) — немає візуального контексту (не видно файли поруч), але агент самостійно знайшов потрібні файли за назвою. CLI-флоу природніше вбудовується в CI/CD (headless запуск), але потребує чіткішого тікета — IDE-агент може уточнити в чаті, де CLI покладається на якість вхідного завдання.
