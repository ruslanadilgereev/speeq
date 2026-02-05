'use client';

import { Shield, Lock, Server, Eye, FileText, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Datenschutz (Privacy Policy) Page
 * Design: Linear/Vercel dark theme — consistent with rest of site
 */

export default function DatenschutzPage() {
  const sections = [
    {
      icon: <Eye className="h-5 w-5" />,
      title: '1. Datenerhebung',
      content: `Bei der Nutzung von PflegeAI werden folgende Daten verarbeitet:
      
• Sprachaufnahmen und deren Transkriptionen
• Anfrage-Metadaten (Zeitstempel, Zimmer, Priorität)
• Nutzungsdaten zur Verbesserung des Dienstes

Alle Daten werden ausschließlich für die Erbringung unserer Dienste verwendet und nicht an Dritte verkauft.`
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: '2. Datensicherheit',
      content: `Wir setzen modernste Sicherheitsmaßnahmen ein:

• Ende-zu-Ende-Verschlüsselung aller Kommunikation
• AES-256 Verschlüsselung für gespeicherte Daten
• Regelmäßige Sicherheitsaudits durch externe Prüfer
• Strenge Zugriffskontrollen und Protokollierung`
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: '3. Datenspeicherung',
      content: `Ihre Daten werden ausschließlich auf Servern in Deutschland gespeichert:

• Rechenzentren in Frankfurt am Main
• ISO 27001 zertifizierte Infrastruktur
• Daten verlassen niemals die EU
• Automatische Löschung nach Ablauf der Aufbewahrungsfrist`
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: '4. Ihre Rechte',
      content: `Nach DSGVO haben Sie folgende Rechte:

• Recht auf Auskunft über Ihre gespeicherten Daten
• Recht auf Berichtigung unrichtiger Daten
• Recht auf Löschung ("Recht auf Vergessenwerden")
• Recht auf Einschränkung der Verarbeitung
• Recht auf Datenübertragbarkeit
• Widerspruchsrecht gegen die Verarbeitung`
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]" />
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
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Datenschutz
              </h1>
              <p className="text-zinc-500 mt-1">Zuletzt aktualisiert: Februar 2025</p>
            </div>
          </div>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Der Schutz Ihrer Daten hat für uns höchste Priorität. Hier erfahren Sie, 
            wie wir mit Ihren Informationen umgehen.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors p-8"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                  <div className="text-zinc-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="relative bg-gradient-to-br from-emerald-600/20 to-teal-600/10 rounded-2xl border border-emerald-500/20 p-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Datenschutzanfragen</h2>
                <p className="text-zinc-400 mb-4">
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie uns:
                </p>
                <a 
                  href="mailto:datenschutz@pflegeai.de" 
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  datenschutz@pflegeai.de
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
