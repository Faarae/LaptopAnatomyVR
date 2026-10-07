import React, { useState } from 'react';
import { ArrowRight, Cpu, Battery, Fan, CircuitBoard, Wifi } from 'lucide-react';

/**
 * Custom Hardware Icons with Idle Animations
 */
function RamAnimatedIcon({ className }) {
  return (
    <div className="relative overflow-hidden w-7 h-7 flex items-center justify-center">
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="7" width="20" height="10" rx="1.5" />
        <line x1="5" y1="10" x2="8" y2="10" />
        <line x1="11" y1="10" x2="14" y2="10" />
        <line x1="17" y1="10" x2="19" y2="10" />
        <line x1="5" y1="17" x2="5" y2="19" />
        <line x1="9" y1="17" x2="9" y2="19" />
        <line x1="13" y1="17" x2="13" y2="19" />
        <line x1="17" y1="17" x2="17" y2="19" />
      </svg>
      {/* Horizontal Scanning Ray across RAM chips */}
      <div className="absolute inset-y-0 w-2 bg-gradient-to-r from-transparent via-[#FACC15] to-transparent opacity-80 animate-ram-scan pointer-events-none" />
    </div>
  );
}

function GpuAnimatedIcon({ className }) {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="8" cy="12" r="3" className="animate-pulse" />
        <circle cx="16" cy="12" r="3" className="animate-pulse" />
        <line x1="6" y1="18" x2="10" y2="18" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

function SsdAnimatedIcon({ className }) {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <line x1="12" y1="22" x2="12" y2="8.5" />
        <line x1="22" y1="8.5" x2="12" y2="8.5" />
        <line x1="2" y1="8.5" x2="12" y2="8.5" />
      </svg>
      {/* Small Data Activity Blinker */}
      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-data-blink shadow-[0_0_6px_#FACC15]" />
    </div>
  );
}

/**
 * PAGE 3 — COMPONENTS LIBRARY (with Hardware Idle Animations & Interactive Hover)
 */
export default function ComponentLibrary({ onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const componentsList = [
    {
      id: 'cpu',
      name: 'CPU',
      desc: 'The brain of the laptop that processes data.',
      icon: Cpu,
      iconClass: 'animate-breathe',
    },
    {
      id: 'gpu',
      name: 'GPU',
      desc: 'Handles graphics and visual performance.',
      icon: GpuAnimatedIcon,
      iconClass: '',
    },
    {
      id: 'ram',
      name: 'RAM',
      desc: 'Temporary memory for active tasks.',
      icon: RamAnimatedIcon,
      iconClass: '',
    },
    {
      id: 'ssd',
      name: 'SSD',
      desc: 'Stores data permanently and keeps it fast.',
      icon: SsdAnimatedIcon,
      iconClass: '',
    },
    {
      id: 'battery',
      name: 'Battery',
      desc: 'Provides power so you can work anywhere.',
      icon: Battery,
      iconClass: 'animate-pulse',
    },
    {
      id: 'cooling-fan',
      name: 'Cooling Fan',
      desc: 'Keeps the laptop cool and prevents overheating.',
      icon: Fan,
      iconClass: 'animate-fan-spin',
    },
    {
      id: 'motherboard',
      name: 'Motherboard',
      desc: 'Connects all components and allows them to work together.',
      icon: CircuitBoard,
      iconClass: '',
    },
    {
      id: 'wifi-card',
      name: 'Wi-Fi Card',
      desc: 'Provides wireless internet connectivity.',
      icon: Wifi,
      iconClass: 'animate-pulse',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-10 bg-transparent">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight mb-3">
            Explore the Components
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Learn about each component and its function.
          </p>
        </div>

        {/* 8 Cards in 4 Columns x 2 Rows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {componentsList.map((comp, idx) => {
            const Icon = comp.icon;
            const isHovered = hoveredCard === comp.id;

            return (
              <div
                key={comp.id}
                onMouseEnter={() => setHoveredCard(comp.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.25s, box-shadow 0.25s',
                }}
                className={`
                  group rounded-2xl bg-[#0C2017]/80 p-6 flex flex-col justify-between relative overflow-hidden select-none cursor-pointer
                  border transition-all duration-300
                  ${isHovered 
                    ? 'border-[#4ADE80] shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(74,222,128,0.25)]' 
                    : 'border-[#22C55E]/20'
                  }
                `}
              >
                {/* Yellow Accent indicator strip on hover */}
                <div 
                  className={`
                    absolute top-0 left-0 right-0 h-[2px] bg-[#FACC15] transition-opacity duration-300
                    ${isHovered ? 'opacity-100 shadow-[0_0_8px_#FACC15]' : 'opacity-0'}
                  `} 
                />

                <div>
                  {/* Neon Green Icon Box with slight tilt on hover */}
                  <div 
                    className={`
                      w-14 h-14 rounded-xl bg-[#071710] border flex items-center justify-center text-[#4ADE80] mb-5 transition-all duration-300
                      ${isHovered 
                        ? 'border-[#4ADE80] shadow-[0_0_15px_rgba(74,222,128,0.35)] scale-110 -rotate-3' 
                        : 'border-[#22C55E]/30 scale-100 rotate-0'
                      }
                    `}
                  >
                    <Icon className={`w-7 h-7 ${comp.iconClass}`} />
                  </div>

                  {/* Component Title */}
                  <h3 
                    className={`
                      text-xl font-bold font-display mb-2 transition-colors duration-200
                      ${isHovered ? 'text-[#4ADE80]' : 'text-white'}
                    `}
                  >
                    {comp.name}
                  </h3>

                  {/* Component Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {comp.desc}
                  </p>
                </div>

                {/* Arrow at Bottom Right with glide animation */}
                <div className="flex justify-end pt-2 border-t border-slate-800/80">
                  <ArrowRight 
                    className={`
                      w-4 h-4 text-[#4ADE80] transition-transform duration-200
                      ${isHovered ? 'translate-x-1.5 text-[#FACC15]' : 'translate-x-0'}
                    `} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
