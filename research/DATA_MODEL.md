# PflegeAI Data Model

*Database Schema Design: Senioren, Pfleger, Einrichtungen, Events*

---

## Executive Summary

This document defines PflegeAI's database schema optimized for:
1. **Multi-tenancy** — Secure isolation between nursing facilities
2. **DSGVO/GDPR compliance** — Health data protection by design
3. **Real-time operations** — Fast queries for urgent request handling
4. **Audit trail** — Complete logging for regulatory compliance (MD audits)

**Key Design Decisions:**
- PostgreSQL with Row-Level Security (RLS) for multi-tenant isolation
- UUID primary keys (prevent enumeration attacks)
- Soft deletes for data recovery and compliance
- Separate audit tables (immutable, append-only)
- Encryption at column level for PII fields

---

## Entity-Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ORGANIZATION LAYER                                  │
│  ┌─────────────┐                                                                 │
│  │ organization│◀──────────────────────────────────────────────┐                │
│  │ (Träger)    │                                               │                │
│  └──────┬──────┘                                               │                │
│         │ 1:N                                                  │                │
│         ▼                                                      │                │
│  ┌─────────────┐                                               │                │
│  │  facility   │◀──────────────────────────────────────┐       │                │
│  │ (Einrichtung)│                                       │       │                │
│  └──────┬──────┘                                       │       │                │
└─────────┼──────────────────────────────────────────────┼───────┼────────────────┘
          │                                              │       │
          ├───────────────────┬──────────────────────────┤       │
          │ 1:N               │ 1:N                      │       │
          ▼                   ▼                          │       │
┌──────────────────┐  ┌──────────────────┐              │       │
│    resident      │  │    caregiver     │              │       │
│ (Bewohner/Senior)│  │ (Pflegekraft)    │              │       │
└────────┬─────────┘  └────────┬─────────┘              │       │
         │                     │                        │       │
         │ 1:N                 │                        │       │
         ▼                     │                        │       │
┌──────────────────┐           │                        │       │
│     device       │           │                        │       │
│ (Smartwatch)     │           │                        │       │
└────────┬─────────┘           │                        │       │
         │                     │                        │       │
         │                     │                        │       │
         │    ┌────────────────┴─────────────────┐      │       │
         │    │                                  │      │       │
         ▼    ▼                                  ▼      │       │
┌──────────────────────────────────────────────────────────────────────────────┐
│                              REQUEST FLOW                                     │
│                                                                               │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐ │
│  │   request   │ ──▶ │ request_    │ ──▶ │ request_    │ ──▶ │ request_    │ │
│  │ (Anfrage)   │     │ assignment  │     │ response    │     │ escalation  │ │
│  │             │     │ (Zuweisung) │     │ (Erledigung)│     │ (Eskalation)│ │
│  └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘ │
│         │                                                                     │
│         │ 1:1                                                                 │
│         ▼                                                                     │
│  ┌─────────────┐                                                              │
│  │ audio_file  │                                                              │
│  │ (Aufnahme)  │                                                              │
│  └─────────────┘                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              AUDIT & EVENTS                                   │
│                                                                               │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                     │
│  │ audit_log   │     │   shift     │     │notification │                     │
│  │ (Prüfprot.) │     │ (Schicht)   │     │ (Push-Log)  │                     │
│  └─────────────┘     └─────────────┘     └─────────────┘                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Entities

### 1. Organization (Träger)

Top-level entity for nursing home operators (chains like Alloheim, Korian).

```sql
CREATE TABLE organization (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    legal_name      VARCHAR(255),
    tax_id          VARCHAR(50),          -- Steuernummer
    contact_email   VARCHAR(255),
    contact_phone   VARCHAR(50),
    billing_address JSONB,
    
    -- Subscription & Billing
    subscription_tier   VARCHAR(50) DEFAULT 'trial',  -- trial, starter, professional, enterprise
    subscription_status VARCHAR(50) DEFAULT 'active', -- active, suspended, cancelled
    billing_cycle       VARCHAR(20) DEFAULT 'monthly', -- monthly, annual
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,          -- Soft delete
    
    CONSTRAINT org_name_unique UNIQUE (name) WHERE deleted_at IS NULL
);

-- Index for subscription management
CREATE INDEX idx_org_subscription ON organization(subscription_status, subscription_tier);
```

