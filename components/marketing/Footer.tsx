import Link from 'next/link';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Pflege<span className="text-teal-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500">
              KI-gestützte Pflegeassistenz für moderne Pflegeheime.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Produkt</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/produkt" className="text-sm hover:text-white transition-colors">
                  Funktionen
                </Link>
              </li>
              <li>
                <Link href="/preise" className="text-sm hover:text-white transition-colors">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/resident" className="text-sm hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/ueber-uns" className="text-sm hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/sicherheit" className="text-sm hover:text-white transition-colors">
                  Sicherheit
                </Link>
              </li>
              <li>
                <a href="mailto:kontakt@pflegeai.de" className="text-sm hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/datenschutz" className="text-sm hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-sm hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-sm hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} PflegeAI GmbH. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Made in Germany
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
