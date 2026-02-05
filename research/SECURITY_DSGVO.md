# Security & DSGVO: Gesundheitsdaten-Handling

## Executive Summary

PflegeAI processes **Gesundheitsdaten** (health data) — the highest protection category under DSGVO. This document defines the security architecture, regulatory requirements, and implementation roadmap to achieve compliance.

**Key Requirements:**
- DSGVO Art. 9 compliance (health data as "special category")
- BSI C5 Type 2 attestation (mandatory since July 2025 for healthcare cloud)
- ISO 27001:2022 certification (industry standard)
- §393 SGB V compliance (German healthcare cloud law)

**Strategic Insight:**
> "Security is not a cost center — it's a sales enabler. Every German healthcare buyer asks for ISO 27001 and DSGVO compliance. Without it, you don't get past procurement."

---

## 1. Regulatory Landscape

### 1.1 DSGVO Article 9 — Health Data

Health data is classified as **"besondere Kategorien personenbezogener Daten"** (special categories) under Art. 9 DSGVO. Processing is prohibited by default, with limited exceptions:

**Legal Bases for PflegeAI:**
| Legal Basis | Application |
|-------------|-------------|
| Art. 9(2)(a) — Explicit Consent | Residents explicitly consent to voice recording + AI analysis |
| Art. 9(2)(h) — Healthcare Provision | Processing for medical/care purposes by bound professionals |
| Art. 6(1)(b) — Contract | Processing necessary for service delivery (B2B contract with facility) |

**Required Documentation:**
- Einwilligungserklärung (consent form) for each resident
- Verarbeitungsverzeichnis (Art. 30 record of processing activities)
- Datenschutz-Folgenabschätzung (DSFA/DPIA) — **mandatory for health data**
- Auftragsverarbeitungsvertrag (AVV) with every facility customer

### 1.2 §393 SGB V — Cloud in Healthcare (DigiG)

The **Digitalgesetz (DigiG)** introduced §393 SGB V, which defines strict requirements for cloud usage with health data:

**Key Requirements:**
| Requirement | Status |
|-------------|--------|
| BSI C5 Type 1 | Minimum since January 2025 |
| BSI C5 Type 2 | **Mandatory since July 2025** |
| Data Location | DE, EU/EEA, Switzerland, or Art. 45 adequacy country |
| Controller Location | Must have branch in Germany |

**What This Means for PflegeAI:**
- Must use **BSI C5 Type 2 certified** cloud provider
- **Hetzner Cloud qualifies** ✅ (C5 Type 2 + ISO 27001:2022 certified)
- No US cloud providers (AWS/GCP/Azure) unless they have EU-only data residency + C5
- Data processing must stay within approved jurisdictions

### 1.3 BSI C5 Certification

The **Cloud Computing Compliance Controls Catalog (C5)** is Germany's gold standard for cloud security:

**C5 vs ISO 27001:**
| Aspect | ISO 27001 | BSI C5 |
|--------|-----------|--------|
| Scope | Information security management | Cloud-specific security controls |
| Audit Type | Certification (3-year) | Attestation (annual) |
| Germany | Respected | **Legally required** (healthcare) |
| Cost | €10-50K | €50-150K (more rigorous) |

**PflegeAI Strategy:**
1. **Infrastructure:** Use Hetzner (already C5 Type 2 certified) — we inherit their attestation
2. **Application:** Build security controls that satisfy C5 criteria
3. **Optional:** Pursue own C5 attestation in Year 2 if selling to GKV/DiGA-adjacent markets

### 1.4 MDR / EU AI Act (Reminder)

As documented in `/research/REGULATORY_ANALYSIS.md`:
- AI with clinical decision support → **Class IIa minimum** under MDR
- PflegeAI's priority scoring may qualify as MDSW (Medical Device Software)
- Strategy: MVP with "AI suggestions" (non-MDSW), parallel certification path

---

## 2. Technical Security Requirements

### 2.1 Encryption Standards

**Data at Rest:**
| Component | Encryption | Standard |
|-----------|------------|----------|
| Database (PostgreSQL) | AES-256 | Hetzner volume encryption |
| Audio Files (S3) | AES-256-GCM | Server-side encryption |
| Backups | AES-256 | Encrypted before transfer |
| Application Secrets | Vault/Sealed Secrets | Zero plaintext storage |