### 2. Facility (Einrichtung / Pflegeheim)

Individual nursing home location. **Primary tenant boundary for RLS.**

```sql
CREATE TABLE facility (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organization(id),
    
    -- Basic Info
    name            VARCHAR(255) NOT NULL,
    short_code      VARCHAR(20),          -- Internal code (e.g., "MUC-01")
    
    -- Address (DSGVO: facility address is not personal data)
    street          VARCHAR(255),
    postal_code     VARCHAR(10),
    city            VARCHAR(100),
    state           VARCHAR(100),         -- Bundesland
    country         VARCHAR(2) DEFAULT 'DE',
    
    -- Contact
    phone           VARCHAR(50),
    email           VARCHAR(255),
    
    -- Operational
    total_beds      INTEGER,
    license_number  VARCHAR(100),         -- Heimaufsicht license
    timezone        VARCHAR(50) DEFAULT 'Europe/Berlin',
    
    -- Settings (JSONB for flexibility)
    settings        JSONB DEFAULT '{}',   -- escalation_timeout_seconds, notification_preferences, etc.
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,
    
    CONSTRAINT facility_org_name_unique UNIQUE (organization_id, name) WHERE deleted_at IS NULL
);

-- Indexes
CREATE INDEX idx_facility_org ON facility(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_facility_city ON facility(city, postal_code);
```

### 3. Resident (Bewohner / Senior)

**⚠️ HEALTH DATA (Art. 9 DSGVO) — Special protection required**

```sql
CREATE TABLE resident (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    
    -- Identification (encrypted at rest)
    external_id     VARCHAR(100),         -- ID from existing Pflegesoftware
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    date_of_birth   DATE,
    gender          VARCHAR(20),          -- male, female, diverse
    
    -- Room Assignment
    room_number     VARCHAR(20),
    wing            VARCHAR(50),          -- Wohnbereich
    floor           INTEGER,
    
    -- Care Information (HEALTH DATA!)
    care_level      INTEGER CHECK (care_level BETWEEN 1 AND 5), -- Pflegegrad 1-5
    mobility_status VARCHAR(50),          -- mobile, wheelchair, bedridden
    cognitive_status VARCHAR(50),         -- clear, mild_impairment, moderate_dementia, severe_dementia
    communication_notes TEXT,             -- Language preferences, hearing aids, etc.
    
    -- Medical (encrypted, minimal data principle)
    primary_diagnosis   TEXT,             -- Hauptdiagnose
    allergies           TEXT[],
    dnr_status          BOOLEAN DEFAULT FALSE, -- Do Not Resuscitate
    
    -- Emergency Contact (encrypted)
    emergency_contact   JSONB,            -- {name, relationship, phone, email}
    
    -- Status
    status          VARCHAR(50) DEFAULT 'active', -- active, hospital, discharged, deceased
    admission_date  DATE,
    discharge_date  DATE,
    
    -- Consent (DSGVO requirement)
    consent_voice_recording     BOOLEAN DEFAULT FALSE,
    consent_ai_processing       BOOLEAN DEFAULT FALSE,
    consent_data_sharing        BOOLEAN DEFAULT FALSE,
    consent_recorded_at         TIMESTAMPTZ,
    consent_recorded_by         UUID,     -- caregiver who recorded consent
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,
    
    CONSTRAINT resident_facility_external_unique UNIQUE (facility_id, external_id) WHERE deleted_at IS NULL
);

-- Indexes
CREATE INDEX idx_resident_facility ON resident(facility_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_resident_room ON resident(facility_id, room_number);
CREATE INDEX idx_resident_name ON resident(facility_id, last_name, first_name);
CREATE INDEX idx_resident_care_level ON resident(facility_id, care_level);
```

