import React, { useState } from 'react';
import { 
  Crosshair, CheckCircle2, ArrowRight, Sparkles, AlertTriangle, 
  RotateCcw, Compass, Box, Trophy, Lightbulb, MapPin 
} from 'lucide-react';
import Motherboard3DViewer from '../3d/Motherboard3DViewer';
import { MOTHERBOARD_PINS, getPinByNumber } from '../../data/motherboardPins';

/**
 * FindComponentGame
 * Mini-game 04: Spatial Discovery & 3D Component Locator on the Motherboard.
 * Features an interactive 3D Motherboard Digital Twin, 100% raycasting click detection,
 * and educational Quick Take dossiers.
 */
export default function FindComponentGame({ onScoreChange, onComplete, onStepChange }) {
  const missions = [
    {
      targetPin: 8,
      title: 'Locate the Central CPU Socket (Socket LGA) on the 3D Board',
      targetName: 'CPU Socket LGA',
      hint: 'Look for the metallic Integrated Heat Spreader (IHS) and tension lever near the top-right of the motherboard.',
      quickTakeTitle: 'What is the CPU Socket? (Quick Take)',
      quickTakeText: 'The CPU socket connects thousands of microscopic spring-loaded pins between the motherboard traces and the processor silicon die, routing power and memory bus lanes with nanosecond synchronization.',
      specs: 'Socket LGA-1700 • 14 Cores • 125W TDP',
    },
    {
      targetPin: 4,
      title: 'Locate the 4X Dual-Channel RAM Slots',
      targetName: 'Dual-Channel RAM DIMMs',
      hint: 'Search for the long yellow and black DIMM slots positioned along the right side of the board with end retention latches.',
      quickTakeTitle: 'What is RAM? (Quick Take)',
      quickTakeText: 'Random Access Memory (RAM) acts as your laptop’s ultra-fast workspace. Populating matching color slots activates dual-channel memory interleaving, doubling communication bandwidth to the memory controller.',
      specs: '4X DDR5 DIMM • 128-bit Bus • 5600 MT/s',
    },
    {
      targetPin: 1,
      title: 'Locate the 1X PCIe x16 Discrete GPU Expansion Slot',
      targetName: 'PCIe x16 Slot',
      hint: 'Look for the long dark expansion slot running vertically down the center of the board with a retention clip at the end.',
      quickTakeTitle: 'What is the PCIe x16 Slot? (Quick Take)',
      quickTakeText: 'The PCIe x16 slot provides dedicated point-to-point serial communication directly to discrete graphics cards (GPU) without sharing data lines with other devices, achieving up to 64 GB/s bandwidth.',
      specs: 'PCIe Gen 5.0 x16 • 64 GB/s Bandwidth • 75W Slot Power',
    },
    {
      targetPin: 5,
      title: 'Locate the VRM Heat Sink & Back Panel Connections',
      targetName: 'VRM Heatsink & I/O Stack',
      hint: 'Inspect the dense extruded aluminum cooling fins along the top rear edge covering the MOSFET power stages.',
      quickTakeTitle: 'What is the VRM Heat Sink? (Quick Take)',
      quickTakeText: 'Extruded aluminum fins conduct intense thermal energy away from voltage chokes and MOSFET power stages that convert 12V incoming power down to clean ~1.2V CPU core voltage.',
      specs: 'Anodized Aluminum • 180 cm² Fin Area • 105°C Rating',
    },
    {
      targetPin: 9,
      title: 'Locate the Southbridge Chipset (PCH) & CMOS Coin Battery',
      targetName: 'Southbridge & CMOS Battery',
      hint: 'Identify the lower-left chipset heatsink next to the shiny circular silver CR2032 lithium coin cell holder.',
      quickTakeTitle: 'What is the Southbridge & CMOS Battery? (Quick Take)',
      quickTakeText: 'The Southbridge (Platform Controller Hub) manages lower-speed I/O interfaces like SATA drives, USB, and audio. The 3V coin cell powers the Real-Time Clock (RTC) and BIOS memory even when unplugged.',
      specs: 'Platform Controller Hub • CR2032 3V Lithium • DMI Bus',
    },
  ];

  const [missionIndex, setMissionIndex] = useState(0);
  const [discovered, setDiscovered] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const curMission = missions[missionIndex];

  const handlePinSelect = (pin) => {
    if (discovered) return;

    if (pin.pinNumber === curMission.targetPin) {
      setDiscovered(true);
      setWrongFeedback(null);
      const points = 100;
      setTotalScore(prev => prev + points);
      onScoreChange?.(points);
    } else {
      setShakeWrong(true);
      setWrongFeedback(`Salah: Anda menekan Pin #${pin.pinNumber} (${pin.shortName}). Target yang dicari: ${curMission.targetName}!`);
      setTimeout(() => setShakeWrong(false), 700);
    }
  };

  const handleContinue = () => {
    if (missionIndex + 1 < missions.length) {
      const nextIdx = missionIndex + 1;
      setMissionIndex(nextIdx);
      setDiscovered(false);
      setWrongFeedback(null);
      onStepChange?.(nextIdx + 1);
    } else {
      // All 5 discovered!
      onComplete?.({
        score: totalScore,
        accuracy: "100%",
        timeSpent: "01:15",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none">
      
      {/* 1. Top Mission Headline */}
      <div className="text-center shrink-0 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-slate-200/90 text-sky-700 text-[11px] font-mono tracking-widest uppercase mb-1 shadow-xs font-semibold">
          <Crosshair className="w-3.5 h-3.5 text-amber-500" />
          <span>MISI {missionIndex + 1} DARI {missions.length} // TARGET SPASIAL</span>
        </div>

        <h2 className="text-sm sm:text-lg font-bold font-display text-slate-900">
          CARI: <span className="text-sky-700 underline decoration-sky-300 underline-offset-4">{curMission.title}</span>
        </h2>
        
        <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5 max-w-2xl mx-auto">
          💡 {curMission.hint}
        </p>

        {wrongFeedback && !discovered && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-[11px] font-mono animate-shake shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{wrongFeedback}</span>
          </div>
        )}
      </div>

      {/* 2. Central 3D Motherboard Viewport */}
      <div 
        className={`
          relative w-full rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm
          ${shakeWrong ? 'animate-shake border-rose-400 ring-2 ring-rose-200' : ''}
        `}
      >
        <Motherboard3DViewer
          category="desktop"
          highlightPinNumber={discovered ? curMission.targetPin : null}
          onPinClick={handlePinSelect}
          showModal={false}
          showPinStrip={false}
          heightClass="h-[270px] sm:h-[320px] md:h-[350px]"
        />

        {/* Floating Quick Pin Selector Strip at Bottom of 3D Canvas */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md overflow-x-auto">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline mr-1 font-semibold">
            KLIK PIN:
          </span>
          {MOTHERBOARD_PINS.map((pin) => {
            const isTarget = discovered && pin.pinNumber === curMission.targetPin;
            return (
              <button
                key={pin.id}
                onClick={() => handlePinSelect(pin)}
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 rounded-lg font-mono text-[11px] font-bold transition-all shrink-0 flex items-center justify-center
                  ${isTarget
                    ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] scale-110'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95'
                  }
                `}
                title={`Pin #${pin.pinNumber}: ${pin.shortName}`}
              >
                {pin.pinNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Educational "Quick Take" Drawer */}
      <div className="min-h-[72px] sm:min-h-[76px] shrink-0 pt-2">
        {discovered ? (
          <div className="w-full p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-emerald-400 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-md">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    TARGET DITEMUKAN! +100 XP
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">• {curMission.specs}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-display font-bold text-slate-900">{curMission.quickTakeTitle}</h4>
                <p className="text-[11px] text-slate-600 font-sans leading-snug line-clamp-2 max-w-xl">
                  {curMission.quickTakeText}
                </p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95"
            >
              <span>{missionIndex + 1 < missions.length ? 'TARGET BERIKUTNYA' : 'SELESAI MISI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="w-full text-center text-[11px] font-mono text-slate-600 bg-white py-2 px-3 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Putar motherboard 3D atau klik langsung bola pin bercahaya / tombol nomor pin <strong className="text-slate-800">{curMission.targetName}</strong>.</span>
          </div>
        )}
      </div>

    </div>
  );
}
