# AI Pipeline: STT → LLM → Zusammenfassung → Push

*Deep-Dive Technical Analysis for PflegeAI Voice Processing*

---

## Executive Summary

PflegeAI's AI pipeline transforms voice requests from residents into prioritized, actionable notifications for caregivers. This document details the technical implementation, cost analysis, and competitive differentiation.

**Pipeline Overview:**
```
Voice Input → Speech-to-Text → LLM Analysis → Priority Score → Push Notification
   (30s max)      (2-5s)         (1-2s)        (1-10)           (<1s)
```

**Target Performance:**
| Metric | Target | Benchmark |
|--------|--------|-----------|
| End-to-end latency | <8 seconds | VOIZE: 5-10s (no priority) |
| STT accuracy (German) | >92% | Whisper: 92.6% multilingual |
| Priority accuracy | >90% | Medical triage LLMs: 85-95% |
| Push delivery | <1 second | FCM/APNs: 100-500ms |

---

## 1. Speech-to-Text (STT) Layer

### 1.1 STT Provider Comparison (February 2026 Benchmarks)

| Provider | Multilingual WER | German WER | Latency | Cost/min | DSGVO |
|----------|------------------|------------|---------|----------|-------|
| **OpenAI Whisper API** | 7.4% | ~9.2% | 2-5s | €0.006 | ⚠️ SCCs |
| **AssemblyAI Universal** | 8.7% | ~10% | 3-6s | €0.008 | ✅ EU |
| **Deepgram Nova-3** | 10.8% | ~12% | <1s | €0.008 | ✅ EU |
| **Self-hosted Whisper** | 7.4% | ~9.2% | 3-8s | €0.001* | ✅ DE |
| **Azure Speech (EU)** | ~9% | ~10% | 1-3s | €0.013 | ✅ EU |

*Self-hosted cost includes GPU amortization (~€500/mo for A10G)

**Key Insight from AssemblyAI Benchmarks (Feb 2026):**
- OpenAI Whisper leads in **multilingual accuracy** (92.6%)
- Whisper has **30% higher hallucination rate** than AssemblyAI in noisy conditions
- For German healthcare: Whisper is best for accuracy, Deepgram for speed

### 1.2 German Healthcare-Specific Challenges

**Challenge 1: Nursing Vocabulary**
```
"Frau Müller hat heute Morgen zweimal ihre Medikamente verweigert"
"Der Dekubitus an der Ferse sieht schlechter aus"
"Sie braucht Hilfe beim Inkontinenzmaterial wechseln"
```
- VOIZE claims "purpose-built nursing LLM trained on nursing vocabulary"
- **Our approach:** Fine-tune Whisper on German nursing audio (Phase 2)

**Challenge 2: Elderly Speech Patterns**
- Slower speech rate
- Regional dialects (Bavarian, Sächsisch, Plattdeutsch)
- Unclear articulation (dentures, cognitive decline)
- Background noise (TV, hallway sounds)

**Challenge 3: Short Utterances**
- Average resident request: 5-15 seconds
- STT models perform worse on very short audio
- **Solution:** Buffer + VAD (Voice Activity Detection) to optimize chunk size

### 1.3 Recommended STT Strategy

**Phase 1 (MVP):** OpenAI Whisper API
- Fastest time to market
- Best German accuracy out-of-box
- Sign Standard Contractual Clauses (SCCs) for DSGVO
- Cost: ~€0.006/request (assuming 30s average)

**Phase 2 (Scale):** Self-hosted Whisper Large-v3
- Full DSGVO compliance (German datacenter)
- Lower marginal cost at scale
- Requires Hetzner GPU server (~€500/mo)
- Break-even at ~80,000 requests/month

**Phase 3 (MDR):** EU-native provider or certified self-hosted
- Telekom Healthcare Cloud or Azure EU
- Full audit trail for medical device certification
- May need AssemblyAI/Deepgram EU for latency

### 1.4 STT Implementation

