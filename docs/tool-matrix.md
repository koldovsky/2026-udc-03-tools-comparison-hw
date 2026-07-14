# AI tool capability matrix (Task A)

Tools compared: **Claude Code** (Anthropic CLI / IDE agent) and **GitHub Copilot** (in VS Code).

Facts as of **July 2026**. Copilot figures are from GitHub's official plans page
(`github.com/features/copilot/plans`) and the usage-based-billing announcement;
Claude model/API figures are from Anthropic's model catalog; subscription limits
from Anthropic help docs. Prices are USD.

| Criterion | Claude Code | GitHub Copilot (VS Code) |
|---|---|---|
| **Model choice / quality** | Anthropic-only: Opus 4.8 (default), Sonnet 5, Haiku 4.5, Fable 5, Opus 4.7. 1M-token context on Opus/Sonnet; `effort` control (`xhigh` default in Claude Code). | Multi-vendor **model picker**: Anthropic Claude (Haiku 4.5, Sonnet 4/4.5/4.6/5, Opus 4.5/4.6/4.7/4.8 + fast-mode preview, Fable 5), OpenAI GPT-5.x (5.2–5.6, Codex, mini), Google Gemini (2.5 Pro, 3 Flash, 3.1/3.5), Kimi K2.7 Code, Raptor mini. Free tier limited to Haiku 4.5 + GPT-5 mini. |
| **Agentic autonomy & multi-step execution** | Fully agentic CLI/IDE agent: multi-step edits, plan mode, subagents, background tasks, hooks, and headless `claude -p` for CI. High autonomy end-to-end. | **Agent mode** in VS Code (multi-file edits, runs terminal commands, calls MCP tools) + **coding agent** (assign an issue → opens a PR). Can delegate to 3rd-party agents (Claude Code, Codex). Also inline completions + next-edit suggestions. |
| **Codebase indexing** | No persistent embeddings index — **agentic on-demand search** (grep/glob/read live files). Context is gathered per task, not from a prebuilt index. | **Yes** — workspace embeddings index for `@workspace` / `#codebase`. Enterprise can index the org's codebase on GitHub for deeper retrieval + fine-tuned private completion models. |
| **Rules / commands / skills / MCP** | `CLAUDE.md` + `AGENTS.md`, slash commands, Skills, hooks, full **MCP client**. All supported. | Custom instructions (`.github/copilot-instructions.md`, `instructions.md`, **`AGENTS.md`**), prompt files, slash commands, custom agents, **MCP servers** supported. |
| **Price & limits** | Sub: **Pro $20/mo**, **Max 5x $100/mo**, **Max 20x $200/mo** (+ Team/Enterprise seats). Limits = rolling **5-hour session window** + **weekly caps** (one across all models, one Sonnet-specific on Max). Or **API pay-as-you-go**: Opus 4.8 $5/$25, Sonnet 5 $3/$15 (intro $2/$10 to 2026-08-31), Haiku 4.5 $1/$5 per 1M in/out. | **Usage-based "AI Credits" since 2026-06-01** (1 credit = $0.01, token-based). **Free $0** (2,000 completions + 50 chat/mo), **Pro $10/user** ($15 credits), **Pro+ $39/user** ($70 credits, incl. Opus), **Max $100/user** ($200 credits), **Business $19/user**, **Enterprise $39/user**. Code completions/NES stay unlimited & free on paid plans; overage via a $-budget. |
| **Enterprise (SSO / SOC 2 / data residency)** | SSO on Team/Enterprise; SOC 2 Type II; HIPAA-ready offering; custom data-retention controls; Compliance API; data-residency options on enterprise/API. | SAML SSO; IP indemnity; enterprise-grade security; org user/policy management; usage metrics; GitHub Advanced Security (Autofix). Data residency via GitHub Enterprise regions. |
| **Privacy / training-on-data policy** | API + commercial (Team/Enterprise) data **not** used for model training by default; consumer Pro/Max plans have a training setting with opt-out. Zero-data-retention available for enterprise (note: Fable 5 requires ≥30-day retention). | **Business & Enterprise data not used for training.** Free/Pro/Pro+ interaction data **may** be used for training (since Apr 24) **unless opted out** at `github.com/settings/copilot/features`. IDE chat/completions prompts not retained (Business/Enterprise); 28-day retention on other surfaces. |

## Conclusion

For our case the differences that matter most are **autonomy vs. breadth** and
**how each bills**. Claude Code is the stronger fully-autonomous agent (plan mode,
subagents, headless `claude -p` for CI) but is single-vendor (Anthropic models
only) and priced by subscription tier with session + weekly caps. Copilot's edge
is **model choice** (Claude + GPT-5.x + Gemini in one picker), tight VS Code /
GitHub integration (issue→PR coding agent, `@workspace` indexing), and a **lower
entry price** ($10 Pro), now on token-based AI Credits — cheaper for
completion-heavy work (completions are free) but harder to predict for heavy
agent sessions. On privacy the practical split is the same for both: **paid
org/commercial tiers don't train on your data; individual tiers do unless you
opt out.** If autonomy and a portable `AGENTS.md` matter most, Claude Code leads;
if model flexibility and native GitHub/VS Code workflow matter most, Copilot leads.

## Additional solution relevant for Enterprises: AWS Bedrock & an LLM API gateway

Because model access is the foundation of every agentic workload, enterprises often expose models centrally through governed infrastructure rather than per-seat SaaS — commonly a gateway in front of Bedrock.

| Component | Pros | Cons |
|---|---|---|
| **AWS Bedrock** (models in your AWS account) | Data stays in-account (IAM/VPC/CloudTrail, no training, regional residency); AWS Marketplace billing + IAM access; multi-provider under one API | Feature subset / release lag vs first-party (no web search/fetch, code execution, Batches, Files API, Managed Agents, auto prompt caching, fast mode); `anthropic.`-prefixed IDs; agentic features degrade. *Parity alt:* **Claude Platform on AWS** (Anthropic-operated, same-day parity) |
| **LLM API gateway** (unified internal endpoint: LiteLLM/Portkey/Kong/…) | Central control (no provider keys for devs, per-team budgets/quotas); cost attribution + audit; routing/fallback, swap models without code change; PII/injection filtering at one chokepoint | New HA-critical infra + latency; **passthrough gaps** (streaming, tool use, prompt caching, beta headers) can break agentic tools or kill cache hits; maintenance drift; gateway sees all prompts/outputs (bigger log/breach surface) |

**Tool fit:** Claude Code can target Bedrock (native) or a *faithful Anthropic-API* gateway via `ANTHROPIC_BASE_URL` (an OpenAI-shim won't work). GitHub Copilot is SaaS with GitHub-managed serving — you generally can't repoint it at your own Bedrock/gateway, so this pattern serves Claude Code + in-house apps and complements Copilot.
