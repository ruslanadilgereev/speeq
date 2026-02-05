import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/queries';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: UserPlus,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinus,
  [ActivityType.INVITE_TEAM_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'gerade eben';
  if (diffInSeconds < 3600)
    return `vor ${Math.floor(diffInSeconds / 60)} Minuten`;
  if (diffInSeconds < 86400)
    return `vor ${Math.floor(diffInSeconds / 3600)} Stunden`;
  if (diffInSeconds < 604800)
    return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`;
  return date.toLocaleDateString('de-DE');
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return 'Registrierung';
    case ActivityType.SIGN_IN:
      return 'Anmeldung';
    case ActivityType.SIGN_OUT:
      return 'Abmeldung';
    case ActivityType.UPDATE_PASSWORD:
      return 'Passwort geändert';
    case ActivityType.DELETE_ACCOUNT:
      return 'Konto gelöscht';
    case ActivityType.UPDATE_ACCOUNT:
      return 'Konto aktualisiert';
    case ActivityType.CREATE_TEAM:
      return 'Team erstellt';
    case ActivityType.REMOVE_TEAM_MEMBER:
      return 'Teammitglied entfernt';
    case ActivityType.INVITE_TEAM_MEMBER:
      return 'Teammitglied eingeladen';
    case ActivityType.ACCEPT_INVITATION:
      return 'Einladung angenommen';
    default:
      return 'Unbekannte Aktion';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Aktivitätsprotokoll</h1>
        </div>
        <p className="text-zinc-400">Ihre letzten Kontoaktivitäten</p>
      </div>

      {/* Activity Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur opacity-50" />
        <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
          {logs.length > 0 ? (
            <ul className="space-y-3">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const formattedAction = formatAction(log.action as ActivityType);

                return (
                  <li 
                    key={log.id} 
                    className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {formattedAction}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {log.ipAddress && `IP: ${log.ipAddress} · `}
                        {getRelativeTime(new Date(log.timestamp))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Noch keine Aktivität
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Wenn Sie Aktionen wie Anmelden oder Kontoänderungen durchführen, erscheinen sie hier.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
