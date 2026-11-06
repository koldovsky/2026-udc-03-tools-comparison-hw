# AI tool capability matrix (Task A)

Tools compared: Cursor (Pro), Claude Code CLI (Claude Pro)

> Cells marked "observed" come from hands-on use in this repo on 2026-11-06
> (Task B run, see `docs/comparison.md`). Price, limits, enterprise and
> privacy facts were checked on official vendor pages on 2026-11-06 (see
> [Sources](#sources)). "Lecture" means course slides checked on 2026-07-01.
> Markers: ✅ strong / fully supported, ⚠️ partial, caveat or not verified,
> ❌ missing on the plan compared.

| Criterion | Cursor | Claude Code |
|---|---|---|
| Model choice/quality | ✅ Multi-vendor picker (observed): "Cursor Models" group with Grok 4.7 High and Grok 4.6 High Fast, "Other Models" with Claude Opus 5.5, Claude Sonnet 5.5, Claude Fable 5.1, GPT-5.6 Sol, Gemini 4 Argon and Muse Wonder. Per-request Fast toggle, Effort (Medium/High) and Context 256K; Task B used Claude Opus 5.5 Medium. | ⚠️ Claude models only (Opus, Sonnet, Haiku, Fable), switched with `/model`. Default on Pro is Opus 5.5 at effort `medium` (observed in v2.1.319, matches the model-config docs). It used Haiku 5.5 for small helper calls and warned that Opus 5.5 draws down usage faster than Sonnet 5 (observed). Fable on Pro is paid with usage credits. Bedrock, Google Cloud and Foundry are other routes to the same Claude models, not other vendors. |
| Agentic autonomy and multi-step execution | ⚠️ The agent window has Plan / Build modes, Automations, subagents (`/create-subagent` hint) and a Changes panel with per-file diffs and a "Commit & Push" button (observed). In Task B it asked for confirmation before acting, then made the fix and tests in one prompt in ~1 min (observed). | ✅ Auto permission mode is the starting mode from v2.1.283; a classifier model reviews actions instead of the user. In Task B it edited files, ran `npm test` and `tsc --noEmit`, checked that the new tests failed on the buggy code, and redid one failed edit with no permission prompts (observed). Manual, Accept edits and Plan modes cycle with Shift+Tab; headless runs use `claude -p`. |
| Codebase indexing | ⚠️ Instant Grep: a local regex/word-boundary index built on the machine. Cursor says it does not upload paths or code for this index and "does not store embeddings of your codebase for search", which contradicts the lecture's "semantic embeddings index". An Explore subagent runs parallel searches; `.cursorignore` in this repo hides `node_modules/`, lockfiles, logs and `.env*` from Agent, Tab and `@` (terminal and MCP tools are not blocked). | ⚠️ No persistent index: the agent finds files by pattern, searches content with regex and reads files on the fly. "Code intelligence" (definitions, references, type errors) requires code intelligence plugins. There is no ignore file like `.cursorignore`; access is limited by working directory and permission rules instead. |
| Rules / commands / skills / MCP support | ✅ Rules come from `.cursor/rules/*.mdc` (Always, Intelligently, Specific Files, Manually), User Rules, Team Rules (Team/Enterprise) and `AGENTS.md`, including nested `AGENTS.md` in subfolders. Skills are invoked with `/`, context is added with `@` (observed), and MCP, hooks and Automations are available. | ✅ `CLAUDE.md` (managed, user, project, local), `.claude/rules/`, skills as `/` commands, MCP (`/status` showed 1 MCP server connected, observed), hooks, subagents and auto memory. Since v2.1.277 it reads `AGENTS.md` natively, but by default only when no `CLAUDE.md` exists. This repo has a one-line `CLAUDE.md` that points to `AGENTS.md` with a link, not an `@AGENTS.md` import, so the docs say Claude reads `AGENTS.md` only if it decides to open it. |
| Price and limits | ⚠️ Plan "Pro", $20/month ✅ (observed in account, 2026-11-06). Usage limits reset monthly and included usage is split into two pools: "Cursor Models" (includes Cursor Grok and Composer) and "Other Models" (third-party models such as Claude, GPT, Gemini). Usage beyond the Cursor Models limit consumes the Other Models quota or on-demand spend; usage beyond the Other Models limit consumes on-demand spend. On-demand spending is disabled on this account (monthly on-demand limit: Disabled), so there are no charges beyond the included usage. The account offers an upgrade to Pro+ at $60/month, "3x more usage on Agent" (all observed in account, 2026-11-06). ⚠️ Today's public pricing page does not list a plan named "Pro": it lists Free $0, Plus $8, Premium $30, Super $100 and Ultra $200 per month, plus Teams from $30/user/month and Enterprise (custom), and describes a shared Cursor + Grok pool that refreshes weekly with third-party models billed at API list price, which differs from what the account shows. No token or cost display was seen during Task B (observed). | ✅ Claude Pro costs $20/month, or $17/month billed annually ($200 up front). It has a 5-hour session limit and a weekly limit shared across claude.ai and Claude Code, and usage credits at API rates are available after the limit. `/cost` showed $0.3260 API-equivalent, token counts, 93% prompt-cache share and 11% of the session limit for Task B (observed). |
| Enterprise features (SSO/SOC2/data residency) | ✅ SOC 2 Type II, ISO/IEC 27001:2022, ISO/IEC 42001:2023 and AIUC-1. SAML/OIDC SSO on Teams; SCIM, audit logs, service accounts and model/MCP access controls on Enterprise; CMEK on Enterprise. US-only data residency for Enterprise at a 10% model-price uplift; EU + UK inference-only coverage on request. | ⚠️ SOC 2 Type I and Type II, ISO 27001:2022 and ISO/IEC 42001:2023 cover the commercial products (Team, Enterprise, API), not Claude Pro. SSO is on Team and Enterprise; SCIM, audit logs, Compliance API and custom retention are Enterprise only, and every one of these is "No" on Pro. Regional data residency (EU, US, Canada, APAC) is offered through AWS Bedrock, GCP Vertex and Microsoft Foundry endpoints. |
| Privacy / training-on-data policy | ⚠️ With Privacy Mode on, code is not used for training by Cursor or model providers. It is available on any plan, default-on for Enterprise and enforceable org-wide on Teams/Enterprise; the default for individual plans is ⚠️ not verified. Claude Fable 5.1/5 need admin approval under Privacy Mode because Anthropic retains their inputs and outputs for safety review (not for training). | ⚠️ On Pro (consumer terms), data including Claude Code sessions is used for training when the user's setting is on; the pricing page lists training as "Opt-out". Retention is 5 years with training allowed and 30 days without. Team, Enterprise and API (commercial terms) have no training by default, 30-day standard retention and Zero Data Retention for eligible Enterprise orgs. Transcripts are stored locally in `~/.claude/projects/` for 30 days. |

## Sources

All pages checked on 2026-11-06.

- Cursor pricing (plans, usage pool, third-party models at API list price, Teams/Enterprise features): <https://cursor.com/pricing>
- Cursor security (SOC 2 Type II, ISO 27001/42001, AIUC-1, Privacy Mode on any plan): <https://cursor.com/security>
- Cursor enterprise docs (plan comparison: SSO, SCIM, audit logs, Privacy Mode enforcement): <https://cursor.com/docs/enterprise>
- Cursor privacy and data governance (Privacy Mode default for Enterprise, Fable retention, CMEK, US data residency and 10% uplift): <https://cursor.com/docs/enterprise/privacy-and-data-governance>
- Cursor search / indexing (Instant Grep, no stored embeddings, Explore subagent): <https://cursor.com/docs/context/codebase-indexing>
- Cursor rules and AGENTS.md (incl. nested): <https://cursor.com/docs/context/rules>
- Cursor `.cursorignore` scope: <https://cursor.com/docs/context/ignore-files>
- Claude pricing (Pro $20 / $17 annual, 5-hour and weekly limits, Opt-out training, Team/Enterprise admin features): <https://claude.com/pricing>
- Claude Code data usage (training policy, retention, ZDR, local transcripts): <https://code.claude.com/docs/en/data-usage>
- Claude Code memory (`CLAUDE.md`, native `AGENTS.md` from v2.1.277, precedence rules): <https://code.claude.com/docs/en/memory>
- Claude Code model config (Opus 5.5 default on Pro, `/model`, effort): <https://code.claude.com/docs/en/model-config>
- Claude Code permission modes (auto mode as starting mode from v2.1.283): <https://code.claude.com/docs/en/permission-modes>
- How Claude Code works (on-the-fly search tools, code intelligence plugins, checkpoints): <https://code.claude.com/docs/en/how-claude-code-works>
- Claude Code overview (skills, hooks, MCP, `claude -p`): <https://code.claude.com/docs/en/overview>
- Anthropic certifications for commercial products (SOC 2 Type I and II, ISO 27001, ISO 42001): <https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained>
- Claude regional compliance / data residency: <https://claude.com/regional-compliance>

## Conclusion

Cursor is stronger on model flexibility and team governance. Its picker
mixes Grok, Claude, GPT and Gemini models, and its enterprise tiers add SSO,
audit logs and US data residency. Claude Code is stronger on autonomy and
cost transparency: in auto mode it fixed and verified BUG-101 without a
single permission prompt, and `/cost` reported exact tokens and dollars,
while Cursor asked for confirmation and showed no cost. On search, the gap
was smaller than the lecture suggested, since current Cursor docs describe
a local grep index rather than embeddings and Claude Code searches on the
fly. That made no difference on a repo this small. `AGENTS.md` support
matters most for Task C: Cursor reads it, including nested files, while
Claude Code skips it whenever a `CLAUDE.md` exists. This repo's link-only
`CLAUDE.md` should therefore use an `@AGENTS.md` import to be reliably
cross-tool.
