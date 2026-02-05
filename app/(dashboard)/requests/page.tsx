'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  Mic,
  Phone,
  Users,
  Activity,
  Sparkles,
  Zap,
} from 'lucide-react';

// Types
type RequestStatus = 'pending' | 'assigned' | 'resolved';

interface Request {
  id: string;
  resident: string;
  room: string;
  message: string;
  transcript: string;
  priority: number;
  status: RequestStatus;
  createdAt: Date;
  aiSummary: string;
  assignedTo?: string;
  resolvedBy?: string;
}

// Demo data - fake resident requests with priorities
const DEMO_REQUESTS: Request[] = [
  {
    id: '1',
    resident: 'Maria Schmidt',
    room: '214',
    message: 'Mir ist schwindelig, ich bin hingefallen',
    transcript: 'Hallo? Ich bin gestürzt und mir ist schwindelig. Bitte helfen Sie mir aufzustehen.',
    priority: 9,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
    aiSummary: 'Sturz mit Schwindel - sofortige Hilfe benötigt',
  },
  {
    id: '2',
    resident: 'Hans Müller',
    room: '108',
    message: 'Ich muss dringend auf Toilette',
    transcript: 'Bitte, ich muss dringend auf die Toilette. Können Sie mir helfen aufzustehen?',
    priority: 7,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    aiSummary: 'Toilettengang - zeitnah, Sturzgefahr',
  },
  {
    id: '3',
    resident: 'Ingrid Weber',
    room: '305',
    message: 'Ich hätte gerne ein Glas Wasser',
    transcript: 'Entschuldigung, ich habe Durst. Könnte ich bitte ein Glas Wasser bekommen?',
    priority: 3,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 12), // 12 min ago
    aiSummary: 'Getränk gewünscht - keine Dringlichkeit',
  },
  {
    id: '4',
    resident: 'Helga Braun',
    room: '201',
    message: 'Mein Rücken tut sehr weh',
    transcript: 'Au, mein Rücken tut so weh! Bitte helfen Sie mir, die Position zu wechseln.',
    priority: 6,
    status: 'assigned',
    assignedTo: 'Anna Pfleger',
    createdAt: new Date(Date.now() - 1000 * 60 * 8), // 8 min ago
    aiSummary: 'Rückenschmerzen - Positionierung benötigt',
  },
  {
    id: '5',
    resident: 'Kurt Fischer',
    room: '112',
    message: 'Ich fühle mich einsam, kann jemand kommen?',
    transcript: 'Ist jemand da? Ich fühle mich heute etwas einsam. Hätten Sie kurz Zeit?',
    priority: 2,
    status: 'resolved',
    resolvedBy: 'Thomas Schwester',
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    aiSummary: 'Soziale Interaktion gewünscht - keine medizinische Dringlichkeit',
  },
];

const DEMO_STATS = {
  activeRequests: 4,
  avgResponseTime: '4.2',
  resolvedToday: 23,
  staffOnDuty: 6,
};

function getPriorityGradient(priority: number) {
  if (priority >= 9) return 'from-rose-500 to-red-600';
  if (priority >= 7) return 'from-orange-500 to-amber-600';
  if (priority >= 4) return 'from-yellow-500 to-amber-500';
  return 'from-emerald-500 to-teal-600';
}

function getPriorityBorder(priority: number) {
  if (priority >= 9) return 'border-l-rose-500';
  if (priority >= 7) return 'border-l-orange-500';
  if (priority >= 4) return 'border-l-yellow-500';
  return 'border-l-emerald-500';
}

function getPriorityLabel(priority: number) {
  if (priority >= 9) return '🔴 NOTFALL';
  if (priority >= 7) return '🟠 HOCH';
  if (priority >= 4) return '🟡 MITTEL';
  return '🟢 NIEDRIG';
}

function getPriorityBadge(priority: number) {
  if (priority >= 9) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  if (priority >= 7) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
  if (priority >= 4) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}

