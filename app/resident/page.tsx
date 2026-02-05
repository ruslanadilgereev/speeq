'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, Heart, Volume2, CheckCircle, Loader2 } from 'lucide-react';

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

type Status = 'idle' | 'listening' | 'processing' | 'sent' | 'help_coming';

export default function ResidentPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [transcript, setTranscript] = useState('');
  const [lastMessage, setLastMessage] = useState('');
  const [nurseResponse, setNurseResponse] = useState('');
  
  // Simulated responses for demo
  const demoResponses = [
    "Guten Tag! Ich habe Ihre Nachricht erhalten. Eine Pflegekraft kommt in wenigen Minuten zu Ihnen.",
    "Ihre Anfrage wurde weitergeleitet. Anna ist bereits auf dem Weg zu Zimmer 214.",
    "Ich verstehe, dass Sie Hilfe brauchen. Thomas wird gleich bei Ihnen sein.",
  ];

  const handleHelpButton = () => {
    setStatus('listening');
    setTranscript('');
    
    // Simulate voice recording (in real app: use Web Speech API or Whisper)
    setTimeout(() => {
      setStatus('processing');
      
      // Simulate AI processing
      setTimeout(() => {
        setLastMessage('Hilfe angefordert');
        setNurseResponse(demoResponses[Math.floor(Math.random() * demoResponses.length)]);
        setStatus('help_coming');
        
        // Reset after 10 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 10000);
      }, 2000);
    }, 3000);
  };

  const handleQuickHelp = (type: string) => {
    setStatus('processing');
    setLastMessage(type);
    
    setTimeout(() => {
      setNurseResponse(demoResponses[Math.floor(Math.random() * demoResponses.length)]);
      setStatus('help_coming');
      
      setTimeout(() => {
        setStatus('idle');
      }, 10000);
    }, 1500);
  };

  const handleCancel = () => {
    setStatus('idle');
    setTranscript('');
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
        
        {/* Status Display */}
        {status === 'idle' && (
          <>
            {/* Main Help Button - Very Large, Obvious */}
            <button
              onClick={handleHelpButton}
              className="w-64 h-64 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 
                         shadow-2xl shadow-red-900/50 transition-all duration-200
                         flex flex-col items-center justify-center gap-4
                         border-4 border-red-400 animate-pulse-slow"
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
                  onClick={() => handleQuickHelp('Ich hätte gerne Wasser')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">🚽</span>}
                  label="Toilette"
                  onClick={() => handleQuickHelp('Ich muss auf Toilette')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">💊</span>}
                  label="Medikament"
                  onClick={() => handleQuickHelp('Ich brauche mein Medikament')}
                />
                <QuickButton 
                  icon={<span className="text-3xl">🛏️</span>}
                  label="Aufstehen"
                  onClick={() => handleQuickHelp('Ich möchte aufstehen')}
                />
              </div>
            </div>
          </>
        )}

        {/* Listening State */}
        {status === 'listening' && (
          <div className="text-center space-y-8">
            <div className="w-48 h-48 rounded-full bg-green-600 mx-auto
                          flex items-center justify-center animate-pulse
                          border-4 border-green-400 shadow-2xl shadow-green-900/50">
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
            <div className="w-48 h-48 rounded-full bg-blue-600 mx-auto
                          flex items-center justify-center
                          border-4 border-blue-400 shadow-2xl">
              <Loader2 className="w-24 h-24 animate-spin" />
            </div>
            <div>
              <p className="text-3xl font-bold">Wird verarbeitet...</p>
              <p className="text-xl text-blue-200 mt-2">Einen Moment bitte</p>
            </div>
          </div>
        )}

        {/* Help Coming State */}
        {status === 'help_coming' && (
          <div className="text-center space-y-8 max-w-md">
            <div className="w-48 h-48 rounded-full bg-green-600 mx-auto
                          flex items-center justify-center
                          border-4 border-green-400 shadow-2xl shadow-green-900/50">
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

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
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
      className="h-24 bg-blue-800 hover:bg-blue-700 active:bg-blue-900 
                 rounded-2xl flex flex-col items-center justify-center gap-2
                 border-2 border-blue-600 transition-colors"
    >
      {icon}
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
}
