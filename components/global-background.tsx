"use client"

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>

      {/* Nebula effect - más visible */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[40%] opacity-30 dark:opacity-40 
           bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.8)_0%,rgba(0,0,0,0)_70%)]"
      ></div>

      <div
        className="absolute bottom-[10%] left-[5%] w-[70%] h-[50%] opacity-25 dark:opacity-35 
           bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.7)_0%,rgba(0,0,0,0)_70%)]"
      ></div>

      <div
        className="absolute top-[30%] right-[10%] w-[40%] h-[45%] opacity-30 dark:opacity-40 
           bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.6)_0%,rgba(0,0,0,0)_70%)]"
      ></div>

      {/* Organic shapes - más visibles */}
      <div
        className="absolute top-[15%] left-[25%] w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-30 
           bg-sulkar-green blur-3xl"
      ></div>

      <div
        className="absolute bottom-[25%] right-[15%] w-[350px] h-[350px] rounded-full opacity-20 dark:opacity-30 
           bg-emerald-500 blur-3xl"
      ></div>

      <div
        className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full opacity-20 dark:opacity-30 
           bg-teal-500 blur-3xl"
      ></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-15 
           bg-[linear-gradient(45deg,rgba(46,125,50,0.1)_25%,transparent_25%,transparent_50%,rgba(46,125,50,0.1)_50%,rgba(46,125,50,0.1)_75%,transparent_75%,transparent)] 
           bg-[size:100px_100px]"
      ></div>

      {/* Stars effect for dark mode */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute h-2 w-2 rounded-full bg-white/80 top-[10%] left-[15%] shadow-[0_0_15px_3px_rgba(255,255,255,0.7)]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/70 top-[25%] left-[40%] shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]"></div>
        <div className="absolute h-3 w-3 rounded-full bg-white/90 top-[15%] left-[70%] shadow-[0_0_18px_4px_rgba(255,255,255,0.8)]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/80 top-[45%] left-[85%] shadow-[0_0_15px_3px_rgba(255,255,255,0.7)]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/80 top-[65%] left-[25%] shadow-[0_0_15px_3px_rgba(255,255,255,0.7)]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/70 top-[75%] left-[60%] shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]"></div>
        <div className="absolute h-3 w-3 rounded-full bg-white/90 top-[85%] left-[80%] shadow-[0_0_18px_4px_rgba(255,255,255,0.8)]"></div>
      </div>
    </div>
  )
}
