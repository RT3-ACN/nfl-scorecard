#!/usr/bin/env python3
"""
Add 67 new questions to Master Question Bank to reach ~20 per dimension (E,P,G,C,O)
with a good spread across 5 categories. Output: new rows appended to Survey_Pruned,
saved as v1.2.
"""
import openpyxl
from pathlib import Path

# Standard options (short for Excel)
OPT_T1 = "Data not available / unknown|We don't use this tech today|None / ad hoc|Pilot or limited deployment|Production limited|Production scaled"
OPT_T5 = "Data not available / unknown|We don't use this tech today|Ad hoc|Policy exists|Operationalized|Audited"
OPT_O  = "Data not available / unknown|We don't use this tech today|Not measured|Measured inconsistently|Measured with baseline|Measured and used to drive decisions"
RUBRIC_T1 = "T1 Maturity: 0=missing; 1=none; 3=pilot; 5=meaningful segment; 7=scaled; 10=optimized"
RUBRIC_T2 = "T2 Coverage %: 0=missing; 1<10%; 3=10-25%; 5=26-50%; 7=51-80%; 10>80%"
RUBRIC_T3 = "T3 Lower is Better (latency, time)"
RUBRIC_T4 = "T4 Higher is Better (adoption, %)"
RUBRIC_T5 = "T5 Governance: 0=missing; 1=ad hoc; 3=policy; 5=ownership+controls; 7=audits; 10=continuous"
RUBRIC_O  = "Outcomes: 1=not measured; 5=inconsistent; 7=baseline; 10=drives decisions"

def row(ta, sub, qid, dim, text, rtype, opts, notes, evidence, pre, in_, post, template, rubric):
    return [ta, sub, qid, dim, text, rtype, opts or "", notes or "", evidence or "", pre, in_, post, template or "", rubric or ""]

