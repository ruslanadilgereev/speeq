import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: {
    default: 'PflegeAI - KI-gestützte Pflegeassistenz',
    template: '%s | PflegeAI'
  },
  description: 'Intelligente Sprachassistenz für Pflegeheime. Anfragen priorisieren, Pflegekräfte entlasten, Bewohnerzufriedenheit steigern.',
  keywords: ['Pflege', 'KI', 'Pflegeheim', 'Sprachassistenz', 'Digitalisierung', 'Healthcare', 'AI'],
  authors: [{ name: 'PflegeAI GmbH' }],
  creator: 'PflegeAI GmbH',
  metadataBase: new URL('https://pflegeai.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'PflegeAI',
    title: 'PflegeAI - Pflege, intelligent.',
    description: 'KI-Sprachassistenz, die Pflegeheim-Anfragen versteht, priorisiert und zuweist. Weniger Chaos, mehr Zeit für Menschen.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PflegeAI - Pflege, intelligent.',
    description: 'KI-Sprachassistenz für Pflegeheime. DSGVO-konform. Made in Germany.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-[#0a0a0b]">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
