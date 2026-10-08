import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, Layers, HardDrive, Battery, Wifi, Fan, CheckCircle2, 
  Info, ShieldCheck, Sparkles, Box, Glasses, ArrowRight, RotateCcw,
  ArrowLeft, Shuffle, Trophy, ChevronLeft, ChevronRight, Eye, EyeOff
} from 'lucide-react';
import DragPlace3DWorkbench from './DragPlace3DWorkbench';

/**
 * Hardware Component Pool for Randomized Quests
 */
export const ASSEMBLY_COMPONENT_POOL = {
  cpu: {
    id: 'cpu',
    name: 'Intel Core i7 13700H',
    shortName: 'Prosesor CPU',
    category: 'Prosesor Komputasi',
    icon: Cpu,
    socketName: 'Soket CPU LGA-1700',
    colorHex: 0xf59e0b,
    accentClass: 'text-amber-600 bg-amber-50 border-amber-200',
    desc: 'Pasang unit komputasi utama CPU ke dalam soket motherboard LGA-1700.',
    specs: '14 Cores • 20 Threads • Socket LGA-1700',
  },
  ram: {
    id: 'ram',
    name: '16GB DDR5 5600MT/s',
    shortName: 'Memori RAM DDR5',
    category: 'Memori Utama Akses Cepat',
    icon: Layers,
    socketName: 'Slot RAM SO-DIMM A1',
    colorHex: 0x10b981,
    accentClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    desc: 'Pasang keping memori SO-DIMM ke slot jalur dual-channel A1.',
    specs: 'DDR5 5600 MT/s • Dual-Channel • 1.1V',
  },
  ssd: {
    id: 'ssd',
    name: '1TB NVMe PCIe Gen4 SSD',
    shortName: 'Storage NVMe SSD',
    category: 'Penyimpanan Kecepatan Tinggi',
    icon: HardDrive,
    socketName: 'Slot M.2 NVMe PCIe Gen4',
    colorHex: 0x8b5cf6,
    accentClass: 'text-purple-600 bg-purple-50 border-purple-200',
    desc: 'Pasang modul solid-state drive M.2 2280 berkecepatan tinggi ke port PCIe.',
    specs: 'PCIe 4.0 x4 • 7000 MB/s Read Speed',
  },
  battery: {
    id: 'battery',
    name: 'Baterai Polymer 75Wh',
    shortName: 'Baterai Daya Utama',
    category: 'Catu Daya DC & Regulator',
    icon: Battery,
    socketName: 'Konektor Baterai Utama DC-IN',
    colorHex: 0x06b6d4,
    accentClass: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    desc: 'Hubungkan unit pasokan daya baterai lithium-polymer ke jalur daya utama.',
    specs: '4-Cell Li-Polymer • 75 Wh • 15.4V',
  },
  wifi: {
    id: 'wifi',
    name: 'Modul M.2 Wi-Fi 6E AX211',
    shortName: 'Kartu Wi-Fi 6E',
    category: 'Jaringan Nirkabel & Bluetooth',
    icon: Wifi,
    socketName: 'Slot M.2 Wi-Fi Key-E',
    colorHex: 0x3b82f6,
    accentClass: 'text-blue-600 bg-blue-50 border-blue-200',
    desc: 'Pasang modul nirkabel Wi-Fi 6E untuk koneksi internet tanpa kabel super cepat.',
    specs: 'Tri-Band 2.4/5/6 GHz • Bluetooth 5.3',
  },
  fan: {
    id: 'fan',
    name: 'Blower Pendingin Kipas 12V',
    shortName: 'Kipas Pendingin Dual-Fan',
    category: 'Sistem Termal & Sirkulasi',
    icon: Fan,
    socketName: 'Header Kipas Pendingin PWM 12V',
    colorHex: 0xec4899,
    accentClass: 'text-pink-600 bg-pink-50 border-pink-200',
    desc: 'Pasang modul kipas blower pendingin ke soket pengendali kecepatan PWM.',
    specs: 'Dual Hydro-Bearing • PWM 4-Pin 12V DC',
  },
};

/**
 * Helper to pick random components from pool
 */
