# PflegeAI Regulatory Analysis: DSGVO, MDR & Documentation Requirements

**Research Date:** 2026-02-04  
**Focus:** German/EU regulatory framework for AI-powered nursing home communication and documentation

---

## Executive Summary

PflegeAI operates at the intersection of **three regulatory frameworks**:
1. **DSGVO/GDPR** - Health data is Art. 9 "special category" data (highest protection)
2. **MDR/EU AI Act** - AI software for clinical decisions = Class IIa minimum (Notified Body required)
3. **SGB XI §113** - Nursing documentation standards (actually SUPPORTIVE of digital innovation)

**Bottom Line:** Regulatory compliance is achievable but requires upfront investment (~€50-100K for MDR certification). This is a **competitive moat** once achieved.

---

## 1. DSGVO (GDPR) Requirements for Health Data

### 1.1 Classification
- Health data = **Art. 9 DSGVO "besondere Kategorien"** (special categories)
- Highest protection level in GDPR
- Applies equally to hospitals, nursing homes, ambulatory care

### 1.2 Key Requirements

| Requirement | What It Means | PflegeAI Action |
|-------------|---------------|-----------------|
| **Datenschutzbeauftragter (DSB)** | Mandatory for ANY facility processing health data (Art. 37) | We help facilities meet this; our software must be DSB-friendly |
| **Verarbeitungsverzeichnis (VVT)** | Art. 30 - Record of all data processing activities | Build automated VVT generation into product |
| **Auftragsverarbeitungsvertrag (AVV)** | Art. 28 - Required contract with any data processor | Template AVV for B2B sales |
| **Einwilligung** | Explicit consent needed for data sharing (even to family!) | Built-in consent management |
| **Schweigepflicht** | §203 StGB - Criminal liability for data breaches | End-to-end encryption, access controls |
| **Technische Maßnahmen (TOMs)** | Encryption, secure auth, regular backups required | Cloud security architecture |

### 1.3 Recent Developments (2024-2025)

- **ePA (Elektronische Patientenakte)**: Nationwide since Jan 2025, opt-out model
  - *Opportunity: Integration with ePA adds value*
- **GDNG (Gesundheitsdatennutzungsgesetz)**: March 2024, regulates health data for research
  - *Relevant if we offer analytics/research features*
- **Telepflege Requirements**: Focus on encryption + access controls
  - *Directly applicable to our voice-to-text transmission*

### 1.4 Penalties
- Up to **€20M or 4% of global revenue** (whichever higher)
- More critically: **Reputational damage** in trust-based healthcare sector

### 1.5 PflegeAI Compliance Strategy

1. **Privacy by Design**: DSGVO compliance built into architecture from day 1
2. **Data Minimization**: Only collect what's needed for care
3. **On-premise option**: For facilities that can't use cloud
4. **German/EU hosting**: No US data transfer (Schrems II compliant)
5. **Audit trail**: Every access logged, immutable

---

## 2. MDR & EU AI Act: Medical Device Classification

### 2.1 Is PflegeAI a Medical Device?

**Critical Question:** Does PflegeAI qualify as Medical Device Software (MDSW)?

| Product Component | Classification | Rationale |
|-------------------|---------------|-----------|
| **Resident→Nurse Communication** | Potentially MDSW (Class IIa) | If AI provides "information for therapeutic decisions" (prioritization = clinical decision support) |
| **Nurse Voice Documentation** | Likely MDSW (Class IIa) | Information used for care planning = diagnostic/therapeutic purpose |
| **Simple transcription only** | NOT MDSW | Pure data storage/conversion = excluded |

### 2.2 MDR Rule 11 (The Software Rule)

> "Software intended to provide information which is used to take decisions with diagnosis or therapeutic purposes is classified as class IIa"

**Implications:**
- **Notified Body involvement required** (no self-certification for Class IIa+)
- Full technical documentation
- Clinical evaluation required
- Post-market surveillance system
- Quality Management System (ISO 13485)

### 2.3 EU AI Act (Regulation 2024/1689) - NEW!

AI Act came into force August 2024. Medical devices with AI are "high-risk" products.

**Key Requirements:**

| AI Act Requirement | Article | Notes |
|-------------------|---------|-------|
| Risk Management System | Art. 9 | Must cover AI-specific risks (data poisoning, bias) |
| Data Governance | Art. 10 | Training/validation/test data documentation |
| Technical Documentation | Art. 11 | Can combine with MDR technical file |
| Logging/Audit Trail | Art. 12 | Input data logging for post-market surveillance |
| Human Oversight | Art. 14 | Must design for human control/override |
| Accuracy & Robustness | Art. 15 | Cybersecurity requirements |
| Quality Management | Art. 16-17 | Integrates with ISO 13485 QMS |
| Conformity Assessment | Art. 43 | Notified Body review |

**Penalties:** Up to **7% of annual revenue**

### 2.4 Classification Strategy Options

**Option A: Full Medical Device (Recommended)**
- Classify as Class IIa medical device
- Full MDR + AI Act compliance
- Timeline: 12-18 months, Cost: €50-100K
- **Advantage:** Competitive moat, opens hospital market, investor credibility

**Option B: Avoid Medical Device Scope**
- Position as "communication tool only" (no clinical decision support)
- Remove AI prioritization/recommendation features
- **Disadvantage:** Loses core value proposition, VOIZE competition

**Option C: Phased Approach (Recommended for MVP)**
1. Launch with non-MDSW features (simple transcription/communication)
2. Parallel MDR certification track for AI features
3. Release AI features post-certification

### 2.5 Notified Bodies in Germany

| Notified Body | Specialization | Website |
|---------------|---------------|---------|
| TÜV SÜD | Software/Digital Health | tuvsud.com |
| TÜV Rheinland | General MD | tuv.com |
| DEKRA | General MD | dekra.com |
| BSI (for cybersecurity) | IT Security | bsi.bund.de |

