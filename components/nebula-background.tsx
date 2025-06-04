"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function NebulaBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sulkar-green/5 via-emerald-500/10 to-teal-600/5 dark:from-sulkar-green/20 dark:via-emerald-800/30 dark:to-teal-900/20"></div>

      {/* Nebula effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.15)_0%,rgba(0,0,0,0)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.15)_0%,rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.25)_0%,rgba(0,0,0,0)_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1)_0%,rgba(0,0,0,0)_70%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.2)_0%,rgba(0,0,0,0)_70%)]"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,79,79,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Stars effect for dark mode */}
      {isDark && (
        <div className="absolute inset-0">
          <div className="absolute h-1 w-1 rounded-full bg-white/70 top-[10%] left-[15%] shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white/60 top-[25%] left-[40%] shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"></div>
          <div className="absolute h-[3px] w-[3px] rounded-full bg-white/80 top-[15%] left-[70%] shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]"></div>
          <div className="absolute h-[2px] w-[2px] rounded-full bg-white/70 top-[45%] left-[85%] shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute h-[2px] w-[2px] rounded-full bg-white/70 top-[65%] left-[25%] shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white/60 top-[75%] left-[60%] shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"></div>
          <div className="absolute h-[3px] w-[3px] rounded-full bg-white/80 top-[85%] left-[80%] shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]"></div>
        </div>
      )}

      {/* Gradient mask */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  )
}
