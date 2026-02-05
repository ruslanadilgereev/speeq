/**
 * Resident Chat Loading Skeleton
 * Clean, minimal loading state for the chat interface
 */

export default function ResidentLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Header Skeleton */}
      <header className="sticky top-0 z-10 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="text-center space-y-2">
            <div className="h-5 w-24 bg-zinc-800 rounded animate-pulse mx-auto" />
            <div className="h-3 w-32 bg-zinc-900 rounded animate-pulse mx-auto" />
          </div>
          <div className="h-9 w-9 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
      </header>

      {/* Messages Area Skeleton */}
      <main className="flex-1 overflow-hidden relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {/* Assistant message skeleton */}
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/40 to-fuchsia-600/40 animate-pulse flex-shrink-0" />
            <div className="max-w-[80%] bg-zinc-900/80 border border-white/10 rounded-2xl px-4 py-3 space-y-3">
              <div className="space-y-2">
                <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-3 w-12 bg-zinc-800/50 rounded animate-pulse" />
            </div>
          </div>

          {/* User message skeleton */}
          <div className="flex gap-3 justify-end">
            <div className="max-w-[80%] bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 rounded-2xl px-4 py-3 space-y-3">
              <div className="h-4 w-40 bg-white/20 rounded animate-pulse" />
              <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/10 animate-pulse flex-shrink-0" />
          </div>

          {/* Another assistant message */}
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/40 to-fuchsia-600/40 animate-pulse flex-shrink-0" />
            <div className="max-w-[80%] bg-zinc-900/80 border border-white/10 rounded-2xl px-4 py-3 space-y-3">
              <div className="space-y-2">
                <div className="h-4 w-56 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-72 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-12 bg-zinc-800/50 rounded animate-pulse" />
                <div className="h-5 w-16 bg-amber-500/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Typing indicator skeleton */}
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/40 to-fuchsia-600/40 animate-pulse flex-shrink-0" />
            <div className="bg-zinc-900/80 border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-violet-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Actions Skeleton */}
      <div className="border-t border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 h-10 rounded-full animate-pulse ${
                  i === 4 ? 'w-24 bg-rose-500/20' : 'w-24 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="border-t border-white/10 bg-[#0a0a0b] relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-zinc-800 animate-pulse" />
            <div className="flex-1 h-12 bg-zinc-800 border border-white/10 rounded-xl animate-pulse" />
            <div className="h-12 w-12 rounded-xl bg-violet-500/30 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
