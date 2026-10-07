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
          LAYER 1: BASE DEEP FOREST DIGITAL CANVAS (#04150F -> #09251A)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04150F] via-[#061C14] to-[#082017]" />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: AMBIENT RADIAL GLOWS & DIGITAL SPOTLIGHT (Section 17 & 18)
         ───────────────────────────────────────────────────────────── */}
      {/* Primary Hero Digital Spotlight (Behind Laptop / Center Content) */}
      <div 
        style={{
          transform: `translate3d(${glowOffset.x}px, ${glowOffset.y}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-all duration-1000
          ${isHome ? 'w-[750px] h-[550px] bg-[#22C55E]/14 animate-ambient-pulse' : 'w-[650px] h-[450px] bg-[#22C55E]/10'}
        `}
      />

      {/* Top-Left Ambient Soft Green Field */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#22C55E]/8 rounded-full blur-[130px]" />

      {/* Bottom-Right Subtle Warm Accent Field */}
      <div 
        className={`
          absolute -bottom-32 -right-32 rounded-full blur-[140px] transition-all duration-700
          ${isChallenge ? 'w-[550px] h-[550px] bg-[#FACC15]/8' : 'w-[450px] h-[450px] bg-[#22C55E]/6'}
        `}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: TECHNICAL CROSSHAIR GRID WITH SLOW DRIFT (Section 19 & 20)
         ───────────────────────────────────────────────────────────── */}
      <div 
        style={{
          transform: `translate3d(${gridOffset.x}px, ${gridOffset.y}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="absolute -inset-10 tech-grid-pattern opacity-60 animate-grid-drift [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: CIRCUIT-LIKE PATHS & TRAVELING PHOTONS (Section 21)
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
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Top-Right Circuit Path */}
        <path d="M 850 40 L 980 40 L 1020 80 L 1150 80" stroke="url(#circuitGrad)" strokeWidth="1" fill="none" />
        <circle cx="850" cy="40" r="2.5" fill="#22C55E" opacity="0.6" />
        <circle cx="1150" cy="80" r="2.5" fill="#4ADE80" opacity="0.6" />
        {/* Animated photon along top circuit */}
        <circle cx="980" cy="40" r="1.5" fill="#FACC15" className="animate-ping" />

        {/* Left Peripheral Circuit Path */}
        <path d="M 60 300 L 120 300 L 160 350 L 160 480 L 220 540" stroke="url(#circuitGrad)" strokeWidth="1" fill="none" />
        <circle cx="60" cy="300" r="2.5" fill="#22C55E" opacity="0.6" />
        <circle cx="220" cy="540" r="2.5" fill="#22C55E" opacity="0.6" />

        {/* Bottom Peripheral Circuit Path */}
        <path d="M 700 720 L 780 720 L 820 680 L 960 680" stroke="url(#circuitGrad)" strokeWidth="1" fill="none" />
        <circle cx="960" cy="680" r="2.5" fill="#4ADE80" opacity="0.5" />

        {isComponents && (
          <>
            {/* Additional Circuitry for Components Page */}
            <path d="M 300 120 L 380 120 L 420 160" stroke="#22C55E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M 800 240 L 880 240 L 920 280" stroke="#22C55E" strokeWidth="0.8" fill="none" opacity="0.4" />
          </>
        )}
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: FLOATING MICRO TECHNICAL LABELS (Section 22)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 font-mono text-[9px] text-emerald-400/10 tracking-widest select-none">
        <span className="absolute top-28 left-16">SYS_BUS // 0x48A</span>
        <span className="absolute top-44 right-20">CORE_FREQ // 4.8GHz</span>
        <span className="absolute bottom-32 left-28">VR_PIPELINE // STAGE_01</span>
        <span className="absolute bottom-24 right-32">CHIPSET // INTEL_AMD</span>
        <span className="absolute top-72 left-8 text-emerald-300/12">+</span>
        <span className="absolute top-96 right-16 text-emerald-300/12">+</span>
        <span className="absolute bottom-60 right-8 text-emerald-300/12">+</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 6: SUBTLE DIGITAL FLOATING PARTICLES (Section 23)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <div className="absolute top-[25%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#4ADE80]/30 animate-particle-1" />
        <div className="absolute top-[60%] left-[12%] w-1 h-1 rounded-full bg-[#FACC15]/30 animate-particle-2" />
        <div className="absolute top-[35%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#4ADE80]/35 animate-particle-3" />
        <div className="absolute top-[70%] right-[15%] w-1 h-1 rounded-full bg-[#22C55E]/40 animate-particle-1" />
        <div className="absolute top-[80%] left-[45%] w-1 h-1 rounded-full bg-[#FACC15]/25 animate-particle-2" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 7: MOUSE-FOLLOWING SPOTLIGHT (Section 24)
         ───────────────────────────────────────────────────────────── */}
      <div 
        style={{
          transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#22C55E]/5 blur-[120px] pointer-events-none"
      />
    </div>
  );
}
