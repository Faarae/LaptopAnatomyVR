import React, { useState } from 'react';
import { 
  Crosshair, CheckCircle2, ArrowRight, Sparkles, AlertTriangle, 
  RotateCcw, Compass, Box, Trophy, Lightbulb, MapPin, Camera, Image
} from 'lucide-react';
import Motherboard3DViewer from '../3d/Motherboard3DViewer';
import { GAMING_MOTHERBOARD_PINS } from '../../data/gamingMotherboardData';

/**
 * FindComponentGame
 * Mini-game 04: Spatial Discovery & 3D Component Locator on the Gaming Laptop Motherboard.
 * Features the new 3D Gaming Motherboard Digital Twin (AeroBook Strix G16), 100% raycasting click detection,
 * real hardware photo previews, and educational Quick Take dossiers.
 */
export default function FindComponentGame({ onScoreChange, onComplete, onStepChange }) {
  const missions = [
    {
      targetPin: 2,
      title: 'Cari Prosessor Utama (CPU Intel Core i7-14650HX)',
      targetName: 'CPU Intel Core i7-14650HX',
      image: '/images/components/pin-8.jpg',
      hint: 'Perhatikan silikon processor die persegi panjang di bagian kanan atas motherboard yang dikelilingi choke daya VRM.',
      quickTakeTitle: 'Apa itu CPU Laptop? (Quick Take)',
      quickTakeText: 'Intel Core i7-14650HX memiliki 16 Core (8P + 8E) dan 24 Thread dengan arsitektur hybrid BGA yang disolder langsung ke motherboard untuk profil chassis tipis.',
      specs: 'Intel Core i7-14650HX • 16-Core / 24-Thread • Up to 5.2 GHz • BGA1964',
    },
    {
      targetPin: 1,
      title: 'Cari Kartu Grafis Diskrit (GPU NVIDIA GeForce RTX 4060)',
      targetName: 'NVIDIA RTX 4060 Laptop GPU',
      image: '/images/components/pin-1.jpg',
      hint: 'Cari silikon GPU die mengkilap di sebelah kiri yang dikelilingi 4 modul memori GDDR6 VRAM dan pipa tembaga pendingin.',
      quickTakeTitle: 'Apa itu GPU Laptop Diskrit? (Quick Take)',
      quickTakeText: 'GPU mobile RTX 4060 dipasang langsung (BGA) dengan 8GB GDDR6 memory untuk merender grafis 3D real-time, ray tracing, dan akselerasi AI DLSS 3.5.',
      specs: 'NVIDIA RTX 4060 • 8 GB GDDR6 • Max 140W TGP • Ada Lovelace',
    },
    {
      targetPin: 4,
      title: 'Cari Slot Memori Sistem (Dual DDR5 SO-DIMM RAM)',
      targetName: '16 GB DDR5 SO-DIMM RAM',
      image: '/images/components/pin-4.jpg',
      hint: 'Cari dua slot soket SO-DIMM horizontal berwarna perak dengan tuas pengunci di bagian tengah motherboard.',
      quickTakeTitle: 'Apa itu RAM SO-DIMM? (Quick Take)',
      quickTakeText: 'SO-DIMM DDR5 menyediakan workspace berkecepatan 5600 MT/s dengan dual-channel 32-bit subchannel per stick dan onboard PMIC untuk efisiensi daya.',
      specs: '16 GB (2x8 GB) DDR5-5600 • 262-Pin SO-DIMM • Dual 32-bit Subchannel',
    },
    {
      targetPin: 3,
      title: 'Cari Penyimpanan Cepat (1 TB M.2 NVMe PCIe 4.0 SSD)',
      targetName: '1 TB M.2 NVMe PCIe 4.0 SSD',
      image: '/images/components/pin-3.jpg',
      hint: 'Cari modul kartu PCB panjang (form factor M.2 2280) di area kanan bawah yang dikencangkan baut tunggal.',
      quickTakeTitle: 'Apa itu NVMe M.2 SSD? (Quick Take)',
      quickTakeText: 'SSD NVMe PCIe Gen 4.0 x4 langsung terhubung ke controller CPU melalui jalur serial berkecepatan tinggi, menghasilkan kecepatan baca hingga 7.000 MB/s.',
      specs: 'M.2 2280 NVMe 1.4 • PCIe Gen 4.0 x4 • Read up to 7,000 MB/s',
    },
    {
      targetPin: 5,
      title: 'Cari Sistem Pendingin Kipas Ganda (Dual Centrifugal Fan)',
      targetName: 'Dual Centrifugal Cooling System',
      image: '/images/components/pin-2.jpg',
      hint: 'Cari modul kipas blower sentrifugal dengan bilah turbin melengkung di sudut samping dan pipa tembaga tebal.',
      quickTakeTitle: 'Bagaimana Laptop Gaming Mendinginkan Komponen? (Quick Take)',
      quickTakeText: 'Dua kipas blower sentrifugal berkecepatan tinggi membuang panas dari heatpipe tembaga sinter fase-cair keluar chassis, mampu melepas panas hingga 195W TDP gabungan.',
      specs: 'Dual 84-Blade Blower Fans • 4x Copper Heatpipes • 195W Thermal Capacity',
    },
    {
      targetPin: 9,
      title: 'Cari Baterai Daya Utama (90 Wh High-Density Battery)',
      targetName: '90 Wh High-Density Battery',
      image: '/images/components/pin-9.jpg',
      hint: 'Cari pack baterai hitam besar 4-cell yang membentang di bagian bawah motherboard dekat konektor daya tebal.',
      quickTakeTitle: 'Apa itu Baterai Li-ion Laptop? (Quick Take)',
      quickTakeText: 'Baterai 4-cell 90 Wh memaksimalkan portabilitas mendekati batas legal penerbangan (100 Wh), dilengkapi BMS pintar dan dukungan fast charging 100W PD.',
      specs: '4-Cell 90 Wh / 5845 mAh • 15.4V • Fast Charge 100W PD',
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
      // All missions discovered!
      onComplete?.({
        score: totalScore,
        accuracy: "100%",
        timeSpent: "01:20",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none">
      
      {/* 1. Top Mission Directive & Real Target Photo Indicator */}
      <div className="shrink-0 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs">
          <div className="flex items-start gap-3">
            {/* Target Real Photo Thumbnail */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-xs group">
              <img 
                src={curMission.image} 
                alt={curMission.targetName}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-0.5">
                <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider mx-auto">
                  FOTO RIIL
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-mono tracking-wider uppercase font-semibold mb-1">
                <Crosshair className="w-3 h-3 text-amber-500" />
                <span>MISI {missionIndex + 1} DARI {missions.length} // TARGET SPASIAL</span>
              </div>
              <h2 className="text-xs sm:text-base font-bold font-display text-slate-900 leading-tight">
                CARI: <span className="text-sky-700 underline decoration-sky-300 underline-offset-2">{curMission.title}</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5 max-w-xl">
                💡 {curMission.hint}
              </p>
            </div>
          </div>

          <div className="sm:self-center shrink-0 flex items-center justify-between sm:flex-col sm:items-end gap-1">
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
              SKOR: {totalScore} XP
            </span>
            <span className="text-[10px] font-mono text-slate-600 hidden sm:inline">
              AeroBook Strix G16 MB
            </span>
          </div>
        </div>

        {wrongFeedback && !discovered && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-[11px] font-mono animate-shake shadow-xs w-full">
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
          laptopId="laptop-b"
          category="Gaming"
          highlightPinNumber={discovered ? curMission.targetPin : null}
          onPinClick={handlePinSelect}
          showModal={false}
          showPinStrip={false}
          heightClass="h-[270px] sm:h-[320px] md:h-[350px]"
        />

        {/* Floating Quick Pin Selector Strip at Bottom of 3D Canvas */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md overflow-x-auto">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline mr-1 font-semibold">
            PIN LAPTOP MB:
          </span>
          {GAMING_MOTHERBOARD_PINS.map((pin) => {
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
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-emerald-300 shrink-0 mt-0.5 shadow-xs">
                <img 
                  src={curMission.image} 
                  alt={curMission.targetName}
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute top-0.5 right-0.5 bg-emerald-500 text-white p-0.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
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
            <span>Putar motherboard 3D atau klik langsung chevron panah V 3D / tombol pin <strong className="text-slate-800">{curMission.targetName}</strong>.</span>
          </div>
        )}
      </div>

    </div>
  );
}