**Data in Transit:**
| Connection | Protocol | Configuration |
|------------|----------|---------------|
| API ↔ Client | TLS 1.3 | HSTS, Forward Secrecy |
| Watch ↔ Phone | BLE (encrypted) | Bonded pairing |
| Phone ↔ Backend | TLS 1.3 | Certificate pinning |
| Backend ↔ Database | TLS 1.3 | Internal mTLS |

**Key Management:**
- Hetzner manages infrastructure encryption keys
- Application-level keys in HashiCorp Vault or Kubernetes Secrets (encrypted etcd)
- Key rotation: 90 days (automated)
- No hardcoded secrets in code repositories

### 2.2 Authentication & Access Control

**User Authentication:**
| Method | Use Case |
|--------|----------|
| Password + TOTP (2FA) | Facility admin dashboard |
| Biometric (fingerprint) | Caregiver mobile app (optional) |
| Device binding | Smartwatch pairing to resident |

**Authorization Model:**
- **RBAC (Role-Based Access Control)** with granular permissions
- Roles: Super Admin, Facility Admin, PDL, Caregiver, Read-Only
- PostgreSQL **Row-Level Security (RLS)** enforces tenant isolation
- API tokens scoped to facility_id

**Session Security:**
- JWT tokens with 1-hour expiry (configurable)
- Refresh tokens stored securely, rotated on use
- Session termination on role change or account deactivation

### 2.3 Network Security

**Hetzner Cloud Setup:**
```
┌─────────────────────────────────────────────────────┐
│  Hetzner VPC (Private Network)                      │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │  Load Balancer  │  │  Firewall       │          │
│  │  (TLS termination)│  │  (allowlist)   │          │
│  └────────┬────────┘  └────────┬────────┘          │
│           │                     │                   │
│  ┌────────▼────────┐  ┌────────▼────────┐          │
│  │  App Servers    │  │  Database       │          │
│  │  (no public IP) │  │  (internal only)│          │
│  └─────────────────┘  └─────────────────┘          │
│                                                     │
│  All traffic: Internal VPC (no public exposure)    │
└─────────────────────────────────────────────────────┘
```

**Firewall Rules:**
- Database: Internal VPC only (no internet access)
- App servers: Load balancer only (no direct access)
- SSH: Bastion host with IP allowlist
- All outbound: Restricted to known services (AI APIs, push notifications)

### 2.4 Application Security (DiGA-Inspired)

Even though PflegeAI is not a DiGA, we implement BSI TR-03161 best practices:

**Mobile App Hardening:**
- ✅ Root/Jailbreak detection (refuse to run)
- ✅ Certificate pinning (prevent MITM)
- ✅ Code obfuscation (ProGuard/R8 for Android)
- ✅ Tamper detection (integrity checks)
- ✅ Secure storage (Android Keystore, iOS Keychain)

**Backend Security:**
- ✅ Input validation (all endpoints)
- ✅ SQL injection prevention (parameterized queries, ORM)
- ✅ Rate limiting (per IP, per user)
- ✅ OWASP Top 10 coverage
- ✅ Dependency scanning (Snyk, Dependabot)

---

## 3. DSGVO Implementation (TOMs)

### 3.1 Technisch-Organisatorische Maßnahmen (TOMs)

Required under Art. 32 DSGVO:

**Zutrittskontrolle (Physical Access):**
- Hetzner data centers: ISO 27001 certified, 24/7 security, biometric access
- PflegeAI has no physical infrastructure (cloud-native)

**Zugangskontrolle (System Access):**
- Multi-factor authentication mandatory
- Password policy: 12+ characters, complexity requirements
- Account lockout after 5 failed attempts
- Session timeout: 30 minutes (configurable per facility)

**Zugriffskontrolle (Data Access):**
- Role-based access control (RBAC)
- Row-Level Security (RLS) for multi-tenancy
- Audit logging of all data access
- Least privilege principle

