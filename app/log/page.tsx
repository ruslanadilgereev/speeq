'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Printer,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Tagesprotokoll / Daily Request Log
 * Simple documentation view for end-of-day reporting
 * Clean, minimal, exportable - as requested by Ruslan
 */

interface LogEntry {
  id: string;
  time: string;
  resident: string;
  room: string;
  request: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  handledBy: string;
  responseTime: string;
  status: 'resolved' | 'escalated' | 'pending';
  notes?: string;
}

// Demo data - would come from API in production
const generateDemoLog = (date: Date): LogEntry[] => {
  const isToday = date.toDateString() === new Date().toDateString();
  
  return [
    {
      id: '1',
      time: '06:32',
      resident: 'Maria Schmidt',
      room: '214',
      request: 'Hilfe beim Aufstehen benötigt',
      priority: 'medium',
      handledBy: 'Anna Becker',
      responseTime: '3 min',
      status: 'resolved',
    },
    {
      id: '2',
      time: '07:15',
      resident: 'Hans Müller',
      room: '108',
      request: 'Medikament vergessen',
      priority: 'high',
      handledBy: 'Thomas Richter',
      responseTime: '2 min',
      status: 'resolved',
      notes: 'Blutdruckmedikament nachgereicht',
    },
    {
      id: '3',
      time: '08:45',
      resident: 'Kurt Fischer',
      room: '112',
      request: 'Toilettengang',
      priority: 'medium',
      handledBy: 'Sarah Koch',
      responseTime: '4 min',
      status: 'resolved',
    },
    {
      id: '4',
      time: '09:20',
      resident: 'Ingrid Weber',
      room: '305',
      request: 'Wasser gewünscht',
      priority: 'low',
      handledBy: 'Lisa Hoffmann',
      responseTime: '8 min',
      status: 'resolved',
    },
    {
      id: '5',
      time: '10:05',
      resident: 'Helga Braun',
      room: '201',
      request: 'Sturz im Zimmer',
      priority: 'emergency',
      handledBy: 'Anna Becker',
      responseTime: '1 min',
      status: 'escalated',
      notes: 'Arzt informiert, keine sichtbaren Verletzungen',
    },
    {
      id: '6',
      time: '11:30',
      resident: 'Werner Klein',
      room: '118',
      request: 'Schmerzen - Rücken',
      priority: 'high',
      handledBy: 'Michael Weber',
      responseTime: '3 min',
      status: 'resolved',
      notes: 'Schmerzmittel verabreicht nach Rücksprache',
    },
    {
      id: '7',
      time: '12:45',
      resident: 'Erna Schulz',
      room: '220',
      request: 'Decke gewünscht',
      priority: 'low',
      handledBy: 'Thomas Richter',
      responseTime: '6 min',
      status: 'resolved',
    },
    {
      id: '8',
      time: '14:10',
      resident: 'Maria Schmidt',
      room: '214',
      request: 'Begleitung zum Garten',
      priority: 'low',
      handledBy: 'Sarah Koch',
      responseTime: '12 min',
      status: 'resolved',
    },
    ...(isToday ? [
      {
        id: '9',
        time: '15:30',
        resident: 'Hans Müller',
        room: '108',
        request: 'Übelkeit, fühlt sich unwohl',
        priority: 'high' as const,
        handledBy: 'Anna Becker',
        responseTime: '2 min',
        status: 'resolved' as const,
        notes: 'Flüssigkeit gegeben, Beobachtung',
      },
      {
        id: '10',
        time: '16:45',
        resident: 'Kurt Fischer',
        room: '112',
        request: 'Gesellschaft gewünscht',
        priority: 'low' as const,
        handledBy: 'Lisa Hoffmann',
        responseTime: '15 min',
        status: 'resolved' as const,
      },
    ] : []),
  ];
};

function getPriorityStyle(priority: LogEntry['priority']) {
  switch (priority) {
    case 'emergency': return 'bg-red-100 text-red-700 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default: return 'bg-green-100 text-green-700 border-green-200';
  }
}

function getPriorityLabel(priority: LogEntry['priority']) {
  switch (priority) {
    case 'emergency': return 'Notfall';
    case 'high': return 'Hoch';
    case 'medium': return 'Mittel';
    default: return 'Niedrig';
  }
}

function getStatusStyle(status: LogEntry['status']) {
  switch (status) {
    case 'resolved': return 'text-green-600';
    case 'escalated': return 'text-orange-600';
    default: return 'text-gray-500';
  }
}

