import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * PAGE 1 — LANDING PAGE: LAPTOP ANATOMY EDUCATION
 * - Bright Futuristic Lab Tritone Palette (Emerald #10B981, Violet #8B5CF6, Amber/Gold #F59E0B) from DESKRIPSI_UI.md
 * - Plain uppercase eyebrow typography (no capsule pill box)
 * - Interactive 3D mouse-tracking parallax & tilt + slow floating loop on the exploded laptop hero
 * - Primary CTA (bg-emerald-600 hover:bg-emerald-500) & Secondary CTA with active:scale-95 & glow
 * - Clean focused hero without bottom pillar cards
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
    <div className="relative min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] w-full flex items-center justify-between px-4 sm:px-8 lg:px-16 py-8 lg:py-0 overflow-hidden bg-transparent select-none">
      
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[22%] sm:translate-x-[12%] h-[78%] sm:h-[96%] lg:h-[102%] w-auto max-w-none object-contain opacity-25 sm:opacity-55 lg:opacity-100 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Soft Seamless Directional Masks */}
        <div className="absolute inset-y-0 left-0 w-[85%] sm:w-[70%] lg:w-[50%] bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8FAFC]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAFC]/60 to-transparent" />
      </div>

      {/* 2. LEFT COLUMN: FOCUSED HERO CONTENT & CTA HIERARCHY */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-start text-left my-auto">
        
        {/* Plain Text Eyebrow (No Capsule Pill) */}
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-3">
          Platform Pembelajaran Perangkat Keras Terpadu • VR • AR • Challenge
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold font-display tracking-tight text-slate-900 leading-[1.12] mb-4 sm:mb-5">
          Edukasi Anatomi<br />
          Komponen Laptop via<br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
            VR, AR &amp; Challenge
          </span>
        </h1>

        {/* Structured Description */}
        <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl mb-7 sm:mb-8">
          Pelajari arsitektur motherboard, jalur interkoneksi bus, dan sistem pendinginan laptop melalui tiga metode terintegrasi: simulasi ruang tiga dimensi <strong className="text-emerald-700">Edukasi VR</strong>, pemindaian kamera <strong className="text-violet-700">Edukasi AR</strong>, dan evaluasi perakitan di <strong className="text-amber-600">Challenge Lab</strong>.
        </p>

        {/* Simplified CTA Hierarchy: 1 Primary (Emerald) + 1 Secondary (Outline) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigate('laptop-selection')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200 group cursor-pointer"
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white hover:bg-violet-50/60 text-slate-700 hover:text-violet-700 font-display font-semibold text-sm border border-slate-300 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/15 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Buka Studio WebAR</span>
          </button>
        </div>

      </div>

    </div>
  );
}