**Weitergabekontrolle (Transfer Control):**
- TLS 1.3 for all data in transit
- No data transfer outside EU/EEA
- Encryption for all backups

**Eingabekontrolle (Input Control):**
- Immutable audit_log table (who changed what, when)
- All API requests logged with user_id, timestamp, IP
- Resident consent tracked in database

**Verfügbarkeitskontrolle (Availability):**
- Hetzner: 99.9% SLA
- Daily backups, 30-day retention
- Disaster recovery: Cross-region replication (optional)
- Incident response plan documented

**Trennungskontrolle (Separation):**
- Tenant isolation via RLS (facility_id)
- Separate database schemas per major customer (optional)
- Test/Production environments fully separated

### 3.2 Datenschutzbeauftragter (DSB)

**Requirement:** Mandatory under Art. 37 DSGVO for:
- Processing of health data as core activity ✅
- >20 employees with automated data processing

**PflegeAI Options:**
| Option | Cost | Recommendation |
|--------|------|----------------|
| Internal DSB | €0 (existing employee) | Only if qualified |
| External DSB | €200-500/month | **Recommended for MVP** |
| Combined with Legal | Varies | Common in startups |

**Action Item:** Engage external DSB before pilot launch (€2-6K/year)

### 3.3 Auftragsverarbeitungsvertrag (AVV)

**Mandatory** contract between PflegeAI (Auftragsverarbeiter) and facility (Verantwortlicher):

**Required Contents (Art. 28 DSGVO):**
- Subject and duration of processing
- Nature and purpose of processing
- Types of personal data
- Categories of data subjects
- Rights and obligations of controller
- Sub-processor list (with approval process)
- Technical and organizational measures
- Data deletion/return obligations

**PflegeAI Implementation:**
- Standard AVV template (reviewed by legal)
- Part of customer onboarding process
- Sub-processors disclosed: Hetzner, OpenAI (if used for AI)

### 3.4 Datenschutz-Folgenabschätzung (DSFA/DPIA)

**Mandatory** for PflegeAI under Art. 35(3)(b) DSGVO:
> "Processing on a large scale of special categories of data"

**DSFA Contents:**
1. Systematic description of processing operations
2. Assessment of necessity and proportionality
3. Assessment of risks to data subjects
4. Measures to address risks
5. Consultation with DSB

**Timeline:** Complete before production launch
**Cost:** €3-10K if outsourced, or internal effort

---

## 4. Data Handling Specifics

### 4.1 Voice Recordings (Audio Data)

**Processing Flow:**
```
Resident speaks → Smartwatch records → Phone uploads → Server processes → Transcription → AI analysis → Delete audio
```

**Data Minimization:**
- Audio stored only temporarily (max 24 hours by default)
- Configurable retention per facility (legal requirements may vary)
- Transcription stored, audio deleted after processing
- Option: Real-time streaming (no audio storage)

**Consent Tracking:**
- Per-resident consent flag in database
- Consent timestamp and version recorded
- Easy withdrawal mechanism (resident or legal guardian)

### 4.2 Health Information

**What Qualifies as Gesundheitsdaten:**
- Resident's care needs (Pflegestufe)
- Medical conditions mentioned in requests
- Medication requests
- Pain/discomfort reports
- Fall incidents

**Protection Measures:**
- Encryption at rest and in transit
- Access limited to assigned caregivers
- No sharing with third parties (except emergency services if configured)
- Anonymization for analytics (aggregate data only)

### 4.3 Data Retention

| Data Type | Retention | Legal Basis |
|-----------|-----------|-------------|
| Voice recordings | 24h-30d (configurable) | Minimization principle |
| Transcriptions | 10 years | Pflegedokumentation (SGB XI) |
| Request history | 10 years | Documentation requirements |
| Audit logs | 10 years | Compliance evidence |
| User accounts | Duration of employment | Contractual necessity |

**Deletion Process:**
- Automated cleanup jobs (cron)
- GDPR erasure endpoint for "right to be forgotten"
- Anonymization instead of deletion where legally required

---

## 5. Certifications Roadmap

### 5.1 Mandatory (Before Launch)

