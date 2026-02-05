'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Phone,
  Users,
  Activity,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Zap,
  TrendingUp,
  Calendar,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Types
type RequestStatus = 'pending' | 'assigned' | 'resolved';
type StaffStatus = 'available' | 'busy' | 'break' | 'offline';

interface CareRequest {
  id: string;
  resident: string;
  room: string;
  floor: number;
  message: string;
  transcript: string;
  priority: number;
  status: RequestStatus;
  createdAt: Date;
  aiSummary: string;
  assignedTo?: string;
  assignedAt?: Date;
  resolvedAt?: Date;
  category: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: StaffStatus;
  floor: number;
  activeRequests: number;
  avatar?: string;
}

// Demo data
const DEMO_REQUESTS: CareRequest[] = [
  {
    id: '1',
    resident: 'Maria Schmidt',
    room: '214',
    floor: 2,
    message: 'Mir ist schwindelig, ich bin hingefallen',
    transcript: 'Hallo? Ich bin gestürzt und mir ist schwindelig. Bitte helfen Sie mir aufzustehen.',
    priority: 9,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
    aiSummary: 'Sturz mit Schwindel — sofortige Hilfe benötigt',
    category: 'Sturz',
  },
  {
    id: '2',
    resident: 'Hans Müller',
    room: '108',
    floor: 1,
    message: 'Ich muss dringend auf Toilette',
    transcript: 'Bitte, ich muss dringend auf die Toilette. Können Sie mir helfen aufzustehen?',
    priority: 7,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    aiSummary: 'Toilettengang — zeitnah, Sturzgefahr bei Alleingang',
    category: 'Toilette',
  },
  {
    id: '3',
    resident: 'Ingrid Weber',
    room: '305',
    floor: 3,
    message: 'Ich hätte gerne ein Glas Wasser',
    transcript: 'Entschuldigung, ich habe Durst. Könnte ich bitte ein Glas Wasser bekommen?',
    priority: 3,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 12),
    aiSummary: 'Getränk gewünscht — keine Dringlichkeit',
    category: 'Versorgung',
  },
  {
    id: '4',
    resident: 'Helga Braun',
    room: '201',
    floor: 2,
    message: 'Mein Rücken tut sehr weh',
    transcript: 'Au, mein Rücken tut so weh! Bitte helfen Sie mir, die Position zu wechseln.',
    priority: 6,
    status: 'assigned',
    assignedTo: 'Anna Becker',
    assignedAt: new Date(Date.now() - 1000 * 60 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
    aiSummary: 'Rückenschmerzen — Lagerung/Positionierung',
    category: 'Schmerzen',
  },
  {
    id: '5',
    resident: 'Kurt Fischer',
    room: '112',
    floor: 1,
    message: 'Ich fühle mich einsam',
    transcript: 'Ist jemand da? Ich fühle mich heute etwas einsam. Hätten Sie kurz Zeit?',
    priority: 2,
    status: 'resolved',
    assignedTo: 'Thomas Richter',
    resolvedAt: new Date(Date.now() - 1000 * 60 * 15),
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    aiSummary: 'Soziale Interaktion gewünscht',
    category: 'Sozial',
  },
];

const DEMO_STAFF: StaffMember[] = [
  { id: '1', name: 'Anna Becker', role: 'Pflegefachkraft', status: 'busy', floor: 2, activeRequests: 1 },
  { id: '2', name: 'Thomas Richter', role: 'Pflegehelfer', status: 'available', floor: 1, activeRequests: 0 },
  { id: '3', name: 'Sarah Koch', role: 'Pflegefachkraft', status: 'available', floor: 3, activeRequests: 0 },
  { id: '4', name: 'Michael Weber', role: 'Pflegehelfer', status: 'break', floor: 2, activeRequests: 0 },
  { id: '5', name: 'Lisa Hoffmann', role: 'Pflegefachkraft', status: 'busy', floor: 1, activeRequests: 2 },
];