### 4. Caregiver (Pflegekraft)

```sql
CREATE TABLE caregiver (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    
    -- Identification
    employee_id     VARCHAR(50),          -- Personalnummer
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(255),
    phone           VARCHAR(50),
    
    -- Role & Qualifications
    role            VARCHAR(50) NOT NULL, -- nurse, senior_nurse, supervisor, manager, admin
    qualification   VARCHAR(100),         -- Examinierte Pflegefachkraft, Pflegehilfskraft, etc.
    specializations TEXT[],               -- Wundmanagement, Palliativ, Demenz, etc.
    
    -- Assigned Areas (can be multiple)
    assigned_wings  TEXT[],               -- Wohnbereiche
    
    -- Authentication
    auth_provider   VARCHAR(50) DEFAULT 'email', -- email, saml, oidc
    auth_subject    VARCHAR(255),         -- External SSO ID
    password_hash   VARCHAR(255),         -- Only if auth_provider = 'email'
    mfa_enabled     BOOLEAN DEFAULT FALSE,
    mfa_secret      VARCHAR(255),
    
    -- Push Notification Tokens
    fcm_tokens      TEXT[],               -- Firebase Cloud Messaging (Android)
    apns_tokens     TEXT[],               -- Apple Push Notification Service
    
    -- Status
    status          VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
    last_login_at   TIMESTAMPTZ,
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,
    
    CONSTRAINT caregiver_facility_email_unique UNIQUE (facility_id, email) WHERE deleted_at IS NULL,
    CONSTRAINT caregiver_facility_empid_unique UNIQUE (facility_id, employee_id) WHERE deleted_at IS NULL
);

-- Indexes
CREATE INDEX idx_caregiver_facility ON caregiver(facility_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_caregiver_role ON caregiver(facility_id, role);
CREATE INDEX idx_caregiver_email ON caregiver(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_caregiver_wings ON caregiver USING GIN(assigned_wings);
```

### 5. Device (Smartwatch)

```sql
CREATE TABLE device (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    resident_id     UUID REFERENCES resident(id),  -- NULL = unassigned
    
    -- Device Identification
    device_type     VARCHAR(50) NOT NULL, -- wear_os, apple_watch, companion_tablet
    serial_number   VARCHAR(100),
    model           VARCHAR(100),         -- e.g., "Samsung Galaxy Watch 6"
    os_version      VARCHAR(50),
    app_version     VARCHAR(50),
    
    -- Pairing
    pairing_code    VARCHAR(20),          -- Temporary code for initial setup
    paired_at       TIMESTAMPTZ,
    
    -- Status
    status          VARCHAR(50) DEFAULT 'active', -- active, inactive, lost, maintenance
    battery_level   INTEGER,              -- Last known battery %
    last_seen_at    TIMESTAMPTZ,
    last_sync_at    TIMESTAMPTZ,
    
    -- Location Tracking (optional, for lost device)
    last_known_location JSONB,            -- {lat, lng, accuracy, timestamp}
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,
    
    CONSTRAINT device_serial_unique UNIQUE (serial_number) WHERE deleted_at IS NULL
);

-- Indexes
CREATE INDEX idx_device_facility ON device(facility_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_device_resident ON device(resident_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_device_status ON device(facility_id, status);
```

---

## Request Flow Entities

### 6. Request (Anfrage)

**Core entity for resident→caregiver communication.**

