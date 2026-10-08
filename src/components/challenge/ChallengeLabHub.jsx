import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import ChallengeCard from './ChallengeCard';
import GamePreview from './GamePreview';

/**
 * 6 Tactical Challenge Modules Definitions
 */
export const CHALLENGES_LIST = [
  {
    id: 'quiz',
    number: '01',
    title: 'Quick Quiz',
    category: 'Q&A SYSTEM',
    badge: '20 QUESTIONS',
    description: 'Uji pemahaman Anda tentang prosesor utama, arsitektur bus, dan kontrol termal laptop.',
    iconType: 'quiz',
    difficulty: 'Adaptif',
    estimatedTime: '3-5 MENIT',
  },
  {
    id: 'match',
    number: '02',
    title: 'Match It',
    category: 'BUS INTERCONNECT',
    badge: '3D MATCHING',
    description: 'Hubungkan komponen perangkat keras dengan fungsi kerja komputasi dunia nyata.',
    iconType: 'match',
    difficulty: 'Menengah',
    estimatedTime: '2-3 MENIT',
  },
  {
    id: 'drag',
    number: '03',
    title: 'Drag & Place',
    category: 'ASSEMBLY BENCH',
    badge: 'INTERACTIVE SOCKETS',
    description: 'Pasang chip CPU, keping RAM, dan drive NVMe ke soket motherboard yang tepat.',
    iconType: 'drag',
    difficulty: 'Praktik',
    estimatedTime: '3-4 MENIT',
  },
  {
    id: 'find',
    number: '04',
    title: 'Find Component',
    category: 'SPATIAL LOCATOR',
    badge: '3D PCB SCANNER',
    description: 'Pindai papan sirkuit PCB untuk mengidentifikasi modul perangkat keras target.',
    iconType: 'find',
    difficulty: 'Eksplorasi',
    estimatedTime: '3-4 MENIT',
  },
  {
    id: 'speed',
    number: '05',
    title: 'Speed Challenge',
    category: 'OVERCLOCK SPRINT',
    badge: 'RAPID FIRE',
    description: 'Identifikasi komponen dengan cepat di bawah tekanan waktu hitung mundur.',
    iconType: 'speed',
    difficulty: 'Kecepatan Tinggi',
    estimatedTime: '45 DETIK',
  },
  {
    id: 'identify',
    number: '06',
    title: 'Hardware Identification',
    category: 'COMPONENT RECOGNITION',
    badge: 'SPEC ANALYSIS',
    description: 'Analisa lembar spesifikasi teknis dan tentukan modul perangkat keras yang sesuai.',
    iconType: 'identify',
    difficulty: 'Teknikal',
    estimatedTime: '2-3 MENIT',
  },
];

/**
 * ChallengeLabHub (Clean Light Theme)
 * Central Challenge Hub featuring an interactive GamePreview flanked by 6 challenge cards.
 * Fits in 1 single viewport height with zero scrolling.
 */
export default function ChallengeLabHub({ onSelectGame }) {
  const [selectedGameId, setSelectedGameId] = useState('quiz');

  const selectedChallenge = CHALLENGES_LIST.find(c => c.id === selectedGameId) || CHALLENGES_LIST[0];

  const leftChallenges = [CHALLENGES_LIST[0], CHALLENGES_LIST[2], CHALLENGES_LIST[4]];
  const rightChallenges = [CHALLENGES_LIST[1], CHALLENGES_LIST[3], CHALLENGES_LIST[5]];

  const handleLaunch = (gameId) => {
    onSelectGame?.(gameId);
  };

  return (
    <div className="w-full h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] max-w-7xl mx-auto flex flex-col justify-between py-1.5 sm:py-2.5 px-3 sm:px-6 lg:px-8 select-none overflow-hidden">
      
      {/* ─── 1. COMPACT PAGE HEADER ─── */}
      <section className="text-center pt-1 mb-1.5 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-1 shadow-2xs">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Hardware Laboratory</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Challenge Lab
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-xl mx-auto mt-0.5 leading-relaxed">
          Uji pemahaman Anda melalui 6 simulasi mini-game interaktif perakitan dan diagnostik perangkat keras.
        </p>
      </section>

      {/* ─── 2. DESKTOP 3-COLUMN CORE LAYOUT (Zero scroll single-viewport) ─── */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-3.5 items-stretch my-auto flex-1 min-h-0 py-1">
        
        {/* LEFT COLUMN: Cards 01, 03, 05 (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-2.5">
          {leftChallenges.map((card) => (
            <ChallengeCard
              key={card.id}
              {...card}
              isSelected={selectedGameId === card.id}
              onSelect={setSelectedGameId}
            />
          ))}
        </div>

        {/* CENTER COLUMN: Large Interactive GamePreview (col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <GamePreview 
            challenge={selectedChallenge} 
            onLaunchGame={handleLaunch} 
          />
        </div>

        {/* RIGHT COLUMN: Cards 02, 04, 06 (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-2.5">
          {rightChallenges.map((card) => (
            <ChallengeCard
              key={card.id}
              {...card}
              isSelected={selectedGameId === card.id}
              onSelect={setSelectedGameId}
            />
          ))}
        </div>

      </div>

      {/* ─── 3. RESPONSIVE MOBILE & TABLET LAYOUT (< lg) ─── */}
      <div className="lg:hidden flex flex-col gap-3 my-auto overflow-y-auto">
        <div className="w-full">
          <GamePreview 
            challenge={selectedChallenge} 
            onLaunchGame={handleLaunch} 
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5 px-1 font-semibold">
            <span>PILIH TANTANGAN (6 MISI):</span>
            <span className="text-emerald-700">KETUK UNTUK PREVIEW</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CHALLENGES_LIST.map((card) => (
              <ChallengeCard
                key={card.id}
                {...card}
                isSelected={selectedGameId === card.id}
                onSelect={setSelectedGameId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── 4. SUBTLE FOOTER HINT (Safe bottom clearance) ─── */}
      <div className="text-center py-1 text-[11px] font-sans text-slate-400 shrink-0">
        <span>Pilih tantangan di samping untuk meninjau simulasi • Tekan Mulai Tantangan untuk memulai permainan</span>
      </div>

    </div>
  );
}