function pickRandomQuestIds(count = 3) {
  const keys = Object.keys(ASSEMBLY_COMPONENT_POOL);
  const shuffled = [...keys].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * DragPlaceGame
 * FULLSCREEN 3D Interactive WebGL Motherboard Assembly:
 * - 100% Fullscreen WebGL Canvas matching Laptop Explore
 * - Strictly Isometric Camera Perspective (offset to avoid panel overlap)
 * - Collapsible Quest Panel so 3D view is never blocked
 * - Randomized Component Pool (CPU, RAM, SSD, Battery, WiFi, Fan)
 * - Fixed multi-item stale closure bug (previous placements remain locked and intact!)
 * - Floating HUD and Technical Quest Dossier
 */
export default function DragPlaceGame({ 
  onScoreChange, 
  onComplete, 
  onBackToBriefing, 
  sessionScore = 0 
}) {
  // 1. Random active quest components for this session (3 components)
  const [activeQuestIds, setActiveQuestIds] = useState(() => pickRandomQuestIds(3));

  // 2. Installed state tracking: { [id]: boolean }
  const [installedSlots, setInstalledSlots] = useState(() => {
    const initial = {};
    activeQuestIds.forEach((id) => { initial[id] = false; });
    return initial;
  });

  // 3. Active selected item for click-to-place workflow
  const [activeItem, setActiveItem] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isQuestPanelOpen, setIsQuestPanelOpen] = useState(true);

  // When activeQuestIds changes (e.g. on randomize), sync installedSlots
  useEffect(() => {
    const freshSlots = {};
    activeQuestIds.forEach((id) => { freshSlots[id] = false; });
    setInstalledSlots(freshSlots);
    setActiveItem(null);
    setIsCompleted(false);
  }, [activeQuestIds]);

  /**
   * Called when a 3D component is successfully snapped to its socket in 3D
   * Uses functional state update to completely prevent stale closure resets!
   */
  const handleComponentSnap = (componentId, targetSocket) => {
    setInstalledSlots((prev) => {
      if (prev[targetSocket]) return prev; // Already installed, ignore

      const nextSlots = { ...prev, [targetSocket]: true };

      // Verify if ALL active quests for this round are completed
      const allInstalled = activeQuestIds.every((id) => nextSlots[id] === true);

      if (allInstalled) {
        setIsCompleted(true);
        setTimeout(() => {
          onComplete?.({
            score: 500,
            accuracy: "100%",
            timeSpent: "00:45",
            mode: "3D Isometric Assembly",
          });
        }, 1400);
      }

      return nextSlots;
    });

    setActiveItem(null);
    onScoreChange?.(166);
  };

  /**
   * Reset current game with the same components
   */
  const handleResetCurrent = () => {
    const resetSlots = {};
    activeQuestIds.forEach((id) => { resetSlots[id] = false; });
    setInstalledSlots(resetSlots);
    setActiveItem(null);
    setIsCompleted(false);
  };

  /**
   * Randomize and shuffle a NEW set of 3 components from the pool!
   */
  const handleRandomizeNewSession = () => {
    const newQuests = pickRandomQuestIds(3);
    setActiveQuestIds(newQuests);
  };

  const installedCount = useMemo(() => {
    return activeQuestIds.filter((id) => installedSlots[id] === true).length;
  }, [activeQuestIds, installedSlots]);

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden select-none bg-slate-100">
      
      {/* ── FULLSCREEN WEBGL 3D WORKBENCH CANVAS (Isometric Perspective) ── */}
      <DragPlace3DWorkbench
        activeQuestIds={activeQuestIds}
        installedSlots={installedSlots}
        onComponentSnap={handleComponentSnap}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* ── TOP FLOATING CONTROL HUD BAR ── */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Left: Back button & Mode Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {onBackToBriefing && (
            <button
              onClick={onBackToBriefing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200/90 text-slate-700 text-xs font-mono hover:border-emerald-300 hover:text-emerald-700 transition-all backdrop-blur-md shadow-sm"
              title="Kembali ke Penjelasan Misi"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">Misi Briefing</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md">
            <Box className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-display font-bold text-slate-800">
              Drag & Place 3D Workbench
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
              ISOMETRIC POV
            </span>
          </div>
        </div>

        {/* Right: Actions, Randomizer, and Progress Badge */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Randomize / Ganti Komponen Button */}
          <button
            onClick={handleRandomizeNewSession}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200/90 text-slate-700 text-xs font-mono font-bold hover:border-emerald-400 hover:text-emerald-700 hover:bg-slate-50 transition-all shadow-sm backdrop-blur-md"
            title="Acak dan ganti kombinasi komponen yang harus dirakit"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Acak Komponen Baru</span>
          </button>

          {/* Reset Current Assembly */}
          <button
            onClick={handleResetCurrent}
            className="p-1.5 rounded-xl bg-white/95 border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all backdrop-blur-md"
            title="Reset Posisi Komponen Saat Ini"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md font-mono text-xs text-emerald-700 font-bold">
            <span className={`w-2 h-2 rounded-full ${installedCount === activeQuestIds.length ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            <span>{installedCount} / {activeQuestIds.length} TERPASANG</span>
          </div>
        </div>

      </div>

      {/* ── LEFT FLOATING GLASS PANEL: ACTIVE QUESTS & COMPONENT STATUS (COLLAPSIBLE) ── */}
      {isQuestPanelOpen ? (
        <div className="absolute top-16 left-4 bottom-14 w-68 sm:w-72 z-20 flex flex-col justify-between pointer-events-auto backdrop-blur-xl bg-white/92 border border-slate-200/90 rounded-2xl p-3 shadow-xl overflow-y-auto animate-fadeIn">
          
          <div className="space-y-2.5">
            {/* Header with Collapse Button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">
                  Target Perakitan
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {installedCount}/{activeQuestIds.length}
                </span>
                <button
                  onClick={() => setIsQuestPanelOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Sembunyikan Panel (Lihat 3D Penuh)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Tarik aset 3D dari baki ke soket motherboard yang menyala, atau klik kartu untuk memilih.
            </p>

            {/* Active Quest Cards List */}
            <div className="space-y-2">
              {activeQuestIds.map((questId) => {
                const comp = ASSEMBLY_COMPONENT_POOL[questId];
                if (!comp) return null;
                const Icon = comp.icon;
                const isInstalled = installedSlots[questId] === true;
                const isSelected = activeItem === questId;

                return (
                  <div
                    key={questId}
                    onClick={() => {
                      if (isInstalled) return;
                      if (isSelected) {
                        setActiveItem(null);
                      } else {
                        setActiveItem(questId);
                      }
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isInstalled
                        ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-300/40 cursor-default'
                        : isSelected
                          ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-300/60 shadow-sm animate-pulse'
                          : 'bg-slate-50/80 border-slate-200/80 hover:border-emerald-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-lg ${comp.accentClass}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-display font-bold text-slate-900 block leading-tight">
                            {comp.shortName}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {comp.socketName}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isInstalled 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isSelected 
                            ? 'bg-amber-200 text-amber-900' 
                            : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isInstalled ? 'TERKUNCI ✓' : isSelected ? 'SIAP PASANG' : 'KOSONG'}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-600 font-sans leading-tight pl-7 truncate">
                      {isInstalled ? 'Terpasang sempurna pada soket.' : comp.specs}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Quick Guide */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-2">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-600 font-sans leading-tight">
                <strong className="text-slate-800 font-semibold">Tips:</strong> Drag model 3D ke beacon bercahaya di motherboard.
              </p>
            </div>

            {/* Victory notification if all placed */}
            {isCompleted && (
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex items-center justify-between shadow-lg animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
                  <div>
                    <div className="text-xs font-display font-bold">Misi Selesai!</div>
                    <div className="text-[9px] text-emerald-100 font-mono">+500 XP Diraih</div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Collapsed Floating Pill Button */
        <button
          onClick={() => setIsQuestPanelOpen(true)}
          className="absolute top-16 left-4 z-20 px-3.5 py-2 rounded-full bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 hover:border-emerald-400 hover:text-emerald-700 hover:bg-slate-50 transition-all pointer-events-auto animate-fadeIn"
          title="Tampilkan Target Perakitan"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>TARGET PERAKITAN ({installedCount}/{activeQuestIds.length})</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}

      {/* ── BOTTOM FLOATING ACTION TIP ── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-xl pointer-events-auto text-[11px] font-mono text-slate-600">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>Sudut Pandang Kamera: <strong>Isometrik Tetap</strong> (Gunakan mouse untuk sedikit menggeser/zoom)</span>
      </div>

    </div>
  );
}
