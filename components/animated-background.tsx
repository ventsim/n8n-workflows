"use client"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce delay-300" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/50 rounded-full animate-bounce delay-700" />
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-400/45 rounded-full animate-bounce delay-1100" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-1500" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}
