-- ============================================
-- PflegeAI Demo Data
-- ============================================

-- Demo Facility
INSERT INTO facilities (id, name, address, phone, subscription_tier) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Pflegeheim Sonnenschein', 'Musterstraße 123, 12345 Berlin', '+49 30 123456', 'professional')
ON CONFLICT (id) DO NOTHING;

-- Demo Residents
INSERT INTO residents (facility_id, name, room_number, care_level, device_id, notes) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Maria Schmidt', '101', 3, 'WATCH-001', 'Benötigt Hilfe beim Aufstehen. Liebt klassische Musik.'),
  ('11111111-1111-1111-1111-111111111111', 'Hans Müller', '102', 2, 'WATCH-002', 'Diabetiker. Insulin vor dem Essen.'),
  ('11111111-1111-1111-1111-111111111111', 'Ingrid Weber', '103', 4, 'WATCH-003', 'Demenz im frühen Stadium. Sehr freundlich.'),
  ('11111111-1111-1111-1111-111111111111', 'Karl Fischer', '104', 2, 'WATCH-004', 'Mobil mit Rollator. Geht gerne spazieren.'),
  ('11111111-1111-1111-1111-111111111111', 'Helga Braun', '105', 5, 'WATCH-005', 'Bettlägerig. Regelmäßige Lagerung erforderlich.');

-- Demo Staff
INSERT INTO staff (id, facility_id, name, role, email, phone, on_duty) VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Anna Krause', 'nurse', 'anna@sonnenschein.de', '+49 151 1234567', true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Thomas Berg', 'caregiver', 'thomas@sonnenschein.de', '+49 151 2345678', true),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Lisa Hoffmann', 'admin', 'lisa@sonnenschein.de', '+49 151 3456789', false),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'Michael Schwarz', 'nurse', 'michael@sonnenschein.de', '+49 151 4567890', true);

-- Demo Alerts (verschiedene Status)
INSERT INTO alerts (facility_id, resident_id, assigned_to, message, transcript, urgency, status, created_at) VALUES 
  -- Pending alert (gerade eingegangen)
  ('11111111-1111-1111-1111-111111111111', 
   (SELECT id FROM residents WHERE name = 'Maria Schmidt'),
   (SELECT id FROM staff WHERE name = 'Anna Krause'),
   'Bewohnerin benötigt Hilfe beim Aufstehen',
   'Hallo? Kann mir bitte jemand helfen? Ich möchte aufstehen aber ich schaffe es nicht alleine.',
   6, 'pending', NOW() - INTERVAL '2 minutes'),
   
  -- Acknowledged alert  
  ('11111111-1111-1111-1111-111111111111',
   (SELECT id FROM residents WHERE name = 'Hans Müller'),
   (SELECT id FROM staff WHERE name = 'Thomas Berg'),
   'Bewohner hat Durst',
   'Ich hätte gerne etwas zu trinken. Ein Glas Wasser bitte.',
   3, 'acknowledged', NOW() - INTERVAL '10 minutes'),
   
  -- High urgency alert
  ('11111111-1111-1111-1111-111111111111',
   (SELECT id FROM residents WHERE name = 'Helga Braun'),
   (SELECT id FROM staff WHERE name = 'Anna Krause'),
   'Bewohnerin klagt über Schmerzen',
   'Au! Mein Rücken tut so weh. Bitte helfen Sie mir. Es tut wirklich sehr weh.',
   9, 'in_progress', NOW() - INTERVAL '5 minutes'),
   
  -- Resolved alert
  ('11111111-1111-1111-1111-111111111111',
   (SELECT id FROM residents WHERE name = 'Karl Fischer'),
   (SELECT id FROM staff WHERE name = 'Michael Schwarz'),
   'Bewohner wollte spazieren gehen',
   'Ich würde gerne nach draußen gehen. Das Wetter sieht so schön aus heute.',
   2, 'resolved', NOW() - INTERVAL '1 hour');

-- Update resolved alert timestamps
UPDATE alerts SET 
  acknowledged_at = created_at + INTERVAL '30 seconds',
  resolved_at = created_at + INTERVAL '15 minutes',
  resolution_notes = 'Bewohner wurde beim Spaziergang im Garten begleitet.'
WHERE status = 'resolved';

UPDATE alerts SET 
  acknowledged_at = created_at + INTERVAL '45 seconds'
WHERE status IN ('acknowledged', 'in_progress');

-- Demo Care Logs
INSERT INTO care_logs (resident_id, staff_id, log_type, content, created_at) VALUES 
  -- Vitals
  ((SELECT id FROM residents WHERE name = 'Maria Schmidt'),
   (SELECT id FROM staff WHERE name = 'Anna Krause'),
   'vital',
   '{"blood_pressure": "130/85", "pulse": 72, "temperature": 36.8, "oxygen": 97}'::jsonb,
   NOW() - INTERVAL '2 hours'),
   
  -- Medication
  ((SELECT id FROM residents WHERE name = 'Hans Müller'),
   (SELECT id FROM staff WHERE name = 'Thomas Berg'),
   'medication',
   '{"medication": "Metformin 500mg", "administered": true, "time": "08:00", "notes": "Mit Frühstück eingenommen"}'::jsonb,
   NOW() - INTERVAL '3 hours'),
   
  -- Activity note
  ((SELECT id FROM residents WHERE name = 'Karl Fischer'),
   (SELECT id FROM staff WHERE name = 'Michael Schwarz'),
   'activity',
   '{"activity": "Spaziergang", "duration_minutes": 30, "mood": "gut", "notes": "Hat den Garten genossen, war sehr zufrieden"}'::jsonb,
   NOW() - INTERVAL '1 hour'),
   
  -- Incident
  ((SELECT id FROM residents WHERE name = 'Ingrid Weber'),
   (SELECT id FROM staff WHERE name = 'Anna Krause'),
   'incident',
   '{"type": "Beinahe-Sturz", "location": "Flur", "injury": false, "action_taken": "Stützend begleitet, Rollator bereitgestellt"}'::jsonb,
   NOW() - INTERVAL '4 hours');
