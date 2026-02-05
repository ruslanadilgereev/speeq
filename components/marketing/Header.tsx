'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/produkt', label: 'Produkt' },
  { href: '/preise', label: 'Preise' },
  { href: '/sicherheit', label: 'Sicherheit' },
  { href: '/ueber-uns', label: 'Über uns' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all group-hover:scale-105">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Pflege<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
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
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5">
                Anmelden
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 font-semibold">
                Demo starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0b]/95 backdrop-blur-xl border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10">
                  Anmelden
                </Button>
              </Link>
              <Link href="/resident" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-zinc-200">
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
