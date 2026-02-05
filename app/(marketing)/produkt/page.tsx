'use client';

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
  TrendingUp,
  Sparkles,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProduktPage() {
  return (
    <div className="bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px]" />
        
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
              <Activity className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-zinc-300">Produktübersicht</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95]">
              <span className="text-white">Die komplette Plattform für</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                moderne Pflege
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Von der Anfrage bis zur Dokumentation — PflegeAI verbindet Bewohner 
              und Pflegekräfte durch intelligente Technologie.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resident">
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                  <Play className="mr-2 h-4 w-4" />
                  Demo starten
                </Button>
              </Link>
              <Link href="/preise">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-6 rounded-full">
                  Preise ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Visual Flow */}
      <section className="relative py-32 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">So funktioniert's</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Von der Anfrage zur Erledigung
              <br />
              <span className="text-zinc-500">in Sekunden.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              number="01"
              icon={<Mic className="h-6 w-6" />}
              title="Anfrage sprechen"
              description="Bewohner drückt einen Knopf und spricht seine Anfrage — natürlich und unkompliziert."
            />
            <StepCard
              number="02"
              icon={<Brain className="h-6 w-6" />}
              title="KI analysiert"
              description="Unsere KI versteht den Kontext und bestimmt automatisch die Dringlichkeit."
            />
            <StepCard
              number="03"
              icon={<Bell className="h-6 w-6" />}
              title="Team wird benachrichtigt"
              description="Die richtige Pflegekraft erhält sofort eine Benachrichtigung auf ihr Gerät."
            />
            <StepCard
              number="04"
              icon={<ClipboardList className="h-6 w-6" />}
              title="Automatisch dokumentiert"
              description="Alles wird für MDK-Prüfungen und Qualitätsmanagement festgehalten."
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="relative py-32 bg-gradient-to-b from-[#0a0a0b] to-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Kernfunktionen</span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Alles, was Ihre Einrichtung braucht.
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
                'Funktioniert auch bei leiser Sprache',
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
                'Lernfähiges System verbessert sich'
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
                'Funktioniert auf allen Geräten'
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
      <section className="relative py-32 bg-[#0f0f11] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Flexibler Einsatz</span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Funktioniert auf
                <br />
                <span className="text-zinc-500">jedem Gerät.</span>
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
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
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 rounded-3xl blur-2xl" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Integrationen</h3>
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
      <section className="relative py-32 bg-gradient-to-b from-[#0f0f11] to-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 rounded-3xl blur-xl" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="space-y-6">
                    <StatBlock label="Durchschn. Reaktionszeit" value="2:34 min" trend="-45%" trendUp={false} />
                    <StatBlock label="Anfragen heute" value="47" trend="+12%" trendUp={true} />
                    <StatBlock label="Bewohner-Zufriedenheit" value="4.8/5" trend="+0.3" trendUp={true} />
                    <StatBlock label="Team-Auslastung" value="73%" trend="optimal" neutral />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Analyse & Einblicke</span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Datenbasierte
                <br />
                <span className="text-zinc-500">Entscheidungen.</span>
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
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
      <section className="relative py-32 bg-[#0a0a0b] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            Bereit, PflegeAI in Aktion zu sehen?
          </h2>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Vereinbaren Sie eine kostenlose Demo und entdecken Sie, wie PflegeAI 
            Ihren Pflegealltag transformieren kann.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Demo-Anfrage">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                Demo vereinbaren
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/preise">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-6 rounded-full">
                Preise ansehen
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

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 group-hover:border-violet-500/20 transition-colors h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
            {icon}
          </div>
          <span className="text-4xl font-bold text-zinc-800 group-hover:text-violet-900/50 transition-colors">{number}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
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
    <div className={`relative rounded-3xl p-8 lg:p-10 ${
      highlighted 
        ? 'bg-gradient-to-br from-violet-600 to-fuchsia-700' 
        : 'bg-zinc-900/50 border border-white/5'
    }`}>
      {highlighted && (
        <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-3xl blur opacity-30" />
      )}
      
      <div className={`relative z-10 h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
        highlighted 
          ? 'bg-white/20 text-white' 
          : 'bg-violet-500/10 text-violet-400'
      }`}>
        {icon}
      </div>
      
      <h3 className={`relative z-10 text-2xl font-bold mb-4 ${highlighted ? 'text-white' : 'text-white'}`}>
        {title}
      </h3>
      
      <p className={`relative z-10 mb-6 ${highlighted ? 'text-violet-100' : 'text-zinc-400'}`}>
        {description}
      </p>
      
      <ul className="relative z-10 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              highlighted ? 'text-violet-200' : 'text-violet-400'
            }`} />
            <span className={highlighted ? 'text-white' : 'text-zinc-300'}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeviceCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="text-center group">
      <div className="h-16 w-16 rounded-2xl bg-zinc-900/80 text-violet-400 flex items-center justify-center mx-auto mb-3 border border-white/10 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all">
        {icon}
      </div>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
}

function IntegrationItem({ name, status }: { name: string; status: string }) {
  const isAvailable = status === 'Verfügbar';
  const isIntegratable = status === 'Integrierbar';
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-zinc-300">{name}</span>
      <span className={`text-sm px-3 py-1 rounded-full ${
        isAvailable 
          ? 'bg-emerald-500/20 text-emerald-400' 
          : isIntegratable
          ? 'bg-violet-500/20 text-violet-400'
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
    <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-white/5">
      <div>
        <div className="text-sm text-zinc-500">{label}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className={`text-sm font-medium px-3 py-1 rounded-full ${
        neutral 
          ? 'bg-zinc-700/50 text-zinc-400'
          : trendUp 
          ? 'bg-emerald-500/20 text-emerald-400' 
          : 'bg-rose-500/20 text-rose-400'
      }`}>
        {!neutral && (trendUp ? '↑' : '↓')} {trend}
      </div>
    </div>
  );
}

function AnalyticsFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-violet-500" />
      <span className="text-zinc-300">{text}</span>
    </li>
  );
}
