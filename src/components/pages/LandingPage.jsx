import React, { useState, useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

/**
 * PAGE 1 — LANDING PAGE (Clean Light Theme & Interactive Motion)
 * - Bright clean canvas with emerald accents
 * - 3D Mouse Parallax (max 3-5 deg)
 * - Screen scanning beam
 * - Staggered pulsing hotspots (CPU, GPU, RAM, SSD, Battery)
 * - Friendly tooltips and rounded pill CTAs
 * - Fits in 1 single viewport height with zero scrolling
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
      desc: 'Otak laptop yang memproses seluruh instruksi komputasi.',
      staggerDelay: '0s',
      pinX: '49%',
      pinY: '30%',
      pinSvgX: 274,
      pinSvgY: 126,
      labelSvgX: 274,
      labelSvgY: 55,
      labelClass: 'top-[3%] left-[49%] -translate-x-1/2 w-48 text-center',
    },
    {
      id: 'gpu',
      title: 'GPU',
      desc: 'Akselerator grafis 3D & komputasi visual berkecepatan tinggi.',
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
      desc: 'Memori kerja ultra cepat untuk aplikasi aktif.',
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
      title: 'SSD NVMe',
      desc: 'Penyimpanan data permanen berkecepatan multi-gigabyte/s.',
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
      title: 'Battery Pack',
      desc: 'Sel baterai Lithium-Polymer untuk mobilitas daya portabel.',
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
      className="relative h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] flex items-center justify-center px-6 sm:px-10 lg:px-14 py-2 overflow-hidden bg-transparent select-none"
    >
      {/* Background Soft Pulsing Radial Light (Light Emerald) */}
      <div 
        className={`
          absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700
          ${isHoveredLaptop ? 'bg-emerald-300/20 scale-110' : 'bg-emerald-200/15 scale-100 animate-ambient-pulse'}
          blur-[130px]
        `} 
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: HERO HEADLINE WITH ENTRANCE STAGGER
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col items-start z-10 pr-0 lg:pr-4">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>INTERACTIVE VR LEARNING PLATFORM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-900 leading-[1.1] mb-5">
            Pelajari Anatomi<br />
            Komponen di Dalam<br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 font-extrabold">
              Laptop Anda
            </span>
          </h1>

          {/* Description */}
          <p className="text-base text-slate-600 font-sans leading-relaxed max-w-md mb-7">
            Eksplorasi susunan motherboard, pendingin termal, dan silikon chip komputer melalui simulasi 3D & VR yang ramah dan interaktif.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            {/* Primary Button: Start Exploring */}
            <button
              onClick={handlePrimaryClick}
              className={`
                w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 rounded-xl bg-emerald-600 text-white font-display font-semibold text-sm
                hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all duration-200 group select-none
                ${btnClickScale ? 'scale-95' : 'scale-100 hover:scale-[1.02]'}
              `}
            >
              <span>Mulai Eksplorasi</span>
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            {/* Secondary Button: How It Works */}
            <button
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-display font-medium text-sm hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 shadow-2xs transition-all duration-200 group"
            >
              <span>Panduan Penggunaan</span>
              <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                <Play className="w-3 h-3 text-slate-600 group-hover:text-emerald-700 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: LAPTOP WITH IDLE FLOAT & 3D PARALLAX TILT
           ───────────────────────────────────────────────────────────── */}
        <div 
          className="lg:col-span-7 relative flex items-center justify-center py-6 lg:py-2 select-none perspective-[1000px]"
          onMouseEnter={() => setIsHoveredLaptop(true)}
          onMouseLeave={() => setIsHoveredLaptop(false)}
        >
          {/* Subtle Concentric Floor Rings beneath the Laptop */}
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[150px] sm:h-[200px] rounded-full border border-emerald-400/20 pointer-events-none transition-all duration-700" />
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[100px] sm:h-[140px] rounded-full border border-teal-400/20 pointer-events-none" />

          {/* MAIN LAPTOP CONTAINER: Idle Float + 3D Mouse Parallax + Subtle Scale */}
          <div 
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHoveredLaptop ? 1.015 : 1})`,
              transition: isHoveredLaptop ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="relative w-full max-w-[540px] z-10 animate-laptop-float"
          >
            {/* SVG Interactive Connection Lines & Photon Particles */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 560 420"
            >
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
                      stroke={isHovered ? '#10B981' : 'rgba(16, 185, 129, 0.4)'}
                      strokeWidth={isHovered ? '2' : '1.2'}
                      strokeDasharray={isHovered ? '4 2' : 'none'}
                      opacity={hoveredHotspot && !isHovered ? 0.25 : 1}
                    />
                    {/* Traveling Photon on Hover */}
                    {isHovered && (
                      <circle
                        cx={(spot.pinSvgX + spot.labelSvgX) / 2}
                        cy={(spot.pinSvgY + spot.labelSvgY) / 2}
                        r="3.5"
                        fill="#10B981"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* LAPTOP LID / SCREEN (Crisp Slate Silver Chassis) */}
            <div className="relative w-[88%] mx-auto aspect-[16/10] rounded-t-2xl bg-slate-800 p-2.5 sm:p-3 border-t border-x border-slate-700 shadow-xl transition-all duration-300">
              {/* Inner Screen Display Bezel */}
              <div className="w-full h-full rounded-xl bg-slate-950 p-1.5 flex flex-col relative overflow-hidden border border-slate-800">
                
                {/* MOTHERBOARD / CIRCUIT BOARD WITH VERTICAL SCANNING BEAM */}
                <div className="relative w-full h-full rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center">
                  
                  {/* Vertical Technology Scanning Ray */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399] animate-scanline pointer-events-none z-10" />

                  {/* Grid Circuit Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* CPU Silicon Die Area */}
                  <div 
                    className={`
                      relative z-10 w-24 h-24 rounded-xl bg-slate-800/90 border-2 flex flex-col items-center justify-center transition-all duration-300
                      ${hoveredHotspot === 'cpu' 
                        ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105' 
                        : 'border-emerald-500/50 shadow-sm'
                      }
                    `}
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-900 border border-emerald-500/40 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">CPU CORE</span>
                    </div>
                  </div>

                  {/* GPU Silicon Area */}
                  <div 
                    className={`
                      absolute right-8 top-8 w-16 h-16 rounded-xl bg-slate-800/90 border flex items-center justify-center transition-all duration-300
                      ${hoveredHotspot === 'gpu' 
                        ? 'border-teal-400 shadow-[0_0_18px_rgba(20,184,166,0.5)] scale-105' 
                        : 'border-teal-500/50'
                      }
                    `}
                  >
                    <div className="w-9 h-9 rounded-md bg-slate-900 border border-teal-500/40 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-teal-400 font-bold">GPU</span>
                    </div>
                  </div>

                  {/* RAM Modules */}
                  <div 
                    className={`
                      absolute left-6 top-10 flex flex-col gap-2 transition-all duration-300
                      ${hoveredHotspot === 'ram' ? 'scale-105 drop-shadow-[0_0_12px_rgba(14,165,233,0.5)]' : ''}
                    `}
                  >
                    <div className={`w-16 h-4 rounded bg-slate-800 border ${hoveredHotspot === 'ram' ? 'border-sky-400' : 'border-sky-500/40'} flex justify-between px-1 items-center`}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-xs bg-sky-400/80" />
                      ))}
                    </div>
                    <div className={`w-16 h-4 rounded bg-slate-800 border ${hoveredHotspot === 'ram' ? 'border-sky-400' : 'border-sky-500/40'} flex justify-between px-1 items-center`}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-xs bg-sky-400/80" />
                      ))}
                    </div>
                  </div>

                  {/* SSD NVMe M.2 Slot */}
                  <div 
                    className={`
                      absolute right-10 bottom-6 w-20 h-5 rounded bg-slate-800 border flex items-center justify-between px-1.5 transition-all duration-300
                      ${hoveredHotspot === 'ssd' ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105' : 'border-emerald-500/40'}
                    `}
                  >
                    <div className="w-3 h-3 bg-emerald-400/60 rounded-xs" />
                    <div className="w-6 h-2 bg-emerald-400/40 rounded-xs" />
                    <div className="w-1 h-3 bg-sky-400/90" />
                  </div>
                </div>
              </div>
            </div>

            {/* HINGE ACCENT */}
            <div className="w-[86%] mx-auto h-2 bg-slate-700 border-x border-slate-600 rounded-t-sm" />

            {/* LAPTOP KEYBOARD BASE DECK */}
            <div 
              className={`
                relative w-full rounded-2xl bg-slate-800 p-3 sm:p-4 border-t border-slate-700 shadow-xl transition-all duration-300
                ${hoveredHotspot === 'battery' ? 'shadow-[0_0_20px_rgba(245,158,11,0.3)]' : ''}
              `}
            >
              {/* Keyboard Well */}
              <div className="w-full rounded-xl bg-slate-900 p-2 border border-slate-700/60 mb-2">
                <div className="space-y-1">
                  <div className="flex gap-1 justify-between">
                    {[...Array(14)].map((_, i) => (
                      <div key={i} className="flex-1 h-2 rounded-xs bg-slate-800" />
                    ))}
                  </div>
                  <div className="flex gap-1 justify-between">
                    {[...Array(14)].map((_, i) => (
                      <div key={i} className="flex-1 h-2.5 rounded-xs bg-slate-800" />
                    ))}
                  </div>
                  <div className="flex gap-1 justify-between">
                    {[...Array(13)].map((_, i) => (
                      <div key={i} className="flex-1 h-2.5 rounded-xs bg-slate-800" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Trackpad */}
              <div className="w-28 sm:w-36 h-8 sm:h-9 mx-auto rounded-lg bg-slate-900 border border-slate-700" />
            </div>

            {/* ─────────────────────────────────────────────────────────
                STAGGERED PULSING HOTSPOTS & FRIENDLY LIGHT TOOLTIPS
               ───────────────────────────────────────────────────────── */}
            {hotspots.map((spot) => {
              const isHovered = hoveredHotspot === spot.id;
              const isOtherHovered = hoveredHotspot && !isHovered;

              const spotColor = {
                cpu: '#10B981',
                gpu: '#0D9488',
                ram: '#0284C7',
                ssd: '#059669',
                battery: '#D97706',
              }[spot.id] || '#10B981';

              return (
                <div key={spot.id}>
                  {/* Hotspot Target Pin */}
                  <div
                    style={{ 
                      top: spot.pinY, 
                      left: spot.pinX,
                      opacity: isOtherHovered ? 0.35 : 1,
                    }}
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 transition-opacity duration-300"
                  >
                    <div className="relative flex items-center justify-center">
                      <span 
                        style={{ 
                          animationDelay: spot.staggerDelay,
                          backgroundColor: `${spotColor}33`,
                        }}
                        className={`
                          absolute w-6 h-6 rounded-full animate-hotspot-wave pointer-events-none
                          ${isHovered ? 'scale-150' : ''}
                        `} 
                      />
                      <span 
                        style={{
                          backgroundColor: spotColor,
                          boxShadow: isHovered ? `0 0 12px ${spotColor}` : `0 0 6px ${spotColor}`,
                        }}
                        className={`
                          w-3.5 h-3.5 rounded-full border-2 border-white transition-transform duration-200
                          ${isHovered ? 'scale-125' : ''}
                        `} 
                      />
                    </div>
                  </div>

                  {/* Hotspot Callout Text (Clean light friendly card) */}
                  <div 
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    style={{ opacity: isOtherHovered ? 0.3 : 1 }}
                    className={`absolute z-30 cursor-pointer transition-all duration-300 ${spot.labelClass}`}
                  >
                    <div className={`p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md ${isHovered ? 'ring-2 ring-emerald-500/30' : ''}`}>
                      <span 
                        style={{ color: spotColor }}
                        className="text-xs font-bold font-display block leading-tight"
                      >
                        {spot.title}
                      </span>
                      <span className="text-[10px] font-sans text-slate-500 leading-tight block mt-0.5">
                        {spot.desc}
                      </span>
                    </div>
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
