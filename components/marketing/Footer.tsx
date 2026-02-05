import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0b] border-t border-white/5 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Pflege<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500">
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

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} PflegeAI GmbH. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              Made in Germany
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
