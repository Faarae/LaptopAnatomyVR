import React from 'react';
import { Cpu, Zap, Crosshair, Timer, HardDrive, MemoryStick as Memory, Radio } from 'lucide-react';

/**
 * CenterHardwareVisual
 * Responsive central hardware schematic for the Challenge Lab Hub.
 * Transforms dynamically based on which game card is hovered:
 * - 'quiz': highlights CPU, RAM, GPU, SSD nodes with illuminated telemetry tags
 * - 'match': illustrates two connected communication bus lines
 * - 'drag': displays component -> target socket snap guide
 * - 'find': displays glowing scanning crosshair & coordinates
 * - 'speed': displays pulsing clock frequency gauge & timer aura
 * - default/idle: subtle breathing float with circuit traces
 */
export default function CenterHardwareVisual({ hoveredCard }) {
  return (
    <div className="relative w-full max-w-[340px] lg:max-w-[380px] h-[190px] lg:h-[220px] mx-auto flex items-center justify-center select-none">
      
      {/* Background Ambient Radial Glow */}
      <div 
        className={`
          absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none
          ${hoveredCard === 'speed' ? 'bg-amber-400/10 blur-xl scale-105' :
            hoveredCard ? 'bg-emerald-400/10 blur-xl scale-105' :
            'bg-slate-200/30 blur-lg scale-95'
          }
        `}
      />

      {/* Main Tactical Hardware Chassis Container */}
      <div className={`
        relative w-full h-full rounded-2xl bg-white border transition-all duration-400 p-3 flex flex-col justify-between overflow-hidden shadow-sm
        ${hoveredCard ? 'border-emerald-400 shadow-md ring-2 ring-emerald-100' : 'border-slate-200/90'}
      `}>
        
        {/* Subtle Circuit Grid Overlay */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-10 pointer-events-none" />

        {/* Chassis Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wider uppercase font-bold">
              {hoveredCard === 'quiz' && 'DIAGNOSTIC ARCHITECTURE'}
              {hoveredCard === 'match' && 'BUS INTERCONNECT MATRIX'}
              {hoveredCard === 'drag' && 'SOCKET CLEARANCE MOUNT'}
              {hoveredCard === 'find' && 'SPATIAL RETICLE SCAN'}
              {hoveredCard === 'speed' && 'OVERCLOCK TELEMETRY'}
              {!hoveredCard && 'LAPTOP HARDWARE DIGITAL TWIN'}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 font-medium">
            {hoveredCard ? 'SYSTEM ACTIVE' : 'STANDBY // IDLE'}
          </span>
        </div>

        {/* Dynamic Center Visual Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-1">
          
          {/* 1. QUIZ HOVER: Multi-color Core Silicon Nodes */}
          {hoveredCard === 'quiz' && (
            <div className="w-full grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-xs">
                <Cpu className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-900">CPU DIE</div>
                  <div className="text-[8px] font-mono text-emerald-700 font-semibold">CORE 13700H</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-xs">
                <Memory className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-900">RAM BUS</div>
                  <div className="text-[8px] font-mono text-teal-700 font-semibold">16GB DDR5</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-xs">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-900">GPU SILICON</div>
                  <div className="text-[8px] font-mono text-amber-700 font-semibold">RTX DEDICATED</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-xs">
                <HardDrive className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-900">SSD M.2</div>
                  <div className="text-[8px] font-mono text-sky-700 font-semibold">NVME GEN4</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MATCH IT HOVER: Two Connected Communication Nodes */}
          {hoveredCard === 'match' && (
            <div className="w-full flex items-center justify-between px-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-emerald-300 flex flex-col items-center gap-1 shadow-xs">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span className="text-[9px] font-mono font-bold text-slate-900">COMPONENT</span>
              </div>
              
              {/* Dynamic Connecting Laser Bus */}
              <div className="flex-1 mx-3 flex flex-col items-center relative">
                <svg className="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <line x1="0" y1="12" x2="100" y2="12" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="neon-dash-flow" />
                  <circle cx="50" cy="12" r="4" fill="#10b981" className="animate-ping" />
                  <circle cx="50" cy="12" r="3" fill="#f59e0b" />
                </svg>
                <span className="text-[8px] font-mono text-amber-700 uppercase tracking-wider font-bold">128-BIT BUS LINK</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-amber-300 flex flex-col items-center gap-1 shadow-xs">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-[9px] font-mono font-bold text-slate-900">FUNCTION</span>
              </div>
            </div>
          )}

          {/* 3. DRAG & PLACE HOVER: Component Moving Toward Socket */}
          {hoveredCard === 'drag' && (
            <div className="w-full flex items-center justify-around animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2 animate-bounce">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span className="text-[9px] font-mono font-bold text-slate-900">CPU DIE</span>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[14px] text-emerald-600 font-mono font-bold">→ SNAP →</span>
                <span className="text-[8px] font-mono text-slate-500">PIN 001 ALIGN</span>
              </div>

              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-1">
                <span className="text-[8px] font-mono text-sky-700 text-center font-bold">SOCKET LGA-1744</span>
              </div>
            </div>
          )}

          {/* 4. FIND COMPONENT HOVER: Scanning Reticle & Coordinates */}
          {hoveredCard === 'find' && (
            <div className="w-full flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-emerald-300 border-dashed animate-reticle-spin" />
                <div className="absolute inset-2 rounded-full border border-emerald-400 animate-pulse" />
                <Crosshair className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-0.5 text-left font-mono">
                <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>TARGET ACQUIRING</span>
                </div>
                <div className="text-[9px] text-slate-600">GRID: 34.8°N / 118.2°W</div>
                <div className="text-[9px] text-amber-700 font-semibold">SEEK: DDR5 SO-DIMM</div>
              </div>
            </div>
          )}

          {/* 5. SPEED CHALLENGE HOVER: Overclock Speed Gauge */}
          {hoveredCard === 'speed' && (
            <div className="w-full flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-amber-50 border-2 border-amber-400 animate-amber-pulse">
                <Timer className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left font-mono space-y-0.5">
                <div className="text-[12px] font-bold text-amber-700">SPEED: 00:45.00</div>
                <div className="text-[9px] text-slate-800 font-semibold">CLOCK: 5.20 GHz TURBO</div>
                <div className="text-[9px] text-emerald-700 font-bold">BURST COMBO ACTIVE</div>
              </div>
            </div>
          )}

          {/* 6. DEFAULT / IDLE STATE: Elegant Motherboard Silhouette */}
          {!hoveredCard && (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Motherboard Outline SVG Graphic */}
              <svg className="w-56 h-20 text-slate-300" viewBox="0 0 240 80" fill="none">
                {/* Board Boundary */}
                <rect x="10" y="5" width="220" height="70" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* CPU Socket Center */}
                <rect x="40" y="18" width="40" height="40" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1" />
                <circle cx="60" cy="38" r="8" fill="rgba(16, 185, 129, 0.15)" />
                {/* RAM Slots */}
                <rect x="100" y="16" width="12" height="44" rx="2" stroke="currentColor" strokeWidth="1" />
                <rect x="118" y="16" width="12" height="44" rx="2" stroke="currentColor" strokeWidth="1" />
                {/* NVMe Slot */}
                <rect x="148" y="24" width="56" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
                <rect x="148" y="44" width="34" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
                {/* Circuit Traces */}
                <path d="M80 38 L100 38 M60 58 L60 70 L140 70 M130 38 L148 31" stroke="#10b981" strokeWidth="1" opacity="0.6" />
              </svg>
              <div className="absolute bottom-1 text-[9px] font-mono text-slate-500 tracking-widest uppercase font-medium">
                Hover module to activate diagnostic route
              </div>
            </div>
          )}

        </div>

        {/* Chassis Footer Micro-telemetry */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-1 text-[8px] font-mono text-slate-500 font-medium">
          <span>REV 3.2 MAINBOARD</span>
          <span className="text-emerald-700 font-bold">PWR: 100% NOMINAL</span>
          <span>TEMP: 38°C</span>
        </div>

      </div>

    </div>
  );
}
