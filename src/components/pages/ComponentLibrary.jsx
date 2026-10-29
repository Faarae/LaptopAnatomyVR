import React, { useState } from 'react';
import { ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { COMPONENTS } from '../../data/componentData';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * Edukasi VR — Katalog Komponen 3D
 * - Plain uppercase eyebrow text (no capsule pill)
 * - 8 structured hardware cards (rounded-xl, p-4, gap-4, no capsule badges)
 * - Modal uses rounded-xl and clean segmented controls without decorative icons
 */
export default function ComponentLibrary({ onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCompId, setSelectedCompId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'working' | 'role'
  const [modalVisualMode, setModalVisualMode] = useState('3d'); // '3d' | 'photo'

  const activeComp = COMPONENTS.find((c) => c.id === selectedCompId);
  const activeIdx = COMPONENTS.findIndex((c) => c.id === selectedCompId);

  const handleNextComp = () => {
    const nextIdx = (activeIdx + 1) % COMPONENTS.length;
    setSelectedCompId(COMPONENTS[nextIdx].id);
    setModalVisualMode('3d');
  };

  const handlePrevComp = () => {
    const prevIdx = (activeIdx - 1 + COMPONENTS.length) % COMPONENTS.length;
    setSelectedCompId(COMPONENTS[prevIdx].id);
    setModalVisualMode('3d');
  };

  return (
    <div className="min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] lg:overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto py-4 sm:py-5 gap-4 lg:gap-0 select-none">
      
      {/* 1. PAGE HEADER (Plain Eyebrow Text, No Capsule Pill) */}
      <div className="text-center pt-1 shrink-0">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
          Modul 01 • Edukasi Virtual Reality (Katalog Perangkat Keras)
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Katalog Komponen 3D
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1 max-w-xl mx-auto">
          Pilih salah satu modul perangkat keras untuk menginspeksi geometri 3D, foto fisik riil, dan prinsip kerjanya.
        </p>
      </div>

      {/* 2. 8 COMPONENTS GRID (Responsive 1 -> 2 -> 4 Columns, rounded-xl, p-4, gap-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 my-auto py-1 sm:py-2">
        {COMPONENTS.map((comp, idx) => {
          const isHovered = hoveredCard === comp.id;
          const accents = [
            { badge: 'bg-emerald-50 border-emerald-200 text-emerald-700', hoverBorder: 'hover:border-emerald-500/60', text: 'text-emerald-700' },
            { badge: 'bg-violet-50 border-violet-200 text-violet-700', hoverBorder: 'hover:border-violet-500/60', text: 'text-violet-700' },
            { badge: 'bg-amber-50 border-amber-200 text-amber-700', hoverBorder: 'hover:border-amber-500/60', text: 'text-amber-700' },
            { badge: 'bg-teal-50 border-teal-200 text-teal-700', hoverBorder: 'hover:border-teal-500/60', text: 'text-teal-700' },
          ];
          const acc = accents[idx % accents.length];

          return (
            <div
              key={comp.id}
              onClick={() => {
                setSelectedCompId(comp.id);
                setActiveTab('overview');
              }}
              onMouseEnter={() => setHoveredCard(comp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group rounded-xl bg-white p-4 flex flex-col justify-between relative overflow-hidden select-none cursor-pointer border border-slate-200 ${acc.hoverBorder} shadow-2xs hover:-translate-y-1.5 hover:shadow-xl active:scale-95 transition-all duration-300 ease-out`}
            >
              <div>
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${acc.badge}`}>
                    MODUL 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {comp.category}
                  </span>
                </div>

                {/* Component Title & Thumbnail */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {comp.name}
                  </h3>
                  {comp.image && (
                    <div className="w-8 h-8 rounded-md overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      <img
                        src={comp.image}
                        alt={comp.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2 mb-2">
                  {comp.description}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                <span className="text-xs font-sans font-semibold text-slate-700 group-hover:text-emerald-700">
                  Inspeksi 3D &amp; Spek
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-700 transition-transform duration-150 ${
                    isHovered ? 'translate-x-1' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. BOTTOM NAVIGATION PROMPT */}
      <div className="pb-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('laptop-selection')}
          className="text-xs font-sans text-slate-700 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>← Kembali ke Arsitektur Laptop</span>
        </button>
        <span className="text-slate-300 hidden sm:inline">|</span>
        <button
          type="button"
          onClick={() => onNavigate('challenge-lab')}
          className="text-xs font-sans text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>Uji Pemahaman di Challenge Lab →</span>
        </button>
      </div>

      {/* 4. 3D COMPONENT INSPECTOR MODAL (rounded-xl, Clean Segmented Controls) */}
      {activeComp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setSelectedCompId(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92dvh] rounded-xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Modul 0{activeIdx + 1} • {activeComp.category}
                </p>
                <h2 className="text-sm sm:text-lg font-bold font-display text-slate-900 truncate">
                  {activeComp.fullName} ({activeComp.name})
                </h2>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevComp}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Komponen Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextComp}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Komponen Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCompId(null)}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 transition-colors ml-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
              
              {/* Left Column: 3D Model or Real Photo */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {modalVisualMode === '3d' ? 'MODEL 3D INTERAKTIF' : 'FOTO FISIK RIIL'}
                  </span>
                  
                  {/* Clean Segmented Switcher (No Icons) */}
                  <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setModalVisualMode('3d')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        modalVisualMode === '3d'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      3D Model
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalVisualMode('photo')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        modalVisualMode === 'photo'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Foto Fisik
                    </button>
                  </div>
                </div>

                {/* Viewport */}
                <div className="my-3 flex-1 min-h-[220px] sm:min-h-[260px] rounded-lg overflow-hidden bg-white border border-slate-200 flex items-center justify-center relative">
                  {modalVisualMode === '3d' ? (
                    <Component3DViewer
                      type={activeComp.threeType}
                      heightClass="h-[220px] sm:h-[260px] lg:h-[280px]"
                    />
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={activeComp.image}
                        alt={activeComp.fullName}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {activeComp.imageName}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
                  <span className="text-slate-900 font-mono font-bold block mb-0.5">
                    {modalVisualMode === '3d' ? 'CATATAN INSPEKSI 3D:' : 'INFORMASI FISIK:'}
                  </span>
                  {modalVisualMode === '3d'
                    ? activeComp.details.vrInsight
                    : `Dokumentasi perangkat keras aktual: ${activeComp.fullName}.`}
                </div>
              </div>

              {/* Right Column: Detailed Explanation Tabs */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Segmented Navigation Tabs */}
                  <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 mb-4 w-full sm:w-auto">
                    {[
                      { id: 'overview', label: 'Ikhtisar' },
                      { id: 'specs', label: 'Spesifikasi' },
                      { id: 'working', label: 'Prinsip Kerja' },
                      { id: 'role', label: 'Peran Sistem' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-xs font-sans font-semibold py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                          Fungsi Komputasi
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                          {activeComp.description}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                          Arsitektur Mikro
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                          {activeComp.details.architecture}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800">
                        <span className="font-mono font-bold text-slate-500 uppercase block mb-0.5">
                          Parameter Utama
                        </span>
                        <span className="text-emerald-700 font-bold font-mono">
                          {activeComp.specsHighlight}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(activeComp.details.specs).map(([specKey, specVal], idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between"
                        >
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                            {specKey}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold font-display text-slate-900 mt-0.5">
                            {specVal}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'working' && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                        Prinsip Kerja &amp; Operasi Elektrikal
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        {activeComp.details.workingPrinciple}
                      </p>
                    </div>
                  )}

                  {activeTab === 'role' && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                        Dampak Performa Pada Laptop Modern
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        {activeComp.details.laptopRole}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Pagination Info */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-4 text-xs font-mono text-slate-500">
                  <span>
                    Modul {activeIdx + 1} dari {COMPONENTS.length}
                  </span>
                  <span>Gunakan tombol navigasi atas untuk beralih</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
