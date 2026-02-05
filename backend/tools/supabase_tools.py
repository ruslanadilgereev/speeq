"""
Supabase Tools for PflegeAI Agent
"""
import os
from typing import Optional, List
from langchain_core.tools import tool
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

FACILITY_ID = "11111111-1111-1111-1111-111111111111"  # Demo facility


@tool
def get_resident_info(resident_name: str) -> dict:
    """
    Get information about a resident by name.
    Use this when you need details about a specific resident.
    """
    response = supabase.table("residents").select("*").ilike("name", f"%{resident_name}%").execute()
    if response.data:
        return response.data[0]
    return {"error": f"Resident '{resident_name}' not found"}


@tool
def get_all_residents() -> List[dict]:
    """
    Get a list of all residents in the facility.
    Use this to see who lives in the nursing home.
    """
    response = supabase.table("residents").select("id, name, room_number, care_level").eq("facility_id", FACILITY_ID).execute()
    return response.data


@tool
def get_staff_on_duty() -> List[dict]:
    """
    Get all staff members currently on duty.
    Use this to find available nurses and caregivers.
    """
    response = supabase.table("staff").select("id, name, role, phone").eq("facility_id", FACILITY_ID).eq("on_duty", True).execute()
    return response.data


@tool
def create_alert(
    resident_name: str,
    message: str,
    transcript: str,
    urgency: int
) -> dict:
    """
    Create a new alert for a resident.
    
    Args:
        resident_name: Name of the resident who needs help
        message: Short summary of what they need (German)
        transcript: Original voice transcript from the resident
        urgency: Urgency level 1-10 (1=low, 10=emergency)
    
    Returns:
        The created alert record
    """
    # Find resident
    resident = supabase.table("residents").select("id").ilike("name", f"%{resident_name}%").execute()
    if not resident.data:
        return {"error": f"Resident '{resident_name}' not found"}
    
    resident_id = resident.data[0]["id"]
    
    # Find available nurse (prefer nurse role, then caregiver)
    staff = supabase.table("staff").select("id, name, role").eq("facility_id", FACILITY_ID).eq("on_duty", True).order("role").execute()
    assigned_to = staff.data[0]["id"] if staff.data else None
    assigned_name = staff.data[0]["name"] if staff.data else "Unassigned"
    
    # Create alert
    alert_data = {
        "facility_id": FACILITY_ID,
        "resident_id": resident_id,
        "assigned_to": assigned_to,
        "message": message,
        "transcript": transcript,
        "urgency": urgency,
        "status": "pending"
    }
    
    response = supabase.table("alerts").insert(alert_data).execute()
    
    return {
        "success": True,
        "alert_id": response.data[0]["id"],
        "assigned_to": assigned_name,
        "urgency": urgency,
        "message": message
    }


@tool
def get_pending_alerts() -> List[dict]:
    """
    Get all pending alerts that need attention.
    Use this to see what requests are waiting.
    """
    response = supabase.table("alerts").select(
        "id, message, urgency, status, created_at, residents(name, room_number), staff(name)"
    ).in_("status", ["pending", "acknowledged", "in_progress"]).order("urgency", desc=True).execute()
    return response.data


@tool  
def update_alert_status(alert_id: str, new_status: str, resolution_notes: Optional[str] = None) -> dict:
    """
    Update the status of an alert.
    
    Args:
        alert_id: The UUID of the alert
        new_status: One of: 'acknowledged', 'in_progress', 'resolved'
        resolution_notes: Optional notes about how the alert was resolved
    """
    update_data = {"status": new_status}
    
    if new_status == "acknowledged":
        update_data["acknowledged_at"] = "now()"
    elif new_status == "resolved":
        update_data["resolved_at"] = "now()"
        if resolution_notes:
            update_data["resolution_notes"] = resolution_notes
    
    response = supabase.table("alerts").update(update_data).eq("id", alert_id).execute()
    return {"success": True, "updated": response.data}


@tool
def add_care_log(
    resident_name: str,
    log_type: str,
    content: dict,
    staff_name: Optional[str] = None
) -> dict:
    """
    Add a care log entry for a resident.
    
    Args:
        resident_name: Name of the resident
        log_type: One of: 'vital', 'medication', 'incident', 'note', 'activity'
        content: Dictionary with log details (varies by type)
        staff_name: Name of staff member (optional, defaults to first on duty)
    """
    # Find resident
    resident = supabase.table("residents").select("id").ilike("name", f"%{resident_name}%").execute()
    if not resident.data:
        return {"error": f"Resident '{resident_name}' not found"}
    
    # Find staff
    if staff_name:
        staff = supabase.table("staff").select("id").ilike("name", f"%{staff_name}%").execute()
    else:
        staff = supabase.table("staff").select("id").eq("facility_id", FACILITY_ID).eq("on_duty", True).limit(1).execute()
    
    if not staff.data:
        return {"error": "No staff found"}
    
    log_data = {
        "resident_id": resident.data[0]["id"],
        "staff_id": staff.data[0]["id"],
        "log_type": log_type,
        "content": content
    }
    
    response = supabase.table("care_logs").insert(log_data).execute()
    return {"success": True, "log_id": response.data[0]["id"]}


@tool
def get_resident_care_history(resident_name: str, limit: int = 10) -> List[dict]:
    """
    Get recent care logs for a resident.
    
    Args:
        resident_name: Name of the resident
        limit: Maximum number of logs to return (default 10)
    """
    # Find resident
    resident = supabase.table("residents").select("id").ilike("name", f"%{resident_name}%").execute()
    if not resident.data:
        return {"error": f"Resident '{resident_name}' not found"}
    
    response = supabase.table("care_logs").select(
        "id, log_type, content, created_at, staff(name)"
    ).eq("resident_id", resident.data[0]["id"]).order("created_at", desc=True).limit(limit).execute()
    
    return response.data


# Export all tools
SUPABASE_TOOLS = [
    get_resident_info,
    get_all_residents,
    get_staff_on_duty,
    create_alert,
    get_pending_alerts,
    update_alert_status,
    add_care_log,
    get_resident_care_history,
]
