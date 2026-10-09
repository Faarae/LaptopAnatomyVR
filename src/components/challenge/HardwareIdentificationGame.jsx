import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, Sparkles, Cpu, Layers, HardDrive, Fan, Wifi, Zap, Camera } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * Technical Question Bank for Hardware Identification Challenge
 */
const IDENTIFICATION_MISSIONS = [
  {
    id: 1,
    title: "High-Speed Storage Controller",
    threeType: "ssd",
    realImage: "/images/components/pin-3.jpg",
    imageName: "pin-3.jpg",
    specs: {
      "Interface Bus": "PCIe Gen 4.0 x4 NVMe 1.4",
      "Form Factor": "M.2 2280 (22mm x 80mm)",
      "Peak Throughput": "Up to 7,000 MB/s Read",
      "Memory Topology": "3D TLC NAND Flash + DRAM Buffer",
    },
    prompt: "Berdasarkan spesifikasi antarmuka bus dan form factor M.2 2280 di atas, modul apakah ini?",
    options: [
      { id: 'opt-1', label: 'Solid State Drive (M.2 NVMe SSD)', correct: true },
      { id: 'opt-2', label: 'Wi-Fi 6E Wireless Card', correct: false },
      { id: 'opt-3', label: 'DDR5 SO-DIMM System Memory', correct: false },
      { id: 'opt-4', label: 'Southbridge Chipset Controller', correct: false },
    ],
    explanation: "Modul M.2 2280 dengan jalur PCIe Gen 4 x4 merupakan SSD NVMe yang mampu mentransfer data berkecepatan multi-gigabyte per detik.",
  },
  {
    id: 2,
    title: "Central Instruction Processor",
    threeType: "cpu",
    realImage: "/images/components/pin-8.jpg",
    imageName: "pin-8.jpg",
    specs: {
      "Socket Type": "BGA-1964 / Mobile BGA",
      "Architecture": "Hybrid Core (P-Cores + E-Cores)",
      "Thermal Envelope": "55W Base TDP (157W Boost)",
      "Cache Structure": "30MB Shared L3 Cache",
    },
    prompt: "Modul pemrosesan utama dengan mikroarsitektur hibrida dan soket terintegrasi adalah:",
    options: [
      { id: 'opt-1', label: 'Dedicated Graphics Unit (GPU)', correct: false },
      { id: 'opt-2', label: 'Central Processing Unit (CPU)', correct: true },
      { id: 'opt-3', label: 'Voltage Regulator Module (VRM)', correct: false },
      { id: 'opt-4', label: 'Thunderbolt Retimer Chip', correct: false },
    ],
    explanation: "CPU bertindak sebagai otak utama laptop yang mengoordinasikan instruksi komputasi dengan soket BGA/LGA.",
  },
  {
    id: 3,
    title: "Volatile Workspace Buffer",
    threeType: "ram",
    realImage: "/images/components/pin-4.jpg",
    imageName: "pin-4.jpg",
    specs: {
      "Pin Count": "262-Pin SO-DIMM",
      "Transfer Rate": "5600 MT/s (DDR5)",
      "Operating Voltage": "1.1V Ultra Low Voltage",
      "Bus Channels": "Dual 32-bit Subchannels",
    },
    prompt: "Papan modul memori berkecepatan tinggi dengan 262 pin dan latensi nanodetik adalah:",
    options: [
      { id: 'opt-1', label: 'DDR5 SO-DIMM (RAM)', correct: true },
      { id: 'opt-2', label: 'SATA Solid State Drive', correct: false },
      { id: 'opt-3', label: 'Embedded DisplayPort Card', correct: false },
      { id: 'opt-4', label: 'Battery Management Board (BMS)', correct: false },
    ],
    explanation: "Konektor 262-pin dengan tegangan 1.1V merupakan standar memori modular laptop DDR5 SO-DIMM.",
  },
  {
    id: 4,
    title: "Active Thermal Convection Blower",
    threeType: "fan",
    realImage: "/images/components/pin-2.jpg",
    imageName: "pin-2.jpg",
    specs: {
      "Motor Topology": "3-Phase 6-Pole Brushless DC",
      "Blade Material": "0.15mm Liquid Crystal Polymer (LCP)",
      "Peak Rotation": "Up to 6,200 RPM",
      "Heat Transport": "Coupled to Sintered Copper Heatpipes",
    },
    prompt: "Komponen mekanikal pendingin aktif dengan bilah polimer tipis berkecepatan 6,200 RPM adalah:",
    options: [
      { id: 'opt-1', label: 'Subwoofer Resonant Chamber', correct: false },
      { id: 'opt-2', label: 'Centrifugal Cooling Fan & Fin Stack', correct: true },
      { id: 'opt-3', label: 'Display Hinge Dampener', correct: false },
      { id: 'opt-4', label: 'Vapor Chamber Cold Plate', correct: false },
    ],
    explanation: "Kipas blower sentrifugal membuang udara panas dari fin radiator tembaga untuk mencegah thermal throttling.",
  },
  {
    id: 5,
    title: "Massively Parallel Shading Unit",
    threeType: "gpu",
    realImage: "/images/components/pin-1.jpg",
    imageName: "pin-1.jpg",
    specs: {
      "Silicon Die": "Polished Mirror Die Interposer",
      "Memory Bus": "128-bit GDDR6 VRAM (16 Gbps)",
      "Specialized Silicon": "Dedicated RT (Ray Tracing) & Tensor Cores",
      "Power Envelope": "Up to 140W Dynamic Boost TGP",
    },
    prompt: "Chip silikon dengan core Ray Tracing khusus dan chip memori GDDR6 di sekelilingnya adalah:",
    options: [
      { id: 'opt-1', label: 'Dedicated Graphics Unit (GPU)', correct: true },
      { id: 'opt-2', label: 'Audio DSP Codec', correct: false },
      { id: 'opt-3', label: 'Gigabit Ethernet PHY', correct: false },
      { id: 'opt-4', label: 'Platform Controller Hub (PCH)', correct: false },
    ],
    explanation: "GPU diskrit dilengkapi core rasterisasi paralel, RT cores, dan modul VRAM GDDR6 berkecepatan tinggi.",
  },
];

