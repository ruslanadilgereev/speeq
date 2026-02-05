-- ============================================
-- PflegeAI Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. FACILITIES (Multi-Tenant Root)
CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  subscription_tier TEXT DEFAULT 'trial', -- trial, basic, professional, enterprise
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESIDENTS
CREATE TABLE IF NOT EXISTS residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  room_number TEXT,
  care_level INT CHECK (care_level BETWEEN 1 AND 5),
  notes TEXT,
  device_id TEXT, -- Smartwatch/Device ID
  photo_url TEXT,
  date_of_birth DATE,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STAFF
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('nurse', 'caregiver', 'admin', 'manager')),
  email TEXT,
  phone TEXT,
  on_duty BOOLEAN DEFAULT false,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ALERTS (Realtime!)
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES staff(id),
  message TEXT NOT NULL,
  transcript TEXT, -- Original voice transcript
  urgency INT NOT NULL CHECK (urgency BETWEEN 1 AND 10),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'in_progress', 'resolved')),
  voice_recording_url TEXT,
  ai_classification JSONB, -- AI analysis results
  created_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT
);

-- 5. CARE LOGS (Documentation)
CREATE TABLE IF NOT EXISTS care_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff(id),
  log_type TEXT NOT NULL CHECK (log_type IN ('vital', 'medication', 'incident', 'note', 'activity')),
  content JSONB NOT NULL,
  voice_recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SHIFT SCHEDULES
CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  zone TEXT, -- Which area/floor
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_residents_facility ON residents(facility_id);
CREATE INDEX IF NOT EXISTS idx_staff_facility ON staff(facility_id);
CREATE INDEX IF NOT EXISTS idx_alerts_facility ON alerts(facility_id);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_urgency ON alerts(urgency DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_care_logs_resident ON care_logs(resident_id);
CREATE INDEX IF NOT EXISTS idx_care_logs_created ON care_logs(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (Multi-Tenant Isolation)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

-- Helper function: Get user's facility_id
CREATE OR REPLACE FUNCTION get_user_facility_id()
RETURNS UUID AS $$
  SELECT facility_id FROM staff WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- RLS Policies: Staff can only see their facility's data

-- Facilities: Staff can see their own facility
CREATE POLICY "Staff can view own facility" ON facilities
  FOR SELECT USING (id = get_user_facility_id());

-- Residents: Staff can CRUD their facility's residents
CREATE POLICY "Staff can view facility residents" ON residents
  FOR SELECT USING (facility_id = get_user_facility_id());
CREATE POLICY "Staff can insert facility residents" ON residents
  FOR INSERT WITH CHECK (facility_id = get_user_facility_id());
CREATE POLICY "Staff can update facility residents" ON residents
  FOR UPDATE USING (facility_id = get_user_facility_id());

-- Alerts: Staff can CRUD their facility's alerts
CREATE POLICY "Staff can view facility alerts" ON alerts
  FOR SELECT USING (facility_id = get_user_facility_id());
CREATE POLICY "Staff can insert facility alerts" ON alerts
  FOR INSERT WITH CHECK (facility_id = get_user_facility_id());
CREATE POLICY "Staff can update facility alerts" ON alerts
  FOR UPDATE USING (facility_id = get_user_facility_id());

-- Staff: Can view colleagues
CREATE POLICY "Staff can view facility staff" ON staff
  FOR SELECT USING (facility_id = get_user_facility_id());

-- Care Logs: Staff can CRUD their facility's logs
CREATE POLICY "Staff can view facility logs" ON care_logs
  FOR SELECT USING (
    resident_id IN (SELECT id FROM residents WHERE facility_id = get_user_facility_id())
  );
CREATE POLICY "Staff can insert logs" ON care_logs
  FOR INSERT WITH CHECK (
    resident_id IN (SELECT id FROM residents WHERE facility_id = get_user_facility_id())
  );

-- Shifts: Staff can view their facility's shifts
CREATE POLICY "Staff can view facility shifts" ON shifts
  FOR SELECT USING (facility_id = get_user_facility_id());

-- ============================================
-- REALTIME: Enable for Alerts
-- ============================================
-- Go to Supabase Dashboard > Database > Replication
-- Enable realtime for: alerts, care_logs

-- ============================================
-- DEMO DATA (Optional - für Testing)
-- ============================================
-- Uncomment to insert demo data

/*
-- Demo Facility
INSERT INTO facilities (id, name, address, phone) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Pflegeheim Sonnenschein', 'Musterstraße 123, 12345 Berlin', '+49 30 123456');

-- Demo Residents
INSERT INTO residents (facility_id, name, room_number, care_level, device_id) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Maria Schmidt', '101', 3, 'WATCH-001'),
  ('11111111-1111-1111-1111-111111111111', 'Hans Müller', '102', 2, 'WATCH-002'),
  ('11111111-1111-1111-1111-111111111111', 'Ingrid Weber', '103', 4, 'WATCH-003'),
  ('11111111-1111-1111-1111-111111111111', 'Karl Fischer', '104', 2, 'WATCH-004'),
  ('11111111-1111-1111-1111-111111111111', 'Helga Braun', '105', 5, 'WATCH-005');

-- Demo Staff
INSERT INTO staff (facility_id, name, role, email, on_duty) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Anna Krause', 'nurse', 'anna@sonnenschein.de', true),
  ('11111111-1111-1111-1111-111111111111', 'Thomas Berg', 'caregiver', 'thomas@sonnenschein.de', true),
  ('11111111-1111-1111-1111-111111111111', 'Lisa Hoffmann', 'admin', 'lisa@sonnenschein.de', false);
*/
