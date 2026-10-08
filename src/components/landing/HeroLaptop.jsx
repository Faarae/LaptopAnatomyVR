import React, { useState } from 'react';
import { Cpu, Fan, BatteryCharging, Monitor, X, Sparkles } from 'lucide-react';

/**
 * HeroLaptop Component - Immersive Fullscreen Centerpiece
 * 
 * Sits in the exact center of the fullscreen product viewport.
 * Features 3D perspective depth, metallic reflections, active screen graphics,
 * and pulsing interactive hotspots.
 * 
 * FUTURE 3D INTEGRATION:
 * The '#hero-laptop-3d-stage' container is modularly structured so a
 * WebGL / Three.js Canvas can replace the visual elements seamlessly.
 */
export default function HeroLaptop({
  timelineStage = 'ready', // 'fade-in' | 'reveal' | 'settle' | 'ready'
  showHotspots = true,
  onHotspotClick,
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Hotspot definitions mapped to internal laptop components with semantic accent colors
  const hotspots = [
    {
      id: 'screen',
      title: 'Ultra-Clear Retina Display',
      category: 'DISPLAY // BUS',
      x: '50%',
      y: '22%',
      icon: Monitor,
      desc: '16-inch high-gamut panel connected via high-speed eDP ribbon cable directly to GPU display engines.',
      stat: '165Hz • DCI-P3',
      color: '#5EB6D6', // Cyan
    },
    {
      id: 'thermal',
      title: 'Dual Thermal Exhaust',
      category: 'COOLING ARCHITECTURE',
      x: '24%',
      y: '68%',
      icon: Fan,
      desc: 'Centrifugal blower fans coupled to quad composite copper heatpipes to dissipate silicon heat.',
      stat: '55 CFM Airflow',
      color: '#45B8A5', // Teal
    },
    {
      id: 'cpu',
      title: 'Hybrid Architecture SoC',
      category: 'CORE COMPUTE',
      x: '50%',
      y: '62%',
      icon: Cpu,
      desc: 'High-performance computing core with integrated hardware thread scheduler and discrete VRAM bus.',
      stat: 'Multi-Core Compute',
      color: '#5BC47A', // Primary Green
    },
    {
      id: 'battery',
      title: 'High-Density Battery Bank',
      category: 'POWER MATRIX',
      x: '76%',
      y: '82%',
      icon: BatteryCharging,
      desc: 'Multi-cell lithium-polymer battery pack with smart power-delivery microcontroller protection.',
      stat: '80 Wh Capacity',
      color: '#E5B85C', // Amber
    }
  ];

  // Dynamic transform styles for the 3-second reveal timeline
  const getTransformStyle = () => {
    switch (timelineStage) {
      case 'fade-in': // 0.0s - 0.8s
        return {
          opacity: 0.15,
          transform: 'translateY(28px) scale(0.92) rotateX(0deg) rotateY(0deg)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'reveal': // 0.8s - 1.8s
        return {
          opacity: 1,
          transform: 'translateY(-6px) scale(1.025) rotateX(6deg) rotateY(-3.5deg)',
          transition: 'all 1.0s cubic-bezier(0.25, 1, 0.5, 1)',
        };
      case 'settle': // 1.8s - 2.5s
        return {
          opacity: 1,
          transform: 'translateY(0px) scale(1) rotateX(3deg) rotateY(0deg)',
          transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        };
      case 'ready': // 2.5s+
      default:
        return {
          opacity: 1,
          transform: 'translateY(0px) scale(1) rotateX(2deg) rotateY(0deg)',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        };
    }
  };

  const isScreenBright = timelineStage === 'settle' || timelineStage === 'ready';

  return (
    <div 
      id="hero-laptop-3d-stage"
      className="relative w-full max-w-3xl mx-auto flex items-center justify-center perspective-1200 py-2 select-none"
    >
      {/* Ambient Radial Glow Behind Laptop */}
      <div className={`
        absolute inset-0 max-w-2xl mx-auto rounded-full blur-[100px] pointer-events-none transition-all duration-1000
        ${isScreenBright ? 'bg-[#5BC47A]/15 scale-110' : 'bg-[#5BC47A]/5 scale-95'}
      `} />

      {/* Main Perspective Laptop Assembly */}
      <div 
        style={getTransformStyle()}
        className="relative w-full max-w-[680px] sm:max-w-[720px] preserve-3d flex flex-col items-center cursor-default"
      >
        {/* LAPTOP DISPLAY LID */}
        <div className="relative w-[92%] sm:w-[94%] aspect-[16/10] max-h-[280px] sm:max-h-[340px] rounded-t-2xl p-[3px] bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 shadow-md border-t border-x border-slate-300 overflow-hidden">
          
          {/* Display Outer Bezel */}
          <div className="w-full h-full rounded-t-xl bg-slate-900 p-2 sm:p-2.5 flex flex-col relative overflow-hidden">
            {/* Top Webcam Notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-0.5 rounded-b-md bg-slate-950 border-b border-white/10 z-30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-slate-600" />
            </div>

            {/* ACTIVE LAPTOP DISPLAY SCREEN */}
            <div className={`
              relative flex-1 w-full rounded-lg overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 transition-all duration-700
              ${isScreenBright 
                ? 'bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-inner' 
                : 'bg-slate-100 shadow-inner opacity-80'
              }
            `}>
              {/* Screen Cyber Grid Blueprint Wallpaper */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

              {/* Specular Diagonal Reflection Beam */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-sweep" />

              {/* Top Screen Status Telemetry */}
              <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-emerald-700 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="tracking-wider">VR HARDWARE ENGINE // ONLINE</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-500 font-medium">
                  <span>DISASSEMBLY READY</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">100% HEALTH</span>
                </div>
              </div>

              {/* Center Screen Holographic Emblem */}
              <div className="relative z-10 my-auto text-center flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold font-mono">
                    VR
                  </div>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-lg text-slate-900 tracking-wide">
                  LAPTOP ANATOMY VR
                </h4>
                <p className="text-[10px] sm:text-xs font-mono text-slate-600 max-w-xs mx-auto">
                  Spatial Hardware Deconstruction
                </p>
              </div>

              {/* Bottom Screen Telemetry Bar */}
              <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-slate-200 text-[9px] sm:text-[10px] font-mono text-slate-500">
                <span>STAGE: HARDWARE OVERVIEW</span>
                <span className="text-emerald-700 font-semibold">PRECISION PERSPECTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* HINGE ASSEMBLY */}
        <div className="w-[90%] h-2 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 border-x border-slate-300 rounded-t-sm shadow-xs" />

        {/* LAPTOP KEYBOARD BASE & CHASSIS DECK */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 p-2.5 sm:p-4 border border-slate-300 shadow-xl overflow-hidden">
          {/* Chamfer Highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

          {/* Keyboard Well */}
          <div className="rounded-xl bg-slate-300/50 p-2 sm:p-3 border border-slate-300 mb-2.5 shadow-inner">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex gap-1 justify-between">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex-1 h-2.5 sm:h-3 rounded-sm bg-white border border-slate-200 shadow-2xs" />
                ))}
              </div>
              <div className="flex gap-1 justify-between">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex-1 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                ))}
              </div>
              <div className="flex gap-1 justify-between">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="flex-1 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                ))}
              </div>
              <div className="flex gap-1 justify-between">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="flex-1 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                ))}
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-8 sm:w-10 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                <div className="w-8 sm:w-10 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                <div className="flex-1 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                <div className="w-8 sm:w-10 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
                <div className="w-10 sm:w-12 h-3 sm:h-3.5 rounded bg-white border border-slate-200 shadow-2xs" />
              </div>
            </div>
          </div>

          {/* Palm Rest & Glass Trackpad */}
          <div className="flex justify-center items-center relative py-0.5">
            <div className="w-36 sm:w-48 h-10 sm:h-12 rounded-xl bg-white/90 border border-slate-300 shadow-inner flex flex-col justify-end p-1">
              <div className="w-full h-[1px] bg-slate-300" />
            </div>

            <div className="absolute right-3 bottom-1 flex items-center gap-1.5 text-[9px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">POWER: ON</span>
            </div>
          </div>
        </div>

        {/* BOTTOM FLOOR SHADOW */}
        <div className="w-[85%] h-5 bg-slate-400/30 blur-xl rounded-full -mt-2 pointer-events-none" />

        {/* INTERACTIVE HOTSPOTS */}
        {showHotspots && hotspots.map((spot) => {
          const IconComponent = spot.icon;
          const isSelected = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{ top: spot.y, left: spot.x }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500"
            >
              {/* Radar Pulsing Hotspot Node */}
              <button
                type="button"
                onClick={() => {
                  const next = isSelected ? null : spot;
                  setActiveHotspot(next);
                  if (onHotspotClick) onHotspotClick(next);
                }}
                className={`
                  relative group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full
                  transition-transform duration-200 hover:scale-125 focus:outline-none
                  ${isSelected ? 'scale-125' : ''}
                `}
                title={spot.title}
              >
                <span 
                  className="absolute inset-0 rounded-full animate-radar pointer-events-none opacity-30"
                  style={{ backgroundColor: spot.color }}
                />
                <span 
                  className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 flex items-center justify-center transition-colors shadow-md"
                  style={{ 
                    borderColor: spot.color,
                    color: spot.color,
                    boxShadow: `0 2px 10px ${spot.color}40`
                  }}
                >
                  <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </button>

              {/* Floating HUD Inspection Card */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 sm:w-68 p-3.5 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <span 
                        className="text-[9px] font-mono uppercase tracking-widest block font-bold"
                        style={{ color: spot.color }}
                      >
                        {spot.category}
                      </span>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-slate-900">
                        {spot.title}
                      </h5>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(null);
                      }}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-relaxed mb-2.5">
                    {spot.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                    <span className="text-slate-500">Spec Metric:</span>
                    <span className="font-bold" style={{ color: spot.color }}>{spot.stat}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
