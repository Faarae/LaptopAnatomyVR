import React from 'react';
import { Box, Eye, Orbit, Compass, AlertCircle } from 'lucide-react';

/**
 * 3D Model Viewport Placeholder (Theme Aligned)
 * 
 * IMPORTANT ARCHITECTURAL DESIGN:
 * This component acts as the designated viewport container reserved for future
 * Three.js / WebXR / Canvas 3D rendering.
 * 
 * When 3D assets are ready, replace the placeholder interior with your <canvas>
 * or 3D scene loader inside `#vr-3d-viewport-target` without modifying the surrounding UI.
 */
export default function Model3DPlaceholder({ laptopName = "Laptop Model", category = "Hardware" }) {
  return (
    <div className="relative w-full rounded-2xl bg-[#081810] border border-[#22C55E]/30 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9)]">
      {/* Viewport Top HUD Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#22C55E]/20 bg-[#0C2017]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] animate-pulse"></span>
          <span className="text-xs font-mono tracking-wider text-[#4ADE80] uppercase">
            VIEWPORT // 3D STAGE RESERVED
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            [ FOV: 75° | AXIS: XYZ | GRID: ACTIVE ]
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#4ADE80]">
            WEBXR READY
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FACC15]/15 border border-[#FACC15]/30 text-[#FACC15]">
            PHASE 1
          </span>
        </div>
      </div>

      {/* Target Mount Container: reserved id for future Three.js/WebGL canvas */}
      <div 
        id="vr-3d-viewport-target"
        className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center p-8 select-none overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#22C55E]/10 via-transparent to-[#FACC15]/5 pointer-events-none" />

        {/* Futuristic HUD Corner Targeting Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#22C55E]/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#22C55E]/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#22C55E]/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#22C55E]/60 pointer-events-none" />

        {/* Center Blueprint Circular Reticle */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-[#22C55E]/20 animate-[spin_60s_linear_infinite] pointer-events-none" />
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#4ADE80]/25 pointer-events-none" />

        {/* Central Placeholder Content Card */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg p-6 sm:p-8 rounded-2xl bg-[#06130D]/90 border border-[#22C55E]/30 backdrop-blur-xl shadow-2xl">
          {/* Futuristic Icon Badge */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-2xl bg-[#0C2017] border border-[#22C55E]/40 flex items-center justify-center text-[#4ADE80] shadow-[0_0_25px_rgba(34,197,94,0.3)]">
              <Box className="w-9 h-9 animate-pulse text-[#4ADE80]" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#FACC15] text-[#06130D]">
              <Orbit className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Badge Label */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#4ADE80] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            3D Model Coming Soon
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white mb-2">
            3D MODEL PLACEHOLDER
          </h3>

          <p className="text-sm text-slate-300 max-w-sm mb-5 leading-relaxed font-sans">
            Laptop model will appear here later
          </p>

          {/* Educational context note */}
          <div className="w-full text-left p-3.5 rounded-lg bg-[#081810] border border-slate-800 text-xs text-slate-300 font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
            <span>
              Target model for <strong className="text-white">{laptopName}</strong> ({category}) will be rendered in this WebGL canvas with interactive component explosion in next phase.
            </span>
          </div>
        </div>

        {/* Viewport Floating Orbit Controls Placeholder */}
        <div className="absolute bottom-5 left-5 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#06130D]/85 border border-slate-800 text-xs font-mono text-slate-400">
          <Compass className="w-4 h-4 text-[#22C55E]" />
          <span>CAMERA: 0, 1.2, 2.5</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">INTERACTION: INACTIVE</span>
        </div>

        <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06130D]/85 border border-slate-800 text-xs font-mono text-slate-400">
          <Eye className="w-4 h-4 text-[#FACC15]" />
          <span>STEREO VIEW: 1080P</span>
        </div>
      </div>
    </div>
  );
}
