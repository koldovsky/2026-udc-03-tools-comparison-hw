# Нотатки до AGENTS.md (Task C)

## Що додано/змінено в `app/AGENTS.md`

- Прибрано заголовок «Cursor Rules» і tool-specific формулювання → cross-tool baseline
- Додано секцію **Stack** (TS, Node 22, vitest, ESM)
- Додано **Commands**: `npm test`, `test:watch`, `build — n/a`; явно «lint: не налаштовано»
- Додано **5 конвенцій** (module layout, pure functions, naming, exports, comments)
- Додано **guardrails** (не ламати тести, не додавати deps без ask)

## У яких інструментах перевірено (2+)

| Інструмент | Чи описав/підхопив `AGENTS.md`? | Нотатки |
|---|---|---|
| **Cursor 1.2** (2026-07-14) | Так (read-only) | Інструмент описав правила з `AGENTS.md`; не згадав eslint |
| **GitHub Copilot Chat** (VS Code, 2026-07-14) | Частково | Без `@AGENTS.md` — запропонував eslint; з `@AGENTS.md` — інструмент описав правила |
| **Claude Code 1.0** (2026-07-14) | Так (read-only) | Інструмент описав правила з `AGENTS.md` (functional style, module layout) |

## Промпт верифікації

Read-only (виконано в усіх інструментах):

```
Опиши конвенції цього проєкту з app/AGENTS.md.
```

Implementation prompt (заплановано, не виконувався до commit):

```
Прочитай app/AGENTS.md і додай нову утиліty wordCount(input: string): number
у text-utils.ts за тим самим патерном, що slugify/truncate. Додай тести.
Не додавай lint чи нові залежності.
```

## Результат

- **Cursor:** read-only — інструмент описав правила (stack, commands, conventions, guardrails); не згадав eslint ✅
- **Copilot (без @AGENTS.md):** запропонував prettier/eslint — правила не описані з файлу ❌
- **Copilot (з @AGENTS.md):** інструмент описав правила з файлу ✅
- **Claude Code:** read-only — інструмент описав правила з AGENTS.md ✅

> Примітка: це **опис правил** (read-only), не артефакт code execution. Для повної верифікації implementation prompt потрібен окремий diff + `npm test` output.

## Висновок

Один `app/AGENTS.md` достатній як baseline для read-only підхоплення. **Copilot потребує явного @-mention** файлу. Cursor і Claude Code читають `AGENTS.md` автоматичніше. Tool-specific `.cursor/rules` залишаються опційними для IDE-only фіч.
