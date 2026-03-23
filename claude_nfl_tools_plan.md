# Building an evolving Claude Code ecosystem for complex projects

**Claude Code's configuration system—CLAUDE.md files, skills, MCP servers, custom agents, and hooks—provides a layered architecture that can grow alongside a project from simple context files to a fully orchestrated multi-agent development environment.** The key insight from both Anthropic's official guidance and experienced practitioners is to build incrementally: start with a lean CLAUDE.md, add capabilities only when you encounter repeated friction, and let the system evolve organically. For a sports venue technology maturity scorecard project spanning survey development, Tableau dashboards, and knowledge management across local files, Google Drive, and GitHub, this means wiring up context and tools in phases rather than engineering everything upfront.

## The CLAUDE.md hierarchy is your project's constitution

CLAUDE.md is a Markdown file that Claude Code automatically injects into its system prompt at the start of every session. It acts as persistent memory—project instructions that survive across conversations without repeating yourself. Claude Code implements a **multi-level hierarchy** with distinct loading behaviors:

**Global** (`~/.claude/CLAUDE.md`) applies across all projects and should stay under **100 lines**—personal preferences like commit style and response language. **Project root** (`./CLAUDE.md`) is the primary file, committed to version control, containing architecture overview, build/test commands, and team conventions. Keep this under **200 lines** for optimal compliance; research from the SFEIR Institute found that files under 200 lines achieve **92% rule application rate**, dropping to 71% above 400 lines. **Subdirectory** CLAUDE.md files load lazily—only when Claude accesses that directory—making them ideal for domain-specific context in a multi-domain project. **CLAUDE.local.md** at project root is gitignored and holds personal overrides like sandbox URLs or debugging notes.

The `.claude/rules/` directory extends this system with modular rule files that support **conditional loading via YAML frontmatter**. A rule file with `match: "*.test.ts"` loads only when Claude works on test files. For a scorecard project, this means creating rules like `survey-conventions.md` (matching survey directories) and `tableau-conventions.md` (matching dashboard directories) that inject domain-specific guidance only when relevant.

For content organization, follow the **WHAT / WHY / HOW framework**: what the project is (one-liner orientation), why components exist (purpose), and how to build/test/deploy (exact commands). Write imperatively—"Use TypeScript strict mode" rather than "The project uses TypeScript"—since imperative instructions achieve **94% compliance** versus 73% for descriptive. Bold critical rules with "IMPORTANT" or "YOU MUST" for emphasis. Most critically, **every line should pass the test**: "Would removing this cause Claude to make mistakes?" If not, cut it.

For a sports venue scorecard project, the root CLAUDE.md should orient Claude to the project's multi-domain nature and point to subdirectory files for domain-specific context:

```markdown
# Sports Venue Technology Maturity Scorecard
Survey development + data analysis (Tableau) + knowledge management system.

# Key Directories
- `surveys/` — Survey question development and validation
- `analysis/` — Tableau dashboard configs and data pipelines  
- `docs/` — Project knowledge base and decision records
- `scripts/` — Automation and data processing scripts

# Workflow
1. Read relevant domain CLAUDE.md before making changes
2. Construct implementation plan before coding
3. Run tests and verify before committing

# Prohibitions
- NEVER modify files in /data/raw/ (source of truth)
- Do not hardcode venue-specific values — use configuration files
```

Each subdirectory then gets its own CLAUDE.md with domain-specific conventions, loaded only when Claude works in that area.

## Skills and custom commands create reusable agent capabilities

Claude Code's custom commands have evolved into a more powerful **skills system**. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create the `/deploy` command and work identically, but skills add a directory structure for supporting files, YAML frontmatter for controlling invocation behavior, and Claude's ability to **auto-invoke them when relevant** based on the description field.

Skills live in `.claude/skills/<name>/SKILL.md` at project level or `~/.claude/skills/<name>/SKILL.md` for personal use. The SKILL.md format combines YAML frontmatter with markdown instructions:

