# UDC Workshop 3 — Homework (AI tools comparison)

Starter repo for the third homework of the UDC "Modern Development with Agentic
AI" course.

> Workshop 3: **Огляд та порівняння AI-інструментів розробки** (AI tools overview & comparison)
> Автор: В'ячеслав Колдовський (Programming Mentor)

This is an **artifacts-first** exercise: you run the **same** seeded bug-fix
ticket through 2-3 AI tools, build a capability matrix, generalize a thin
`AGENTS.md` into a cross-tool baseline, and write a team recommendation. ~2-2.5
hours.

## Quick start

```bash
gh repo fork koldovsky/2026-udc-03-tools-comparison-hw --clone
cd 2026-udc-03-tools-comparison-hw
git checkout -b ws03/<github-username>
cd app && npm install && npm test && cd ..
# follow docs/walkthrough.md
gh pr create --title "WS3: <your name>" --fill
```

Full step-by-step instructions: [`docs/walkthrough.md`](docs/walkthrough.md).

## What's in here

| Path | Purpose |
|---|---|
| `docs/walkthrough.md` | Step-by-step: setup, Tasks A–E, Definition of Done |
| `app/src/text-utils.ts` | Tiny TS sample with a planted bug in `truncate()` |
| `app/AGENTS.md` | Deliberately thin, single-tool-flavored baseline (Task C target) |
| `materials/task-bug-fix.md` | The fixed ticket every tool runs (Task B) |
| `materials/task-feature-ticket.md` | A small feature ticket for the CLI bonus (Task E) |
| `docs/templates/` | Fill-in skeletons for your reports |
| `.github/pull_request_template.md` | PR checklist (auto-applied) |
| `.coderabbit.yaml` | CodeRabbit auto-review tuned to this homework's DoD |
| `AGENTS.md` (repo root) | Baseline guidance for your Agentic IDE in this repo |

You create: `docs/tool-matrix.md`, `docs/comparison.md`,
`docs/agents-md-notes.md`, `docs/recommendation.md`, and (bonus)
`docs/cli-ticket-to-pr.md`.

## Tools

2–3 AI coding tools (free tiers/trials are fine for a second/third one) +
a GitHub account + Node 22+. Questions → the course chat (feedback within
2 weeks).
