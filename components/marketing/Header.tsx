'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/produkt', label: 'Produkt' },
  { href: '/preise', label: 'Preise' },
  { href: '/sicherheit', label: 'Sicherheit' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafbfc]/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full border-2 border-[#fafbfc] animate-pulse" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Pflege<span className="text-teal-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                Anmelden
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 shadow-lg shadow-slate-900/10">
                Demo starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Anmelden
                </Button>
              </Link>
              <Link href="/resident" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Demo starten
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
