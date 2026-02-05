import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-gray-50">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Activity className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Seite nicht gefunden
        </h1>
        <p className="text-base text-gray-500">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
