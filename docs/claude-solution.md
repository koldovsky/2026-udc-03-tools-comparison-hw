# Task B — прогін у Claude Code

## Вхідний запит

Тікет `materials/task-bug-fix.md` вставлений як є, без переказу своїми
словами (перший і єдиний промпт).

## Результат

- **Кількість промптів/ітерацій:** 1 (одразу правильний фікс + тести,
  без уточнень чи повторних правок).
- **Справжня причина знайдена:** так. `truncate()` різав текст до
  `maxLength`, а потім додавав `suffix` **зверху**, тобто суфікс не
  враховувався в межу. Це саме те, що описано в тікеті (не симптом,
  а корінна причина).
- **Регресії:** відсутні — усі 8 тестів (6 наявних + 2 нових) зелені
  з першого прогону.
- **Токени/вартість:** не заміряно в цьому прогоні (для реального заміру
  використовуйте команду `/cost` у сесії Claude Code).
- **UX-нотатки:** тікет уже містив точний опис очікуваної поведінки й
  edge case (`suffix.length >= maxLength`), тому фікс звівся до
  прямого перекладу acceptance criteria в код — жодних уточнюючих
  запитань не знадобилось.

## Зміни в коді

`app/src/text-utils.ts`:
```diff
   if (input.length <= maxLength) {
     return input;
   }

-  return input.slice(0, maxLength) + suffix;
+  if (suffix.length >= maxLength) {
+    return suffix.slice(0, maxLength);
+  }
+
+  return input.slice(0, maxLength - suffix.length) + suffix;
```

`app/src/text-utils.test.ts` — додано 2 тести:
- регресійний: `truncate("a long sentence here", 10, "...")` →
  `"a long ..."` (довжина рівно 10),
- edge case: `truncate("hello world", 2, "...")` → `".."`, без винятку.

## Перевірка

```
cd app && npm test
```
Результат: `8 passed (8)`.

## Публічна сигнатура

Не змінена: `truncate(input: string, maxLength: number, suffix = "..."): string`.
