import React from 'react';

/**
 * ImmersiveBackground Component
 * Reusable multi-layered ambient environment across ALL pages (Sections 14-25, 29).
 * - Layer 1: Base Dark Green Canvas (#04150F -> #061C14 -> #09251A)
 * - Layer 2: Ambient Radial Glows & Hero Digital Spotlight
 * - Layer 3: Technical Crosshair Grid with Slow Drift
 * - Layer 4: Thin Circuit Lines with Traveling Photons
 * - Layer 5: Floating Micro Technical Elements (CPU, GPU, VR MODE, etc.)
 * - Layer 6: Subtle Digital Particles
 * - Layer 7: Mouse-Responsive Parallax Shifts
 */
export default function ImmersiveBackground({ activePage = 'landing', mousePos = { x: 0, y: 0 } }) {
  // Compute normalized mouse offset (-1 to +1) for parallax
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const normX = (mousePos.x - windowWidth / 2) / (windowWidth / 2 || 1);
  const normY = (mousePos.y - windowHeight / 2) / (windowHeight / 2 || 1);

  // Parallax offsets (2px - 8px)
  const gridOffset = { x: normX * 2, y: normY * 2 };
  const circuitOffset = { x: normX * 4, y: normY * 4 };
  const glowOffset = { x: normX * 8, y: normY * 8 };

  const isHome = activePage === 'landing';
  const isChallenge = activePage === 'challenge-lab';
  const isComponents = activePage === 'component-library';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: BASE CLEAN LIGHT DIGITAL CANVAS (#F8FAFC -> #F1F5F9)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]" />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: VIBRANT TRI-COLOR AMBIENT AURORAS (GREEN, PURPLE, GOLD)
         ───────────────────────────────────────────────────────────── */}
      {/* 1. Top-Left Luminous Emerald Green Aurora Orb */}
      <div 
        style={{
          transform: `translate3d(${glowOffset.x * 0.8}px, ${glowOffset.y * 0.8}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute -top-36 -left-28 w-[580px] h-[580px] bg-emerald-400/16 rounded-full blur-[110px] animate-ambient-pulse" 
      />

      {/* 2. Top-Right Royal Purple / Violet Luminous Aurora Orb */}
      <div 
        style={{
          transform: `translate3d(${-glowOffset.x * 0.9}px, ${glowOffset.y * 0.9}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute -top-32 -right-32 w-[620px] h-[600px] bg-purple-500/16 rounded-full blur-[120px] animate-ambient-pulse [animation-delay:1.5s]" 
      />

      {/* 3. Bottom-Left / Center Warm Radiant Gold Nebula Orb */}
      <div 
        style={{
          transform: `translate3d(${glowOffset.x * 1.1}px, ${-glowOffset.y * 1.1}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute -bottom-40 left-1/4 -translate-x-1/2 w-[580px] h-[520px] bg-amber-400/18 rounded-full blur-[115px] animate-ambient-pulse [animation-delay:3s]" 
      />

      {/* 4. Bottom-Right Violet-Purple & Emerald Secondary Glow */}
      <div 
        style={{
          transform: `translate3d(${-glowOffset.x}px, ${-glowOffset.y}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute -bottom-36 -right-28 w-[520px] h-[500px] bg-violet-500/14 rounded-full blur-[110px]" 
      />

      {/* 5. Center Subtle Iridescent Highlight Under Main Focus */}
      <div 
        style={{
          transform: `translate3d(${glowOffset.x}px, ${glowOffset.y}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-all duration-1000
          ${isHome ? 'w-[780px] h-[560px] bg-gradient-to-tr from-emerald-400/10 via-purple-400/10 to-amber-400/10' : 'w-[680px] h-[480px] bg-gradient-to-tr from-emerald-400/8 via-purple-400/8 to-amber-400/8'}
        `}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: TECHNICAL CROSSHAIR GRID WITH SLOW DRIFT
         ───────────────────────────────────────────────────────────── */}
      <div 
        style={{
          transform: `translate3d(${gridOffset.x}px, ${gridOffset.y}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="absolute -inset-10 tech-grid-pattern opacity-60 animate-grid-drift [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: CIRCUIT PATHS & MULTI-COLOR PHOTONS (GREEN, PURPLE, GOLD)
         ───────────────────────────────────────────────────────────── */}
      <svg 
        style={{
          transform: `translate3d(${circuitOffset.x}px, ${circuitOffset.y}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Emerald to Purple Gradient */}
          <linearGradient id="circuitGradGreenPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
          </linearGradient>

          {/* Purple to Gold Gradient */}
          <linearGradient id="circuitGradPurpleGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0.4" />
          </linearGradient>

          {/* Gold to Emerald Gradient */}
          <linearGradient id="circuitGradGoldGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Top-Right Circuit Path (Purple & Gold) */}
        <path d="M 850 40 L 980 40 L 1020 80 L 1180 80 L 1220 120" stroke="url(#circuitGradPurpleGold)" strokeWidth="1.2" fill="none" />
        <circle cx="850" cy="40" r="3" fill="#8B5CF6" opacity="0.7" />
        <circle cx="1020" cy="80" r="2.5" fill="#F59E0B" opacity="0.8" />
        <circle cx="1220" cy="120" r="3" fill="#EAB308" opacity="0.7" />
        {/* Animated Gold Photon */}
        <circle cx="980" cy="40" r="2" fill="#F59E0B" className="animate-ping" />

        {/* Left Peripheral Circuit Path (Emerald & Purple) */}
        <path d="M 60 260 L 140 260 L 180 320 L 180 450 L 240 510 L 320 510" stroke="url(#circuitGradGreenPurple)" strokeWidth="1.2" fill="none" />
        <circle cx="60" cy="260" r="3" fill="#10B981" opacity="0.8" />
        <circle cx="180" cy="320" r="2.5" fill="#8B5CF6" opacity="0.8" />
        <circle cx="320" cy="510" r="3" fill="#A855F7" opacity="0.7" />
        {/* Animated Emerald Photon */}
        <circle cx="140" cy="260" r="2" fill="#10B981" className="animate-ping" />

        {/* Bottom Peripheral Circuit Path (Gold & Emerald) */}
        <path d="M 650 720 L 750 720 L 800 670 L 980 670 L 1020 710" stroke="url(#circuitGradGoldGreen)" strokeWidth="1.2" fill="none" />
        <circle cx="650" cy="720" r="3" fill="#F59E0B" opacity="0.8" />
        <circle cx="800" cy="670" r="2.5" fill="#10B981" opacity="0.8" />
        <circle cx="1020" cy="710" r="3" fill="#059669" opacity="0.7" />
        {/* Animated Purple Photon */}
        <circle cx="980" cy="670" r="2" fill="#8B5CF6" className="animate-ping" />

        {/* Top-Center Micro Circuit */}
        <path d="M 400 50 L 460 50 L 490 80" stroke="url(#circuitGradGreenPurple)" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="490" cy="80" r="2" fill="#8B5CF6" opacity="0.7" />
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: FLOATING MICRO TECHNICAL LABELS & COORDINATES
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 font-mono text-[9px] tracking-widest select-none">
        <span className="absolute top-24 left-16 text-emerald-700/40 font-semibold">SYS_BUS // 0x48A</span>
        <span className="absolute top-40 right-20 text-purple-700/40 font-semibold">CORE_FREQ // 5.2GHz TURBO</span>
        <span className="absolute bottom-28 left-28 text-amber-700/45 font-semibold">VR_PIPELINE // STAGE_01</span>
        <span className="absolute bottom-20 right-32 text-purple-700/40 font-semibold">CHIPSET // INTEL_BGA1744</span>
        
        {/* Holographic registration crosshairs */}
        <span className="absolute top-72 left-8 text-emerald-600/40 font-bold text-xs">+</span>
        <span className="absolute top-96 right-16 text-purple-600/45 font-bold text-xs">+</span>
        <span className="absolute bottom-60 right-8 text-amber-600/45 font-bold text-xs">+</span>
        <span className="absolute bottom-80 left-20 text-purple-600/35 font-bold text-xs">+</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 6: FLOATING GLOWING PARTICLES (GREEN, PURPLE, GOLD)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Emerald Particle */}
        <div className="absolute top-[22%] left-[16%] w-2 h-2 rounded-full bg-emerald-400/40 blur-[1px] animate-particle-1 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        {/* Gold Particle */}
        <div className="absolute top-[58%] left-[10%] w-2 h-2 rounded-full bg-amber-400/45 blur-[1px] animate-particle-2 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
        {/* Purple Particle */}
        <div className="absolute top-[32%] right-[18%] w-2.5 h-2.5 rounded-full bg-purple-400/45 blur-[1px] animate-particle-3 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
        {/* Gold Particle Right */}
        <div className="absolute top-[68%] right-[12%] w-1.5 h-1.5 rounded-full bg-amber-400/40 blur-[1px] animate-particle-1 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
        {/* Purple Particle Center */}
        <div className="absolute top-[78%] left-[42%] w-2 h-2 rounded-full bg-purple-400/40 blur-[1px] animate-particle-2 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
        {/* Emerald Particle Top Right */}
        <div className="absolute top-[15%] right-[35%] w-1.5 h-1.5 rounded-full bg-emerald-400/35 blur-[1px] animate-particle-3 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 7: MOUSE-FOLLOWING IRIDESCENT SHIMMER
         ───────────────────────────────────────────────────────────── */}
      <div 
        style={{
          transform: `translate3d(${mousePos.x - 260}px, ${mousePos.y - 260}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-emerald-400/8 via-purple-400/8 to-amber-400/8 blur-[110px] pointer-events-none"
      />
    </div>
  );
}
