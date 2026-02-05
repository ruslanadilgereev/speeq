'use client';

import Link from 'next/link';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-[100dvh] bg-[#0a0a0b] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-lg space-y-8 p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-2xl blur-xl" />
            <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/25">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-2">
          <span className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Seite nicht gefunden
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-full font-semibold transition-all hover:scale-[1.02] shadow-lg"
          >
            <Home className="h-4 w-4" />
            Zur Startseite
          </Link>
          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 rounded-full font-medium transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>
        </div>

        {/* Help Link */}
        <p className="text-sm text-zinc-600 pt-4">
          Brauchen Sie Hilfe?{' '}
          <a href="mailto:kontakt@pflegeai.de" className="text-violet-400 hover:text-violet-300 transition-colors">
            Kontaktieren Sie uns
          </a>
        </p>
      </div>
    </div>
  );
}
