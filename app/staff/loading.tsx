/**
 * Staff Dashboard Loading Skeleton
 * Linear/Vercel style shimmer loading states
 */

export default function StaffLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Navigation Skeleton */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 lg:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="hidden sm:block space-y-2">
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                <div className="h-3 w-20 bg-zinc-900 rounded animate-pulse" />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-9 w-9 rounded-full bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-8 w-12 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="h-11 w-11 rounded-xl bg-zinc-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Floor Filter Skeleton */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={`h-10 rounded-full animate-pulse ${
                i === 0 ? 'w-28 bg-violet-500/30' : 'w-24 bg-zinc-800'
              }`}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Request Cards Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-violet-500/20 animate-pulse" />
                <div className="h-5 w-36 bg-zinc-800 rounded animate-pulse" />
                <div className="h-6 w-8 rounded-full bg-violet-500/20 animate-pulse" />
              </div>
              
              {/* Request Cards */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <RequestCardSkeleton key={i} isEmergency={i === 0} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Team & Actions Skeleton */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="h-5 w-28 bg-zinc-800 rounded animate-pulse mb-4" />
              <div className="h-24 rounded-xl bg-zinc-800 animate-pulse mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl bg-zinc-800/50 animate-pulse" />
                <div className="h-20 rounded-xl bg-zinc-800/50 animate-pulse" />
              </div>
            </div>

            {/* Team Status Card */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-28 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <StaffCardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/30 to-fuchsia-700/30 rounded-2xl p-5">
              <div className="h-5 w-28 bg-white/10 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RequestCardSkeleton({ isEmergency = false }: { isEmergency?: boolean }) {
  return (
    <div className={`
      relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl border transition-all
      ${isEmergency ? 'border-rose-500/40' : 'border-white/10'}
    `}>
      {/* Priority gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
        isEmergency 
          ? 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse' 
          : 'bg-gradient-to-r from-violet-500 to-fuchsia-600'
      }`} />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl animate-pulse ${
              isEmergency ? 'bg-rose-500/30' : 'bg-violet-500/30'
            }`} />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-16 bg-zinc-900 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`h-6 w-16 rounded-full animate-pulse ${
              isEmergency ? 'bg-rose-500/20' : 'bg-amber-500/20'
            }`} />
            <div className="h-3 w-10 bg-zinc-900 rounded animate-pulse" />
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 rounded bg-violet-500/30 animate-pulse" />
            <div className="h-3 w-20 bg-violet-500/20 rounded animate-pulse" />
          </div>
          <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Transcript */}
        <div className="p-3 bg-black/30 rounded-xl border border-white/5 mb-4">
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className={`flex-1 h-10 rounded-xl animate-pulse ${
            isEmergency ? 'bg-rose-500/30' : 'bg-violet-500/30'
          }`} />
          <div className="h-10 w-10 rounded-xl bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function StaffCardSkeleton() {
  return (
    <div className="p-4 bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-zinc-800 animate-pulse" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-zinc-700 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-20 bg-zinc-900 rounded animate-pulse" />
        </div>
        <div className="h-6 w-20 rounded-full bg-zinc-800 animate-pulse" />
      </div>
    </div>
  );
}