```sql
CREATE TYPE request_status AS ENUM (
    'pending',      -- Waiting for caregiver
    'acknowledged', -- Caregiver saw it
    'in_progress',  -- Caregiver is handling
    'completed',    -- Resolved
    'cancelled',    -- Resident cancelled
    'expired'       -- Timed out without response
);

CREATE TYPE request_category AS ENUM (
    'medical',      -- Health-related (pain, symptoms)
    'comfort',      -- Comfort needs (temperature, position)
    'assistance',   -- Help needed (toilet, mobility)
    'social',       -- Company, conversation
    'emergency',    -- Urgent/life-threatening
    'other'
);

CREATE TABLE request (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    resident_id     UUID NOT NULL REFERENCES resident(id),
    device_id       UUID REFERENCES device(id),
    
    -- Request Content
    transcript      TEXT,                 -- STT result
    summary         TEXT,                 -- AI-generated summary
    category        request_category,
    
    -- AI Analysis
    priority        INTEGER CHECK (priority BETWEEN 1 AND 10),
    confidence      DECIMAL(3,2),         -- AI confidence score 0.00-1.00
    ai_analysis     JSONB,                -- Full AI response for debugging
    keywords        TEXT[],               -- Extracted keywords
    
    -- Status Tracking
    status          request_status DEFAULT 'pending',
    status_history  JSONB DEFAULT '[]',   -- [{status, timestamp, caregiver_id, note}]
    
    -- Timing
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    response_time_seconds INTEGER,        -- Time from creation to acknowledgment
    
    -- Completion Details
    resolution_note TEXT,
    resolved_by     UUID REFERENCES caregiver(id),
    
    -- Metadata
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- No soft delete for requests - they're historical records
    -- Use status = 'cancelled' instead
    
    CONSTRAINT request_priority_check CHECK (priority IS NULL OR priority BETWEEN 1 AND 10)
);

-- Critical Indexes for Real-Time Operations
CREATE INDEX idx_request_facility_status ON request(facility_id, status, created_at DESC);
CREATE INDEX idx_request_facility_priority ON request(facility_id, priority DESC, created_at DESC) WHERE status = 'pending';
CREATE INDEX idx_request_resident ON request(resident_id, created_at DESC);
CREATE INDEX idx_request_pending ON request(facility_id, created_at) WHERE status = 'pending';
CREATE INDEX idx_request_emergency ON request(facility_id, created_at) WHERE priority >= 9 AND status = 'pending';

-- Partial index for active requests (most common query)
CREATE INDEX idx_request_active ON request(facility_id, created_at DESC) 
    WHERE status IN ('pending', 'acknowledged', 'in_progress');
```

### 7. Audio File (Aufnahme)

**Separate table for audio storage metadata. Actual files in S3/MinIO.**

```sql
CREATE TABLE audio_file (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id      UUID NOT NULL REFERENCES request(id) ON DELETE CASCADE,
    facility_id     UUID NOT NULL REFERENCES facility(id),
    
    -- Storage
    storage_path    VARCHAR(500) NOT NULL, -- S3 path: facilities/{id}/audio/{date}/{uuid}.aac
    storage_bucket  VARCHAR(100),
    
    -- File Info
    mime_type       VARCHAR(100) DEFAULT 'audio/aac',
    file_size_bytes INTEGER,
    duration_seconds DECIMAL(6,2),
    
    -- Processing
    transcription_status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    transcription_error  TEXT,
    
    -- Retention (DSGVO)
    expires_at      TIMESTAMPTZ,          -- Auto-delete after retention period
    deleted_at      TIMESTAMPTZ,          -- When actually deleted
    deletion_reason VARCHAR(100),         -- retention_policy, user_request, gdpr_erasure
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT audio_one_per_request UNIQUE (request_id)
);

-- Index for retention cleanup job
CREATE INDEX idx_audio_expires ON audio_file(expires_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_audio_request ON audio_file(request_id);
```

### 8. Request Assignment (Zuweisung)

**Tracks which caregivers saw/claimed requests.**