function getStatusIcon(status: LogEntry['status']) {
  switch (status) {
    case 'resolved': return <CheckCircle className="h-4 w-4" />;
    case 'escalated': return <AlertTriangle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
}

export default function DailyLogPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const log = useMemo(() => generateDemoLog(selectedDate), [selectedDate]);
  
  const stats = useMemo(() => {
    const total = log.length;
    const emergencies = log.filter(e => e.priority === 'emergency').length;
    const avgResponse = log.reduce((sum, e) => sum + parseInt(e.responseTime), 0) / total;
    const escalated = log.filter(e => e.status === 'escalated').length;
    return { total, emergencies, avgResponse: avgResponse.toFixed(1), escalated };
  }, [log]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    if (newDate <= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const exportCSV = () => {
    const headers = ['Zeit', 'Bewohner', 'Zimmer', 'Anfrage', 'Priorität', 'Bearbeitet von', 'Reaktionszeit', 'Status', 'Notizen'];
    const rows = log.map(entry => [
      entry.time,
      entry.resident,
      entry.room,
      entry.request,
      getPriorityLabel(entry.priority),
      entry.handledBy,
      entry.responseTime,
      entry.status,
      entry.notes || ''
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tagesprotokoll_${selectedDate.toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/staff" className="p-2 -ml-2 text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Tagesprotokoll
                </h1>
                <p className="text-sm text-gray-500">Dokumentation aller Anfragen</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Drucken
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Date Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 print:border-0 print:p-0 print:mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg print:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-900">
                <Calendar className="h-5 w-5 text-blue-600 print:hidden" />
                <span className="font-semibold">{formatDate(selectedDate)}</span>
              </div>
              {selectedDate.toDateString() === new Date().toDateString() && (
                <span className="text-xs text-blue-600 font-medium">Heute</span>
              )}
            </div>
            <button
              onClick={() => changeDate(1)}
              disabled={selectedDate.toDateString() === new Date().toDateString()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-30 print:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print:grid-cols-4 print:gap-2 print:mb-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 print:p-2 print:border-gray-300">
            <p className="text-sm text-gray-500">Anfragen gesamt</p>
            <p className="text-2xl font-bold text-gray-900 print:text-lg">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 print:p-2 print:border-gray-300">
            <p className="text-sm text-gray-500">Ø Reaktionszeit</p>
            <p className="text-2xl font-bold text-gray-900 print:text-lg">{stats.avgResponse} min</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 print:p-2 print:border-gray-300">
            <p className="text-sm text-gray-500">Notfälle</p>
            <p className="text-2xl font-bold text-red-600 print:text-lg">{stats.emergencies}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 print:p-2 print:border-gray-300">
            <p className="text-sm text-gray-500">Eskaliert</p>
            <p className="text-2xl font-bold text-orange-600 print:text-lg">{stats.escalated}</p>
          </div>
        </div>

        {/* Log Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden print:border-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 print:bg-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3">Zeit</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3">Bewohner</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3 hidden md:table-cell print:table-cell">Anfrage</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3">Priorität</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3 hidden sm:table-cell print:table-cell">Bearbeitet</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {log.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 print:hover:bg-white">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-900">{entry.time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{entry.resident}</p>
                        <p className="text-xs text-gray-500">Zi. {entry.room}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell print:table-cell">
                      <p className="text-sm text-gray-700">{entry.request}</p>
                      {entry.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">📝 {entry.notes}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityStyle(entry.priority)}`}>
                        {getPriorityLabel(entry.priority)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell print:table-cell">
                      <div>
                        <p className="text-sm text-gray-700">{entry.handledBy}</p>
                        <p className="text-xs text-gray-500">{entry.responseTime}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${getStatusStyle(entry.status)}`}>
                        {getStatusIcon(entry.status)}
                        <span className="hidden sm:inline print:inline">
                          {entry.status === 'resolved' ? 'Erledigt' : 
                           entry.status === 'escalated' ? 'Eskaliert' : 'Offen'}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600">
          <p>Erstellt am: {new Date().toLocaleString('de-DE')}</p>
          <p>PflegeAI Tagesprotokoll — Automatisch generiert</p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-400 mt-6 print:hidden">
          Alle Zeiten in lokalem Format • Daten dienen der Dokumentation
        </p>
      </main>
    </div>
  );
}
