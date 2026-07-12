# Звіт Cursor (Composer) — BUG-101

- Модель: Composer 2.5 Fast (план Free)
- Час старту: Saturday, 11 July, 2026 19:41:23
- Час завершення: Saturday, 11 July, 2026 19:42:08
- Тривалість: ~1 хвилина (45 секунд)
- Кількість промптів від користувача: 1
- Скільки ітерацій правок коду знадобилось: 1
- Знайдена причина багу: `truncate()` обрізав вхідний текст до `maxLength` символів (`input.slice(0, maxLength)`), а потім додавав `suffix` зверху. Суфікс не враховувався в межі `maxLength`, тому підсумковий рядок міг перевищувати ліміт на `suffix.length` символів.
- Що змінено:
  - `app/src/text-utils.ts` — перед обрізанням резервується місце під суфікс (`maxLength - suffix.length`); додано edge case, коли `suffix.length >= maxLength` (повертається `suffix`, обрізаний до `maxLength`).
  - `app/src/text-utils.test.ts` — додано два регресійні тести.
- Які тести додано:
  - `never exceeds maxLength when suffix is appended (BUG-101 regression)` — вхід `"a long sentence here"`, `maxLength = 10`, `suffix = "..."`; очікується `"a long ..."` і `result.length <= 10`.
  - `returns suffix sliced to maxLength when suffix is longer than maxLength` — edge case `suffix.length >= maxLength` для `maxLength = 3` і `maxLength = 2`.
- Чи всі тести зелені: так (8/8)
- Токени: ~34.1K контексту за сесію, з них ~18.2K — розмова (фактичні дані з Context Usage Report)
