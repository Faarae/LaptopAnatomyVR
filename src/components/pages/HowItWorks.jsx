import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

const WORKFLOW_STEPS = [
  {
    id: 'step-1',
    num: '01',
    pillar: 'PILAR 01 • EDUKASI VR',
    title: 'Pilih & Bedah Arsitektur Laptop 3D',
    subtitle: '3 Kategori Laptop: Ultrabook Slim, Gaming Beast, dan Creator Studio',
    theme: 'emerald',
    threeType: 'motherboard',
    targetPage: 'laptop-selection',
    ctaLabel: 'Buka Eksplorasi Laptop VR',
    summary:
      'Mulai perjalanan belajar dengan memilih salah satu dari tiga arsitektur laptop untuk melihat perbedaan rancangan papan sirkuit utama (PCB), jumlah kipas pendingin, dan kapasitas daya.',
    actions: [
      'Bandingkan spesifikasi prosesor, GPU, dan sistem pendingin pada 3 kelas laptop.',
      'Klik tombol Bedah Arsitektur untuk masuk ke ruang inspeksi motherboard 3D.',
      'Gunakan kontrol kamera Isometrik, Tampak Atas, Tampak Depan, atau Rotasi 360°.',
    ],
    metrics: [
      { label: 'Unit Laptop', value: '3 Arsitektur' },
      { label: 'Engine Visual', value: 'Three.js 60 FPS' },
      { label: 'Mode Kamera', value: 'Orbit 360° Bebas' },
    ],
  },
  {
    id: 'step-2',
    num: '02',
    pillar: 'PILAR 01 • INSPEKSI KOMPONEN',
    title: 'Inspeksi 10 Pin PCB & 8 Modul 3D',
    subtitle: 'Perbandingan Geometri 3D Interaktif dengan Foto Fisik Riil',
    theme: 'teal',
    threeType: 'cpu',
    targetPage: 'component-library',
    ctaLabel: 'Buka Katalog 8 Komponen 3D',
    summary:
      'Pelajari anatomi setiap komponen perangkat keras secara mendalam. Klik nomor pin 1–10 pada motherboard 3D atau buka Katalog Komponen untuk membandingkan model 3D dengan foto fisik asli.',
    actions: [
      'Klik Pin #01 hingga #10 pada motherboard untuk menyorot modul CPU, GPU, RAM, SSD, dan VRM.',
      'Beralih antara tampilan Model 3D Interaktif dan Foto Fisik Riil komponen.',
      'Baca rincian Fungsi Arsitektur, Prinsip Kerja, dan Spesifikasi Teknis tiap modul.',
    ],
    metrics: [
      { label: 'Titik Hotspot', value: '10 Pin Motherboard' },
      { label: 'Ensiklopedia', value: '8 Komponen Utama' },
      { label: 'Dokumentasi', value: '3D + Foto Asli' },
    ],
  },
  {
    id: 'step-3',
    num: '03',
    pillar: 'PILAR 02 • EDUKASI AR',
    title: 'Proyeksi Kamera WebAR & Audio Narasi',
    subtitle: 'Pelacakan Kartu Marker MindAR untuk CPU, RAM, dan SSD',
    theme: 'violet',
    threeType: 'ram',
    targetPage: 'webar',
    ctaLabel: 'Buka Studio Kamera WebAR',
    summary:
      'Hadirkan komponen laptop ke dunia nyata menggunakan kamera perangkat Anda. Arahkan kamera ke kartu marker sasaran untuk memunculkan hologram 3D lengkap dengan penjelasan suara Bahasa Indonesia.',
    actions: [
      'Izinkan akses kamera pada Studio WebAR, lalu klik Perbesar Marker atau Unduh PNG.',
      'Arahkan kamera ke kartu TARGET 01 (CPU), TARGET 02 (RAM), atau TARGET 03 (SSD).',
      'Atur skala objek (0.25x–2.5x), rotasi 360°, dan aktifkan tombol Narasi Audio (TTS).',
    ],
    metrics: [
      { label: 'Target Marker', value: 'CPU, RAM, SSD' },
      { label: 'Kontrol Objek', value: 'Zoom & Rotasi 360°' },
      { label: 'Fitur Suara', value: 'Narasi TTS Indonesia' },
    ],
  },
  {
    id: 'step-4',
    num: '04',
    pillar: 'PILAR 03 • CHALLENGE LAB',
    title: 'Uji Perakitan 3D & Evaluasi Diagnostik',
    subtitle: '6 Misi Interaktif dengan Sistem Skor XP, Streak & Grade',
    theme: 'amber',
    threeType: 'ssd',
    targetPage: 'challenge-lab',
    ctaLabel: 'Masuk ke Arena Challenge Lab',
    summary:
      'Uji pemahaman teori dan ketangkasan spasial Anda melalui 6 mini-game interaktif: mulai dari perakitan soket motherboard 3D (Drag & Place) hingga kuis diagnostik berbatas waktu.',
    actions: [
      'Pilih salah satu dari 6 misi di Challenge Hub dan coba simulasi interaktif di panggung tengah.',
      'Rakit CPU, RAM, dan NVMe SSD ke soket PCB 3D atau hubungkan fungsi komponen dengan laser.',
      'Kumpulkan skor XP, pertahankan combo streak hingga 5x, dan raih peringkat Grade S.',
    ],
    metrics: [
      { label: 'Jumlah Misi', value: '6 Tantangan 3D' },
      { label: 'Reward Misi', value: 'Hingga +500 XP' },
      { label: 'Evaluasi Akhir', value: 'Grade S / A / B / C' },
    ],
  },
];

