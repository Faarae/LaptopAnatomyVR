import React from 'react';
import { 
  X, Cpu, Sparkles, Zap, Shield, Eye, Volume2, ArrowRight, ArrowLeft, 
  Layers, Compass, Info, CheckCircle2 
} from 'lucide-react';

/**
 * ComponentDetailModal
 * High-tech holographic drawer modal displaying educational descriptions,
 * technical specs, and VR insights when a motherboard pin/component is clicked.
 */
export default function ComponentDetailModal({ pin, onClose, onNavigatePin, onFocus3D }) {
  if (!pin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#071911] border border-[#22C55E]/40 shadow-[0_0_60px_rgba(34,197,94,0.25)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[#22C55E]/20 bg-[#0C2419]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#092218] border-2 border-[#22C55E] flex items-center justify-center text-[#4ADE80] font-mono font-bold text-lg shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              {pin.pinNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#FACC15] uppercase font-semibold">
                  PIN #{pin.pinNumber < 10 ? `0${pin.pinNumber}` : pin.pinNumber} // {pin.badge}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30">
                  {pin.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                {pin.shortName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#092017] border border-slate-700 text-slate-400 hover:text-white hover:border-[#22C55E] transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Full Name & Technical Role */}
          <div className="p-4 rounded-2xl bg-[#0B251A]/80 border border-[#22C55E]/25">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#4ADE80] mb-1 font-semibold">
              Architecture Title
            </h3>
            <p className="text-sm font-semibold text-white mb-2 font-display">
              {pin.name}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {pin.description}
            </p>
          </div>

          {/* Primary Role & Bus Communication */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#FACC15] mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Primary Function & Signal Routing</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-[#081F15] border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {pin.role}
            </div>
          </div>

          {/* Practical Application in Laptops */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4ADE80] mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>How This Functions in Modern Laptops</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#0B291D]/90 border border-[#22C55E]/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {pin.laptopComparison}
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Hardware Parameters & Electrical Specs</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(pin.specs).map(([key, val], idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-[#06170F] border border-slate-800/90 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                    {key}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#4ADE80] mt-1">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VR Inspection Observation Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C2419] to-[#0A291E] border border-[#FACC15]/30 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#FACC15]/15 text-[#FACC15] shrink-0 mt-0.5">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-mono font-semibold text-[#FACC15] uppercase tracking-wider mb-1 flex items-center gap-2">
                <span>VR Inspection Observation Tip</span>
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {pin.vrNote}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-[#22C55E]/20 bg-[#0C2419]/95 backdrop-blur-xl gap-3">
          {/* Previous / Next Pin navigation */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => onNavigatePin?.(pin.pinNumber - 1)}
              disabled={pin.pinNumber <= 1}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                pin.pinNumber <= 1
                  ? 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-[#092218] border-slate-700 text-slate-300 hover:text-white hover:border-[#22C55E]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pin #{pin.pinNumber - 1}</span>
            </button>

            <span className="text-xs font-mono text-slate-400 px-1">
              {pin.pinNumber} / 10
            </span>

            <button
              onClick={() => onNavigatePin?.(pin.pinNumber + 1)}
              disabled={pin.pinNumber >= 10}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                pin.pinNumber >= 10
                  ? 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-[#092218] border-slate-700 text-slate-300 hover:text-white hover:border-[#22C55E]'
              }`}
            >
              <span>Pin #{pin.pinNumber + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onFocus3D?.(pin);
                onClose();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#06170F] text-xs font-display font-bold hover:brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Focus in 3D</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#081C13] border border-slate-700 text-slate-300 text-xs font-mono hover:text-white hover:border-slate-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
