import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * Full Pool of Available Hardware Components for Match It
 */
const ALL_COMPONENTS_POOL = [
  { 
    id: 'cpu', 
    label: 'CPU', 
    subtitle: 'Central Processing Unit', 
    threeType: 'cpu', 
    realImage: '/images/components/pin-8.jpg',
    matchId: 'func-cpu',
    funcLabel: 'Executes Core Machine Logic',
    funcDesc: 'Processes program instructions, runs algorithms, and governs system interrupts.'
  },
  { 
    id: 'gpu', 
    label: 'GPU', 
    subtitle: 'Dedicated Graphics Unit', 
    threeType: 'gpu', 
    realImage: '/images/components/pin-1.jpg',
    matchId: 'func-gpu',
    funcLabel: 'Renders 3D Geometry & Displays',
    funcDesc: 'Accelerates real-time shaders, display buffers, and parallel frame rasterization.'
  },
  { 
    id: 'ram', 
    label: 'RAM', 
    subtitle: 'Random Access Memory', 
    threeType: 'ram', 
    realImage: '/images/components/pin-4.jpg',
    matchId: 'func-ram',
    funcLabel: 'High-Speed Volatile Workstation',
    funcDesc: 'Temporarily holds open app variables with nanosecond access latency.'
  },
  { 
    id: 'ssd', 
    label: 'SSD NVMe', 
    subtitle: 'Solid State Storage Drive', 
    threeType: 'ssd', 
    realImage: '/images/components/pin-3.jpg',
    matchId: 'func-ssd',
    funcLabel: 'Persistent High-Speed Storage',
    funcDesc: 'Retains OS files, games, and large databases non-volatilely when powered down.'
  },
  { 
    id: 'fan', 
    label: 'Cooling Fan', 
    subtitle: 'Thermal Exhaust Blower', 
    threeType: 'fan', 
    realImage: '/images/components/pin-2.jpg',
    matchId: 'func-fan',
    funcLabel: 'Thermal Convection & Heat Exhaust',
    funcDesc: 'Expels hot air through radiator fins to prevent thermal throttling.'
  },
  { 
    id: 'battery', 
    label: 'Battery', 
    subtitle: 'DC Power Reservoir', 
    threeType: 'battery', 
    realImage: '/images/components/pin-9.jpg',
    matchId: 'func-battery',
    funcLabel: 'Untethered Energy Supply',
    funcDesc: 'Stores chemical potential energy to deliver stable voltage away from AC outlets.'
  },
  { 
    id: 'wifi', 
    label: 'Wi-Fi Card', 
    subtitle: 'Wireless Network Module', 
    threeType: 'wifi', 
    realImage: '/images/components/pin-6.jpg',
    matchId: 'func-wifi',
    funcLabel: 'Radio Frequency Data Transport',
    funcDesc: 'Transmits packet data over 2.4/5/6 GHz bands and links Bluetooth devices.'
  },
  { 
    id: 'motherboard', 
    label: 'Motherboard', 
    subtitle: 'Main Logic Circuit Board', 
    threeType: 'motherboard', 
    realImage: '/images/components/pin-10.jpg',
    matchId: 'func-motherboard',
    funcLabel: 'Central Interconnect Backbone',
    funcDesc: 'Routes power and high-speed electrical traces between all components.'
  },
];

/**
 * MatchItGame
 * Mini-game 02: Interactive hardware <-> function matching game with REAL 3D ASSETS.
 * Features random component selection from an 8-item hardware pool, dynamic SVG laser cables, and audio-tactile feedback.
 */
