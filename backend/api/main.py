"""
PflegeAI FastAPI Server
"""
import os
import sys
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

from agents.resident_agent import process_resident_request, classify_urgency
from tools.supabase_tools import (
    get_all_residents,
    get_staff_on_duty,
    get_pending_alerts,
    get_resident_info,
    create_alert,
    update_alert_status,
)

app = FastAPI(
    title="PflegeAI API",
    description="AI-powered nursing home communication system",
    version="0.1.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class VoiceRequest(BaseModel):
    resident_name: str
    transcript: str


class VoiceResponse(BaseModel):
    response: str
    urgency: int
    resident_name: str
    transcript: str
    alert_created: bool = True


class AlertUpdate(BaseModel):
    alert_id: str
    status: str
    resolution_notes: Optional[str] = None


class QuickAlert(BaseModel):
    resident_name: str
    message: str
    urgency: int


# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "pflegeai"}


# Voice processing endpoint (main AI feature)
@app.post("/api/voice", response_model=VoiceResponse)
async def process_voice(request: VoiceRequest):
    """
    Process a voice transcript from a resident.
    This is the main AI endpoint that:
    1. Analyzes what the resident needs
    2. Classifies urgency
    3. Creates an alert
    4. Returns a response for the resident
    """
    try:
        result = await process_resident_request(
            resident_name=request.resident_name,
            transcript=request.transcript
        )
        return VoiceResponse(
            response=result["response"],
            urgency=result["urgency"],
            resident_name=result["resident_name"],
            transcript=result["transcript"],
            alert_created=True
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Quick urgency classification (no full AI processing)
@app.post("/api/classify")
async def classify_request(request: VoiceRequest):
    """Quick urgency classification without full AI processing"""
    urgency = classify_urgency(request.transcript)
    return {
        "urgency": urgency,
        "urgency_label": get_urgency_label(urgency),
        "resident_name": request.resident_name
    }


def get_urgency_label(urgency: int) -> str:
    if urgency >= 9:
        return "🔴 NOTFALL"
    elif urgency >= 7:
        return "🟠 HOCH"
    elif urgency >= 4:
        return "🟡 MITTEL"
    else:
        return "🟢 NIEDRIG"


# Residents
@app.get("/api/residents")
async def list_residents():
    """Get all residents"""
    return get_all_residents.invoke({})


@app.get("/api/residents/{name}")
async def get_resident(name: str):
    """Get a specific resident by name"""
    return get_resident_info.invoke({"resident_name": name})


# Staff
@app.get("/api/staff/on-duty")
async def list_staff_on_duty():
    """Get staff currently on duty"""
    return get_staff_on_duty.invoke({})


# Alerts
@app.get("/api/alerts")
async def list_alerts():
    """Get all pending/active alerts"""
    return get_pending_alerts.invoke({})


@app.post("/api/alerts")
async def create_quick_alert(request: QuickAlert):
    """Create an alert manually (without AI processing)"""
    return create_alert.invoke({
        "resident_name": request.resident_name,
        "message": request.message,
        "transcript": f"[Manueller Alert] {request.message}",
        "urgency": request.urgency
    })


@app.patch("/api/alerts/{alert_id}")
async def update_alert(alert_id: str, update: AlertUpdate):
    """Update alert status"""
    return update_alert_status.invoke({
        "alert_id": alert_id,
        "new_status": update.status,
        "resolution_notes": update.resolution_notes
    })


# Demo endpoint for testing
@app.post("/api/demo/simulate-voice")
async def simulate_voice():
    """
    Simulate a voice request from Maria Schmidt for demo purposes.
    """
    demo_requests = [
        ("Maria Schmidt", "Hallo? Kann mir bitte jemand helfen? Ich möchte aufstehen."),
        ("Hans Müller", "Ich hätte gerne ein Glas Wasser bitte."),
        ("Helga Braun", "Au, mein Rücken tut so weh! Bitte helfen Sie mir!"),
        ("Ingrid Weber", "Ist jemand da? Ich fühle mich heute etwas einsam."),
    ]
    
    import random
    resident, transcript = random.choice(demo_requests)
    
    result = await process_resident_request(resident, transcript)
    return {
        "demo": True,
        **result
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
