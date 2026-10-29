import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * PAGE 5 — TENTANG PLATFORM (Laptop Anatomy Education)
 * Menjelaskan visi terpadu Laptop Anatomy Education dengan palet Tritone (Emerald, Violet, Amber),
 * tanpa kapsul/pill badge, dan radius konsisten (rounded-lg / rounded-xl).
 */
export default function About({ onNavigate }) {
  const pillars = [
    {
      code: 'MODUL 01',
      title: 'Edukasi VR (Eksplorasi 3D Virtual)',
      desc: 'Bedah 3 arsitektur motherboard laptop secara interaktif 360°, mode X-Ray, dan ensiklopedia 8 komponen keras.',
      meta: '3 Unit Laptop • 8 Komponen 3D',
      target: 'laptop-selection',
      accentBorder: 'hover:border-emerald-500/60',
      accentText: 'text-emerald-700',
      accentTitle: 'group-hover:text-emerald-700',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    {
      code: 'MODUL 02',
      title: 'Edukasi AR (Marker-Based WebAR)',
      desc: 'Pindai 3 kartu marker fisik/digital (CPU, RAM, SSD) dengan kamera untuk memproyeksikan model 3D & narasi suara TTS.',
      meta: '3 Target Marker • Audio TTS',
      target: 'webar',
      accentBorder: 'hover:border-violet-500/60',
      accentText: 'text-violet-700',
      accentTitle: 'group-hover:text-violet-700',
      badgeBg: 'bg-violet-50 border-violet-200 text-violet-700',
    },
    {
      code: 'MODUL 03',
      title: 'Challenge Lab (Evaluasi Gamifikasi)',
      desc: 'Asah ketangkasan perakitan motherboard 3D dan uji pemahaman spesifikasi melalui 6 misi mini-game interaktif.',
      meta: '6 Misi Evaluasi • Skor & XP',
      target: 'challenge-lab',
      accentBorder: 'hover:border-amber-500/60',
      accentText: 'text-amber-600',
      accentTitle: 'group-hover:text-amber-600',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
    },
  ];

  return (
    <div className="min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] lg:overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-14 py-5 sm:py-6 bg-transparent select-none">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center my-auto">
        
        {/* ─── LEFT COLUMN: PLATFORM OVERVIEW & 3 CORE PILLARS ─── */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            Tentang Platform • Ekosistem Pembelajaran Perangkat Keras
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-3">
            Laptop Anatomy Education
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
            <strong>Laptop Anatomy Education</strong> adalah laboratorium perangkat keras komputer berbasis web yang mengintegrasikan <strong className="text-emerald-700">Virtual Reality (3D WebGL)</strong>, <strong className="text-violet-700">Augmented Reality (MindAR)</strong>, dan <strong className="text-amber-600">Challenge Lab</strong> dalam satu antarmuka terstruktur.
          </p>

          {/* 3 Interactive Pillar Cards */}
          <div className="space-y-3 w-full">
            {pillars.map((item) => (
              <div
                key={item.code}
                onClick={() => onNavigate(item.target)}
                className={`group p-4 rounded-xl bg-white border border-slate-200 ${item.accentBorder} hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-2xs`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md border font-mono text-[10px] font-bold ${item.badgeBg}`}>
                      {item.code}
                    </span>
                    <h3 className={`text-sm font-bold font-display text-slate-900 ${item.accentTitle} transition-colors`}>
                      {item.title}
                    </h3>
                  </div>
                  <span className={`text-[11px] font-mono ${item.accentText} font-semibold hidden sm:inline`}>
                    {item.meta}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons: 1 Primary (Emerald) + 1 Secondary */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('laptop-selection')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer"
            >
              <span>Mulai Eksplorasi VR</span>
              <ArrowRight strokeWidth={2} className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('webar')}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-violet-400 text-slate-700 hover:text-violet-700 font-display font-semibold text-xs sm:text-sm hover:bg-violet-50/50 active:scale-95 hover:shadow-lg hover:shadow-violet-500/15 transition-all duration-200 cursor-pointer"
            >
              Buka Studio WebAR
            </button>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: XR DIGITAL TWIN SHOWCASE ─── */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-2 select-none">
          <div className="relative w-full max-w-[480px] rounded-xl bg-white border border-slate-200 p-6 shadow-sm overflow-hidden">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Spesifikasi Sistem
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                VR • WebAR • Challenge
              </span>
            </div>

            {/* Featured Image Frame */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src="/images/laptop-b.jpg" 
                alt="Laptop Anatomy Education Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono font-bold block">Digital Twin Hardware Studio</span>
                  <span className="text-[11px] text-slate-300 font-sans">Three.js WebGL &amp; MindAR Computer Vision</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  60 FPS WebGL
                </span>
              </div>
            </div>

            {/* Structured Metrics below image (Tritone Color Coded) */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/80 text-left">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase block">EDUKASI VR</span>
                <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">3 Unit + 8 Modul</span>
              </div>
              <div className="p-3 rounded-lg bg-violet-50/60 border border-violet-200/80 text-left">
                <span className="text-[10px] font-mono text-violet-700 font-bold uppercase block">EDUKASI AR</span>
                <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">3 Marker + TTS</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80 text-left">
                <span className="text-[10px] font-mono text-amber-700 font-bold uppercase block">CHALLENGE</span>
                <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">6 Misi + XP</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
