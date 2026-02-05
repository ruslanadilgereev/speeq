'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Lightbulb, Target, Rocket, Mail, Sparkles, Users, Building, Clock } from 'lucide-react';
import Link from 'next/link';

/**
 * Über uns Page - Linear/Vercel dark theme
 */

export default function UeberUnsPage() {
  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Users className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-gray-300">Über uns</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Pflege verdient</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              bessere Werkzeuge
            </span>
          </h1>
          
          <p className="mt-6 text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            PflegeAI entsteht aus der Überzeugung, dass Technologie Pflegekräfte unterstützen soll — 
            nicht ersetzen. Wir bauen Tools, die Zeit zurückgeben für das, was zählt: die Menschen.
          </p>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <MissionCard
              icon={<Heart className="h-6 w-6" />}
              title="Unsere Mission"
              description="Pflegekräfte von administrativer Last befreien, damit sie sich auf Bewohner konzentrieren können."
              gradient="from-rose-500/20 to-pink-500/20"
              iconColor="text-rose-400"
            />
            <MissionCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Unser Ansatz"
              description="KI als Werkzeug, nicht als Ersatz. Einfache Bedienung. Datenschutz ohne Kompromisse."
              gradient="from-amber-500/20 to-yellow-500/20"
              iconColor="text-amber-400"
            />
            <MissionCard
              icon={<Target className="h-6 w-6" />}
              title="Unser Ziel"
              description="Jede Pflegeeinrichtung soll Zugang zu smarter Assistenz haben — unabhängig von der Größe."
              gradient="from-violet-500/20 to-purple-500/20"
              iconColor="text-violet-400"
            />
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-violet-500/20">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Das Problem, das wir lösen
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p className="text-lg">
                  In deutschen Pflegeheimen klingeln jeden Tag hunderte Mal die Rufanlagen. 
                  Pflegekräfte laufen von Zimmer zu Zimmer, ohne zu wissen, ob jemand nur ein 
                  Glas Wasser möchte oder einen echten Notfall hat.
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white font-medium mb-2">Das Ergebnis:</p>
                  <p>
                    Stress für das Personal, längere Wartezeiten für Bewohner, 
                    und am Ende des Tages fehlt oft die Dokumentation für die MDK-Prüfung.
                  </p>
                </div>
                <p className="text-lg">
                  PflegeAI setzt genau hier an: Ein einfaches Sprachsystem, das Anfragen aufnimmt, 
                  automatisch priorisiert und dokumentiert. Keine komplizierte Technik — 
                  nur ein Tablet oder Smartwatch und eine KI, die versteht, was Bewohner brauchen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Rocket className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Early Stage Startup</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Wir sind gerade erst am Anfang
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            PflegeAI befindet sich in der Entwicklung. Wir suchen Pflegeeinrichtungen, 
            die mit uns die Zukunft der Pflege gestalten wollen.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <StatusCard icon={<Clock className="h-5 w-5" />} label="Status" value="Entwicklung" />
            <StatusCard icon={<Building className="h-5 w-5" />} label="Suchen" value="Pilotpartner" />
            <StatusCard icon={<Target className="h-5 w-5" />} label="Standort" value="Deutschland" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-12">
            Unsere Roadmap
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/50 to-transparent" />
            
            <div className="space-y-12">
              <TimelineItem 
                side="left"
                period="Q1 2026"
                title="Prototyp & Validierung"
                description="Entwicklung des MVP, erste Gespräche mit Pflegeheimen"
                active
              />
              <TimelineItem 
                side="right"
                period="Q2 2026"
                title="Pilotphase"
                description="Tests mit ersten Partnereinrichtungen, Feedback-Integration"
              />
              <TimelineItem 
                side="left"
                period="Q3 2026"
                title="Markteinführung"
                description="Öffentlicher Launch, Skalierung der Infrastruktur"
              />
              <TimelineItem 
                side="right"
                period="2027+"
                title="Wachstum"
                description="Expansion, neue Features, weitere Integrationen"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 backdrop-blur-sm border border-violet-500/20 rounded-3xl p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Interesse an einer Zusammenarbeit?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Wir suchen Pflegeeinrichtungen für erste Pilotprojekte. 
                Keine Kosten, keine Verpflichtungen — nur die Chance, etwas Neues mitzugestalten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:kontakt@pflegeai.de">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-lg shadow-white/10 transition-all hover:shadow-white/20 hover:scale-105"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Kontakt aufnehmen
                  </Button>
                </Link>
                <Link href="/resident">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
                  >
                    Demo ansehen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MissionCard({ 
  icon, 
  title, 
  description, 
  gradient,
  iconColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
  iconColor: string;
}) {
  return (
    <div className="group relative">
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 transition-colors">
        <div className={`w-12 h-12 rounded-xl bg-white/5 ${iconColor} flex items-center justify-center mb-5`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
      <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <div className="text-xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function TimelineItem({ 
  side, 
  period, 
  title, 
  description,
  active = false 
}: { 
  side: 'left' | 'right'; 
  period: string; 
  title: string; 
  description: string;
  active?: boolean;
}) {
  return (
    <div className={`relative flex items-center ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-1/2 ${side === 'left' ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
          active 
            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
            : 'bg-white/5 text-gray-500'
        }`}>
          {period}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      
      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0b] border-2 border-violet-500 z-10">
        {active && <div className="absolute inset-1 rounded-full bg-violet-500 animate-pulse" />}
      </div>
      
      <div className="w-1/2" />
    </div>
  );
}