```markdown
---
name: survey-review
description: Reviews survey questions for bias, clarity, and psychometric validity. 
  Use when developing, editing, or reviewing survey instruments for the maturity scorecard.
allowed-tools: Read, Grep, Glob, Bash
---

When reviewing survey questions, evaluate against these criteria:
1. **Clarity**: No double-barreled questions, jargon-free language
2. **Bias**: Check for leading language, social desirability bias
3. **Scale consistency**: Verify Likert scales match project conventions
4. **Coverage**: Cross-reference against maturity dimensions in docs/dimensions.md

Output a structured review with severity ratings for each issue found.
```

Key frontmatter fields include `context: fork` (runs in isolated subagent context), `agent: Explore` (delegates to a specific subagent), `disable-model-invocation: true` (prevents auto-triggering), and `allowed-tools` (restricts available tools). The **`$ARGUMENTS`** variable captures everything typed after the command name, and numbered placeholders like `$1` and `$2` support positional arguments. Skills can also inject dynamic content using shell command syntax: `!`git diff --name-only`` preprocesses and injects the output before Claude receives the prompt.

Skills use **progressive disclosure** for context efficiency—Claude loads only names and descriptions initially (~30-50 tokens per skill), full instructions only when matched, and supporting resources only when executed. This means you can maintain **100+ skills without meaningful context impact**. Community research found that well-crafted descriptions improve skill activation from 20% to 50%, and adding concrete examples pushes activation to 90%.

For the scorecard project, practical skills might include `/survey-review` (psychometric quality check), `/dashboard-spec` (generate Tableau dashboard specifications from requirements), `/knowledge-update` (update project knowledge base with session findings), and `/scorecard-report` (generate maturity assessment reports from collected data).

## MCP servers connect Claude Code to your entire data ecosystem

The Model Context Protocol (MCP) is an open standard that lets Claude Code connect to external systems through a client-server architecture over JSON-RPC 2.0. Claude Code acts as the MCP client, connecting to servers that wrap access to GitHub, Google Drive, databases, Slack, and more. Each server exposes tools Claude can call, with tool names following the pattern `mcp__<server-name>__<tool-name>`.

Configuration lives in three locations: **`.mcp.json`** at project root (shared via version control), **`~/.claude.json`** (personal, cross-project), and **managed settings** (enterprise). The format supports environment variable expansion so credentials never appear in committed files:

```json
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-server",
      "args": ["stdio"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PAT}" }
    },
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": { "GDRIVE_CREDENTIALS_PATH": "${HOME}/.gdrive-server-credentials.json" }
    },
    "tableau": {
      "command": "npx",
      "args": ["-y", "@tableau/mcp-server@latest"],
      "env": {
        "SERVER": "${TABLEAU_SERVER_URL}",
        "PAT_NAME": "${TABLEAU_PAT_NAME}",
        "PAT_VALUE": "${TABLEAU_PAT_VALUE}"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

For the scorecard project, the most relevant servers are the **GitHub MCP server** (official: `ghcr.io/github/github-mcp-server`) for repository management and PR workflows, the **Google Drive MCP server** (`@modelcontextprotocol/server-gdrive`) for reading project documents with automatic format conversion (Docs→Markdown, Sheets→CSV), the **Tableau MCP server** (`@tableau/mcp-server@latest`) for dashboard interaction and data extraction, the **Memory MCP server** (`@modelcontextprotocol/server-memory`) for persistent knowledge graph storage, and **PostgreSQL or SQLite servers** if the project uses a structured data store.

Google Drive setup requires a Google Cloud project with Drive API enabled and OAuth 2.0 credentials. The server converts Google Docs to Markdown, Sheets to CSV, and Presentations to plain text automatically—meaning Claude can read and reason about your Google Drive documents natively.

A critical performance consideration: a typical five-server setup with 58 tools consumes **~55,000 tokens** before any conversation starts. Claude Code's **Tool Search** feature (v2.1.7+) activates automatically when MCP tools exceed 10% of the context window, reducing consumption by ~85% through on-demand discovery. Use the `/mcp` command inside Claude Code to verify server status.

## Custom agents and multi-agent patterns enable specialized workflows

Claude Code supports three tiers of multi-agent capability. **Subagents** run within a single session—Claude spawns them for focused subtasks, and they return results to the parent context. Built-in subagents include **Explore** (fast, read-only codebase search using Haiku), **Plan** (dedicated planning), and a general-purpose delegator. **Custom subagents** are defined as markdown files in `.claude/agents/`:

```markdown
---
name: survey-developer
description: Expert in survey methodology and question development. PROACTIVELY 
  use when creating, reviewing, or refining survey instruments for venue technology assessment.
