import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LAPTOPS } from '../../data/laptopData';

/**
 * Edukasi VR — Eksplorasi Arsitektur Laptop
 * - Bright Futuristic Lab Tritone Category Accents (Teal Ultrabook, Emerald Gaming, Violet Creator) from DESKRIPSI_UI.md
 * - Plain uppercase eyebrow text (no capsule pill)
 * - Standardized rounded-xl cards and rounded-lg buttons with p-4 / gap-6 spacing
 */
export default function LaptopSelection({ onSelectLaptop, onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCategoryTheme = (laptop) => {
    if (laptop.id === 'laptop-b' || laptop.category === 'Gaming') {
      return {
        borderHover: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10',
        badgeText: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        titleHover: 'group-hover:text-emerald-700',
        dotColor: 'bg-emerald-600',
        specAccent: 'text-emerald-700 bg-emerald-50/50 border-emerald-200/70',
        btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30',
      };
    }
    if (laptop.id === 'laptop-c' || laptop.category === 'Creator') {
      return {
        borderHover: 'hover:border-violet-500/60 hover:shadow-violet-500/10',
        badgeText: 'text-violet-700 bg-violet-50 border-violet-200',
        titleHover: 'group-hover:text-violet-700',
        dotColor: 'bg-violet-600',
        specAccent: 'text-violet-700 bg-violet-50/50 border-violet-200/70',
        btnClass: 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20 hover:shadow-lg hover:shadow-violet-500/30',
      };
    }
    return {
      borderHover: 'hover:border-teal-500/60 hover:shadow-teal-500/10',
      badgeText: 'text-teal-700 bg-teal-50 border-teal-200',
      titleHover: 'group-hover:text-teal-700',
      dotColor: 'bg-teal-600',
      specAccent: 'text-teal-700 bg-teal-50/50 border-teal-200/70',
      btnClass: 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-500/30',
    };
  };

  return (
    <div className="min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] lg:overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto py-4 pb-10 lg:py-5 gap-4 lg:gap-0 select-none">
      
      {/* 1. PAGE HEADER (Plain Eyebrow Text, No Capsule Pill) */}
      <div className="text-center pt-1 shrink-0">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
          Modul 01 • Edukasi Virtual Reality (3D Teardown Lab)
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Pilih Arsitektur Laptop
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1 max-w-xl mx-auto">
          Pilih kategori arsitektur untuk membedah tata letak motherboard, sistem termal, dan komponen silikon secara interaktif.
        </p>
      </div>

      {/* 2. LAPTOP CARDS (3 Columns, rounded-xl, gap-6, p-4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch my-auto py-1 sm:py-2">
        {LAPTOPS.map((laptop) => {
          const isHovered = hoveredCard === laptop.id;
          const theme = getCategoryTheme(laptop);

          return (
            <div
              key={laptop.id}
              onMouseEnter={() => setHoveredCard(laptop.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white rounded-xl border border-slate-200 ${theme.borderHover} shadow-2xs hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden`}
            >
              {/* Image Frame */}
              <div className="p-4 pb-0">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rectangular Category Label (rounded-md, NOT capsule) */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className={`px-2 py-1 rounded-md border text-[10px] font-mono font-bold tracking-wider uppercase shadow-2xs ${theme.badgeText}`}>
                      {laptop.category}
                    </span>
                  </div>

                  {/* Alias & Code Overlay */}
                  <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-white">
                    <span className="text-xs font-mono font-semibold tracking-wide">
                      {laptop.alias}
                    </span>
                    <span className="text-[10px] font-mono bg-black/55 px-1.5 py-0.5 rounded-md">
                      {laptop.code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-lg font-bold font-display text-slate-900 ${theme.titleHover} transition-colors`}>
                    {laptop.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                    {laptop.description}
                  </p>

                  {/* Structured Metadata Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className={`p-2 rounded-lg border ${ isHovered ? theme.specAccent : 'bg-slate-50 border-slate-200/80' } transition-colors`}>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Prosesor
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {laptop.specs.cpu.split(' ')[0]} {laptop.specs.cpu.split(' ')[1]}
                      </span>
                    </div>
                    <div className={`p-2 rounded-lg border ${ isHovered ? theme.specAccent : 'bg-slate-50 border-slate-200/80' } transition-colors`}>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Pendingin
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {laptop.specs.cooling.split('+')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Anatomy Focus List */}
                  <ul className="mt-3 space-y-1 border-t border-slate-100 pt-2.5">
                    {laptop.anatomyFocus.slice(0, 2).map((point, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-xs ${theme.dotColor} shrink-0`} />
                        <span className="truncate">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Action Button */}
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectLaptop(laptop.id)}
                    className={`w-full py-2.5 px-4 rounded-lg font-display text-xs sm:text-sm font-semibold active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${theme.btnClass}`}
                  >
                    <span>Bedah Arsitektur</span>
                    <ArrowRight strokeWidth={2} className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. BOTTOM NAVIGATION LINKS */}
      <div className="pb-2 flex flex-wrap items-center justify-center gap-6 text-center shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('component-library')}
          className="text-xs font-sans text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Buka Katalog 8 Komponen 3D</span>
          <span>→</span>
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={() => onNavigate('webar')}
          className="text-xs font-sans text-violet-700 hover:text-violet-800 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Buka Studio Kamera WebAR</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
