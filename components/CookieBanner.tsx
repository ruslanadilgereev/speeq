'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X, Settings2, Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'pflegeai-cookie-consent';

type ConsentState = 'pending' | 'accepted' | 'declined' | 'custom';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent(parsed.consent);
        setPreferences(parsed.preferences);
      } catch {
        setConsent('pending');
      }
    } else {
      setConsent('pending');
    }
  }, []);

  const saveConsent = (newConsent: ConsentState, prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      consent: newConsent,
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setConsent(newConsent);
    setPreferences(prefs);
  };

  const handleAcceptAll = () => {
    saveConsent('accepted', {
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleDecline = () => {
    saveConsent('declined', {
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent('custom', preferences);
    setShowDetails(false);
  };

  // Don't render until we've checked localStorage
  if (consent === null || consent !== 'pending') {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6 animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 blur-xl rounded-3xl" />
        
        {/* Main banner */}
        <div className="relative rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Gradient top border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          
          <div className="p-5 sm:p-6">
            {!showDetails ? (
              // Simple view
              <>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                    <Cookie className="h-5 w-5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-1">
                      Cookie-Einstellungen
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Wir nutzen Cookies, um Ihre Erfahrung zu verbessern. Sie können wählen, welche 
                      Sie akzeptieren.{' '}
                      <Link 
                        href="/datenschutz" 
                        className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 group"
                      >
                        Datenschutz
                        <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20 font-medium"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1 border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/20"
                  >
                    Nur notwendige
                  </Button>
                  <Button
                    onClick={() => setShowDetails(true)}
                    variant="ghost"
                    className="flex-1 text-zinc-400 hover:text-white hover:bg-white/5"
                  >
                    <Settings2 className="h-4 w-4 mr-2" />
                    Anpassen
                  </Button>
                </div>
              </>
            ) : (
              // Detailed view
              <>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                      <Settings2 className="h-5 w-5 text-violet-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Cookie-Einstellungen anpassen</h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary */}
                  <CookieOption
                    title="Notwendige Cookies"
                    description="Erforderlich für grundlegende Funktionen wie Anmeldung und Sicherheit."
                    checked={preferences.necessary}
                    disabled
                    icon={<Shield className="h-4 w-4" />}
                  />

                  {/* Analytics */}
                  <CookieOption
                    title="Analyse-Cookies"
                    description="Helfen uns zu verstehen, wie die Seite genutzt wird."
                    checked={preferences.analytics}
                    onChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                  />

                  {/* Marketing */}
                  <CookieOption
                    title="Marketing-Cookies"
                    description="Werden für personalisierte Werbung verwendet."
                    checked={preferences.marketing}
                    onChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20 font-medium"
                  >
                    Auswahl speichern
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    variant="outline"
                    className="flex-1 border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/20"
                  >
                    Alle akzeptieren
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieOption({
  title,
  description,
  checked,
  disabled,
  onChange,
  icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
        checked
          ? 'border-violet-500/30 bg-violet-500/5'
          : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
      } ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-violet-500 border-violet-500'
              : 'border-white/20 bg-transparent'
          } ${disabled ? 'border-zinc-600' : ''}`}
        >
          {checked && (
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-violet-400">{icon}</span>}
          <span className="font-medium text-white text-sm">{title}</span>
          {disabled && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">
              Erforderlich
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 mt-1">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
    </label>
  );
}
