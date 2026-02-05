export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      facilities: {
        Row: {
          id: string
          name: string
          address: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      residents: {
        Row: {
          id: string
          facility_id: string
          name: string
          room_number: string | null
          care_level: number | null
          notes: string | null
          device_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          facility_id: string
          name: string
          room_number?: string | null
          care_level?: number | null
          notes?: string | null
          device_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          facility_id?: string
          name?: string
          room_number?: string | null
          care_level?: number | null
          notes?: string | null
          device_id?: string | null
          created_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          facility_id: string
          user_id: string | null
          name: string
          role: 'nurse' | 'caregiver' | 'admin' | 'manager'
          email: string | null
          phone: string | null
          on_duty: boolean
          created_at: string
        }
        Insert: {
          id?: string
          facility_id: string
          user_id?: string | null
          name: string
          role: 'nurse' | 'caregiver' | 'admin' | 'manager'
          email?: string | null
          phone?: string | null
          on_duty?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          facility_id?: string
          user_id?: string | null
          name?: string
          role?: 'nurse' | 'caregiver' | 'admin' | 'manager'
          email?: string | null
          phone?: string | null
          on_duty?: boolean
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          facility_id: string
          resident_id: string
          assigned_to: string | null
          message: string
          transcript: string | null
          urgency: number
          status: 'pending' | 'acknowledged' | 'in_progress' | 'resolved'
          voice_recording_url: string | null
          created_at: string
          acknowledged_at: string | null
          resolved_at: string | null
        }
        Insert: {
          id?: string
          facility_id: string
          resident_id: string
          assigned_to?: string | null
          message: string
          transcript?: string | null
          urgency: number
          status?: 'pending' | 'acknowledged' | 'in_progress' | 'resolved'
          voice_recording_url?: string | null
          created_at?: string
          acknowledged_at?: string | null
          resolved_at?: string | null
        }
        Update: {
          id?: string
          facility_id?: string
          resident_id?: string
          assigned_to?: string | null
          message?: string
          transcript?: string | null
          urgency?: number
          status?: 'pending' | 'acknowledged' | 'in_progress' | 'resolved'
          voice_recording_url?: string | null
          created_at?: string
          acknowledged_at?: string | null
          resolved_at?: string | null
        }
      }
      care_logs: {
        Row: {
          id: string
          resident_id: string
          staff_id: string
          log_type: 'vital' | 'medication' | 'incident' | 'note' | 'activity'
          content: Json
          voice_recording_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          resident_id: string
          staff_id: string
          log_type: 'vital' | 'medication' | 'incident' | 'note' | 'activity'
          content: Json
          voice_recording_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          resident_id?: string
          staff_id?: string
          log_type?: 'vital' | 'medication' | 'incident' | 'note' | 'activity'
          content?: Json
          voice_recording_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
