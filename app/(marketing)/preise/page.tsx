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
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preise - PflegeAI',
  description: 'Transparente Preise für PflegeAI. Wählen Sie den passenden Plan für Ihre Pflegeeinrichtung.',
};

export default function PreisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/50 mb-8">
              <Sparkles className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Transparente Preise</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Der richtige Plan für{' '}
              <span className="text-teal-600">jede Einrichtung</span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Starten Sie mit 14 Tagen kostenlos. Keine Kreditkarte erforderlich.
              Jederzeit kündbar.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                { text: 'Custom Branding', included: false },
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
              badge="Beliebteste Wahl"
              features={[
                { text: 'Bis zu 100 Bewohner', included: true },
                { text: 'Unbegrenzte Anfragen', included: true },
                { text: 'KI-Priorisierung mit Kontext', included: true },
                { text: 'Prioritäts-Support (24h)', included: true },
                { text: 'Web + Mobile Apps', included: true },
                { text: 'Erweiterte Analytics', included: true },
                { text: 'API-Zugang', included: true },
                { text: 'MEDIFOX Integration', included: true },
                { text: 'Custom Branding', included: false },
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
                { text: 'Unbegrenzte Anfragen', included: true },
                { text: 'Maßgeschneiderte KI-Modelle', included: true },
                { text: 'Dedizierter Account Manager', included: true },
                { text: 'Alle Plattformen', included: true },
                { text: 'Custom Analytics & Reports', included: true },
                { text: 'Vollständiger API-Zugang', included: true },
                { text: 'Alle PVS-Integrationen', included: true },
                { text: 'White-Label Option', included: true },
              ]}
              cta="Kontakt aufnehmen"
              ctaHref="mailto:kontakt@pflegeai.de?subject=Enterprise-Anfrage"
              isEnterprise
            />
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-teal-600" />
              <span>DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              <span>Deutsche Server</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              <span>Jederzeit kündbar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Funktionen im Vergleich
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Alle Details zu den einzelnen Paketen
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Funktion</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-900 bg-teal-50 rounded-t-2xl">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-900">Enterprise</th>
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
                  feature="Analytics & Reporting" 
                  starter="Basis" 
                  professional="Erweitert" 
                  enterprise="Custom" 
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
                  feature="Onboarding" 
                  starter="Self-Service" 
                  professional="Begleitet" 
                  enterprise="White-Glove" 
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
      <section className="py-24 bg-[#fafbfc]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Häufig gestellte Fragen
            </h2>
          </div>

          <div className="space-y-4">
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
              question="Wie läuft das Onboarding ab?"
              answer="Je nach Plan erhalten Sie Self-Service-Dokumentation, begleitete Einrichtung oder ein vollständiges White-Glove-Onboarding mit Vor-Ort-Schulung. Wir machen Sie innerhalb von 1-2 Wochen startklar."
            />
            <FaqItem 
              question="Welche Hardware benötige ich?"
              answer="PflegeAI funktioniert mit jedem internetfähigen Gerät. Für die Bewohner-Schnittstelle empfehlen wir Tablets oder Smart Displays. Das Personal kann Smartphones, Tablets oder Desktop-PCs nutzen."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Phone className="h-12 w-12 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Noch Fragen? Wir helfen gerne.
          </h2>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
            Vereinbaren Sie ein kostenloses Beratungsgespräch und finden Sie 
            den passenden Plan für Ihre Einrichtung.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Beratungsgespräch">
              <Button size="lg" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-6 rounded-2xl">
                Beratung vereinbaren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-slate-700 text-white hover:bg-slate-800">
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
    <div className={`relative rounded-3xl p-8 lg:p-10 ${
      highlighted 
        ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-2xl shadow-teal-500/30 scale-105 z-10' 
        : 'bg-white border border-slate-200 shadow-sm'
    }`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-sm font-semibold shadow-lg">
            <Sparkles className="h-4 w-4" />
            {badge}
          </span>
        </div>
      )}

      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${
        highlighted 
          ? 'bg-white/20 text-white' 
          : 'bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600'
      }`}>
        {icon}
      </div>

      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-slate-900'}`}>
        {name}
      </h3>
      
      <p className={`text-sm mb-6 ${highlighted ? 'text-teal-100' : 'text-slate-600'}`}>
        {description}
      </p>

      <div className="mb-8">
        {price !== null ? (
          <div className="flex items-baseline gap-1">
            <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
              €{price}
            </span>
            <span className={`text-lg ${highlighted ? 'text-teal-100' : 'text-slate-500'}`}>
              /Monat
            </span>
          </div>
        ) : (
          <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
            {priceLabel}
          </span>
        )}
        <p className={`text-sm mt-2 ${highlighted ? 'text-teal-100' : 'text-slate-500'}`}>
          {isEnterprise ? 'Preise auf Anfrage' : 'zzgl. MwSt.'}
        </p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {feature.included ? (
              <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                highlighted ? 'text-teal-200' : 'text-teal-500'
              }`} />
            ) : (
              <X className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                highlighted ? 'text-white/30' : 'text-slate-300'
              }`} />
            )}
            <span className={feature.included 
              ? (highlighted ? 'text-white' : 'text-slate-700')
              : (highlighted ? 'text-white/50' : 'text-slate-400')
            }>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Link href={ctaHref}>
        <Button 
          size="lg" 
          className={`w-full py-6 rounded-xl text-base font-semibold ${
            highlighted
              ? 'bg-white text-teal-700 hover:bg-teal-50 shadow-lg'
              : 'bg-slate-900 text-white hover:bg-slate-800'
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
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-teal-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-slate-300 mx-auto" />
      );
    }
    return <span className="text-slate-700">{value}</span>;
  };

  return (
    <tr className="border-b border-slate-100">
      <td className="py-4 px-6 text-slate-600">{feature}</td>
      <td className="py-4 px-6 text-center">{renderValue(starter)}</td>
      <td className="py-4 px-6 text-center bg-teal-50/50">{renderValue(professional)}</td>
      <td className="py-4 px-6 text-center">{renderValue(enterprise)}</td>
    </tr>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <span className="font-semibold text-slate-900 pr-8">{question}</span>
        <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <div className="px-6 pb-6 text-slate-600 leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
