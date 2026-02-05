# PflegeAI System Architecture

*Technical Design: Smartwatch ↔ Backend ↔ Caregiver App*

---

## Executive Summary

PflegeAI's architecture is designed for **three core requirements**:
1. **Real-time voice communication** from residents to caregivers
2. **AI-powered prioritization** of requests
3. **DSGVO/GDPR compliance** with German healthcare data regulations

**Key Design Decisions:**
- Hybrid edge + cloud processing (offline-capable)
- German-hosted infrastructure (Hetzner)
- WebSocket-based real-time communication
- Multi-tenant SaaS architecture

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RESIDENT LAYER                                     │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │ Smartwatch  │ ───────▶│ Companion   │ ───────▶│   Gateway   │            │
│  │ (Wear OS /  │  BLE    │ Phone/Tablet│  WiFi   │   (Facility │            │
│  │ Apple Watch)│         │             │         │    Router)  │            │
│  └─────────────┘         └─────────────┘         └─────────────┘            │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │ HTTPS / WSS
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLOUD BACKEND (Hetzner Germany)                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         API Gateway (Kong/Nginx)                        ││
│  │                         Rate Limiting / Auth / SSL                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│         │                        │                        │                  │
│         ▼                        ▼                        ▼                  │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │   Voice     │         │    Core     │         │   Caregiver │            │
│  │   Service   │ ──────▶ │    API      │ ◀────── │   Service   │            │
│  │  (STT/LLM)  │         │  (FastAPI)  │         │  (Push/WS)  │            │
│  └─────────────┘         └─────────────┘         └─────────────┘            │
│         │                        │                        │                  │
│         └────────────────────────┼────────────────────────┘                  │
│                                  ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    PostgreSQL (Primary DB)                              ││
│  │                    Redis (Cache, Pub/Sub, Sessions)                     ││
│  │                    S3-Compatible Storage (Audio files)                  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAREGIVER LAYER                                    │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │   Mobile    │         │   PWA /     │         │   Desktop   │            │
│  │   App       │         │   Web App   │         │   Dashboard │            │
│  │ (iOS/Andr.) │         │             │         │             │            │
│  └─────────────┘         └─────────────┘         └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Deep-Dive

### 1. Smartwatch Layer

**Platform Support:**
| Platform | Priority | SDK | Constraints |
|----------|----------|-----|-------------|
| **Wear OS 4+** | Primary | Android Wear SDK | Voice recording via Mic API, BLE to phone required |
| **Apple Watch** | Secondary | WatchKit | Voice recording via AVAudioRecorder, requires companion iPhone |

**Smartwatch App Features:**
- **Single-button activation** (large, accessible UI for elderly)
- **Voice recording** (max 30 seconds per request)
- **Offline buffering** (stores requests if disconnected)
- **Haptic/visual confirmation** (recording started, sent successfully)
- **Battery-optimized** (no background polling, push-to-talk model)

**Technical Implementation:**
```kotlin
// Wear OS - Voice Recording (simplified)
class VoiceRecorder {
    private val mediaRecorder = MediaRecorder()
    
    fun startRecording() {
        mediaRecorder.apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.AAC_ADTS)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setAudioSamplingRate(16000)  // Optimal for speech
            setAudioEncodingBitRate(64000)
        }
    }
    
    fun stopAndSend() {
        // Compress and queue for BLE transfer to companion phone
    }
}
```

**Companion Phone/Tablet:**
- **Purpose:** Bridge between smartwatch (BLE) and cloud (WiFi/LTE)
- **Location:** Charging station in resident's room
- **Features:** Offline queue, audio compression, retry logic
- **Alternative:** Facility WiFi gateway for direct watch→cloud (Phase 2)

---

### 2. Voice Processing Service

**Architecture Pattern:** Event-driven microservice

```
Audio Upload → Message Queue → STT Worker → LLM Worker → Priority Score → Database
                (RabbitMQ)      (Whisper)    (GPT-4)       (0-10)
```

**Speech-to-Text (STT) Options:**

