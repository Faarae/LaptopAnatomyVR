import React, { useState } from 'react';
import { Cpu, MemoryStick as Memory, HardDrive, CheckCircle2, Info, ShieldCheck, Sparkles, Box } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * DragPlaceGame
 * Mini-game 03: Interactive 3D Motherboard Assembly Workbench.
 * Features 3D hardware assets for inventory modules, interactive 3D seated sockets,
 * and real-time 3D mounting telemetry previews.
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
      threeType: 'cpu',
    },
    {
      id: 'ram',
      name: '16GB DDR5',
      tag: '5600MT/s',
      desc: 'Dual-Rank • 1.1V Ultra Low Power',
      socketName: 'SO-DIMM Slot A1',
      threeType: 'ram',
    },
    {
      id: 'ssd',
      name: '1TB NVMe Gen4',
      tag: 'PCIe 4.0',
      desc: '7000 MB/s Read • M.2 2280 Key-M',
      socketName: 'M.2 NVMe Slot',
      threeType: 'ssd',
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
    <div className="w-full h-full max-w-6xl mx-auto px-4 py-1.5 flex flex-col justify-between select-none">
      
      {/* Top Banner & Quick Progress */}
      <div className="flex items-center justify-between shrink-0 mb-1.5">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
            Mount each 3D component into its designated motherboard socket
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Drag a 3D component asset or click to inspect, then mount onto the highlighted mainboard socket.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs font-mono text-xs text-emerald-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{installedCount} / 3 INSTALLED</span>
        </div>
      </div>

      {/* Main Workbench Stage (Motherboard PCB Stage & 3D Diagnostic Panel) */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-between gap-4 my-auto">
        
        {/* Left Workbench: Realistic Motherboard PCB */}
        <div className="relative flex-1 h-[265px] sm:h-[305px] lg:h-[325px] rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-4 flex items-center justify-center overflow-hidden shadow-sm">
          
          {/* PCB Grid & Trace Lines */}
          <div className="absolute inset-0 cyber-circuit-grid opacity-10 pointer-events-none" />
          
          {/* Mainboard Rev Tag */}
          <div className="absolute top-2.5 left-3.5 flex items-center gap-2 text-[10px] font-mono text-emerald-700 font-medium z-10">
            <span className="font-bold">X-SERIES PRO // MAINBOARD REV 3.2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-500">AUTHENTIC PCB LAYOUT</span>
          </div>

          {/* Motherboard Physical Board Container */}
          <div className="relative w-full max-w-2xl h-[245px] sm:h-[275px] rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 border-2 border-slate-300/80 p-3 shadow-inner overflow-hidden select-none">
            
            {/* Printed PCB Copper Traces (Connecting CPU to RAM & SSD) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <path d="M 180 80 L 320 80 L 350 50" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <path d="M 180 110 L 260 110 L 300 170 L 350 170" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <path d="M 80 160 L 80 200 L 160 200" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
              <circle cx="80" cy="160" r="2.5" fill="#8b5cf6" />
              <circle cx="350" cy="50" r="2.5" fill="#f59e0b" />
              <circle cx="350" cy="170" r="2.5" fill="#10b981" />
            </svg>

            {/* Rear I/O Ports Mockup (Top-Left Edge) */}
            <div className="absolute top-7 left-2 flex flex-col gap-1 p-1 rounded bg-slate-200/70 border border-slate-300 text-[8px] font-mono text-slate-500">
              <span>USB-C</span>
              <span>HDMI</span>
            </div>

            {/* ── 1. CPU SOCKET (Top-Left / Center Position) ── */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'cpu')}
              onClick={() => handleSlotClick('cpu')}
              className={`
                absolute top-7 left-12 sm:left-16 w-36 sm:w-40 h-36 sm:h-40 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col justify-between cursor-pointer overflow-hidden z-20
                ${installedSlots.cpu 
                  ? 'border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-300/50' 
                  : activeItem === 'cpu'
                    ? 'border-amber-400 bg-amber-50/90 ring-4 ring-amber-300/50 animate-amber-pulse scale-105 shadow-lg'
                    : 'border-dashed border-slate-300 bg-white/95 hover:border-emerald-500 hover:bg-emerald-50/40 shadow-xs'
                }
                ${wrongTarget === 'cpu' ? 'animate-shake border-rose-400 bg-rose-50' : ''}
              `}
            >
              <div className="flex justify-between items-start text-[9px] font-mono relative z-10 font-bold">
                <span className="text-amber-700">▲ PIN 001</span>
                <span className="text-emerald-700">LGA-1700 SOKET</span>
              </div>

              {installedSlots.cpu ? (
                /* 3D CPU MOUNTED */
                <div className="relative w-full h-24 my-auto">
                  <Component3DViewer type="cpu" heightClass="h-24" className="border-0 bg-transparent shadow-none" autoRotateSpeed={1.5} />
                  <div className="absolute bottom-0 inset-x-0 text-center bg-white/95 border border-emerald-200 shadow-xs rounded py-0.5">
                    <span className="text-[9px] font-mono font-bold text-emerald-700">3D CPU SEATED ✓</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-11 h-11 rounded border border-slate-300 bg-slate-50 grid grid-cols-3 grid-rows-3 p-1 gap-1 shadow-inner">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-amber-400/40 rounded-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-800 font-bold mt-1">
                    {activeItem === 'cpu' ? '▼ TARUH CPU DI SINI ▼' : 'SOKET CPU'}
                  </span>
                </div>
              )}

              <div className="text-[8px] font-mono text-slate-500 text-center border-t border-slate-200 pt-0.5 relative z-10 font-semibold">
                {installedSlots.cpu ? 'THERMAL LOCKED' : 'BGA/LGA INTERFACE'}
              </div>
            </div>

            {/* ── 2. SO-DIMM RAM SLOT (Top-Right Position) ── */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'ram')}
              onClick={() => handleSlotClick('ram')}
              className={`
                absolute top-7 right-3 sm:right-6 w-44 sm:w-52 h-22 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col justify-between cursor-pointer overflow-hidden z-20
                ${installedSlots.ram 
                  ? 'border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-300/50' 
                  : activeItem === 'ram'
                    ? 'border-amber-400 bg-amber-50/90 ring-4 ring-amber-300/50 animate-amber-pulse scale-105 shadow-lg'
                    : 'border-dashed border-slate-300 bg-white/95 hover:border-emerald-500 hover:bg-emerald-50/40 shadow-xs'
                }
                ${wrongTarget === 'ram' ? 'animate-shake border-rose-400 bg-rose-50' : ''}
              `}
            >
              <div className="flex justify-between items-start text-[9px] font-mono relative z-10 font-bold">
                <span className="text-emerald-700">SO-DIMM SLOT A1</span>
                <span className="text-slate-500">262-PIN DDR5</span>
              </div>

              {installedSlots.ram ? (
                /* 3D RAM MOUNTED */
                <div className="relative w-full h-14 my-auto">
                  <Component3DViewer type="ram" heightClass="h-14" className="border-0 bg-transparent shadow-none" autoRotateSpeed={1.5} />
                  <div className="absolute bottom-0 inset-x-0 text-center bg-white/95 border border-emerald-200 shadow-xs rounded py-0.2">
                    <span className="text-[9px] font-mono font-bold text-emerald-700">DDR5 LOCKED ✓</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between px-2 my-auto">
                  <div className="w-2 h-7 bg-slate-300 rounded-xs" />
                  <div className="flex-1 mx-2 h-4 border-y-2 border-slate-300 flex items-center justify-center bg-slate-100 rounded-xs">
                    <span className="text-[9px] font-mono text-slate-800 font-bold">
                      {activeItem === 'ram' ? '▼ TARUH RAM DI SINI ▼' : '262-PIN KEYWAY'}
                    </span>
                  </div>
                  <div className="w-2 h-7 bg-slate-300 rounded-xs" />
                </div>
              )}

              <div className="text-[8px] font-mono text-slate-500 text-center border-t border-slate-200 pt-0.5 relative z-10 font-semibold">
                {installedSlots.ram ? 'DUAL-CHANNEL ACTIVE' : 'LATCH EJECTION READY'}
              </div>
            </div>

            {/* ── 3. M.2 NVMe SSD SLOT (Bottom-Right Position) ── */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'ssd')}
              onClick={() => handleSlotClick('ssd')}
              className={`
                absolute bottom-4 right-3 sm:right-6 w-44 sm:w-52 h-20 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col justify-between cursor-pointer overflow-hidden z-20
                ${installedSlots.ssd 
                  ? 'border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-300/50' 
                  : activeItem === 'ssd'
                    ? 'border-amber-400 bg-amber-50/90 ring-4 ring-amber-300/50 animate-amber-pulse scale-105 shadow-lg'
                    : 'border-dashed border-slate-300 bg-white/95 hover:border-emerald-500 hover:bg-emerald-50/40 shadow-xs'
                }
                ${wrongTarget === 'ssd' ? 'animate-shake border-rose-400 bg-rose-50' : ''}
              `}
            >
              <div className="flex justify-between items-start text-[9px] font-mono relative z-10 font-bold">
                <span className="text-teal-700">M.2 NVMe PCIe 4.0</span>
                <span className="text-slate-500">KEY-M 2280</span>
              </div>

              {installedSlots.ssd ? (
                /* 3D SSD MOUNTED */
                <div className="relative w-full h-12 my-auto">
                  <Component3DViewer type="ssd" heightClass="h-12" className="border-0 bg-transparent shadow-none" autoRotateSpeed={1.5} />
                  <div className="absolute bottom-0 inset-x-0 text-center bg-white/95 border border-emerald-200 shadow-xs rounded py-0.2">
                    <span className="text-[9px] font-mono font-bold text-emerald-700">NVMe FIXED ✓</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between px-2 my-auto">
                  <div className="w-4 h-5 bg-amber-400/30 border border-amber-400 rounded-xs" />
                  <span className="text-[9px] font-mono text-slate-800 font-bold">
                    {activeItem === 'ssd' ? '▼ TARUH NVMe DI SINI ▼' : 'M.2 STANDOFF 80mm'}
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-200 flex items-center justify-center text-[7px]">✛</div>
                </div>
              )}

              <div className="text-[8px] font-mono text-slate-500 text-center border-t border-slate-200 pt-0.5 relative z-10 font-semibold">
                {installedSlots.ssd ? 'PCIe Gen4 x4 TORQUED' : 'STANDOFF SCREW READY'}
              </div>
            </div>

            {/* Motherboard Silkscreen Decorative Elements (Bottom-Left) */}
            <div className="absolute bottom-4 left-12 sm:left-16 flex items-center gap-3">
              {/* Chipset PCH Heatsink */}
              <div className="w-20 h-12 rounded-lg bg-slate-200 border border-slate-300/80 p-1 flex flex-col justify-between shadow-xs">
                <span className="text-[7px] font-mono text-slate-500 font-bold">CHIPSET PCH</span>
                <div className="grid grid-cols-4 gap-0.5 h-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-slate-300 rounded-2xs" />
                  ))}
                </div>
              </div>
              {/* CMOS Coin Battery */}
              <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center text-[7px] font-mono text-slate-600 font-bold shadow-2xs">
                CR2032
              </div>
            </div>

          </div>

        </div>

        {/* Right Side Diagnostic Telemetry Pinout */}
        <aside className="hidden lg:flex w-64 h-[265px] sm:h-[305px] lg:h-[325px] rounded-2xl bg-white border border-slate-200/90 p-3.5 flex flex-col justify-between shrink-0 shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
              <span className="font-display font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                3D Asset Telemetry
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">ONLINE</span>
            </div>

            {activeItem ? (
              <div className="flex flex-col gap-1.5 my-1 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-700 font-bold">3D ASSET INSPECTOR:</span>
                  <span className="text-emerald-700 font-bold uppercase">{activeItem}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-1 border border-slate-200">
                  <Component3DViewer type={activeItem} heightClass="h-[120px]" autoRotateSpeed={2.0} />
                </div>
                <span className="text-[9px] font-mono text-slate-600 text-center block font-semibold">
                  Tarik atau klik soket motherboard yang menyala!
                </span>
              </div>
            ) : (
              <div className="space-y-2 text-[10px] font-mono">
                <div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>3D CPU Die Alignment</span>
                    <span className={installedSlots.cpu ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                      {installedSlots.cpu ? 'Seated 100%' : 'Pending'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${installedSlots.cpu ? 'w-full bg-emerald-500' : 'w-1/3 bg-amber-400'}`} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>3D DDR5 SO-DIMM Bus</span>
                    <span className={installedSlots.ram ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                      {installedSlots.ram ? 'Dual Channel' : 'Standby'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${installedSlots.ram ? 'w-full bg-emerald-500' : 'w-1/3 bg-amber-400'}`} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>3D NVMe Standoff Screw</span>
                    <span className={installedSlots.ssd ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                      {installedSlots.ssd ? 'Torqued' : 'Open'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${installedSlots.ssd ? 'w-full bg-emerald-500' : 'w-1/3 bg-amber-400'}`} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Micro Tip */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-600 font-sans leading-tight">
              Sejajarkan notch dan kunci fisik sebelum memasang modul hardware ke soket motherboard.
            </p>
          </div>
        </aside>

      </div>

      {/* Bottom Component Inventory Tray with Prominent Visible 3D Assets */}
      <div className="shrink-0 pt-1">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto w-full">
          {inventoryItems.map((item) => {
            const isInstalled = installedSlots[item.id];
            const isPickedUp = activeItem === item.id;

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
                  p-2 sm:p-2.5 rounded-2xl border flex items-center justify-between transition-all duration-200 select-none shadow-xs
                  ${isInstalled 
                    ? 'bg-slate-100/80 border-slate-200 opacity-60 cursor-default' 
                    : isPickedUp 
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300/50 -translate-y-1 cursor-grabbing shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-grab'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Prominent Large 3D Asset Badge */}
                  <div className={`
                    w-16 h-16 sm:w-20 sm:h-20 rounded-xl border overflow-hidden shrink-0 flex items-center justify-center relative
                    ${isInstalled ? 'bg-slate-100 border-slate-200' : isPickedUp ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300' : 'bg-slate-50/80 border-slate-200'}
                  `}>
                    <Component3DViewer 
                      type={item.threeType} 
                      heightClass="h-16 sm:h-20" 
                      className="border-0 bg-transparent shadow-none" 
                      autoRotateSpeed={1.8} 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs sm:text-sm text-slate-900">{item.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-sans block leading-tight mt-0.5">
                      {isInstalled ? '✓ Terpasang pada soket' : isPickedUp ? 'Dipilih! Klik soket di motherboard' : '3D Aset • Tarik atau Klik'}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-700 block mt-0.5 font-medium">
                      {item.desc}
                    </span>
                  </div>
                </div>

                {isInstalled && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