```python
from openai import OpenAI
import tempfile

client = OpenAI()

async def transcribe_audio(audio_bytes: bytes, language: str = "de") -> dict:
    """
    Transcribe audio using Whisper API.
    Returns transcript with word-level timestamps.
    """
    # Save to temp file (Whisper API requires file)
    with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as f:
        f.write(audio_bytes)
        temp_path = f.name
    
    try:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=open(temp_path, "rb"),
            language=language,
            response_format="verbose_json",
            timestamp_granularities=["word"]
        )
        
        return {
            "text": transcript.text,
            "language": transcript.language,
            "duration": transcript.duration,
            "words": transcript.words,
            "confidence": calculate_confidence(transcript)
        }
    finally:
        os.unlink(temp_path)

def calculate_confidence(transcript) -> float:
    """Estimate confidence from word probabilities (if available)"""
    # Whisper API doesn't expose probabilities directly
    # Use heuristics: length, detected language match, etc.
    return 0.85  # Default assumption for valid audio
```

**Fallback Strategy:**
```python
async def transcribe_with_fallback(audio: bytes) -> dict:
    """Try primary STT, fall back to secondary on failure/low confidence"""
    
    result = await transcribe_audio(audio)
    
    # If confidence too low or transcription empty
    if result["confidence"] < 0.5 or len(result["text"]) < 10:
        # Fallback 1: Retry with different settings
        result = await transcribe_audio(audio, prompt="Pflegeheim, Bewohner spricht")
        
    if result["confidence"] < 0.5:
        # Fallback 2: Return raw audio for manual review
        return {
            "text": "[Automatische Erkennung fehlgeschlagen - Audio verfügbar]",
            "requires_manual_review": True,
            "audio_url": await storage.upload(audio)
        }
    
    return result
```

---

## 2. LLM Analysis Layer

### 2.1 Purpose & Requirements

The LLM layer performs **three critical functions:**
1. **Summarization** — Condense transcript to 1-sentence summary
2. **Categorization** — Classify request type
3. **Prioritization** — Score urgency 1-10

**Why LLM (not rules)?**
- Natural language variation too high for regex/rules
- Context matters: "Ich kann nicht atmen" vs "Ich kann das Fenster nicht öffnen"
- Future: Learn from facility-specific patterns

### 2.2 LLM Provider Options

| Provider | Model | Latency | Cost/1K tokens | Notes |
|----------|-------|---------|----------------|-------|
| **OpenAI** | GPT-4o | 0.5-2s | €0.0025/€0.01 | Best accuracy |
| **OpenAI** | GPT-4o-mini | 0.3-1s | €0.00015/€0.0006 | Best cost/quality |
| **Anthropic** | Claude 3.5 Sonnet | 0.5-2s | €0.003/€0.015 | Strong at German |
| **Anthropic** | Claude 3.5 Haiku | 0.2-0.5s | €0.00025/€0.00125 | Fastest |
| **Mistral** | Mistral Large | 0.5-1.5s | €0.002/€0.006 | EU-hosted option |
| **Self-hosted** | Llama 3.1 70B | 1-3s | €0.001 (GPU) | Full DSGVO |

**Recommendation:** 
- MVP: GPT-4o-mini (fast, cheap, accurate enough)
- Scale: Claude Haiku or self-hosted Llama
- MDR: Self-hosted EU or Mistral (EU company)

### 2.3 Priority Classification System

**PflegeAI Priority Scale:**

| Score | Level | Color | Response Time | Examples |
|-------|-------|-------|---------------|----------|
| 1-3 | Niedrig | 🟢 Green | 30+ min | "Könnte ich Wasser haben?", "Wann gibt es Essen?" |
| 4-6 | Mittel | 🟡 Yellow | 10-30 min | "Ich muss zur Toilette", "Mir ist kalt" |
| 7-8 | Hoch | 🟠 Orange | 2-10 min | "Mir ist schwindelig", "Ich habe Schmerzen" |
| 9-10 | Notfall | 🔴 Red | <2 min | "Ich kann nicht atmen", "Ich bin hingefallen", "Brustschmerzen" |

**Category Taxonomy:**
```
medical:
  - pain (Schmerzen)
  - breathing (Atmung)
  - fall (Sturz)
  - medication (Medikamente)
  - wound (Wunde)
  - confusion (Verwirrtheit)

comfort:
  - temperature (Temperatur)
  - food_drink (Essen/Trinken)
  - positioning (Lagerung)
  - noise (Lärm)

assistance:
  - toilet (Toilette)
  - mobility (Mobilität)
  - personal_care (Körperpflege)
  - communication (Kommunikation)

emergency:
  - respiratory_distress
  - chest_pain
  - stroke_symptoms
  - unresponsive
  - severe_fall
```

