# Нотатки до AGENTS.md (Task C)



## Що додано/змінено в `app/AGENTS.md`

- «Agentic IDE» → «any Agentic Tool»
- Додано секцію Stack із зазначенням Node.js, TypeScript (strict), Vitest та явною позначкою «lint: не налаштовано»
- Додано секцію Commands із реальними командами (npm install, npm test, npm run build) та коментарем не вигадувати lint-команду
- Секцію з output-шляхами виділено в окремий блок Outputs
- Додано секцію Conventions із крос-тульними конвенціями: один концептуальний change на коміт, вибір мови документації
- Додано секцію Definition of Done із чітким чеклістом перед PR

## У яких інструментах перевірено (2+)

| Інструмент | Чи підхопив `AGENTS.md` без додаткових налаштувань? | Нотатки |
|---|---|---|
| Claude Code | так | Самостійно знайшов кореневий `AGENTS.md` і `CLAUDE.md`, почав читати конфіги |
| Cursor | частково | Підхопив кореневий `AGENTS.md` + user rules; `app/AGENTS.md` ще «Cursor Rules» |

## Промпт верифікації

> "опиш конвенції цього проєкту"

## Результат

### Claude Code

На промпт одразу знайшов кореневий `AGENTS.md` і `CLAUDE.md`, планував прочитати їх разом із конфігами (`package.json`, `tsconfig.json`, код у `app/src/`). Повної відповіді в цій сесії не зафіксовано — лише стартовий крок дослідження.

### Cursor

Агент прочитав кореневий `AGENTS.md`, `README.md`, `app/package.json`, `app/tsconfig.json`, `app/src/text-utils.ts`, `.coderabbit.yaml`, PR-шаблон і `materials/task-bug-fix.md`. Відповів українською структурованим оглядом:

- **Стек:** Node.js 22+, TypeScript strict, Vitest, ESM; lint не налаштовано
- **Команди:** `npm install`, `npm test`, `npm run typecheck` з каталогу `app/`
- **Стиль коду:** простий TS, функціональний підхід, camelCase, тести Vitest з описовими назвами
- **Git/PR:** гілка `ws03/<username>`, title `WS3: <ім'я>`, один концептуальний change на коміт
- **Документація:** артефакти у `docs/`, мова UA або EN
- **Guardrails:** без секретів/PII, не змінювати сигнатури `slugify`/`truncate`/`parseTags`, Windows Git Bash — `>/dev/null` замість `>nul`
- **DoD:** зелений `npm test`, заповнені Tasks A–D, виправлений `truncate()`

Додатково застосував **user rules** з Cursor (commit protocol, PR workflow) — вони не з `app/AGENTS.md`, а з глобальних налаштувань користувача.

## Висновок

Кореневий `AGENTS.md` достатній як крос-tool baseline: обидва інструменти його знаходять без додаткових налаштувань. `app/AGENTS.md` ще треба узагальнити (прибрати «Cursor Rules», додати stack/commands/guardrails) — саме він має бути primary для роботи в `app/`. Tool-specific файли на кшталт `CLAUDE.md` достатньо зробити thin redirect на кореневий `AGENTS.md`, без дублювання правил.
