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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 font-mono font-bold text-lg shadow-xs">
              {pin.pinNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase font-bold">
                  PIN #{pin.pinNumber < 10 ? `0${pin.pinNumber}` : pin.pinNumber} // {pin.badge}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                  {pin.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                {pin.shortName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Full Name & Technical Role */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-mono uppercase tracking-wider text-teal-700 mb-1 font-bold">
              Architecture Title
            </h3>
            <p className="text-sm font-semibold text-slate-900 mb-1.5 font-display">
              {pin.name}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {pin.description}
            </p>
          </div>

          {/* Primary Role & Bus Communication */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-2 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Primary Function & Signal Routing</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {pin.role}
            </div>
          </div>

          {/* Practical Application in Laptops */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-2 font-bold">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>How This Functions in Modern Laptops</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {pin.laptopComparison}
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2 font-bold">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Hardware Parameters & Electrical Specs</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(pin.specs).map(([key, val], idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-semibold">
                    {key}
                  </span>
                  <span className="text-xs font-mono font-bold text-sky-700 mt-1">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VR Inspection Observation Note */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-300 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-2">
                <span>VR Inspection Observation Tip</span>
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {pin.vrNote}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-slate-200 bg-white/95 backdrop-blur-xl gap-3">
          {/* Previous / Next Pin navigation */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => onNavigatePin?.(pin.pinNumber - 1)}
              disabled={pin.pinNumber <= 1}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                pin.pinNumber <= 1
                  ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pin #{pin.pinNumber - 1}</span>
            </button>

            <span className="text-xs font-mono text-slate-500 px-1 font-semibold">
              {pin.pinNumber} / 10
            </span>

            <button
              onClick={() => onNavigatePin?.(pin.pinNumber + 1)}
              disabled={pin.pinNumber >= 10}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                pin.pinNumber >= 10
                  ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 shadow-xs'
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
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-display font-bold shadow-xs transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Focus in 3D</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono hover:bg-slate-200 transition-all font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