// Helper functions
function getPriorityColor(priority: number) {
  if (priority >= 9) return 'bg-red-500';
  if (priority >= 7) return 'bg-orange-500';
  if (priority >= 4) return 'bg-yellow-500';
  return 'bg-green-500';
}

function getPriorityLabel(priority: number) {
  if (priority >= 9) return 'NOTFALL';
  if (priority >= 7) return 'HOCH';
  if (priority >= 4) return 'MITTEL';
  return 'NIEDRIG';
}

function getStatusColor(status: StaffStatus) {
  switch (status) {
    case 'available': return 'bg-green-500';
    case 'busy': return 'bg-orange-500';
    case 'break': return 'bg-yellow-500';
    default: return 'bg-gray-400';
  }
}

function getStatusLabel(status: StaffStatus) {
  switch (status) {
    case 'available': return 'Verfügbar';
    case 'busy': return 'Beschäftigt';
    case 'break': return 'Pause';
    default: return 'Offline';
  }
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}

// Components
function RequestCard({ 
  request, 
  onAccept, 
  onResolve,
  compact = false 
}: {
  request: CareRequest;
  onAccept?: () => void;
  onResolve?: () => void;
  compact?: boolean;
}) {
  const isEmergency = request.priority >= 9;
  
  return (
    <div className={`
      bg-white rounded-xl border shadow-sm hover:shadow-md transition-all
      ${isEmergency ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}
      ${compact ? 'p-3' : 'p-4'}
    `}>
      <div className="flex items-start gap-3">
        {/* Priority indicator */}
        <div className={`
          w-2 h-full min-h-[60px] rounded-full ${getPriorityColor(request.priority)}
          ${isEmergency ? 'animate-pulse' : ''}
        `} />
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{request.resident}</span>
                <span className="text-sm text-gray-500">Zi. {request.room}</span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{request.aiSummary}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`
                px-2 py-0.5 rounded text-xs font-bold text-white
                ${getPriorityColor(request.priority)}
              `}>
                {getPriorityLabel(request.priority)}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo(request.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Transcript */}
          {!compact && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 italic line-clamp-2">"{request.transcript}"</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="mt-3 flex items-center gap-2">
            {request.status === 'pending' && (
              <>
                <Button 
                  size="sm" 
                  onClick={onAccept}
                  className={isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Übernehmen
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              </>
            )}
            {request.status === 'assigned' && (
              <>
                <span className="text-sm text-blue-600 flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {request.assignedTo}
                </span>
                <Button size="sm" variant="outline" onClick={onResolve}>
                  Erledigt
                </Button>
              </>
            )}
            {request.status === 'resolved' && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Erledigt
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffCard({ member, onSelect }: { member: StaffMember; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{member.name}</p>
          <p className="text-xs text-gray-500">Etage {member.floor} · {member.activeRequests} aktiv</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          member.status === 'available' ? 'bg-green-100 text-green-700' :
          member.status === 'busy' ? 'bg-orange-100 text-orange-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {getStatusLabel(member.status)}
        </span>
      </div>
    </button>
  );
}

function StatBox({ label, value, icon: Icon, trend, color = 'blue' }: {
  label: string;
  value: string | number;
  icon: typeof Bell;
  trend?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function StaffDashboard() {
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [staff] = useState(DEMO_STAFF);
  const [currentUser] = useState({ name: 'Anna Becker', role: 'Pflegefachkraft', floor: 2 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const myRequests = requests.filter(r => r.assignedTo === currentUser.name && r.status === 'assigned');
  const emergencies = pendingRequests.filter(r => r.priority >= 9);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev.map(r => ({
        ...r,
        createdAt: r.createdAt // Force re-render to update time
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptRequest = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'assigned', assignedTo: currentUser.name, assignedAt: new Date() } : r
    ));
  };

  const handleResolveRequest = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'resolved', resolvedAt: new Date() } : r
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Menu */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden p-2 -ml-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 hidden sm:block">PflegeAI</span>
              </Link>
              <span className="hidden sm:block text-sm text-gray-400 border-l pl-3 ml-1">Personal-Dashboard</span>
            </div>

            {/* Center - Emergency Alert */}
            {emergencies.length > 0 && (
              <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 rounded-full animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium text-sm">{emergencies.length} Notfall{emergencies.length > 1 ? 'e' : ''}</span>
              </div>
            )}

            {/* Right - User & Settings */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-2 rounded-lg ${audioEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">Etage {currentUser.floor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              ← Zurück zur Startseite
            </Link>
            <Link href="/requests" className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              Admin-Dashboard
            </Link>
            <Link href="/resident" className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              Bewohner-Ansicht
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatBox 
            label="Wartende Anfragen" 
            value={pendingRequests.length} 
            icon={Bell}
            color={emergencies.length > 0 ? 'red' : 'blue'}
          />
          <StatBox 
            label="Meine aktiven" 
            value={myRequests.length} 
            icon={User}
            color="orange"
          />
          <StatBox 
            label="Ø Reaktionszeit" 
            value="3.8 min"
            icon={Clock}
            trend="↓ 18% vs. gestern"
            color="green"
          />
          <StatBox 
            label="Heute erledigt" 
            value={28}
            icon={CheckCircle}
            color="green"
          />
        </div>

        {/* Floor Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFloor(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFloor === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            Alle Etagen
          </button>
          {[1, 2, 3].map(floor => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFloor === floor ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              Etage {floor}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Requests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Requests */}
            {emergencies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h2 className="font-semibold text-gray-900">Notfälle</h2>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    {emergencies.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {emergencies.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onAccept={() => handleAcceptRequest(request.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pending Requests */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <h2 className="font-semibold text-gray-900">Wartende Anfragen</h2>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {pendingRequests.filter(r => r.priority < 9).length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingRequests
                  .filter(r => r.priority < 9)
                  .filter(r => selectedFloor === null || r.floor === selectedFloor)
                  .sort((a, b) => b.priority - a.priority)
                  .map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onAccept={() => handleAcceptRequest(request.id)}
                    />
                  ))}
                {pendingRequests.filter(r => r.priority < 9).filter(r => selectedFloor === null || r.floor === selectedFloor).length === 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-300" />
                    <p>Keine wartenden Anfragen</p>
                  </div>
                )}
              </div>
            </div>

            {/* My Active Requests */}
            {myRequests.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-orange-500" />
                  <h2 className="font-semibold text-gray-900">Meine aktiven Anfragen</h2>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {myRequests.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {myRequests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onResolve={() => handleResolveRequest(request.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Team & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Schnellaktionen</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Rundgang</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Übergabe</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs">Bericht</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1 text-red-600 border-red-200 hover:bg-red-50">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs">Notfall</span>
                </Button>
              </div>
            </div>

            {/* Team Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Team im Dienst</h3>
                <span className="text-sm text-gray-500">{staff.filter(s => s.status !== 'offline').length} aktiv</span>
              </div>
              <div className="space-y-2">
                {staff
                  .filter(s => s.status !== 'offline')
                  .filter(s => selectedFloor === null || s.floor === selectedFloor)
                  .map(member => (
                    <StaffCard key={member.id} member={member} onSelect={() => {}} />
                  ))}
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
              <h3 className="font-semibold mb-3">Tagesübersicht</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">Anfragen gesamt</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Durchschnittl. Reaktion</span>
                  <span className="font-medium">3.8 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Notfälle bearbeitet</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Zufriedenheit</span>
                  <span className="font-medium">96%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Demo Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto">
        <div className="bg-blue-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <Zap className="h-5 w-5 text-yellow-400" />
          <span className="text-sm">
            <strong>Demo-Modus</strong> — Beispieldaten für Vorführungszwecke
          </span>
        </div>
      </div>
    </div>
  );
}
