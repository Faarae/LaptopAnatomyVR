import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Lightbulb, Trophy, Cpu, ShieldCheck } from 'lucide-react';

/**
 * GameShell
 * Unified challenge wrapper for tactile mini-games (Match It, Drag & Place, Find Component, Speed Challenge).
 * - Matches the website design system (transparent ambient integration, Space Grotesk / Inter typography)
 * - Clean status ribbon (progress dots, live score pill, optional hint toggle)
 * - No duplicate full-page header or window locking
 */
export default function GameShell({
  title = "CHALLENGE",
  mission = "01 / 05",
  score = 0,
  scoreDelta = 0,
  currentStep = 1,
  totalSteps = 4,
  hintText = "",
  onBackToHub,
  children,
}) {
  const [showHint, setShowHint] = useState(false);
  const [showDelta, setShowDelta] = useState(false);

  // Pop floating score badge when delta changes
  useEffect(() => {
    if (scoreDelta > 0) {
      setShowDelta(true);
      const timer = setTimeout(() => setShowDelta(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [scoreDelta, score]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-between select-none relative animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. INTEGRATED STATUS & MISSION RIBBON
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#0C2017]/85 border border-[#22C55E]/30 p-3.5 sm:p-4 backdrop-blur-md mb-6 flex items-center justify-between shadow-md">
        
        {/* Left: Back to Quiz / Hub */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#22C55E]/30 bg-[#081810] hover:bg-[#0E2E20] hover:border-[#4ADE80] text-slate-300 hover:text-[#4ADE80] transition-all text-xs font-mono active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← ALL CHALLENGES</span>
          </button>
        </div>

        {/* Center: Mission Progress Segmented Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#081810] border border-[#22C55E]/20 rounded-full px-3.5 py-1">
          <span className="font-mono text-xs font-bold text-[#4ADE80] tracking-wider uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="hidden sm:inline">{title}</span>
          </span>
          
          <span className="text-[10px] font-mono text-slate-400">
            {mission}
          </span>

          {/* Segmented progress dots */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`
                  w-3 sm:w-5 h-1.5 rounded-full transition-all duration-300
                  ${idx < currentStep 
                    ? 'bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.7)]' 
                    : idx === currentStep - 1 
                      ? 'bg-[#FACC15] animate-pulse' 
                      : 'bg-slate-700/60'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Right: Live Score & Hint Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Score Pill */}
          <div className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-[#081810] border border-[#FACC15]/40 text-[#FACC15] font-mono text-xs font-bold shadow-[0_0_12px_rgba(250,204,21,0.2)]">
            <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
            <span>{String(score).padStart(4, '0')}</span>

            {/* Floating +XP Pop Badge */}
            {showDelta && (
              <div className="absolute -bottom-6 right-2 text-[11px] font-mono font-bold text-[#4ADE80] animate-bounce bg-[#061B12] px-1.5 py-0.5 rounded border border-[#4ADE80]/50 shadow-md">
                +{scoreDelta} XP
              </div>
            )}
          </div>

          {/* Hint Trigger Button */}
          {hintText && (
            <button
              onClick={() => setShowHint(prev => !prev)}
              className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono transition-all active:scale-95
                ${showHint 
                  ? 'bg-[#FACC15]/20 border-[#FACC15] text-[#FACC15]' 
                  : 'bg-[#081810] border-[#22C55E]/30 text-slate-300 hover:text-[#FACC15] hover:border-[#FACC15]/50'
                }
              `}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HINT</span>
            </button>
          )}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HINT TOOLTIP (Slide-down if toggled)
         ───────────────────────────────────────────────────────────── */}
      {showHint && hintText && (
        <div className="relative z-30 w-full max-w-xl mx-auto px-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3.5 rounded-xl bg-[#0B261A]/95 border border-[#FACC15]/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
            <div className="text-xs font-sans text-slate-200 leading-relaxed">
              <strong className="text-[#FACC15] font-mono mr-1">HARDWARE HINT:</strong>
              {hintText}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CHALLENGE VIEWPORT
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full flex-1">
        {children}
      </div>

    </div>
  );
}
