import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle, RotateCcw, ArrowLeft, Star, Award, Zap } from 'lucide-react';

/**
 * MissionCompleteModal
 * HUD-styled debriefing panel for when a player completes any of the 5 mini-games.
 * Features staggered count-up animations for score, accuracy, and elapsed time.
 */
export default function MissionCompleteModal({
  title = "MISSION COMPLETE",
  score = 850,
  accuracy = "100%",
  timeSpent = "01:24",
  rank = "S-RANK",
  onPlayAgain,
  onBackToHub,
}) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Score counter animation
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(score / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Tactical Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#071911]/95 border border-[#22C55E]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(34,197,94,0.35),0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden text-center select-none animate-in zoom-in-95 duration-300">
        
        {/* Circuit Pattern & Ambient Flare */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-30 pointer-events-none" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#22C55E]/20 blur-3xl pointer-events-none rounded-full" />

        {/* Top Trophy Pod */}
        <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-[#0F3020] border-2 border-[#22C55E] flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.5)] mb-4 animate-bounce">
          <Trophy className="w-8 h-8 text-[#FACC15]" />
        </div>

        {/* Header Title */}
        <div className="relative z-10 mb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0F3020] border border-[#22C55E]/40 text-[#4ADE80] text-[10px] font-mono uppercase tracking-widest mb-1.5">
            <CheckCircle className="w-3 h-3 text-[#4ADE80]" />
            <span>HARDWARE DIAGNOSTIC COMPLETE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-300 font-sans mt-1">
            System performance verified. All telemetry parameters within optimal margins.
          </p>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 my-6 p-3 rounded-xl bg-[#04150F]/80 border border-[#22C55E]/30">
          
          {/* Score Counter */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase">SCORE</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-[#FACC15] mt-0.5">
              {animatedScore}
            </span>
            <span className="text-[8px] font-mono text-[#4ADE80] font-semibold">PTS</span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-center border-x border-[#22C55E]/20">
            <span className="text-[9px] font-mono text-slate-400 uppercase">ACCURACY</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-[#4ADE80] mt-0.5">
              {accuracy}
            </span>
            <span className="text-[8px] font-mono text-slate-400">RATING</span>
          </div>

          {/* Time Elapsed */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase">TIME</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
              {timeSpent}
            </span>
            <span className="text-[8px] font-mono text-[#FACC15] font-semibold">{rank}</span>
          </div>

        </div>

        {/* Buttons / Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onPlayAgain}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0C2419] border border-[#22C55E]/40 hover:border-[#4ADE80] hover:bg-[#123827] text-white text-xs font-mono font-semibold transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#4ADE80]" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            onClick={onBackToHub}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#4ADE80] text-[#04150F] text-xs font-mono font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CHALLENGE LAB</span>
          </button>
        </div>

      </div>

    </div>
  );
}
