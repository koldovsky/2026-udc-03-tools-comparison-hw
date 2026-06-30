# BUG-101 — `truncate()` повертає рядок, довший за `maxLength`

**Summary (EN):** `truncate(text, maxLength, suffix)` in `app/src/text-utils.ts`
appends `suffix` *after* slicing to `maxLength`, so the final string can be
longer than `maxLength` — the suffix is not counted against the limit.

**Priority:** High · **Component:** `app/src/text-utils.ts` · **Reporter:** QA
(automated string-length check on the listing page)

## Опис

QA-перевірка довжини рядків на сторінці лістингу почала падати: картки
товарів, обрізані функцією `truncate()`, іноді довші за задану межу
`maxLength`, через що верстка "розʼїжджається" на мобільних екранах.

Причина — `truncate()` ріже текст до `maxLength` символів, а потім **додає**
`suffix` зверху, замість того щоб врахувати довжину `suffix` у межі
`maxLength`. В результаті підсумковий рядок (текст + suffix) може перевищувати
`maxLength` на довжину `suffix`.

## Кроки відтворення

```ts
import { truncate } from "./text-utils";

const input = "a long sentence here"; // text.length === 20
const result = truncate(input, 10, "...");

console.log(result);        // "a long sen..."
console.log(result.length); // 13
```

- **Очікувано:** `result.length <= 10` (тобто `result` разом із суфіксом не
  перевищує `maxLength`).
- **Фактично:** `result === "a long sen..."`, `result.length === 13` —
  на 3 символи (рівно довжину `suffix`) більше за `maxLength = 10`.

Тобто `truncate()` ріже вихідний текст до **рівно** `maxLength` символів і
лише потім додає `suffix`, замість того щоб зарезервувати місце під `suffix`
у межах `maxLength`.

## Очікувана поведінка (Expected)

`maxLength` — це **жорстка межа** для підсумкового рядка, **включно із
суфіксом**:

- Якщо `text.length <= maxLength` — повернути `text` без змін (суфікс не
  додається).
- Інакше — обрізати `text` так, щоб `truncated.length + suffix.length ===
  maxLength` (тобто обрізати до `maxLength - suffix.length` символів тексту),
  і повернути `truncated + suffix`.
  - Приклад очікуваного результату для прикладу вище:
    `truncate("a long sentence here", 10, "...")` має повернути
    `"a long ..."` (рівно 10 символів: 7 символів тексту + 3 символи `"..."`).
- Якщо `suffix.length >= maxLength`, достатньо повернути сам `suffix`,
  обрізаний до `maxLength` символів (edge case, не повинен кидати виняток).

## Acceptance criteria

- [ ] Для будь-якого `text`, `maxLength` і `suffix` функція `truncate()`
      повертає рядок, довжина якого **ніколи не перевищує `maxLength`**
      (суфікс враховано в межі).
- [ ] `truncate("a long sentence here", 10, "...")` повертає рядок довжиною
      рівно `10` (наприклад, `"a long ..."`).
- [ ] Якщо `text.length <= maxLength`, `truncate()` повертає `text` без змін
      (поведінка не змінюється).
- [ ] Усі наявні тести в `app/src` лишаються зеленими (`npm test`).
- [ ] Додано регресійний тест на сценарій з цього тікета (вхід `"a long
      sentence here"`, `maxLength = 10`, `suffix = "..."`, очікувана довжина
      результату `<= 10`), а також тест на edge case `suffix.length >=
      maxLength`.
- [ ] Публічна сигнатура `truncate(text: string, maxLength: number, suffix?:
      string): string` не змінюється.

## Примітка для Task B

Це **той самий, незмінний тікет**, який ти прогониш через 2–3 різні
AI-інструменти (Task B домашнього завдання). Постав одну й ту саму точну
постановку задачі в кожен інструмент і порівняй: чи знайшов інструмент баг
сам, чи запропонував правильний фікс, чи додав регресійний тест, скільки
ітерацій/правок знадобилось. Не змінюй формулювання тікета між запусками —
інакше порівняння буде не "яблука до яблук".
