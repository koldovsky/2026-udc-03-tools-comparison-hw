# FEAT-102 — Додати `capitalizeWords()` у `text-utils.ts`

**Summary (EN):** Add `capitalizeWords(input: string): string` to
`app/src/text-utils.ts` — capitalizes the first letter of each word and
lowercases the rest; handles multiple/leading/trailing spaces gracefully.
Intended to be handed as-is to a CLI coding agent to demonstrate the
"ticket → code → PR" pattern (Task E, bonus).

**Priority:** Medium · **Component:** `app/src/text-utils.ts` · **Reporter:**
Product (listing page — заголовки карток мають бути в Title Case)

## Опис

На сторінці лістингу заголовки товарів іноді приходять з бекенду в
довільному регістрі (`"WIRELESS mouse"`, `"red   t-shirt"` тощо). Потрібна
утиліта, яка приводить рядок до "Title Case": перша літера кожного слова —
велика, решта літер слова — маленькі.

Додати функцію поруч із наявними `slugify`, `truncate`, `parseTags` у
`app/src/text-utils.ts`:

```ts
export function capitalizeWords(input: string): string
```

## Вимоги до поведінки

- Перша літера кожного слова — велика (uppercase), решта літер слова —
  маленькі (lowercase).
- "Слово" — послідовність символів, відокремлена пробілами (whitespace).
- Декілька пробілів підряд між словами не повинні ламати результат і не
  повинні "схлопуватись" в один пробіл — кількість та позиції пробілів
  зберігаються такими, як у вхідному рядку (змінюється лише регістр літер).
- Початкові/кінцеві пробіли зберігаються без змін.
- Порожній рядок `""` повертає `""`.
- Рядок із самих пробілів повертається без змін (немає літер для зміни
  регістру).

## Приклади (для тестів)

| Вхід                  | Вихід                  |
|-----------------------|-------------------------|
| `"WIRELESS mouse"`    | `"Wireless Mouse"`      |
| `"red   t-shirt"`     | `"Red   T-shirt"`       |
| `"  hello world  "`   | `"  Hello World  "`     |
| `""`                  | `""`                    |
| `"already Title Case"`| `"Already Title Case"`  |

## Acceptance criteria

- [ ] `capitalizeWords(input: string): string` додано в `app/src/text-utils.ts`
      та експортовано так само, як `slugify`/`truncate`/`parseTags`.
- [ ] Поведінка відповідає прикладам у таблиці вище.
- [ ] Множинні пробіли між словами не "схлопуються" (зберігається оригінальна
      кількість пробілів).
- [ ] Додано unit-тести на всі приклади з таблиці (включно з edge cases:
      порожній рядок, рядок із самих пробілів).
- [ ] Усі наявні тести в `app/src` лишаються зеленими (`npm test`).
- [ ] Немає змін у сигнатурах чи поведінці `slugify`, `truncate`, `parseTags`.

## Примітка щодо використання (Task E, bonus)

Цей тікет навмисно сформульований так, щоб його можна було віддати **як є**
CLI-агенту без додаткового переказування, наприклад:

```bash
claude -p "implement the ticket in materials/task-feature-ticket.md"
```

(або еквівалент в іншому CLI-агенті, який ти обрав). Мета — продемонструвати
повторюваний агентний патерн **"тікет → код → PR"** із секції 50:

1. Створи нову гілку.
2. Дай CLI-агенту цей файл як єдиний вхід — нехай він сам прочитає тікет,
   напише код і тести.
3. Перевір, що `npm test` зелений і acceptance criteria виконані.
4. Відкрий PR через `gh pr create` (опиши, що саме зробив агент і чи
   знадобилось втручання).

Якщо агент відхилився від вимог (наприклад, "схлопнув" пробіли або не додав
тести) — це теж валідний результат для порівняння: зафікси вручну або новим
промптом і занотуй розбіжність у PR-описі.
