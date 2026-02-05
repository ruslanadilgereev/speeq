"""
PflegeAI Resident Agent - Processes voice requests from residents
Uses Google Gemini 3 Flash Preview
"""
import os
import json
from typing import Optional
from dotenv import load_dotenv
from google import genai

load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
MODEL = "gemini-3-flash-preview"

# Import Supabase tools
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from tools.supabase_tools import (
    get_resident_info,
    get_all_residents,
    get_staff_on_duty,
    create_alert,
    get_pending_alerts,
)


# System prompt for the resident agent
SYSTEM_PROMPT = """Du bist PflegeAI, ein fürsorglicher KI-Assistent in einem deutschen Pflegeheim.

Deine Aufgabe bei einer Sprachnachricht eines Bewohners:
1. Verstehe was der Bewohner braucht
2. Klassifiziere die Dringlichkeit (1-10):
   - 1-3: Niedrig (Wasser, Unterhaltung, allgemeine Fragen)
   - 4-6: Mittel (Hilfe beim Aufstehen, Toilette, leichte Beschwerden)
   - 7-8: Hoch (Schmerzen, Unwohlsein, dringende Bedürfnisse)
   - 9-10: Notfall (Sturz, starke Schmerzen, Atemnot)
3. Erstelle eine kurze Zusammenfassung für die Pflegekraft
4. Formuliere eine beruhigende Antwort für den Bewohner (auf Deutsch, Sie-Form)

Antworte IMMER im folgenden JSON-Format:
{
    "urgency": <1-10>,
    "summary": "<kurze Zusammenfassung für Pflegekraft>",
    "response_to_resident": "<beruhigende Antwort für den Bewohner>",
    "category": "<kategorie: 'mobility'|'pain'|'thirst'|'toilet'|'social'|'emergency'|'other'>"
}
"""


def classify_urgency(transcript: str) -> int:
    """Quick urgency classification based on keywords"""
    transcript_lower = transcript.lower()
    
    # Emergency keywords (9-10)
    if any(word in transcript_lower for word in [
        "hilfe", "notfall", "sturz", "gefallen", "atemnot", "kann nicht atmen",
        "starke schmerzen", "bewusstlos", "blut", "herz"
    ]):
        return 9
    
    # High urgency (7-8)
    if any(word in transcript_lower for word in [
        "schmerzen", "weh", "schlecht", "übel", "schwindel", "schwach"
    ]):
        return 7
    
    # Medium urgency (4-6)
    if any(word in transcript_lower for word in [
        "toilette", "aufstehen", "hinsetzen", "hilfe", "brauche"
    ]):
        return 5
    
    # Low urgency (1-3)
    return 3


async def process_resident_request(
    resident_name: str,
    transcript: str
) -> dict:
    """
    Process a voice request from a resident using Gemini 3 Flash.
    
    Args:
        resident_name: Name of the resident making the request
        transcript: Voice-to-text transcript of what they said
    
    Returns:
        dict with response text, urgency, and alert details
    """
    # Quick urgency pre-classification
    initial_urgency = classify_urgency(transcript)
    
    # Build prompt
    prompt = f"""{SYSTEM_PROMPT}

Bewohner: {resident_name}
Sprachaufnahme (Transkript): "{transcript}"

Meine initiale Dringlichkeits-Einschätzung basierend auf Keywords: {initial_urgency}/10

Analysiere die Nachricht und antworte im JSON-Format."""

    try:
        # Call Gemini
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config={
                "temperature": 0.3,
                "response_mime_type": "application/json"
            }
        )
        
        # Parse response
        result_text = response.text.strip()
        
        # Try to parse JSON
        try:
            result = json.loads(result_text)
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            result = {
                "urgency": initial_urgency,
                "summary": f"Anfrage von {resident_name}: {transcript[:100]}",
                "response_to_resident": "Ihre Nachricht wurde empfangen. Ein Mitarbeiter kommt zu Ihnen.",
                "category": "other"
            }
        
        # Create alert in database
        alert_result = create_alert.invoke({
            "resident_name": resident_name,
            "message": result.get("summary", transcript[:100]),
            "transcript": transcript,
            "urgency": result.get("urgency", initial_urgency)
        })
        
        return {
            "response": result.get("response_to_resident", "Hilfe ist unterwegs."),
            "urgency": result.get("urgency", initial_urgency),
            "summary": result.get("summary", ""),
            "category": result.get("category", "other"),
            "resident_name": resident_name,
            "transcript": transcript,
            "alert": alert_result
        }
        
    except Exception as e:
        # Fallback on error - still create basic alert
        print(f"Error processing with Gemini: {e}")
        
        alert_result = create_alert.invoke({
            "resident_name": resident_name,
            "message": f"Anfrage: {transcript[:100]}",
            "transcript": transcript,
            "urgency": initial_urgency
        })
        
        return {
            "response": "Ihre Nachricht wurde empfangen. Jemand kommt gleich zu Ihnen.",
            "urgency": initial_urgency,
            "summary": transcript[:100],
            "category": "other",
            "resident_name": resident_name,
            "transcript": transcript,
            "alert": alert_result,
            "error": str(e)
        }


# Synchronous wrapper for non-async contexts
def process_resident_request_sync(resident_name: str, transcript: str) -> dict:
    """Synchronous version of process_resident_request"""
    import asyncio
    return asyncio.run(process_resident_request(resident_name, transcript))


# For testing
if __name__ == "__main__":
    import asyncio
    
    async def test():
        print("Testing PflegeAI Agent with Gemini 3 Flash...")
        
        test_cases = [
            ("Maria Schmidt", "Hallo? Kann mir bitte jemand helfen? Ich möchte aufstehen."),
            ("Hans Müller", "Ich hätte gerne ein Glas Wasser bitte."),
            ("Helga Braun", "Au! Mein Rücken tut so weh! Bitte helfen Sie mir!"),
        ]
        
        for name, transcript in test_cases:
            print(f"\n--- Test: {name} ---")
            print(f"Transcript: {transcript}")
            result = await process_resident_request(name, transcript)
            print(f"Urgency: {result['urgency']}/10")
            print(f"Response: {result['response']}")
            print(f"Alert: {result.get('alert', {}).get('success', False)}")
    
    asyncio.run(test())
