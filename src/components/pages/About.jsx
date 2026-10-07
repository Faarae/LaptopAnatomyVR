import React from 'react';
import { Layers, Lightbulb, Glasses, Box, Sparkles } from 'lucide-react';

/**
 * PAGE 5 — ABOUT
 * Replicates Page 5 from the user's reference image:
 * - Left: "About", "Laptop Anatomy VR", description, and 3 feature points
 *         (Interactive 3D Exploration, Educational & Informative, VR Immersion)
 * - Right: Isometric 3D exploded laptop layered illustration.
 */
export default function About({ onNavigate }) {
  const features = [
    {
      title: "Interactive 3D Exploration",
      desc: "Explore laptop components in detail.",
      icon: Box,
    },
    {
      title: "Educational & Informative",
      desc: "Learn with engaging and easy-to-understand explanations.",
      icon: Lightbulb,
    },
    {
      title: "VR Immersion",
      desc: "Experience learning like never before in virtual reality.",
      icon: Glasses,
    },
  ];

  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex items-center justify-center px-6 sm:px-10 lg:px-14 py-4 bg-transparent">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: ABOUT TEXT & 3 FEATURE POINTS
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6">
          {/* Eyebrow */}
          <span className="text-sm font-display text-slate-400 mb-2">
            About
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-6">
            Laptop Anatomy VR
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-10">
            Laptop Anatomy VR is an interactive educational application that helps you understand the internal components of a laptop through an immersive virtual reality experience.
          </p>

          {/* 3 Feature Items */}
          <div className="space-y-6 w-full">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  {/* Green Outline Icon Circle */}
                  <div className="w-10 h-10 rounded-full bg-[#0C2017] border border-[#22C55E]/40 flex items-center justify-center text-[#4ADE80] shrink-0 mt-0.5 shadow-[0_0_12px_rgba(34,197,94,0.25)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: ISOMETRIC EXPLODED LAPTOP VISUALIZATION
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-6 select-none">
          {/* Background Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[#22C55E]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* 3D Exploded Laptop Stack */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex flex-col items-center justify-center">
            
            {/* LAYER 1: SCREEN LID (Floating highest in perspective) */}
            <div className="absolute top-[6%] w-[260px] sm:w-[300px] aspect-[16/10] rounded-xl bg-[#111A15] border-2 border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform -rotate-[16deg] skew-x-[-12deg] p-2 flex flex-col justify-center items-center">
              <div className="w-full h-full rounded bg-[#030906] border border-slate-800 flex items-center justify-center">
                <span className="text-[10px] font-mono text-slate-600">DISPLAY ASSEMBLY</span>
              </div>
            </div>

            {/* LAYER 2: KEYBOARD DECK (Floating middle) */}
            <div className="absolute top-[34%] w-[270px] sm:w-[310px] aspect-[16/10] rounded-xl bg-[#1B2921] border-2 border-slate-600 shadow-[0_25px_45px_rgba(0,0,0,0.85)] transform -rotate-[16deg] skew-x-[-12deg] p-2.5">
              <div className="w-full h-16 rounded bg-[#0A160F] border border-slate-800 p-1 mb-2">
                <div className="grid grid-cols-6 gap-1 opacity-60">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-2 rounded-xs bg-[#192E22]" />
                  ))}
                </div>
              </div>
              <div className="w-16 h-6 mx-auto rounded bg-[#132219] border border-slate-700/60" />
            </div>

            {/* LAYER 3: MOTHERBOARD & INTERNAL SILICON (Glowing green with chips) */}
            <div className="absolute top-[60%] w-[280px] sm:w-[320px] aspect-[16/10] rounded-xl bg-[#092215] border-2 border-[#22C55E]/60 shadow-[0_0_35px_rgba(34,197,94,0.35)] transform -rotate-[16deg] skew-x-[-12deg] p-3 overflow-hidden">
              {/* Circuit Grid & Chips */}
              <div className="relative w-full h-full">
                {/* Central CPU socket */}
                <div className="w-14 h-14 rounded-lg bg-[#04140B] border-2 border-[#4ADE80] flex items-center justify-center shadow-[0_0_15px_#22c55e] mx-auto mt-2">
                  <div className="w-8 h-8 rounded bg-[#0D3820] flex items-center justify-center">
                    <span className="text-[8px] font-mono font-bold text-[#FACC15]">SoC</span>
                  </div>
                </div>

                {/* Copper Heatpipe & Fan representation */}
                <div className="absolute right-4 top-2 w-12 h-12 rounded-full border border-emerald-500/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30" />
                </div>
                <div className="absolute left-4 top-4 w-16 h-3 bg-[#0E331E] border border-emerald-500/40 rounded-xs" />
                <div className="absolute left-6 bottom-3 w-28 h-5 bg-[#06180E] border border-emerald-500/30 rounded-xs" />
              </div>
            </div>

            {/* LAYER 4: BOTTOM BASE CHASSIS (Floor level) */}
            <div className="absolute top-[82%] w-[270px] sm:w-[310px] aspect-[16/10] rounded-xl bg-[#0F1B14] border border-slate-700 shadow-[0_30px_60px_rgba(0,0,0,0.9)] transform -rotate-[16deg] skew-x-[-12deg] opacity-75" />

            {/* Floor Ambient Circle */}
            <div className="absolute bottom-[2%] w-64 h-16 rounded-full bg-[#22C55E]/20 blur-xl pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
