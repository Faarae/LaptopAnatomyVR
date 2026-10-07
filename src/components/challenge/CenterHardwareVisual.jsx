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
          ${hoveredCard === 'speed' ? 'bg-[#FACC15]/15 blur-2xl scale-110' :
            hoveredCard ? 'bg-[#22C55E]/18 blur-2xl scale-105' :
            'bg-[#22C55E]/8 blur-xl scale-95'
          }
        `}
      />

      {/* Main Tactical Hardware Chassis Container */}
      <div className={`
        relative w-full h-full rounded-2xl bg-[#071911]/90 border transition-all duration-400 p-3 flex flex-col justify-between overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.85)]
        ${hoveredCard ? 'border-[#22C55E]/60 shadow-[0_0_25px_rgba(34,197,94,0.2)]' : 'border-[#22C55E]/30'}
      `}>
        
        {/* Subtle Circuit Grid Overlay */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-40 pointer-events-none" />

        {/* Chassis Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#22C55E]/20 pb-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#4ADE80]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">
              {hoveredCard === 'quiz' && 'DIAGNOSTIC ARCHITECTURE'}
              {hoveredCard === 'match' && 'BUS INTERCONNECT MATRIX'}
              {hoveredCard === 'drag' && 'SOCKET CLEARANCE MOUNT'}
              {hoveredCard === 'find' && 'SPATIAL RETICLE SCAN'}
              {hoveredCard === 'speed' && 'OVERCLOCK TELEMETRY'}
              {!hoveredCard && 'LAPTOP HARDWARE DIGITAL TWIN'}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">
            {hoveredCard ? 'SYSTEM ACTIVE' : 'STANDBY // IDLE'}
          </span>
        </div>

        {/* Dynamic Center Visual Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-1">
          
          {/* 1. QUIZ HOVER: Highlighted Core Silicon Nodes */}
          {hoveredCard === 'quiz' && (
            <div className="w-full grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2 rounded-lg bg-[#0C2419] border border-[#22C55E]/50 flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                <Cpu className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-white">CPU DIE</div>
                  <div className="text-[8px] font-mono text-[#4ADE80]">CORE 13700H</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#0C2419] border border-[#22C55E]/50 flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                <Memory className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-white">RAM BUS</div>
                  <div className="text-[8px] font-mono text-[#4ADE80]">16GB DDR5</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#0C2419] border border-[#22C55E]/50 flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                <Zap className="w-4 h-4 text-[#FACC15] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-white">GPU SILICON</div>
                  <div className="text-[8px] font-mono text-[#FACC15]">RTX DEDICATED</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#0C2419] border border-[#22C55E]/50 flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                <HardDrive className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono font-bold text-white">SSD M.2</div>
                  <div className="text-[8px] font-mono text-[#4ADE80]">NVME GEN4</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MATCH IT HOVER: Two Connected Communication Nodes */}
          {hoveredCard === 'match' && (
            <div className="w-full flex items-center justify-between px-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2.5 rounded-xl bg-[#0E2C1E] border border-[#22C55E] flex flex-col items-center gap-1 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Cpu className="w-5 h-5 text-[#4ADE80]" />
                <span className="text-[9px] font-mono font-bold text-white">COMPONENT</span>
              </div>
              
              {/* Dynamic Connecting Laser Bus */}
              <div className="flex-1 mx-3 flex flex-col items-center relative">
                <svg className="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <line x1="0" y1="12" x2="100" y2="12" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 4" className="neon-dash-flow" />
                  <circle cx="50" cy="12" r="4" fill="#22C55E" className="animate-ping" />
                  <circle cx="50" cy="12" r="3" fill="#FACC15" />
                </svg>
                <span className="text-[8px] font-mono text-[#FACC15] uppercase tracking-wider font-bold">128-BIT BUS LINK</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0E2C1E] border border-[#FACC15] flex flex-col items-center gap-1 shadow-[0_0_15px_rgba(250,204,21,0.25)]">
                <Zap className="w-5 h-5 text-[#FACC15]" />
                <span className="text-[9px] font-mono font-bold text-white">FUNCTION</span>
              </div>
            </div>
          )}

          {/* 3. DRAG & PLACE HOVER: Component Moving Toward Socket */}
          {hoveredCard === 'drag' && (
            <div className="w-full flex items-center justify-around animate-in fade-in zoom-in-95 duration-300">
              <div className="p-2 rounded-lg bg-[#0E2C1E] border border-[#FACC15] flex items-center gap-2 animate-bounce">
                <Cpu className="w-4 h-4 text-[#FACC15]" />
                <span className="text-[9px] font-mono font-bold text-white">CPU DIE</span>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[14px] text-[#4ADE80] font-mono font-bold">→ SNAP →</span>
                <span className="text-[8px] font-mono text-slate-400">PIN 001 ALIGN</span>
              </div>

              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[#22C55E] bg-[#22C55E]/10 flex flex-col items-center justify-center p-1">
                <span className="text-[8px] font-mono text-[#4ADE80] text-center font-bold">SOCKET LGA-1744</span>
              </div>
            </div>
          )}

          {/* 4. FIND COMPONENT HOVER: Scanning Reticle & Coordinates */}
          {hoveredCard === 'find' && (
            <div className="w-full flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#22C55E]/40 border-dashed animate-reticle-spin" />
                <div className="absolute inset-2 rounded-full border border-[#4ADE80]/70 animate-pulse" />
                <Crosshair className="w-7 h-7 text-[#22C55E]" />
              </div>
              <div className="space-y-0.5 text-left font-mono">
                <div className="text-[10px] font-bold text-[#4ADE80] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                  <span>TARGET ACQUIRING</span>
                </div>
                <div className="text-[9px] text-slate-300">GRID: 34.8°N / 118.2°W</div>
                <div className="text-[9px] text-[#FACC15]">SEEK: DDR5 SO-DIMM</div>
              </div>
            </div>
          )}

          {/* 5. SPEED CHALLENGE HOVER: Overclock Speed Gauge */}
          {hoveredCard === 'speed' && (
            <div className="w-full flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-[#FACC15]/10 border-2 border-[#FACC15] animate-amber-pulse">
                <Timer className="w-6 h-6 text-[#FACC15]" />
              </div>
              <div className="text-left font-mono space-y-0.5">
                <div className="text-[12px] font-bold text-[#FACC15]">SPEED: 00:45.00</div>
                <div className="text-[9px] text-white">CLOCK: 5.20 GHz TURBO</div>
                <div className="text-[9px] text-[#4ADE80]">BURST COMBO ACTIVE</div>
              </div>
            </div>
          )}

          {/* 6. DEFAULT / IDLE STATE: Elegant Motherboard Silhouette */}
          {!hoveredCard && (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Motherboard Outline SVG Graphic */}
              <svg className="w-56 h-20 text-[#22C55E]/40" viewBox="0 0 240 80" fill="none">
                {/* Board Boundary */}
                <rect x="10" y="5" width="220" height="70" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* CPU Socket Center */}
                <rect x="40" y="18" width="40" height="40" rx="4" fill="rgba(34, 197, 94, 0.08)" stroke="currentColor" strokeWidth="1" />
                <circle cx="60" cy="38" r="8" fill="rgba(34, 197, 94, 0.2)" />
                {/* RAM Slots */}
                <rect x="100" y="16" width="12" height="44" rx="2" stroke="currentColor" strokeWidth="1" />
                <rect x="118" y="16" width="12" height="44" rx="2" stroke="currentColor" strokeWidth="1" />
                {/* NVMe Slot */}
                <rect x="148" y="24" width="56" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
                <rect x="148" y="44" width="34" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
                {/* Circuit Traces */}
                <path d="M80 38 L100 38 M60 58 L60 70 L140 70 M130 38 L148 31" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              </svg>
              <div className="absolute bottom-1 text-[9px] font-mono text-[#4ADE80]/80 tracking-widest uppercase">
                Hover module to activate diagnostic route
              </div>
            </div>
          )}

        </div>

        {/* Chassis Footer Micro-telemetry */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#22C55E]/20 pt-1 text-[8px] font-mono text-slate-400">
          <span>REV 3.2 MAINBOARD</span>
          <span className="text-[#4ADE80]">PWR: 100% NOMINAL</span>
          <span>TEMP: 38°C</span>
        </div>

      </div>

    </div>
  );
}
