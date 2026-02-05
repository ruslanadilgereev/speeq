'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Loader2, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

/**
 * PflegeAI Login/Signup Page
 * Aesthetic: Linear/Vercel — Dark, bold, confident tech startup
 */
export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0b] relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Back to home link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors z-10 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Zurück</span>
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="group">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all group-hover:scale-105">
              <Activity className="h-8 w-8 text-white" />
            </div>
          </Link>
        </div>
        
        {/* Header */}
        <h2 className="mt-8 text-center text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {mode === 'signin'
            ? 'Willkommen zurück'
            : 'Jetzt starten'}
        </h2>
        <p className="mt-3 text-center text-base text-zinc-400">
          {mode === 'signin'
            ? 'Melden Sie sich bei Ihrem Konto an'
            : 'Erstellen Sie Ihr PflegeAI-Konto'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Login Card - Glass morphism */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <form className="space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            
            {/* Email field */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                E-Mail-Adresse
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                placeholder="name@pflegeheim.de"
              />
            </div>

            {/* Password field */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Passwort
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                placeholder={mode === 'signin' ? '••••••••' : 'Mind. 8 Zeichen'}
              />
            </div>

            {/* Error message */}
            {state?.error && (
              <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                {state.error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-base font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-[1.02]"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Wird geladen...
                </>
              ) : mode === 'signin' ? (
                'Anmelden'
              ) : (
                'Konto erstellen'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0a0a0b] text-zinc-500">
                  {mode === 'signin'
                    ? 'Noch kein Konto?'
                    : 'Bereits registriert?'}
                </span>
              </div>
            </div>

            {/* Secondary action */}
            <div className="mt-6">
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className="w-full flex justify-center py-3 px-4 border border-white/10 rounded-xl text-sm font-medium text-zinc-300 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {mode === 'signin'
                  ? 'Jetzt registrieren'
                  : 'Zum Login'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-zinc-400" />
            <span>DSGVO-konform</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">🇩🇪</span>
            <span>Gehostet in DE</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            <span>Ende-zu-Ende verschlüsselt</span>
          </div>
        </div>
        
        {/* Legal links */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Mit der Anmeldung akzeptieren Sie unsere{' '}
          <a href="/sicherheit" className="text-zinc-400 hover:text-violet-400 transition-colors">Nutzungsbedingungen</a>
          {' '}und{' '}
          <a href="/sicherheit" className="text-zinc-400 hover:text-violet-400 transition-colors">Datenschutzerklärung</a>.
        </p>
      </div>
    </div>
  );
}
