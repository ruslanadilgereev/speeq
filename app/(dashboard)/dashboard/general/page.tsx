'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, Settings, Save } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
import { User as UserType } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

type AccountFormProps = {
  state: ActionState;
  nameValue?: string;
  emailValue?: string;
};

function AccountForm({
  state,
  nameValue = '',
  emailValue = ''
}: AccountFormProps) {
  return (
    <>
      <div>
        <Label htmlFor="name" className="text-zinc-300 mb-2 block">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Ihr Name"
          defaultValue={state.name || nameValue}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-zinc-300 mb-2 block">
          E-Mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ihre@email.de"
          defaultValue={emailValue}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
        />
      </div>
    </>
  );
}

function AccountFormWithData({ state }: { state: ActionState }) {
  const { data: user } = useSWR<UserType>('/api/user', fetcher);
  return (
    <AccountForm
      state={state}
      nameValue={user?.name ?? ''}
      emailValue={user?.email ?? ''}
    />
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-5">
      <div>
        <div className="h-4 w-12 bg-white/5 rounded mb-2" />
        <div className="h-10 bg-white/5 rounded-lg" />
      </div>
      <div>
        <div className="h-4 w-12 bg-white/5 rounded mb-2" />
        <div className="h-10 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export default function GeneralPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    {}
  );

  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Allgemein</h1>
        </div>
        <p className="text-zinc-400">Verwalten Sie Ihre Kontoinformationen</p>
      </div>

      {/* Account Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Kontoinformationen</h3>
              <p className="text-sm text-zinc-400">Aktualisieren Sie Ihre persönlichen Daten</p>
            </div>
          </div>

          <form className="space-y-5" action={formAction}>
            <Suspense fallback={<FormSkeleton />}>
              <AccountFormWithData state={state} />
            </Suspense>
            
            {state.error && (
              <p className="text-rose-400 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-emerald-400 text-sm">{state.success}</p>
            )}
            
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird gespeichert...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Änderungen speichern
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
