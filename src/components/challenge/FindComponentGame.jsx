import React, { useState } from 'react';
import { Crosshair, CheckCircle2, ArrowRight, Sparkles, Wifi, Cpu, MemoryStick as Memory, HardDrive } from 'lucide-react';

/**
 * FindComponentGame
 * Mini-game 04: Spatial Discovery & Component Locator on the Motherboard PCB.
 * Features an interactive motherboard digital twin, live coordinates, and educational Quick Take drawers.
 */
export default function FindComponentGame({ onScoreChange, onComplete }) {
  const missions = [
    {
      targetId: 'ram',
      title: 'Tap the RAM Module on the board',
      hint: 'Look for the 262-pin elongated memory stick near the central processor socket.',
      quickTakeTitle: 'What is RAM? (Quick Take)',
      quickTakeText: 'Random Access Memory (RAM) acts as your laptop’s ultra-fast desk space. When you open browser tabs or games, active code lives here so the CPU never has to fetch it from the slower storage drive.',
      specs: '16GB DDR5 • 5600 MT/s • Dual-Rank',
    },
    {
      targetId: 'ssd',
      title: 'Locate the M.2 NVMe SSD on the board',
      hint: 'Search for the slim rectangular storage stick secured by a single standoff screw.',
      quickTakeTitle: 'What is an NVMe SSD? (Quick Take)',
      quickTakeText: 'Non-Volatile Memory Express (NVMe) solid-state storage connects directly over high-speed PCIe lanes, achieving transfer rates exceeding 7,000 MB/s without moving mechanical parts.',
      specs: '1TB NVMe • PCIe Gen4 x4 • 7000 MB/s',
    },
    {
      targetId: 'cpu',
      title: 'Find the Central CPU Socket & Heat Spreader',
      hint: 'Identify the large central silicon socket with the metallic integrated heat spreader lid.',
      quickTakeTitle: 'What is the CPU Socket? (Quick Take)',
      quickTakeText: 'The CPU socket connects thousands of microscopic gold pins between the motherboard traces and the processor silicon die, routing power and memory bus lanes with nanosecond synchronization.',
      specs: 'Socket BGA-1744 • 14 Cores • 125W TDP',
    },
  ];

  const [missionIndex, setMissionIndex] = useState(0);
  const [discovered, setDiscovered] = useState(false);
  const [cursorCoord, setCursorCoord] = useState({ x: 340, y: 160 });
  const [shakeWrong, setShakeWrong] = useState(false);

  const curMission = missions[missionIndex];

  const handleMouseMoveBoard = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorCoord({ x, y });
  };

  const handleComponentClick = (id) => {
    if (discovered) return;

    if (id === curMission.targetId) {
      setDiscovered(true);
      onScoreChange?.(100);
    } else {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }
  };

  const handleContinue = () => {
    if (missionIndex + 1 < missions.length) {
      setMissionIndex(prev => prev + 1);
      setDiscovered(false);
    } else {
      // All discovered!
      onComplete?.({
        score: 450,
        accuracy: "100%",
        timeSpent: "00:46",
      });
    }
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto px-4 py-2 flex flex-col justify-between select-none">
      
      {/* Top Mission Headline */}
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#082216]/90 border border-[#22C55E]/40 text-[#4ADE80] text-[10px] font-mono tracking-widest uppercase mb-1">
          <Crosshair className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>DISCOVERY {missionIndex + 1} OF {missions.length}</span>
        </div>

        <h2 className="text-base sm:text-xl font-bold font-display text-white">
          MISSION: <span className="text-[#4ADE80] underline decoration-[#22C55E]/50 underline-offset-4">{curMission.title}</span>
        </h2>
        <p className="text-xs text-slate-300 font-sans mt-0.5">
          {curMission.hint}
        </p>
      </div>

      {/* Central Interactive Motherboard Digital Twin Workbench */}
      <div 
        onMouseMove={handleMouseMoveBoard}
        className={`
          relative w-full max-w-4xl mx-auto h-[240px] sm:h-[280px] lg:h-[300px] rounded-2xl bg-[#061710] border border-[#22C55E]/30 overflow-hidden my-auto flex items-center justify-center shadow-[0_12px_35px_rgba(0,0,0,0.85)]
          ${shakeWrong ? 'animate-shake border-red-500' : ''}
        `}
      >
        {/* PCB Background Circuit Grid */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-50 pointer-events-none" />

        {/* Live Coordinate Overlay HUD */}
        <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-400 select-none pointer-events-none space-y-0.5">
          <div>SCALE: 1:1.2 DIGITAL TWIN</div>
          <div className="text-[#4ADE80]">RETICLE X: {cursorCoord.x}px | Y: {cursorCoord.y}px</div>
          <div>BOARD_REV: TITAN_X16</div>
        </div>

        {/* Motherboard Physical Layout */}
        <div className="relative w-full max-w-2xl h-52 sm:h-56 rounded-xl bg-[#092218] border border-[#22C55E]/40 p-4 shadow-inner flex items-center justify-between">
          
          {/* 1. COMPONENT A: CPU Socket & Heat Spreader */}
          <div
            onClick={() => handleComponentClick('cpu')}
            className={`
              relative w-32 sm:w-36 h-32 sm:h-36 rounded-xl border-2 p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200
              ${curMission.targetId === 'cpu' && discovered
                ? 'bg-[#0E3B27] border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105'
                : 'bg-[#0B2A1E]/80 border-[#22C55E]/30 hover:border-[#4ADE80] hover:scale-102'
              }
            `}
          >
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
              <span className="text-[#FACC15] font-bold">A • CPU DIE</span>
              <span>125W</span>
            </div>

            <div className="w-full h-16 rounded bg-[#103325] border border-[#22C55E]/40 flex flex-col items-center justify-center my-auto">
              <Cpu className="w-6 h-6 text-[#4ADE80]" />
              <span className="text-[9px] font-mono text-white font-bold mt-1">CORE i7</span>
            </div>

            <div className="text-[8px] font-mono text-slate-400 text-center">
              LGA-1744 SOCKET
            </div>
          </div>

          {/* 2. COMPONENT B: RAM SO-DIMM Stick (The Target) */}
          <div
            onClick={() => handleComponentClick('ram')}
            className={`
              relative w-28 sm:w-32 h-40 sm:h-44 rounded-xl border-2 p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200
              ${curMission.targetId === 'ram' && discovered
                ? 'bg-[#0E3B27] border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105'
                : 'bg-[#0B2A1E]/80 border-[#22C55E]/30 hover:border-[#4ADE80] hover:scale-102'
              }
            `}
          >
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
              <span className="text-[#4ADE80] font-bold">B • RAM STICK</span>
              <span>262-PIN</span>
            </div>

            <div className="w-full h-24 rounded bg-[#103325] border border-[#22C55E]/40 flex flex-col items-center justify-around py-1 my-auto">
              <div className="flex gap-1">
                <div className="w-5 h-5 bg-[#04150F] rounded text-[7px] font-mono text-[#4ADE80] flex items-center justify-center">DDR</div>
                <div className="w-5 h-5 bg-[#04150F] rounded text-[7px] font-mono text-[#4ADE80] flex items-center justify-center">DDR</div>
              </div>
              <div className="w-3 h-1 bg-[#FACC15] rounded-xs" />
              <Memory className="w-5 h-5 text-[#4ADE80]" />
            </div>

            <div className="text-[8px] font-mono text-slate-400 text-center">
              DDR5 5600 MT/s
            </div>
          </div>

          {/* 3. COMPONENT C & D: NVMe SSD + Wi-Fi Card Stack */}
          <div className="flex flex-col gap-2.5 h-full justify-between">
            
            {/* COMPONENT C: M.2 NVMe SSD */}
            <div
              onClick={() => handleComponentClick('ssd')}
              className={`
                relative w-40 sm:w-48 h-18 sm:h-20 rounded-xl border-2 p-2 flex items-center justify-between cursor-pointer transition-all duration-200
                ${curMission.targetId === 'ssd' && discovered
                  ? 'bg-[#0E3B27] border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105'
                  : 'bg-[#0B2A1E]/80 border-[#22C55E]/30 hover:border-[#4ADE80] hover:scale-102'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#4ADE80]" />
                <div>
                  <div className="text-[9px] font-mono font-bold text-white">C • M.2 NVMe SSD</div>
                  <div className="text-[8px] font-mono text-slate-400">PCIe Gen4 x4</div>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full border border-[#22C55E] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#22C55E] rounded-full" />
              </div>
            </div>

            {/* COMPONENT D: Wi-Fi 6E Wireless Module */}
            <div
              onClick={() => handleComponentClick('wifi')}
              className="relative w-40 sm:w-48 h-14 rounded-xl border border-[#22C55E]/30 bg-[#0B2A1E]/80 p-2 flex items-center justify-between cursor-pointer hover:border-[#4ADE80] transition-all"
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#FACC15]" />
                <div>
                  <div className="text-[9px] font-mono font-bold text-white">D • Wi-Fi 6E + BT</div>
                  <div className="text-[8px] font-mono text-slate-400">AX211 M.2 E-Key</div>
                </div>
              </div>
              <div className="text-[8px] font-mono text-[#4ADE80]">ANT-1</div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Educational "Quick Take" Drawer (Appears upon discovering target) */}
      <div className="min-h-[72px] sm:min-h-[78px] shrink-0 pt-1">
        {discovered ? (
          <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#09281B]/95 border border-[#22C55E]/50 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#22C55E]/20 border border-[#22C55E] flex items-center justify-center text-[#4ADE80] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#4ADE80] uppercase tracking-wider">
                    TARGET ACQUIRED! +100 XP
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">• {curMission.specs}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-display font-bold text-white">{curMission.quickTakeTitle}</h4>
                <p className="text-[11px] text-slate-300 font-sans leading-tight mt-0.5">
                  {curMission.quickTakeText}
                </p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="px-4 py-2 rounded-lg bg-[#22C55E] hover:bg-[#4ADE80] text-[#04150F] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-95"
            >
              <span>{missionIndex + 1 < missions.length ? 'NEXT TARGET' : 'COMPLETE'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="w-full text-center text-[11px] font-mono text-slate-400">
            Click on the motherboard PCB where you believe the target hardware component is located.
          </div>
        )}
      </div>

    </div>
  );
}
