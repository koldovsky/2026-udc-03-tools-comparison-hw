# CLI агент: тікет → PR (Task E, bonus)

Тікет: `materials/task-feature-ticket.md`

## CLI-агент

Локальний CLI: git + GitHub CLI (gh).

## Команда, яку запустили (скорочено)

```
# створити гілку
git checkout -b feat/FEAT-102-capitalizeWords

# додати зміни й закомітити
git add app/src/text-utils.ts app/src/text-utils.test.ts
git commit -m "feat(text-utils): add capitalizeWords() and tests

Додає функцію capitalizeWords в app/src/text-utils.ts та відповідні unit-тести.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# запушити гілку й відкрити PR
git push --set-upstream origin feat/FEAT-102-capitalizeWords
gh pr create --title "FEAT-102: add capitalizeWords()" --body "Додає функцію capitalizeWords та тести. Всі тести пройшли локально (cd app && npm test)." --base main --head feat/FEAT-102-capitalizeWords --fill
```

## Що реалізовано

- Додано функцію `capitalizeWords(input: string): string` в `app/src/text-utils.ts`. Функція робить першу літеру кожного слова великою, решту — малими, при цьому зберігає всі пробіли (множинні, початкові та кінцеві).
- Додано unit-тести у `app/src/text-utils.test.ts` для всіх наведених прикладів та edge-case'ів (порожній рядок, рядок лише з пробілів, множинні пробіли).

## PR

Посилання: https://github.com/okedo/2026-udc-03-tools-comparison-hw/pull/1

Короткий diff-summary: +40 / -3 рядків, змінені файли:
- app/src/text-utils.ts
- app/src/text-utils.test.ts

## Спостереження: CLI vs IDE-агент

- CLI (git + gh) дає прямий контроль над гілками, комітами та PR; підходить для швидких, скриптових змін і CI-флоу.
- IDE-агент (Task B) корисний для інтерактивного дослідження та автоматичних правок; IDE-агент може бути зручнішим для складних рефакторингів, але іноді менш прозорим у кроках.
- Рекомендація: використовувати CLI для невеликих, багатокрокових змін і для підготовки PR; використовувати IDE/agent для глибоких локальних рефакторингів.