---
tags: [project, client/nfl, review]
date: 2026-03-17
updated: 2026-03-18
status: active
---

# NFL Scorecard Survey — Question Review Notes

## Session Log

### 2026-03-18 — Repo + Plugin Build Session

**Completed:**
- Built private GitHub repo at `RT3-ACN/nfl-scorecard` — full team collaboration infrastructure
- Created complete directory structure (`working/survey/`, `reference/`, `docs/`, `deliverables/`, `archive/`)
- Audited and updated all 3 agents (survey-developer, data-analyst, knowledge-manager) to v2 framework
- Audited and updated all 4 skills (survey-review, question-draft, dashboard-spec, scorecard-report)
- Created new `/scoring-design` skill — the critical path tool for building scoring methodology from questions
- Created 6 documentation files (`docs/onboarding.md`, `docs/claude-guide.md`, `docs/framework.md`, `docs/skills-reference.md`, `docs/agents-reference.md`, `docs/workflow.md`)
- Created `CLAUDE.md` (single source of truth), `CONTRIBUTING.md`, `README.md`, `plugin.json`, `.gitignore`, `.gitattributes`
- Removed all Excel workbooks from repo except `WIP_NFL_Survey_v0.xlsx` — all others retired
- Removed 10+ stale root-level files, cleaned archive
- Reframed scoring: `NFL_Scorecard_Methodology_v1.2.md` labeled as pitch-era prototype; Phase 2 scoring to be built from scratch via `/scoring-design`

**Key decision recorded:**
- Scoring methodology is NOT being carried forward from pitch. Phase 2 scoring will be designed from the finalized question set using `/scoring-design`. Do not apply v1.2 weights or formulas.

**Still open (survey issues — unchanged):** DI_03, DI_05 (now renamed from ID_03/ID_05), TS_01

---

## Active Question Set (as of 2026-03-18)

**File:** `WIP_NFL_Survey.xlsx` → sheet **"NFL Claude V0"**
**Status:** v0 complete — 51 questions across 4 layers
**Framework version:** v2 (4-layer, TI_/DI_/TS_/AI_ prefixes)

| Layer | Count | IDs |
|---|---|---|
| Technology Infrastructure | 15 | TI_01–TI_15 |
| Digital Infrastructure | 16 | DI_01–DI_16 |
| Technology Services | 10 | TS_01–TS_10 |
| AI & Innovation | 10 | AI_01–AI_10 |
| **Total** | **51** | |

**v2 structural decisions (confirmed 2026-03-18):**
- Physical endpoint devices (displays, kiosks, cameras) → Digital Infrastructure (not TI)
- Technology Infrastructure = connectivity only (Wi-Fi, DAS, 5G, cabling, backbone)
- Voice of Fan = reference data only, not survey questions
- No open-text questions — all drop-down or select-all-that-apply, min 5 options
- All questions have Answer Guide with scoring rubric and cross-layer flag logic

**Parallel workstream:** Colleague's draft in `WIP_NFL_Survey.xlsx` → "Survey Questions V1" (50 Qs, different layer naming and structure). Decision pending on which framework to adopt or how to merge.

---

## Review vs. Colleague's "Survey Questions V1"

**Their strengths to consider borrowing:**
- Q4 (TS): "What data do you NOT capture but want to?" — gap analysis angle worth adding to TS
- Q13 (DI): Infrastructure reach beyond venue — already incorporated as DI_14
- Q14 (DI): Self-placement on DI roadmap — already incorporated as DI_15

**Their questions flagged by them as problematic:**
- Q4 TI: Vendor list (hard to score) — we intentionally excluded vendor inventories
- Q7 TI: 5G node count (no context) — axed in their notes, we handle via TI_05 (deployment maturity)
- Q5 AI: Open text (remove all free text) — we have no open text questions

---

## Previous Review Notes (2026-03-17, nfl_master-csv.txt, old framework)

---

## Summary Verdict

The questions are in strong shape overall — progressive answer laddering, answerable by a CIO/VP-Technology, and well-documented with guide text and scoring notes. Three issues need resolution before first deployment. Remaining issues can be addressed in a v1.1 pass after pilot feedback from the first 1–2 clubs.

---

## Critical — Fix Before Deployment

### 1. ID_03 — Self-service/checkout-free hardware count
**Problem:** Combines three qualitatively different hardware categories (self-service kiosks, AI-powered checkout stations, checkout-free stores) and uses absolute counts (1–5, 6–15, etc.) rather than normalized density.

A 70,000-seat venue with 10 kiosks and a 40,000-seat venue with 10 kiosks are in very different positions. The absolute count will produce non-comparable data across the 32-club portfolio.

**Recommended fix:**
- Normalize the count to per-10,000 seats or per-concession-location, OR
- Separate checkout-free stores (Amazon Just Walk Out–style) into their own question — they represent a qualitatively different level of investment and capability than a self-service kiosk

---

### 2. ID_05 — Gate throughput capacity
**Problem:** Option A is "We have not measured per-lane throughput." That is a non-response, not a scale point. Under current scoring (A=1), a club that hasn't measured throughput gets a score of 1 (Pilot/partial) rather than 0 (unknown/missing), which overstates their capability.

