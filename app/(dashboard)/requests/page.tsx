'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Mic,
  Phone,
  Users,
  Activity,
} from 'lucide-react';

// Demo data - fake resident requests with priorities
const DEMO_REQUESTS = [
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

function getPriorityColor(priority: number) {
  if (priority >= 9) return 'bg-red-500 text-white border-red-600';
  if (priority >= 7) return 'bg-orange-500 text-white border-orange-600';
  if (priority >= 4) return 'bg-yellow-400 text-black border-yellow-500';
  return 'bg-green-400 text-black border-green-500';
}

function getPriorityLabel(priority: number) {
  if (priority >= 9) return '🔴 NOTFALL';
  if (priority >= 7) return '🟠 HOCH';
  if (priority >= 4) return '🟡 MITTEL';
  return '🟢 NIEDRIG';
}

function getPriorityBorder(priority: number) {
  if (priority >= 9) return 'border-l-4 border-l-red-500';
  if (priority >= 7) return 'border-l-4 border-l-orange-500';
  if (priority >= 4) return 'border-l-4 border-l-yellow-400';
  return 'border-l-4 border-l-green-400';
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
  request: typeof DEMO_REQUESTS[0];
  onAccept?: () => void;
  onResolve?: () => void;
}) {
  return (
    <Card className={`${getPriorityBorder(request.priority)} shadow-md hover:shadow-lg transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {request.resident.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{request.resident}</h3>
                <span className="text-sm text-gray-500">Zimmer {request.room}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{request.aiSummary}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
              {getPriorityLabel(request.priority)}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              vor {timeAgo(request.createdAt)}
            </span>
          </div>
        </div>
        
        {/* Transcript preview */}
        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Mic className="h-3 w-3" />
            <span>Sprachaufnahme</span>
          </div>
          <p className="text-sm text-gray-700 italic">"{request.transcript}"</p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          {request.status === 'pending' && (
            <div className="flex gap-2">
              <Button size="sm" onClick={onAccept} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-1" />
                Übernehmen
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Anrufen
              </Button>
            </div>
          )}
          {request.status === 'assigned' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600">👤 {request.assignedTo}</span>
              <Button size="sm" onClick={onResolve} variant="outline">
                <CheckCircle className="h-4 w-4 mr-1" />
                Erledigt
              </Button>
            </div>
          )}
          {request.status === 'resolved' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Erledigt von {request.resolvedBy}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, icon: Icon, trend }: {
  title: string;
  value: string | number;
  icon: typeof Bell;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && <p className="text-xs text-green-600">{trend}</p>}
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RequestsDashboard() {
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulate new request coming in
  const simulateNewRequest = () => {
    setIsSimulating(true);
    
    const newRequest = {
      id: Date.now().toString(),
      resident: 'Greta Meier',
      room: '307',
      message: 'Ich kann nicht atmen, bitte helfen!',
      transcript: 'Hilfe! Ich bekomme schlecht Luft. Bitte kommen Sie schnell!',
      priority: 10,
      status: 'pending' as const,
      createdAt: new Date(),
      aiSummary: '⚠️ NOTFALL: Atemnot - sofortige medizinische Hilfe!',
    };

    setTimeout(() => {
      setRequests(prev => [newRequest, ...prev]);
      setIsSimulating(false);
    }, 1500);
  };

  // Auto-escalation visual (pulse effect on high priority)
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const assignedRequests = requests.filter(r => r.status === 'assigned');
  const resolvedRequests = requests.filter(r => r.status === 'resolved');

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Anfragen-Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            KI-gestützte Priorisierung von Bewohner-Anfragen
          </p>
        </div>
        <Button 
          onClick={simulateNewRequest} 
          disabled={isSimulating}
          className="bg-red-600 hover:bg-red-700"
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Aktive Anfragen" 
          value={pendingRequests.length + assignedRequests.length} 
          icon={Bell}
        />
        <StatCard 
          title="Ø Reaktionszeit" 
          value={`${DEMO_STATS.avgResponseTime} min`}
          icon={Clock}
          trend="↓ 23% vs. gestern"
        />
        <StatCard 
          title="Heute erledigt" 
          value={DEMO_STATS.resolvedToday} 
          icon={CheckCircle}
        />
        <StatCard 
          title="Personal im Dienst" 
          value={DEMO_STATS.staffOnDuty} 
          icon={Users}
        />
      </div>

      {/* Main Content - Three Columns */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending - Highest Priority */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Wartend ({pendingRequests.length})
            </h2>
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
                          ? { ...r, status: 'assigned' as const, assignedTo: 'Sie (Demo)' }
                          : r
                      )
                    );
                  }}
                />
              ))}
            {pendingRequests.length === 0 && (
              <Card className="p-8 text-center text-gray-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Keine wartenden Anfragen</p>
              </Card>
            )}
          </div>
        </div>

        {/* Assigned / In Progress */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              In Bearbeitung ({assignedRequests.length})
            </h2>
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
                        ? { ...r, status: 'resolved' as const, resolvedBy: 'Sie (Demo)' }
                        : r
                    )
                  );
                }}
              />
            ))}
            {assignedRequests.length === 0 && (
              <Card className="p-8 text-center text-gray-400">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Keine Anfragen in Bearbeitung</p>
              </Card>
            )}
          </div>
        </div>

        {/* Resolved */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Erledigt ({resolvedRequests.length})
            </h2>
          </div>
          <div className="space-y-4">
            {resolvedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
            {resolvedRequests.length === 0 && (
              <Card className="p-8 text-center text-gray-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Noch keine erledigten Anfragen</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Demo Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Demo-Modus</h3>
            <p className="text-sm text-blue-700 mt-1">
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
