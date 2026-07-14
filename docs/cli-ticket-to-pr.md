# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Claude Code (CLI) — симульовано через Cursor Agent з terminal workflow (еквівалент патерну «тікет → код → PR»).

## Команда, яку запустили

```bash
# Еквівалент для Claude Code:
claude -p "Implement materials/task-feature-ticket.md in app/src/text-utils.ts with tests. Run npm test."

# Фактично виконано в Cursor Agent з тікетом як єдиним контекстом.
```

## Що реалізовано

- Додано `capitalizeWords(input: string): string` у `app/src/text-utils.ts`
- Regex `\S+` — змінює регістр слів, **зберігає** пробіли (не схлопує `"red   t-shirt"`)
- Unit-тести на всі приклади з тікета + whitespace-only edge case
- `npm test` green (12 tests)

## PR

Посилання: (цей же PR — WS3 homework, diff включає FEAT-102)

Короткий diff-summary: `text-utils.ts` +15 рядків, `text-utils.test.ts` +20 рядків (capitalizeWords + BUG-101 regression tests)

## Спостереження: CLI vs IDE-агент

CLI-патерн зручніший для **repeatable automation** (скрипт → agent → gh pr create), але гірший для **visual diff review** — довелось окремо перевірити, що пробіли не схлопнуті. IDE-агент (Task B) швидше показав test output inline. CLI краще в CI; IDE — для interactive bug fix.