**Recommended fix:**
- Move "We have not measured" to the standard non-response handling (alongside "Data not available / unknown"), scored as 0
- Replace option A with an anchored low-end performance tier (e.g., "< 20 fans per lane per minute, measured")

---

### 3. TS_01 — POS platform count
**Problem:** Doesn't account for the standard NFL operating model where concessionaires (Aramark, Levy, Delaware North, Centerplate, etc.) run their own POS software independently of the club. Many clubs have 3–4 platforms not by choice but by operator contract — they have no authority to consolidate.

Scoring these clubs at A unfairly penalizes a legitimate business structure and will create defensiveness among the first clubs.

**Recommended fix:**
- Add a qualifier: "including POS platforms operated by your concessionaires and third-party food and beverage operators"
- And/or add: "Do you have a contractual mandate to consolidate POS platforms across all operators?" as a follow-on
- At minimum, add a note to the guide text acknowledging the operator-managed scenario and how it should be answered

---

## Moderate — Address in v1.1

### 4. ID_04 — Digital signage ratio
**Problem:** "Percentage of signage inventory that is digital" doesn't specify how to count. By number of displays, a single large LED video board = 1 display. By area, it might represent 60% of the venue's total display square footage. Different counting methods will produce very different percentages for the same venue.

**Fix:** Add to guide text: "Count by number of discrete display units (each LED panel, monitor, or kiosk = one unit). Exclude the primary video board."

### 5. ID_08 — DAS coverage
**Problem:** "Venue-managed cellular enhancement hardware" will exclude carrier-managed DAS deployments, which is how most of the league operates. This undercounts actual coverage.

**Fix:** Change to "venue or carrier-managed cellular enhancement hardware (DAS or small cells)."

### 6. DI_04 — BI/analytics platform
**Problem:** Bundles game-day real-time reporting with season-level reporting. A club using Tableau for post-season analysis but with no live game-day dashboard should score differently than one with a real-time ops platform.

**Fix:** Either split into two questions (game-day real-time vs. season-level analytics), or revise the options to clearly distinguish real-time during-event capability from post-event/seasonal reporting.

### 7. AI_04 — Sponsor attribution
**Problem:** "Measure and attribute the actual impact and reach" is imprecise. Impressions (footfall near a display), dwell time, engagement (scans/taps), and sales attribution are all different levels of sophistication.

**Fix:** Tighten the answer options to progress from: foot traffic counting → impression measurement with dwell → demographic overlay → purchase attribution. The current options likely do this — just make the progression explicit in the guide text.

---

## Minor — Polish Pass

### 8. ID_01 — Wi-Fi AP ratio direction
The ratio framing (1:150 = bad, 1:24 = good) is counterintuitive because the lower number is better. Engineers typically think in "APs per 100 seats" where higher = better. The current framing works but gut-check with first respondent.

### 9. ID_09 — Exterior hardware
Question stem lists 4 hardware types (Wi-Fi, DAS, signage, POS). A club may have exterior DAS but no exterior POS. Consider changing stem to: "Is any fan-facing technology hardware deployed in exterior areas..." — let the options handle the gradient.

### 10. TS_03 — App feature count (unweighted)
Eight features counted equally means AR experiences (deployed at <5% of NFL venues) = mobile tickets (deployed at ~95%). Consider separating into: (a) core features score (tickets, ordering, wayfinding) and (b) advanced features score, rather than a single count.

### 11. DI_07 — Cybersecurity candor risk
CIOs may under-disclose on this question in a peer-benchmarked survey. Add a brief note in guide text: "Responses are shared only with NFL league leadership and the Accenture engagement team. They are not shared with other clubs."

---

## What's Working Well

- **Guide explanations and answer guides** are genuinely strong — they will reduce ambiguity significantly for respondents, especially on technical questions
- **AI layer calibration** is appropriate — most clubs will land at A–B, which is itself a valuable finding; the questions don't set unrealistic expectations
- **DI_02 (unified fan identity)** and **DI_03 (cross-system correlation)** are among the best questions in the set — concrete, unambiguous, high analytical value
- **Cross-layer correlation logic** (ID_01 Wi-Fi density → TS_02 mobile ordering → revenue per-cap) is structurally sound and will produce testable hypotheses in the dashboard
- **Layer 4 (AI)** questions are well-scoped to what's actually being deployed vs. evaluated vs. not on the roadmap

---

## Open Questions

1. How will we handle the concessionaire-managed technology scenario broadly? (Not just POS — signage, mobile ordering, and Wi-Fi in premium areas often involve third-party operators.) Do we need a standard note across all affected questions?
2. Should ID_03 become two questions (self-service kiosks normalized by density, and checkout-free stores as a Y/N + count)?
3. For the pilot: will we pre-brief the 4 clubs on the non-response convention (both "Data not available" and "We don't use this" = 0)? This may affect their willingness to complete the survey.

---

*Next review: After pilot feedback from Club 1. Flag to version as v1.1 when first round of fixes applied.*
