'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/produkt', label: 'Produkt' },
  { href: '/preise', label: 'Preise' },
  { href: '/sicherheit', label: 'Sicherheit' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header 
      ref={menuRef}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || mobileMenuOpen
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
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105 group-active:scale-95">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                Anmelden
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Demo starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
                <X className="h-6 w-6 text-white" />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu className="h-6 w-6 text-white" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Animated */}
      <div 
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-out
          ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-[#0a0a0b]/95 backdrop-blur-xl border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-sm font-medium 
                    transition-all duration-200
                    transform
                    ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                    ${isActive
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 active:bg-white/10'
                    }
                  `}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div 
              className={`
                pt-4 flex flex-col gap-3
                transition-all duration-300
                ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ transitionDelay: mobileMenuOpen ? '250ms' : '0ms' }}
            >
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full text-white border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                >
                  Anmelden
                </Button>
              </Link>
              <Link href="/resident" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/10">
                  Demo starten
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/60 md:hidden -z-10
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
