'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Settings, Users, Activity, Bell, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
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
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5">
            Anmelden
          </Button>
        </Link>
        <Link href="/preise">
          <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full px-4 font-medium">
            Kostenlos testen
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9 border-2 border-white/10 hover:border-violet-500/50 transition-colors">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white font-medium text-sm">
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-white/10">
        <DropdownMenuItem className="cursor-pointer text-zinc-300 focus:text-white focus:bg-white/5">
          <Link href="/dashboard" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Einstellungen</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer text-rose-400 focus:text-rose-300 focus:bg-rose-500/10">
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
          ? 'bg-white/10 text-white' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`h-4 w-4 ${isActive ? 'text-violet-400' : ''}`} />
      {children}
    </Link>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Pflege<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
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
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium hover:bg-violet-500/20 hover:border-violet-500/30 transition-all"
            >
              <Home className="h-4 w-4" />
              Bewohner-Demo
            </Link>
            
            <Suspense fallback={<div className="h-9 w-9 rounded-full bg-white/5 animate-pulse" />}>
              <UserMenu />
            </Suspense>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-1 border-t border-white/5 mt-4">
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
          ? 'bg-white/10 text-white' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`h-5 w-5 ${isActive ? 'text-violet-400' : ''}`} />
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />
      </div>
      
      <Header />
      <div className="flex-1 relative z-10">
        {children}
      </div>
    </section>
  );
}