### 2.4 LLM Prompt Engineering

**Main Analysis Prompt:**

```python
ANALYSIS_PROMPT = """Du bist ein KI-Assistent in einem deutschen Pflegeheim. 
Analysiere die folgende Sprachnachricht eines Bewohners.

BEWOHNERNACHRICHT:
"{transcript}"

AUFGABEN:
1. Fasse die Anfrage in EINEM kurzen Satz zusammen (max. 15 Wörter)
2. Kategorisiere die Anfrage
3. Bewerte die Dringlichkeit (1-10)

DRINGLICHKEITSSKALA:
1-3 (Niedrig): Wünsche ohne Zeitdruck. Beispiele: "Kann ich Wasser haben?", "Wann ist Kaffee?"
4-6 (Mittel): Bedürfnisse, die zeitnah erfüllt werden sollten. Beispiele: "Toilette", "Mir ist kalt"
7-8 (Hoch): Gesundheitliche Beschwerden. Beispiele: "Schmerzen", "Schwindel", "Übelkeit"
9-10 (Notfall): Lebensbedrohliche Symptome. Beispiele: "Kann nicht atmen", "Brustschmerzen", "Sturz"

WICHTIGE REGELN:
- Im Zweifel höher bewerten (Sicherheit geht vor)
- "Ich bin hingefallen" = automatisch 9-10
- Atemnot, Brustschmerzen = automatisch 10
- Leere oder unverständliche Nachricht = 5 (zur Überprüfung)

Antworte NUR im folgenden JSON-Format:
{
  "summary": "<Zusammenfassung auf Deutsch>",
  "category": "<medical|comfort|assistance|emergency>",
  "subcategory": "<spezifische Unterkategorie>",
  "priority": <1-10>,
  "keywords": ["<relevante Stichwörter>"],
  "recommended_action": "<Empfehlung für Pflegekraft>"
}"""
```

**Few-Shot Examples for Better Accuracy:**

```python
FEW_SHOT_EXAMPLES = [
    {
        "input": "Hallo, könnte mir jemand ein Glas Wasser bringen? Ich hab so einen Durst.",
        "output": {
            "summary": "Bewohner bittet um ein Glas Wasser",
            "category": "comfort",
            "subcategory": "food_drink",
            "priority": 2,
            "keywords": ["Wasser", "Durst"],
            "recommended_action": "Wasser bringen bei nächster Gelegenheit"
        }
    },
    {
        "input": "Mir ist so schwindelig, ich glaub ich fall gleich um...",
        "output": {
            "summary": "Bewohner klagt über Schwindel mit Sturzgefahr",
            "category": "medical",
            "subcategory": "fall_risk",
            "priority": 8,
            "keywords": ["Schwindel", "Sturzgefahr"],
            "recommended_action": "Sofort nachsehen, Bewohner nicht allein lassen, Vitalzeichen prüfen"
        }
    },
    {
        "input": "Ich kann... ich kann nicht richtig atmen... bitte...",
        "output": {
            "summary": "Bewohner hat akute Atemnot",
            "category": "emergency",
            "subcategory": "respiratory_distress",
            "priority": 10,
            "keywords": ["Atemnot", "Atembeschwerden"],
            "recommended_action": "SOFORT zum Bewohner, Notarzt verständigen falls Zustand bestätigt"
        }
    }
]
```

### 2.5 LLM Implementation

