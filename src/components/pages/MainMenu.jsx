import React from 'react';
import { Laptop, Cpu, BookOpen, Info, ArrowRight, Sparkles, Compass } from 'lucide-react';
import Button from '../common/Button';

export default function MainMenu({ onNavigate }) {
  const menuOptions = [
    {
      id: 'laptop-selection',
      title: 'Explore Laptop',
      badge: 'Interactive Explorer',
      description: 'Choose from different laptop categories to investigate internal hardware architectures and engineering designs.',
      icon: Laptop,
      color: '#38BDF8',
      buttonText: 'Launch Explorer',
      stats: '3 Hardware Tiers'
    },
    {
      id: 'component-library',
      title: 'Component Library',
      badge: 'Reference Database',
      description: 'Explore the complete internal component registry including CPU, GPU, RAM, SSD, cooling systems, and motherboards.',
      icon: Cpu,
      color: '#818CF8',
      buttonText: 'Open Library',
      stats: '8 Core Components'
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      badge: 'Step-by-step',
      description: 'Understand the three simple stages of the educational VR exploration flow from selection to component testing.',
      icon: BookOpen,
      color: '#34D399',
      buttonText: 'View Guide',
      stats: '3 Easy Steps'
    },
    {
      id: 'about',
      title: 'About',
      badge: 'Project Info',
      description: 'Discover the educational mission, background, target audience, and future VR roadmap of Laptop Anatomy VR.',
      icon: Info,
      color: '#F472B6',
      buttonText: 'Read Details',
      stats: 'UTS Project 2026'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#172033] border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>MAIN NAVIGATION HUB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F8FAFC] tracking-tight mb-3">
            Main Menu
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto font-sans">
            Select a module below to begin discovering laptop internals and architectural specifications.
          </p>
        </div>

        {/* 4 Interactive Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {menuOptions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative p-7 rounded-2xl cyber-card flex flex-col justify-between cursor-pointer border border-[#38BDF8]/20 hover:border-[#38BDF8]/60 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow accent */}
                <div 
                  className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: item.color }}
                />

                <div>
                  {/* Top Bar with Icon and Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: '#111827',
                        border: `1px solid ${item.color}40`,
                        color: item.color
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0B1020] border border-slate-800 text-slate-300 block">
                        {item.stats}
                      </span>
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-3">
                    <span 
                      className="text-xs font-mono uppercase tracking-wider block mb-1"
                      style={{ color: item.color }}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                    Click to enter module
                  </span>
                  <div 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-display transition-transform group-hover:translate-x-1"
                    style={{ color: item.color }}
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to Landing Page CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('landing')}
          >
            ← Return to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
