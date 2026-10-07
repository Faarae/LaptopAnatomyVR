import React, { useRef, useState } from 'react';
import { 
  HelpCircle, Shuffle, Move, Search, Timer, ArrowRight, Zap, CheckCircle2 
} from 'lucide-react';

/**
 * ChallengeCard
 * Tactical hardware module card with 3D cursor tilt, micro telemetry,
 * custom hover animations, and HUD aesthetic.
 */
export default function ChallengeCard({
  id,
  number,
  title,
  subtitle,
  description,
  iconType,
  delayClass,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50 });

  // 3D Tilt calculation (max 3-5 degrees as strictly required by prompt Section 10)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4; // Max -4 to +4 deg
    const rotateY = ((x - centerX) / centerX) * 4;  // Max -4 to +4 deg

    setTilt({ rotateX, rotateY });
    setMouseGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    onHover?.(id);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    onLeave?.();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect?.(id)}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${isHovered ? 'translateY(-3px)' : 'translateY(0px)'}`,
        transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      className={`
        group relative rounded-xl bg-[#091D14]/90 border cursor-pointer select-none overflow-hidden
        p-3.5 sm:p-4 flex flex-col justify-between
        ${isHovered 
          ? 'border-[#4ADE80] shadow-[0_0_25px_rgba(74,222,128,0.35),0_12px_28px_rgba(0,0,0,0.8)]' 
          : 'border-[#22C55E]/30 shadow-[0_8px_20px_rgba(0,0,0,0.7)] hover:border-[#22C55E]/60'
        }
        ${delayClass || ''}
      `}
    >
      {/* Dynamic Cursor Spotlight Radial Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(74,222,128,0.18) 0%, transparent 60%)`,
        }}
      />

      {/* Subtle Circuit Grid Overlay */}
      <div className="absolute inset-0 cyber-circuit-grid opacity-30 pointer-events-none" />

      {/* Top Telemetry Header Strip */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#22C55E]/20 pb-2 mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider">
          <span className="text-[#FACC15]">{number}</span>
          <span className="text-white group-hover:text-[#4ADE80] transition-colors">{title}</span>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#4ADE80] animate-ping' : 'bg-[#22C55E]'}`} />
          <span className={`tracking-widest uppercase font-semibold ${isHovered ? 'text-[#4ADE80]' : 'text-slate-400'}`}>
            {isHovered ? '● ON' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Center Visual & Icon Block */}
      <div className="relative z-10 my-1 flex items-center gap-3">
        {/* Unique Icon Animation Pod */}
        <div className={`
          w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300
          ${isHovered 
            ? 'bg-[#123824] border-[#4ADE80] text-[#4ADE80] shadow-[0_0_15px_rgba(74,222,128,0.4)] scale-105' 
            : 'bg-[#0B2117] border-[#22C55E]/30 text-slate-300'
          }
        `}>
          {iconType === 'quiz' && (
            <div className="relative flex items-center justify-center">
              <HelpCircle className={`w-5 h-5 ${isHovered ? 'animate-pulse text-[#4ADE80]' : ''}`} />
            </div>
          )}
          {iconType === 'match' && (
            <div className="relative flex items-center justify-center">
              <Shuffle className={`w-5 h-5 ${isHovered ? 'rotate-12 text-[#4ADE80]' : ''} transition-transform`} />
            </div>
          )}
          {iconType === 'drag' && (
            <div className="relative flex items-center justify-center">
              <Move className={`w-5 h-5 ${isHovered ? 'translate-y-[-2px] text-[#4ADE80]' : ''} transition-transform`} />
            </div>
          )}
          {iconType === 'find' && (
            <div className="relative flex items-center justify-center">
              <Search className={`w-5 h-5 ${isHovered ? 'scale-110 text-[#4ADE80]' : ''} transition-transform`} />
            </div>
          )}
          {iconType === 'speed' && (
            <div className="relative flex items-center justify-center">
              <Timer className={`w-5 h-5 ${isHovered ? 'animate-spin text-[#FACC15]' : 'text-[#FACC15]'}`} style={{ animationDuration: '4s' }} />
            </div>
          )}
        </div>

        {/* Text Description */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Strip with Action CTA */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#22C55E]/20 pt-2 mt-2">
        <span className="text-[10px] font-mono text-[#FACC15] uppercase tracking-wider font-semibold">
          {subtitle || 'HARDWARE MODULE'}
        </span>

        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#4ADE80] group-hover:text-white transition-colors">
          <span>START</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Decorative Chamfer Accent Corner */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-[#22C55E]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-[#22C55E]/40 to-transparent pointer-events-none" />

    </div>
  );
}
