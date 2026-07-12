# Нотатки до AGENTS.md (Task C)

> Скопіюйте у `docs/agents-md-notes.md` і заповніть.

## Що додано/змінено в `app/AGENTS.md`

- фактичний стек: TypeScript ESM, npm, Vitest, tsc --noEmit;
- команди test, test:watch, typecheck;
- чесні рядки: Build: not configured, Lint: not configured;
- 5 code conventions;
- guardrails щодо секретів, залежностей, неіснуючих команд і збереження поведінки.

## У яких інструментах перевірено (2+)

| Інструмент  | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки                                                     |
|-------------|--------------------------------------------------|-------------------------------------------------------------|
| Claude Code | так                                              | Запропонував на вибір array-utils, date-utils, number-utils |
| Codex CLI   | так                                 | Додав новий array-utils.ts з таким самим підходом: без      
  залежностей, явні return types, прості edge-case тести. |
| Junie       | так                                 | Аналогічно як і Codex CLI                                   |

## Промпт верифікації

додай новий util за зразком text-utils.ts

## Результат

Всі інструменти дотрималися AGENTS.md, навіть Claude. А саме:
- Публічні сигнатури slugify/truncate/parseTags не чіпали.
- Explicit return types, малі хелпери, early returns, коментар лише-заголовок (як у text-utils.ts) — стиль дотриманий.
- Немає нових залежностей, секретів чи вигаданих команд.
- npm test і npm run typecheck — обидва зелені.

## Висновок

Було достатньо одного AGENTS.md як крос-tool baseline. tool‑specific файли не знадобились.
