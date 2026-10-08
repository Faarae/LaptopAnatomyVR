import React, { useState } from 'react';
import { ArrowRight, Sparkles, Cpu, Wind, Layers, CheckCircle2 } from 'lucide-react';
import { LAPTOPS } from '../../data/laptopData';

/**
 * PAGE: Choose Your Laptop
 * Re-designed with clean modern Light Theme:
 * - Crisp white cards with soft diffused shadows
 * - Real rendered 3D product imagery paired with spec tags
 * - 1-page viewport fit with zero scrolling & comfortable bottom clearance
 * - Emerald green as accent highlights
 */
export default function LaptopSelection({ onSelectLaptop, onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-between px-4 sm:px-8 max-w-7xl mx-auto py-2 sm:py-3 select-none">
      
      {/* ─── 1. PAGE HEADER (Compact single-line title & description) ─── */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold mb-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive 3D Teardown Lab</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Choose Your Laptop Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1 max-w-xl mx-auto">
          Pilih tipe laptop untuk membedah susunan komponen motherboard, cooling chamber, dan chip silikon secara interaktif.
        </p>
      </div>

      {/* ─── 2. LAPTOP CARDS (3 Columns, clean white cards with product imagery) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch my-auto py-1">
        {LAPTOPS.map((laptop) => {
          const isHovered = hoveredCard === laptop.id;
          const isGaming = laptop.id === 'laptop-b';

          return (
            <div
              key={laptop.id}
              onMouseEnter={() => setHoveredCard(laptop.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden
                ${isGaming
                  ? 'border-emerald-300 shadow-md ring-2 ring-emerald-500/10 hover:shadow-xl hover:border-emerald-400'
                  : 'border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-lg'
                }
              `}
              style={{
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Card Header & Image Showcase */}
              <div className="p-3 pb-0">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group-hover:border-slate-200 transition-colors">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-white/90 text-slate-800 shadow-xs">
                      {laptop.category}
                    </span>
                  </div>

                  {/* Popular Badge for Gaming Laptop */}
                  {isGaming && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                        <span>★</span> POPULAR
                      </span>
                    </div>
                  )}

                  {/* Alias Overlay at bottom of image */}
                  <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-white">
                    <span className="text-xs font-mono font-semibold tracking-wide drop-shadow-sm">
                      {laptop.alias}
                    </span>
                    <span className="text-[10px] font-mono opacity-80 bg-black/40 px-1.5 py-0.5 rounded">
                      {laptop.code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {laptop.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                    {laptop.description}
                  </p>

                  {/* Spec Quick Chips */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                      <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{laptop.specs.cpu.split(' ')[0]} CPU</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                      <Wind className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{laptop.specs.cooling.split('+')[0]}</span>
                    </div>
                  </div>

                  {/* Anatomy Highlights */}
                  <div className="mt-2.5 space-y-1">
                    {laptop.anatomyFocus.slice(0, 2).map((point, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => onSelectLaptop(laptop.id)}
                    className={`
                      w-full py-2.5 px-4 rounded-xl font-display text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn
                      ${isGaming || isHovered
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-[0.99]'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200'
                      }
                    `}
                  >
                    <span>Dissect Inside</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ─── 3. BOTTOM FOOTER PROMPT (With safe bottom clearance) ─── */}
      <div className="pb-3 text-center shrink-0">
        <p className="text-xs font-sans text-slate-500">
          Ingin mempelajari spesifikasi komponen individual terlebih dahulu?{' '}
          <button
            onClick={() => onNavigate('component-library')}
            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 group transition-colors ml-1"
          >
            <span>Buka Ensiklopedia Komponen</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </p>
      </div>

    </div>
  );
}
