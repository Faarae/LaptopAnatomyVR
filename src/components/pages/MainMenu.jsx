import React from 'react';
import { Laptop, Cpu, BookOpen, Info, ArrowRight, Compass } from 'lucide-react';
import Button from '../common/Button';

export default function MainMenu({ onNavigate }) {
  const menuOptions = [
    {
      id: 'laptop-selection',
      title: 'Explore Laptop',
      badge: 'Interactive Explorer',
      description: 'Pilih tipe arsitektur laptop untuk membedah hardware internal dan desain pendinginan.',
      icon: Laptop,
      color: '#10B981', // Emerald
      buttonText: 'Buka Explorer',
      stats: '3 Model Laptop'
    },
    {
      id: 'component-library',
      title: 'Component Library',
      badge: 'Reference Database',
      description: 'Pelajari ensiklopedia perangkat keras internal termasuk CPU, GPU, RAM, SSD, dan motherboard.',
      icon: Cpu,
      color: '#0D9488', // Teal
      buttonText: 'Buka Library',
      stats: '8 Modul Komponen'
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      badge: 'Step-by-step',
      description: 'Pahami alur eksplorasi VR dalam tiga tahap praktis dari pemilihan hingga simulasi kuis.',
      icon: BookOpen,
      color: '#0284C7', // Sky
      buttonText: 'Lihat Panduan',
      stats: '3 Langkah Mudah'
    },
    {
      id: 'about',
      title: 'About',
      badge: 'Project Info',
      description: 'Informasi mengenai latar belakang pembuatan platform edukasi anatomi laptop berbasis 3D.',
      icon: Info,
      color: '#D97706', // Amber
      buttonText: 'Baca Info',
      stats: 'UTS VR 2026'
    }
  ];

  return (
    <div className="h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-between py-3 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none">
      
      {/* Header Section */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-1 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Navigasi Utama Platform</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Main Menu
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-sans mt-0.5">
          Pilih modul pembelajaran di bawah untuk memulai eksplorasi anatomi perangkat keras komputer.
        </p>
      </div>

      {/* 4 Interactive Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 my-auto py-1">
        {menuOptions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative p-5 sm:p-6 rounded-2xl bg-white flex flex-col justify-between cursor-pointer border border-slate-200/90 hover:border-emerald-300 transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-lg"
            >
              <div>
                {/* Top Bar with Icon and Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-2xs"
                    style={{ 
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}35`,
                      color: item.color
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {item.stats}
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="mb-1.5">
                  <span 
                    className="text-[10px] font-mono uppercase tracking-wider block font-semibold mb-0.5"
                    style={{ color: item.color }}
                  >
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-4 font-sans line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Card Action Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                  Klik untuk membuka modul
                </span>
                <div 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-display transition-transform group-hover:translate-x-1"
                  style={{ color: item.color }}
                >
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to Landing Page CTA (Safe bottom clearance) */}
      <div className="pb-2 text-center shrink-0">
        <button
          onClick={() => onNavigate('landing')}
          className="text-xs text-slate-500 hover:text-emerald-700 font-medium transition-colors"
        >
          ← Kembali ke Halaman Utama
        </button>
      </div>

    </div>
  );
}