/**
 * HardwareIdentificationGame
 * Challenge 06: Component Recognition and technical specification analysis.
 * Now featuring 3D component models and real hardware photos toggle.
 */
export default function HardwareIdentificationGame({ onScoreChange, onComplete, onStepChange }) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'

  const curMission = IDENTIFICATION_MISSIONS[missionIndex];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt.id);
    setIsAnswered(true);

    if (opt.correct) {
      const points = 100;
      setTotalScore(prev => prev + points);
      onScoreChange?.(points);
    }
  };

  const handleNextStep = () => {
    if (missionIndex < IDENTIFICATION_MISSIONS.length - 1) {
      const nextIdx = missionIndex + 1;
      setMissionIndex(nextIdx);
      setSelectedOpt(null);
      setIsAnswered(false);
      setViewMode('3d');
      onStepChange?.(nextIdx + 1);
    } else {
      // Game Complete
      onComplete?.({
        score: totalScore,
        accuracy: "100%",
        timeSpent: "01:15",
      });
    }
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto px-4 py-1.5 flex flex-col justify-between select-none">
      
      {/* Top Directive Header */}
      <div className="flex items-center justify-between shrink-0 mb-1">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
            SPECIFICATION ANALYSIS // MODUL {missionIndex + 1} DARI {IDENTIFICATION_MISSIONS.length}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
            {curMission.title}
          </h3>
        </div>
        <div className="px-3.5 py-1 rounded-full bg-white border border-slate-200/90 text-xs font-mono text-amber-700 font-bold shadow-xs">
          SKOR: {totalScore} XP
        </div>
      </div>

      {/* Main Analysis Stage: 3D Viewport on Left, Specs & Options on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 my-auto items-stretch">
        
        {/* Left: 3D Component Model / Real Photo Viewport */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-1.5 shrink-0">
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {viewMode === '3d' ? '3D HARDWARE MODEL' : 'FOTO FISIK RIIL'}
            </span>
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px]">
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  viewMode === '3d' 
                    ? 'bg-white text-emerald-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3D Model
              </button>
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'photo' 
                    ? 'bg-white text-emerald-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-2.5 h-2.5" />
                Foto Riil
              </button>
            </div>
          </div>

          <div className="my-2 h-[160px] sm:h-[185px] flex items-center justify-center">
            {viewMode === '3d' ? (
              <Component3DViewer 
                key={curMission.threeType}
                type={curMission.threeType}
                heightClass="h-[160px] sm:h-[185px]"
                className="border-0 bg-transparent shadow-none"
                autoRotateSpeed={2.0}
              />
            ) : (
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative group">
                <img 
                  src={curMission.realImage} 
                  alt={curMission.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                  Foto Riil Hardware
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-center border-t border-slate-200 pt-1.5 shrink-0 font-medium">
            {viewMode === '3d' 
              ? 'Putar komponen 360° untuk melihat bentuk fisik silikon' 
              : 'Foto aktual komponen perangkat keras asli'}
          </div>
        </div>

        {/* Right: Technical Specs Matrix & Multiple Choice */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-3.5 sm:p-4 shadow-sm">
          
          <div>
            {/* Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {Object.entries(curMission.specs).map(([specK, specV], i) => (
                <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200/90">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide block font-semibold">
                    {specK}
                  </span>
                  <span className="text-xs font-semibold font-mono text-sky-700">
                    {specV}
                  </span>
                </div>
              ))}
            </div>

            {/* Prompt Question */}
            <p className="text-xs sm:text-sm text-slate-800 font-sans font-semibold mb-3">
              {curMission.prompt}
            </p>

            {/* 4 Options */}
            <div className="space-y-2">
              {curMission.options.map((opt) => {
                const isSelected = selectedOpt === opt.id;
                let btnStyle = "bg-white border-slate-200/90 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/40 shadow-xs";

                if (isAnswered) {
                  if (opt.correct) {
                    btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-800 shadow-xs font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-2 border-rose-400 text-rose-800 font-semibold";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      w-full p-2.5 sm:p-3 rounded-2xl border text-left text-xs font-mono transition-all duration-150 flex items-center justify-between
                      ${btnStyle}
                    `}
                  >
                    <span>{opt.label}</span>
                    {isAnswered && opt.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !opt.correct && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer Feedback & Next Button */}
          {isAnswered && (
            <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <p className="text-[11px] text-slate-600 font-sans leading-tight flex-1">
                <strong className="text-amber-700 font-mono mr-1">ANALISIS:</strong>
                {curMission.explanation}
              </p>

              <button
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95"
              >
                <span>{missionIndex < IDENTIFICATION_MISSIONS.length - 1 ? 'LANJUT' : 'SELESAI'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
