import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';
import { isSfxMuted, toggleSfxMuted, subscribeSfxMute } from '../../utils/soundEffects';

/**
 * GameShell — Structured Challenge Workspace Header & Container
 * - Standardizes radii to rounded-lg / rounded-xl (no capsule pills)
 * - Features smooth count-up score animation & built-in SFX Mute/Unmute toggle
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
  const [displayScore, setDisplayScore] = useState(score);
  const [sfxMuted, setSfxMutedState] = useState(() => isSfxMuted());

  useEffect(() => {
    return subscribeSfxMute((muted) => setSfxMutedState(muted));
  }, []);

  // Count-up animation on score change
  useEffect(() => {
    if (displayScore === score) return;
    const diff = score - displayScore;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 14));
    const timer = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev < score) return Math.min(score, prev + step);
        if (prev > score) return Math.max(score, prev - step);
        clearInterval(timer);
        return score;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [score, displayScore]);

  useEffect(() => {
    if (scoreDelta > 0) {
      setShowDelta(true);
      const timer = setTimeout(() => setShowDelta(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [scoreDelta, score]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-between select-none relative animate-fade-slide-up">
      
      {/* 1. INTEGRATED STATUS & MISSION CONTROL BAR */}
      <div className="rounded-xl bg-white border border-slate-200 p-3.5 mb-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        
        {/* Left: Back to Briefing */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHub}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 active:scale-95 transition-all text-xs font-medium cursor-pointer"
          >
            ← Panduan Misi
          </button>
        </div>

        {/* Center: Mission Progress Bar */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5">
          <span className="font-mono text-xs font-bold text-slate-900 tracking-wider uppercase">
            {title}
          </span>
          
          <span className="text-[11px] font-mono text-slate-400">
            {mission}
          </span>

          {/* Segmented progress blocks */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`w-4 sm:w-5 h-1.5 rounded-xs transition-all duration-300 ${
                  idx < currentStep
                    ? 'bg-emerald-600'
                    : idx === currentStep - 1
                    ? 'bg-amber-500'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Live Animated Count-Up Score, Hint & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Structured Score Readout with Count-Up */}
          <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs font-bold">
            <span className="text-slate-400 font-normal">SKOR:</span>
            <span className="text-emerald-700">{String(displayScore).padStart(4, '0')}</span>

            {showDelta && (
              <div className="absolute -bottom-7 right-0 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-300 shadow-sm animate-bounce">
                +{scoreDelta} XP
              </div>
            )}
          </div>

          {/* Hint Trigger Button */}
          {hintText && (
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium active:scale-90 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                showHint
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Info strokeWidth={1.75} className="w-3.5 h-3.5" />
              <span>Petunjuk</span>
            </button>
          )}

          {/* SFX Mute/Unmute Toggle */}
          <button
            type="button"
            data-no-sfx="true"
            onClick={() => setSfxMutedState(toggleSfxMuted())}
            title={sfxMuted ? 'Aktifkan Suara (SFX)' : 'Matikan Suara (SFX)'}
            className={`p-1.5 rounded-lg border transition-all active:scale-90 cursor-pointer ${
              sfxMuted
                ? 'bg-slate-100 border-slate-200 text-slate-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            {sfxMuted ? (
              <VolumeX strokeWidth={1.75} className="w-4 h-4" />
            ) : (
              <Volume2 strokeWidth={1.75} className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>

      {/* 2. HINT PANEL */}
      {showHint && hintText && (
        <div className="relative z-30 w-full max-w-2xl mx-auto mb-4 animate-fade-slide-up">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-semibold mr-1.5">Petunjuk Teknis:</strong>
            {hintText}
          </div>
        </div>
      )}

      {/* 3. MAIN CHALLENGE VIEWPORT */}
      <div className="w-full flex-1">
        {children}
      </div>

    </div>
  );
}
