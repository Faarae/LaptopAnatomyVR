import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Laptop Card with 3D Tilt & Micro-Interactions
 */
function InteractiveLaptopCard({
  code,
  title,
  category,
  categoryColor,
  description,
  isPopular = false,
  wallpaperType = 'wave',
  onExplore,
  delayMs = 0,
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit to max 3 degrees tilt
    setTilt({
      x: Math.max(-3, Math.min(3, -y / 15)),
      y: Math.max(-3, Math.min(3, x / 15)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -8 : 0}px)`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        animationDelay: `${delayMs}ms`,
      }}
      className={`
        rounded-2xl p-6 flex flex-col justify-between relative transition-shadow duration-300 select-none
        ${isPopular 
          ? 'bg-[#0E261B] border-2 border-[#22C55E]/40 shadow-[0_0_35px_rgba(34,197,94,0.18)] hover:border-[#4ADE80] hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]' 
          : 'bg-[#0C2017]/80 border border-[#22C55E]/20 hover:border-[#22C55E]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(34,197,94,0.2)]'
        }
      `}
    >
      {/* Top "Popular" Badge for Laptop B */}
      {isPopular && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-[#FACC15] text-[#06130D] text-[11px] font-bold font-display uppercase tracking-wider shadow-[0_0_12px_rgba(250,204,21,0.5)]">
            Popular
          </span>
        </div>
      )}

      <div>
        {/* Laptop Image Canvas */}
        <div className="w-full aspect-[16/11] rounded-xl bg-[#071710] border border-slate-800 flex items-center justify-center p-4 mb-6 relative overflow-hidden group">
          {/* Green floor ring inside popular card */}
          {isPopular && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full border border-[#22C55E]/50 bg-[#22C55E]/15 blur-[2px] pointer-events-none" />
          )}

          {/* Screen with smooth scaling on card hover */}
          <div 
            className={`
              w-[84%] aspect-[16/10] rounded-t-lg bg-[#030E07] border p-1 flex flex-col justify-center items-center shadow-lg relative z-10 transition-transform duration-300
              ${isPopular ? 'border-emerald-600/50' : 'border-slate-700'}
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
          >
            <div className="w-full h-full rounded bg-[#021008] overflow-hidden relative flex items-center justify-center">
              {wallpaperType === 'wave' && (
                <svg className="w-full h-full opacity-75" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10 60 Q 50 20, 100 60 T 210 60" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                  <path d="M-10 75 Q 60 40, 110 75 T 210 75" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.6" />
                </svg>
              )}

              {wallpaperType === 'gaming' && (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#4ADE80] shadow-[0_0_15px_#22c55e]">
                  <svg className="w-8 h-8 text-[#4ADE80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 22 22 7 12 2" fill="rgba(34, 197, 94, 0.2)" />
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#FACC15" />
                  </svg>
                </div>
              )}

              {wallpaperType === 'creator' && (
                <svg className="w-full h-full opacity-85" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 110 C 70 20, 130 20, 170 110" fill="none" stroke="#38BDF8" strokeWidth="3" />
                  <path d="M50 110 C 80 40, 120 40, 150 110" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
                  <path d="M70 110 C 90 60, 110 60, 130 110" fill="none" stroke="#A855F7" strokeWidth="2" />
                </svg>
              )}
            </div>
          </div>

          {/* Base Deck */}
          <div className="w-[96%] h-2.5 rounded-b-md bg-[#1F2B24] border-t border-slate-600 absolute bottom-5 left-1/2 -translate-x-1/2 z-10" />
        </div>

        {/* Title & Category */}
        <h3 className="text-xl font-bold font-display text-white mb-0.5">
          {title}
        </h3>
        <p className="text-xs font-mono mb-3" style={{ color: categoryColor }}>
          {category}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Explore Button */}
      <button
        onClick={onExplore}
        className={`
          w-full py-2.5 px-4 rounded-full font-display text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group
          ${isPopular 
            ? 'bg-[#FACC15] text-[#06130D] font-bold hover:bg-[#FDE047] shadow-[0_0_20px_rgba(250,204,21,0.45)]' 
            : 'bg-[#081810] border border-slate-700/80 text-white hover:border-[#22C55E] hover:text-[#4ADE80] hover:bg-[#0C2017]'
          }
        `}
      >
        <span>Explore</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
      </button>
    </div>
  );
}

/**
 * PAGE 2 — CHOOSE YOUR LAPTOP
 */
export default function LaptopSelection({ onSelectLaptop, onNavigate }) {
  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-4 bg-transparent">
      <div className="max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight mb-3">
            Choose Your Laptop
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Select a laptop and start your exploration journey.
          </p>
        </div>

        {/* 3 Laptop Cards with Staggered Entrance & 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <InteractiveLaptopCard
            code="laptop-a"
            title="Laptop A"
            category="Entry Level"
            categoryColor="#4ADE80"
            description="Perfect for everyday tasks and learning."
            wallpaperType="wave"
            delayMs={0}
            onExplore={() => onSelectLaptop('laptop-a')}
          />

          <InteractiveLaptopCard
            code="laptop-b"
            title="Laptop B"
            category="Gaming"
            categoryColor="#FACC15"
            description="High performance for gaming and entertainment."
            isPopular={true}
            wallpaperType="gaming"
            delayMs={120}
            onExplore={() => onSelectLaptop('laptop-b')}
          />

          <InteractiveLaptopCard
            code="laptop-c"
            title="Laptop C"
            category="Creator"
            categoryColor="#4ADE80"
            description="Built for creators and professional workflows."
            wallpaperType="creator"
            delayMs={240}
            onExplore={() => onSelectLaptop('laptop-c')}
          />
        </div>

        {/* Bottom Comparison Prompt */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm font-sans text-slate-400">
            Can’t decide?{' '}
            <button
              onClick={() => onNavigate('component-library')}
              className="text-[#FACC15] hover:underline font-semibold font-display inline-flex items-center gap-1 group"
            >
              <span>Compare laptops</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
