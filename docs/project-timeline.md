# NFL Stadium Technology Scorecard — Project Timeline

**Status:** SOW submitted — awaiting signature (Jon Noble, Director Club & Stadium IT, NFL)
**Engagement:** ISOW 8, Phase 2 · Fixed fee $100K · 4-club pilot
**Accenture Lead:** Jon Wakefield (Principal) · **Client Lead:** Gary Brantley (NFL SVP & CIO)
**NFL Counterpart:** Jon Noble (Director, Club & Stadium IT) · jwnoblejr@nfl.com

> **Day 0 = SOW executed.** All dates below are relative to SOW signature.

---

## Pre-SOW Work (Complete)

| Deliverable | Status | Notes |
|-------------|--------|-------|
| Deliverable A — Methodology | ✅ Complete | Scoring framework, technology area definitions, dimension model |
| Deliverable B — Excel Scoring Framework (v1.2) | ✅ Complete | 51-question bank (TI/DI/TS/AI), scoring templates T1–T5 + O |
| Deliverable C — Club Survey | ✅ Ready to deploy | `WIP_NFL_Survey_v0.xlsx` · "NFL Claude V0" sheet · 51 questions |

> These deliverables were built in preparation. They are complete but **not yet delivered to the client** — delivery begins post-SOW.

---

## Phase 2 Engagement Timeline (Post-SOW)

### Week 1–2 · Kickoff & Question Finalization
- Kickoff call with Gary Brantley, Jon Noble, Jon Wakefield
- Align on final question set: Claude V0 (51Q) vs. Colleague V1 (50Q) vs. merged
- Resolve 3 open critical issues: DI_03 normalization, DI_05 non-response, TS_01 concessionaire
- Lock concessionaire handling standard across all affected questions
- Run `/scoring-design` — finalize scoring weights and roll-up methodology with Jon Wakefield

**Output:** Locked question set + confirmed scoring methodology

---

### Week 3–4 · Survey Build & Pilot Prep
- Build final survey in delivery tool (Qualtrics / Microsoft Forms — TBD)
- Confirm 4-club pilot roster with Jon Noble's team
- Identify club IT contacts at each venue
- Prepare survey admin guide for clubs

**Output:** Production survey ready · club contacts confirmed

---

### Week 5–8 · Survey Deployment & Data Collection
- Deploy survey to 4 pilot clubs
- Weekly cadence check-ins with club IT contacts
- Track response completeness; follow up on gaps
- Venue capacity data collected (inline TI question or league data — pending decision)

**Output:** Completed survey responses from all 4 pilot clubs

---

### Week 9–10 · Scoring & Analysis
- Score all 4 clubs using finalized methodology
- Apply confidence factors where clubs flagged data quality gaps
- Run club-level and cross-club benchmarks
- Identify top capability gaps and investment prioritization areas

**Output:** Scored data for all 4 clubs · gap analysis complete

---

### Week 11–12 · Tableau Dashboard Build (Deliverable D)
- Build Tableau dashboard per spec (`/dashboard-spec`)
- Views: club summary, cross-club benchmark, technology layer heatmap, fan journey view
- Connect to scored data model
- Internal review with Jon Wakefield

**Output:** Tableau dashboard v1 — internally reviewed

---

### Week 13–14 · Final Deliverable & Readout
- Deliverable D delivered to client (Tableau dashboard)
- Generate per-club maturity reports (`/scorecard-report [club]`)
- Prepare Phase 2 summary deck for Gary Brantley
- Executive readout — NFL technology leadership

**Output:** Phase 2 summary deck · executive readout complete · engagement closed

---

## Open Decisions (Resolve by Week 2)

| # | Decision | Owner |
|---|----------|-------|
| 1 | Final question framework: V0 vs V1 vs merged | Robert + Colleague + Jon Wakefield |
| 2 | Concessionaire handling standard (all affected questions) | Robert + Jon Wakefield |
| 3 | Scoring weights and roll-up formula | Jon Wakefield approval |
| 4 | Venue capacity source: inline question or league data | Jon Noble / NFL |
| 5 | Survey delivery tool: Qualtrics vs. Microsoft Forms | Jon Noble / NFL IT |

---

## Key Contacts

| Name | Role | Org |
|------|------|-----|
| Gary Brantley | SVP & CIO | NFL |
| Jon Noble | Director, Club & Stadium IT | NFL |
| Jon Wakefield | Principal, Engagement Lead | Accenture |
| Robert Treiber III | Cloud & Security Consultant, ZTSI | Accenture |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| SOW signature delay | Medium | Delays all delivery | Weekly follow-up with Jon Noble |
| Club survey non-response | Medium | Incomplete pilot data | Club IT contacts confirmed pre-deployment; admin guide provided |
| Scoring methodology not finalized before dashboard build | High if ignored | Non-comparable dashboard | Run `/scoring-design` in Week 1–2 |
| Concessionaire data gaps | High | Non-comparable F&B/TS data | Concessionaire language locked in survey during Week 1–2 |
| MCP server access for Tableau | Medium | Dashboard spec delay | Use `/dashboard-spec` skill as fallback; MCP server blocked by Accenture CIO policy |
