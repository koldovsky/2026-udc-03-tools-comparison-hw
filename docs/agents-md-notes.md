# Нотатки до AGENTS.md (Task C)

## Що додано/змінено в `app/AGENTS.md`

- Замінено заголовок з `# Cursor Rules` на `# AGENTS.md — Project Context` (узагальнено з IDE-специфічного)
- Додано явну секцію **Tech stack:** TypeScript (ESM), Vitest, Node 22+
- Додано секцію **Commands:** test, typecheck, build (not configured), lint (not configured) — точні команди замість умовних порад
- Розширено **Code Conventions** з 4 пунктів до явних правил:
  - Functional style (no mutations, pure functions)
  - Descriptive function naming
  - Comments only for non-obvious logic
- Додано **Guardrails** секцію з чіткими обмеженнями:
  - Don't break public signatures
  - Don't change existing behavior без явної вимоги
  - Don't commit secrets

## У яких інструментах перевірено (2+)

| Інструмент | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки |
|---|---|---|
| **Claude Haiku 4.5** | ✅ Так, повною мірою | Реалізував `capitalize()` чистим функціональним стилем, тести логічні й назвистої, не додав коментар (що правильно — код очевидний). Дотримався конвенцій на 100%. |
| **Claude Sonnet 4.6** | ✅ Так, повною мірою | Явно зчитав AGENTS.md перед кодом. Використав `charAt(0)` замість `text[0]` (більш явний API). 4 тести замість 3 — додав окремий тест для одного символу (`"a"` → `"A"`). Коментар не додав. 12/12 тестів. |

## Промпт верифікації

```
Додай новий util-функцію `capitalize(text: string): string` до `app/src/text-utils.ts`, 
яка капіталізує першу букву рядка. Дотримуйся конвенцій коду з `app/AGENTS.md`. 
Додай тести до `text-utils.test.ts`. Не міняй існуючі функції.
```

## Результат

**Haiku результат:**
- ✅ Функція добавлена з сигнатурою `capitalize(text: string): string`
- ✅ Реалізація чистий функціональний стиль: `text[0].toUpperCase() + text.slice(1)`
- ✅ Edge case обробка: перевірка на порожній рядок (`if (!text) return text`)
- ✅ 3 тести добавлені: базовий case, пустий рядок, очереденість символів
- ✅ Назви функцій & тестів дотримуються AGENTS.md (descriptive names, no abbreviations)
- ✅ Коментарій НЕ додан (що правильно — код очевидний)
- ✅ Всі 11 тестів пройшли (8 старих + 3 нові)

**Sonnet результат:**
- ✅ Функція з сигнатурою `capitalize(text: string): string`
- ✅ Явно зчитав AGENTS.md перед реалізацією
- ✅ Реалізація: `text.charAt(0).toUpperCase() + text.slice(1)` (більш явний API ніж `text[0]`)
- ✅ Edge case: `text.length === 0` (явна перевірка на довжину замість falsy check)
- ✅ 4 тести: базовий, порожній рядок, вже капіталізований, один символ
- ✅ Коментар не доданий
- ✅ 12/12 тестів зелені (8 старих + 4 нові)

## Висновок

Один крос-tool `app/AGENTS.md` **достатньо** як baseline для обох Haiku й Sonnet. Обидва інструменти розуміють й дотримуються конвенцій без tool-specific рифів або доповнень. Узагальнення від "Cursor Rules" до універсального формату вдалось — файл працює як «спільна мова» для різних AI-інструментів у цьому проєкті.
