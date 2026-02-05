import { Metadata } from 'next';
import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  FileCheck, 
  Building2,
  CheckCircle,
  ArrowRight,
  Globe,
  Key,
  Database,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sicherheit & Datenschutz - PflegeAI',
  description: 'Erfahren Sie, wie PflegeAI Ihre Daten schützt. DSGVO-konform, deutsche Server, Ende-zu-Ende-Verschlüsselung.',
};

export default function SicherheitPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/50 mb-8">
              <Shield className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Sicherheit & Datenschutz</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Ihre Daten sind bei uns{' '}
              <span className="text-teal-600">sicher</span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Gesundheitsdaten verdienen höchsten Schutz. PflegeAI wurde von Grund auf 
              mit Datenschutz by Design entwickelt — für den deutschen Markt.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <TrustBadge
              icon={<Shield className="h-8 w-8" />}
              title="DSGVO-konform"
              description="Vollständige Einhaltung der EU-Datenschutzverordnung"
            />
            <TrustBadge
              icon={<Server className="h-8 w-8" />}
              title="Deutsche Server"
              description="Alle Daten werden ausschließlich in Deutschland verarbeitet"
            />
            <TrustBadge
              icon={<Lock className="h-8 w-8" />}
              title="Ende-zu-Ende"
              description="Verschlüsselung aller Daten während Übertragung und Speicherung"
            />
            <TrustBadge
              icon={<FileCheck className="h-8 w-8" />}
              title="ISO 27001"
              description="Zertifiziertes Informationssicherheits-Management"
            />
          </div>
        </div>
      </section>

      {/* Data Flow Visualization */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              So schützen wir Ihre Daten
            </h2>
            <p className="mt-4 text-lg text-slate-600">
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
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sm font-semibold text-teal-400 tracking-wider uppercase">Technische Maßnahmen</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
                Sicherheit auf allen Ebenen
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Mehrschichtige Sicherheitsarchitektur zum Schutz sensibler Gesundheitsdaten.
              </p>

              <div className="mt-12 space-y-8">
                <SecurityFeature
                  icon={<Key />}
                  title="Verschlüsselung"
                  description="AES-256 für Daten im Ruhezustand, TLS 1.3 für Daten in Übertragung. Keine unverschlüsselten Daten — niemals."
                />
                <SecurityFeature
                  icon={<Eye />}
                  title="Zugriffskontrolle"
                  description="Rollenbasiertes Berechtigungssystem. Jeder Zugriff wird protokolliert. Zwei-Faktor-Authentifizierung für alle Benutzer."
                />
                <SecurityFeature
                  icon={<Database />}
                  title="Datenisolation"
                  description="Strenge Mandantentrennung. Ihre Daten sind physisch und logisch von anderen Kunden isoliert."
                />
                <SecurityFeature
                  icon={<AlertTriangle />}
                  title="Monitoring"
                  description="24/7 Sicherheitsüberwachung. Automatische Erkennung und Abwehr von Bedrohungen. Sofortige Benachrichtigung bei Anomalien."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6">Compliance & Zertifizierungen</h3>
                <div className="space-y-4">
                  <ComplianceItem name="DSGVO" status="Vollständig konform" />
                  <ComplianceItem name="ISO 27001" status="Zertifiziert" />
                  <ComplianceItem name="BSI C5" status="In Prüfung" />
                  <ComplianceItem name="Auftragsverarbeitungsvertrag" status="Standard" />
                  <ComplianceItem name="Technische & Org. Maßnahmen" status="Dokumentiert" />
                </div>
                
                <div className="mt-8 p-4 bg-slate-700/50 rounded-xl">
                  <p className="text-sm text-slate-400">
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Ihre DSGVO-Rechte
            </h2>
            <p className="mt-4 text-lg text-slate-600">
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

      {/* Data Location Map */}
      <section className="py-24 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Datenstandort</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
                100% Made in Germany
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Alle Daten werden ausschließlich in deutschen Rechenzentren verarbeitet 
                und gespeichert. Keine Datenübermittlung in Drittländer.
              </p>

              <ul className="mt-8 space-y-4">
                <DataLocationItem 
                  text="Rechenzentren in Frankfurt und München" 
                />
                <DataLocationItem 
                  text="Georedundante Backups innerhalb Deutschlands" 
                />
                <DataLocationItem 
                  text="Keine US-amerikanischen Cloud-Dienste" 
                />
                <DataLocationItem 
                  text="Kein Zugriff durch ausländische Behörden möglich" 
                />
              </ul>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl p-12 border border-slate-200">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-teal-600 mx-auto mb-6" />
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-600 to-emerald-600 mb-4">
                    🇩🇪
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Deutschland</h3>
                  <p className="text-slate-600">
                    Entwickelt, gehostet und betrieben in Deutschland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Fragen zur Sicherheit?
          </h2>
          <p className="mt-6 text-xl text-teal-100 max-w-2xl mx-auto">
            Unser Datenschutzteam steht Ihnen für alle Fragen zur Verfügung. 
            Wir führen gerne ein Security-Assessment durch.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:datenschutz@pflegeai.de">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal-700 hover:bg-teal-50 text-lg px-8 py-6 rounded-2xl shadow-xl">
                Datenschutzbeauftragten kontaktieren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-white/30 text-white hover:bg-white/10">
                Demo ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
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
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center hover:shadow-lg hover:border-teal-200 transition-all">
      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
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
    <div className="relative">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 h-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl font-bold text-teal-100">{number}</span>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
              <span className="text-slate-700">{feature}</span>
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

function ComplianceItem({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
      <span className="text-slate-300">{name}</span>
      <span className="text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
        {status}
      </span>
    </div>
  );
}

function GDPRRight({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
      <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
        <CheckCircle className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function DataLocationItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
      <span className="text-slate-700">{text}</span>
    </li>
  );
}
