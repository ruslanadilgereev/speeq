'use client';

import { useState } from 'react';
import { Mic, MicOff, Phone, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

/**
 * Bewohner-Ansicht / Resident View
 * 
 * UX Principles Applied:
 * - Large touch targets (min 64px)
 * - High contrast (white on dark blue)
 * - Minimal options (3 main actions max)
 * - Clear visual + audio feedback
 * - Simple, familiar layout
 * - Large, legible fonts (20px+)
 */

type Status = 'idle' | 'listening' | 'processing' | 'sent' | 'help_coming' | 'error';

export default function ResidentPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [lastMessage, setLastMessage] = useState('');
  const [nurseResponse, setNurseResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Send message to AI backend
  const sendToAI = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context: {
            room: '214', // In real app: get from user session
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Verbindung fehlgeschlagen');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI API error:', error);
      throw error;
    }
  };

  const handleHelpButton = async () => {
    setStatus('listening');
    setErrorMessage('');
    
    // Simulate voice recording for 3 seconds
    // In production: use Web Speech API or Whisper
    setTimeout(async () => {
      setStatus('processing');
      setLastMessage('Ich brauche Hilfe');
      
      try {
        const aiResponse = await sendToAI('Ich brauche Hilfe. Bitte kommen Sie zu mir.');
        setNurseResponse(aiResponse);
        setStatus('help_coming');
        
        // Reset after 15 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 15000);
      } catch (error) {
        setErrorMessage('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    }, 3000);
  };

  const handleQuickHelp = async (type: string, message: string) => {
    setStatus('processing');
    setLastMessage(type);
    setErrorMessage('');
    
    try {
      const aiResponse = await sendToAI(message);
      setNurseResponse(aiResponse);
      setStatus('help_coming');
      
      setTimeout(() => {
        setStatus('idle');
      }, 15000);
    } catch (error) {
      setErrorMessage('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleCancel = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">
      {/* Header - Simple, clear */}
      <header className="p-6 text-center border-b border-blue-800">
        <h1 className="text-2xl font-bold">PflegeAI</h1>
        <p className="text-blue-200 text-lg mt-1">Ihr Assistent im Pflegeheim</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        
        {/* Idle State */}
        {status === 'idle' && (
          <>
            {/* Main Help Button - Very Large, Obvious */}
            <button
              onClick={handleHelpButton}
              className="w-64 h-64 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-2xl shadow-red-900/50 transition-all duration-200 flex flex-col items-center justify-center gap-4 border-4 border-red-400"
              aria-label="Hilfe rufen"
            >
              <Mic className="w-20 h-20" />
              <span className="text-3xl font-bold">HILFE</span>
              <span className="text-lg">Drücken & Sprechen</span>
            </button>

            {/* Quick Actions - Common Requests */}
            <div className="w-full max-w-md space-y-4 mt-8">
              <p className="text-center text-blue-200 text-lg mb-4">
                Oder wählen Sie direkt:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <QuickButton 
                  icon={<span className="text-3xl">🚰</span>}
                  label="Wasser"
                  onClick={() => handleQuickHelp('Wasser', 'Ich hätte gerne ein Glas Wasser.')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">🚽</span>}
                  label="Toilette"
                  onClick={() => handleQuickHelp('Toilettengang', 'Ich muss dringend auf die Toilette und brauche Hilfe.')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">💊</span>}
                  label="Medikament"
                  onClick={() => handleQuickHelp('Medikament', 'Ich brauche mein Medikament.')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">🛏️</span>}
                  label="Aufstehen"
                  onClick={() => handleQuickHelp('Aufstehen', 'Ich möchte aufstehen und brauche Hilfe.')}
                />
              </div>
            </div>
          </>
        )}

        {/* Listening State */}
        {status === 'listening' && (
          <div className="text-center space-y-8">
            <div className="w-48 h-48 rounded-full bg-green-600 mx-auto flex items-center justify-center animate-pulse border-4 border-green-400 shadow-2xl shadow-green-900/50">
              <Mic className="w-24 h-24" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">Ich höre zu...</p>
              <p className="text-xl text-blue-200 mt-2">Sprechen Sie jetzt</p>
            </div>
            <button
              onClick={handleCancel}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-2xl text-xl"
            >
              Abbrechen
            </button>
          </div>
        )}

        {/* Processing State */}
        {status === 'processing' && (
          <div className="text-center space-y-8">
            <div className="w-48 h-48 rounded-full bg-blue-600 mx-auto flex items-center justify-center border-4 border-blue-400 shadow-2xl">
              <Loader2 className="w-24 h-24 animate-spin" />
            </div>
            <div>
              <p className="text-3xl font-bold">Wird verarbeitet...</p>
              <p className="text-xl text-blue-200 mt-2">Einen Moment bitte</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="text-center space-y-8 max-w-md">
            <div className="w-48 h-48 rounded-full bg-orange-600 mx-auto flex items-center justify-center border-4 border-orange-400 shadow-2xl">
              <AlertTriangle className="w-24 h-24" />
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">Fehler</p>
              <p className="text-xl text-blue-200 mt-4 leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 rounded-2xl text-xl"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Help Coming State */}
        {status === 'help_coming' && (
          <div className="text-center space-y-8 max-w-md">
            <div className="w-48 h-48 rounded-full bg-green-600 mx-auto flex items-center justify-center border-4 border-green-400 shadow-2xl shadow-green-900/50">
              <CheckCircle className="w-24 h-24" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">Hilfe kommt!</p>
              <p className="text-xl text-blue-200 mt-4 leading-relaxed">
                {nurseResponse}
              </p>
            </div>
            {lastMessage && (
              <div className="bg-blue-800/50 rounded-2xl p-4 mt-4">
                <p className="text-blue-300 text-sm">Ihre Anfrage:</p>
                <p className="text-lg">"{lastMessage}"</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer - Emergency Call */}
      <footer className="p-6 border-t border-blue-800">
        <button
          className="w-full py-4 px-6 bg-red-800 hover:bg-red-700 rounded-2xl
                     flex items-center justify-center gap-3 text-xl font-medium"
        >
          <Phone className="w-6 h-6" />
          <span>Notfall: Direkt anrufen</span>
        </button>
      </footer>

    </div>
  );
}

function QuickButton({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-24 bg-blue-800 hover:bg-blue-700 active:bg-blue-900 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-blue-600 transition-colors"
    >
      {icon}
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
}
