# NFL Stadium Technology Scorecard
Accenture engagement (ISOW 13 to MSOW) — stadium technology maturity assessment, 3-club validation pilot.
Fixed fee $100K · **SOW SIGNED 2026-03-30** · Term: Mar 30 – May 11, 2026 · Payment: $50K on signature, $50K on 2026-04-30
**Client lead:** Gary Brantley (NFL SVP & CIO) | **Day-to-day:** Jon Noble (Dir. Club & Stadium IT) | **Accenture lead:** Jon Wakefield (Principal)

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
5. Survey distribution: one link per team vs. multiple persona links — **leaning one link (Vik, 2026-03-30), not final**
6. Survey delivery mechanism: Google Forms → Google Sheets → Tableau pipeline — **Austin + Jordan testing, not confirmed**

## Confirmed Constraints (2026-03-30 AM Sync)
- **SOW signed 2026-03-30 — client engagement is now live**
- **Scoring output = maturity scale 1–5** (numerical) — confirmed by team; full methodology still TBD
- **Robert reviews all PRs; main branch is stable** — team process decision
- **Excel in project folder = source of truth for Claude** — Teams used for collaborative edits only

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

---

## rt3hq Hosted Dashboard — Development Rules

### Architecture
```
This repo (OneDrive/NFL/)  →  git push  →  RT3-ACN/nfl-scorecard
                                                │
                                          GitHub Actions (~60s)
                                                │
                                          RT3-ACN/rt3hq  →  Railway  →  rt3hq.com/nfl
```

**Three tiers — never mix them:**
| Tier | What | Where |
|------|------|--------|
| Code | Dashboard HTML, scripts, tools | This git repo |
| Live data | Comments, kanban, meetings | Railway SQLite `/data/nfl.db` |
| Backups | JSON exports of live data | RT3-ACN/rt3hq-backup (daily) |

### The only deploy command you need
```bash
git add deliverables/nfl-scorecard-dashboard.html
git commit -m "feat: describe what changed"
git push origin main
# rt3hq.com/nfl updates automatically within ~90s
```

### Hard rules
- **NEVER manually edit `RT3-ACN/rt3hq/projects/nfl/index.html`** — it is always overwritten by the sync action on the next push. Any manual edit will be silently destroyed.
- **NEVER commit data files**: `nfl_review_comments.json`, any `.db` files, or Excel changes that are data-only. Data lives in Railway, not git.
- **Always test locally first**: `python3 tools/serve.py` → localhost:9876 — verify the feature works before pushing.
- **To roll back a bad deploy**: `git revert HEAD && git push` — this is the safe undo.

### The API shim
The shim at the top of `nfl-scorecard-dashboard.html` bridges the standalone server API to rt3hq's API. It **self-disables on localhost** so the same file works for both local dev and hosted.
- Do not remove or manually edit the shim
- To add a new API endpoint to the hosted version: tell Claude "add /api/X to the NFL shim"
- To rebake the questions (after Excel changes): tell Claude "rebake NFL questions into the shim"

### What to commit vs. not
| ✅ Commit | ❌ Do NOT commit |
|-----------|-----------------|
| `deliverables/nfl-scorecard-dashboard.html` | `working/survey/nfl_review_comments.json` |
| `tools/serve.py` | Any `.db` files |
| `scripts/`, `meetings/*.md` | Data-only Excel changes |
| `.github/workflows/` | `.claude/worktrees/` |