const STEP_THEMES = {
  emerald: {
    activeCard: 'bg-emerald-50/60 border-2 border-emerald-500 ring-2 ring-emerald-500/15 shadow-md',
    numActive: 'bg-emerald-600 text-white',
    numIdle: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    pillarText: 'text-emerald-700',
    topBar: 'from-emerald-500 to-teal-500',
    metricBox: 'bg-emerald-50/50 border-emerald-200/80 text-emerald-800',
    btnClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
  },
  teal: {
    activeCard: 'bg-teal-50/60 border-2 border-teal-500 ring-2 ring-teal-500/15 shadow-md',
    numActive: 'bg-teal-600 text-white',
    numIdle: 'bg-teal-50 border-teal-200 text-teal-700',
    pillarText: 'text-teal-700',
    topBar: 'from-teal-500 to-cyan-500',
    metricBox: 'bg-teal-50/50 border-teal-200/80 text-teal-800',
    btnClass: 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/20',
  },
  violet: {
    activeCard: 'bg-violet-50/60 border-2 border-violet-500 ring-2 ring-violet-500/15 shadow-md',
    numActive: 'bg-violet-600 text-white',
    numIdle: 'bg-violet-50 border-violet-200 text-violet-700',
    pillarText: 'text-violet-700',
    topBar: 'from-violet-500 to-purple-500',
    metricBox: 'bg-violet-50/50 border-violet-200/80 text-violet-800',
    btnClass: 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/20',
  },
  amber: {
    activeCard: 'bg-amber-50/60 border-2 border-amber-500 ring-2 ring-amber-500/15 shadow-md',
    numActive: 'bg-amber-500 text-white',
    numIdle: 'bg-amber-50 border-amber-200 text-amber-700',
    pillarText: 'text-amber-700',
    topBar: 'from-amber-500 to-orange-500',
    metricBox: 'bg-amber-50/50 border-amber-200/80 text-amber-800',
    btnClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
  },
};

/**
 * PAGE 4 — PANDUAN & ALUR KERJA INTERAKTIF (HowItWorks)
 * - Interactive 4-Step Visual Learning Flow with live 3D Component Preview
 * - Uses the Bright Futuristic Lab Tritone Palette (Emerald, Teal, Violet, Amber/Gold)
 * - Zero-scroll 1-screen layout
 */
