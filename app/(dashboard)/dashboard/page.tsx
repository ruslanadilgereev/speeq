'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember, inviteTeamMember } from '@/app/(login)/actions';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, CreditCard, Users, Mail, Crown, Sparkles } from 'lucide-react';

type ActionState = {
  error?: string;
  success?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SubscriptionSkeleton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur opacity-50" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 h-[140px]">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/5" />
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-white/5 rounded w-1/3" />
            <div className="h-3 bg-white/5 rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageSubscription() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Team Abonnement</h3>
            <p className="text-sm text-zinc-400">Verwalten Sie Ihr Abonnement</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="font-medium text-white flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-400" />
              Aktueller Plan: <span className="text-violet-400">{teamData?.planName || 'Free'}</span>
            </p>
            <p className="text-sm text-zinc-500">
              {teamData?.subscriptionStatus === 'active'
                ? 'Monatliche Abrechnung'
                : teamData?.subscriptionStatus === 'trialing'
                ? 'Testphase'
                : 'Kein aktives Abonnement'}
            </p>
          </div>
          <form action={customerPortalAction}>
            <Button 
              type="submit" 
              variant="outline"
              className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/20"
            >
              Abonnement verwalten
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TeamMembersSkeleton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur opacity-50" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 h-[200px]">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-white/5" />
            <div className="h-4 bg-white/5 rounded w-1/3" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-full bg-white/5" />
              <div className="h-4 bg-white/5 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamMembers() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unbekannt';
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Team Mitglieder</h3>
            <p className="text-sm text-zinc-400">
              {teamData?.teamMembers?.length || 0} Mitglieder
            </p>
          </div>
        </div>

        {!teamData?.teamMembers?.length ? (
          <p className="text-zinc-500 text-sm">Noch keine Team-Mitglieder.</p>
        ) : (
          <ul className="space-y-3">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center space-x-4">
                  <Avatar className="border-2 border-white/10">
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-sm font-medium">
                      {getUserDisplayName(member.user)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">
                      {getUserDisplayName(member.user)}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize flex items-center gap-1">
                      {member.role === 'owner' && <Crown className="h-3 w-3 text-amber-400" />}
                      {member.role}
                    </p>
                  </div>
                </div>
                {index > 1 && (
                  <form action={removeAction}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      disabled={isRemovePending}
                      className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      {isRemovePending ? 'Entferne...' : 'Entfernen'}
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
        {removeState?.error && (
          <p className="text-rose-400 mt-4 text-sm">{removeState.error}</p>
        )}
      </div>
    </div>
  );
}

function InviteTeamMemberSkeleton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur opacity-50" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 h-[300px]">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-white/5" />
            <div className="h-4 bg-white/5 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InviteTeamMember() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, {});

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Mitglied einladen</h3>
            <p className="text-sm text-zinc-400">Laden Sie neue Teammitglieder ein</p>
          </div>
        </div>

        <form action={inviteAction} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-zinc-300 mb-2 block">
              E-Mail Adresse
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              required
              disabled={!isOwner}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>
          <div>
            <Label className="text-zinc-300 mb-3 block">Rolle</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-6"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="member" 
                  id="member" 
                  className="border-white/20 text-violet-500"
                />
                <Label htmlFor="member" className="text-zinc-300 cursor-pointer">Mitglied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="owner" 
                  id="owner" 
                  className="border-white/20 text-violet-500"
                />
                <Label htmlFor="owner" className="text-zinc-300 cursor-pointer">Inhaber</Label>
              </div>
            </RadioGroup>
          </div>
          
          {inviteState?.error && (
            <p className="text-rose-400 text-sm">{inviteState.error}</p>
          )}
          {inviteState?.success && (
            <p className="text-emerald-400 text-sm">{inviteState.success}</p>
          )}
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Einladung wird gesendet...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Mitglied einladen
              </>
            )}
          </Button>
        </form>
        
        {!isOwner && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-amber-300">
              Nur Team-Inhaber können neue Mitglieder einladen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Einstellungen</h1>
        </div>
        <p className="text-zinc-400 ml-13">Verwalten Sie Ihr Team und Abonnement</p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-6">
        <Suspense fallback={<SubscriptionSkeleton />}>
          <ManageSubscription />
        </Suspense>
        <Suspense fallback={<TeamMembersSkeleton />}>
          <TeamMembers />
        </Suspense>
        <Suspense fallback={<InviteTeamMemberSkeleton />}>
          <InviteTeamMember />
        </Suspense>
      </div>
    </section>
  );
}
