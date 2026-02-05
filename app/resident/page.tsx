'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Mic, MicOff, ArrowLeft, Settings, Loader2, User, Bot, AlertCircle } from 'lucide-react';

/**
 * Bewohner Chat Interface
 * Inspired by Suna/Kortix - Clean, Professional B2B Design
 */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  priority?: number;
}

export default function ResidentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Guten Tag! Ich bin PflegeAI, Ihr digitaler Assistent. Wie kann ich Ihnen helfen? Sie können mir schreiben oder sprechen.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'de-DE';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after voice input
        setTimeout(() => handleSend(transcript), 300);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setError('Mikrofon-Zugriff wurde verweigert. Bitte erlauben Sie den Zugriff in Ihren Browser-Einstellungen.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = async (overrideMessage?: string) => {
    const messageText = overrideMessage || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: { room: '214' }
        }),
      });

      if (!response.ok) {
        throw new Error('Verbindung fehlgeschlagen');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        priority: data.priority,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }

    } catch (err) {
      setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Spracherkennung wird von Ihrem Browser nicht unterstützt.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    handleSend(text);
  };

  const getPriorityBadge = (priority?: number) => {
    if (!priority) return null;
    if (priority >= 9) return <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Notfall</span>;
    if (priority >= 7) return <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">Dringend</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0f]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              PflegeAI
            </h1>
            <p className="text-gray-500 text-xs">Zimmer 214 • Online</p>
          </div>
          <Link href="/staff" className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1a1a24] text-gray-100 border border-white/10'
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {getPriorityBadge(message.priority)}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#1a1a24] border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-gray-400 text-sm">PflegeAI denkt nach...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Actions */}
      <div className="border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { emoji: '🚰', text: 'Ich hätte gerne Wasser' },
              { emoji: '🚽', text: 'Ich muss auf Toilette' },
              { emoji: '💊', text: 'Ich brauche mein Medikament' },
              { emoji: '🛏️', text: 'Hilfe beim Aufstehen' },
              { emoji: '🆘', text: 'Notfall - Ich brauche sofort Hilfe!' },
            ].map((action) => (
              <button
                key={action.text}
                onClick={() => handleQuickAction(action.text)}
                disabled={isLoading}
                className="flex-shrink-0 px-4 py-2 bg-[#1a1a24] hover:bg-[#252532] border border-white/10 rounded-full text-sm transition-colors disabled:opacity-50"
              >
                <span className="mr-2">{action.emoji}</span>
                {action.text.split(' ').slice(0, 3).join(' ')}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-full transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#1a1a24] text-gray-400 hover:text-white hover:bg-[#252532] border border-white/10'
              }`}
              title={isListening ? 'Aufnahme stoppen' : 'Spracheingabe'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Ich höre zu...' : 'Schreiben Sie Ihre Nachricht...'}
              disabled={isLoading || isListening}
              className="flex-1 bg-[#1a1a24] border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