```sql
CREATE TABLE request_assignment (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id      UUID NOT NULL REFERENCES request(id),
    caregiver_id    UUID NOT NULL REFERENCES caregiver(id),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    
    -- Assignment Type
    assignment_type VARCHAR(50) NOT NULL, -- auto, manual, claimed, delegated
    
    -- Status
    status          VARCHAR(50) DEFAULT 'assigned', -- assigned, accepted, declined, completed, transferred
    
    -- Timing
    assigned_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accepted_at     TIMESTAMPTZ,
    declined_at     TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    
    decline_reason  TEXT,
    
    CONSTRAINT assignment_unique UNIQUE (request_id, caregiver_id)
);

-- Indexes
CREATE INDEX idx_assignment_request ON request_assignment(request_id);
CREATE INDEX idx_assignment_caregiver ON request_assignment(caregiver_id, assigned_at DESC);
CREATE INDEX idx_assignment_facility ON request_assignment(facility_id, assigned_at DESC);
```

### 9. Request Escalation (Eskalation)

**Tracks escalation events when requests aren't handled in time.**

```sql
CREATE TABLE request_escalation (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id      UUID NOT NULL REFERENCES request(id),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    
    -- Escalation Details
    escalation_level INTEGER NOT NULL,    -- 1, 2, 3 (increasing severity)
    escalated_to    UUID[] NOT NULL,      -- Array of caregiver IDs notified
    escalation_reason VARCHAR(255),       -- timeout, manual, priority_upgrade
    
    -- Timing
    triggered_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES caregiver(id),
    
    -- Original thresholds
    threshold_seconds INTEGER,            -- How long before this escalation triggered
    
    CONSTRAINT escalation_level_check CHECK (escalation_level BETWEEN 1 AND 5)
);

-- Indexes
CREATE INDEX idx_escalation_request ON request_escalation(request_id);
CREATE INDEX idx_escalation_facility ON request_escalation(facility_id, triggered_at DESC);
CREATE INDEX idx_escalation_pending ON request_escalation(facility_id) WHERE acknowledged_at IS NULL;
```

---

## Operational Entities

### 10. Shift (Schicht)

**Tracks caregiver work schedules for intelligent routing.**

```sql
CREATE TABLE shift (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    caregiver_id    UUID NOT NULL REFERENCES caregiver(id),
    
    -- Shift Details
    shift_type      VARCHAR(50),          -- early, late, night, on_call
    assigned_wings  TEXT[],               -- Which Wohnbereiche
    
    -- Timing
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end   TIMESTAMPTZ NOT NULL,
    actual_start    TIMESTAMPTZ,
    actual_end      TIMESTAMPTZ,
    
    -- Status
    status          VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT shift_time_valid CHECK (scheduled_end > scheduled_start)
);

-- Critical index for "who is on duty now" queries
CREATE INDEX idx_shift_active ON shift(facility_id, scheduled_start, scheduled_end) 
    WHERE status IN ('scheduled', 'active');
CREATE INDEX idx_shift_caregiver ON shift(caregiver_id, scheduled_start);
CREATE INDEX idx_shift_wings ON shift USING GIN(assigned_wings);

-- Function to get caregivers currently on duty
CREATE OR REPLACE FUNCTION get_on_duty_caregivers(p_facility_id UUID, p_wing TEXT DEFAULT NULL)
RETURNS TABLE(caregiver_id UUID) AS $$
BEGIN
    RETURN QUERY
    SELECT s.caregiver_id
    FROM shift s
    JOIN caregiver c ON c.id = s.caregiver_id
    WHERE s.facility_id = p_facility_id
      AND s.status IN ('scheduled', 'active')
      AND NOW() BETWEEN s.scheduled_start AND s.scheduled_end
      AND c.status = 'active'
      AND (p_wing IS NULL OR p_wing = ANY(s.assigned_wings));
END;
$$ LANGUAGE plpgsql;
```

### 11. Notification Log (Push-Protokoll)

**Audit trail for all push notifications sent.**