---

## 3. Nursing Documentation Requirements (SGB XI)

### 3.1 Legal Basis

**§113 SGB XI** - Quality standards for nursing care, including documentation

Key principle (§113 Abs. 1 Satz 4):
> "Anforderungen dürfen über ein für die Pflegeeinrichtungen vertretbares und wirtschaftliches Maß nicht hinausgehen"
> *(Requirements must not exceed what is reasonable and economical for facilities)*

**Critical insight (§113 Abs. 1 Satz 8):**
> "Zeitliche Einsparungen [...] die Ergebnis der Weiterentwicklung der Pflegedokumentation [...] sind, führen **nicht zu einer Absenkung der Pflegevergütung**, sondern wirken der **Arbeitsverdichtung entgegen**"
> *(Time savings from documentation improvements do NOT reduce reimbursement, but counteract work intensification)*

**→ This is HUGE for sales pitch: Facilities keep the savings!**

### 3.2 Documentation Requirements

| Element | Required | Notes |
|---------|----------|-------|
| Stammdaten | ✓ | Patient master data |
| Pflegeanamnese | ✓ | Initial nursing assessment |
| Pflegeplanung | ✓ | Care plan |
| Pflegebericht | ✓ | Daily care notes |
| Leistungsnachweise | ✓ | Service documentation |
| Medikamentenplan | ✓ | Medication records |
| Wunddokumentation | ✓ | Wound care records |
| Vitalzeichen | ✓ | Vital signs |

### 3.3 SIS (Strukturierte Informationssammlung)

The **Entbürokratisierungsinitiative** (de-bureaucratization initiative) introduced the **Strukturmodell** with SIS:

- Reduces documentation to 4 steps: Assessment → Planning → Implementation → Evaluation
- Person-centered (conversation with patient/resident)
- Explicitly designed to reduce time burden
- **Voice-to-text documentation aligns perfectly with SIS goals**

### 3.4 MDK/MD Prüfung (Quality Audits)

- Regular audits by Medizinischer Dienst (MD)
- Documentation is key audit criterion
- Digital documentation must be:
  - **Lückenlos** (complete)
  - **Zeitnah** (timely - immediately after care)
  - **Nachvollziehbar** (traceable - who, what, when)
  - **Revisionssicher** (audit-proof - no deletions)

### 3.5 PflegeAI Documentation Features

| Feature | Regulatory Benefit |
|---------|-------------------|
| Voice-to-text | Enables "zeitnah" documentation at point of care |
| Auto-timestamping | Ensures "nachvollziehbar" |
| Immutable logs | Ensures "revisionssicher" |
| AI structuring | Supports SIS methodology |
| MD-ready exports | Simplifies quality audits |

---

## 4. Regulatory Roadmap for PflegeAI

### Phase 1: MVP Launch (Month 1-6)
- [ ] DSGVO compliance (AVV, DSB support, TOMs)
- [ ] German cloud hosting (AWS Frankfurt or IONOS)
- [ ] Basic features only (no clinical decision AI)
- [ ] ISO 27001 certification (optional but builds trust)

### Phase 2: MDR Preparation (Month 3-12)
- [ ] Hire Regulatory Affairs consultant
- [ ] Define intended purpose (Zweckbestimmung) carefully
- [ ] Implement ISO 13485 QMS
- [ ] Clinical evaluation plan
- [ ] Select Notified Body (TÜV SÜD recommended)

### Phase 3: MDR Certification (Month 12-18)
- [ ] Technical file submission
- [ ] Notified Body audit
- [ ] CE marking (Class IIa)
- [ ] Launch AI features

### Estimated Costs

| Item | Cost Range | Notes |
|------|-----------|-------|
| Regulatory Affairs Consultant | €30-50K | Part-time, 12 months |
| ISO 13485 Implementation | €10-20K | QMS setup |
| Notified Body Fees | €15-30K | Class IIa assessment |
| Clinical Evaluation | €5-15K | Literature review (no clinical trial needed for Class IIa) |
| **Total** | **€60-115K** | Can be spread over 18 months |

---

## 5. Strategic Implications

### Competitive Moat
- **VOIZE is already CE-marked** (Class IIa medical device)
- MDR certification is barrier to entry
- Once certified, significant switching costs for customers

### Investor Narrative
> "We're not avoiding regulation - we're embracing it. MDR certification is our moat. VOIZE spent 2+ years getting certified. We've mapped the path and will achieve it in 12-18 months."

### Sales Narrative
> "PflegeAI is DSGVO-compliant by design. Your patient data never leaves German servers. And §113 SGB XI guarantees: time savings from better documentation don't reduce your reimbursement - you keep the efficiency gains."

### Risk Mitigation
- Start with non-MDSW features to generate revenue
- MDR certification running in parallel
- If certification delayed, core product still viable

---

## 6. Key Takeaways for YC/McKinsey Pitch

1. **DSGVO is manageable** - standard healthcare SaaS compliance, we bake it in
2. **MDR is the real barrier** - 12-18 months, €60-100K, but creates defensible moat
3. **SGB XI is actually SUPPORTIVE** - explicitly encourages documentation digitization
4. **Regulatory = Opportunity** - competitors who cut corners will get caught; we win long-term
5. **Phased approach** - launch MVP fast, certify AI features in parallel

---

## Sources

- MDCG 2019-11: Software Qualification Guidance
- EU AI Act (Regulation 2024/1689)
- MDR (Regulation 2017/745)
- SGB XI §113
- Proliance.ai: Datenschutz in der Pflege (2025)
- Johner Institut: AI Act for Medical Devices
- Metecon: MDSW Classification Guide