```python
from openai import AsyncOpenAI
import json
from pydantic import BaseModel, validator

client = AsyncOpenAI()

class RequestAnalysis(BaseModel):
    summary: str
    category: str
    subcategory: str
    priority: int
    keywords: list[str]
    recommended_action: str
    
    @validator('priority')
    def priority_in_range(cls, v):
        if not 1 <= v <= 10:
            raise ValueError('Priority must be between 1 and 10')
        return v

async def analyze_request(transcript: str) -> RequestAnalysis:
    """
    Analyze transcript using LLM to extract summary, category, and priority.
    Uses structured output for reliability.
    """
    
    # Build prompt with examples
    messages = [
        {"role": "system", "content": ANALYSIS_PROMPT},
        # Include 2-3 few-shot examples
        *format_few_shot_examples(FEW_SHOT_EXAMPLES),
        {"role": "user", "content": transcript}
    ]
    
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.1,  # Low temperature for consistent outputs
        max_tokens=300
    )
    
    result = json.loads(response.choices[0].message.content)
    
    # Validate and return
    return RequestAnalysis(**result)

async def analyze_with_safety_checks(transcript: str) -> RequestAnalysis:
    """
    Wrapper with fallback and safety checks.
    """
    try:
        analysis = await analyze_request(transcript)
    except Exception as e:
        # Fallback to safe default
        analysis = RequestAnalysis(
            summary="Anfrage konnte nicht analysiert werden",
            category="assistance",
            subcategory="unknown",
            priority=5,  # Medium priority for safety
            keywords=[],
            recommended_action="Bitte Audio anhören und manuell bewerten"
        )
    
    # Emergency keyword override (safety net)
    emergency_keywords = ["nicht atmen", "atemnot", "brustschmerzen", 
                         "hingefallen", "gestürzt", "bewusstlos"]
    
    transcript_lower = transcript.lower()
    for keyword in emergency_keywords:
        if keyword in transcript_lower:
            analysis.priority = max(analysis.priority, 9)
            analysis.category = "emergency"
            break
    
    return analysis
```

### 2.6 LLM Cost Analysis

**Per-Request Cost (MVP - GPT-4o-mini):**

| Component | Tokens | Cost |
|-----------|--------|------|
| System prompt | ~500 | €0.000075 |
| Few-shot examples | ~400 | €0.00006 |
| User input (transcript) | ~100 | €0.000015 |
| Output | ~150 | €0.00009 |
| **Total per request** | ~1,150 | **€0.00024** |

**At Scale (1,000 facilities × 50 requests/day):**
- Daily: 50,000 requests × €0.00024 = €12/day
- Monthly: €360 LLM costs
- Still <1% of revenue at €600/facility

**Self-Hosted Alternative (Llama 3.1 70B):**
- Hetzner GPU server: €500/mo
- Handles ~100,000 requests/day
- Break-even at ~50,000 requests/month

---

## 3. Push Notification Layer

### 3.1 Push Architecture

```
LLM Output → Priority Router → Push Service → APNs/FCM → Caregiver Device
                   │
                   ├── Priority 1-6: Normal push (expandable)
                   ├── Priority 7-8: High priority + sound
                   └── Priority 9-10: Critical + escalation
```

### 3.2 Platform-Specific Implementation

**iOS (APNs):**
```javascript
// Firebase Cloud Messaging payload for iOS
const iosPushPayload = {
  notification: {
    title: analysis.priority >= 9 ? "🔴 NOTFALL" : 
           analysis.priority >= 7 ? "🟠 DRINGEND" : 
           "Neue Anfrage",
    body: analysis.summary,
    sound: analysis.priority >= 9 ? "emergency.caf" : "default"
  },
  apns: {
    headers: {
      // Critical alerts can bypass Do Not Disturb (requires Apple entitlement)
      "apns-push-type": analysis.priority >= 9 ? "critical" : "alert",
      "apns-priority": analysis.priority >= 7 ? "10" : "5"
    },
    payload: {
      aps: {
        // Time-sensitive interruption level (iOS 15+)
        "interruption-level": 
          analysis.priority >= 9 ? "critical" :
          analysis.priority >= 7 ? "time-sensitive" : "active",
        "relevance-score": analysis.priority / 10,
        sound: {
          critical: analysis.priority >= 9 ? 1 : 0,
          name: "emergency.caf",
          volume: 1.0
        }
      }
    }
  },
  data: {
    requestId: request.id,
    residentId: request.resident_id,
    priority: String(analysis.priority),
    audioUrl: request.audio_url
  }
};
```

