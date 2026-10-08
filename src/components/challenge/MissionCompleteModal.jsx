import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle, RotateCcw, ArrowLeft } from 'lucide-react';

/**
 * MissionCompleteModal (Clean Light Theme)
 * Debriefing panel for when a player completes any challenge game.
 */
export default function MissionCompleteModal({
  title = "MISI SELESAI",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Modal Tactical Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl overflow-hidden text-center select-none animate-in zoom-in-95 duration-300">
        
        {/* Top Trophy Pod */}
        <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center shadow-md mb-4 animate-bounce">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>

        {/* Header Title */}
        <div className="relative z-10 mb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono uppercase tracking-wider mb-1.5 font-semibold">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>DIAGNOSTIK SELESAI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Verifikasi selesai. Seluruh parameter telemetri hardware berada dalam margin optimal.
          </p>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 my-6 p-3 rounded-2xl bg-slate-50 border border-slate-100">
          
          {/* Score Counter */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase">SKOR</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-amber-600 mt-0.5">
              {animatedScore}
            </span>
            <span className="text-[8px] font-mono text-emerald-600 font-bold">PTS</span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-center border-x border-slate-200">
            <span className="text-[9px] font-mono text-slate-400 uppercase">AKURASI</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-700 mt-0.5">
              {accuracy}
            </span>
            <span className="text-[8px] font-mono text-slate-400">RATING</span>
          </div>

          {/* Time Elapsed */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase">WAKTU</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-slate-800 mt-0.5">
              {timeSpent}
            </span>
            <span className="text-[8px] font-mono text-amber-600 font-bold">{rank}</span>
          </div>

        </div>

        {/* Buttons / Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onPlayAgain}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold transition-all active:scale-95 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={onBackToHub}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all active:scale-95 shadow-md shadow-emerald-600/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PANDUAN MISI</span>
          </button>
        </div>

      </div>

    </div>
  );
}
