import React, { useState } from 'react';
import { ArrowLeft, Cpu, Sparkles, HardDrive, Fan, Battery, Layers, CheckCircle2, Sliders, Info, Box } from 'lucide-react';
import Model3DPlaceholder from '../placeholder3d/Model3DPlaceholder';
import { getLaptopById } from '../../data/laptopData';

export default function LaptopDetail({ laptopId, onNavigate }) {
  const laptop = getLaptopById(laptopId);
  const [activeTab, setActiveTab] = useState('viewport'); // 'viewport' | 'specs'

  const specItems = [
    { label: "Processor (CPU)", value: laptop.specs.cpu, icon: Cpu, accent: "#22C55E" },
    { label: "Graphics (GPU)", value: laptop.specs.gpu, icon: Sparkles, accent: "#FACC15" },
    { label: "System Memory (RAM)", value: laptop.specs.ram, icon: Layers, accent: "#4ADE80" },
    { label: "Storage (SSD NVMe)", value: laptop.specs.storage, icon: HardDrive, accent: "#22C55E" },
    { label: "Thermal Solution", value: laptop.specs.cooling, icon: Fan, accent: "#FACC15" },
    { label: "Battery Unit", value: laptop.specs.battery, icon: Battery, accent: "#4ADE80" },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-6 sm:px-10 lg:px-14 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Top Control Bar with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('laptop-selection')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0C2017] border border-slate-700/80 text-white text-xs font-display font-medium hover:border-[#22C55E] hover:text-[#4ADE80] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Laptops</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">{laptop.code} //</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30">
                  {laptop.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {laptop.name}
              </h1>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#081810] border border-slate-800">
            <button
              onClick={() => setActiveTab('viewport')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'viewport'
                  ? 'bg-[#0C2017] text-[#4ADE80] shadow-sm border border-[#22C55E]/40 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Viewport</span>
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'specs'
                  ? 'bg-[#0C2017] text-[#4ADE80] shadow-sm border border-[#22C55E]/40 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Full Specifications</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Placeholder Viewport (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Model3DPlaceholder 
              laptopName={laptop.name} 
              category={laptop.category} 
            />

            {/* Viewport Control Strip */}
            <div className="p-4 rounded-xl bg-[#0C2017]/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#FACC15]" />
                <span>Next Phase: Interactive Exploded View & Component Highlight</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-1 rounded bg-[#06130D] text-slate-500 border border-slate-800">
                  Controls Locked
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Anatomy (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Overview Card */}
            <div className="p-6 rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#4ADE80] uppercase tracking-wider font-semibold">
                  Hardware Profile
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#06130D] text-slate-300 border border-slate-800">
                  {laptop.alias}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {laptop.description}
              </p>

              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 font-semibold">
                Key Anatomy Highlights:
              </h4>
              <ul className="space-y-2 mb-2">
                {laptop.anatomyFocus.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Component Specs Breakdown */}
            <div className="p-6 rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/20">
              <h3 className="text-base font-display font-bold text-white mb-4 flex items-center justify-between">
                <span>Internal Component Specs</span>
                <span className="text-xs font-mono text-[#FACC15]">SPEC-SHEET</span>
              </h3>

              <div className="space-y-3.5">
                {specItems.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div 
                      key={index}
                      className="p-3 rounded-xl bg-[#06130D]/80 border border-slate-800/80 hover:border-[#22C55E]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <Icon className="w-3.5 h-3.5" style={{ color: spec.accent }} />
                        <span className="text-[11px] font-mono text-slate-400">
                          {spec.label}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 font-sans pl-6">
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
