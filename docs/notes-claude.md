# Звіт Claude Code — BUG-101

- Модель: Claude Fable 5 (Anthropic)
- Час старту: 2026-07-11 19:53:02 +02:00
- Час завершення: 2026-07-11 19:53:41 +02:00
- Тривалість: 39 секунд
- Кількість промптів від користувача: 1
- Скільки ітерацій правок коду знадобилось: 1
- Знайдена причина багу: `truncate()` різав текст до `maxLength` символів і лише потім конкатенував `suffix`, тому результат перевищував ліміт рівно на довжину суфікса; довжина суфікса не резервувалась у межах `maxLength`.
- Що змінено:
  - `app/src/text-utils.ts` — текст обрізається до `maxLength - suffix.length`; додано edge case: якщо `suffix.length >= maxLength`, повертається `suffix.slice(0, maxLength)`.
  - `app/src/text-utils.test.ts` — додано два регресійні тести.
- Які тести додано:
  - `never exceeds maxLength including the suffix (BUG-101 regression)` — вхід з тікета (`"a long sentence here"`, 10, `"..."`) → `"a long ..."`, довжина ≤ 10.
  - `returns the suffix sliced to maxLength when suffix.length >= maxLength` — edge case для `maxLength = 3` і `maxLength = 2`.
- Чи всі тести зелені: так, 8/8
- Токени: сесія спільна з іншими задачами домашки, чистий фікс — у межах ~15–20K токенів контексту (оцінка)
