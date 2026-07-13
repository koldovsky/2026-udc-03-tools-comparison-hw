# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Claude Code

## Команда, яку запустили

```
claude -p "implement the ticket in materials/task-feature-ticket.md" --allowedTools "Read,Write,Edit"
```

## Що реалізовано

Агент додав `capitalizeWords(input: string): string` у
`app/src/text-utils.ts` поруч із `slugify`/`truncate`/`parseTags`: перша
літера кожного слова — велика, решта — маленькі, слова розбиваються по
пробілу без "схлопування" повторних пробілів. Додано 6 unit-тестів у
`app/src/text-utils.test.ts`, що покривають усі приклади з тікета
(звичайний випадок, множинні пробіли, ведучі/кінцеві пробіли, порожній
рядок, вже-Title-Case рядок, рядок із самих пробілів). Наявні тести
лишились зеленими — `npm test` показує 14/14 passed.

## PR

Посилання: https://github.com/koldovsky/2026-udc-03-tools-comparison-hw/pull/15/commits/cc9ebb1b31942785d4f839803f94072f6e70207a

Короткий diff-summary: +36/-1 рядків, 2 файли змінено
(`app/src/text-utils.ts`, `app/src/text-utils.test.ts`).

## Спостереження: CLI vs IDE-агент

CLI-флоу (`claude -p ... --allowedTools "Read,Write,Edit"`) швидший і
детермінованіший для одноразової, чітко сформульованої задачі — тікет
подається як єдиний вхід, агент сам читає файл, пише код і тести без
проміжних питань, а обмежений набір `allowedTools` унеможливлює випадкові
side-effects (немає доступу до `Bash`/git). Порівняно з IDE-агентом (Task B),
тут менше "живого" контролю над кожним кроком під час генерації — рев'ю
відбувається постфактум через звичайний `git diff`, а не інкрементально в
редакторі; зате саме це робить флоу зручним для CI (non-interactive виклик,
передбачуваний exit code, легко обгорнути в скрипт "ticket → code → PR").
