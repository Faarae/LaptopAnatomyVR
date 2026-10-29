import React from 'react';
import { ArrowRight } from 'lucide-react';

const THEME_STYLES = {
  emerald: {
    topBar: 'from-emerald-500 to-teal-500',
    numActive: 'bg-emerald-600 text-white shadow-2xs',
    numIdle: 'bg-emerald-50 border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
    cardActive: 'bg-emerald-50/45 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10',
    cardHover: 'hover:border-emerald-400',
    catText: 'text-emerald-700',
  },
  violet: {
    topBar: 'from-violet-500 to-purple-500',
    numActive: 'bg-violet-600 text-white shadow-2xs',
    numIdle: 'bg-violet-50 border-violet-200 text-violet-700 group-hover:bg-violet-600 group-hover:text-white',
    cardActive: 'bg-violet-50/45 border-2 border-violet-500 ring-2 ring-violet-500/20 shadow-lg shadow-violet-500/10',
    cardHover: 'hover:border-violet-400',
    catText: 'text-violet-700',
  },
  amber: {
    topBar: 'from-amber-500 to-orange-500',
    numActive: 'bg-amber-500 text-white shadow-2xs',
    numIdle: 'bg-amber-50 border-amber-200 text-amber-700 group-hover:bg-amber-500 group-hover:text-white',
    cardActive: 'bg-amber-50/45 border-2 border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10',
    cardHover: 'hover:border-amber-400',
    catText: 'text-amber-700',
  },
  teal: {
    topBar: 'from-teal-500 to-cyan-500',
    numActive: 'bg-teal-600 text-white shadow-2xs',
    numIdle: 'bg-teal-50 border-teal-200 text-teal-700 group-hover:bg-teal-600 group-hover:text-white',
    cardActive: 'bg-teal-50/45 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10',
    cardHover: 'hover:border-teal-400',
    catText: 'text-teal-700',
  },
  rose: {
    topBar: 'from-rose-500 to-pink-500',
    numActive: 'bg-rose-600 text-white shadow-2xs',
    numIdle: 'bg-rose-50 border-rose-200 text-rose-700 group-hover:bg-rose-600 group-hover:text-white',
    cardActive: 'bg-rose-50/45 border-2 border-rose-500 ring-2 ring-rose-500/20 shadow-lg shadow-rose-500/10',
    cardHover: 'hover:border-rose-400',
    catText: 'text-rose-700',
  },
  purple: {
    topBar: 'from-purple-500 to-indigo-500',
    numActive: 'bg-purple-600 text-white shadow-2xs',
    numIdle: 'bg-purple-50 border-purple-200 text-purple-700 group-hover:bg-purple-600 group-hover:text-white',
    cardActive: 'bg-purple-50/45 border-2 border-purple-500 ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/10',
    cardHover: 'hover:border-purple-400',
    catText: 'text-purple-700',
  },
};

/**
 * ChallengeCard — Vibrant Tactile Interactive Module Selector Card
 * - Active state features glowing border & blinking green pulse dot indicator
 * - Color-coded square number badge + Radiant Gold XP reward tag
 */
export default function ChallengeCard({
  id,
  number,
  title,
  category,
  xpReward = '+500 XP',
  theme = 'emerald',
  description,
  isSelected = false,
  onSelect,
}) {
  const t = THEME_STYLES[theme] || THEME_STYLES.emerald;

  return (
    <div
      onClick={() => onSelect?.(id)}
      data-sfx="click"
      className={`
        group relative rounded-xl p-3.5 flex flex-col justify-between cursor-pointer select-none overflow-hidden
        transition-all duration-200 active:scale-[0.98]
        ${
          isSelected
            ? `${t.cardActive} text-slate-900`
            : `bg-white border border-slate-200 ${t.cardHover} hover:-translate-y-0.5 hover:shadow-md text-slate-800 shadow-2xs`
        }
      `}
    >
      {/* Top Gradient Accent Bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.topBar} ${
          isSelected ? 'opacity-100' : 'opacity-65 group-hover:opacity-100'
        } transition-opacity`}
      />

      {/* Top Header: Color-Coded Square Number Badge, Title, Gold XP & Blinking Pulse Indicator */}
      <div
        className={`flex items-center justify-between border-b pb-2 mb-1.5 pt-0.5 ${
          isSelected ? 'border-slate-200/90' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-6 h-6 rounded-md border font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
              isSelected ? t.numActive : t.numIdle
            }`}
          >
            {number}
          </span>
          <h3 className="font-display font-bold text-xs sm:text-sm tracking-tight text-slate-900 truncate">
            {title}
          </h3>
        </div>

        {/* Gold XP Tag + Active Blinking Green Pulse Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-700 font-mono text-[9px] font-bold">
            {xpReward}
          </span>
          {isSelected ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-xs h-2.5 w-2.5 bg-emerald-500" />
            </span>
          ) : (
            <span className="h-2 w-2 rounded-xs bg-slate-200 group-hover:bg-emerald-400 transition-colors" />
          )}
        </div>
      </div>

      {/* Middle Description */}
      <div className="my-1">
        <p className="text-xs font-sans text-slate-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom Footer: Category & Preview Action */}
      <div
        className={`flex items-center justify-between pt-2 border-t mt-1 text-[10px] font-mono ${
          isSelected ? 'border-slate-200/90' : 'border-slate-100'
        }`}
      >
        <span className={`uppercase tracking-wider font-bold ${t.catText}`}>
          {category}
        </span>

        <div
          className={`flex items-center gap-1 font-bold transition-transform duration-200 group-hover:translate-x-1 ${
            isSelected ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-700'
          }`}
        >
          <span>{isSelected ? 'AKTIF' : 'COBA'}</span>
          <ArrowRight strokeWidth={2} className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
