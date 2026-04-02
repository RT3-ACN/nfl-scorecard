---
date: 2026-04-02
type: internal
source: copilot
time: 3:31–4:03 PM EST
---

# NFL Survey Question Review — TI Layer
**Date:** 2026-04-02
**Time:** 3:31–4:03 PM EST
**Attendees:** Robert Treiber III, Kieran McConnell, Vik Arya

## Discussion

**Survey Question Phrasing Principles**
Team reviewed v1 TI-layer questions against the value tree framework. Vik flagged several questions as too open-ended or use-case-driven. Agreement reached to anchor all questions on capability in a vacuum — not on specific operational scenarios or use cases that might lead respondents.

**Normalization and Proportionality**
Kieran raised the need to normalize responses based on stadium size and proportionality. Agreement: normalization logic should be applied post-survey as a scoring/analysis step, not embedded in question phrasing.

**Wi-Fi vs. Network Management**
Vik distinguished between Wi-Fi management (spectrum tuning, AP configuration) and broader network management (OT/IT segmentation, QoS). These must be separate questions — current draft had overlap.

**Network Control Framing**
"Who manages your network?" rejected as not useful. Revised direction: ask about control over network operations by laying out specific control levers. Management entity (in-house vs. outsourced) is irrelevant to capability scoring.

**Segmentation Questions**
Network segmentation questions should focus on device groupings (OT/IT, QoS groups, logical/physical separation) — not tied to broadcast use cases. Broadcast was cited as an example of use-case drift to avoid.

**Cybersecurity and Edge**
Cybersecurity posture questions: "describe your protection measures" format preferred over yes/no. Edge infrastructure: ask about utilization and how data/analytics are used, not just whether capability is deployed.

**Cloud and On-Prem Data**
On-prem and cloud infrastructure questions should be combined for efficiency. Data organization questions (data lakes, warehouses) need to be repositioned to the correct capability layer with defined terms.

**Pre-Alignment Requirement**
Vik directed Robert and Kieran to align internally and pressure-test questions before any stakeholder review session. Goal: eliminate ambiguity and definition debates during reviews with Vik and John.

## Decisions

### Methodology

1. **Questions must be capability-focused, not use-case-driven** — ask what the network/system *can do*, not how it supports specific ops — Vik
2. **"Describe your" phrasing preferred** — open-ended describe format over binary yes/no — Vik
3. **Answers should unpack maturity** — "yes" answers should be followed by descriptors reflecting capability level, not just confirmed — Vik
4. **Segmentation = device groupings and logical/physical separation** — not tied to broadcast or operational workflows — Vik + Kieran
5. **Wi-Fi and network management are separate questions** — spectrum tuning vs. QoS/OT-IT segmentation — Vik
6. **Network control framed as control levers** — not "who manages it" — Vik
7. **Cybersecurity phrasing: "describe your protection measures"** — Vik
8. **Edge infrastructure: utilization-focused** — how is it used, not just is it deployed — Vik
9. **On-prem + cloud questions combined** — streamline for respondent efficiency — Vik

### Process

10. **Robert + Kieran pre-align before any stakeholder review** — pressure-test phrasing and definitions internally first — Vik
11. **Schedule alignment meeting: Vik + Jon Noble + Kieran + Robert** — framework anchoring before proceeding to next question block — Vik
12. **Normalization applied post-survey** — in scoring/analysis layer, not embedded in question wording — Kieran + Vik

## Action Items

- [ ] Revise TI-layer questions for capability focus and describe-your phrasing — **Robert + Kieran**
- [ ] Separate Wi-Fi management and network management questions — **Robert + Kieran**
- [ ] Rephrase segmentation questions to focus on device groupings, not broadcast use cases — **Robert + Kieran**
- [ ] Rephrase network control question to expose control levers — **Robert + Kieran**
- [ ] Revise cybersecurity and edge questions with describe-your format — **Robert + Kieran**
- [ ] Combine on-prem + cloud infrastructure questions; reposition data org questions to correct layer — **Robert + Kieran**
- [ ] Schedule alignment meeting with Vik + Jon Noble + Kieran + Robert — **Robert / Kieran**
- [ ] Internal pressure-test of all revised questions before next stakeholder review — **Robert + Kieran**

## Open Items

- **CBRS exclusion scope** — when should CBRS be excluded vs. included in connectivity questions?
- **Data warehousing definition** — team needs shared definition before data org questions are finalized
- **Guest vs. operational Wi-Fi segmentation** — how to handle in survey when some clubs don't distinguish
