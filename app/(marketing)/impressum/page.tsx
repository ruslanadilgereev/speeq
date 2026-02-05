'use client';

import { Building2, Mail, Phone, Globe, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Impressum (Legal Notice) Page
 * Design: Linear/Vercel dark theme
 */

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Impressum
              </h1>
              <p className="text-zinc-500 mt-1">Angaben gemäß § 5 TMG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
          {/* Company Info */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">Anbieter</h2>
            </div>
            
            <div className="space-y-4 text-zinc-400">
              <p className="text-lg text-white font-medium">PflegeAI GmbH i.G.</p>
              <p>
                Musterstraße 123<br />
                10115 Berlin<br />
                Deutschland
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Kontakt</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">E-Mail</p>
                  <a href="mailto:kontakt@pflegeai.de" className="text-white hover:text-violet-400 transition-colors">
                    kontakt@pflegeai.de
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Web</p>
                  <span className="text-white">www.pflegeai.de</span>
                </div>
              </div>
            </div>
          </div>

          {/* Responsible */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Vertretungsberechtigter Geschäftsführer</h2>
            <p className="text-zinc-400">
              Die Geschäftsführung wird nach Eintragung der GmbH hier benannt.
            </p>
          </div>

          {/* Registration */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Registereintrag</h2>
            <div className="text-zinc-400 space-y-2">
              <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
              <p>Registernummer: HRB [folgt nach Eintragung]</p>
              <p>USt-IdNr.: DE [folgt nach Erteilung]</p>
            </div>
          </div>

          {/* Liability */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Haftungsausschluss</h2>
            
            <div className="space-y-6 text-zinc-400">
              <div>
                <h3 className="text-white font-medium mb-2">Haftung für Inhalte</h3>
                <p className="text-sm leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                  Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Haftung für Links</h3>
                <p className="text-sm leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Urheberrecht</h3>
                <p className="text-sm leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <p className="text-amber-300 text-sm">
              <strong>Hinweis:</strong> PflegeAI GmbH befindet sich derzeit in Gründung. 
              Die vollständigen rechtlichen Angaben werden nach Abschluss der Registrierung ergänzt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
