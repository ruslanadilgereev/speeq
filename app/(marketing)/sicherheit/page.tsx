'use client';

import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  FileCheck, 
  CheckCircle,
  ArrowRight,
  Globe,
  Key,
  Database,
  AlertTriangle,
  Fingerprint,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SicherheitPage() {
  return (
    <div className="bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Gradient orbs - drifting */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[100px] animate-drift-2" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">Sicherheit & Datenschutz</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95]">
              <span className="text-white">Ihre Daten sind bei uns</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                sicher.
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Gesundheitsdaten verdienen höchsten Schutz. PflegeAI wurde von Grund auf 
              mit Datenschutz by Design entwickelt — für den deutschen Markt.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustBadge
              icon={<Shield className="h-7 w-7" />}
              title="DSGVO-konform"
              description="Vollständige Einhaltung der EU-Datenschutzverordnung"
            />
            <TrustBadge
              icon={<Server className="h-7 w-7" />}
              title="Deutsche Server"
              description="Alle Daten werden ausschließlich in Deutschland verarbeitet"
            />
            <TrustBadge
              icon={<Lock className="h-7 w-7" />}
              title="Ende-zu-Ende"
              description="Verschlüsselung aller Daten während Übertragung und Speicherung"
            />
            <TrustBadge
              icon={<FileCheck className="h-7 w-7" />}
              title="ISO 27001"
              description="Zertifiziertes Informationssicherheits-Management"
            />
          </div>
        </div>
      </section>

      {/* Data Flow Visualization */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Datensicherheit</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              So schützen wir Ihre Daten.
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Transparenz über jeden Schritt des Datenflusses
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <SecurityStep
              number="01"
              title="Erfassung"
              description="Sprachanfragen werden lokal auf dem Gerät vorverarbeitet. Nur notwendige Daten verlassen das Gerät — verschlüsselt."
              features={[
                'Lokale Vorverarbeitung',
                'Minimale Datenübertragung',
                'TLS 1.3 Verschlüsselung'
              ]}
            />
            <SecurityStep
              number="02"
              title="Verarbeitung"
              description="Die KI-Verarbeitung erfolgt auf deutschen Servern. Keine Daten verlassen die EU. Keine Weitergabe an Dritte."
              features={[
                'Deutsche Rechenzentren',
                'Keine US-Cloud-Dienste',
                'Eigene KI-Infrastruktur'
              ]}
            />
            <SecurityStep
              number="03"
              title="Speicherung"
              description="Daten werden verschlüsselt gespeichert mit strikten Zugriffskontrollen. Automatische Löschung nach konfigurierbarer Zeit."
              features={[
                'AES-256 Verschlüsselung',
                'Rollenbasierte Zugriffskontrolle',
                'Automatische Datenlöschung'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Detailed Security Features */}
      <section className="relative py-32 bg-gradient-to-b from-[#0a0a0b] to-[#0c0c0e]">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] -translate-y-1/2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Technische Maßnahmen</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Sicherheit auf allen Ebenen.
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Mehrschichtige Sicherheitsarchitektur zum Schutz sensibler Gesundheitsdaten.
              </p>

              <div className="mt-12 space-y-8">
                <SecurityFeature
                  icon={<Key className="h-5 w-5" />}
                  title="Verschlüsselung"
                  description="AES-256 für Daten im Ruhezustand, TLS 1.3 für Daten in Übertragung. Keine unverschlüsselten Daten — niemals."
                />
                <SecurityFeature
                  icon={<Eye className="h-5 w-5" />}
                  title="Zugriffskontrolle"
                  description="Rollenbasiertes Berechtigungssystem. Jeder Zugriff wird protokolliert. Zwei-Faktor-Authentifizierung für alle Benutzer."
                />
                <SecurityFeature
                  icon={<Database className="h-5 w-5" />}
                  title="Datenisolation"
                  description="Strenge Mandantentrennung. Ihre Daten sind physisch und logisch von anderen Kunden isoliert."
                />
                <SecurityFeature
                  icon={<AlertTriangle className="h-5 w-5" />}
                  title="Monitoring"
                  description="24/7 Sicherheitsüberwachung. Automatische Erkennung und Abwehr von Bedrohungen. Sofortige Benachrichtigung bei Anomalien."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  Compliance & Zertifizierungen
                </h3>
                <div className="space-y-1">
                  <ComplianceItem name="DSGVO" status="Vollständig konform" />
                  <ComplianceItem name="ISO 27001" status="Zertifiziert" />
                  <ComplianceItem name="BSI C5" status="In Prüfung" />
                  <ComplianceItem name="Auftragsverarbeitungsvertrag" status="Standard" />
                  <ComplianceItem name="Technische & Org. Maßnahmen" status="Dokumentiert" />
                </div>
                
                <div className="mt-8 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <p className="text-sm text-zinc-500">
                    Alle Compliance-Dokumente stehen unseren Kunden zur Verfügung. 
                    Auf Anfrage führen wir gerne ein Security-Audit durch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DSGVO Rights */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Betroffenenrechte</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ihre DSGVO-Rechte
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Wir unterstützen Sie bei der Ausübung aller Betroffenenrechte
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GDPRRight
              title="Recht auf Auskunft"
              description="Jederzeit Auskunft über gespeicherte Daten anfordern"
            />
            <GDPRRight
              title="Recht auf Berichtigung"
              description="Fehlerhafte Daten korrigieren lassen"
            />
            <GDPRRight
              title="Recht auf Löschung"
              description="Vollständige Löschung aller Daten auf Anfrage"
            />
            <GDPRRight
              title="Recht auf Einschränkung"
              description="Verarbeitung bestimmter Daten einschränken"
            />
            <GDPRRight
              title="Recht auf Datenübertragbarkeit"
              description="Export aller Daten in maschinenlesbarem Format"
            />
            <GDPRRight
              title="Widerspruchsrecht"
              description="Der Verarbeitung jederzeit widersprechen"
            />
          </div>
        </div>
      </section>

      {/* Data Location */}
      <section className="relative py-32">
        {/* Gradient orb */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Datenstandort</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white tracking-tight">
                100% Made in Germany
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Alle Daten werden ausschließlich in deutschen Rechenzentren verarbeitet 
                und gespeichert. Keine Datenübermittlung in Drittländer.
              </p>

              <ul className="mt-8 space-y-4">
                <DataLocationItem text="Rechenzentren in Frankfurt und München" />
                <DataLocationItem text="Georedundante Backups innerhalb Deutschlands" />
                <DataLocationItem text="Keine US-amerikanischen Cloud-Dienste" />
                <DataLocationItem text="Kein Zugriff durch ausländische Behörden möglich" />
              </ul>
            </div>

            <div className="relative">
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-6">
                  <Globe className="h-10 w-10 text-emerald-400" />
                </div>
                <div className="text-7xl mb-6">🇩🇪</div>
                <h3 className="text-2xl font-bold text-white mb-2">Deutschland</h3>
                <p className="text-zinc-400">
                  Entwickelt, gehostet und betrieben<br />in Deutschland
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Fingerprint className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-zinc-300">Kontakt</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Fragen zur Sicherheit?
          </h2>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Unser Datenschutzteam steht Ihnen für alle Fragen zur Verfügung. 
            Wir führen gerne ein Security-Assessment durch.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:datenschutz@pflegeai.de">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                Datenschutzbeauftragten kontaktieren
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-6 rounded-full">
                Demo ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function TrustBadge({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all">
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}

function SecurityStep({
  number,
  title,
  description,
  features,
}: {
  number: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-full group-hover:border-emerald-500/20 transition-colors">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl font-bold bg-gradient-to-br from-emerald-400/30 to-teal-400/30 bg-clip-text text-transparent">{number}</span>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-zinc-400 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SecurityFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

function ComplianceItem({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-zinc-300">{name}</span>
      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
        {status}
      </span>
    </div>
  );
}

function GDPRRight({ title, description }: { title: string; description: string }) {
  return (
    <div className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/20 hover:bg-white/[0.05] transition-all">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <CheckCircle className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}

function DataLocationItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
      <span className="text-zinc-300">{text}</span>
    </li>
  );
}
