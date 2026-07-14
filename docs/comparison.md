# Порівняння на одній задачі (Task B)

Задача: `materials/task-bug-fix.md` — тікет вставлено **як є** в кожен інструмент.
Перед кожним новим інструментом: `git checkout -- app/src/text-utils.ts app/src/text-utils.test.ts`.

**Дата запусків:** 2026-07-14

| Інструмент (версія) | Час | Ітерацій | Root cause? | Регресійні тести | `npm test` | Токени | UX |
|---|---|---|---|---|---|---|---|
| **Cursor Agent 1.2** | ~8 хв | 1 | ✅ suffix не враховано в maxLength | added + passed (2 tests) | passed | ~45k in / ~2k out | @file; agent ran tests |
| **GitHub Copilot Chat** (VS Code ext.) | ~18 хв | 3 | ✅ після другого промпту | added + passed (після нагадування) | passed | n/a | manual patch apply |
| **Claude Code CLI 1.0** | ~12 хв | 2 | ✅ | added + passed (edge case на 2-му промпті) | passed | ~38k session | terminal-first |

## Висновок

**Cursor** впoрався найшвидше: один промпт → фікс + регресійні тести → `npm test` green. Copilot потребував нагадування про acceptance criteria. Claude Code — порівнянна якість, але більше manual terminal work. Фінальний фікс у репо — від Cursor.
