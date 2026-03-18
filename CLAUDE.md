# NFL Stadium Technology Scorecard
Accenture engagement (ISOW 8, Phase 2) — stadium technology maturity assessment, 4-club pilot.
Fixed fee $100K. **Client lead:** Gary Brantley (NFL SVP & CIO) | **Accenture lead:** Jon Wakefield (Principal)

## Repository Layout

| Path | What lives here |
|------|-----------------|
| `working/survey/` | Active survey files — WIP_NFL_Survey_v0.xlsx, question backlog |
| `reference/` | Stable reference docs — read them, don't edit them mid-task |
| `.claude/` | Agents, skills, rules — the Claude Code tooling for this project |
| `scripts/` | Python automation (openpyxl, recalc) |
| `deliverables/` | Client-facing outputs (docs, decks) |
| `archive/` | Superseded files — legacy only |

**The only active working file is `working/survey/WIP_NFL_Survey_v0.xlsx`. All other Excel workbooks are retired.**

## Framework — v2 (locked 2026-03-18)

| Layer | Prefix | Scope |
|-------|--------|-------|
| Technology Infrastructure | `TI_` | Connectivity only: Wi-Fi, DAS, 5G, cabling, backbone, uplink |
| Digital Infrastructure | `DI_` | Cloud + data + **physical endpoints** (displays, kiosks, cameras, POS hardware) |
| Technology Services | `TS_` | SaaS + ops platforms: ticketing, mobile ordering, app, CRM, signage CMS |
| AI & Innovation | `AI_` | Intelligent capabilities: CV, predictive analytics, GenAI, personalization |

**Critical v2 rule:** Physical endpoint devices → `DI_`, not `TI_`. `TI_` = connectivity infrastructure only.

## Active Question Set

**Primary file:** `working/survey/WIP_NFL_Survey_v0.xlsx`
- Sheet **"NFL Claude V0"** — 51 questions (TI=15, DI=16, TS=10, AI=10) — our working set
- Sheet **"Combined Survey Questions"** — 103 questions (Claude V0 + colleague V1) — comparison view
- Sheet **"Survey Questions V1"** — colleague's parallel 50-question set

## Answer Format (all questions)
- 5-option single-select A (lowest maturity) → E (highest maturity)
- Non-response options (both score 0): `"Data not available / unknown"` | `"We don't use this technology today"`
- No open-text questions — all drop-down or select-all, minimum 5 options

## Scoring Status

**Scoring methodology has NOT been designed for Phase 2.** The pitch-era prototype (`reference/NFL_Scorecard_Methodology_v1.2.md`) is retained as background only — do not apply its formulas or weights.

Use `/scoring-design` to build the methodology from the question set. Until that work is complete and confirmed by Jon Wakefield:
- Do not score any questions or clubs
- Do not present any weighting as agreed
- Dashboard specs can be structured but must leave all formulas as TBD placeholders

**Scoring template types** (conceptual reference — assignment per question is part of `/scoring-design`):
| Template | Use Case |
|----------|----------|
| T1 | Maturity ladder: staged capability adoption |
| T2 | Coverage/reach: % of venue or fan base covered |
| T3 | Lower-is-better: latency, wait times, error rates |
| T4 | Higher-is-better: adoption, throughput, uptime |
| T5 | Governance: controls, audits, monitoring |
| O  | Outcomes: whether performance is measured and drives decisions |

## Question Schema — 9 required fields (every question, every time)
`Survey Category | Question ID | Domain Covered | Question | Guide Explanation | Answer Format | Survey Answer Options Style | Survey Answer Options Definitions | Answer Guide`

## Quality Rules (apply to every question)
- One construct per question — if "and" appears in the question text, split it
- Absolute counts (kiosks, APs, cameras) must be normalized per 10,000 seats or per location
- "We have not measured X" = non-response (score 0), never option A
- Concessionaire scenario: clubs may not control POS, F&B ordering, Wi-Fi in premium areas — questions must account for this
- Voice of Fan data = reference only, never survey questions to clubs

## Known Critical Issues (fix before pilot deployment)
1. **DI_03** — Count normalization needed (absolute counts not comparable across venue sizes)
2. **DI_05** — "We have not measured" must become a non-response, not option A
3. **TS_01** — Must address concessionaire-managed POS scenario

## Open Decisions
1. Final question framework: Claude V0 vs V1 vs merged — **pending**
2. Standard concessionaire handling across all affected questions — **pending**
3. Scoring weights and roll-up methodology — prototype, **pending finalization**
4. Venue capacity source: inline TI question or league data post-survey — **pending**

## Available Tools

**Skills (slash commands):**
- `/survey-review` — quality check any questions for bias, clarity, MECE compliance
- `/question-draft [layer] [topic]` — draft new questions in correct 9-field schema
- `/scoring-design` — build the scoring methodology from the question set (do this before dashboard or report work)
- `/dashboard-spec [view name]` — generate Tableau dashboard specification (structure only until scoring is finalized)
- `/scorecard-report [club name]` — generate club maturity report (requires scored data)

**Agents:**
- `survey-developer` — question methodology, drafting, schema compliance
- `data-analyst` — scoring calculations, Tableau specs, Python/Excel work
- `knowledge-manager` — end-of-session capture, backlog updates, CLAUDE.md maintenance

## Reference Docs
| File | Purpose |
|------|---------|
| `reference/NFL_Technology_Areas_Definitions.md` | v2 layer scope definitions |
| `reference/NFL_Scorecard_Methodology_v1.2.md` | Scoring framework (prototype) |
| `reference/nfl_full-reference.md` | Full question bank + MECE sub-category map |
| `reference/nfl_voice_of_the_fan_research.md` | VOF framework + tech-to-revenue correlations |

## Key Business Benchmarks
- Cashless transactions: 16–25% higher per-cap spending
- Mobile ordering: 22% higher order value; 80% include alcohol (highest margin)
- Self-service checkout: 85–170% sales increase across NFL stadiums
- Dynamic ticket pricing: 5–20% single-game revenue lift
