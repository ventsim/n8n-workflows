"use client"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Animated dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-orange-400/40 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400/20 rounded-full animate-bounce delay-1500"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(168 85 247 / 0.3) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  )
}