export default function HowItWorks({ onNavigate }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const curStep = WORKFLOW_STEPS[activeIdx] || WORKFLOW_STEPS[0];
  const theme = STEP_THEMES[curStep.theme] || STEP_THEMES.emerald;

  return (
    <div className="min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] lg:overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto py-4 gap-4 lg:gap-0 select-none">
      
      {/* ─── 1. PAGE HEADER ─── */}
      <div className="text-center shrink-0 pt-0.5 mb-1 sm:mb-2">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
          Panduan Penggunaan • Alur Belajar Interaktif 4 Tahap
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Cara Kerja Laptop Anatomy Education
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5 max-w-2xl mx-auto leading-relaxed">
          Pilih salah satu dari 4 tahapan belajar untuk melihat simulasi 3D dan langkah praktis penggunaannya.
        </p>
      </div>

      {/* ─── 2. MAIN INTERACTIVE WORKFLOW GRID (LEFT: 4 STEPS, RIGHT: LIVE 3D & ACTION DOSSIER) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch my-auto flex-1 min-h-0 py-1">
        
        {/* LEFT COLUMN: 4 Interactive Step Cards (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isSelected = activeIdx === idx;
            const st = STEP_THEMES[step.theme] || STEP_THEMES.emerald;

            return (
              <div
                key={step.id}
                onClick={() => setActiveIdx(idx)}
                data-sfx="click"
                className={`group relative rounded-xl p-3.5 cursor-pointer transition-all duration-200 active:scale-[0.99] flex items-start gap-3.5 overflow-hidden ${
                  isSelected
                    ? st.activeCard
                    : 'bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-sm shadow-2xs'
                }`}
              >
                {/* Left Accent Stripe */}
                <div
                  className={`w-7 h-7 rounded-lg border font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected ? st.numActive : st.numIdle
                  }`}
                >
                  {step.num}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${st.pillarText}`}>
                      {step.pillar}
                    </span>
                    {isSelected && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-xs h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold font-display text-slate-900 mt-0.5 truncate">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5 line-clamp-1">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Live 3D Visual Stage & Step-by-Step Practical Guide (lg:col-span-7) */}
        <div
          key={curStep.id}
          className="lg:col-span-7 rounded-xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-sm relative overflow-hidden animate-fade-slide-up"
        >
          {/* Top Gradient Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.topBar}`} />

          {/* Top Header */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold ${theme.numActive}`}>
                  TAHAP {curStep.num} / 04
                </span>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.pillarText}`}>
                  {curStep.pillar}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {WORKFLOW_STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`w-6 h-1.5 rounded-xs transition-all cursor-pointer ${
                      i === activeIdx ? 'bg-emerald-600 w-8' : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Tahap ${s.num}`}
                  />
                ))}
              </div>
            </div>

            {/* Title & Summary */}
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
              {curStep.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mt-1">
              {curStep.summary}
            </p>
          </div>

          {/* Center Interactive 3D + Practical Steps Split */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-auto py-3 items-center">
            {/* 3D Preview Box */}
            <div className="sm:col-span-5 h-44 rounded-xl bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-slate-200 p-3 flex flex-col items-center justify-between shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                PRATINJAU 3D INTERAKTIF
              </span>
              <div className="w-full h-28 flex items-center justify-center">
                <Component3DViewer
                  key={curStep.threeType}
                  type={curStep.threeType}
                  heightClass="h-28"
                  className="border-0 bg-transparent shadow-none"
                  autoRotateSpeed={2.5}
                />
              </div>
              <span className={`text-[10px] font-mono font-bold ${theme.pillarText}`}>
                DRAG UNTUK PUTAR 360°
              </span>
            </div>

            {/* 3 Practical Action Steps */}
            <div className="sm:col-span-7 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Langkah Penggunaan:
              </span>
              {curStep.actions.map((act, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check strokeWidth={2.5} className="w-3 h-3" />
                  </div>
                  <p className="text-xs text-slate-700 font-sans leading-snug">
                    {act}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Metrics & Direct Launch CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto flex-1">
              {curStep.metrics.map((m, idx) => (
                <div key={idx} className={`p-2 rounded-lg border ${theme.metricBox}`}>
                  <span className="text-[9px] font-mono uppercase opacity-75 block font-semibold">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 truncate block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate(curStep.targetPage)}
              className={`group w-full sm:w-auto px-5 py-2.5 rounded-lg font-display text-xs sm:text-sm font-semibold text-white ${theme.btnClass} shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0`}
            >
              <span>{curStep.ctaLabel}</span>
              <ArrowRight
                strokeWidth={2}
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>

      </div>

      {/* ─── 3. BOTTOM QUICK JUMP BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono text-slate-500 shrink-0">
        <span>NAVIGASI CEPAT EKOSISTEM:</span>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('laptop-selection')}
            className="text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
          >
            01. Edukasi VR →
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => onNavigate('webar')}
            className="text-violet-700 hover:text-violet-800 font-bold cursor-pointer"
          >
            02. Studio WebAR →
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => onNavigate('challenge-lab')}
            className="text-amber-600 hover:text-amber-700 font-bold cursor-pointer"
          >
            03. Challenge Lab →
          </button>
        </div>
      </div>

    </div>
  );
}
