# Рекомендація для команди (Task D)

## Рекомендований основний (primary) інструмент

**Cursor (Agent mode)**

Чому: на Task B (BUG-101) Cursor дав найшвидший цикл — 1 промпт, root-cause fix, регресійні тести, green `npm test`. Матриця (Task A) показує найкращий баланс автономності, rules/commands/skills і IDE-інтеграції. AGENTS.md підхоплюється без додаткових кроків (Task C).

## Рекомендований додатковий (secondary) інструмент

**Claude Code (CLI)** — для сценаріїв: headless/CI pipelines, batch refactors, «тікет → PR» без IDE, робота на remote/devcontainer.

Чому: та сама якість на BUG-101, але terminal-native. Task E показав, що CLI зручний для repeatable agent flows; гірший для швидкого visual review diff.

**GitHub Copilot** — tertiary для щоденних inline completions (дешевше, Pro $10), але не primary для multi-file agent tasks.

## Ключові компроміси (trade-offs)

- **Ціна vs автономність:** Copilot дешевший, Cursor/Claude Code — дорожчі, але менше ручних ітерацій на agent tasks
- **Індексація vs приватність:** enterprise no-train потребує Business/Enterprise tier у всіх трьох
- **Крос-tool AGENTS.md vs tool-specific фічі:** один AGENTS.md працює, але Copilot потребує @-mention; Cursor commands/skills — lock-in
- **IDE vs CLI:** IDE швидше для review; CLI краще для automation

## Ризик/застереження, за яким варто стежити

**Vendor lock-in через tool-specific rules/commands** (`.cursor/commands`, Copilot instructions, `.claude/commands`) — AGENTS.md портable, але «продвинуті» workflows прив'язують команду до одного vendor. Варто тримати core conventions у `AGENTS.md`, а tool-specific — thin wrappers.
