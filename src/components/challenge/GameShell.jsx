import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Lightbulb, Cpu } from 'lucide-react';

/**
 * GameShell (Clean Light Theme)
 * Unified challenge wrapper for tactile mini-games with clean white surface ribbon,
 * soft shadows, and emerald progress dots.
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
      <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 backdrop-blur-md mb-4 flex items-center justify-between shadow-xs">
        
        {/* Left: Back to Briefing */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-all text-xs font-mono active:scale-95 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← PANDUAN MISI</span>
          </button>
        </div>

        {/* Center: Mission Progress Segmented Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1">
          <span className="font-mono text-xs font-bold text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
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
                    ? 'bg-emerald-500 shadow-xs' 
                    : idx === currentStep - 1 
                      ? 'bg-amber-400 animate-pulse' 
                      : 'bg-slate-200'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Right: Live Score & Hint Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Score Pill */}
          <div className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono text-xs font-bold shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{String(score).padStart(4, '0')}</span>

            {/* Floating +XP Pop Badge */}
            {showDelta && (
              <div className="absolute -bottom-6 right-2 text-[11px] font-mono font-bold text-emerald-700 animate-bounce bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-300 shadow-md">
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
                  ? 'bg-amber-100/70 border-amber-300 text-amber-800' 
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-amber-700 hover:border-amber-300'
                }
              `}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">HINT</span>
            </button>
          )}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HINT TOOLTIP
         ───────────────────────────────────────────────────────────── */}
      {showHint && hintText && (
        <div className="relative z-30 w-full max-w-xl mx-auto px-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 shadow-md flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs font-sans text-amber-900 leading-relaxed">
              <strong className="text-amber-700 font-mono mr-1">PETUNJUK:</strong>
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
