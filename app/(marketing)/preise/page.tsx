import { Metadata } from 'next';
import { 
  Check, 
  X,
  ArrowRight,
  Shield,
  Phone,
  Users,
  Building2,
  Sparkles,
  ChevronDown,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preise - PflegeAI',
  description: 'Transparente Preise für PflegeAI. Wählen Sie den passenden Plan für Ihre Pflegeeinrichtung.',
};

export default function PreisePage() {
  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient orbs - drifting */}
        <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-drift-2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-zinc-300">Transparente Preise</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Der richtige Plan für</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                jede Einrichtung
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-zinc-400 leading-relaxed">
              Starten Sie mit 14 Tagen kostenlos. Keine Kreditkarte erforderlich.
              Jederzeit kündbar.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Starter */}
            <PricingCard
              name="Starter"
              description="Für kleine Pflegeheime und Wohngruppen"
              price={199}
              icon={<Users className="h-6 w-6" />}
              features={[
                { text: 'Bis zu 30 Bewohner', included: true },
                { text: 'Unbegrenzte Anfragen', included: true },
                { text: 'Basis-Priorisierung', included: true },
                { text: 'E-Mail Support', included: true },
                { text: 'Web-Dashboard', included: true },
                { text: 'Basis-Reporting', included: true },
                { text: 'API-Zugang', included: false },
                { text: 'PVS-Integration', included: false },
              ]}
              cta="14 Tage kostenlos"
              ctaHref="/sign-up?plan=starter"
            />

            {/* Professional - Highlighted */}
            <PricingCard
              name="Professional"
              description="Für mittlere bis große Einrichtungen"
              price={399}
              icon={<Building2 className="h-6 w-6" />}
              highlighted
              badge="Beliebt"
              features={[
                { text: 'Bis zu 100 Bewohner', included: true },
                { text: 'Unbegrenzte Anfragen', included: true },
                { text: 'KI-Priorisierung mit Kontext', included: true },
                { text: 'Prioritäts-Support (24h)', included: true },
                { text: 'Web + Mobile Apps', included: true },
                { text: 'Erweiterte Analytics', included: true },
                { text: 'API-Zugang', included: true },
                { text: 'MEDIFOX Integration', included: true },
              ]}
              cta="14 Tage kostenlos"
              ctaHref="/sign-up?plan=professional"
            />

            {/* Enterprise */}
            <PricingCard
              name="Enterprise"
              description="Für Träger und große Einrichtungen"
              price={null}
              priceLabel="Individuell"
              icon={<Shield className="h-6 w-6" />}
              features={[
                { text: 'Unbegrenzte Bewohner', included: true },
                { text: 'Maßgeschneiderte KI-Modelle', included: true },
                { text: 'Dedizierter Account Manager', included: true },
                { text: 'Custom Analytics & Reports', included: true },
                { text: 'Vollständiger API-Zugang', included: true },
                { text: 'Alle PVS-Integrationen', included: true },
                { text: 'White-Label Option', included: true },
                { text: 'On-Premise verfügbar', included: true },
              ]}
              cta="Kontakt aufnehmen"
              ctaHref="mailto:kontakt@pflegeai.de?subject=Enterprise-Anfrage"
              isEnterprise
            />
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-violet-400" />
              <span>DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🇩🇪</span>
              <span>Deutsche Server</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-400" />
              <span>Jederzeit kündbar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Funktionen im Vergleich
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Alle Details zu den einzelnen Paketen
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-semibold text-white">Funktion</th>
                  <th className="text-center py-4 px-6 font-semibold text-zinc-400">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-white bg-violet-500/10 rounded-t-2xl">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-zinc-400">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow 
                  feature="Bewohner-Limit" 
                  starter="30" 
                  professional="100" 
                  enterprise="Unbegrenzt" 
                />
                <ComparisonRow 
                  feature="Sprachgesteuerte Anfragen" 
                  starter={true} 
                  professional={true} 
                  enterprise={true} 
                />
                <ComparisonRow 
                  feature="KI-Priorisierung" 
                  starter="Basis" 
                  professional="Erweitert" 
                  enterprise="Maßgeschneidert" 
                />
                <ComparisonRow 
                  feature="Dashboard" 
                  starter="Web" 
                  professional="Web + Mobile" 
                  enterprise="Alle Plattformen" 
                />
                <ComparisonRow 
                  feature="API-Zugang" 
                  starter={false} 
                  professional={true} 
                  enterprise={true} 
                />
                <ComparisonRow 
                  feature="PVS-Integration" 
                  starter={false} 
                  professional="MEDIFOX" 
                  enterprise="Alle" 
                />
                <ComparisonRow 
                  feature="Support" 
                  starter="E-Mail" 
                  professional="24h Priorität" 
                  enterprise="Dediziert" 
                />
                <ComparisonRow 
                  feature="SLA" 
                  starter="99%" 
                  professional="99.5%" 
                  enterprise="99.9%" 
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#0a0a0b]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Häufig gestellte Fragen
            </h2>
          </div>

          <div className="space-y-3">
            <FaqItem 
              question="Wie funktioniert die 14-tägige Testphase?"
              answer="Sie können PflegeAI 14 Tage lang kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich. Nach Ablauf der Testphase wählen Sie einen Plan oder Ihr Account wird automatisch pausiert."
            />
            <FaqItem 
              question="Kann ich jederzeit den Plan wechseln?"
              answer="Ja, Sie können jederzeit upgraden oder downgraden. Bei einem Upgrade wird der neue Preis anteilig berechnet. Bei einem Downgrade gilt der neue Preis ab dem nächsten Abrechnungszeitraum."
            />
            <FaqItem 
              question="Was passiert mit meinen Daten bei Kündigung?"
              answer="Sie haben 30 Tage Zeit, Ihre Daten zu exportieren. Danach werden alle Daten DSGVO-konform und unwiderruflich gelöscht. Auf Wunsch stellen wir ein Löschzertifikat aus."
            />
            <FaqItem 
              question="Bieten Sie Rabatte für gemeinnützige Träger?"
              answer="Ja! Gemeinnützige Organisationen erhalten 25% Rabatt auf alle Pläne. Kontaktieren Sie uns mit einem Nachweis Ihrer Gemeinnützigkeit."
            />
            <FaqItem 
              question="Welche Hardware benötige ich?"
              answer="PflegeAI funktioniert mit jedem internetfähigen Gerät. Für die Bewohner-Schnittstelle empfehlen wir Tablets oder Smart Displays. Das Personal kann Smartphones, Tablets oder Desktop-PCs nutzen."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        {/* Gradient orb - drifting */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-drift-3" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <Phone className="h-8 w-8 text-violet-400" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Noch Fragen? Wir helfen gerne.
          </h2>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Vereinbaren Sie ein kostenloses Beratungsgespräch und finden Sie 
            den passenden Plan für Ihre Einrichtung.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Beratungsgespräch">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-base px-8 py-6 rounded-full font-semibold group transition-all hover:scale-[1.02]">
                Beratung vereinbaren
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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

function PricingCard({
  name,
  description,
  price,
  priceLabel,
  icon,
  features,
  cta,
  ctaHref,
  highlighted,
  badge,
  isEnterprise,
}: {
  name: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  icon: React.ReactNode;
  features: { text: string; included: boolean }[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  isEnterprise?: boolean;
}) {
  return (
    <div className={`relative rounded-3xl p-8 transition-all ${
      highlighted 
        ? 'bg-gradient-to-b from-violet-500/20 to-fuchsia-500/10 border border-violet-500/30 shadow-2xl shadow-violet-500/10 scale-[1.02] z-10' 
        : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
    }`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            {badge}
          </span>
        </div>
      )}

      <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${
        highlighted 
          ? 'bg-violet-500/20 text-violet-400' 
          : 'bg-white/5 text-zinc-400'
      }`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        {name}
      </h3>
      
      <p className="text-sm text-zinc-500 mb-6">
        {description}
      </p>

      <div className="mb-8">
        {price !== null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">
              €{price}
            </span>
            <span className="text-lg text-zinc-500">
              /Monat
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold text-white">
            {priceLabel}
          </span>
        )}
        <p className="text-xs text-zinc-600 mt-2">
          {isEnterprise ? 'Preise auf Anfrage' : 'zzgl. MwSt.'}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {feature.included ? (
              <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                highlighted ? 'text-violet-400' : 'text-zinc-400'
              }`} />
            ) : (
              <X className="h-4 w-4 mt-0.5 flex-shrink-0 text-zinc-700" />
            )}
            <span className={feature.included 
              ? 'text-zinc-300 text-sm'
              : 'text-zinc-600 text-sm'
            }>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Link href={ctaHref}>
        <Button 
          size="lg" 
          className={`w-full py-5 rounded-xl text-sm font-semibold transition-all ${
            highlighted
              ? 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

function ComparisonRow({
  feature,
  starter,
  professional,
  enterprise,
}: {
  feature: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}) {
  const renderValue = (value: boolean | string, isHighlighted?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`h-4 w-4 mx-auto ${isHighlighted ? 'text-violet-400' : 'text-zinc-400'}`} />
      ) : (
        <X className="h-4 w-4 text-zinc-700 mx-auto" />
      );
    }
    return <span className={isHighlighted ? 'text-white' : 'text-zinc-400'}>{value}</span>;
  };

  return (
    <tr className="border-b border-white/5">
      <td className="py-4 px-6 text-zinc-400">{feature}</td>
      <td className="py-4 px-6 text-center">{renderValue(starter)}</td>
      <td className="py-4 px-6 text-center bg-violet-500/5">{renderValue(professional, true)}</td>
      <td className="py-4 px-6 text-center">{renderValue(enterprise)}</td>
    </tr>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <span className="font-medium text-white pr-8">{question}</span>
        <ChevronDown className="h-5 w-5 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
