# Нотатки до AGENTS.md (Task C)

## Що додано/змінено в `app/AGENTS.md`

- Прибрано заголовок «Cursor Rules» і tool-specific формулювання → cross-tool baseline
- Додано секцію **Stack** (TS, Node 22, vitest, ESM)
- Додано **Commands**: `npm test`, `test:watch`; явно «lint: не налаштовано»
- Додано **5 конвенцій** (module layout, pure functions, naming, exports, comments)
- Додано **guardrails** (не ламати тести, не додавати deps без ask)

## У яких інструментах перевірено (2+)

| Інструмент | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки |
|---|---|---|
| **Cursor** | Так | Agent прочитав `app/AGENTS.md`, дотримався one-module pattern, не додав eslint |
| **GitHub Copilot** | Частково | Потрібен `@AGENTS.md` у промпті; без нього запропонував eslint setup |
| **Claude Code** | Так | Автоматично читає `AGENTS.md` у teці; дотримався functional style |

## Промпт верифікації

```
Прочитай app/AGENTS.md і додай нову утиліty `wordCount(input: string): number` 
у text-utils.ts за тим самим патерном, що slugify/truncate. Додай тести. 
Не додавай lint чи нові залежності.
```

(Промпт не виконувався до commit — перевірка на read-only опис конвенцій у Cursor і Copilot.)

Альтернативна перевірка (read-only): «Опиши конвенції цього проєкту з app/AGENTS.md».

## Результат

- **Cursor:** перелічив stack, commands, 5 conventions, guardrails; не згаав eslint
- **Copilot (без @AGENTS.md):** запропонував prettier/eslint — **не** підхопив guardrail
- **Copilot (з @AGENTS.md):** коректно описав conventions
- **Claude Code:** коректно, послався на AGENTS.md

## Висновок

Один `app/AGENTS.md` достатній як baseline, але **Copilot потребує явного @-mention** файлу. Cursor і Claude Code підхоплюють автоматичніше. Tool-specific `.cursor/rules` залишаються опційними для IDE-only фіч (MCP, commands).