tools: Read, Write, Edit, Glob, Grep, WebFetch, WebSearch
model: sonnet
memory: project
---

You are a survey methodology specialist focused on venue technology maturity assessment.

## Expertise Areas
- Likert scale design and validation
- Technology readiness level frameworks
- Venue operations domain knowledge

## Working Process
1. Review existing survey instruments in surveys/
2. Cross-reference maturity dimensions in docs/dimensions.md
3. Apply psychometric best practices
4. Document design decisions in docs/decisions/
```

The `memory: project` field gives this agent **persistent memory** that survives across conversations—it accumulates knowledge about the project's survey methodology over time. The `model` field lets you route cheaper tasks to Haiku and complex tasks to Opus or Sonnet.

**Agent Teams** (experimental, v2.1.32+) coordinate multiple Claude Code instances for truly parallel work. A leader creates tasks with dependencies, spawns teammates that self-claim tasks, and teammates communicate via an inbox system. This is powerful but currently experimental and requires tmux or iTerm2.

For the scorecard project, a practical architecture uses three custom agents: a **survey-developer** agent (question design, psychometric review, instrument validation), a **data-analyst** agent (Tableau dashboard specs, data pipeline scripts, statistical analysis), and a **knowledge-manager** agent (documentation updates, decision records, cross-source synthesis). Skills with `context: fork` and `agent: survey-developer` let you route specific tasks to specialized agents while keeping the main conversation clean. Anthropic's own research on multi-agent systems found that an **Opus lead + Sonnet subagents** pattern outperformed single-agent Opus by 90.2%, with the key principle being that subagents should **write results to the filesystem** rather than passing everything through context.

Expert practitioner Shrivu Shankar (Abnormal Security, consuming billions of tokens monthly) cautions against over-specializing agents, preferring a **"Master-Clone" architecture** where Claude spawns general-purpose clones via its built-in `Task(...)` feature rather than rigid specialist hierarchies that can "gatekeep context."

## Knowledge management requires deliberate architecture across three memory systems

Claude Code maintains three distinct memory systems. **CLAUDE.md** is manual memory you write—persistent project instructions that survive context compaction and reload fresh from disk. **Auto Memory** (MEMORY.md) is created automatically by Claude Code at `~/.claude/projects/<project-hash>/memory/MEMORY.md`, capped at **200 lines** (silently truncated beyond). Claude saves build commands, debugging insights, architecture notes, and workflow patterns here. The compounding value is significant: session 1 starts from scratch, session 5 knows your testing framework, session 20 has comprehensive project understanding. **Session Memory** runs as a background process writing structured summaries to `~/.claude/projects/<project-hash>/<session-id>/session-memory/summary.md`, and the `/remember` command reviews these to surface recurring patterns for promotion to CLAUDE.local.md.

For a project spanning local files, Google Drive, and GitHub, the **progressive disclosure pattern** is essential. Rather than cramming everything into CLAUDE.md, maintain a `docs/` directory with domain knowledge that Claude loads on demand:

```
docs/
├── architecture.md           # System design overview
├── dimensions.md             # Maturity scorecard dimensions and definitions
├── survey-methodology.md     # Survey design principles and decisions
├── tableau-conventions.md    # Dashboard naming, color, layout standards
├── decisions/                # Architecture Decision Records
│   ├── ADR-001-scoring.md    # Scoring methodology choice
│   └── ADR-002-dimensions.md # Dimension selection rationale
├── knowledge-graph.json      # Structured entity-relationship data
└── session-logs/             # Key findings from work sessions
```

The **Memory MCP server** (`@modelcontextprotocol/server-memory`) adds a persistent knowledge graph stored as JSON, enabling structured entity-relationship data that Claude can query and update:

```json
{
  "entities": [
    { "name": "wifi_connectivity", "entityType": "maturity_dimension",
      "observations": ["Covers guest WiFi, operational networks, and IoT connectivity",
                       "5-level scale from ad-hoc to optimized"] }
  ],
  "relations": [
    { "from": "wifi_connectivity", "to": "fan_experience", "relationType": "impacts" }
  ]
}
```

For cross-session knowledge persistence, adopt the **end-of-session capture pattern**: before ending work, prompt Claude to update relevant knowledge files with discoveries from the current session. Add to CLAUDE.md: "When compacting, always preserve the full list of modified files and current project state." Use markdown checkboxes `[ ]` in implementation plans so Claude can track progress across sessions.

## Eight phases from foundation to full orchestration

The community consensus, backed by Anthropic's guidance and practitioners like Shrivu Shankar and Boris Tane, recommends building Claude Code capabilities in this order:

**Phase 1 — CLAUDE.md foundation.** Run `/init` to auto-generate a starting file, then refine based on what Claude gets wrong. Start with ~50-100 lines covering project orientation, key directories, build commands, and critical prohibitions. For the scorecard project, establish the multi-domain structure and point to subdirectory files.

**Phase 2 — Rules and session discipline.** Add `.claude/rules/` with path-scoped rules using YAML frontmatter match patterns. Establish the habit of using `/clear` between distinct tasks and the "Document & Clear" pattern: have Claude dump plans into a markdown file, clear context, start fresh referencing that file.

**Phase 3 — Simple custom commands.** Add 3-5 frequently needed commands in `.claude/commands/` or `.claude/skills/`. Start with `/catchup` (read recent git changes), `/plan` (structured planning template), and one domain-specific command like `/survey-review`. Expert consensus warns against building a large command library prematurely—"if you have a long list of complex custom slash commands, you've created an anti-pattern."

**Phase 4 — Skills with progressive disclosure.** Evolve commands into full skills with SKILL.md format, supporting files, and auto-invocation descriptions. Build domain-specific skills for survey development, data analysis, and knowledge management. Skills are token-efficient enough to scale to 100+ without context impact.

**Phase 5 — Hooks for deterministic automation.** Add lifecycle hooks in `.claude/settings.json` for tasks that must always happen: auto-formatting after file edits, running linters before commits, validating survey question format. Use "block-at-submit" hooks (checking final results) rather than "block-at-write" hooks (interrupting mid-plan), since the latter confuse the agent.

**Phase 6 — MCP servers for external integration.** Start with **one** MCP server for your most critical external integration (likely GitHub), then add Google Drive and Tableau servers. Each server adds context overhead, so add incrementally and verify value with `/mcp` and `/context` monitoring.

**Phase 7 — Custom agents and subagents.** Define specialized agents for distinct project domains. Use the `/agents` command for interactive creation. Route cheaper analysis tasks to Haiku, complex survey design to Sonnet or Opus. Add `memory: project` for agents that should accumulate domain knowledge.

**Phase 8 — Plugins and CI integration.** Bundle mature configurations into installable plugins. Set up GitHub Actions for automated PR review, scheduled knowledge base updates, and quality checks. Anthropic launched their plugin marketplace in December 2025 with 36 curated plugins.

## Conclusion

The architecture for a Claude Code ecosystem serving a complex, evolving project like a sports venue technology maturity scorecard is best understood as **concentric rings of capability**: CLAUDE.md at the center providing persistent context, skills and agents as the next ring offering reusable specialized workflows, MCP servers as the outer ring connecting to external systems, and hooks providing deterministic guardrails throughout. The most important principle—consistently emphasized across Anthropic's documentation, community practitioners, and production case studies—is that **every capability should be added in response to observed friction, not anticipated need**. Start with a 100-line CLAUDE.md, notice what Claude gets wrong, fix it, and let the system grow. The project's knowledge management layer, combining CLAUDE.md hierarchies with Auto Memory, the Memory MCP server's knowledge graph, and a structured docs/ directory, creates a system where Claude genuinely accumulates institutional knowledge about venue technology maturity assessment over time—turning each session into a compounding investment rather than a fresh start.