'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Lightbulb, Target, Rocket, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

/**
 * Über uns Page - Honest version without fake data
 */

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Über uns</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Pflege verdient bessere Werkzeuge
          </h1>
          <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            PflegeAI entsteht aus der Überzeugung, dass Technologie Pflegekräfte unterstützen soll — 
            nicht ersetzen. Wir bauen Tools, die Zeit zurückgeben für das, was zählt: die Menschen.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <MissionCard
              icon={<Heart className="h-6 w-6" />}
              title="Unsere Mission"
              description="Pflegekräfte von administrativer Last befreien, damit sie sich auf Bewohner konzentrieren können."
            />
            <MissionCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Unser Ansatz"
              description="KI als Werkzeug, nicht als Ersatz. Einfache Bedienung. Datenschutz ohne Kompromisse."
            />
            <MissionCard
              icon={<Target className="h-6 w-6" />}
              title="Unser Ziel"
              description="Jede Pflegeeinrichtung soll Zugang zu smarter Assistenz haben — unabhängig von der Größe."
            />
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Das Problem, das wir lösen
            </h2>
          </div>
          
          <div className="prose prose-lg prose-slate mx-auto">
            <p>
              In deutschen Pflegeheimen klingeln jeden Tag hunderte Mal die Rufanlagen. 
              Pflegekräfte laufen von Zimmer zu Zimmer, ohne zu wissen, ob jemand nur ein 
              Glas Wasser möchte oder einen echten Notfall hat.
            </p>
            <p>
              <strong>Das Ergebnis:</strong> Stress für das Personal, längere Wartezeiten für Bewohner, 
              und am Ende des Tages fehlt oft die Dokumentation für die MDK-Prüfung.
            </p>
            <p>
              PflegeAI setzt genau hier an: Ein einfaches Sprachsystem, das Anfragen aufnimmt, 
              automatisch priorisiert und dokumentiert. Keine komplizierte Technik — 
              nur ein Tablet oder Smartwatch und eine KI, die versteht, was Bewohner brauchen.
            </p>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 mb-8">
            <Rocket className="h-4 w-4" />
            <span className="text-sm font-medium">Early Stage Startup</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Wir sind gerade erst am Anfang
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            PflegeAI befindet sich in der Entwicklung. Wir suchen Pflegeeinrichtungen, 
            die mit uns die Zukunft der Pflege gestalten wollen.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StatusItem label="Status" value="Entwicklung" />
            <StatusItem label="Suchen" value="Pilotpartner" />
            <StatusItem label="Standort" value="Deutschland" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Interesse an einer Zusammenarbeit?
          </h2>
          <p className="mt-6 text-xl text-teal-100 max-w-2xl mx-auto">
            Wir suchen Pflegeeinrichtungen für erste Pilotprojekte. 
            Keine Kosten, keine Verpflichtungen — nur die Chance, etwas Neues mitzugestalten.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 text-lg px-8 py-6 rounded-2xl">
                <Mail className="mr-2 h-5 w-5" />
                Kontakt aufnehmen
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-2xl">
                Demo ansehen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MissionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-teal-600">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
