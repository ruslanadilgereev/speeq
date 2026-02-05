'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Sparkles, ChevronRight, Play, Mic, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

/**
 * PflegeAI Landing Page
 * Aesthetic: Linear/Vercel — Dark, bold, confident tech startup
 */

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0b]">
      {/* Hero Section — Dark with glow */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Gradient orbs - drifting animations */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[100px] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[80px] animate-drift-3" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Text content */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-sm text-zinc-300">Pilot-Programm gestartet</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] animate-fade-in-up">
                <span className="text-white">Pflege,</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
                  intelligent.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-8 text-xl sm:text-2xl text-zinc-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                KI-Sprachassistenz, die Pflegeheim-Anfragen versteht, priorisiert und zuweist. 
                Weniger Chaos, mehr Zeit für Menschen.
              </p>

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Link href="mailto:kontakt@pflegeai.de?subject=Pilot-Programm">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                    Pilot-Partner werden
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/resident">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-6 rounded-full group transition-all">
                    <Play className="mr-2 h-4 w-4" />
                    Demo ansehen
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-zinc-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-zinc-400" />
                  <span>DSGVO-konform</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">🇩🇪</span>
                  <span>Gehostet in Deutschland</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-zinc-400" />
                  <span>&lt;2s Antwortzeit</span>
                </div>
              </div>
            </div>

            {/* Right column - Product Visual */}
            <div className="animate-fade-in-up lg:pl-8" style={{ animationDelay: '0.4s' }}>
              <ProductMockup />
            </div>
          </div>
        </div>
      </section>

      {/* How it works — Clean, minimal */}
      <section className="relative py-32 bg-[#0a0a0b]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">So funktioniert's</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Drei Schritte.
              <br />
              <span className="text-zinc-500">Kein Aufwand.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              number="01"
              icon={<Mic className="h-6 w-6" />}
              title="Sprechen"
              description="Bewohner drückt einen Knopf und spricht. Natürliche Sprache, keine Menüs."
            />
            <StepCard
              number="02"
              icon={<Sparkles className="h-6 w-6" />}
              title="Verstehen"
              description="KI analysiert Kontext und Dringlichkeit. Notfall? Sofort-Eskalation."
            />
            <StepCard
              number="03"
              icon={<Users className="h-6 w-6" />}
              title="Zuweisen"
              description="Die richtige Pflegekraft wird benachrichtigt. Automatisch dokumentiert."
            />
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="relative py-32 bg-gradient-to-b from-[#0a0a0b] to-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Problem */}
            <div>
              <span className="text-sm font-semibold text-zinc-500 tracking-wider uppercase">Das Problem</span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Pflegekräfte verbringen{' '}
                <span className="text-rose-400">40%</span>{' '}
                ihrer Zeit mit Koordination.
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Klingel klingelt. Aber wer braucht wirklich Hilfe? Wer hat nur eine Frage? 
                Wer hat einen Notfall? Ohne Kontext laufen Pflegekräfte blind.
              </p>

              <ul className="mt-10 space-y-4">
                <ProblemItem text="Klingel zeigt nicht, wer dringend Hilfe braucht" />
                <ProblemItem text="Pflegekräfte laufen unnötige Wege" />
                <ProblemItem text="Keine automatische Dokumentation für MDK" />
              </ul>
            </div>

            {/* Solution */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mit PflegeAI</h3>
                </div>

                <ul className="space-y-5">
                  <SolutionItem text="KI priorisiert: Notfall vor Wasserglas" />
                  <SolutionItem text="Gezielte Zuweisung an verfügbare Pflegekraft" />
                  <SolutionItem text="Bewohner erhält sofort Bestätigung" />
                  <SolutionItem text="Automatische Dokumentation & Analyse" />
                </ul>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-sm text-zinc-400">
                    Resultat: Mehr Zeit für echte Pflege, weniger für Koordination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 bg-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Features</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Gebaut für die Pflege.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mic className="h-5 w-5" />}
              title="Natürliche Sprache"
              description="Bewohner sprechen einfach. Keine Menüs, keine Codes, keine Schulung nötig."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Echtzeit-Priorisierung"
              description="KI erkennt Dringlichkeit sofort. Notfälle werden in Sekunden eskaliert."
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Smartes Routing"
              description="Anfragen gehen an die richtige Person — basierend auf Verfügbarkeit und Skills."
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="24/7 Verfügbar"
              description="Das System schläft nie. Jede Anfrage wird erfasst und verarbeitet."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="MDK-ready"
              description="Automatische Dokumentation jeder Interaktion. Audit-sicher und vollständig."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Lernfähig"
              description="Das System lernt aus Feedback und wird mit der Zeit besser für Ihre Einrichtung."
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="relative py-32 bg-gradient-to-b from-[#0f0f11] to-[#0a0a0b]" id="security">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Datenschutz</span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ihre Daten bleiben bei Ihnen.
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Gesundheitsdaten sind sensibel. Deshalb: Deutsche Server, Ende-zu-Ende-Verschlüsselung, 
                DSGVO-konforme Verarbeitung. Kein Wenn und Aber.
              </p>

              <div className="mt-12 space-y-6">
                <SecurityItem title="DSGVO-konform" description="Alle Prozesse entsprechen der europäischen Datenschutz-Grundverordnung." />
                <SecurityItem title="Deutsche Server" description="Ihre Daten verlassen niemals Deutschland. Punkt." />
                <SecurityItem title="E2E-Verschlüsselung" description="Kommunikation ist vollständig verschlüsselt, auch für uns unlesbar." />
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
                  <div className="text-8xl lg:text-9xl font-bold bg-gradient-to-br from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="mt-4 text-2xl font-semibold text-white">Made in Germany</div>
                  <div className="mt-2 text-zinc-500">Entwickelt · Gehostet · Betrieben</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-[#0a0a0b] overflow-hidden">
        {/* Glow - drifting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px] animate-drift-3" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            Bereit, Pflege neu zu denken?
          </h2>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Wir suchen Pilot-Partner, die mit uns die Zukunft der Pflege gestalten wollen. 
            Frühe Partner profitieren von bevorzugtem Support und Einfluss auf die Produktentwicklung.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Pilot-Programm">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                Pilot-Partner werden
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-6 rounded-full group transition-all">
                Demo ausprobieren
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-sm text-zinc-600">
            Fragen? kontakt@pflegeai.de
          </p>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function ProductMockup() {
  const [activeRequest, setActiveRequest] = useState(0);
  const requests = [
    { room: '214', text: 'Ich hätte gerne ein Glas Wasser', priority: 'low', time: 'Jetzt' },
    { room: '118', text: 'Brauche Hilfe beim Aufstehen', priority: 'medium', time: '2m' },
    { room: '305', text: 'Notfall — Sturz im Badezimmer', priority: 'high', time: '1m' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRequest((prev) => (prev + 1) % requests.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Glow behind mockup */}
      <div className="absolute -inset-8 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-[40px] blur-3xl" />
      
      {/* Main device */}
      <div className="relative w-full max-w-[380px] mx-auto">
        <div className="bg-zinc-950 rounded-[32px] p-2 shadow-2xl border border-white/10">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-[26px] overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-xs text-zinc-500 font-medium">14:32</span>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-500">Verbunden</span>
              </div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">PflegeAI</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Station A · Live
                  </div>
                </div>
              </div>
            </div>

            {/* Request list */}
            <div className="p-4 space-y-3 min-h-[320px]">
              <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-4">
                Aktive Anfragen
              </div>
              {requests.map((req, i) => (
                <div 
                  key={i}
                  className={`
                    p-4 rounded-2xl border transition-all duration-500 cursor-pointer
                    ${i === activeRequest 
                      ? 'bg-violet-500/10 border-violet-500/30 scale-[1.02] shadow-lg shadow-violet-500/10' 
                      : 'bg-white/[0.02] border-white/5 opacity-50 hover:opacity-70'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-medium
                      ${req.priority === 'high' 
                        ? 'bg-rose-500/20 text-rose-400 animate-pulse' 
                        : req.priority === 'medium' 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'bg-zinc-700/50 text-zinc-400'
                      }
                    `}>
                      Zimmer {req.room}
                    </span>
                    <span className="text-xs text-zinc-600">{req.time}</span>
                  </div>
                  <p className="text-sm text-zinc-300">{req.text}</p>
                  {req.priority === 'high' && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-rose-400 font-medium">
                      <Zap className="h-3 w-3" />
                      Sofortige Bearbeitung
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating notification */}
        <div className="absolute -top-4 -right-8 bg-zinc-900 rounded-2xl shadow-2xl shadow-black/50 p-4 w-52 border border-white/10 animate-float">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-4 w-4 text-rose-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Neue Anfrage</p>
              <p className="text-xs text-zinc-500 mt-0.5">Zi. 305 · Priorität HOCH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ 
  number,
  icon, 
  title, 
  description 
}: { 
  number: string;
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 group-hover:border-violet-500/20 transition-colors">
        <div className="flex items-start justify-between mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
            {icon}
          </div>
          <span className="text-5xl font-bold text-zinc-800 group-hover:text-violet-900/50 transition-colors">{number}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-violet-500/20 transition-all hover:bg-zinc-900/80">
      <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function ProblemItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
      <span className="text-zinc-300">{text}</span>
    </li>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="mt-0.5 h-5 w-5 text-violet-400 flex-shrink-0" />
      <span className="text-zinc-200">{text}</span>
    </li>
  );
}

function SecurityItem({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
