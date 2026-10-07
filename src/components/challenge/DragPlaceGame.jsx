import React, { useState } from 'react';
import { Cpu, MemoryStick as Memory, HardDrive, CheckCircle2, Info, Bolt, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * DragPlaceGame
 * Mini-game 03: Interactive 2.5D Motherboard Assembly Workbench.
 * Supports both drag-and-drop and click-to-snap for seamless UX across all devices.
 */
export default function DragPlaceGame({ onScoreChange, onComplete }) {
  // Slots state: { cpu: boolean, ram: boolean, ssd: boolean }
  const [installedSlots, setInstalledSlots] = useState({
    cpu: false,
    ram: false,
    ssd: false,
  });

  // Selected item from inventory (for click-to-snap workflow)
  const [activeItem, setActiveItem] = useState(null); // 'cpu' | 'ram' | 'ssd' | null
  const [wrongTarget, setWrongTarget] = useState(null);

  const inventoryItems = [
    {
      id: 'cpu',
      name: 'Intel Core i7',
      tag: '13700H',
      desc: '14 Cores • 20 Threads • 5.0 GHz',
      socketName: 'BGA-1744 Socket',
      icon: Cpu,
    },
    {
      id: 'ram',
      name: '16GB DDR5',
      tag: '5600MT/s',
      desc: 'Dual-Rank • 1.1V Ultra Low Power',
      socketName: 'SO-DIMM Slot A1',
      icon: Memory,
    },
    {
      id: 'ssd',
      name: '1TB NVMe Gen4',
      tag: 'PCIe 4.0',
      desc: '7000 MB/s Read • M.2 2280 Key-M',
      socketName: 'M.2 NVMe Slot',
      icon: HardDrive,
    },
  ];

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
    setActiveItem(itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSlot) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text/plain') || activeItem;
    snapComponent(draggedItemId, targetSlot);
  };

  const handleSlotClick = (targetSlot) => {
    if (!activeItem) return;
    snapComponent(activeItem, targetSlot);
  };

  const snapComponent = (itemId, targetSlot) => {
    if (installedSlots[targetSlot]) return; // Already installed

    if (itemId === targetSlot) {
      // Correct socket snap!
      const nextSlots = { ...installedSlots, [targetSlot]: true };
      setInstalledSlots(nextSlots);
      setActiveItem(null);
      setWrongTarget(null);
      onScoreChange?.(100);

      // Check if all installed
      const allInstalled = Object.values(nextSlots).every(v => v);
      if (allInstalled) {
        setTimeout(() => {
          onComplete?.({
            score: 500,
            accuracy: "100%",
            timeSpent: "00:54",
          });
        }, 800);
      }
    } else {
      // Wrong socket
      setWrongTarget(targetSlot);
      setTimeout(() => setWrongTarget(null), 500);
    }
  };

  const installedCount = Object.values(installedSlots).filter(Boolean).length;

  return (
    <div className="w-full h-full max-w-6xl mx-auto px-4 py-2 flex flex-col justify-between select-none">
      
      {/* Top Banner & Quick Progress */}
      <div className="flex items-center justify-between shrink-0 mb-1">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display text-white">
            Mount each component into its designated motherboard socket
          </h2>
          <p className="text-xs text-slate-300 font-sans">
            Drag a component card or click to pick up, then tap the highlighted socket on the mainboard.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#092217] border border-[#22C55E]/40 font-mono text-xs text-[#4ADE80]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span>{installedCount} / 3 INSTALLED</span>
        </div>
      </div>

      {/* Main Workbench Stage (Isometric PCB Stage & Diagnostic Panel) */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-between gap-4 my-auto">
        
        {/* Left Workbench: 2.5D Isometric Motherboard PCB */}
        <div className="relative flex-1 h-[250px] sm:h-[300px] lg:h-[320px] rounded-2xl bg-[#061710] border border-[#22C55E]/30 p-4 flex items-center justify-center overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
          
          {/* PCB Grid & Trace Lines */}
          <div className="absolute inset-0 cyber-circuit-grid opacity-40 pointer-events-none" />
          
          {/* Mainboard Rev Tag */}
          <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono text-[#4ADE80]/80">
            <span>X-SERIES PRO // MAINBOARD REV 3.2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span>SOCKET BGA-1744</span>
          </div>

          {/* Isometric Motherboard Board Container */}
          <div className="relative w-full max-w-lg h-56 rounded-xl bg-[#092017] border border-[#22C55E]/40 p-4 shadow-inner flex items-center justify-around">
            
            {/* 1. CPU SOCKET (Top-Left) */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'cpu')}
              onClick={() => handleSlotClick('cpu')}
              className={`
                relative w-28 sm:w-32 h-28 sm:h-32 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col justify-between cursor-pointer
                ${installedSlots.cpu 
                  ? 'border-[#22C55E] bg-[#0E3524] shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-snap' 
                  : activeItem === 'cpu'
                    ? 'border-[#FACC15] bg-[#FACC15]/10 animate-amber-pulse'
                    : 'border-dashed border-[#22C55E]/40 bg-[#0B261B]/60 hover:border-[#4ADE80]'
                }
                ${wrongTarget === 'cpu' ? 'animate-shake border-red-500' : ''}
              `}
            >
              <div className="flex justify-between items-start text-[9px] font-mono">
                <span className="text-[#FACC15] font-bold">▲ PIN 001</span>
                <span className="text-slate-400">LGA DIE</span>
              </div>

              {installedSlots.cpu ? (
                <div className="flex flex-col items-center justify-center my-auto">
                  <Cpu className="w-8 h-8 text-[#4ADE80] animate-in zoom-in" />
                  <span className="text-[10px] font-mono font-bold text-white mt-1">CPU MOUNTED</span>
                  <span className="text-[8px] font-mono text-[#4ADE80]">13700H LOCKED</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-10 h-10 rounded border border-[#22C55E]/30 bg-[#04150F]/60 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-[#22C55E]/40 rounded-xs" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-[#FACC15] font-bold mt-1">
                    {activeItem === 'cpu' ? 'SNAP HERE' : 'CPU SOCKET'}
                  </span>
                </div>
              )}

              <div className="text-[8px] font-mono text-slate-400 text-center border-t border-[#22C55E]/20 pt-0.5">
                {installedSlots.cpu ? 'THERMAL INTERFACE OK' : 'READY TO SEAT'}
              </div>
            </div>

            {/* 2. RAM SO-DIMM SLOT (Top-Right) */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'ram')}
              onClick={() => handleSlotClick('ram')}
              className={`
                relative w-24 sm:w-28 h-36 sm:h-40 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col justify-between cursor-pointer
                ${installedSlots.ram 
                  ? 'border-[#22C55E] bg-[#0E3524] shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-snap' 
                  : activeItem === 'ram'
                    ? 'border-[#FACC15] bg-[#FACC15]/10 animate-amber-pulse'
                    : 'border-dashed border-[#22C55E]/40 bg-[#0B261B]/60 hover:border-[#4ADE80]'
                }
                ${wrongTarget === 'ram' ? 'animate-shake border-red-500' : ''}
              `}
            >
              <div className="flex justify-between items-start text-[9px] font-mono">
                <span className="text-[#4ADE80]">SLOT A1</span>
                <span className="text-slate-400">262-PIN</span>
              </div>

              {installedSlots.ram ? (
                <div className="flex flex-col items-center justify-center my-auto">
                  <Memory className="w-7 h-7 text-[#4ADE80] animate-in zoom-in" />
                  <span className="text-[9px] font-mono font-bold text-white mt-1">DDR5 LOCKED</span>
                  <span className="text-[8px] font-mono text-[#4ADE80]">5600 MT/s</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-4 h-14 border-y-2 border-[#22C55E]/40 flex items-center justify-center relative bg-[#04150F]/60">
                    <div className="w-1.5 h-1 bg-[#FACC15] rounded-xs" />
                  </div>
                  <span className="text-[9px] font-mono text-[#FACC15] font-bold mt-1">
                    {activeItem === 'ram' ? 'SNAP HERE' : 'RAM SLOT'}
                  </span>
                </div>
              )}

              <div className="text-[8px] font-mono text-slate-400 text-center border-t border-[#22C55E]/20 pt-0.5">
                DDR5 DUAL-CHANNEL
              </div>
            </div>

            {/* 3. M.2 NVMe SLOT (Bottom) */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'ssd')}
              onClick={() => handleSlotClick('ssd')}
              className={`
                relative w-44 sm:w-48 h-18 sm:h-20 rounded-xl border-2 transition-all duration-300 p-2 flex items-center justify-between cursor-pointer
                ${installedSlots.ssd 
                  ? 'border-[#22C55E] bg-[#0E3524] shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-snap' 
                  : activeItem === 'ssd'
                    ? 'border-[#FACC15] bg-[#FACC15]/10 animate-amber-pulse'
                    : 'border-dashed border-[#22C55E]/40 bg-[#0B261B]/60 hover:border-[#4ADE80]'
                }
                ${wrongTarget === 'ssd' ? 'animate-shake border-red-500' : ''}
              `}
            >
              {installedSlots.ssd ? (
                <div className="flex items-center gap-2.5 w-full">
                  <HardDrive className="w-6 h-6 text-[#4ADE80] shrink-0 animate-in zoom-in" />
                  <div>
                    <div className="text-[10px] font-mono font-bold text-white">NVMe GEN4 INSTALLED</div>
                    <div className="text-[8px] font-mono text-[#4ADE80]">PCIe 4.0 x4 LOCKED</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-7 border border-[#22C55E]/40 bg-[#04150F]/60 rounded flex items-center justify-center text-[8px] font-mono text-slate-400">
                      M.2 2280
                    </div>
                    <div>
                      <div className="text-[9px] font-mono font-bold text-[#FACC15]">
                        {activeItem === 'ssd' ? 'SNAP NVMe' : 'M.2 SSD SLOT'}
                      </div>
                      <div className="text-[8px] font-mono text-slate-400">PCIe Gen4 Key-M</div>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full border border-[#22C55E] flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#22C55E] rounded-full" />
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Side Diagnostic Telemetry Pinout */}
        <aside className="hidden lg:flex w-64 h-[250px] sm:h-[300px] lg:h-[320px] rounded-2xl bg-[#061710] border border-[#22C55E]/30 p-3.5 flex flex-col justify-between shrink-0 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-[#22C55E]/20 pb-2 mb-2">
              <span className="font-display font-semibold text-xs text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
                Diagnostic Pinout
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0A291A] text-[#4ADE80]">ONLINE</span>
            </div>

            <div className="space-y-2 text-[10px] font-mono">
              <div>
                <div className="flex justify-between text-slate-300">
                  <span>LGA Pin Alignment</span>
                  <span className={installedSlots.cpu ? 'text-[#4ADE80] font-bold' : 'text-[#FACC15]'}>
                    {installedSlots.cpu ? 'Seated 100%' : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 mt-1 overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${installedSlots.cpu ? 'w-full bg-[#22C55E]' : 'w-1/3 bg-[#FACC15]'}`} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300">
                  <span>DDR5 SO-DIMM Bus</span>
                  <span className={installedSlots.ram ? 'text-[#4ADE80] font-bold' : 'text-[#FACC15]'}>
                    {installedSlots.ram ? 'Dual Channel' : 'Standby'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 mt-1 overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${installedSlots.ram ? 'w-full bg-[#22C55E]' : 'w-1/3 bg-[#FACC15]'}`} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300">
                  <span>NVMe Standoff Screw</span>
                  <span className={installedSlots.ssd ? 'text-[#4ADE80] font-bold' : 'text-[#FACC15]'}>
                    {installedSlots.ssd ? 'Torqued' : 'Open'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 mt-1 overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${installedSlots.ssd ? 'w-full bg-[#22C55E]' : 'w-1/3 bg-[#FACC15]'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Micro Tip */}
          <div className="p-2 rounded-lg bg-[#0A291A] border border-[#22C55E]/30 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-[#FACC15] shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-300 font-sans leading-tight">
              Align the gold corner triangle with Socket Pin 001 before locking the retaining arm.
            </p>
          </div>
        </aside>

      </div>

      {/* Bottom Component Inventory Tray */}
      <div className="shrink-0 pt-1">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto w-full">
          {inventoryItems.map((item) => {
            const isInstalled = installedSlots[item.id];
            const isPickedUp = activeItem === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                draggable={!isInstalled}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onClick={() => {
                  if (isInstalled) return;
                  setActiveItem(isPickedUp ? null : item.id);
                }}
                className={`
                  p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-all duration-200 select-none
                  ${isInstalled 
                    ? 'bg-[#061710]/40 border-slate-800 opacity-50 cursor-default' 
                    : isPickedUp 
                      ? 'bg-[#123827] border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.35)] -translate-y-1 cursor-grabbing' 
                      : 'bg-[#092217]/80 border-[#22C55E]/30 hover:border-[#4ADE80] hover:bg-[#0E3524] cursor-grab'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`
                    w-8 sm:w-9 h-8 sm:h-9 rounded-lg border flex items-center justify-center shrink-0
                    ${isInstalled ? 'bg-[#071F14] border-slate-800 text-slate-500' : isPickedUp ? 'bg-[#FACC15]/20 border-[#FACC15] text-[#FACC15]' : 'bg-[#0B2A1D] border-[#22C55E]/40 text-[#4ADE80]'}
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs sm:text-sm text-white">{item.name}</span>
                      <span className="text-[9px] font-mono px-1 rounded bg-[#22C55E]/20 text-[#4ADE80]">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans block leading-tight">
                      {isInstalled ? 'Installed in mainboard' : isPickedUp ? 'Picked up • Tap slot' : 'Click or drag'}
                    </span>
                  </div>
                </div>

                {isInstalled && (
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