```sql
CREATE TABLE notification (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id     UUID NOT NULL REFERENCES facility(id),
    caregiver_id    UUID REFERENCES caregiver(id),
    request_id      UUID REFERENCES request(id),
    
    -- Notification Content
    title           VARCHAR(255) NOT NULL,
    body            TEXT,
    data            JSONB,                -- Additional payload
    
    -- Delivery
    channel         VARCHAR(50) NOT NULL, -- fcm, apns, websocket, sms
    priority        VARCHAR(50),          -- high, normal, low
    device_token    VARCHAR(500),
    
    -- Status
    status          VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, failed
    sent_at         TIMESTAMPTZ,
    delivered_at    TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    error_message   TEXT,
    
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Retention: Notifications older than 30 days can be purged
    expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Indexes
CREATE INDEX idx_notification_request ON notification(request_id);
CREATE INDEX idx_notification_caregiver ON notification(caregiver_id, created_at DESC);
CREATE INDEX idx_notification_status ON notification(status, created_at) WHERE status = 'pending';
CREATE INDEX idx_notification_expires ON notification(expires_at);
```

---

## Audit & Compliance

### 12. Audit Log (Prüfprotokoll)

**Immutable audit trail for DSGVO/MD compliance. Append-only.**

```sql
CREATE TABLE audit_log (
    id              BIGSERIAL PRIMARY KEY, -- Sequential for ordering
    
    -- Context
    facility_id     UUID,
    caregiver_id    UUID,                 -- Who performed the action
    resident_id     UUID,                 -- If resident data affected
    
    -- Action
    action          VARCHAR(100) NOT NULL, -- create, read, update, delete, export, login, etc.
    entity_type     VARCHAR(100) NOT NULL, -- resident, request, caregiver, etc.
    entity_id       UUID,
    
    -- Details
    old_values      JSONB,                -- Previous state (for updates)
    new_values      JSONB,                -- New state
    description     TEXT,
    
    -- Request Context
    ip_address      INET,
    user_agent      TEXT,
    request_id      VARCHAR(100),         -- Correlation ID
    
    -- Timing (immutable)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- NO update/delete columns - this table is append-only
    
    CONSTRAINT audit_action_valid CHECK (action IN (
        'create', 'read', 'update', 'delete',
        'export', 'print', 'share',
        'login', 'logout', 'login_failed',
        'consent_granted', 'consent_revoked',
        'escalation', 'notification_sent'
    ))
);

-- Indexes for compliance queries
CREATE INDEX idx_audit_facility ON audit_log(facility_id, created_at DESC);
CREATE INDEX idx_audit_caregiver ON audit_log(caregiver_id, created_at DESC);
CREATE INDEX idx_audit_resident ON audit_log(resident_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id, created_at DESC);
CREATE INDEX idx_audit_action ON audit_log(action, created_at DESC);

-- Partition by month for efficient retention management
-- (Implementation depends on PostgreSQL version and scale)
```

---

## Multi-Tenancy Implementation

### Row-Level Security (RLS)

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE facility ENABLE ROW LEVEL SECURITY;
ALTER TABLE resident ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver ENABLE ROW LEVEL SECURITY;
ALTER TABLE device ENABLE ROW LEVEL SECURITY;
ALTER TABLE request ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_file ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_assignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_escalation ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification ENABLE ROW LEVEL SECURITY;

-- Create policies (example for request table)
CREATE POLICY facility_isolation ON request
    FOR ALL
    USING (facility_id = current_setting('app.current_facility_id')::UUID);

CREATE POLICY facility_isolation ON resident
    FOR ALL
    USING (facility_id = current_setting('app.current_facility_id')::UUID);

-- Similar policies for all other tables...

-- Application sets facility context on each connection
-- SET app.current_facility_id = 'uuid-of-facility';
```

### Application-Level Multi-Tenancy

```python
# FastAPI middleware to set tenant context
from fastapi import Request
from sqlalchemy import text

