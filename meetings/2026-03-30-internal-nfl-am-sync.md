---
date: 2026-03-30
type: internal
source: copilot
---

# Internal NFL AM Sync Call
**Date:** 2026-03-30
**Type:** Internal
**Attendees:** Robert Treiber III, Kieran McConnell, Vik Arya, Jordan Bockelman, Austin Seiter, Brian Halloran

## Discussion

**SOW Status**
Vik updated the team on the SOW — data language changes made, awaiting NFL legal response. No client engagement until SOW is signed.

**Dashboard & Claude Code Setup**
Robert walked the team through the NFL Scorecard dashboard, Claude Code integration, local server setup, and GitHub repo access. Technical issues discussed around GitHub repo permissions and keeping versions in sync. Team aligned on Git branching + PR reviews as the workflow; OneDrive remains the sync mechanism for the Excel file.

**Survey Questions & Scoring**
Kieran described the Excel cleanup and survey question refinement. Confirmed maturity scale 1–5 as the scoring output format (numerical, to simplify dashboard aggregation). Jordan and Austin discussed Google Forms integration — responses populate Google Sheets, which connects to Tableau for automated dashboard updates.

Debate on survey distribution: one link per team vs. multiple links per persona. Vik leaning toward one link per team.

**Version Control**
Jordan and Robert tested the PR review and merge process live during the call. Agreed: Robert maintains main branch and reviews all PRs.

## Decisions

1. **No client engagement before SOW is signed** — Vik
2. **One survey link per team** (leaning, not yet final) — Vik
3. **Robert maintains main branch; all changes via PR** — Robert + Vik
4. **Excel in project folder = source of truth for Claude; Teams for collaborative edits** — Vik + Robert
5. **Maturity scale 1–5 confirmed as scoring output format** — team

## Action Items

- [ ] Draft six-week engagement plan → send to Vik for alignment — **Kieran + Robert**
- [ ] Finalize survey questions → send to Vik ≥30 min before EOD — **Kieran + Robert** (due today)
- [ ] Test Google Forms integration, mock data, Tableau connection — **Austin + Jordan**
- [ ] Schedule workshop to finalize questions and automate Excel → Forms — **Team**
- [ ] Confirm stable branch / static copy strategy — **Robert**

## Open Items

- Workshop date TBD (depends on SOW + question lock)
- Google Forms → Tableau pipeline: being tested, not confirmed working
- Survey link distribution: one link per team not yet final