| Option | Latency | Cost | DSGVO | Notes |
|--------|---------|------|-------|-------|
| **OpenAI Whisper API** | 2-5s | €0.006/min | ⚠️ US | Fast, accurate, German dialects |
| **Self-hosted Whisper** | 3-8s | €0.001/min | ✅ DE | Requires GPU (A10G ~€500/mo) |
| **Azure Speech (EU)** | 1-3s | €0.013/min | ✅ EU | Microsoft EU datacenter |
| **Deepgram (EU)** | <1s | €0.008/min | ✅ EU | Fastest, streaming support |

**Recommendation (MVP):** OpenAI Whisper API with AVV contract (Standard Contractual Clauses for DSGVO compliance). Migrate to self-hosted or EU-native provider for MDR certification.

**LLM for Prioritization:**

```python
# Priority Classification Prompt
PRIORITY_PROMPT = """
Du bist ein KI-Assistent in einem Pflegeheim. Analysiere die folgende 
Bewohneranfrage und bewerte sie auf einer Skala von 1-10:

1-3: Niedrig (Wunsch, keine Eile) - z.B. "Könnte ich später ein Glas Wasser bekommen?"
4-6: Mittel (Bedarf, zeitnah) - z.B. "Ich muss zur Toilette"
7-8: Hoch (Dringend) - z.B. "Mir ist schwindelig"
9-10: Notfall (Sofort) - z.B. "Ich kann nicht atmen", Sturz-Anzeichen

Anfrage: {transcript}

Antworte im JSON-Format:
{
    "priority": <1-10>,
    "category": "medical|comfort|assistance|emergency",
    "summary_de": "<1 Satz Zusammenfassung>",
    "recommended_action": "<Empfohlene Maßnahme>"
}
"""
```

**Processing Pipeline:**

```python
async def process_voice_request(audio_file: bytes, resident_id: str):
    # 1. Speech-to-Text
    transcript = await whisper_transcribe(audio_file, language="de")
    
    # 2. AI Prioritization
    analysis = await llm_analyze(transcript, prompt=PRIORITY_PROMPT)
    
    # 3. Store Request
    request = await db.create_request(
        resident_id=resident_id,
        transcript=transcript,
        priority=analysis["priority"],
        category=analysis["category"],
        summary=analysis["summary_de"],
        audio_url=await storage.upload(audio_file),
        status="pending"
    )
    
    # 4. Push to Caregivers
    facility_id = await db.get_resident_facility(resident_id)
    caregivers = await db.get_on_duty_caregivers(facility_id)
    
    await push_service.notify(
        caregivers=caregivers,
        request=request,
        urgency="high" if analysis["priority"] >= 7 else "normal"
    )
    
    return request
```

---

### 3. Core API Service

**Technology Stack:**
- **Framework:** FastAPI (Python) - async, fast, OpenAPI docs
- **Database:** PostgreSQL 15 (with Row-Level Security for multi-tenancy)
- **Cache:** Redis (sessions, real-time presence, pub/sub)
- **Queue:** RabbitMQ (voice processing jobs)
- **Storage:** MinIO (S3-compatible, self-hosted) or Hetzner Object Storage

**API Endpoints (Core):**

```yaml
# Resident/Watch Endpoints
POST /api/v1/requests/voice          # Upload voice recording
GET  /api/v1/residents/{id}/requests # Get resident's request history

# Caregiver Endpoints
GET  /api/v1/requests                # List open requests (filtered by facility)
PATCH /api/v1/requests/{id}          # Update status (accepted, completed)
WS   /api/v1/ws/caregiver            # Real-time request stream

# Facility Management
GET  /api/v1/facilities/{id}/residents
GET  /api/v1/facilities/{id}/caregivers
GET  /api/v1/facilities/{id}/analytics

# Admin/Multi-Tenant
POST /api/v1/facilities              # Create new facility (onboarding)
GET  /api/v1/facilities              # List all facilities (admin only)
```

**Multi-Tenancy Model:**

```sql
-- PostgreSQL Row-Level Security
CREATE POLICY facility_isolation ON requests
    USING (facility_id = current_setting('app.current_facility')::uuid);

-- Every query automatically filtered by facility
SET app.current_facility = 'uuid-of-facility';
SELECT * FROM requests;  -- Only returns this facility's data
```

---

### 4. Real-Time Communication

**WebSocket Architecture:**

```
Caregiver App → WebSocket → API Gateway → Redis Pub/Sub → All Subscribers
                                               ↑
                              Voice Service publishes new requests
```

**Message Types:**

