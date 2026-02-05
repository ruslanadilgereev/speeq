import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { SubmitButton } from './submit-button';

// Demo pricing - no Stripe needed
export default function PricingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Wählen Sie Ihren Plan
        </h1>
        <p className="text-gray-600">
          14 Tage kostenlos testen. Keine Kreditkarte erforderlich.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <PricingCard
          name="Basis"
          price={299}
          interval="Monat"
          description="Für kleine Pflegeheime"
          features={[
            'Bis zu 50 Bewohner',
            'Unbegrenzte Alerts',
            'E-Mail Support',
            'Standard Reaktionszeit',
          ]}
          priceId="demo_base"
        />
        <PricingCard
          name="Professional"
          price={599}
          interval="Monat"
          description="Für mittlere bis große Einrichtungen"
          features={[
            'Unbegrenzte Bewohner',
            'Prioritäts-Alerts',
            '24/7 Support',
            'API Zugang',
            'MEDIFOX Integration',
            'Custom Branding',
          ]}
          priceId="demo_plus"
          highlighted
        />
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>🔒 Demo-Modus: Klicken Sie auf "Jetzt starten" um sofort freizuschalten.</p>
        <p className="mt-2">Stripe-Integration wird in der Produktionsversion aktiviert.</p>
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  description,
  features,
  priceId,
  highlighted,
}: {
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  priceId: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 ${highlighted 
      ? 'bg-blue-600 text-white ring-2 ring-blue-600' 
      : 'bg-white border border-gray-200'
    }`}>
      {highlighted && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 rounded-full mb-4">
          Empfohlen
        </span>
      )}
      <h2 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h2>
      <p className={`text-sm mb-4 ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
        {description}
      </p>
      <p className={`text-4xl font-bold mb-6 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        €{price}
        <span className={`text-lg font-normal ${highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
          /{interval}
        </span>
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
              highlighted ? 'text-blue-200' : 'text-blue-600'
            }`} />
            <span className={highlighted ? 'text-white' : 'text-gray-700'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <form action={checkoutAction}>
        <input type="hidden" name="priceId" value={priceId} />
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            highlighted
              ? 'bg-white text-blue-600 hover:bg-blue-50'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Jetzt starten
        </button>
      </form>
    </div>
  );
}