async def set_tenant_context(request: Request, call_next):
    facility_id = get_facility_from_token(request)  # From JWT
    
    # Set PostgreSQL session variable
    async with db.begin():
        await db.execute(
            text("SET app.current_facility_id = :facility_id"),
            {"facility_id": str(facility_id)}
        )
    
    response = await call_next(request)
    return response
```

---

## DSGVO Compliance Features

### 1. Consent Management

```sql
-- Consent is tracked per-resident with timestamps
-- See resident.consent_* fields

-- View for consent status report
CREATE VIEW v_consent_status AS
SELECT 
    f.name AS facility_name,
    r.id AS resident_id,
    r.first_name || ' ' || r.last_name AS resident_name,
    r.consent_voice_recording,
    r.consent_ai_processing,
    r.consent_data_sharing,
    r.consent_recorded_at,
    c.first_name || ' ' || c.last_name AS recorded_by_name
FROM resident r
JOIN facility f ON f.id = r.facility_id
LEFT JOIN caregiver c ON c.id = r.consent_recorded_by
WHERE r.deleted_at IS NULL;
```

### 2. Data Retention & Deletion

```sql
-- Automatic audio file cleanup after retention period
CREATE OR REPLACE FUNCTION cleanup_expired_audio()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Mark as deleted (actual S3 deletion via background job)
    UPDATE audio_file
    SET deleted_at = NOW(),
        deletion_reason = 'retention_policy'
    WHERE expires_at < NOW()
      AND deleted_at IS NULL;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- GDPR Right to Erasure
