'use client';

import { Scale, FileText, Shield, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * AGB (Terms of Service) Page
 * Design: Linear/Vercel dark theme
 */

export default function AGBPage() {
  const sections = [
    {
      title: '§ 1 Geltungsbereich',
      content: `Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der PflegeAI GmbH i.G. 
("PflegeAI", "wir") und Pflegeeinrichtungen ("Kunde", "Sie") über die Nutzung unserer KI-gestützten 
Pflegeassistenz-Software.

Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir stimmen ihrer Geltung 
ausdrücklich schriftlich zu.`
    },
    {
      title: '§ 2 Leistungsbeschreibung',
      content: `PflegeAI stellt eine Software-as-a-Service (SaaS) Lösung bereit, die folgende Kernfunktionen umfasst:

• KI-gestützte Spracherkennung und -verarbeitung von Bewohneranfragen
• Automatische Priorisierung und Kategorisierung von Anfragen
• Zuweisung an verfügbares Pflegepersonal
• Dokumentation und Analyse von Pflegeanfragen

Der genaue Funktionsumfang richtet sich nach dem gewählten Tarifplan.`
    },
    {
      title: '§ 3 Vertragsschluss',
      content: `Der Vertrag kommt durch schriftliche Auftragsbestätigung oder Freischaltung des Zugangs zur 
PflegeAI-Plattform zustande.

Für das Pilot-Programm gelten gesonderte Teilnahmebedingungen, die bei Aufnahme in das Programm 
mitgeteilt werden.`
    },
    {
      title: '§ 4 Nutzungsrechte',
      content: `Wir räumen dem Kunden für die Vertragslaufzeit ein nicht-exklusives, nicht übertragbares Recht 
zur Nutzung der PflegeAI-Software ein.

Der Kunde darf die Software nur für den eigenen Geschäftsbetrieb nutzen. Eine Unterlizenzierung 
oder Weitergabe an Dritte ist ohne unsere ausdrückliche Zustimmung nicht gestattet.`
    },
    {
      title: '§ 5 Pflichten des Kunden',
      content: `Der Kunde verpflichtet sich:

• Die Zugangsdaten vertraulich zu behandeln und vor unbefugtem Zugriff zu schützen
• Die Software nur bestimmungsgemäß zu nutzen
• Uns unverzüglich über Sicherheitsvorfälle oder Missbrauch zu informieren
• Die geltenden Datenschutzbestimmungen einzuhalten
• Das Pflegepersonal in der Nutzung der Software zu schulen`
    },
    {
      title: '§ 6 Datenschutz',
      content: `Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und im 
Einklang mit der DSGVO.

Wir schließen mit jedem Kunden einen Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO ab. 
Die Daten werden ausschließlich auf Servern in Deutschland verarbeitet.`
    },
    {
      title: '§ 7 Vergütung',
      content: `Die Vergütung richtet sich nach der bei Vertragsschluss gültigen Preisliste. Alle Preise 
verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.

Die Abrechnung erfolgt monatlich im Voraus. Bei Zahlungsverzug sind wir berechtigt, den Zugang 
zur Software vorübergehend zu sperren.`
    },
    {
      title: '§ 8 Haftung',
      content: `Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, 
Körper oder Gesundheit.

Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten 
(Kardinalpflichten), begrenzt auf den vertragstypischen, vorhersehbaren Schaden.

Die Haftung für mittelbare Schäden und entgangenen Gewinn ist bei leichter Fahrlässigkeit ausgeschlossen.`
    },
    {
      title: '§ 9 Verfügbarkeit',
      content: `Wir bemühen uns um eine Verfügbarkeit der Software von 99,5% im Jahresmittel. Geplante 
Wartungsarbeiten werden mindestens 48 Stunden im Voraus angekündigt.

Ausfallzeiten aufgrund von Umständen außerhalb unseres Einflussbereichs (höhere Gewalt, 
Störungen bei Drittanbietern) bleiben bei der Berechnung der Verfügbarkeit unberücksichtigt.`
    },
    {
      title: '§ 10 Laufzeit und Kündigung',
      content: `Der Vertrag wird auf unbestimmte Zeit geschlossen und kann von beiden Seiten mit einer Frist 
von einem Monat zum Monatsende gekündigt werden.

Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.

Bei Vertragsende werden alle Kundendaten innerhalb von 30 Tagen gelöscht, sofern keine 
gesetzlichen Aufbewahrungspflichten entgegenstehen.`
    },
    {
      title: '§ 11 Schlussbestimmungen',
      content: `Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.

Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Berlin, 
sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches 
Sondervermögen ist.

Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der 
übrigen Bestimmungen unberührt.`
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
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
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                AGB
              </h1>
              <p className="text-zinc-500 mt-1">Allgemeine Geschäftsbedingungen</p>
            </div>
          </div>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Stand: Februar 2025. Diese Bedingungen regeln die Nutzung der PflegeAI-Plattform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
          {/* Table of Contents */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8 mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Inhaltsverzeichnis</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a 
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-sm text-zinc-400 hover:text-blue-400 transition-colors py-1"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div 
              key={index}
              id={`section-${index + 1}`}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-blue-500/20 transition-colors p-8 scroll-mt-24"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
              <div className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </div>
          ))}

          {/* Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mt-12">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-medium mb-1">Rechtlicher Hinweis</p>
                <p className="text-amber-300/80 text-sm">
                  Diese AGB befinden sich im Entwurfsstadium und werden vor dem produktiven Einsatz von 
                  PflegeAI rechtlich geprüft und finalisiert. Pilot-Partner erhalten gesonderte Vereinbarungen.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center pt-8">
            <p className="text-zinc-500">
              Fragen zu unseren Geschäftsbedingungen?{' '}
              <a href="mailto:legal@pflegeai.de" className="text-blue-400 hover:text-blue-300 transition-colors">
                legal@pflegeai.de
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
