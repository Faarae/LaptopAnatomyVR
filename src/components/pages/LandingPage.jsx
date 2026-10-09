import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

/**
 * PAGE 1 — LANDING PAGE
 * - Exploded laptop background shifted significantly to the right (no text collision)
 * - Removed eyebrow live status text per user request
 * - Clean, spacious left-aligned typography with Emerald, Purple, and Gold accents
 * - Seamless soft fade blending into the clean app background
 * - Subtle mouse parallax depth animation
 */
export default function LandingPage({ onNavigate }) {
  const [btnClickScale, setBtnClickScale] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax effect for the exploded laptop background
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePrimaryClick = () => {
    setBtnClickScale(true);
    setTimeout(() => {
      setBtnClickScale(false);
      onNavigate('laptop-selection');
    }, 180);
  };

  return (
    <div className="relative h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] w-full flex items-center justify-between px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#F8FAFC] select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          1. FULLSCREEN EXPLODED LAPTOP BACKGROUND (SEIMBANG & PAS)
         ───────────────────────────────────────────────────────────── */}
      <div 
        style={{
          transform: `translate(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Exploded laptop image framed perfectly on the right side */}
        <img 
          src="/images/laptop-exploded-hero.jpg" 
          alt="Exploded Laptop Hardware Architecture" 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[9%] sm:translate-x-[11%] lg:translate-x-[12%] xl:translate-x-[13%] h-[90%] sm:h-[96%] lg:h-[104%] w-auto max-w-none object-contain select-none pointer-events-none"
        />

        {/* Seamless Soft Fade on Left Side to guarantee crystal clarity for text */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[52%] lg:w-[44%] bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent" />
        
        {/* Subtle Top & Bottom Soft Vignettes */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8FAFC]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAFC]/60 to-transparent" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. AMBIENT GLOW ORBS (EMERALD, PURPLE, GOLD ACCENTS)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-1/4 left-1/5 w-[380px] h-[380px] rounded-full pointer-events-none bg-emerald-300/15 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full pointer-events-none bg-purple-400/15 blur-[130px] animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-[360px] h-[360px] rounded-full pointer-events-none bg-amber-300/15 blur-[120px] animate-pulse" />

      {/* ─────────────────────────────────────────────────────────────
          3. LEFT COLUMN: CLEAN, PUNCHY HERO CONTENT
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-xl lg:max-w-2xl flex flex-col items-start text-left my-auto">
        
        {/* Main Headline with Emerald, Purple, and Gold Gradient */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold font-display tracking-tight text-slate-900 leading-[1.12] mb-5 sm:mb-6">
          Pelajari Anatomi<br />
          Komponen di Dalam<br />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-purple-600 to-amber-500 font-extrabold drop-shadow-xs">
            Laptop Anda
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-lg mb-8 sm:mb-10 drop-shadow-2xs">
          Eksplorasi susunan motherboard, pendingin termal ganda, dan arsitektur silikon chip komputer melalui visualisasi anatomi realistis dan tantangan perakitan interaktif.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
          <button
            onClick={handlePrimaryClick}
            className={`
              w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl
              bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-sm
              shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-95
              transition-all duration-200 group select-none cursor-pointer
              ${btnClickScale ? 'scale-95' : 'scale-100'}
            `}
          >
            <span>Mulai Eksplorasi</span>
            <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('how-it-works')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-slate-700 font-sans font-semibold text-sm border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer"
          >
            <Play className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
            <span>Cara Kerja</span>
          </button>
        </div>

        {/* Clean Feature Highlights with Gold, Purple, and Green Accents */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/90 w-full max-w-md">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-display text-emerald-600">10+</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Komponen Inti</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-display text-purple-600">3D & VR</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Simulasi Realistis</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-display text-amber-500">100%</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Bebas Risiko</span>
          </div>
        </div>

      </div>

    </div>
  );
}