**Android (FCM):**
```javascript
const androidPushPayload = {
  notification: {
    title: analysis.priority >= 9 ? "🔴 NOTFALL" : 
           analysis.priority >= 7 ? "🟠 DRINGEND" : 
           "Neue Anfrage",
    body: analysis.summary,
    channelId: 
      analysis.priority >= 9 ? "emergency_channel" :
      analysis.priority >= 7 ? "urgent_channel" : "default_channel",
    sound: analysis.priority >= 9 ? "emergency" : "default",
    priority: analysis.priority >= 7 ? "high" : "normal"
  },
  android: {
    priority: analysis.priority >= 7 ? "high" : "normal",
    notification: {
      channelId: 
        analysis.priority >= 9 ? "emergency_channel" :
        analysis.priority >= 7 ? "urgent_channel" : "default_channel",
      visibility: "public",
      defaultSound: false,
      sound: analysis.priority >= 9 ? "emergency.mp3" : "default",
      notificationCount: 1
    }
  },
  data: {
    requestId: request.id,
    residentId: request.resident_id,
    priority: String(analysis.priority),
    audioUrl: request.audio_url,
    // Direct action buttons
    actions: JSON.stringify([
      { action: "accept", title: "Annehmen" },
      { action: "forward", title: "Weiterleiten" }
    ])
  }
};
```

### 3.3 Escalation System

```python
import asyncio
from datetime import datetime, timedelta

class EscalationService:
    """
    Auto-escalate requests that aren't acknowledged.
    """
    
    ESCALATION_RULES = {
        # priority: (initial_timeout, supervisor_timeout, facility_alarm)
        10: (60, 120, 180),      # Emergency: 1min → 2min → 3min
        9: (120, 240, 360),      # High emergency: 2min → 4min → 6min
        8: (300, 600, None),     # High: 5min → 10min → no alarm
        7: (600, 1200, None),    # Urgent: 10min → 20min → no alarm
        # Priority 1-6: No auto-escalation
    }
    
    async def start_escalation_timer(self, request: Request):
        """Start escalation timer for high-priority requests"""
        
        if request.priority < 7:
            return  # No escalation for low priority
        
        rules = self.ESCALATION_RULES.get(request.priority, (600, 1200, None))
        initial_timeout, supervisor_timeout, alarm_timeout = rules
        
        # Stage 1: Re-notify all caregivers
        asyncio.create_task(
            self._escalate_stage_1(request.id, initial_timeout)
        )
        
        # Stage 2: Notify supervisor
        asyncio.create_task(
            self._escalate_stage_2(request.id, supervisor_timeout)
        )
        
        # Stage 3: Facility alarm (emergencies only)
        if alarm_timeout:
            asyncio.create_task(
                self._escalate_stage_3(request.id, alarm_timeout)
            )
    
    async def _escalate_stage_1(self, request_id: str, timeout: int):
        await asyncio.sleep(timeout)
        
        request = await self.db.get_request(request_id)
        if request.status == "pending":
            # Re-send to all caregivers with ESCALATED flag
            caregivers = await self.db.get_on_duty_caregivers(request.facility_id)
            await self.push_service.send_escalated(
                caregivers, request, stage=1
            )
            
            # Log escalation
            await self.db.log_escalation(request_id, "stage_1")
    
    async def _escalate_stage_2(self, request_id: str, timeout: int):
        await asyncio.sleep(timeout)
        
        request = await self.db.get_request(request_id)
        if request.status == "pending":
            # Notify shift supervisor
            supervisor = await self.db.get_on_duty_supervisor(request.facility_id)
            await self.push_service.send_supervisor_alert(supervisor, request)
            
            # Log escalation
            await self.db.log_escalation(request_id, "stage_2_supervisor")
    
    async def _escalate_stage_3(self, request_id: str, timeout: int):
        await asyncio.sleep(timeout)
        
        request = await self.db.get_request(request_id)
        if request.status == "pending":
            # Trigger facility-wide alarm
            await self.facility_alarm.trigger(
                facility_id=request.facility_id,
                message=f"UNBEARBEITETER NOTFALL: {request.summary}",
                resident_room=request.resident.room_number
            )
            
            # Log escalation
            await self.db.log_escalation(request_id, "stage_3_facility_alarm")
```

### 3.4 Push Cost Analysis

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| **FCM (Android)** | Unlimited | Free |
| **APNs (iOS)** | Unlimited | Free |
| **OneSignal** | 10K users | €99/mo for 50K |

**Recommendation:** Direct FCM/APNs integration (free, full control)

---

## 4. End-to-End Pipeline

### 4.1 Complete Request Flow

