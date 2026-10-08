import React, { useState } from 'react';
import { 
  ArrowRight, X, Cpu, Battery, Fan, CircuitBoard, Wifi, Sparkles, 
  Layers, HardDrive, Zap, Box, ChevronRight, ChevronLeft 
} from 'lucide-react';
import { COMPONENTS } from '../../data/componentData';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * Icons mapping for component cards
 */
const ICON_MAP = {
  cpu: Cpu,
  gpu: Sparkles,
  ram: Layers,
  ssd: HardDrive,
  motherboard: CircuitBoard,
  battery: Battery,
  'cooling-fan': Fan,
  'wifi-card': Wifi,
};

/**
 * PAGE 3 — EXPLORE THE COMPONENTS (Clean Light Theme)
 * - 8 High-tech hardware cards on clean white surfaces with emerald accents
 * - Fits within 1 single viewport height with zero scrolling & bottom breathing room
 * - Interactive 3D Model inspect modal with full architecture dossier
 */
export default function ComponentLibrary({ onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCompId, setSelectedCompId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'working' | 'role'

  const activeComp = COMPONENTS.find(c => c.id === selectedCompId);
  const activeIdx = COMPONENTS.findIndex(c => c.id === selectedCompId);

  const handleNextComp = () => {
    const nextIdx = (activeIdx + 1) % COMPONENTS.length;
    setSelectedCompId(COMPONENTS[nextIdx].id);
  };

  const handlePrevComp = () => {
    const prevIdx = (activeIdx - 1 + COMPONENTS.length) % COMPONENTS.length;
    setSelectedCompId(COMPONENTS[prevIdx].id);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-between px-4 sm:px-8 max-w-7xl mx-auto py-2 sm:py-3 select-none">
      
      {/* ─── 1. PAGE HEADER ─── */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold mb-1 shadow-2xs">
          <Box className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive 3D Hardware Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Explore the Components
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5 max-w-xl mx-auto">
          Klik salah satu modul komponen untuk memutar model 3D dan mempelajari prinsip kerja perangkat keras laptop.
        </p>
      </div>

      {/* ─── 2. 8 COMPONENTS GRID (4 Columns x 2 Rows) ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-auto py-1">
        {COMPONENTS.map((comp) => {
          const Icon = ICON_MAP[comp.id] || Cpu;
          const isHovered = hoveredCard === comp.id;

          return (
            <div
              key={comp.id}
              onClick={() => {
                setSelectedCompId(comp.id);
                setActiveTab('overview');
              }}
              onMouseEnter={() => setHoveredCard(comp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              }}
              className={`
                group rounded-2xl bg-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none cursor-pointer
                border transition-all duration-200 shadow-2xs
                ${isHovered 
                  ? 'border-emerald-300 shadow-md ring-2 ring-emerald-500/10' 
                  : 'border-slate-200 hover:border-emerald-200'
                }
              `}
            >
              {/* Emerald top subtle strip */}
              <div 
                className={`
                  absolute top-0 left-0 right-0 h-[2.5px] bg-emerald-500 transition-opacity duration-200
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `} 
              />

              <div>
                {/* Top Header Row with Icon & 3D Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className={`
                      w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                      ${isHovered 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-50 text-emerald-700 border border-emerald-200/60 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    3D Model
                  </span>
                </div>

                {/* Component Title & Category */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {comp.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-600 block mt-0.5 font-medium">
                    {comp.category}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed line-clamp-2 mt-1 mb-2 font-normal">
                  {comp.description}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                <span className="text-[11px] font-mono text-emerald-600 font-semibold group-hover:underline flex items-center gap-1">
                  <span>Inspect 3D</span>
                </span>
                <ArrowRight 
                  className={`
                    w-3.5 h-3.5 text-emerald-600 transition-transform duration-200
                    ${isHovered ? 'translate-x-1' : 'translate-x-0'}
                  `} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 3. BOTTOM FOOTER PROMPT ─── */}
      <div className="pb-3 text-center shrink-0">
        <p className="text-xs font-sans text-slate-500">
          Siap menguji pengetahuan hardware Anda?{' '}
          <button
            onClick={() => onNavigate('challenge-lab')}
            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 group transition-colors ml-1"
          >
            <span>Buka Challenge Lab Hub</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </p>
      </div>

      {/* ─── 3D COMPONENT INSPECTOR & TECHNICAL DOSSIER MODAL ─── */}
      {activeComp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCompId(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
                  {activeIdx + 1 < 10 ? `0${activeIdx + 1}` : activeIdx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                      HARDWARE DOSSIER
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      {activeComp.category}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    {activeComp.fullName} ({activeComp.name})
                  </h2>
                </div>
              </div>

              {/* Navigation & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevComp}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  title="Previous Component"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextComp}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  title="Next Component"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedCompId(null)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-red-300 text-slate-400 hover:text-red-500 transition-colors ml-2 shadow-2xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: 3D Model WebGL Canvas */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-200 p-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-2 border-b border-slate-200">
                  <span className="text-emerald-700 font-semibold">3D DIGITAL TWIN VIEWER</span>
                  <span className="text-slate-500 font-medium">ORBIT ENABLED</span>
                </div>

                {/* Three.js 3D Viewport */}
                <div className="my-2 flex-1 min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden bg-white border border-slate-200/80">
                  <Component3DViewer 
                    type={activeComp.threeType} 
                    heightClass="h-[220px] sm:h-[260px] lg:h-[280px]" 
                  />
                </div>

                {/* VR Teardown Tip */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 font-sans leading-relaxed shadow-2xs">
                  <span className="text-emerald-700 font-mono font-bold block mb-0.5">3D INSPECTION TIP:</span>
                  {activeComp.details.vrInsight}
                </div>
              </div>

              {/* Right Column: Detailed Explanation Tabs */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'specs', label: 'Specifications' },
                    { id: 'working', label: 'How It Works' },
                    { id: 'role', label: 'Laptop Impact' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        text-xs font-mono py-1.5 px-3 rounded-lg transition-all duration-150
                        ${activeTab === tab.id
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-1 font-semibold">
                        Peran Komputasi
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {activeComp.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-teal-700 mb-1 font-semibold">
                        Arsitektur Mikro
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {activeComp.details.architecture}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs font-sans text-slate-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Key Metrics: <span className="text-emerald-700 font-bold">{activeComp.specsHighlight}</span></span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Specifications Matrix */}
                {activeTab === 'specs' && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(activeComp.details.specs).map(([specKey, specVal], idx) => (
                        <div 
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                        >
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                            {specKey}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold font-display text-slate-800 mt-0.5">
                            {specVal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Working Principle */}
                {activeTab === 'working' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-2 font-semibold flex items-center gap-2">
                        <CircuitBoard className="w-4 h-4 text-emerald-600" />
                        <span>Prinsip Kerja & Operasi Elektrikal</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {activeComp.details.workingPrinciple}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 4: Laptop Impact */}
                {activeTab === 'role' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-2 font-semibold flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-amber-600" />
                        <span>Dampak Performa Pada Laptop Modern</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {activeComp.details.laptopRole}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Pagination Info */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-3 text-[11px] font-mono text-slate-500">
                  <span>Komponen {activeIdx + 1} dari {COMPONENTS.length}</span>
                  <span className="text-emerald-700 font-semibold">Gunakan panah untuk beralih</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