CREATE OR REPLACE FUNCTION gdpr_erase_resident(p_resident_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Anonymize resident data (don't delete - maintain audit trail)
    UPDATE resident SET
        first_name = 'GELÖSCHT',
        last_name = 'GELÖSCHT',
        date_of_birth = NULL,
        emergency_contact = NULL,
        primary_diagnosis = NULL,
        allergies = NULL,
        communication_notes = NULL,
        deleted_at = NOW()
    WHERE id = p_resident_id;
    
    -- Mark audio files for deletion
    UPDATE audio_file SET
        deleted_at = NOW(),
        deletion_reason = 'gdpr_erasure'
    WHERE request_id IN (SELECT id FROM request WHERE resident_id = p_resident_id);
    
    -- Log the erasure
    INSERT INTO audit_log (facility_id, resident_id, action, entity_type, entity_id, description)
    SELECT facility_id, p_resident_id, 'delete', 'resident', p_resident_id, 'GDPR erasure request'
    FROM resident WHERE id = p_resident_id;
END;
$$ LANGUAGE plpgsql;
```

### 3. Audit Queries for MD/MDK Inspections

```sql
-- All access to a specific resident's data
SELECT * FROM audit_log
WHERE resident_id = :resident_id
ORDER BY created_at DESC;

-- All actions by a specific caregiver
SELECT * FROM audit_log
WHERE caregiver_id = :caregiver_id
  AND created_at BETWEEN :start_date AND :end_date
ORDER BY created_at DESC;

-- Export for MDK audit (last 90 days)
COPY (
    SELECT 
        al.created_at,
        al.action,
        al.entity_type,
        c.first_name || ' ' || c.last_name AS performed_by,
        r.first_name || ' ' || r.last_name AS affected_resident,
        al.description
    FROM audit_log al
    LEFT JOIN caregiver c ON c.id = al.caregiver_id
    LEFT JOIN resident r ON r.id = al.resident_id
    WHERE al.facility_id = :facility_id
      AND al.created_at > NOW() - INTERVAL '90 days'
    ORDER BY al.created_at DESC
) TO '/tmp/audit_export.csv' WITH CSV HEADER;
```

---

## Performance Optimizations

### Common Query Patterns

```sql
-- 1. Dashboard: Active requests sorted by priority
SELECT r.*, res.first_name, res.last_name, res.room_number
FROM request r
JOIN resident res ON res.id = r.resident_id
WHERE r.facility_id = :facility_id
  AND r.status IN ('pending', 'acknowledged', 'in_progress')
ORDER BY r.priority DESC, r.created_at ASC
LIMIT 50;

-- 2. Resident history (last 7 days)
SELECT r.*, a.storage_path
FROM request r
LEFT JOIN audio_file a ON a.request_id = r.id
WHERE r.resident_id = :resident_id
  AND r.created_at > NOW() - INTERVAL '7 days'
ORDER BY r.created_at DESC;

-- 3. Caregiver workload today
SELECT 
    c.id,
    c.first_name || ' ' || c.last_name AS name,
    COUNT(ra.id) FILTER (WHERE ra.status = 'completed') AS completed,
    COUNT(ra.id) FILTER (WHERE ra.status IN ('assigned', 'accepted')) AS active,
    AVG(r.response_time_seconds) AS avg_response_time
FROM caregiver c
LEFT JOIN request_assignment ra ON ra.caregiver_id = c.id 
    AND ra.assigned_at::date = CURRENT_DATE
LEFT JOIN request r ON r.id = ra.request_id
WHERE c.facility_id = :facility_id
  AND c.status = 'active'
GROUP BY c.id;
```

### Recommended Indexes Summary

```sql
-- Critical for real-time dashboard
CREATE INDEX CONCURRENTLY idx_request_dashboard 
ON request(facility_id, status, priority DESC, created_at ASC)
WHERE status IN ('pending', 'acknowledged', 'in_progress');

-- Critical for resident lookup
CREATE INDEX CONCURRENTLY idx_resident_search
ON resident(facility_id, last_name, first_name)
WHERE deleted_at IS NULL;

-- Critical for shift routing
CREATE INDEX CONCURRENTLY idx_shift_now
ON shift(facility_id, status)
WHERE status IN ('scheduled', 'active');
```

---

## Migration Strategy

### Phase 1: MVP Schema (Week 1)
```sql
-- Core tables only
- organization
- facility  
- resident (minimal fields)
- caregiver
- device
- request
- audio_file
```

### Phase 2: Full Schema (Week 2-3)
```sql
-- Add operational tables
- request_assignment
- request_escalation
- shift
- notification
- audit_log
```

### Phase 3: Analytics Schema (Month 2)
```sql
-- Add analytics views and materialized views
- v_daily_request_stats
- v_caregiver_performance
- v_resident_activity
```

---

## Entity Counts at Scale

| Entity | Typical Facility (80 beds) | Scale (100 facilities) |
|--------|---------------------------|------------------------|
| Residents | 80 | 8,000 |
| Caregivers | 40-60 | 5,000 |
| Devices | 80-100 | 10,000 |
| Requests/day | 100-200 | 15,000 |
| Requests/year | 50,000 | 5,000,000 |
| Audit logs/year | 500,000 | 50,000,000 |

**Storage estimates (Year 1):**
- Database: ~50GB (100 facilities)
- Audio files: ~500GB (30-second recordings, 30-day retention)
- Total: ~600GB

---

## Summary

This data model provides:

1. **Complete entity coverage** for the resident→caregiver communication flow
2. **Multi-tenant security** via PostgreSQL RLS
3. **DSGVO compliance** with consent tracking, audit logs, and data retention
4. **Real-time performance** with optimized indexes for dashboard queries
5. **Scalability** to 100+ facilities and millions of requests

**Key Tables:**
- `facility` — Tenant boundary
- `resident` — Seniors with health data (Art. 9 DSGVO)
- `caregiver` — Staff with authentication
- `device` — Smartwatch registration
- `request` — Voice requests with AI analysis
- `audit_log` — Immutable compliance trail

**Next Steps:**
1. Implement SQLAlchemy models
2. Create Alembic migrations
3. Build RLS policies
4. Add audit triggers

---

*Document Version: 1.0*
*Created: 2026-02-06*
*Author: PflegeAI Technical Team*
