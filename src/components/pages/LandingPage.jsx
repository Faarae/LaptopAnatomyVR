import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

/**
 * PAGE 1 — LANDING PAGE (Interactive Motion System)
 * Implements:
 * - Subtle 5s idle floating
 * - 3D Mouse Parallax (max 3-5 deg)
 * - Screen scanning beam
 * - Staggered pulsing hotspots (CPU, GPU, RAM, SSD, Battery)
 * - Hotspot hover highlight + traveling SVG connection photon
 * - Hero text entrance stagger & animated light sweep on "Your Laptop"
 * - CTA button micro-interactions with click scale feedback
 */
export default function LandingPage({ onNavigate }) {
  // Parallax rotation state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHoveredLaptop, setIsHoveredLaptop] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [btnClickScale, setBtnClickScale] = useState(false);

  // Mouse move handler for 3D parallax (max 3.5 deg)
  const heroRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    // Limit rotation to max 3.5 degrees
    setRotateY(Math.max(-3.5, Math.min(3.5, normX * 3.5)));
    setRotateX(Math.max(-3.5, Math.min(3.5, -normY * 3.5)));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHoveredLaptop(false);
  };

  const handlePrimaryClick = () => {
    setBtnClickScale(true);
    setTimeout(() => {
      setBtnClickScale(false);
      onNavigate('laptop-selection');
    }, 180);
  };

  // Hotspot definitions with staggered pulse delays & SVG coordinates
  const hotspots = [
    {
      id: 'cpu',
      title: 'CPU',
      desc: 'The brain of the laptop that processes data.',
      staggerDelay: '0s',
      pinX: '49%',
      pinY: '30%',
      // SVG leader line coordinates (relative to 560x420 canvas)
      pinSvgX: 274,
      pinSvgY: 126,
      labelSvgX: 274,
      labelSvgY: 55,
      labelClass: 'top-[3%] left-[49%] -translate-x-1/2 w-48 text-center',
    },
    {
      id: 'gpu',
      title: 'GPU',
      desc: 'Handles graphics and visual performance.',
      staggerDelay: '0.4s',
      pinX: '76%',
      pinY: '28%',
      pinSvgX: 426,
      pinSvgY: 118,
      labelSvgX: 470,
      labelSvgY: 80,
      labelClass: 'top-[16%] left-[84%] w-44 text-left',
    },
    {
      id: 'ram',
      title: 'RAM',
      desc: 'Temporary memory used by running applications.',
      staggerDelay: '0.8s',
      pinX: '34%',
      pinY: '40%',
      pinSvgX: 190,
      pinSvgY: 168,
      labelSvgX: 130,
      labelSvgY: 145,
      labelClass: 'top-[32%] -left-[14%] w-44 text-right',
    },
    {
      id: 'ssd',
      title: 'SSD',
      desc: 'Stores data permanently and keeps it fast.',
      staggerDelay: '1.2s',
      pinX: '78%',
      pinY: '44%',
      pinSvgX: 437,
      pinSvgY: 185,
      labelSvgX: 480,
      labelSvgY: 175,
      labelClass: 'top-[38%] left-[85%] w-44 text-left',
    },
    {
      id: 'battery',
      title: 'Battery',
      desc: 'Provides power so you can work anywhere.',
      staggerDelay: '1.6s',
      pinX: '49%',
      pinY: '78%',
      pinSvgX: 274,
      pinSvgY: 328,
      labelSvgX: 274,
      labelSvgY: 375,
      labelClass: 'top-[88%] left-[49%] -translate-x-1/2 w-52 text-center',
    },
  ];

  return (
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] flex items-center justify-center px-6 sm:px-10 lg:px-14 py-4 overflow-hidden bg-transparent"
    >
      {/* Background Soft Pulsing Radial Light */}
      <div 
        className={`
          absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none transition-all duration-700
          ${isHoveredLaptop ? 'bg-[#22C55E]/18 scale-110' : 'bg-[#22C55E]/10 scale-100 animate-ambient-pulse'}
          blur-[140px]
        `} 
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: HERO HEADLINE WITH ENTRANCE STAGGER & LIGHT SWEEP
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col items-start z-10 pr-0 lg:pr-4">
          
          {/* Eyebrow (Entrance Stagger 1) */}
          <div className="transition-all duration-500 transform translate-y-0 opacity-100">
            <span className="text-[#FACC15] text-xs font-mono font-bold tracking-widest uppercase mb-4 inline-block">
              INTERACTIVE VR LEARNING
            </span>
          </div>

          {/* Main Title (Entrance Stagger 2) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.1] mb-6">
            Understand<br />
            What’s Inside<br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4ADE80] via-[#FACC15] to-[#4ADE80] animate-text-sweep font-bold">
              Your Laptop
            </span>
          </h1>

          {/* Description (Entrance Stagger 3) */}
          <p className="text-base text-slate-300 font-sans leading-relaxed max-w-md mb-8">
            Explore laptop components through an interactive virtual reality experience.
          </p>

          {/* Dual Action Buttons (Entrance Stagger 4) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary Button: Start Exploring with arrow slide and click press */}
            <button
              onClick={handlePrimaryClick}
              className={`
                w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full bg-[#22C55E] text-[#06130D] font-display font-semibold text-sm
                hover:bg-[#4ADE80] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-200 group select-none
                ${btnClickScale ? 'scale-95' : 'scale-100 hover:scale-[1.02]'}
              `}
            >
              <span>Start Exploring</span>
              <div className="w-6 h-6 rounded-full bg-[#06130D]/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#06130D]" />
              </div>
            </button>

            {/* Secondary Button: How It Works with play rotation and border brighten */}
            <button
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#0C2017]/80 border border-slate-700/80 text-white font-display font-medium text-sm hover:border-[#22C55E] hover:text-[#4ADE80] hover:bg-[#0E261B] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-200 group"
            >
              <span>How It Works</span>
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <Play className="w-3 h-3 text-slate-300 fill-slate-300 ml-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: LAPTOP WITH IDLE FLOAT & 3D PARALLAX TILT
           ───────────────────────────────────────────────────────────── */}
        <div 
          className="lg:col-span-7 relative flex items-center justify-center py-10 lg:py-4 select-none perspective-[1000px]"
          onMouseEnter={() => setIsHoveredLaptop(true)}
          onMouseLeave={() => setIsHoveredLaptop(false)}
        >
          {/* Green Concentric Floor Rings beneath the Laptop */}
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] h-[160px] sm:h-[220px] rounded-full border border-[#22C55E]/30 concentric-floor-glow pointer-events-none transition-all duration-700" />
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[110px] sm:h-[150px] rounded-full border border-[#22C55E]/40 pointer-events-none" />

          {/* MAIN LAPTOP CONTAINER: Idle Float + 3D Mouse Parallax + Subtle Scale */}
          <div 
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHoveredLaptop ? 1.015 : 1})`,
              transition: isHoveredLaptop ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="relative w-full max-w-[560px] z-10 animate-laptop-float"
          >
            {/* SVG Interactive Connection Lines & Photon Particles */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 560 420"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FACC15" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {hotspots.map((spot) => {
                const isHovered = hoveredHotspot === spot.id;
                return (
                  <g key={`line-${spot.id}`}>
                    {/* Leader Line */}
                    <line
                      x1={spot.pinSvgX}
                      y1={spot.pinSvgY}
                      x2={spot.labelSvgX}
                      y2={spot.labelSvgY}
                      stroke={isHovered ? '#FACC15' : 'rgba(34, 197, 94, 0.35)'}
                      strokeWidth={isHovered ? '2' : '1'}
                      className={isHovered ? 'animate-dash-flow' : ''}
                      opacity={hoveredHotspot && !isHovered ? 0.25 : 1}
                    />
                    {/* Traveling Photon on Hover */}
                    {isHovered && (
                      <circle
                        cx={(spot.pinSvgX + spot.labelSvgX) / 2}
                        cy={(spot.pinSvgY + spot.labelSvgY) / 2}
                        r="3"
                        fill="#FACC15"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* LAPTOP LID / SCREEN */}
            <div className="relative w-[88%] mx-auto aspect-[16/10] rounded-t-xl bg-[#1C2621] p-2.5 sm:p-3 border-t border-x border-slate-700 shadow-2xl transition-all duration-300">
              {/* Inner Screen Display Bezel */}
              <div className="w-full h-full rounded-lg bg-[#040D08] p-1.5 flex flex-col relative overflow-hidden border border-slate-800/80">
                
                {/* MOTHERBOARD / CIRCUIT BOARD WITH VERTICAL SCANNING BEAM */}
                <div className="relative w-full h-full rounded bg-[#03120A] overflow-hidden flex items-center justify-center">
                  
                  {/* Vertical Technology Scanning Ray (Section 7) */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent shadow-[0_0_8px_#22c55e] animate-scanline pointer-events-none z-10" />

                  {/* Grid Circuit Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* CPU Silicon Die Area (Highlights when CPU hotspot hovered) */}
                  <div 
                    className={`
                      relative z-10 w-24 h-24 rounded-lg bg-[#0B2618] border-2 flex flex-col items-center justify-center transition-all duration-300
                      ${hoveredHotspot === 'cpu' 
                        ? 'border-[#FACC15] shadow-[0_0_30px_#FACC15] scale-105' 
                        : 'border-[#22C55E]/60 shadow-[0_0_20px_rgba(34,197,94,0.35)]'
                      }
                    `}
                  >
                    <div className="w-14 h-14 rounded bg-[#04130A] border border-[#4ADE80]/40 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-[#4ADE80] font-bold">CORE</span>
                    </div>
                  </div>

                  {/* GPU Silicon Area (Highlights when GPU hotspot hovered) */}
                  <div 
                    className={`
                      absolute right-8 top-8 w-16 h-16 rounded bg-[#092014] border flex items-center justify-center transition-all duration-300
                      ${hoveredHotspot === 'gpu' 
                        ? 'border-[#FACC15] shadow-[0_0_25px_#FACC15] scale-105' 
                        : 'border-[#22C55E]/50'
                      }
                    `}
                  >
                    <div className="w-9 h-9 rounded bg-[#03120A] border border-emerald-500/30 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#22C55E]">GPU</span>
                    </div>
                  </div>

                  {/* RAM Modules (Highlight when RAM hotspot hovered) */}
                  <div 
                    className={`
                      absolute left-6 top-10 flex flex-col gap-2 transition-all duration-300
                      ${hoveredHotspot === 'ram' ? 'scale-105 drop-shadow-[0_0_12px_#FACC15]' : ''}
                    `}
                  >
                    <div className={`w-16 h-4 rounded-sm bg-[#082014] border ${hoveredHotspot === 'ram' ? 'border-[#FACC15]' : 'border-emerald-500/40'} flex justify-between px-1 items-center`}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-xs bg-[#22C55E]/60" />
                      ))}
                    </div>
                    <div className={`w-16 h-4 rounded-sm bg-[#082014] border ${hoveredHotspot === 'ram' ? 'border-[#FACC15]' : 'border-emerald-500/40'} flex justify-between px-1 items-center`}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-xs bg-[#22C55E]/60" />
                      ))}
                    </div>
                  </div>

                  {/* SSD NVMe M.2 Slot (Highlight when SSD hovered) */}
                  <div 
                    className={`
                      absolute right-10 bottom-6 w-20 h-5 rounded-sm bg-[#071C11] border flex items-center justify-between px-1.5 transition-all duration-300
                      ${hoveredHotspot === 'ssd' ? 'border-[#FACC15] shadow-[0_0_15px_#FACC15] scale-105' : 'border-emerald-500/40'}
                    `}
                  >
                    <div className="w-3 h-3 bg-emerald-500/50 rounded-xs" />
                    <div className="w-6 h-2 bg-emerald-400/30 rounded-xs" />
                    <div className="w-1 h-3 bg-[#FACC15]/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* HINGE ACCENT */}
            <div className="w-[86%] mx-auto h-2 bg-[#2D3A33] border-x border-slate-700 rounded-t-sm" />

            {/* LAPTOP KEYBOARD BASE DECK */}
            <div 
              className={`
                relative w-full rounded-2xl bg-gradient-to-b from-[#3B4841] via-[#2A3630] to-[#1F2923] p-3 sm:p-4 border-t border-slate-600 shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-all duration-300
                ${hoveredHotspot === 'battery' ? 'shadow-[0_0_25px_rgba(250,204,21,0.25)]' : ''}
              `}
            >
              {/* Keyboard Well */}
              <div className="w-full rounded-lg bg-[#141E19] p-2 border border-slate-800 mb-2">
                <div className="space-y-1">
                  <div className="flex gap-1 justify-between">
                    {[...Array(14)].map((_, i) => (
                      <div key={i} className="flex-1 h-2 rounded-xs bg-[#202E26]" />
                    ))}
                  </div>
                  <div className="flex gap-1 justify-between">
                    {[...Array(14)].map((_, i) => (
                      <div key={i} className="flex-1 h-2.5 rounded-xs bg-[#202E26]" />
                    ))}
                  </div>
                  <div className="flex gap-1 justify-between">
                    {[...Array(13)].map((_, i) => (
                      <div key={i} className="flex-1 h-2.5 rounded-xs bg-[#202E26]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Trackpad */}
              <div className="w-28 sm:w-36 h-8 sm:h-10 mx-auto rounded-lg bg-[#1B2620] border border-slate-700/60" />
            </div>

            {/* ─────────────────────────────────────────────────────────
                STAGGERED PULSING HOTSPOTS & INTERACTIVE HOVER TOOLTIPS
               ───────────────────────────────────────────────────────── */}
            {hotspots.map((spot) => {
              const isHovered = hoveredHotspot === spot.id;
              const isOtherHovered = hoveredHotspot && !isHovered;

              return (
                <div key={spot.id}>
                  {/* Hotspot Target Pin */}
                  <div
                    style={{ 
                      top: spot.pinY, 
                      left: spot.pinX,
                      opacity: isOtherHovered ? 0.4 : 1,
                    }}
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 transition-opacity duration-300"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing Radar Ring with Staggered Delay */}
                      <span 
                        style={{ animationDelay: spot.staggerDelay }}
                        className={`
                          absolute w-6 h-6 rounded-full bg-[#FACC15]/25 animate-hotspot-wave pointer-events-none
                          ${isHovered ? 'scale-150 bg-[#FACC15]/50' : ''}
                        `} 
                      />
                      {/* Central Glowing Pin Dot */}
                      <span 
                        className={`
                          w-3.5 h-3.5 rounded-full bg-[#FACC15] border-2 border-[#06130D] shadow-[0_0_12px_#FACC15] transition-transform duration-200
                          ${isHovered ? 'scale-125 shadow-[0_0_20px_#FACC15]' : ''}
                        `} 
                      />
                    </div>
                  </div>

                  {/* Hotspot Callout Text (Highlighted on hover) */}
                  <div 
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    style={{ opacity: isOtherHovered ? 0.35 : 1 }}
                    className={`absolute z-30 cursor-pointer transition-all duration-300 ${spot.labelClass}`}
                  >
                    <span 
                      className={`
                        text-sm font-bold font-display block leading-tight transition-colors duration-200
                        ${isHovered ? 'text-[#FACC15] scale-105 drop-shadow-[0_0_10px_#FACC15]' : 'text-[#FACC15]'}
                      `}
                    >
                      {spot.title}
                    </span>
                    <span 
                      className={`
                        text-[11px] font-sans leading-tight block mt-0.5 transition-colors duration-200
                        ${isHovered ? 'text-white' : 'text-slate-300'}
                      `}
                    >
                      {spot.desc}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
}
