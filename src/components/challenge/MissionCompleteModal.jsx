import React, { useEffect, useState } from 'react';

/**
 * MissionCompleteModal — Structured Debriefing Modal
 * Uses rounded-xl card, plain uppercase eyebrow text, and clean Primary/Secondary buttons.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Structured Card */}
      <div className="relative w-full max-w-md rounded-xl bg-white border border-slate-200 p-6 shadow-xl overflow-hidden text-center select-none">
        
        {/* Header Title */}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            Diagnostik Selesai
          </p>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Verifikasi selesai. Seluruh parameter telemetri hardware berada dalam margin optimal.
          </p>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          
          {/* Score Counter */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">SKOR</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-0.5">
              {animatedScore}
            </span>
            <span className="text-[9px] font-mono text-emerald-700 font-semibold">PTS</span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-center border-x border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase">AKURASI</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-700 mt-0.5">
              {accuracy}
            </span>
            <span className="text-[9px] font-mono text-slate-400">RATING</span>
          </div>

          {/* Time Elapsed */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">WAKTU</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-0.5">
              {timeSpent}
            </span>
            <span className="text-[9px] font-mono text-amber-700 font-semibold">{rank}</span>
          </div>

        </div>

        {/* Buttons / Actions: 1 Secondary + 1 Primary */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Main Lagi
          </button>

          <button
            onClick={onBackToHub}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Panduan Misi →
          </button>
        </div>

      </div>

    </div>
  );
}
