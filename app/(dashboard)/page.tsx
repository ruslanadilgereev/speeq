import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Brain, Users, CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                KI-gestützte Pflegeassistenz
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl lg:text-6xl">
                Schnellere Reaktion.
                <span className="block text-blue-600 mt-2">Bessere Pflege.</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                PflegeAI verbindet Bewohner und Pflegekräfte durch intelligente 
                Sprachassistenz. Anfragen werden automatisch priorisiert — 
                damit Ihr Team immer weiß, wo Hilfe am dringendsten benötigt wird.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/resident">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8">
                    Live-Demo testen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/requests">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    Dashboard ansehen
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>DSGVO-konform</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Deutsche Server</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              {/* Demo Preview */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-8 text-center text-white">
                    <div className="w-32 h-32 mx-auto rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold mb-2">HILFE</p>
                    <p className="text-blue-200">Drücken & Sprechen</p>
                  </div>
                  <div className="bg-blue-800/50 p-4 text-center">
                    <p className="text-sm text-blue-200">Bewohner-Ansicht — einfach & barrierefrei</p>
                  </div>
                </div>
                {/* Notification Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-sm">🔴</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Neue Anfrage: Zi. 214</p>
                      <p className="text-xs text-gray-500">Priorität: HOCH — Toilettengang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Das Problem, das wir lösen
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Pflegekräfte verbringen zu viel Zeit mit der Koordination von Anfragen. 
              PflegeAI automatisiert die Priorisierung, damit Ihr Team sich auf das 
              Wesentliche konzentrieren kann: die Pflege.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Ohne PflegeAI</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Klingel zeigt nicht, wer dringend Hilfe braucht</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Pflegekräfte laufen unnötige Wege</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Bewohner warten lange auf einfache Anfragen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Keine Dokumentation von Anfragen</span>
                </li>
              </ul>
            </div>
            
            {/* After */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Mit PflegeAI</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>KI priorisiert: Notfall vor Wasserglas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Gezielte Zuweisung an verfügbare Pflegekräfte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Bewohner erhalten sofort Bestätigung</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Automatische Dokumentation & Analyse</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              So funktioniert PflegeAI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="KI-Sprachassistenz"
              description="Bewohner sprechen ihre Anfrage einfach aus. Die KI versteht natürliche Sprache und klassifiziert automatisch."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Intelligente Priorisierung"
              description="Notfälle werden sofort eskaliert. Routineanfragen werden effizient eingeplant. Keine wichtige Anfrage geht unter."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team-Dashboard"
              description="Echtzeit-Übersicht aller Anfragen. Zuweisung per Klick. Transparente Dokumentation für MDK-Prüfungen."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Datenschutz & Sicherheit
                </h2>
                <p className="mt-4 text-lg text-blue-100 leading-relaxed">
                  Wir wissen, dass Gesundheitsdaten sensibel sind. Deshalb setzen wir 
                  auf höchste Sicherheitsstandards — entwickelt für den deutschen Markt.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span>DSGVO-konforme Datenverarbeitung</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span>Hosting auf deutschen Servern</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span>Ende-zu-Ende-Verschlüsselung</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span>Regelmäßige Sicherheitsaudits</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 lg:mt-0 flex justify-center">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold text-white">100%</div>
                  <div className="text-blue-200 mt-2">Made in Germany</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Bereit für bessere Pflege?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Vereinbaren Sie eine kostenlose Demo und sehen Sie, wie PflegeAI 
            Ihren Pflegealltag verbessern kann.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Demo vereinbaren
            </Button>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Selbst ausprobieren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Keine Kreditkarte erforderlich • 14 Tage kostenlos testen
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold">PflegeAI</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>
            <div className="text-sm">
              © 2025 PflegeAI. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </main>
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
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