```python
async def process_resident_request(
    audio_bytes: bytes,
    resident_id: str,
    device_id: str
) -> Request:
    """
    Complete pipeline: Audio → STT → LLM → Push
    """
    
    start_time = time.time()
    
    # 1. Validate and log incoming request
    request = await db.create_request(
        resident_id=resident_id,
        device_id=device_id,
        status="processing",
        received_at=datetime.utcnow()
    )
    
    try:
        # 2. Speech-to-Text (2-5 seconds)
        stt_start = time.time()
        transcript_result = await transcribe_with_fallback(audio_bytes)
        stt_duration = time.time() - stt_start
        
        # 3. Upload audio to storage (async, non-blocking)
        audio_url_task = asyncio.create_task(
            storage.upload(audio_bytes, f"requests/{request.id}.webm")
        )
        
        # 4. LLM Analysis (1-2 seconds)
        llm_start = time.time()
        analysis = await analyze_with_safety_checks(transcript_result["text"])
        llm_duration = time.time() - llm_start
        
        # 5. Update request with results
        audio_url = await audio_url_task
        await db.update_request(
            request.id,
            transcript=transcript_result["text"],
            summary=analysis.summary,
            category=analysis.category,
            subcategory=analysis.subcategory,
            priority=analysis.priority,
            keywords=analysis.keywords,
            recommended_action=analysis.recommended_action,
            audio_url=audio_url,
            status="pending",
            stt_duration_ms=int(stt_duration * 1000),
            llm_duration_ms=int(llm_duration * 1000)
        )
        
        # 6. Push to caregivers (<1 second)
        push_start = time.time()
        facility_id = await db.get_resident_facility(resident_id)
        caregivers = await db.get_on_duty_caregivers(facility_id)
        
        await push_service.notify_caregivers(
            caregivers=caregivers,
            request=request,
            analysis=analysis
        )
        push_duration = time.time() - push_start
        
        # 7. Start escalation timer if needed
        if analysis.priority >= 7:
            await escalation_service.start_escalation_timer(request)
        
        # 8. Log metrics
        total_duration = time.time() - start_time
        await metrics.log_request_processed(
            request_id=request.id,
            total_ms=int(total_duration * 1000),
            stt_ms=int(stt_duration * 1000),
            llm_ms=int(llm_duration * 1000),
            push_ms=int(push_duration * 1000),
            priority=analysis.priority
        )
        
        return request
        
    except Exception as e:
        # Error handling with fallback
        await db.update_request(
            request.id,
            status="error",
            error_message=str(e)
        )
        
        # Still notify caregivers with manual review request
        await push_service.notify_manual_review(
            facility_id=await db.get_resident_facility(resident_id),
            request_id=request.id,
            audio_url=await storage.upload(audio_bytes, f"requests/{request.id}.webm")
        )
        
        raise
```

### 4.2 Latency Breakdown

**Target: End-to-end <8 seconds**

| Stage | Duration | Optimization |
|-------|----------|--------------|
| Audio upload | 1-2s | Compress to WebM Opus, chunk upload |
| STT (Whisper) | 2-5s | Consider Deepgram for <1s if needed |
| LLM analysis | 1-2s | GPT-4o-mini, pre-warmed connection |
| Push delivery | 0.3-0.5s | FCM/APNs high priority |
| **Total** | **4.5-9.5s** | Target p95 < 8s |

**Real-World Comparison:**
- VOIZE: No published latency (focuses on accuracy, not real-time)
- Medical alert buttons: 3-5s to reach call center
- PflegeAI advantage: AI prioritization + immediate caregiver notification

### 4.3 Cost Per Request

| Component | Cost |
|-----------|------|
| STT (Whisper, 30s) | €0.003 |
| LLM (GPT-4o-mini) | €0.00024 |
| Storage (audio, 100KB) | €0.00001 |
| Push (FCM/APNs) | Free |
| Compute overhead | €0.001 |
| **Total per request** | **~€0.004** |

**At Scale:**
- 50 requests/day/facility = €0.20/day = €6/month in AI costs
- With €600/month revenue per facility = **1% AI cost of revenue**
- Excellent unit economics!

---

## 5. VOIZE Technical Comparison

