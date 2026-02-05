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
  Menu,
  X,
  Zap,
  Calendar,
  Volume2,
  FileText,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  if (priority >= 9) return 'from-rose-500 to-red-600';
  if (priority >= 7) return 'from-amber-500 to-orange-600';
  if (priority >= 4) return 'from-yellow-500 to-amber-500';
  return 'from-emerald-500 to-green-600';
}

function getPriorityBg(priority: number) {
  if (priority >= 9) return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  if (priority >= 7) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  if (priority >= 4) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
}

function getPriorityLabel(priority: number) {
  if (priority >= 9) return 'NOTFALL';
  if (priority >= 7) return 'HOCH';
  if (priority >= 4) return 'MITTEL';
  return 'NIEDRIG';
}

function getStatusColor(status: StaffStatus) {
  switch (status) {
    case 'available': return 'bg-emerald-500';
    case 'busy': return 'bg-amber-500';
    case 'break': return 'bg-violet-500';
    default: return 'bg-zinc-600';
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
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}

// Components
function RequestCard({ 
  request, 
  onAccept, 
  onResolve,
}: {
  request: CareRequest;
  onAccept?: () => void;
  onResolve?: () => void;
}) {
  const isEmergency = request.priority >= 9;
  
  return (
    <div className={`
      group relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl border transition-all duration-300
      hover:bg-zinc-900/80 hover:border-violet-500/30
      ${isEmergency 
        ? 'border-rose-500/40 shadow-lg shadow-rose-500/10' 
        : 'border-white/10'
      }
    `}>
      {/* Priority gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${getPriorityColor(request.priority)} ${isEmergency ? 'animate-pulse' : ''}`} />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(request.priority)} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-sm">{request.room}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{request.resident}</h3>
              <p className="text-zinc-500 text-sm">Etage {request.floor}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityBg(request.priority)}`}>
              {getPriorityLabel(request.priority)}
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(request.createdAt)}
            </span>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-xs text-violet-400 font-medium uppercase tracking-wider">KI-Analyse</span>
          </div>
          <p className="text-zinc-200">{request.aiSummary}</p>
        </div>

        {/* Transcript */}
        <div className="p-3 bg-black/30 rounded-xl border border-white/5 mb-4">
          <p className="text-sm text-zinc-400 italic">"{request.transcript}"</p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {request.status === 'pending' && (
            <>
              <Button 
                onClick={onAccept}
                className={`flex-1 rounded-xl font-semibold transition-all ${
                  isEmergency 
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-lg shadow-rose-500/25' 
                    : 'bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Übernehmen
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 rounded-xl"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </>
          )}
          {request.status === 'assigned' && (
            <>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-sm text-violet-300">{request.assignedTo}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={onResolve}
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 rounded-xl"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Erledigt
              </Button>
            </>
          )}
          {request.status === 'resolved' && (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Erledigt</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div className="p-4 bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-white/5 hover:border-violet-500/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-zinc-800">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white text-sm font-semibold">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900 ${getStatusColor(member.status)}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{member.name}</p>
          <p className="text-xs text-zinc-500">Etage {member.floor} · {member.activeRequests} aktiv</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          member.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
          member.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
          'bg-zinc-700/50 text-zinc-400'
        }`}>
          {getStatusLabel(member.status)}
        </span>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color = 'violet', trend }: {
  label: string;
  value: string | number;
  icon: typeof Bell;
  color?: 'violet' | 'emerald' | 'amber' | 'rose';
  trend?: string;
}) {
  const colors = {
    violet: 'from-violet-500 to-fuchsia-600 shadow-violet-500/25',
    emerald: 'from-emerald-500 to-green-600 shadow-emerald-500/25',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/25',
    rose: 'from-rose-500 to-red-600 shadow-rose-500/25',
  };
  
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">↓ {trend}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
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
        createdAt: r.createdAt
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
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 lg:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link href="/" className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-white">PflegeAI</span>
                  <span className="text-zinc-500 text-sm ml-2">Staff Dashboard</span>
                </div>
              </Link>
            </div>

            {/* Center - Emergency Alert */}
            {emergencies.length > 0 && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-full animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold text-sm">{emergencies.length} Notfall{emergencies.length > 1 ? 'e' : ''}</span>
              </div>
            )}

            {/* Right */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-2.5 rounded-xl border transition-all ${
                  audioEnabled 
                    ? 'bg-violet-500/20 border-violet-500/30 text-violet-400' 
                    : 'bg-zinc-900/50 border-white/10 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <Avatar className="h-9 w-9 border-2 border-zinc-800">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white text-sm font-semibold">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">{currentUser.name}</p>
                  <p className="text-xs text-zinc-500">Etage {currentUser.floor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-zinc-900/95 backdrop-blur-xl p-4 space-y-2">
            <Link href="/" className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-300 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Link>
            <Link href="/resident" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-300 transition-colors">
              Bewohner-Ansicht
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Wartende Anfragen" 
            value={pendingRequests.length} 
            icon={Bell}
            color={emergencies.length > 0 ? 'rose' : 'violet'}
          />
          <StatCard 
            label="Meine aktiven" 
            value={myRequests.length} 
            icon={User}
            color="amber"
          />
          <StatCard 
            label="Ø Reaktionszeit" 
            value="3.8m"
            icon={Clock}
            trend="18% vs. gestern"
            color="emerald"
          />
          <StatCard 
            label="Heute erledigt" 
            value={28}
            icon={CheckCircle}
            color="emerald"
          />
        </div>

        {/* Floor Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedFloor(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedFloor === null 
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                : 'bg-zinc-900/60 text-zinc-400 border border-white/10 hover:border-violet-500/30 hover:text-white'
            }`}
          >
            Alle Etagen
          </button>
          {[1, 2, 3].map(floor => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFloor === floor 
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                  : 'bg-zinc-900/60 text-zinc-400 border border-white/10 hover:border-violet-500/30 hover:text-white'
              }`}
            >
              Etage {floor}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Requests */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emergency Requests */}
            {emergencies.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-rose-500/20">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                  </div>
                  <h2 className="font-semibold text-white text-lg">Notfälle</h2>
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded-full text-xs font-bold">
                    {emergencies.length}
                  </span>
                </div>
                <div className="space-y-4">
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
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-violet-500/20">
                  <Bell className="h-5 w-5 text-violet-400" />
                </div>
                <h2 className="font-semibold text-white text-lg">Wartende Anfragen</h2>
                <span className="px-2.5 py-1 bg-violet-500/20 text-violet-400 rounded-full text-xs font-bold">
                  {pendingRequests.filter(r => r.priority < 9).length}
                </span>
              </div>
              <div className="space-y-4">
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
                  <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-500/50" />
                    <p className="text-zinc-400">Keine wartenden Anfragen</p>
                  </div>
                )}
              </div>
            </div>

            {/* My Active Requests */}
            {myRequests.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <User className="h-5 w-5 text-amber-400" />
                  </div>
                  <h2 className="font-semibold text-white text-lg">Meine aktiven Anfragen</h2>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">
                    {myRequests.length}
                  </span>
                </div>
                <div className="space-y-4">
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
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <h3 className="font-semibold text-white mb-4">Dokumentation</h3>
              <Link href="/log">
                <Button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white h-auto py-4 rounded-xl flex-col gap-2 mb-4 shadow-lg shadow-violet-500/25">
                  <FileText className="h-6 w-6" />
                  <span className="font-semibold">Tagesprotokoll</span>
                  <span className="text-xs text-violet-200">Alle Anfragen exportieren</span>
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex-col gap-2 border-white/10 text-zinc-300 hover:bg-white/5 hover:border-violet-500/30 rounded-xl"
                >
                  <Calendar className="h-5 w-5 text-violet-400" />
                  <span className="text-xs">Rundgang</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex-col gap-2 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50 rounded-xl"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs">Notfall</span>
                </Button>
              </div>
            </div>

            {/* Team Status */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Team im Dienst</h3>
                <span className="text-sm text-zinc-500">{staff.filter(s => s.status !== 'offline').length} aktiv</span>
              </div>
              <div className="space-y-3">
                {staff
                  .filter(s => s.status !== 'offline')
                  .filter(s => selectedFloor === null || s.floor === selectedFloor)
                  .map(member => (
                    <StaffCard key={member.id} member={member} />
                  ))}
              </div>
            </div>

            {/* Today's Summary */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-2xl p-5 text-white shadow-xl shadow-violet-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-semibold mb-4 relative">Tagesübersicht</h3>
              <div className="space-y-3 text-sm relative">
                <div className="flex justify-between">
                  <span className="text-violet-200">Anfragen gesamt</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-200">Durchschnittl. Reaktion</span>
                  <span className="font-bold">3.8 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-200">Notfälle bearbeitet</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-200">Zufriedenheit</span>
                  <span className="font-bold">96%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Demo Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20">
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <span className="text-sm">
            <strong className="text-white">Demo-Modus</strong>
            <span className="text-zinc-400"> — Beispieldaten für Vorführungszwecke</span>
          </span>
        </div>
      </div>
    </div>
  );
}
