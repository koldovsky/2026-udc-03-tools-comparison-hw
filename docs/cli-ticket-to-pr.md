# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md` (FEAT-102 — додати `capitalizeWords()`).

## CLI-агент

**Gemini CLI** (запуск через skill `bmad-quick-dev`, маршрут one-shot).

## Команда, яку запустили

```bash
# у Gemini CLI:
/bmad-quick-dev implement the ticket in materials/task-feature-ticket.md
# еквівалент «як є» без skill:
# gemini -p "implement the ticket in materials/task-feature-ticket.md"
```

## Що реалізовано

Додано `capitalizeWords(input: string): string` у `app/src/text-utils.ts`:
приведення до Title Case, збереження кратних/ведучих/кінцевих пробілів,
порожній рядок і рядок із самих пробілів повертаються без змін. Агент
«переviконав» тікет: обробка пунктуаційних префіксів (`(hello)` → `(Hello)`),
Unicode/сурогатні пари через `Array.from`, locale-методи
`toLocaleUpperCase/LowerCase`, JSDoc. Додано 10 unit-тестів (усі приклади з
таблиці + edge cases). Втручання не знадобилось — агент **сам зробив коміт**
після внутрішнього adversarial review. Перевірка: `npm test` — 19/19 зелений,
`npm run typecheck` — чисто.

## PR

Гілка: `ws03/hasper16`, коміт **`ca7011c`** — `feat(text-utils): add capitalizeWords function`.

Посилання: <!-- заповниться після `gh pr create` -->

Короткий diff-summary: 2 файли, **+71 / −1** — `app/src/text-utils.ts` (+27, реалізація),
`app/src/text-utils.test.ts` (+45/−1, тести).

## Спостереження: CLI vs IDE-агент

CLI-агент (через `bmad-quick-dev`) відпрацював найбільш автономно: сам створив
спеку, прогнав внутрішній adversarial review, реалізував і **самостійно
закомітив** без ручних кроків, навіть перевищивши вимоги тікета (Unicode/emoji/
locale). Для контрасту в Task B: IDE-Gemini не міг сам запустити `npm test`
(~10 ітерацій), а IDE-Copilot застосував правку inline і прогнав тести, але не
комітив автоматично. Висновок: CLI зручний для патерну «тікет → PR» у скриптах/
CI, але автономний коміт вимагає уважного рев'ю diff перед злиттям.