function RequestCard({ request, onAccept, onResolve }: {
  request: Request;
  onAccept?: () => void;
  onResolve?: () => void;
}) {
  return (
    <div className={`relative group border-l-4 ${getPriorityBorder(request.priority)}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-4 rounded-r-xl bg-zinc-900/50 border border-white/10 border-l-0 backdrop-blur-sm hover:bg-zinc-900/70 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 border-2 border-white/10 flex-shrink-0">
              <AvatarFallback className={`bg-gradient-to-br ${getPriorityGradient(request.priority)} text-white font-medium`}>
                {request.resident.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white truncate">{request.resident}</h3>
                <span className="text-sm text-zinc-500">Zimmer {request.room}</span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{request.aiSummary}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(request.priority)}`}>
              {getPriorityLabel(request.priority)}
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              vor {timeAgo(request.createdAt)}
            </span>
          </div>
        </div>
        
        {/* Transcript preview */}
        <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <Mic className="h-3 w-3" />
            <span>Sprachaufnahme</span>
          </div>
          <p className="text-sm text-zinc-300 italic">"{request.transcript}"</p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          {request.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={onAccept} 
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Übernehmen
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Phone className="h-4 w-4 mr-1" />
                Anrufen
              </Button>
            </div>
          )}
          {request.status === 'assigned' && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-violet-400 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {request.assignedTo}
              </span>
              <Button 
                size="sm" 
                onClick={onResolve} 
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Erledigt
              </Button>
            </div>
          )}
          {request.status === 'resolved' && (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Erledigt von {request.resolvedBy}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, gradient, trend }: {
  title: string;
  value: string | number;
  icon: typeof Bell;
  gradient: string;
  trend?: string;
}) {
  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity`} />
      <div className="relative p-4 rounded-xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {trend && <p className="text-xs text-emerald-400 mt-1">{trend}</p>}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RequestsDashboard() {
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulate new request coming in
  const simulateNewRequest = () => {
    setIsSimulating(true);
    
    const newRequest: Request = {
      id: Date.now().toString(),
      resident: 'Greta Meier',
      room: '307',
      message: 'Ich kann nicht atmen, bitte helfen!',
      transcript: 'Hilfe! Ich bekomme schlecht Luft. Bitte kommen Sie schnell!',
      priority: 10,
      status: 'pending',
      createdAt: new Date(),
      aiSummary: '⚠️ NOTFALL: Atemnot - sofortige medizinische Hilfe!',
    };

    setTimeout(() => {
      setRequests(prev => [newRequest, ...prev]);
      setIsSimulating(false);
    }, 1500);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const assignedRequests = requests.filter(r => r.status === 'assigned');
  const resolvedRequests = requests.filter(r => r.status === 'resolved');

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Anfragen-Dashboard
            </h1>
          </div>
          <p className="text-zinc-400">
            KI-gestützte Priorisierung von Bewohner-Anfragen
          </p>
        </div>
        <Button 
          onClick={simulateNewRequest} 
          disabled={isSimulating}
          className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border-0 shadow-lg shadow-rose-500/20"
        >
          {isSimulating ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
              Neue Anfrage...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Demo: Neue Anfrage
            </>
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Aktive Anfragen" 
          value={pendingRequests.length + assignedRequests.length} 
          icon={Bell}
          gradient="from-violet-500 to-fuchsia-600"
        />
        <StatCard 
          title="Ø Reaktionszeit" 
          value={`${DEMO_STATS.avgResponseTime} min`}
          icon={Clock}
          gradient="from-emerald-500 to-teal-600"
          trend="↓ 23% vs. gestern"
        />
        <StatCard 
          title="Heute erledigt" 
          value={DEMO_STATS.resolvedToday} 
          icon={CheckCircle}
          gradient="from-blue-500 to-cyan-600"
        />
        <StatCard 
          title="Personal im Dienst" 
          value={DEMO_STATS.staffOnDuty} 
          icon={Users}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Main Content - Three Columns */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending - Highest Priority */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-lg shadow-rose-500/50" />
            <h2 className="text-lg font-semibold text-white">
              Wartend
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-zinc-300">
              {pendingRequests.length}
            </span>
          </div>
          <div className="space-y-4">
            {pendingRequests
              .sort((a, b) => b.priority - a.priority)
              .map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request}
                  onAccept={() => {
                    setRequests(prev => 
                      prev.map(r => 
                        r.id === request.id 
                          ? { ...r, status: 'assigned', assignedTo: 'Sie (Demo)' }
                          : r
                      )
                    );
                  }}
                />
              ))}
            {pendingRequests.length === 0 && (
              <div className="p-8 rounded-xl bg-zinc-900/30 border border-white/5 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-zinc-600" />
                <p className="text-zinc-500">Keine wartenden Anfragen</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned / In Progress */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
            <h2 className="text-lg font-semibold text-white">
              In Bearbeitung
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-zinc-300">
              {assignedRequests.length}
            </span>
          </div>
          <div className="space-y-4">
            {assignedRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request}
                onResolve={() => {
                  setRequests(prev =>
                    prev.map(r =>
                      r.id === request.id
                        ? { ...r, status: 'resolved', resolvedBy: 'Sie (Demo)' }
                        : r
                    )
                  );
                }}
              />
            ))}
            {assignedRequests.length === 0 && (
              <div className="p-8 rounded-xl bg-zinc-900/30 border border-white/5 text-center">
                <Activity className="h-12 w-12 mx-auto mb-2 text-zinc-600" />
                <p className="text-zinc-500">Keine Anfragen in Bearbeitung</p>
              </div>
            )}
          </div>
        </div>

        {/* Resolved */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            <h2 className="text-lg font-semibold text-white">
              Erledigt
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-zinc-300">
              {resolvedRequests.length}
            </span>
          </div>
          <div className="space-y-4">
            {resolvedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
            {resolvedRequests.length === 0 && (
              <div className="p-8 rounded-xl bg-zinc-900/30 border border-white/5 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-zinc-600" />
                <p className="text-zinc-500">Noch keine erledigten Anfragen</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Demo Info */}
      <div className="mt-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-violet-300">Demo-Modus</h3>
            <p className="text-sm text-violet-300/70 mt-1">
              Dies ist eine Demo mit Beispieldaten. In der echten App werden Anfragen von 
              Smartwatches der Bewohner empfangen, von Gemini AI priorisiert und als 
              Push-Benachrichtigungen an Pflegekräfte gesendet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
