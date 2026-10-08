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
    <div className="relative w-full rounded-2xl bg-[#151D1B] border border-white/10 overflow-hidden shadow-2xl">
      {/* Viewport Top HUD Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#101716]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5B85C] animate-pulse"></span>
          <span className="text-xs font-mono tracking-wider text-[#45B8A5] uppercase">
            VIEWPORT // 3D STAGE RESERVED
          </span>
          <span className="text-xs text-[#74817B] font-mono hidden sm:inline">
            [ FOV: 75° | AXIS: XYZ | GRID: ACTIVE ]
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#5BC47A]/15 border border-[#5BC47A]/30 text-[#5BC47A]">
            WEBXR READY
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E5B85C]/15 border border-[#E5B85C]/30 text-[#E5B85C]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#5BC47A]/5 via-transparent to-[#45B8A5]/5 pointer-events-none" />

        {/* Futuristic HUD Corner Targeting Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#45B8A5]/40 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#45B8A5]/40 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#45B8A5]/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#45B8A5]/40 pointer-events-none" />

        {/* Center Blueprint Circular Reticle */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-[#45B8A5]/20 animate-[spin_60s_linear_infinite] pointer-events-none" />
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#5BC47A]/25 pointer-events-none" />

        {/* Central Placeholder Content Card */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg p-6 sm:p-8 rounded-2xl bg-[#101716]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Futuristic Icon Badge */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-2xl bg-[#151D1B] border border-[#5BC47A]/40 flex items-center justify-center text-[#5BC47A] shadow-[0_0_20px_rgba(91,196,122,0.25)]">
              <Box className="w-9 h-9 animate-pulse text-[#5BC47A]" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#E5B85C] text-[#0B1110]">
              <Orbit className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Badge Label */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#5BC47A]/15 border border-[#5BC47A]/30 text-[#5BC47A] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            3D Model Coming Soon
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-[#E8EEEA] mb-2">
            3D MODEL PLACEHOLDER
          </h3>

          <p className="text-sm text-[#A9B5AF] max-w-sm mb-5 leading-relaxed font-sans">
            Laptop model will appear here later
          </p>

          {/* Educational context note */}
          <div className="w-full text-left p-3.5 rounded-lg bg-[#151D1B] border border-white/5 text-xs text-[#A9B5AF] font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#E5B85C] shrink-0 mt-0.5" />
            <span>
              Target model for <strong className="text-[#E8EEEA]">{laptopName}</strong> ({category}) will be rendered in this WebGL canvas with interactive component explosion in next phase.
            </span>
          </div>
        </div>

        {/* Viewport Floating Orbit Controls Placeholder */}
        <div className="absolute bottom-5 left-5 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#101716]/85 border border-white/10 text-xs font-mono text-[#74817B]">
          <Compass className="w-4 h-4 text-[#45B8A5]" />
          <span>CAMERA: 0, 1.2, 2.5</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">INTERACTION: INACTIVE</span>
        </div>

        <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101716]/85 border border-white/10 text-xs font-mono text-[#74817B]">
          <Eye className="w-4 h-4 text-[#E5B85C]" />
          <span>STEREO VIEW: 1080P</span>
        </div>
      </div>
    </div>
  );
}