export default function MatchItGame({ onScoreChange, onComplete }) {
  // State for active game round: randomized 4 components & shuffled functions
  const [roundSeed, setRoundSeed] = useState(0);
  const [components, setComponents] = useState([]);
  const [functions, setFunctions] = useState([]);

  // Matched pairs mapping: { [compId]: funcId }
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [shakeId, setShakeId] = useState(null);

  // Initialize and randomize components on load or roundSeed change
  useEffect(() => {
    // 1. Shuffle full pool and pick 4 items
    const shuffledPool = [...ALL_COMPONENTS_POOL].sort(() => Math.random() - 0.5);
    const chosen4 = shuffledPool.slice(0, 4);

    // 2. Prepare function items and shuffle their order
    const funcList = chosen4.map(item => ({
      id: item.matchId,
      label: item.funcLabel,
      desc: item.funcDesc,
    })).sort(() => Math.random() - 0.5);

    setComponents(chosen4);
    setFunctions(funcList);
    setMatchedPairs({});
    setSelectedComp(null);
    setSelectedFunc(null);
    setShakeId(null);
  }, [roundSeed]);

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
            timeSpent: "00:38",
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

  const handleReshuffle = () => {
    setRoundSeed(s => s + 1);
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto px-4 py-1 sm:py-2 flex flex-col justify-between select-none">
      
      {/* Top Banner */}
      <div className="text-center shrink-0 mb-1">
        <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
          Hubungkan komponen perangkat keras 3D dengan fungsi kerjanya
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">
          Pilih komponen 3D di sisi kiri, kemudian pilih fungsi komputasi yang sesuai di sisi kanan.
        </p>
      </div>

      {/* Main Two-Column Matching Arena */}
      <div className="relative w-full my-auto py-1 sm:py-2">
        
        {/* Dynamic SVG Laser Connector Curves for Matched Pairs */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" 
          viewBox="0 0 1000 340" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="matchLaser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.4" />
            </filter>
          </defs>

          {Object.entries(matchedPairs).map(([cId, fId]) => {
            const compIndex = components.findIndex(c => c.id === cId);
            const funcIndex = functions.findIndex(f => f.id === fId);
            if (compIndex === -1 || funcIndex === -1) return null;

            const startY = 42 + compIndex * 82;
            const endY = 42 + funcIndex * 82;
            const startX = 420;
            const endX = 580;

            return (
              <g key={cId} className="animate-in fade-in duration-300">
                <path
                  d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#matchLaser)"
                  strokeWidth="3.5"
                  filter="url(#laserGlow)"
                />
                <path
                  d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              </g>
            );
          })}
        </svg>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-x-12 items-center">
          
          {/* LEFT COLUMN: 3D Hardware Components (4 Randomized Cards) */}
          <div className="md:col-span-5 space-y-2">
            {components.map((comp) => {
              const isMatched = !!matchedPairs[comp.id];
              const isSelected = selectedComp === comp.id;
              const isShaking = shakeId && shakeId.startsWith(comp.id);

              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelectComp(comp.id)}
                  className={`
                    relative rounded-2xl p-2 sm:p-2.5 border flex items-center justify-between cursor-pointer transition-all duration-200
                    ${isMatched 
                      ? 'bg-emerald-50 border-emerald-400 shadow-xs' 
                      : isSelected 
                        ? 'bg-amber-50 border-amber-400 shadow-xs scale-[1.01]' 
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 shadow-2xs'
                    }
                    ${isShaking ? 'animate-shake' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Real 3D Component Viewer / Real Photo on Match */}
                    <div className={`
                      w-12 h-12 rounded-xl border overflow-hidden shrink-0 flex items-center justify-center relative
                      ${isMatched ? 'bg-white border-emerald-300' : isSelected ? 'bg-white border-amber-300' : 'bg-slate-50 border-slate-200'}
                    `}>
                      {isMatched && comp.realImage ? (
                        <img 
                          src={comp.realImage} 
                          alt={comp.label}
                          className="w-full h-full object-cover object-center animate-in zoom-in-75 duration-300"
                        />
                      ) : (
                        <Component3DViewer 
                          type={comp.threeType} 
                          heightClass="h-12" 
                          className="border-0 bg-transparent shadow-none" 
                          autoRotateSpeed={2.2} 
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xs sm:text-sm text-slate-900">{comp.label}</span>
                        {isMatched && (
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                            MATCHED ✓
                          </span>
                        )}
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[9px] font-mono font-bold animate-pulse">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-sans block">{comp.subtitle}</span>
                    </div>
                  </div>

                  {/* Right Cable Port Dot */}
                  <div className={`
                    hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white transition-all
                    ${isMatched ? 'border-emerald-500 shadow-sm' : isSelected ? 'border-amber-500 shadow-sm' : 'border-slate-300'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isMatched ? 'bg-emerald-500' : isSelected ? 'bg-amber-500' : 'bg-transparent'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER GAP (Connector area on desktop, md:col-span-2) */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center font-bold">
              3D BUS<br />INTERCONNECT
            </span>
          </div>

          {/* RIGHT COLUMN: Shuffled Functions (4 Cards) */}
          <div className="md:col-span-5 space-y-2">
            {functions.map((func) => {
              const isMatched = Object.values(matchedPairs).includes(func.id);
              const isSelected = selectedFunc === func.id;
              const isShaking = shakeId && shakeId.endsWith(func.id);

              return (
                <div
                  key={func.id}
                  onClick={() => handleSelectFunc(func.id)}
                  className={`
                    relative rounded-2xl p-2 sm:p-2.5 border flex items-center justify-between cursor-pointer transition-all duration-200
                    ${isMatched 
                      ? 'bg-emerald-50 border-emerald-400 shadow-xs' 
                      : isSelected 
                        ? 'bg-amber-50 border-amber-400 shadow-xs scale-[1.01]' 
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 shadow-2xs'
                    }
                    ${isShaking ? 'animate-shake' : ''}
                  `}
                >
                  {/* Left Cable Port Dot */}
                  <div className={`
                    hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white transition-all
                    ${isMatched ? 'border-emerald-500 shadow-sm' : isSelected ? 'border-amber-500 shadow-sm' : 'border-slate-300'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isMatched ? 'bg-emerald-500' : isSelected ? 'bg-amber-500' : 'bg-transparent'}`} />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900">{func.label}</h3>
                    <p className="text-[11px] text-slate-500 font-sans leading-tight mt-0.5">{func.desc}</p>
                  </div>

                  {isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Footer Controls Strip */}
      <div className="flex items-center justify-between shrink-0 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-700 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{Object.keys(matchedPairs).length} DARI 4 TERHUBUNG</span>
        </div>

        <button
          onClick={handleReshuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 text-slate-600 hover:text-emerald-700 transition-all text-xs font-mono active:scale-95 shadow-2xs"
          title="Pick 4 New Random Components"
        >
          <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
          <span>ACAK KOMPONEN</span>
        </button>
      </div>

    </div>
  );
}