| Requirement | Cost | Timeline | Owner |
|-------------|------|----------|-------|
| DSFA (DPIA) | €3-10K | 1 month | DSB |
| AVV Template | €2-5K | 2 weeks | Legal |
| External DSB | €2-6K/year | Ongoing | Operations |
| TOMs Documentation | Internal | 2 weeks | CTO |

### 5.2 Recommended (Year 1)

| Certification | Cost | Timeline | ROI |
|---------------|------|----------|-----|
| **ISO 27001:2022** | €15-40K | 6-12 months | Required by enterprise buyers |
| TISAX (if automotive adjacent) | €10-25K | 4-8 months | Not relevant for nursing |

### 5.3 Optional (Year 2+)

| Certification | Cost | Timeline | When Needed |
|---------------|------|----------|-------------|
| BSI C5 (own attestation) | €50-150K | 6-12 months | GKV integration, DiGA-adjacent |
| MDR Class IIa | €60-100K | 12-18 months | Clinical decision support features |

### 5.4 ISO 27001 Cost Breakdown (2025/2026)

Based on current market data for SaaS startups:

| Phase | Cost Range | Notes |
|-------|------------|-------|
| Gap Assessment | €2-5K | Initial evaluation |
| Documentation | €1-8K | Policies, procedures |
| Implementation | €1-10K | Technical controls |
| Internal Audit | €1-6K | Pre-certification |
| Certification Audit | €4-12K | External auditor |
| **Total Initial** | **€10-40K** | |
| Annual Surveillance | €2-6K | Ongoing |

**Accelerators:**
- Vanta/Drata: €8-15K/year — automates evidence collection, speeds certification
- vCISO service: €2-5K/month — expertise on demand

---

## 6. Vendor Security (Sub-Processors)

### 6.1 Hetzner Cloud (Infrastructure)

| Certification | Status |
|---------------|--------|
| ISO 27001:2022 | ✅ Certified |
| BSI C5 Type 2 | ✅ Certified |
| KRITIS (Critical Infrastructure) | ✅ Certified |
| PCI DSS 4.0 | ✅ Certified |
| Data Location | 🇩🇪 Germany only |

**Why Hetzner:**
- Only €360-660/month for MVP
- 70% cheaper than AWS/GCP/Azure
- Already has all required German healthcare certifications
- Data never leaves Germany

### 6.2 AI Providers

| Provider | Data Location | DSGVO | Recommendation |
|----------|---------------|-------|----------------|
| OpenAI (Whisper API) | US (EU coming) | DPA available | MVP only |
| OpenAI (GPT-4) | US | DPA available | MVP, monitor EU region |
| AssemblyAI | US + EU | EU option | Consider for STT |
| Self-hosted Whisper | On Hetzner | ✅ Full control | Production target |
| Anthropic (Claude) | US | DPA available | Alternative LLM |

**Strategy:**
1. **MVP:** Use OpenAI APIs with DPA (standard contractual clauses)
2. **Scale:** Self-host Whisper on Hetzner (full DSGVO compliance)
3. **LLM:** Evaluate EU-hosted options or local models (Llama 3, Mistral)

### 6.3 Push Notifications

| Provider | Requirement | Notes |
|----------|-------------|-------|
| Firebase Cloud Messaging (FCM) | Required for Android | Google DPA |
| Apple Push Notification Service (APNs) | Required for iOS | Apple DPA |

**Mitigation:**
- Push notification content is minimal ("New request from Room 12")
- No health data in push payload
- Full details only after authentication in app

---

## 7. Incident Response

### 7.1 Breach Notification (Art. 33/34 DSGVO)

**Timeline:**
- 72 hours: Notify Datenschutzbehörde
- Without undue delay: Notify affected data subjects (if high risk)

**Incident Response Plan:**
1. Detection → Containment → Eradication → Recovery → Lessons Learned
2. Documented playbook for common scenarios
3. Contact list: DSB, Legal, Management, Authorities
4. Annual tabletop exercises

### 7.2 Monitoring & Alerting

- Centralized logging (ELK stack or Grafana Loki)
- SIEM integration (Wazuh, optional)
- Anomaly detection: Unusual access patterns
- 24/7 alerting for critical security events

---

## 8. Security as Sales Enabler

