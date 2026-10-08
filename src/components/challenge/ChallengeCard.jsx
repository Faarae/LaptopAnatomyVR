import React from 'react';
import { 
  HelpCircle, Shuffle, Move, Search, Timer, ShieldCheck, ArrowRight 
} from 'lucide-react';

/**
 * ChallengeCard (Clean Light Theme)
 * Friendly hardware challenge card with crisp white surface, soft shadows,
 * emerald accent highlights, and smooth selected indicator.
 */
export default function ChallengeCard({
  id,
  number,
  title,
  category,
  badge,
  description,
  iconType,
  isSelected = false,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect?.(id)}
      style={{
        transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
      }}
      className={`
        group relative rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-all duration-200
        ${isSelected 
          ? 'bg-emerald-50/70 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/10' 
          : 'bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50/60 shadow-2xs hover:shadow-md'
        }
      `}
    >
      {/* Top Accent Strip for Selected Card */}
      {isSelected && (
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-emerald-500" />
      )}

      {/* Top Header: Number, Title & Status */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-emerald-700">
            [{number}]
          </span>
          <h3 className={`font-display font-bold text-xs sm:text-sm tracking-wide transition-colors ${isSelected ? 'text-emerald-900' : 'text-slate-800 group-hover:text-emerald-700'}`}>
            {title}
          </h3>
        </div>

        {/* Selected / Standby status badge */}
        <div className="flex items-center gap-1 font-mono text-[9px]">
          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className={`uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-100/90 text-emerald-800' : 'text-slate-400 bg-slate-100'}`}>
            {isSelected ? 'ACTIVE' : 'READY'}
          </span>
        </div>
      </div>

      {/* Middle Body: Icon & Description */}
      <div className="flex items-start gap-2.5 my-1">
        {/* Icon Pod */}
        <div className={`
          w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200
          ${isSelected 
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
            : 'bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-100'
          }
        `}>
          {iconType === 'quiz' && <HelpCircle className="w-4 h-4" />}
          {iconType === 'match' && <Shuffle className="w-4 h-4" />}
          {iconType === 'drag' && <Move className="w-4 h-4" />}
          {iconType === 'find' && <Search className="w-4 h-4" />}
          {iconType === 'speed' && <Timer className="w-4 h-4" />}
          {iconType === 'identify' && <ShieldCheck className="w-4 h-4" />}
        </div>

        {/* Text Description */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-slate-500 font-sans leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Footer: Category & Preview Action */}
      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 mt-1 text-[10px] font-mono">
        <span className="text-slate-600 uppercase tracking-wider font-semibold">
          {category}
        </span>

        <div className={`flex items-center gap-1 font-semibold transition-colors ${isSelected ? 'text-emerald-700' : 'text-slate-400 group-hover:text-emerald-600'}`}>
          <span>{isSelected ? 'PREVIEWING' : 'PREVIEW'}</span>
          <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
        </div>
      </div>

    </div>
  );
}
