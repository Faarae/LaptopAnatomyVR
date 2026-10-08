import React from 'react';
import { 
  ArrowRight, Timer, Zap, CheckCircle2, 
  Layers, Cpu, HardDrive, Sparkles, Flame 
} from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * GamePreview (Clean Light Theme)
 * Central interactive preview panel for Challenge Hub with clean white surfaces,
 * dynamic gameplay simulations, and an emerald launch CTA.
 */
export default function GamePreview({ challenge, onLaunchGame }) {
  if (!challenge) return null;

  return (
    <div className="w-full h-full rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl shadow-slate-900/5 relative overflow-hidden select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          1. PREVIEW HEADER STRIP
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-mono tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE PREVIEW</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-bold">
            CHALLENGE // {challenge.number}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase font-semibold">
            {challenge.category}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CHALLENGE TITLE & DESCRIPTION
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mb-2.5 shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
          <span>{challenge.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed mt-0.5 line-clamp-2">
          {challenge.description}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. DYNAMIC INTERACTIVE GAMEPLAY SIMULATION VIEWPORT
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 min-h-[220px] sm:min-h-[250px] rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4 my-auto flex flex-col justify-between overflow-hidden shadow-inner">
        
        {/* ── STATE 01: QUICK QUIZ PREVIEW ── */}
        {challenge.id === 'quiz' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-emerald-700 font-bold">PERTANYAAN 01 DARI 10</span>
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                <Timer className="w-3.5 h-3.5" />
                <span>00:30</span>
              </div>
            </div>

            <div className="my-2">
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-relaxed">
                "Komponen manakah yang berfungsi sebagai otak utama laptop untuk mengeksekusi instruksi komputasi dan pemrosesan logika?"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800 font-bold flex items-center justify-between shadow-2xs">
                <span>A. Central Processing Unit (CPU)</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
                <span>B. Graphics Processing Unit (GPU)</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
                <span>C. System Memory (RAM)</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
                <span>D. Solid State Drive (SSD)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-amber-600 flex items-center gap-1 font-semibold">
                <Flame className="w-3 h-3 text-amber-500" />
                STREAK × 1 (+100 XP)
              </span>
              <span>20 BANK SOAL • SHUFFLE ACAK</span>
            </div>
          </div>
        )}

        {/* ── STATE 02: MATCH IT PREVIEW ── */}
        {challenge.id === 'match' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-emerald-700 font-bold">3D BUS INTERCONNECT MATCHING</span>
              <span className="text-amber-600 font-semibold">1 DARI 4 TERHUBUNG</span>
            </div>

            <div className="relative my-auto py-2">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path d="M 130 25 C 200 25, 200 75, 270 75" fill="none" stroke="#10b981" strokeWidth="2.5" />
              </svg>

              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs font-mono text-emerald-900 font-semibold">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      <span>CPU DIE</span>
                    </div>
                    <span className="text-[9px] text-emerald-700 font-bold">MATCHED ✓</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-xs font-mono text-slate-600">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>GPU CHIP</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600">
                    <span className="block font-bold text-slate-800 text-[11px]">Renders 3D Shaders</span>
                    <span className="text-[9px] text-slate-400">Geometry Rasterization</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-900">
                    <span className="block font-bold text-slate-900 text-[11px]">Executes Core Logic</span>
                    <span className="text-[9px] text-emerald-700">Machine Instructions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-emerald-700 font-semibold">8 MODUL KOMPONEN ACAK</span>
              <span className="text-amber-600 font-semibold">400 XP REWARD</span>
            </div>
          </div>
        )}

        {/* ── STATE 03: DRAG & PLACE PREVIEW ── */}
        {challenge.id === 'drag' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-emerald-700 font-bold">WORKBENCH PERAKITAN MOTHERBOARD</span>
              <span className="text-amber-600 font-semibold">1 / 3 SOKET TERPASANG</span>
            </div>

            <div className="my-auto py-2 grid grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-2xl border border-emerald-300 bg-emerald-50 text-center flex flex-col items-center justify-between shadow-2xs">
                <span className="text-[9px] font-mono text-emerald-700 font-bold">PIN 001 ALIGNED</span>
                <Cpu className="w-6 h-6 text-emerald-600 my-1" />
                <span className="text-[9px] font-mono font-bold text-slate-800">CPU LOCKED</span>
              </div>

              <div className="p-2.5 rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 text-center flex flex-col items-center justify-between animate-pulse">
                <span className="text-[9px] font-mono text-amber-700 font-semibold">KEY NOTCH</span>
                <Layers className="w-6 h-6 text-amber-600 my-1" />
                <span className="text-[9px] font-mono text-amber-800 font-bold">PASANG RAM DISINI</span>
              </div>

              <div className="p-2.5 rounded-2xl border border-dashed border-slate-300 bg-white text-center flex flex-col items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400">STANDOFF M.2</span>
                <HardDrive className="w-6 h-6 text-slate-400 my-1" />
                <span className="text-[9px] font-mono text-slate-500">SLOT NVMe KOSONG</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-emerald-700 font-semibold">TELEMETRI SNAP 3D AKTIF</span>
              <span className="text-amber-600 font-semibold">500 XP REWARD</span>
            </div>
          </div>
        )}

        {/* ── STATE 04: FIND COMPONENT PREVIEW ── */}
        {challenge.id === 'find' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-emerald-700 font-bold">3D SPATIAL PCB LOCATOR RADAR</span>
              <span className="text-amber-600 font-semibold">TARGET #01: CPU SOCKET</span>
            </div>

            <div className="relative w-full h-28 my-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
              <div className="absolute w-24 h-24 rounded-full border border-emerald-200" />
              <div className="absolute w-16 h-16 rounded-full border border-emerald-300" />
              <div className="absolute w-8 h-8 rounded-full border border-emerald-400 animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm" />

              <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-700 font-bold">
                SCANNER // RAYCAST ACTIVE
              </div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-400">
                X: +1.24 Y: +0.48 Z: -2.10
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-emerald-700 font-semibold">360° ORBIT DIGITAL TWIN</span>
              <span className="text-amber-600 font-semibold">5 SPATIAL TARGETS</span>
            </div>
          </div>
        )}

        {/* ── STATE 05: SPEED CHALLENGE PREVIEW ── */}
        {challenge.id === 'speed' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-amber-700 font-bold">OVERCLOCK DIAGNOSTIC SPRINT</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-bold animate-pulse">
                <Timer className="w-3.5 h-3.5" />
                <span>00:45 REMAINING</span>
              </div>
            </div>

            <div className="my-auto py-1 flex items-center justify-between gap-3">
              <div className="w-28 h-20 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Component3DViewer type="cpu" heightClass="h-20" className="border-0 bg-transparent shadow-none" autoRotateSpeed={3.0} />
              </div>

              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-center font-mono text-[10px] font-bold text-emerald-800">
                  CPU DIE ✓
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-center font-mono text-[10px] text-slate-500">
                  GPU VRM
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-center font-mono text-[10px] text-slate-500">
                  BIOS CHIP
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-center font-mono text-[10px] text-slate-500">
                  AUDIO CODEC
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-amber-600 flex items-center gap-1 font-semibold">
                <Zap className="w-3 h-3 text-amber-500" />
                STREAK MULTIPLIER UP TO 5x (+500 XP)
              </span>
              <span className="text-emerald-700 font-bold">+2s BONUS PER HIT</span>
            </div>
          </div>
        )}

        {/* ── STATE 06: HARDWARE IDENTIFICATION PREVIEW ── */}
        {challenge.id === 'identify' && (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-200 pb-2">
              <span className="text-emerald-700 font-bold">ANALISA SPESIFIKASI MODUL</span>
              <span className="text-amber-600 font-semibold">SPEC ANALYZER</span>
            </div>

            <div className="my-auto py-1">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[8px] font-mono text-slate-400 block">BUS INTERFACE</span>
                  <span className="text-[10px] font-mono text-slate-800 font-bold">PCIe Gen4 x4</span>
                </div>
                <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[8px] font-mono text-slate-400 block">THROUGHPUT</span>
                  <span className="text-[10px] font-mono text-slate-800 font-bold">7,000 MB/s</span>
                </div>
                <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[8px] font-mono text-slate-400 block">FORM FACTOR</span>
                  <span className="text-[10px] font-mono text-slate-800 font-bold">M.2 2280 Key-M</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs font-mono text-emerald-900 font-semibold">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-600" />
                  <span>IDENTIFIED: M.2 NVMe SSD GEN4</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">MATCH CONFIRMED ✓</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
              <span className="text-emerald-700 font-semibold">DOSSIER ARSITEKTUR TEKNIKAL</span>
              <span className="text-amber-600 font-semibold">5 TIER KOMPONEN</span>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. PREVIEW FOOTER & PRIMARY LAUNCH ACTION CTA
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-slate-100 mt-2.5 shrink-0">
        
        {/* Meta Stats Badges */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">TINGKAT:</span>
            <span className="text-emerald-700 font-bold">{challenge.difficulty}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">DURASI:</span>
            <span className="text-amber-600 font-bold">{challenge.estimatedTime}</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onLaunchGame(challenge.id)}
          className="w-full sm:w-auto px-7 py-2.5 rounded-xl font-display text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-[0.98] group"
        >
          <span>MULAI TANTANGAN</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

      </div>

    </div>
  );
}
