import { Metadata } from 'next';
import { 
  Mic, 
  Brain, 
  Bell, 
  ClipboardList, 
  BarChart3, 
  Smartphone,
  Watch,
  Monitor,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  Activity,
  MessageSquare,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Produkt - PflegeAI',
  description: 'Entdecken Sie die Funktionen von PflegeAI: Sprachgesteuerte Anfragen, KI-Priorisierung, Echtzeit-Dashboard und automatische Dokumentation.',
};

export default function ProduktPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/50 mb-8">
              <Activity className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Produktübersicht</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Die komplette Plattform für{' '}
              <span className="text-teal-600">moderne Pflege</span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Von der Anfrage bis zur Dokumentation — PflegeAI verbindet Bewohner 
              und Pflegekräfte durch intelligente Technologie.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resident">
                <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-2xl shadow-xl shadow-teal-600/20">
                  Demo starten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/preise">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-slate-300">
                  Preise ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Visual Flow */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">So funktioniert's</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
              Von der Anfrage zur Erledigung in Sekunden
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <StepCard
              number="01"
              icon={<Mic className="h-6 w-6" />}
              title="Anfrage sprechen"
              description="Bewohner drückt einen Knopf und spricht seine Anfrage — natürlich und unkompliziert."
              color="teal"
            />
            <StepCard
              number="02"
              icon={<Brain className="h-6 w-6" />}
              title="KI analysiert"
              description="Unsere KI versteht den Kontext und bestimmt automatisch die Dringlichkeit."
              color="emerald"
            />
            <StepCard
              number="03"
              icon={<Bell className="h-6 w-6" />}
              title="Team wird benachrichtigt"
              description="Die richtige Pflegekraft erhält sofort eine Benachrichtigung auf ihr Gerät."
              color="cyan"
            />
            <StepCard
              number="04"
              icon={<ClipboardList className="h-6 w-6" />}
              title="Automatisch dokumentiert"
              description="Alles wird für MDK-Prüfungen und Qualitätsmanagement festgehalten."
              color="sky"
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Kernfunktionen</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
              Alles, was Ihre Einrichtung braucht
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature 1: Voice Interface */}
            <FeatureBlock
              icon={<MessageSquare className="h-8 w-8" />}
              title="Natürliche Sprachinteraktion"
              description="Bewohner sprechen einfach ihre Wünsche aus. Unsere KI versteht natürliche Sprache, Dialekte und undeutliche Aussprache."
              features={[
                'Deutsche Sprache mit Dialektverständnis',
                'Funktioniert auch bei leiser oder undeutlicher Sprache',
                'Sofortige Bestätigung an den Bewohner',
                'Nachfragen bei Unklarheiten'
              ]}
            />

            {/* Feature 2: Smart Prioritization */}
            <FeatureBlock
              icon={<Zap className="h-8 w-8" />}
              title="Intelligente Priorisierung"
              description="Nicht jede Anfrage ist gleich dringend. PflegeAI erkennt den Unterschied und sortiert automatisch."
              features={[
                '"Notfall" wird sofort eskaliert',
                'Medizinische Anfragen werden priorisiert',
                'Routineanfragen werden effizient eingeplant',
                'Lernfähiges System verbessert sich kontinuierlich'
              ]}
              highlighted
            />

            {/* Feature 3: Real-time Dashboard */}
            <FeatureBlock
              icon={<Monitor className="h-8 w-8" />}
              title="Echtzeit-Dashboard"
              description="Ihr Team hat alle offenen Anfragen im Blick — priorisiert, übersichtlich und auf allen Geräten verfügbar."
              features={[
                'Live-Übersicht aller Anfragen',
                'Farbcodierte Prioritäten',
                'Status-Updates in Echtzeit',
                'Funktioniert auf Tablet, Smartphone und Desktop'
              ]}
            />

            {/* Feature 4: Documentation */}
            <FeatureBlock
              icon={<FileText className="h-8 w-8" />}
              title="Automatische Dokumentation"
              description="Keine manuelle Dokumentation mehr. Jede Anfrage und Reaktion wird automatisch protokolliert."
              features={[
                'Vollständige Anfrage-Historie',
                'Reaktionszeiten werden erfasst',
                'Export für MDK-Prüfungen',
                'DSGVO-konforme Datenhaltung'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-teal-400 tracking-wider uppercase">Flexibler Einsatz</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
                Funktioniert auf jedem Gerät
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                PflegeAI passt sich Ihrer Infrastruktur an — nicht umgekehrt. 
                Nutzen Sie vorhandene Hardware oder erweitern Sie mit neuen Geräten.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <DeviceCard icon={<Watch className="h-8 w-8" />} label="Smartwatch" />
                <DeviceCard icon={<Smartphone className="h-8 w-8" />} label="Smartphone" />
                <DeviceCard icon={<Monitor className="h-8 w-8" />} label="Tablet/Desktop" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700">
                <div className="space-y-4">
                  <IntegrationItem name="Bestehendes Klingelsystem" status="Integrierbar" />
                  <IntegrationItem name="MEDIFOX / Connext Vivendi" status="In Entwicklung" />
                  <IntegrationItem name="iOS & Android Apps" status="Verfügbar" />
                  <IntegrationItem name="Web-Dashboard" status="Verfügbar" />
                  <IntegrationItem name="API für Eigenentwicklung" status="Verfügbar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <StatBlock label="Durchschn. Reaktionszeit" value="2:34 min" trend="-45%" trendUp={false} />
                  <StatBlock label="Anfragen heute" value="47" trend="+12%" trendUp={true} />
                  <StatBlock label="Bewohner-Zufriedenheit" value="4.8/5" trend="+0.3" trendUp={true} />
                  <StatBlock label="Team-Auslastung" value="73%" trend="optimal" neutral />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Analyse & Einblicke</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
                Datenbasierte Entscheidungen treffen
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Verstehen Sie, was in Ihrer Einrichtung passiert. Identifizieren Sie 
                Engpässe, optimieren Sie Abläufe und verbessern Sie die Versorgung.
              </p>

              <ul className="mt-8 space-y-4">
                <AnalyticsFeature text="Reaktionszeit-Analyse nach Tageszeit" />
                <AnalyticsFeature text="Anfrage-Muster und Trends erkennen" />
                <AnalyticsFeature text="Team-Performance im Überblick" />
                <AnalyticsFeature text="Export für Qualitätsberichte" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Bereit, PflegeAI in Aktion zu sehen?
          </h2>
          <p className="mt-6 text-xl text-teal-100 max-w-2xl mx-auto">
            Vereinbaren Sie eine kostenlose Demo und entdecken Sie, wie PflegeAI 
            Ihren Pflegealltag transformieren kann.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Demo-Anfrage">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal-700 hover:bg-teal-50 text-lg px-8 py-6 rounded-2xl shadow-xl">
                Demo vereinbaren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/preise">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-white/30 text-white hover:bg-white/10">
                Preise ansehen
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

function StepCard({
  number,
  icon,
  title,
  description,
  color,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'teal' | 'emerald' | 'cyan' | 'sky';
}) {
  const colorClasses = {
    teal: 'from-teal-500 to-teal-600 shadow-teal-500/25',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
    cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/25',
    sky: 'from-sky-500 to-sky-600 shadow-sky-500/25',
  };

  return (
    <div className="relative">
      {/* Connector line (hidden on first item) */}
      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent -translate-y-1/2 last:hidden" />
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-200 transition-all h-full">
        <div className="flex items-start justify-between mb-6">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} text-white flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
          <span className="text-4xl font-bold text-slate-100">{number}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function FeatureBlock({
  icon,
  title,
  description,
  features,
  highlighted,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-3xl p-8 lg:p-10 ${
      highlighted 
        ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' 
        : 'bg-white border border-slate-200 shadow-sm'
    }`}>
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
        highlighted 
          ? 'bg-white/20 text-white' 
          : 'bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600'
      }`}>
        {icon}
      </div>
      
      <h3 className={`text-2xl font-bold mb-4 ${highlighted ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      
      <p className={`mb-6 ${highlighted ? 'text-teal-100' : 'text-slate-600'}`}>
        {description}
      </p>
      
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              highlighted ? 'text-teal-200' : 'text-teal-500'
            }`} />
            <span className={highlighted ? 'text-white' : 'text-slate-700'}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeviceCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="h-16 w-16 rounded-2xl bg-slate-800 text-teal-400 flex items-center justify-center mx-auto mb-3 border border-slate-700">
        {icon}
      </div>
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
}

function IntegrationItem({ name, status }: { name: string; status: string }) {
  const isAvailable = status === 'Verfügbar';
  const isIntegratable = status === 'Integrierbar';
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
      <span className="text-slate-300">{name}</span>
      <span className={`text-sm px-3 py-1 rounded-full ${
        isAvailable 
          ? 'bg-emerald-500/20 text-emerald-400' 
          : isIntegratable
          ? 'bg-teal-500/20 text-teal-400'
          : 'bg-amber-500/20 text-amber-400'
      }`}>
        {status}
      </span>
    </div>
  );
}

function StatBlock({ 
  label, 
  value, 
  trend, 
  trendUp,
  neutral 
}: { 
  label: string; 
  value: string; 
  trend: string; 
  trendUp?: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
      </div>
      <div className={`text-sm font-medium px-2 py-1 rounded ${
        neutral 
          ? 'bg-slate-100 text-slate-600'
          : trendUp 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-rose-100 text-rose-700'
      }`}>
        {!neutral && (trendUp ? '↑' : '↓')} {trend}
      </div>
    </div>
  );
}

function AnalyticsFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-teal-500" />
      <span className="text-slate-700">{text}</span>
    </li>
  );
}