### 8.1 Buyer Questions We Must Answer

Every German healthcare buyer (Pflegeheim, Träger) will ask:

| Question | PflegeAI Answer |
|----------|-----------------|
| "Sind Sie DSGVO-konform?" | Ja, mit DSFA, AVV, externem DSB |
| "Wo liegen die Daten?" | Deutschland (Hetzner, BSI C5 zertifiziert) |
| "Haben Sie ISO 27001?" | In Vorbereitung (6-12 Monate) / Ja (after cert) |
| "Wie ist die Verschlüsselung?" | AES-256 at rest, TLS 1.3 in transit |
| "Können wir den AVV sehen?" | Ja, Standard-AVV Teil des Onboardings |

### 8.2 Competitive Positioning vs VOIZE

VOIZE is likely ISO 27001 certified and DSGVO compliant (as a $50M company with YC backing). PflegeAI must match this baseline.

**Differentiator Opportunity:**
- Hetzner-hosted (DE-only) vs AWS/cloud-agnostic
- Explicit C5 compliance via Hetzner
- Transparent security documentation (builds trust with privacy-conscious German buyers)

---

## 9. Budget Summary

### 9.1 Year 1 Security Costs

| Item | Cost | Priority |
|------|------|----------|
| External DSB | €3-6K/year | P0 (mandatory) |
| DSFA (DPIA) | €3-10K | P0 (mandatory) |
| AVV Template (Legal) | €2-5K | P0 (mandatory) |
| TOMs Documentation | Internal | P0 (mandatory) |
| **Subtotal Mandatory** | **€8-21K** | |
| ISO 27001 (if Year 1) | €15-40K | P1 (recommended) |
| Compliance Platform (Vanta) | €8-15K | P2 (accelerator) |
| Penetration Test | €5-15K | P1 (before launch) |
| **Total Year 1** | **€36-91K** | |

### 9.2 Lean Path (Minimum Viable Compliance)

| Item | Cost |
|------|------|
| External DSB (basic) | €3K |
| DSFA (internal) | €0 (time) |
| AVV (template + legal review) | €2K |
| Penetration Test (basic) | €5K |
| **Total Lean** | **€10K** |

---

## 10. Action Items

### Immediate (Before Pilot)
- [ ] Engage external Datenschutzbeauftragter (DSB)
- [ ] Draft Einwilligungserklärung (resident consent form)
- [ ] Complete Verarbeitungsverzeichnis (Art. 30)
- [ ] Create standard AVV template
- [ ] Document TOMs

### Before Production Launch
- [ ] Complete DSFA (DPIA)
- [ ] Conduct basic penetration test
- [ ] Implement audit logging
- [ ] Set up incident response process
- [ ] Train team on data handling procedures

### Year 1
- [ ] Begin ISO 27001 certification process
- [ ] Evaluate self-hosted STT (Whisper on Hetzner)
- [ ] Implement security monitoring/SIEM
- [ ] Annual security audit

---

## Appendix: Key Legal References

- **DSGVO Art. 9:** Processing of special categories of data
- **DSGVO Art. 28:** Processor obligations (AVV)
- **DSGVO Art. 30:** Records of processing activities
- **DSGVO Art. 32:** Security of processing (TOMs)
- **DSGVO Art. 33/34:** Breach notification
- **DSGVO Art. 35:** Data protection impact assessment
- **§393 SGB V:** Cloud use in healthcare
- **BSI C5 Katalog:** Cloud Computing Compliance Controls Catalog
- **BSI TR-03161:** Security Requirements for Digital Health Applications

---

## Summary

**Investor Pitch Point:**
> "Security and DSGVO compliance are table stakes in German healthcare. PflegeAI is built on BSI C5 certified infrastructure (Hetzner), with privacy by design. We're pursuing ISO 27001 certification in Year 1. Our architecture ensures health data never leaves Germany — this is a sales enabler, not a cost center."

**Bottom Line:**
- Mandatory compliance: €8-21K
- Recommended (with ISO 27001): €36-91K
- Timeline: MVP-ready in 4-6 weeks, ISO 27001 in 6-12 months
- Hetzner = strategic advantage (already certified, German, cheap)