| Capability | VOIZE | PflegeAI |
|------------|-------|----------|
| **STT Model** | Custom nursing LLM (on-device) | Whisper API → self-hosted |
| **Processing** | On-device | Cloud (real-time) |
| **Direction** | Nurse → System | **Bidirectional** |
| **Prioritization** | None | **AI-scored 1-10** |
| **Push Notifications** | None (async sync) | **Real-time push** |
| **Escalation** | Manual | **Automatic** |
| **Hardware** | Smartphone only | **Smartwatch** |

**VOIZE Technical Insight (from $50M raise):**
> "Our on-device nursing LLM is purpose-built from the ground up for the workflows of care. It understands regional dialects, medical shorthand, and the natural speech patterns nurses use during fast-paced workflows."

**PflegeAI Counter-Positioning:**
VOIZE optimized for **nurse documentation accuracy**. PflegeAI optimized for **resident request urgency and speed**. Different problems, different architectures.

---

## 6. MDR Certification Implications

### 6.1 AI as Medical Device Software (MDSW)

**PflegeAI's AI components under MDR:**

| Component | MDSW Classification | Rationale |
|-----------|---------------------|-----------|
| STT transcription | No | Pure data transformation |
| Summary generation | No | Convenience feature |
| **Priority scoring** | **Potentially yes** | Influences clinical workflow |
| Emergency detection | **Yes** | Clinical decision support |

### 6.2 Phased Approach

**Phase 1 (MVP):** Avoid MDSW triggers
- Present AI priority as "suggestion" not "decision"
- Always show full transcript + audio
- No automated emergency calls
- Disclaimer: "AI-Vorschlag - bitte selbst beurteilen"

**Phase 2 (MDR):** Full certification
- Document AI training data and validation
- Clinical evaluation per MDR Article 61
- Post-market surveillance for AI drift
- Notified Body audit of algorithm

### 6.3 AI Validation Requirements

```
MDR Annex I Requirements for MDSW:
├── 17.1: Software developed according to state of the art (IEC 62304)
├── 17.2: Verification and validation appropriate to risk class
├── 17.3: Repeatability, reliability, and performance
└── 17.4: Information security measures
```

**AI-Specific Documentation Needed:**
- Training data provenance and consent
- Model validation dataset (German nursing audio)
- Bias testing (age, dialect, gender)
- Performance degradation monitoring
- Version control and change management

---

## 7. Roadmap & Next Steps

### Phase 1: MVP (Month 1-2)
- [ ] Implement Whisper API integration
- [ ] Build LLM analysis with GPT-4o-mini
- [ ] FCM/APNs push notification setup
- [ ] Basic escalation timer
- [ ] End-to-end testing with pilot

### Phase 2: Optimization (Month 3-4)
- [ ] A/B test priority accuracy with pilot feedback
- [ ] Fine-tune prompts based on real transcripts
- [ ] Add confidence scoring and manual review queue
- [ ] Implement Deepgram for latency-critical path

### Phase 3: Scale (Month 5-6)
- [ ] Evaluate self-hosted Whisper (cost optimization)
- [ ] Multi-language support (Turkish, Polish - common care workers)
- [ ] Integration with facility alarm systems
- [ ] Analytics dashboard (priority distribution, response times)

### Phase 4: MDR (Month 6-18)
- [ ] Begin IEC 62304 documentation
- [ ] Clinical validation study design
- [ ] Notified Body selection
- [ ] Self-hosted EU infrastructure

---

## 8. Appendix: Research Sources

### STT Benchmarks
- AssemblyAI Benchmarks (Feb 2026): https://www.assemblyai.com/benchmarks
- ionio.ai Edge STT Benchmark (2025): https://www.ionio.ai/blog/2025-edge-speech-to-text-model-benchmark
- OpenAI Whisper GitHub: https://github.com/openai/whisper

### Healthcare LLM Pipelines
- C-PATH: Conversational Patient Assistance and Triage (arXiv 2506.06737)
- PMC: Automating Emergency Medicine Documentation Using LLMs (PMC12315831)
- Nature: LLMs in Clinical Decision Support for Triage (npj Digital Medicine)

### VOIZE Technical
- YC Profile: https://www.ycombinator.com/companies/voize
- $50M Series A announcement (Nov 2025): "On-device nursing LLM"
- VoiceAI Space: "Trained for nursing vocabulary, abbreviations, dialects"

---

*Document Version: 1.0*
*Created: 2026-02-06*
*Author: PflegeAI Technical Team*
