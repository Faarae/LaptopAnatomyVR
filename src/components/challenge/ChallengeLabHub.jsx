import React, { useState, useEffect } from 'react';
import { Trophy, Activity, Cpu, Sparkles } from 'lucide-react';
import CenterHardwareVisual from './CenterHardwareVisual';
import ChallengeCard from './ChallengeCard';

/**
 * ChallengeLabHub
 * Interactive Mission Command Hub & Landing Page for Laptop Anatomy VR challenges.
 * - Unified with website design system (Space Grotesk, Inter, green #22C55E & gold #FACC15)
 * - Central interactive hardware schematic (CenterHardwareVisual)
 * - 5 Tactical Game Cards with 3D tilt & animations
 * - Dynamic SVG laser connectors from hovered card to center visual
 * - Seamless transition into individual sub-pages
 */
export default function ChallengeLabHub({ onSelectGame }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transitioningGame, setTransitioningGame] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleCardSelect = (gameId) => {
    setTransitioningGame(gameId);
    setTimeout(() => {
      onSelectGame(gameId);
    }, 350);
  };

  const games = [
    {
      id: 'quiz',
      number: '[01]',
      title: 'QUICK QUIZ',
      subtitle: 'Q&A SYSTEM • 20 QUESTIONS',
      description: 'Test your understanding of primary laptop processors, buses, and thermal control.',
      iconType: 'quiz',
    },
    {
      id: 'match',
      number: '[02]',
      title: 'MATCH IT',
      subtitle: 'BUS INTERCONNECT',
      description: 'Connect hardware components to their real-world computing functions.',
      iconType: 'match',
    },
    {
      id: 'drag',
      number: '[03]',
      title: 'DRAG & PLACE',
      subtitle: 'ASSEMBLY BENCH',
      description: 'Mount CPUs, RAM sticks, and NVMe drives into matching motherboard sockets.',
      iconType: 'drag',
    },
    {
      id: 'find',
      number: '[04]',
      title: 'FIND COMPONENT',
      subtitle: 'SPATIAL LOCATOR',
      description: 'Scan the mainboard PCB to identify requested hardware modules and chips.',
      iconType: 'find',
    },
    {
      id: 'speed',
      number: '[05]',
      title: 'SPEED CHALLENGE',
      subtitle: 'OVERCLOCK SPRINT',
      description: 'Rapidly identify flashing laptop components under pressure before time runs out.',
      iconType: 'speed',
    },
  ];

  return (
    <div className={`
      w-full max-w-7xl mx-auto flex flex-col justify-between
      bg-transparent text-white relative select-none
      transition-opacity duration-300
      ${transitioningGame ? 'scale-[1.01] filter brightness-125 opacity-75' : 'scale-100 opacity-100'}
    `}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. HUB HEADER (Consistent with other website pages)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 text-center px-4 pt-2 sm:pt-4 mb-4 shrink-0">
        <div 
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s'
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C2017] border border-[#22C55E]/30 text-[#4ADE80] text-xs font-mono mb-2 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
        >
          <Trophy className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>INTERACTIVE HARDWARE LABORATORY</span>
        </div>

        <h1 
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
          }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-2"
        >
          Challenge Lab
        </h1>

        <p 
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s'
          }}
          className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto"
        >
          Test your knowledge. Explore the hardware. Master your laptop architecture.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TACTICAL GRID & INTERACTIVE CENTER VIEWPORT
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-center min-h-0">
        
        {/* Dynamic Connector SVG Overlay */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="connLaser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="1" />
              <stop offset="100%" stopColor="#FACC15" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Left Top Card (01 Quiz) to Center */}
          {hoveredCard === 'quiz' && (
            <g className="animate-in fade-in duration-200">
              <path d="M 380 150 C 480 150, 520 250, 600 250" fill="none" stroke="url(#connLaser)" strokeWidth="2.5" strokeDasharray="6 6" className="neon-dash-flow" />
              <circle cx="600" cy="250" r="4" fill="#4ADE80" className="animate-ping" />
            </g>
          )}

          {/* Left Bottom Card (03 Drag) to Center */}
          {hoveredCard === 'drag' && (
            <g className="animate-in fade-in duration-200">
              <path d="M 380 430 C 480 430, 520 320, 600 320" fill="none" stroke="url(#connLaser)" strokeWidth="2.5" strokeDasharray="6 6" className="neon-dash-flow" />
              <circle cx="600" cy="320" r="4" fill="#4ADE80" className="animate-ping" />
            </g>
          )}

          {/* Right Top Card (02 Match) to Center */}
          {hoveredCard === 'match' && (
            <g className="animate-in fade-in duration-200">
              <path d="M 820 150 C 720 150, 680 250, 600 250" fill="none" stroke="url(#connLaser)" strokeWidth="2.5" strokeDasharray="6 6" className="neon-dash-flow" />
              <circle cx="600" cy="250" r="4" fill="#4ADE80" className="animate-ping" />
            </g>
          )}

          {/* Right Bottom Card (04 Find) to Center */}
          {hoveredCard === 'find' && (
            <g className="animate-in fade-in duration-200">
              <path d="M 820 430 C 720 430, 680 320, 600 320" fill="none" stroke="url(#connLaser)" strokeWidth="2.5" strokeDasharray="6 6" className="neon-dash-flow" />
              <circle cx="600" cy="320" r="4" fill="#4ADE80" className="animate-ping" />
            </g>
          )}

          {/* Center Bottom Card (05 Speed) to Center */}
          {hoveredCard === 'speed' && (
            <g className="animate-in fade-in duration-200">
              <path d="M 600 480 L 600 360" fill="none" stroke="url(#connLaser)" strokeWidth="2.5" strokeDasharray="6 6" className="neon-dash-flow" />
              <circle cx="600" cy="360" r="4" fill="#FACC15" className="animate-ping" />
            </g>
          )}
        </svg>

        {/* 3-Column Tactical HUD Assembly */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3.5 lg:gap-5 items-center">
          
          {/* LEFT COLUMN: Games 01 and 03 */}
          <div className="md:col-span-4 flex flex-col gap-3.5 lg:gap-4">
            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s'
              }}
            >
              <ChallengeCard
                {...games[0]}
                isHovered={hoveredCard === 'quiz'}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onSelect={handleCardSelect}
              />
            </div>

            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease-out 0.5s, transform 0.4s ease-out 0.5s'
              }}
            >
              <ChallengeCard
                {...games[2]}
                isHovered={hoveredCard === 'drag'}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onSelect={handleCardSelect}
              />
            </div>
          </div>

          {/* CENTER COLUMN: Central Hardware Visual + Game 05 */}
          <div className="md:col-span-4 flex flex-col items-center justify-between gap-3">
            {/* Center Hardware Digital Twin */}
            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
              }}
              className="w-full"
            >
              <CenterHardwareVisual hoveredCard={hoveredCard} />
            </div>

            {/* Game 05: Speed Challenge (Centered at bottom) */}
            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease-out 0.65s, transform 0.4s ease-out 0.65s'
              }}
              className="w-full"
            >
              <ChallengeCard
                {...games[4]}
                isHovered={hoveredCard === 'speed'}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onSelect={handleCardSelect}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Games 02 and 04 */}
          <div className="md:col-span-4 flex flex-col gap-3.5 lg:gap-4">
            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s'
              }}
            >
              <ChallengeCard
                {...games[1]}
                isHovered={hoveredCard === 'match'}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onSelect={handleCardSelect}
              />
            </div>

            <div 
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease-out 0.6s, transform 0.4s ease-out 0.6s'
              }}
            >
              <ChallengeCard
                {...games[3]}
                isHovered={hoveredCard === 'find'}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onSelect={handleCardSelect}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SUBTLE IN-PAGE FOOTER HINT
         ───────────────────────────────────────────────────────────── */}
      <div className="text-center py-3 text-[11px] font-mono text-slate-400">
        <span>Click any mission card to launch its dedicated simulation</span>
      </div>

    </div>
  );
}
