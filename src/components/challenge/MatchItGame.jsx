import React, { useState } from 'react';
import { Cpu, Zap, HardDrive, MemoryStick as Memory, Check, CheckCircle2, RotateCcw } from 'lucide-react';

/**
 * MatchItGame
 * Mini-game 02: Interactive hardware <-> function matching game.
 * Uses dynamic SVG Bezier connector curves with laser flow animation and port nodes.
 */
export default function MatchItGame({ onScoreChange, onComplete }) {
  const components = [
    { id: 'cpu', label: 'CPU', subtitle: 'Central Processing Unit', icon: Cpu, matchId: 'func-cpu' },
    { id: 'gpu', label: 'GPU', subtitle: 'Dedicated Graphics Unit', icon: Zap, matchId: 'func-gpu' },
    { id: 'ram', label: 'RAM', subtitle: 'Random Access Memory', icon: Memory, matchId: 'func-ram' },
    { id: 'ssd', label: 'SSD NVMe', subtitle: 'Solid State Storage Drive', icon: HardDrive, matchId: 'func-ssd' },
  ];

  const functions = [
    { id: 'func-gpu', label: 'Renders 3D Geometry & Displays', desc: 'Accelerates real-time shaders, display buffers, and parallel frame rasterization.' },
    { id: 'func-cpu', label: 'Executes Core Machine Logic', desc: 'Processes program instructions, runs algorithms, and governs system interrupts.' },
    { id: 'func-ssd', label: 'Persistent High-Speed Storage', desc: 'Retains OS files, games, and large databases non-volatilely when powered down.' },
    { id: 'func-ram', label: 'High-Speed Volatile Workstation', desc: 'Temporarily holds open app variables with nanosecond access latency.' },
  ];

  // Matched pairs mapping: { [compId]: funcId }
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [shakeId, setShakeId] = useState(null);

  const handleSelectComp = (compId) => {
    if (matchedPairs[compId]) return; // Already matched
    setSelectedComp(compId);
    setShakeId(null);

    // If a function was already selected, evaluate match
    if (selectedFunc) {
      evaluateMatch(compId, selectedFunc);
    }
  };

  const handleSelectFunc = (funcId) => {
    // Check if already matched
    if (Object.values(matchedPairs).includes(funcId)) return;
    setSelectedFunc(funcId);
    setShakeId(null);

    // If a component was already selected, evaluate match
    if (selectedComp) {
      evaluateMatch(selectedComp, funcId);
    }
  };

  const evaluateMatch = (compId, funcId) => {
    const compObj = components.find(c => c.id === compId);
    if (compObj && compObj.matchId === funcId) {
      // Correct Match!
      const newPairs = { ...matchedPairs, [compId]: funcId };
      setMatchedPairs(newPairs);
      setSelectedComp(null);
      setSelectedFunc(null);
      onScoreChange?.(100);

      // Check if all 4 matched
      if (Object.keys(newPairs).length === components.length) {
        setTimeout(() => {
          onComplete?.({
            score: 400,
            accuracy: "100%",
            timeSpent: "00:42",
          });
        }, 800);
      }
    } else {
      // Incorrect Match
      setShakeId(`${compId}-${funcId}`);
      setTimeout(() => {
        setSelectedComp(null);
        setSelectedFunc(null);
        setShakeId(null);
      }, 500);
    }
  };

  const handleReset = () => {
    setMatchedPairs({});
    setSelectedComp(null);
    setSelectedFunc(null);
    setShakeId(null);
  };

  // Pre-calculated Y coordinate offsets for connecting bezier cables (in percentage of container)
  const compIndexMap = { cpu: 0, gpu: 1, ram: 2, ssd: 3 };
  const funcIndexMap = { 'func-gpu': 0, 'func-cpu': 1, 'func-ssd': 2, 'func-ram': 3 };

  return (
    <div className="w-full h-full max-w-5xl mx-auto px-4 py-2 sm:py-3 flex flex-col justify-between select-none">
      
      {/* Top Banner */}
      <div className="text-center shrink-0">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white">
          Connect each hardware component to its computing role
        </h2>
        <p className="text-xs text-slate-300 font-sans mt-0.5">
          Select a component on the left, then select its matching daily computing function on the right.
        </p>
      </div>

      {/* Main Two-Column Matching Arena */}
      <div className="relative w-full my-auto py-2">
        
        {/* Dynamic SVG Laser Connector Curves for Matched Pairs */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" 
          viewBox="0 0 1000 320" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="matchLaser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="1" />
              <stop offset="100%" stopColor="#FACC15" stopOpacity="0.9" />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#4ADE80" floodOpacity="0.6" />
            </filter>
          </defs>

          {Object.entries(matchedPairs).map(([cId, fId]) => {
            const startY = 40 + compIndexMap[cId] * 76;
            const endY = 40 + funcIndexMap[fId] * 76;
            const startX = 425;
            const endX = 575;

            return (
              <g key={cId} className="animate-in fade-in duration-300">
                <path
                  d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#matchLaser)"
                  strokeWidth="3"
                  filter="url(#laserGlow)"
                />
                <path
                  d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  className="neon-dash-flow"
                />
              </g>
            );
          })}
        </svg>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-x-12 items-center">
          
          {/* LEFT COLUMN: Hardware Components (4 Cards) */}
          <div className="md:col-span-5 space-y-2.5">
            {components.map((comp) => {
              const Icon = comp.icon;
              const isMatched = !!matchedPairs[comp.id];
              const isSelected = selectedComp === comp.id;
              const isShaking = shakeId && shakeId.startsWith(comp.id);

              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelectComp(comp.id)}
                  className={`
                    relative rounded-xl p-2.5 sm:p-3 border flex items-center justify-between cursor-pointer transition-all duration-200
                    ${isMatched 
                      ? 'bg-[#0E3524] border-[#22C55E] shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : isSelected 
                        ? 'bg-[#123827] border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.35)] scale-[1.01]' 
                        : 'bg-[#092217]/70 border-[#22C55E]/25 hover:border-[#4ADE80] hover:bg-[#0E3524]'
                    }
                    ${isShaking ? 'animate-shake' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-9 h-9 rounded-lg border flex items-center justify-center shrink-0
                      ${isMatched ? 'bg-[#22C55E] text-[#04150F] border-[#22C55E]' : isSelected ? 'bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]' : 'bg-[#0B2A1D] border-[#22C55E]/40 text-[#4ADE80]'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-white">{comp.label}</span>
                        {isMatched && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#22C55E]/20 text-[#4ADE80] text-[9px] font-mono font-bold">
                            MATCHED ✓
                          </span>
                        )}
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#FACC15]/20 text-[#FACC15] text-[9px] font-mono font-bold animate-pulse">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-300 font-sans block">{comp.subtitle}</span>
                    </div>
                  </div>

                  {/* Right Cable Port Dot */}
                  <div className={`
                    hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-[#04150F] transition-all
                    ${isMatched ? 'border-[#22C55E] shadow-[0_0_8px_#22C55E]' : isSelected ? 'border-[#FACC15] shadow-[0_0_8px_#FACC15]' : 'border-[#22C55E]/40'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isMatched ? 'bg-[#22C55E]' : isSelected ? 'bg-[#FACC15]' : 'bg-transparent'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER GAP (Connector area on desktop, md:col-span-2) */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">
              INTERCONNECT<br />BUS
            </span>
          </div>

          {/* RIGHT COLUMN: Functions (4 Cards) */}
          <div className="md:col-span-5 space-y-2.5">
            {functions.map((func) => {
              const isMatched = Object.values(matchedPairs).includes(func.id);
              const isSelected = selectedFunc === func.id;
              const isShaking = shakeId && shakeId.endsWith(func.id);

              return (
                <div
                  key={func.id}
                  onClick={() => handleSelectFunc(func.id)}
                  className={`
                    relative rounded-xl p-2.5 sm:p-3 border flex items-center justify-between cursor-pointer transition-all duration-200
                    ${isMatched 
                      ? 'bg-[#0E3524] border-[#22C55E] shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : isSelected 
                        ? 'bg-[#123827] border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.35)] scale-[1.01]' 
                        : 'bg-[#092217]/70 border-[#22C55E]/25 hover:border-[#4ADE80] hover:bg-[#0E3524]'
                    }
                    ${isShaking ? 'animate-shake' : ''}
                  `}
                >
                  {/* Left Cable Port Dot */}
                  <div className={`
                    hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-[#04150F] transition-all
                    ${isMatched ? 'border-[#22C55E] shadow-[0_0_8px_#22C55E]' : isSelected ? 'border-[#FACC15] shadow-[0_0_8px_#FACC15]' : 'border-[#22C55E]/40'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isMatched ? 'bg-[#22C55E]' : isSelected ? 'bg-[#FACC15]' : 'bg-transparent'}`} />
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-xs sm:text-sm text-white">{func.label}</h3>
                    <p className="text-[11px] text-slate-300 font-sans leading-tight mt-0.5">{func.desc}</p>
                  </div>

                  {isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Footer Controls Strip */}
      <div className="flex items-center justify-between shrink-0 pt-1">
        <div className="flex items-center gap-2 font-mono text-xs text-[#4ADE80]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>{Object.keys(matchedPairs).length} OF 4 MATCHED</span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#22C55E]/30 bg-[#092217] hover:border-[#FACC15] text-slate-300 hover:text-white transition-all text-xs font-mono active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET MATCH</span>
        </button>
      </div>

    </div>
  );
}
