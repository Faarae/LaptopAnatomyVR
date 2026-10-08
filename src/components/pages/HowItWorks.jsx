import React from 'react';
import { ArrowRight, Laptop, Layers, Compass, Sparkles } from 'lucide-react';

/**
 * PAGE 4 — HOW IT WORKS (Clean Light Theme)
 * - Three clear steps with numbers (01) ─── (02) ─── (03)
 * - Clean white cards with friendly rounded edges and soft shadows
 * - Zero scroll single viewport fit with safe bottom clearance
 */
export default function HowItWorks({ onNavigate }) {
  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-3 max-w-6xl mx-auto select-none">
      
      {/* ─── 1. PAGE HEADER ─── */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-1 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Panduan Eksplorasi 3 Langkah</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Bagaimana Cara Kerjanya?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5 max-w-md mx-auto">
          Tiga langkah mudah untuk memahami anatomi arsitektur laptop secara komprehensif.
        </p>
      </div>

      {/* ─── 2. STEPPER TIMELINE: (01) ─── (02) ─── (03) ─── */}
      <div className="relative max-w-xl mx-auto w-full flex items-center justify-between px-6 my-1 shrink-0">
        <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-200 z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-emerald-500 text-emerald-700 font-display font-bold text-xs flex items-center justify-center shadow-sm">
            01
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-teal-500 text-teal-700 font-display font-bold text-xs flex items-center justify-center shadow-sm">
            02
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-emerald-600 text-emerald-800 font-display font-bold text-xs flex items-center justify-center shadow-sm">
            03
          </div>
        </div>
      </div>

      {/* ─── 3. 3 STEP CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 my-auto py-1">
        
        {/* Card 01: Choose Your Laptop */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all duration-300 shadow-2xs group">
          <div>
            <div className="w-full aspect-[16/10] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-4 relative overflow-hidden">
              <div className="w-full h-full rounded-lg bg-white border border-slate-200 p-2 flex flex-col justify-between shadow-2xs">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-12 bg-slate-200 rounded-sm" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 my-auto">
                  <div className="h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center">
                    <Laptop className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="h-12 rounded-lg bg-amber-50 border border-amber-100 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-700">RTX 16</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-sm" />
              </div>
            </div>

            <h3 className="text-lg font-bold font-display text-slate-900 mb-1.5 text-center">
              1. Pilih Model Laptop
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed text-center">
              Tentukan model laptop dari kategori Entry Level, Gaming, atau Creator Studio sesuai minat Anda.
            </p>
          </div>
        </div>

        {/* Card 02: Explore Components */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all duration-300 shadow-2xs group">
          <div>
            <div className="w-full aspect-[16/10] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-4 relative overflow-hidden">
              <div className="w-full h-full rounded-lg bg-white border border-slate-200 p-2 flex flex-col items-center justify-center relative shadow-2xs">
                <div className="w-16 h-8 rounded-lg bg-teal-50 border border-teal-200 shadow-sm transform -rotate-6 translate-y-[-4px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-teal-600" />
                </div>
                <div className="w-20 h-7 rounded-lg bg-emerald-50 border border-emerald-200 transform rotate-6 translate-y-[4px] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">SO-DIMM</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold font-display text-slate-900 mb-1.5 text-center">
              2. Bedah Komponen 3D
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed text-center">
              Inspeksi motherboard, putar modul 3D dari berbagai sudut, dan pelajari arsitektur mikro chip komputer.
            </p>
          </div>
        </div>

        {/* Card 03: Learn Through VR */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all duration-300 shadow-2xs group">
          <div>
            <div className="w-full aspect-[16/10] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-4 relative overflow-hidden">
              <div className="w-full h-full rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center relative shadow-2xs">
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-12 rounded-2xl bg-slate-900 border-2 border-emerald-400 flex items-center justify-center shadow-md relative">
                    <div className="w-16 h-5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-around px-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>
                  <div className="w-28 h-2 rounded-full bg-slate-300 -mt-7 -z-10" />
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold font-display text-slate-900 mb-1.5 text-center">
              3. Simulasi & Kuis
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed text-center">
              Uji ketangkasan perakitan di Challenge Lab dan raih pemahaman mendalam tentang ekosistem hardware.
            </p>
          </div>
        </div>

      </div>

      {/* ─── 4. BOTTOM CTA BUTTON (With safe bottom clearance) ─── */}
      <div className="text-center pb-2 shrink-0">
        <button
          onClick={() => onNavigate('laptop-selection')}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-display font-semibold text-sm hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 group active:scale-[0.99]"
        >
          <span>Mulai Eksplorasi Sekarang</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
}
