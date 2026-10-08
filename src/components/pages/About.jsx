import React from 'react';
import { Lightbulb, Glasses, Box, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * PAGE 5 — ABOUT (Clean Light Theme & Rich Visual Pairing)
 * - Left: About summary with 3 core pillars (Interactive 3D, Educational, VR Immersion)
 * - Right: High-resolution hardware render showcase paired with architecture badges
 * - Single-viewport fit with zero scrolling
 */
export default function About({ onNavigate }) {
  const features = [
    {
      title: "Eksplorasi Interaktif 3D",
      desc: "Bedah komponen laptop secara detail dengan orbit kamera 360 derajat.",
      icon: Box,
    },
    {
      title: "Edukatif & Komprehensif",
      desc: "Penjelasan fungsi hardware yang mudah dipahami disertai matriks spesifikasi.",
      icon: Lightbulb,
    },
    {
      title: "Simulasi Laboratorium VR",
      desc: "Rasakan simulasi perakitan dan pengujian hardware laptop secara virtual.",
      icon: Glasses,
    },
  ];

  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex items-center justify-center px-6 sm:px-10 lg:px-14 py-3 bg-transparent select-none">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* ─── LEFT COLUMN: ABOUT TEXT & 3 FEATURE POINTS ─── */}
        <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mengenal Platform Pembelajaran</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight mb-3">
            Laptop Anatomy VR
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
            Laptop Anatomy VR adalah platform pembelajaran virtual interaktif yang dirancang untuk membantu mahasiswa dan antusias teknologi memahami susunan motherboard, bus komputasi, dan solusi termal pendinginan laptop modern.
          </p>

          {/* 3 Feature Items */}
          <div className="space-y-3.5 w-full">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-slate-900 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="mt-6">
            <button
              onClick={() => onNavigate('laptop-selection')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-display font-semibold text-xs sm:text-sm hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 group active:scale-[0.99]"
            >
              <span>Mulai Jelajahi Modul</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: HARDWARE PRODUCT VISUAL SHOWCASE ─── */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-2 select-none">
          <div className="relative w-full max-w-[460px] rounded-3xl bg-white border border-slate-200/90 p-4 shadow-xl shadow-slate-900/5 overflow-hidden">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-800">
                ARCHITECTURE DIGITAL TWIN
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                STUDIO RENDER
              </span>
            </div>

            {/* Featured Image Frame */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner group">
              <img 
                src="/images/laptop-b.jpg" 
                alt="Gaming Performance Architecture"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                  HIGH PERFORMANCE CHASSIS
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold block">TitanForge RTX 16</span>
                  <span className="text-[10px] text-slate-300 font-sans">Dual-Fan Vapor Cooling Architecture</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-600 px-2 py-0.5 rounded-full text-white font-bold">
                  VR READY
                </span>
              </div>
            </div>

            {/* Micro spec callouts below image */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-1">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[9px] font-mono text-slate-400 block">SOKET</span>
                <span className="text-xs font-bold text-slate-800 font-mono">BGA 1744</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[9px] font-mono text-slate-400 block">COOLER</span>
                <span className="text-xs font-bold text-emerald-700 font-mono">Dual Blower</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[9px] font-mono text-slate-400 block">MEMORY</span>
                <span className="text-xs font-bold text-teal-700 font-mono">DDR5 Modular</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
