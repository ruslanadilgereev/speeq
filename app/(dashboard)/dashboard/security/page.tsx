'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Trash2, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { useActionState } from 'react';
import { updatePassword, deleteAccount } from '@/app/(login)/actions';

type PasswordState = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  error?: string;
  success?: string;
};

type DeleteState = {
  password?: string;
  error?: string;
  success?: string;
};

export default function SecurityPage() {
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    PasswordState,
    FormData
  >(updatePassword, {});

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    DeleteState,
    FormData
  >(deleteAccount, {});

  return (
    <section className="flex-1 p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Sicherheit</h1>
        </div>
        <p className="text-zinc-400">Verwalten Sie Ihr Passwort und Konto</p>
      </div>

      {/* Password Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Passwort ändern</h3>
              <p className="text-sm text-zinc-400">Aktualisieren Sie Ihr Kontopasswort</p>
            </div>
          </div>

          <form className="space-y-5" action={passwordAction}>
            <div>
              <Label htmlFor="current-password" className="text-zinc-300 mb-2 block">
                Aktuelles Passwort
              </Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.currentPassword}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-zinc-300 mb-2 block">
                Neues Passwort
              </Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.newPassword}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-zinc-300 mb-2 block">
                Passwort bestätigen
              </Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.confirmPassword}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
              />
            </div>
            
            {passwordState.error && (
              <p className="text-rose-400 text-sm">{passwordState.error}</p>
            )}
            {passwordState.success && (
              <p className="text-emerald-400 text-sm">{passwordState.success}</p>
            )}
            
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20"
              disabled={isPasswordPending}
            >
              {isPasswordPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird aktualisiert...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Passwort aktualisieren
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Delete Account Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600/20 to-red-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-rose-500/20 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Konto löschen</h3>
              <p className="text-sm text-zinc-400">Dauerhaft und unwiderruflich</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 mb-6">
            <p className="text-sm text-rose-300">
              ⚠️ Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Daten werden unwiderruflich gelöscht.
            </p>
          </div>

          <form action={deleteAction} className="space-y-5">
            <div>
              <Label htmlFor="delete-password" className="text-zinc-300 mb-2 block">
                Passwort zur Bestätigung
              </Label>
              <Input
                id="delete-password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={deleteState.password}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-rose-500/50 focus:ring-rose-500/20"
              />
            </div>
            
            {deleteState.error && (
              <p className="text-rose-400 text-sm">{deleteState.error}</p>
            )}
            
            <Button
              type="submit"
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border-0 shadow-lg shadow-rose-500/20"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird gelöscht...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Konto löschen
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
