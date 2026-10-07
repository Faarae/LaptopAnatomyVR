import React from 'react';
import { ArrowRight, Laptop, Layers, Eye } from 'lucide-react';

/**
 * PAGE 4 — HOW IT WORKS
 * Replicates Page 4 from the user's reference image:
 * - Header: "How It Works" & "Three simple steps to start your learning journey."
 * - Stepper indicator: (01) ─── (02) ─── (03) in yellow/gold circles
 * - 3 Visual Cards: Choose Your Laptop, Explore Components, Learn Through VR
 * - Bottom CTA: "Start Exploring →" (green pill button)
 */
export default function HowItWorks({ onNavigate }) {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-10 bg-transparent">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight mb-3">
            How It Works
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Three simple steps to start your learning journey.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            STEPPER TIMELINE: (01) ─── (02) ─── (03)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative max-w-2xl mx-auto flex items-center justify-between mb-12 px-6">
          {/* Dotted Connecting Line */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#22C55E]/40 z-0" />

          {/* Step 01 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#06130D] border-2 border-[#FACC15] text-[#FACC15] font-display font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              01
            </div>
          </div>

          {/* Step 02 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#06130D] border-2 border-[#FACC15] text-[#FACC15] font-display font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              02
            </div>
          </div>

          {/* Step 03 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#06130D] border-2 border-[#FACC15] text-[#FACC15] font-display font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              03
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3 VISUAL STEP CARDS
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* Card 01: Choose Your Laptop */}
          <div className="rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/20 p-6 flex flex-col justify-between hover:border-[#4ADE80] transition-all duration-300">
            <div>
              {/* Visual Preview Box */}
              <div className="w-full aspect-[16/11] rounded-xl bg-[#071710] border border-slate-800 flex items-center justify-center p-3 mb-6 relative overflow-hidden">
                {/* Miniature UI grid preview */}
                <div className="w-full h-full rounded bg-[#031008] border border-[#22C55E]/30 p-2 flex flex-col justify-between">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <div className="h-1.5 w-12 bg-slate-700 rounded-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 my-auto">
                    <div className="h-12 rounded bg-[#082014] border border-[#22C55E]/40 flex flex-col items-center justify-center">
                      <Laptop className="w-4 h-4 text-[#4ADE80]" />
                    </div>
                    <div className="h-12 rounded bg-[#082014] border border-[#FACC15]/40 flex flex-col items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#FACC15] rounded-full" />
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-sm" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-display text-white mb-2 text-center">
                Choose Your Laptop
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-center">
                Select a laptop from various categories based on your interest.
              </p>
            </div>
          </div>

          {/* Card 02: Explore Components */}
          <div className="rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/20 p-6 flex flex-col justify-between hover:border-[#4ADE80] transition-all duration-300">
            <div>
              {/* Visual Preview Box */}
              <div className="w-full aspect-[16/11] rounded-xl bg-[#071710] border border-slate-800 flex items-center justify-center p-3 mb-6 relative overflow-hidden">
                {/* Miniature 3D Exploded components illustration */}
                <div className="w-full h-full rounded bg-[#031008] border border-[#22C55E]/30 p-2 flex flex-col items-center justify-center relative">
                  <div className="w-16 h-8 rounded bg-[#0A2618] border border-[#22C55E]/60 shadow-[0_0_15px_rgba(34,197,94,0.3)] transform -rotate-12 translate-y-[-8px] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#4ADE80]" />
                  </div>
                  <div className="w-20 h-8 rounded bg-[#06180F] border border-emerald-500/40 transform -rotate-12 translate-y-[4px] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#FACC15]/80 rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-display text-white mb-2 text-center">
                Explore Components
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-center">
                Interact with each component and learn its function and importance.
              </p>
            </div>
          </div>

          {/* Card 03: Learn Through VR */}
          <div className="rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/20 p-6 flex flex-col justify-between hover:border-[#4ADE80] transition-all duration-300">
            <div>
              {/* Visual Preview Box: VR Headset */}
              <div className="w-full aspect-[16/11] rounded-xl bg-[#071710] border border-slate-800 flex items-center justify-center p-3 mb-6 relative overflow-hidden">
                <div className="w-full h-full rounded bg-[#031008] border border-[#22C55E]/30 p-2 flex items-center justify-center relative">
                  {/* VR Headset Graphic */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-24 h-12 rounded-xl bg-[#0E291C] border-2 border-[#22C55E] flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] relative">
                      {/* Visor Glare */}
                      <div className="w-16 h-5 rounded-lg bg-[#04130A] border border-emerald-400/50 flex items-center justify-around px-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]/60 animate-ping" />
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]/60 animate-ping" />
                      </div>
                    </div>
                    {/* Head Strap */}
                    <div className="w-28 h-2 rounded-full bg-slate-700/60 -mt-7 -z-10" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-display text-white mb-2 text-center">
                Learn Through VR
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-center">
                Immerse yourself in a VR environment for a better and deeper understanding.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('laptop-selection')}
            className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-[#22C55E] text-[#06130D] font-display font-semibold text-sm hover:bg-[#4ADE80] transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] group"
          >
            <span>Start Exploring</span>
            <div className="w-6 h-6 rounded-full bg-[#06130D]/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#06130D]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
