'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Settings, Users, Activity, Bell, Menu, X, ChevronLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/sign-in">
          <Button variant="ghost" size="sm" className="text-slate-600">
            Anmelden
          </Button>
        </Link>
        <Link href="/preise">
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4">
            Kostenlos testen
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9 border-2 border-slate-200 hover:border-teal-300 transition-colors">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Einstellungen</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer text-rose-600 focus:text-rose-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Abmelden</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: typeof Home }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-teal-50 text-teal-700 shadow-sm' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <Icon className={`h-4 w-4 ${isActive ? 'text-teal-600' : ''}`} />
      {children}
    </Link>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-shadow">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Pflege<span className="text-teal-600">AI</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/staff" icon={Users}>Personal</NavLink>
            <NavLink href="/requests" icon={Bell}>Anfragen</NavLink>
            <NavLink href="/dashboard" icon={Settings}>Einstellungen</NavLink>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link 
              href="/resident" 
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium hover:bg-teal-100 transition-colors"
            >
              <Home className="h-4 w-4" />
              Bewohner-Demo
            </Link>
            
            <Suspense fallback={<div className="h-9 w-9 rounded-full bg-slate-100 animate-pulse" />}>
              <UserMenu />
            </Suspense>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-700" />
              ) : (
                <Menu className="h-5 w-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-1">
            <MobileNavLink href="/staff" icon={Users} onClick={() => setMobileMenuOpen(false)}>
              Personal
            </MobileNavLink>
            <MobileNavLink href="/requests" icon={Bell} onClick={() => setMobileMenuOpen(false)}>
              Anfragen
            </MobileNavLink>
            <MobileNavLink href="/resident" icon={Home} onClick={() => setMobileMenuOpen(false)}>
              Bewohner-Demo
            </MobileNavLink>
            <MobileNavLink href="/dashboard" icon={Settings} onClick={() => setMobileMenuOpen(false)}>
              Einstellungen
            </MobileNavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

function MobileNavLink({ 
  href, 
  children, 
  icon: Icon,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: typeof Home;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-teal-50 text-teal-700' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      <Icon className={`h-5 w-5 ${isActive ? 'text-teal-600' : ''}`} />
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-[#fafbfc]">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
}
