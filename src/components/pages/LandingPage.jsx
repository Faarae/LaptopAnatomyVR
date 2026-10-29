import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * PAGE 1 — LANDING PAGE: LAPTOP ANATOMY EDUCATION
 * - Bright Futuristic Lab Tritone Palette (Emerald #10B981, Violet #8B5CF6, Amber/Gold #F59E0B) from DESKRIPSI_UI.md
 * - Plain uppercase eyebrow typography (no capsule pill box)
 * - Interactive 3D mouse-tracking parallax & tilt + slow floating loop on the exploded laptop hero
 * - Primary CTA (bg-emerald-600 hover:bg-emerald-500) & Secondary CTA with active:scale-95 & glow
 * - 3 Tactile Hover pillar cards with Tritone color identity
 */
export default function LandingPage({ onNavigate }) {
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMouseNorm({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tiltX = -mouseNorm.y * 4.5;
  const tiltY = mouseNorm.x * 5.5;
  const shiftX = mouseNorm.x * 16;
  const shiftY = mouseNorm.y * 12;

  return (
    <div className="relative min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] w-full flex items-center justify-between px-4 sm:px-8 lg:px-16 py-6 lg:py-0 overflow-x-hidden lg:overflow-hidden bg-transparent select-none">
      
      {/* 1. INTERACTIVE 3D PARALLAX & FLOATING EXPLODED LAPTOP RENDER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          style={{
            transform: `perspective(1200px) translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full relative"
        >
          <div className="w-full h-full relative animate-laptop-float">
            <img
              src="/images/laptop-exploded-hero.jpg"
              alt="Exploded Laptop Hardware Architecture"
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[11%] lg:translate-x-[12%] h-[88%] sm:h-[96%] lg:h-[102%] w-auto max-w-none object-contain opacity-45 lg:opacity-100 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Soft Seamless Directional Masks */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[50%] bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8FAFC]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAFC]/60 to-transparent" />
      </div>

      {/* 2. LEFT COLUMN: HERO CONTENT & 3 TACTILE PILLAR CARDS */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-start text-left my-auto">
        
        {/* Plain Text Eyebrow (No Capsule Pill) */}
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2.5 sm:mb-3">
          Platform Pembelajaran Perangkat Keras Terpadu • VR • AR • Challenge
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold font-display tracking-tight text-slate-900 leading-[1.14] mb-3.5 sm:mb-4">
          Edukasi Anatomi<br />
          Komponen Laptop via<br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
            VR, AR &amp; Challenge
          </span>
        </h1>

        {/* Structured Description */}
        <p className="text-xs sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl mb-5 sm:mb-6">
          Pelajari arsitektur motherboard, jalur interkoneksi bus, dan sistem pendinginan laptop melalui tiga metode terintegrasi: simulasi ruang tiga dimensi <strong className="text-emerald-700">Edukasi VR</strong>, pemindaian kamera <strong className="text-violet-700">Edukasi AR</strong>, dan evaluasi perakitan di <strong className="text-amber-600">Challenge Lab</strong>.
        </p>

        {/* Mobile Hero Visual Showcase (Shown on phones < 640px for clear hardware preview) */}
        <div className="sm:hidden w-full mb-5 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs relative">
          <img
            src="/images/laptop-exploded-hero.jpg"
            alt="Exploded Laptop Hardware Architecture"
            className="w-full h-44 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent flex items-end justify-between p-3">
            <span className="text-[11px] font-mono font-bold text-white">
              3D Exploded Laptop Digital Twin
            </span>
            <span className="text-[10px] font-mono font-semibold text-emerald-300 bg-slate-900/75 px-2 py-0.5 rounded-md">
              VR • AR • 60 FPS
            </span>
          </div>
        </div>

        {/* Simplified CTA Hierarchy: 1 Primary (Emerald) + 1 Secondary (Outline) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => onNavigate('laptop-selection')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200 group cursor-pointer"
          >
            <span>Mulai Eksplorasi VR</span>
            <ArrowRight
              strokeWidth={2}
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('webar')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white hover:bg-violet-50/60 text-slate-700 hover:text-violet-700 font-display font-semibold text-sm border border-slate-300 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/15 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Buka Studio WebAR</span>
          </button>
        </div>

        {/* 3 Tactile Feature Cards (Tritone Identity: Emerald VR, Violet AR, Amber Challenge) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          
          {/* Card 01: Edukasi VR (Emerald Green) */}
          <button
            type="button"
            onClick={() => onNavigate('laptop-selection')}
            className="group text-left p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-200 hover:border-emerald-500/60 shadow-2xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                  01 / Edukasi VR
                </span>
                <span className="w-2 h-2 rounded-xs bg-emerald-500 transition-colors" />
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                Bedah Motherboard 3D
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                Inspeksi 3 arsitektur laptop dan 8 modul komponen secara interaktif.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 mt-3 inline-flex items-center gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              <span>Buka Modul</span>
              <span>→</span>
            </span>
          </button>

          {/* Card 02: Edukasi AR (Royal Purple / Violet) */}
          <button
            type="button"
            onClick={() => onNavigate('webar')}
            className="group text-left p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-200 hover:border-violet-500/60 shadow-2xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-500/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-700">
                  02 / Edukasi AR
                </span>
                <span className="w-2 h-2 rounded-xs bg-violet-500 transition-colors" />
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-violet-700 transition-colors">
                Pemindaian WebAR
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                Proyeksikan objek 3D CPU, RAM, dan SSD di atas kartu marker via kamera.
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-700 mt-3 inline-flex items-center gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              <span>Buka Modul</span>
              <span>→</span>
            </span>
          </button>

          {/* Card 03: Challenge Lab (Radiant Gold / Amber) */}
          <button
            type="button"
            onClick={() => onNavigate('challenge-lab')}
            className="group text-left p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-200 hover:border-amber-500/60 shadow-2xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600">
                  03 / Challenge Lab
                </span>
                <span className="w-2 h-2 rounded-xs bg-amber-500 transition-colors" />
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                Evaluasi &amp; Perakitan
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                Uji pemahaman melalui 6 simulasi perakitan soket dan diagnostik cepat.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-600 mt-3 inline-flex items-center gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              <span>Buka Modul</span>
              <span>→</span>
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}
