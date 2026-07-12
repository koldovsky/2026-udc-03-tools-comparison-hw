# CLI агент: тікет → PR (Task E, bonus)

> Скопіюйте у `docs/cli-ticket-to-pr.md` і заповніть.

Тікет: `materials/task-feature-ticket.md`

## CLI-агент
 
Claude Code

## Команда, яку запустили

```
claude "implement materials/task-feature-ticket.md"
```

## Що реалізовано

- added capitalizeWords(input: string): string to app/src/text-utils.ts (using input.replace(/\S+/g, ...) to capitalize each non-whitespace run while   
leaving whitespace untouched, this preserves exact spacing per the spec)
- and added 6 unit tests in app/src/text-utils.test.ts covering all table examples plus the         
whitespace-only edge case. slugify, truncate, parseTags are untouched
- full suite is green.

## PR

Посилання: https://github.com/fugrusha/2026-udc-03-tools-comparison-hw/pull/1/changes

Короткий diff-summary: +27;-1; Changed app/src/text-utils.test.ts and app/src/text-utils.ts

## Спостереження: CLI vs IDE-агент

Агент з першої спроби виконав усі acceptance criteria без відхилень: коректно зберіг пробіли та додав тести для всіх прикладів і edge cases. Ручне втручання не знадобилося.

Порівняно з IDE-агентом, CLI дає менше проміжної видимості, але швидше проходить цикл «тікет → код → тести → перевірка» і легко відтворюється тим самим промптом.
