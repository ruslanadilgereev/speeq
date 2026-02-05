'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Brain, Users, CheckCircle, Phone, Sparkles, Activity, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * PflegeAI Landing Page
 * Aesthetic: Clinical Precision — Premium healthcare B2B
 * NO generic blue gradients. YES distinctive, memorable design.
 */

export default function HomePage() {
  return (
    <main className="bg-[#fafbfc] min-h-screen overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafbfc]/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full border-2 border-[#fafbfc] animate-pulse" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Pflege<span className="text-teal-600">AI</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Funktionen</a>
              <a href="#security" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Sicherheit</a>
              <Link href="/staff" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                  Anmelden
                </Button>
              </Link>
              <Link href="/resident">
                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 shadow-lg shadow-slate-900/10">
                  Demo starten
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Copy */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/50 mb-8">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">KI-gestützte Pflegeassistenz</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Pflege
                <span className="relative mx-3">
                  <span className="relative z-10 text-teal-600">neu</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-teal-200" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0 8 Q25 0 50 8 T100 8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                gedacht.
              </h1>
              
              <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-xl">
                PflegeAI verbindet Bewohner und Pflegekräfte durch intelligente Sprachassistenz. 
                <span className="text-slate-900 font-medium"> Automatische Priorisierung</span> sorgt dafür, 
                dass Ihr Team immer weiß, wo Hilfe am dringendsten benötigt wird.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/resident">
                  <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-2xl shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 transition-all group">
                    Bewohner-Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/staff">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all">
                    Personal-Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <StatPill icon={<Shield className="h-4 w-4" />} label="DSGVO-konform" />
                <StatPill icon={<CheckCircle className="h-4 w-4" />} label="Deutsche Server" />
                <StatPill icon={<Zap className="h-4 w-4" />} label="< 2s Antwortzeit" />
              </div>
            </div>
            
            {/* Right: Visual */}
            <div className="relative lg:h-[600px]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="94%" label="Schnellere Reaktion" />
            <StatItem value="3.2h" label="Zeitersparnis/Tag" />
            <StatItem value="100%" label="Anfragen dokumentiert" />
            <StatItem value="4.9★" label="Bewohner-Zufriedenheit" />
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 lg:py-32 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Das Problem</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Wertvolle Zeit geht verloren
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
              Pflegekräfte verbringen zu viel Zeit mit Koordination statt mit Menschen.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-red-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform" />
              <div className="relative bg-white rounded-3xl p-10 shadow-xl shadow-rose-500/5 border border-rose-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                    <span className="text-2xl">😰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Ohne PflegeAI</h3>
                </div>
                <ul className="space-y-5">
                  <ProblemItem text="Klingel zeigt nicht, wer dringend Hilfe braucht" />
                  <ProblemItem text="Pflegekräfte laufen unnötige Wege" />
                  <ProblemItem text="Bewohner warten lange auf einfache Anfragen" />
                  <ProblemItem text="Keine Dokumentation von Anfragen für MDK" />
                </ul>
              </div>
            </div>
            
            {/* After */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform" />
              <div className="relative bg-white rounded-3xl p-10 shadow-xl shadow-teal-500/5 border border-teal-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-teal-100 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Mit PflegeAI</h3>
                </div>
                <ul className="space-y-5">
                  <SolutionItem text="KI priorisiert: Notfall vor Wasserglas" />
                  <SolutionItem text="Gezielte Zuweisung an verfügbare Pflegekräfte" />
                  <SolutionItem text="Bewohner erhalten sofort Bestätigung" />
                  <SolutionItem text="Automatische Dokumentation & Analyse" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">So funktioniert's</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Drei Schritte zur besseren Pflege
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              icon={<Brain className="h-7 w-7" />}
              title="Sprechen"
              description="Bewohner drücken einen Knopf und sprechen ihre Anfrage. Die KI versteht natürliche Sprache in Deutsch."
            />
            <FeatureCard
              number="02"
              icon={<Clock className="h-7 w-7" />}
              title="Priorisieren"
              description="Die KI analysiert Dringlichkeit und Kontext. Notfälle werden sofort eskaliert, Routine wird eingeplant."
            />
            <FeatureCard
              number="03"
              icon={<Users className="h-7 w-7" />}
              title="Zuweisen"
              description="Das richtige Teammitglied wird benachrichtigt. Alles wird automatisch für Prüfungen dokumentiert."
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 lg:py-32 bg-slate-900" id="security">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-teal-400 tracking-wider uppercase">Datenschutz</span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Höchste Sicherheitsstandards
              </h2>
              <p className="mt-6 text-xl text-slate-400 leading-relaxed">
                Wir wissen, dass Gesundheitsdaten sensibel sind. Deshalb setzen wir auf 
                Datenschutz by Design — entwickelt für den deutschen Markt.
              </p>
              
              <div className="mt-12 grid gap-6">
                <SecurityItem icon={<Shield />} title="DSGVO-konforme Verarbeitung" description="Alle Prozesse entsprechen der europäischen Datenschutz-Grundverordnung." />
                <SecurityItem icon={<CheckCircle />} title="Deutsche Server" description="Ihre Daten verlassen niemals die Bundesrepublik Deutschland." />
                <SecurityItem icon={<Zap />} title="Ende-zu-Ende-Verschlüsselung" description="Kommunikation ist vollständig verschlüsselt, auch für uns unlesbar." />
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-slate-800 rounded-3xl p-12 border border-slate-700">
                  <div className="text-center">
                    <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-emerald-400">
                      100%
                    </div>
                    <div className="mt-4 text-xl text-slate-300">Made in Germany</div>
                    <div className="mt-2 text-slate-500">Entwickelt · Gehostet · Betrieben</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200/50 mb-8">
            <Phone className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">Kostenlose Demo</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Bereit für bessere Pflege?
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            Vereinbaren Sie eine kostenlose Demo und sehen Sie, wie PflegeAI 
            Ihren Pflegealltag transformieren kann.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Demo-Anfrage">
              <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-2xl shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 transition-all group">
                <Phone className="mr-2 h-5 w-5" />
                Demo vereinbaren
              </Button>
            </Link>
            <Link href="/staff">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all group">
                Dashboard testen
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-slate-500">
            Keine Kreditkarte erforderlich • 14 Tage kostenlos • Jederzeit kündbar
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Pflege<span className="text-teal-400">AI</span>
              </span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="mailto:kontakt@pflegeai.de" className="hover:text-white transition-colors">Kontakt</a>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} PflegeAI GmbH
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function HeroVisual() {
  const [activeRequest, setActiveRequest] = useState(0);
  const requests = [
    { room: '214', text: 'Ich hätte gerne ein Glas Wasser', priority: 'normal', time: '14:32' },
    { room: '118', text: 'Hilfe beim Aufstehen benötigt', priority: 'medium', time: '14:31' },
    { room: '305', text: 'Notfall - Sturz im Bad!', priority: 'high', time: '14:30' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRequest((prev) => (prev + 1) % requests.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-200/40 via-emerald-200/30 to-cyan-200/20 rounded-full blur-3xl" />
      
      {/* Main device mockup */}
      <div className="relative">
        {/* Tablet frame */}
        <div className="w-[340px] h-[480px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl shadow-slate-900/30">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] overflow-hidden border border-slate-700/50">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-slate-800/50">
              <span className="text-xs text-slate-400">14:32</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-slate-500 rounded-sm relative">
                  <div className="absolute inset-[2px] bg-emerald-400 rounded-[1px]" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">PflegeAI</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Station A • Aktiv
                  </div>
                </div>
              </div>
            </div>
            
            {/* Request list */}
            <div className="p-4 space-y-3">
              {requests.map((req, i) => (
                <div 
                  key={i}
                  className={`
                    p-4 rounded-2xl border transition-all duration-500
                    ${i === activeRequest 
                      ? 'bg-teal-500/10 border-teal-500/30 scale-[1.02]' 
                      : 'bg-slate-800/50 border-slate-700/30 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-medium
                      ${req.priority === 'high' ? 'bg-rose-500/20 text-rose-400' : 
                        req.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-slate-600/50 text-slate-300'}
                    `}>
                      Zimmer {req.room}
                    </span>
                    <span className="text-xs text-slate-500">{req.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-1">{req.text}</p>
                  {req.priority === 'high' && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-rose-400">
                      <Zap className="h-3 w-3" />
                      Sofortige Bearbeitung erforderlich
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating notification */}
        <div 
          className="absolute -top-6 -right-12 bg-white rounded-2xl shadow-2xl shadow-slate-900/20 p-4 w-56 animate-float border border-slate-100"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">Neue Anfrage</p>
              <p className="text-xs text-slate-500 mt-0.5">Zi. 305 • Priorität: HOCH</p>
            </div>
          </div>
        </div>
        
        {/* Floating stats */}
        <div 
          className="absolute -bottom-4 -left-16 bg-white rounded-2xl shadow-2xl shadow-slate-900/20 p-4 animate-float border border-slate-100"
          style={{ animationDelay: '1s' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-xs text-slate-500">Anfragen heute</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function StatPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="text-teal-600">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

function ProblemItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 rounded-full bg-rose-400 flex-shrink-0" />
      <span className="text-slate-700">{text}</span>
    </li>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="mt-0.5 h-5 w-5 text-teal-500 flex-shrink-0" />
      <span className="text-slate-700">{text}</span>
    </li>
  );
}

function FeatureCard({ 
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
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-slate-200 transition-all">
        <div className="flex items-start justify-between mb-6">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/25">
            {icon}
          </div>
          <span className="text-5xl font-bold text-slate-100 group-hover:text-teal-100 transition-colors">{number}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SecurityItem({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-12 w-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-slate-400">{description}</p>
      </div>
    </div>
  );
}