```typescript
// Server → Client messages
type ServerMessage =
    | { type: "new_request"; data: Request }
    | { type: "request_updated"; data: Request }
    | { type: "request_claimed"; data: { requestId: string; claimedBy: string } }
    | { type: "presence"; data: { onlineCaregivers: string[] } }

// Client → Server messages
type ClientMessage =
    | { type: "claim_request"; requestId: string }
    | { type: "update_status"; requestId: string; status: Status }
    | { type: "ping" }
```

**Push Notifications (Mobile):**

| Platform | Service | Priority Levels |
|----------|---------|-----------------|
| iOS | APNs (Apple Push) | .critical (emergency), .timeSensitive, .passive |
| Android | FCM (Firebase) | HIGH (heads-up), NORMAL (tray) |

**Emergency Escalation:**

```python
async def escalate_if_unhandled(request_id: str, delay_seconds: int = 300):
    """Escalate to supervisor if no caregiver responds in 5 minutes"""
    await asyncio.sleep(delay_seconds)
    
    request = await db.get_request(request_id)
    if request.status == "pending":
        # Send to shift supervisor
        supervisor = await db.get_on_duty_supervisor(request.facility_id)
        await push_service.notify_urgent(
            supervisor,
            f"UNBEANTWORTET: {request.summary}"
        )
        
        # Also send audible alarm to nursing station
        await facility_alarm.trigger(request.facility_id, request_id)
```

---

### 5. Caregiver Mobile App

**Technology Choice:**
- **Primary:** React Native (cross-platform, 80% code sharing)
- **Alternative:** Flutter (better performance, larger bundle size)

**Key Screens:**

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Request Feed   │     │  Request Detail  │     │    Resident      │
│                  │     │                  │     │    Profile       │
│ 🔴 HOCH (2)      │     │ Frau Müller, 84  │     │                  │
│ ─────────────    │     │ Zimmer 204       │     │ Diagnosen:       │
│ Frau Müller      │ ──▶ │                  │ ──▶ │ - Diabetes       │
│ "Mir ist..."     │     │ 🎧 Audio abspielen│     │ - Demenz (leicht)│
│ 2 Min ago        │     │                  │     │                  │
│                  │     │ KI-Zusammenfassung│     │ Kontakte:        │
│ 🟡 MITTEL (5)    │     │ "Schwindel und   │     │ Sohn: 0176...    │
│ ─────────────    │     │  Übelkeit seit   │     │                  │
│ Herr Schmidt     │     │  heute morgen"   │     │ Letzte Anfragen: │
│ "Könnte ich..."  │     │                  │     │ - 14:23 Toilette │
│ 8 Min ago        │     │ [Annehmen]       │     │ - 09:15 Wasser   │
│                  │     │ [An Kolleg:in]   │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Offline Capability:**
- SQLite local database for request cache
- Optimistic UI updates
- Background sync when connectivity restored

---

### 6. Security & DSGVO Architecture

**Data Protection by Design:**

| Requirement | Implementation |
|-------------|----------------|
| **Encryption at rest** | AES-256 for database, audio files |
| **Encryption in transit** | TLS 1.3 minimum |
| **Access control** | JWT + RBAC (role-based access) |
| **Audit logging** | All data access logged with user, timestamp, IP |
| **Data minimization** | Audio deleted after 30 days (configurable) |
| **Right to erasure** | Automated deletion workflows |
| **Data residency** | All data in Germany (Hetzner Falkenstein/Nuremberg) |

**Authentication Flow:**

```
Caregiver Login → Facility SSO (optional) → JWT issued → Token stored securely
                         ↓
                    OR email/password with 2FA (TOTP)
```

**Smartwatch Authentication:**

```
Smartwatch → Companion Phone → PIN entry → Device registered with facility
                                    ↓
                              Resident ID linked to device
```

**DSGVO Compliance Checklist:**
- [ ] Verzeichnis von Verarbeitungstätigkeiten (VVT)
- [ ] Datenschutz-Folgenabschätzung (DSFA)
- [ ] Auftragsverarbeitungsvertrag (AVV) mit allen Dienstleistern
- [ ] Einwilligung/Rechtsgrundlage dokumentiert
- [ ] Technische und organisatorische Maßnahmen (TOMs)

---

## Infrastructure & Hosting

