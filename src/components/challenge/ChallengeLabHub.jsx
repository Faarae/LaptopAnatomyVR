import React, { useState } from 'react';
import ChallengeCard from './ChallengeCard';
import GamePreview from './GamePreview';

export const CHALLENGES_LIST = [
  {
    id: 'quiz',
    number: '01',
    title: 'Quick Quiz',
    category: 'Q&A DIAGNOSTIC',
    badge: '10 SOAL ACAK',
    xpReward: '+500 XP',
    theme: 'emerald',
    threeType: 'cpu',
    description: 'Uji pemahaman prosesor utama, arsitektur bus, dan kontrol termal laptop dengan inspeksi 3D.',
    difficulty: 'Adaptif',
    estimatedTime: '3-5 MENIT',
  },
  {
    id: 'match',
    number: '02',
    title: 'Match It',
    category: 'BUS INTERCONNECT',
    badge: '4 PASANG 3D',
    xpReward: '+400 XP',
    theme: 'violet',
    threeType: 'gpu',
    description: 'Hubungkan model 3D komponen perangkat keras dengan fungsi kerja komputasi dunia nyata.',
    difficulty: 'Menengah',
    estimatedTime: '2-3 MENIT',
  },
  {
    id: 'drag',
    number: '03',
    title: 'Drag & Place',
    category: 'ASSEMBLY BENCH',
    badge: '3 SOKET PCB',
    xpReward: '+500 XP',
    theme: 'amber',
    threeType: 'ram',
    description: 'Pasang chip CPU, keping RAM, dan drive NVMe ke soket motherboard 3D yang tepat.',
    difficulty: 'Praktik',
    estimatedTime: '3-4 MENIT',
  },
  {
    id: 'find',
    number: '04',
    title: 'Find Component',
    category: 'SPATIAL LOCATOR',
    badge: '5 TITIK PIN',
    xpReward: '+500 XP',
    theme: 'teal',
    threeType: 'motherboard',
    description: 'Pindai papan sirkuit PCB 3D untuk menemukan dan mengidentifikasi modul perangkat keras target.',
    difficulty: 'Eksplorasi',
    estimatedTime: '3-4 MENIT',
  },
  {
    id: 'speed',
    number: '05',
    title: 'Speed Challenge',
    category: 'OVERCLOCK SPRINT',
    badge: '45 DETIK',
    xpReward: '5x COMBO',
    theme: 'rose',
    threeType: 'fan',
    description: 'Identifikasi model 3D komponen dengan cepat di bawah tekanan waktu hitung mundur.',
    difficulty: 'Cepat',
    estimatedTime: '45 DETIK',
  },
  {
    id: 'identify',
    number: '06',
    title: 'Hardware Identification',
    category: 'SPEC ANALYSIS',
    badge: '5 MATRIKS SPEK',
    xpReward: '+500 XP',
    theme: 'purple',
    threeType: 'ssd',
    description: 'Analisa lembar spesifikasi teknis dan tentukan modul perangkat keras 3D yang sesuai.',
    difficulty: 'Teknikal',
    estimatedTime: '2-3 MENIT',
  },
];

/**
 * ChallengeLabHub — Vibrant Tritone Evaluation & Gamification Hub
 * - Uses Emerald, Violet, and Radiant Gold/Amber accents from DESKRIPSI_UI.md
 * - 3-Column zero-scroll layout with interactive 3D & live mini-simulation preview
 */
export default function ChallengeLabHub({ onSelectGame }) {
  const [selectedGameId, setSelectedGameId] = useState('quiz');

  const selectedChallenge =
    CHALLENGES_LIST.find((c) => c.id === selectedGameId) || CHALLENGES_LIST[0];

  const leftChallenges = [CHALLENGES_LIST[0], CHALLENGES_LIST[2], CHALLENGES_LIST[4]];
  const rightChallenges = [CHALLENGES_LIST[1], CHALLENGES_LIST[3], CHALLENGES_LIST[5]];

  const handleLaunch = (gameId) => {
    onSelectGame?.(gameId);
  };

  return (
    <div className="w-full min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] max-w-7xl mx-auto flex flex-col justify-between py-3 px-4 sm:px-6 lg:px-8 gap-3 lg:gap-0 select-none lg:overflow-hidden">
      
      {/* 1. COMPACT PAGE HEADER WITH TRITONE ACCENTS */}
      <section className="text-center pt-0.5 mb-1 sm:mb-2 shrink-0">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 mb-0.5">
          Modul 03 • Challenge Lab (Evaluasi &amp; Gamifikasi Hardware 3D)
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Arena Tantangan &amp; Perakitan 3D
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl mx-auto mt-0.5 leading-relaxed">
          Pilih salah satu dari 6 misi interaktif untuk mencoba simulasi langsung di panggung pratinjau, lalu kumpulkan skor XP tertinggi.
        </p>
      </section>

      {/* 2. DESKTOP 3-COLUMN CORE LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-stretch my-auto flex-1 min-h-0 py-1">
        
        {/* LEFT COLUMN: Cards 01, 03, 05 */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-3">
          {leftChallenges.map((card) => (
            <ChallengeCard
              key={card.id}
              {...card}
              isSelected={selectedGameId === card.id}
              onSelect={setSelectedGameId}
            />
          ))}
        </div>

        {/* CENTER COLUMN: Interactive GamePreview */}
        <div className="lg:col-span-6 flex flex-col justify-between min-h-0">
          <GamePreview
            challenge={selectedChallenge}
            onLaunchGame={handleLaunch}
          />
        </div>

        {/* RIGHT COLUMN: Cards 02, 04, 06 */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-3">
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

      {/* 3. RESPONSIVE MOBILE & TABLET LAYOUT */}
      <div className="lg:hidden flex flex-col gap-4 my-auto">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 px-1 font-semibold">
            <span>DAFTAR MISI (6 MODUL):</span>
            <span className="text-emerald-700">KETUK UNTUK PRATINJAU</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
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

        <div className="w-full">
          <GamePreview
            challenge={selectedChallenge}
            onLaunchGame={handleLaunch}
          />
        </div>
      </div>

      {/* 4. FOOTER STATUS BAR */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-1 text-xs font-mono text-slate-500 shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-emerald-500" />
          <span>6 Misi Interaktif 3D</span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-violet-500" />
          <span>Simulasi Langsung di Pratinjau Tengah</span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5 text-amber-700 font-bold">
          <span className="w-2 h-2 rounded-xs bg-amber-500" />
          <span>Total Potensi Skor: +2.900 XP</span>
        </span>
      </div>

    </div>
  );
}
