import { NextRequest, NextResponse } from 'next/server';

/**
 * Chat API - Connects to Google Gemini for AI responses
 * Used by the resident interface for voice/text queries
 */

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

// System prompt for the care assistant
const SYSTEM_PROMPT = `Du bist PflegeAI, ein freundlicher und professioneller Assistent in einem Pflegeheim.

DEINE AUFGABEN:
1. Nimm Anfragen von Bewohnern entgegen (Toilettengang, Wasser, Medikamente, Hilfe beim Aufstehen, etc.)
2. Antworte beruhigend und bestätigend
3. Erkläre kurz, dass eine Pflegekraft informiert wurde
4. Bei Notfällen (Sturz, Atemnot, Schmerzen) reagiere sofort und versichere, dass Hilfe kommt

WICHTIGE REGELN:
- Sprich immer Deutsch
- Verwende "Sie" (höfliche Anrede)
- Halte Antworten kurz und klar (max 2-3 Sätze)
- Sei einfühlsam und respektvoll
- Nenne keine konkreten Zeitangaben ("in 2 Minuten") - sage stattdessen "gleich" oder "in Kürze"

BEISPIEL-ANTWORTEN:
- "Ich habe Ihre Anfrage erhalten. Eine Pflegekraft ist informiert und kommt gleich zu Ihnen."
- "Das tut mir leid zu hören. Hilfe ist bereits auf dem Weg. Bleiben Sie ruhig."
- "Selbstverständlich! Eine Pflegekraft bringt Ihnen gleich ein Glas Wasser."`;

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Build conversation history for context
    const contents = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: 'Verstanden. Ich bin PflegeAI und helfe Bewohnern im Pflegeheim.' }]
      }
    ];

    // Add context if provided (room, resident name, etc.)
    if (context?.room) {
      contents.push({
        role: 'user',
        parts: [{ text: `[System: Der Bewohner ist in Zimmer ${context.room}${context.residentName ? `, Name: ${context.residentName}` : ''}]` }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Notiert.' }]
      });
    }

    // Add the actual user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 256,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      return NextResponse.json(
        { error: 'AI service error' },
        { status: 502 }
      );
    }

    const data = await response.json();
    
    // Extract the response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      console.error('No response from Gemini:', data);
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 502 }
      );
    }

    // Classify priority based on message content
    const priority = classifyPriority(message);

    return NextResponse.json({
      response: aiResponse,
      priority,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Simple keyword-based priority classification
 * In production, this would be done by AI with more context
 */
function classifyPriority(message: string): number {
  const lowerMessage = message.toLowerCase();
  
  // Emergency keywords - Priority 9-10
  const emergency = ['notfall', 'hilfe', 'sturz', 'gefallen', 'hingefallen', 'atemnot', 'atem', 'schmerz', 'blut', 'bewusstlos', 'nicht bewegen'];
  if (emergency.some(word => lowerMessage.includes(word))) {
    return lowerMessage.includes('notfall') || lowerMessage.includes('atemnot') ? 10 : 9;
  }
  
  // Urgent keywords - Priority 6-8
  const urgent = ['toilette', 'wc', 'dringend', 'schmerzen', 'medikament', 'aufstehen', 'hinsetzen'];
  if (urgent.some(word => lowerMessage.includes(word))) {
    return lowerMessage.includes('dringend') ? 8 : 7;
  }
  
  // Medium priority - 4-5
  const medium = ['essen', 'kalt', 'warm', 'decke', 'fenster', 'licht'];
  if (medium.some(word => lowerMessage.includes(word))) {
    return 5;
  }
  
  // Low priority - 1-3
  const low = ['wasser', 'trinken', 'frage', 'wissen', 'einsam', 'langeweile'];
  if (low.some(word => lowerMessage.includes(word))) {
    return 3;
  }
  
  // Default medium-low
  return 4;
}