**Recommended: Hetzner Cloud (Germany)**

| Component | Specification | Monthly Cost |
|-----------|---------------|--------------|
| **API Servers** | 2x CX41 (8 vCPU, 16GB) | €28 x 2 = €56 |
| **Database** | CX31 (4 vCPU, 8GB) + Managed Postgres | €80 |
| **Redis** | CX21 (2 vCPU, 4GB) | €6 |
| **Load Balancer** | LB11 | €6 |
| **Object Storage** | 500GB | €12 |
| **GPU (Whisper)** | External or Azure GPU | €200-500 |
| **Total MVP** | | **€360-660/month** |

**Why Hetzner?**
- ✅ 100% German-owned, data centers in Germany
- ✅ DSGVO-compliant by default
- ✅ 70-80% cheaper than AWS/Azure/GCP
- ✅ No US CLOUD Act jurisdiction concerns
- ✅ C5 certification (BSI cloud security standard)

**Alternative (MDR Certification Phase):**
- Telekom Healthcare Cloud (certified for medical devices)
- AWS Frankfurt with BAA/AVV (expensive but established)

---

## Development Phases

### Phase 1: MVP (Month 1-3) — €20-30K
- Wear OS app (single button → voice → upload)
- Basic API (voice upload, transcription, push notification)
- Simple caregiver web app (PWA)
- Single facility (pilot partner)
- OpenAI Whisper API (fastest to market)

### Phase 2: Multi-Tenant SaaS (Month 4-6) — €40-60K
- Full multi-tenant architecture
- Caregiver mobile app (React Native)
- Admin dashboard (facility management)
- Analytics & reporting
- Apple Watch support

### Phase 3: MDR Certification (Month 6-18) — €80-120K
- Self-hosted AI infrastructure (EU data residency proof)
- Full audit trails and compliance documentation
- Integration with existing Pflegesoftware (HL7 FHIR)
- Notified Body certification process

---

## Technology Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Smartwatch** | Wear OS (Kotlin), watchOS (Swift) | Market reach, voice API access |
| **Companion App** | React Native | Code sharing with caregiver app |
| **Backend** | FastAPI (Python) | Fast dev, async, AI ecosystem |
| **Database** | PostgreSQL + Redis | Proven, RLS for multi-tenancy |
| **STT** | OpenAI Whisper → self-hosted | Speed (API) → compliance (self-hosted) |
| **LLM** | GPT-4 / Claude → fine-tuned | Accuracy → cost optimization |
| **Real-time** | WebSocket + Redis Pub/Sub | Low latency, scalable |
| **Mobile** | React Native | iOS + Android from one codebase |
| **Hosting** | Hetzner Cloud (Germany) | DSGVO, cost, performance |

---

## Competitive Technical Comparison

| Capability | VOIZE | PflegeAI |
|------------|-------|----------|
| **Direction** | Nurse → System | **Bidirectional** (Resident ↔ Nurse) |
| **Input** | Smartphone only | **Smartwatch** + Smartphone |
| **Real-time** | No | **Yes** (WebSocket, push) |
| **AI Prioritization** | No | **Yes** (1-10 score, auto-escalation) |
| **Offline** | Yes (local STT) | Yes (buffered upload) |
| **MDR Certified** | Yes (Class IIa) | Target: Yes (Phase 3) |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Smartwatch battery drain** | Push-to-talk model, no background processes |
| **Voice recognition fails** | Fallback to audio playback for caregiver |
| **Network outage** | Local buffering, offline queue, retry |
| **False emergency** | Caregiver confirmation before escalation |
| **DSGVO audit** | Pre-built audit log exports, DPA on file |

---

## Next Steps

1. **Week 1:** Set up Hetzner infrastructure, basic API skeleton
2. **Week 2:** Wear OS prototype (voice recording → upload)
3. **Week 3:** Voice processing pipeline (Whisper + GPT-4)
4. **Week 4:** Caregiver PWA (request list, push notifications)
5. **Week 5-6:** Integration testing with pilot partner
6. **Month 2-3:** Iterate based on feedback, prepare for demo

---

## Appendix: API Contracts

See `/docs/API_SPECIFICATION.md` (to be created)

---

*Document Version: 1.0*
*Created: 2026-02-06*
*Author: PflegeAI Technical Team*