# --- Technology Infrastructure (add 11: E1, P2, G2, C3, O3 — one less E to balance) ---
TI = "Technology Infrastructure"
ti_new = [
    row(TI, "Connectivity", "CONN-01", "E", "Venue Wi-Fi exists for guests and is monitored for availability/capacity.", "single_select", OPT_T1, None, "Wi-Fi design doc; monitoring evidence", 0.6, 0.9, 0.5, "T1 Maturity Ladder", RUBRIC_T1),
    row(TI, "Connectivity", "CONN-02", "C", "What % of seating bowl and concourses have reliable guest Wi-Fi coverage?", "numeric_percent", "", None, "Coverage map or survey", 0.6, 0.9, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(TI, "Connectivity", "CONN-03", "P", "What is the p90 Wi-Fi connection success rate for guests during peak?", "numeric_percent", "", None, "Monitoring or survey", 0.6, 0.9, 0.5, "T4 Higher is Better", RUBRIC_T4),
    row(TI, "Connectivity", "CONN-04", "G", "Is Wi-Fi capacity planned and reviewed against attendance/events?", "single_select", OPT_T5, None, "Capacity plan; review cadence", 0.6, 0.9, 0.5, "T5 Governance Maturity", RUBRIC_T5),
    row(TI, "Connectivity", "CONN-05", "O", "Do you measure fan satisfaction or NPS tied to connectivity experience?", "single_select", OPT_O, None, "Survey or feedback data", 0.6, 0.9, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
    row(TI, "DAS / cellular", "DAS-01", "C", "What % of venue (seating, concourses) has DAS/cellular coverage?", "numeric_percent", "", None, "Coverage assessment", 0.5, 0.9, 0.6, "T2 Coverage %", RUBRIC_T2),
    row(TI, "Peak readiness", "PEAK-02", "P", "What is the frequency of load or stress testing for fan-facing systems?", "single_select", "Data not available / unknown|We don't use this tech today|Ad hoc|Annual|Pre-season|Per major event", None, "Test reports; schedule", 0.5, 1, 0.7, "T1 Maturity Ladder", RUBRIC_T1),
    row(TI, "Peak readiness", "PEAK-03", "G", "Is there a formal game-day or peak readiness checklist for technology?", "single_select", OPT_T5, None, "Checklist; sign-off", 0.5, 1, 0.7, "T5 Governance Maturity", RUBRIC_T5),
    row(TI, "Data integration & observability", "DATA-05", "O", "Do you measure operational uptime or SLA for fan-critical systems?", "single_select", OPT_O, None, "SLA report; uptime metrics", 0.6, 0.9, 0.7, "1/5/7/10 Outcomes", RUBRIC_O),
    row(TI, "Edge/CV platform readiness", "EDGE-07", "O", "Is CV or edge analytics output used to drive operational decisions?", "single_select", OPT_O, None, "Use cases; decision logs", 0.6, 0.8, 0.7, "1/5/7/10 Outcomes", RUBRIC_O),
    row(TI, "Connectivity", "CONN-06", "C", "What % of fan-facing systems have defined capacity or headroom for peak?", "numeric_percent", "", None, "Capacity docs", 0.6, 0.9, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(TI, "Connectivity", "CONN-07", "O", "Do you track connectivity-related incident or complaint volume over time?", "single_select", OPT_O, None, "Incident or feedback trend", 0.6, 0.9, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
]

# --- Digital Infrastructure (new area, 20 questions: 4 E, 4 P, 4 G, 4 C, 4 O) ---
DI = "Digital Infrastructure"
di_new = [
    row(DI, "Data & platform", "DINF-01", "E", "A customer data platform (CDP) or unified fan data layer exists for personalization and engagement.", "single_select", OPT_T1, None, "Architecture; data inventory", 0.7, 0.8, 0.5, "T1 Maturity Ladder", RUBRIC_T1),
    # DINF-02/03/04 E removed to balance to 20 E total
    row(DI, "Data & platform", "DINF-05", "C", "What % of fan touchpoints (app, web, kiosk) are connected to the same identity or profile?", "numeric_percent", "", None, "Integration inventory", 0.7, 0.8, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(DI, "Data & platform", "DINF-06", "C", "What % of critical fan journeys have real-time data (e.g. inventory, queue) available via API?", "numeric_percent", "", None, "API coverage; journey map", 0.6, 0.9, 0.7, "T2 Coverage %", RUBRIC_T2),
    row(DI, "Data & platform", "DINF-07", "C", "What % of fan data is governed under a defined retention and consent model?", "numeric_percent", "", None, "Data inventory; policy", 0.6, 0.7, 0.7, "T2 Coverage %", RUBRIC_T2),
    row(DI, "Data & platform", "DINF-08", "C", "What % of digital services use a shared content or configuration platform (CMS/config)?", "numeric_percent", "", None, "Platform inventory", 0.6, 0.8, 0.6, "T2 Coverage %", RUBRIC_T2),
    row(DI, "Data & platform", "DINF-09", "P", "What is the p95 latency for fan-facing API or data calls during peak?", "numeric_seconds", "", None, "APM or monitoring", 0.6, 0.9, 0.7, "T3 Lower is Better", RUBRIC_T3),
    row(DI, "Data & platform", "DINF-10", "P", "How often is fan data quality or completeness audited or measured?", "single_select", "Data not available / unknown|We don't use this tech today|Ad hoc|Quarterly|Monthly|Continuous", None, "Audit schedule; metrics", 0.6, 0.7, 0.7, "T1 Maturity Ladder", RUBRIC_T1),
    row(DI, "Data & platform", "DINF-11", "P", "What is the typical time to deploy a new integration or data pipeline to production?", "single_select", "Data not available / unknown|We don't use this tech today|Weeks|Days|Hours", None, "Release metrics", 0.6, 0.8, 0.6, "T3 Lower is Better", RUBRIC_T3),
    row(DI, "Data & platform", "DINF-12", "P", "Is platform availability (e.g. CDP, APIs) measured and reported?", "single_select", OPT_T5, None, "SLO or uptime report", 0.6, 0.8, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(DI, "Data & platform", "DINF-13", "G", "Is there a defined data ownership and stewardship model for fan data?", "single_select", OPT_T5, None, "RACI or policy", 0.6, 0.7, 0.7, "T5 Governance Maturity", RUBRIC_T5),
    row(DI, "Data & platform", "DINF-14", "G", "Are data pipelines and integrations documented and change-controlled?", "single_select", OPT_T5, None, "Docs; change log", 0.6, 0.8, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(DI, "Data & platform", "DINF-15", "G", "Is consent and preference management integrated across fan touchpoints?", "single_select", OPT_T5, None, "Consent flows; audit", 0.7, 0.7, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(DI, "Data & platform", "DINF-16", "G", "Are there security and privacy reviews for new fan data use cases?", "single_select", OPT_T5, None, "Review process; checklist", 0.6, 0.7, 0.7, "T5 Governance Maturity", RUBRIC_T5),
    row(DI, "Data & platform", "DINF-17", "O", "Do you measure conversion or engagement lift from personalization or unified data?", "single_select", OPT_O, None, "A/B or lift analysis", 0.7, 0.8, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
    row(DI, "Data & platform", "DINF-18", "O", "Is platform cost or efficiency (e.g. cost per fan, integration time) tracked?", "single_select", OPT_O, None, "Cost or efficiency metrics", 0.6, 0.7, 0.7, "1/5/7/10 Outcomes", RUBRIC_O),
    row(DI, "Data & platform", "DINF-19", "O", "Do you measure time-to-market for new digital features that depend on this platform?", "single_select", OPT_O, None, "Release or feature metrics", 0.6, 0.8, 0.6, "1/5/7/10 Outcomes", RUBRIC_O),
    row(DI, "Data & platform", "DINF-20", "O", "Is fan data quality (completeness, accuracy) measured and used for decisions?", "single_select", OPT_O, None, "Quality metrics; use", 0.6, 0.7, 0.7, "1/5/7/10 Outcomes", RUBRIC_O),
]

# --- Digital Services (add 10: E3, P1, G2, C3, O2 — +1 P and +1 C for balance) ---
DS = "Digital Services"
ds_new = [
    row(DS, "Ticketing", "TICK-01", "E", "Digital ticket purchase and delivery (mobile or print-at-home) is available for most events.", "single_select", OPT_T1, None, "Ticketing flow; capabilities", 1, 0.2, 0.2, "T1 Maturity Ladder", RUBRIC_T1),
    row(DS, "Ticketing", "TICK-02", "C", "What % of tickets are delivered or used digitally (mobile/QR) vs print?", "numeric_percent", "", None, "Ticketing analytics", 1, 0.3, 0.2, "T2 Coverage %", RUBRIC_T2),
    row(DS, "Ticketing", "TICK-03", "O", "Do you measure ticketing conversion (start-to-complete) or abandonment by channel?", "single_select", OPT_O, None, "Conversion metrics", 1, 0.2, 0.2, "1/5/7/10 Outcomes", RUBRIC_O),
    row(DS, "Ticketing", "TICK-04", "P", "What is the p90 time from ticket purchase to delivery (mobile/email)?", "numeric_seconds", "", None, "Delivery metrics", 1, 0.2, 0.2, "T3 Lower is Better", RUBRIC_T3),
    row(DS, "Merchandise & commerce", "MERCH-01", "E", "In-stadium merchandise can be discovered and purchased via app or kiosk (not only in-person).", "single_select", OPT_T1, None, "Commerce capabilities", 0.3, 0.8, 0.5, "T1 Maturity Ladder", RUBRIC_T1),
    row(DS, "Merchandise & commerce", "MERCH-02", "C", "What % of merchandise SKUs are available for digital browse or reserve (app/web)?", "numeric_percent", "", None, "Catalog coverage", 0.3, 0.8, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(DS, "Merchandise & commerce", "MERCH-03", "O", "Do you track merchandise revenue per cap or conversion (browse to buy)?", "single_select", OPT_O, None, "Revenue or conversion data", 0.3, 0.8, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
    row(DS, "Marketing & engagement", "MKTG-01", "E", "Personalized offers or recommendations are delivered to fans via app, email, or in-venue.", "single_select", OPT_T1, None, "Campaign or feature examples", 0.8, 0.5, 0.5, "T1 Maturity Ladder", RUBRIC_T1),
    row(DS, "Marketing & engagement", "MKTG-02", "C", "What % of active fans are enrolled in loyalty or rewards?", "numeric_percent", "", None, "Loyalty enrollment", 0.7, 0.6, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(DS, "Marketing & engagement", "MKTG-03", "C", "What % of fan communications (email, push) are personalized or segment-based?", "numeric_percent", "", None, "Campaign analytics", 0.7, 0.5, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(DS, "Marketing & engagement", "MKTG-04", "G", "Is fan consent for marketing and personalization captured and revocable?", "single_select", OPT_T5, None, "Consent UX; preference center", 0.7, 0.5, 0.5, "T5 Governance Maturity", RUBRIC_T5),
    row(DS, "Digital signage", "SIGN-01", "E", "Digital signage is used in concourses or key areas for dynamic content (not only static).", "single_select", OPT_T1, None, "Signage inventory; CMS", 0.4, 0.9, 0.4, "T1 Maturity Ladder", RUBRIC_T1),
    row(DS, "Digital signage", "SIGN-02", "C", "What % of concourse or high-traffic areas have digital signage?", "numeric_percent", "", None, "Signage map", 0.4, 0.9, 0.4, "T2 Coverage %", RUBRIC_T2),
    row(DS, "Marketing & engagement", "MKTG-05", "O", "Do you measure engagement or conversion lift from campaigns or loyalty?", "single_select", OPT_O, None, "Lift or engagement metrics", 0.7, 0.5, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
]

# --- Technology Services (add 13: E2, P4, G2, C2, O3 — fewer E for balance) ---
TS = "Technology Services"
ts_new = [
    row(TS, "Broadcast & 5G", "BCAST-01", "E", "Broadcast technology operations (e.g. in-venue broadcast, feeds) are managed and supported.", "single_select", OPT_T1, None, "Broadcast ops description", 0.4, 0.8, 0.6, "T1 Maturity Ladder", RUBRIC_T1),
    row(TS, "Broadcast & 5G", "BCAST-02", "C", "What % of fan-facing connectivity (Wi-Fi, cellular) is under SLA or formal vendor support?", "numeric_percent", "", None, "SLA inventory", 0.5, 0.9, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(TS, "Broadcast & 5G", "BCAST-03", "P", "What is the typical time to resolve a critical connectivity or broadcast incident?", "single_select", "Data not available / unknown|We don't use this tech today|Hours|Under 1 hour|Under 15 min", None, "Incident metrics", 0.5, 0.9, 0.5, "T3 Lower is Better", RUBRIC_T3),
    row(TS, "Broadcast & 5G", "BCAST-04", "O", "Do you measure broadcast or connectivity uptime or fan-reported issues?", "single_select", OPT_O, None, "Uptime or feedback metrics", 0.5, 0.8, 0.6, "1/5/7/10 Outcomes", RUBRIC_O),
    row(TS, "Marketing tech ops", "MKOPS-01", "C", "What % of fan-facing campaigns use a defined platform (email/push/ad server) with support?", "numeric_percent", "", None, "Platform coverage", 0.6, 0.5, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(TS, "Marketing tech ops", "MKOPS-02", "G", "Is there a defined process for launching and testing fan-facing campaigns (e.g. consent, targeting)?", "single_select", OPT_T5, None, "Process doc; checklist", 0.6, 0.5, 0.5, "T5 Governance Maturity", RUBRIC_T5),
    row(TS, "Security operations", "SECOPS-01", "P", "What is the mean time to detect (MTTD) or respond (MTTR) for security incidents affecting fan systems?", "single_select", "Data not available / unknown|We don't use this tech today|Hours|Under 1 hour|Under 30 min", None, "Incident metrics", 0.6, 0.8, 0.6, "T3 Lower is Better", RUBRIC_T3),
    row(TS, "Security operations", "SECOPS-02", "G", "Are security and privacy incidents involving fan data documented and reviewed?", "single_select", OPT_T5, None, "Incident process; review cadence", 0.6, 0.7, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(TS, "Game-day command", "OPS-02", "P", "How often does the game-day command center run drills or tabletop exercises?", "single_select", "Data not available / unknown|We don't use this tech today|Ad hoc|Annual|Pre-season|Per event", None, "Drill schedule", 0.3, 1, 1, "T1 Maturity Ladder", RUBRIC_T1),
    row(TS, "Staff enablement", "STAFF-02", "C", "What % of frontline staff (ushers, security, concession) have been trained on digital tools?", "numeric_percent", "", None, "Training records", 0.2, 1, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(TS, "Vendor governance", "VEND-02", "P", "Are fan-critical vendor SLAs reviewed and reported (e.g. monthly)?", "single_select", OPT_T5, None, "SLA review evidence", 0.3, 1, 0.7, "T5 Governance Maturity", RUBRIC_T5),
    row(TS, "Vendor governance", "VEND-03", "O", "Do you measure vendor performance (uptime, response) and use it for renewal or improvement?", "single_select", OPT_O, None, "Vendor scorecard or review", 0.3, 0.8, 0.7, "1/5/7/10 Outcomes", RUBRIC_O),
    row(TS, "Security operations", "SECOPS-03", "O", "Do you measure security incident trend or time-to-resolution for fan systems?", "single_select", OPT_O, None, "Incident metrics", 0.6, 0.8, 0.6, "1/5/7/10 Outcomes", RUBRIC_O),
]

# --- AI & Innovation (add 12: E2, P2, G2, C3, O3 — balanced) ---
AI = "AI & Innovation"
ai_new = [
    row(AI, "Personalization", "PERS-01", "E", "Recommendation or personalization engines are used for fan content, offers, or experiences.", "single_select", OPT_T1, None, "Use cases; platform", 0.7, 0.6, 0.5, "T1 Maturity Ladder", RUBRIC_T1),
    row(AI, "Personalization", "PERS-02", "C", "What % of fan touchpoints use personalized content or recommendations?", "numeric_percent", "", None, "Touchpoint inventory", 0.7, 0.6, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(AI, "Personalization", "PERS-03", "C", "What % of personalized experiences are measured for lift or conversion?", "numeric_percent", "", None, "Measurement coverage", 0.7, 0.6, 0.5, "T2 Coverage %", RUBRIC_T2),
    row(AI, "Personalization", "PERS-04", "P", "What is the typical latency for generating a personalized recommendation (e.g. next-best-offer)?", "numeric_seconds", "", None, "System metrics", 0.7, 0.6, 0.5, "T3 Lower is Better", RUBRIC_T3),
    row(AI, "Personalization", "PERS-05", "O", "Do you measure lift in conversion or engagement from personalization or recommendations?", "single_select", OPT_O, None, "Lift or A/B results", 0.7, 0.6, 0.5, "1/5/7/10 Outcomes", RUBRIC_O),
    row(AI, "Chatbots & agents", "CHAT-01", "P", "What is the average response time for fan support chatbot (first response)?", "numeric_seconds", "", None, "Bot analytics", 0.6, 0.5, 0.6, "T3 Lower is Better", RUBRIC_T3),
    row(AI, "Chatbots & agents", "CHAT-02", "P", "What is the resolution rate or containment rate for fan support chatbot conversations?", "numeric_percent", "", None, "Bot analytics", 0.6, 0.5, 0.6, "T4 Higher is Better", RUBRIC_T4),
    row(AI, "Chatbots & agents", "CHAT-03", "G", "Is chatbot content and escalation reviewed for safety and accuracy?", "single_select", OPT_T5, None, "Review process; guardrails", 0.6, 0.5, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(AI, "Sustainability", "SUST-01", "P", "How often is energy or sustainability data (e.g. building, tech) reviewed or reported?", "single_select", "Data not available / unknown|We don't use this tech today|Ad hoc|Quarterly|Monthly|Real-time", None, "Report cadence", 0.5, 0.6, 0.6, "T1 Maturity Ladder", RUBRIC_T1),
    row(AI, "Sustainability", "SUST-02", "G", "Is sustainability or carbon impact tracked and reported for venue or technology operations?", "single_select", OPT_T5, None, "Report or dashboard", 0.5, 0.6, 0.6, "T5 Governance Maturity", RUBRIC_T5),
    row(AI, "Sustainability", "SUST-03", "O", "Do you set or track sustainability targets (e.g. energy reduction) and use them for decisions?", "single_select", OPT_O, None, "Targets; review cadence", 0.5, 0.6, 0.6, "1/5/7/10 Outcomes", RUBRIC_O),
    row(AI, "Experimentation", "EXPT-01", "C", "What % of fan-facing features or campaigns are tested via A/B or experimentation before full rollout?", "numeric_percent", "", None, "Experiment log", 0.6, 0.6, 0.6, "T2 Coverage %", RUBRIC_T2),
    row(AI, "Experimentation", "EXPT-02", "O", "Do you measure outcomes (adoption, revenue, satisfaction) from innovation or POC deployments?", "single_select", OPT_O, None, "Outcome metrics", 0.6, 0.6, 0.6, "1/5/7/10 Outcomes", RUBRIC_O),
]

all_new = ti_new + di_new + ds_new + ts_new + ai_new

# Verify counts by dimension
from collections import Counter
dim_count = Counter(r[3] for r in all_new)
print("New questions by dimension:", dict(dim_count))
print("Total new:", len(all_new))

# Load workbook and append
base = Path("/Users/robert.treiber.iii/Library/CloudStorage/OneDrive-Accenture/Documents/Accenture/NFL")
wb = openpyxl.load_workbook(base / "NFL_Scorecard_Master_Combined_v1.1.xlsx")
ws = wb["Survey_Pruned"]
# Append rows (columns A through N = 14)
for r in all_new:
    ws.append(r)
# Save as v1.2
out = base / "NFL_Scorecard_Master_Combined_v1.2.xlsx"
wb.save(out)
print("Saved:", out)
print("Total rows in Survey_Pruned (incl. header):", ws.max_row)
