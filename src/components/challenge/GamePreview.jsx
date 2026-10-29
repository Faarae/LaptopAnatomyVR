import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';
import { playSuccessChime, playErrorSfx } from '../../utils/soundEffects';

/**
 * GamePreview — Central Interactive 3D & Live Simulation Preview Panel for Challenge Hub
 * - Every challenge features a live interactive mini-simulation AND 3D hardware model
 * - Uses the Bright Futuristic Lab Tritone Palette (Emerald, Violet, Amber/Gold) from DESKRIPSI_UI.md
 */
export default function GamePreview({ challenge, onLaunchGame }) {
  const [selectedPreviewOpt, setSelectedPreviewOpt] = useState('A');
  const [previewTimer, setPreviewTimer] = useState(30);
  const [activeSocket, setActiveSocket] = useState('cpu'); // 'cpu' | 'ram' | 'ssd'
  const [activeRadarPin, setActiveRadarPin] = useState(0);
  const [speedPicked, setSpeedPicked] = useState('CPU Die');
  const [identifyPicked, setIdentifyPicked] = useState('nvme');
  const [matchMode, setMatchMode] = useState('both'); // 'cpu' | 'both'

  // Reset interactive preview state when switching challenges
  useEffect(() => {
    setSelectedPreviewOpt('A');
    setPreviewTimer(30);
    setActiveSocket('cpu');
    setActiveRadarPin(0);
    setSpeedPicked('CPU Die');
    setIdentifyPicked('nvme');
  }, [challenge?.id]);

  // Responsive countdown timer for Quiz & Speed previews
  useEffect(() => {
    if (challenge?.id !== 'quiz' && challenge?.id !== 'speed') return;
    const interval = setInterval(() => {
      setPreviewTimer((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [challenge?.id]);

  if (!challenge) return null;

  const quizPreviewOptions = [
    { id: 'A', text: 'Central Processing Unit (CPU)', correct: true },
    { id: 'B', text: 'Graphics Processing Unit (GPU)', correct: false },
    { id: 'C', text: 'System Memory (RAM)', correct: false },
    { id: 'D', text: 'Solid State Drive (SSD)', correct: false },
  ];

  const handleSelectPreviewOption = (opt) => {
    setSelectedPreviewOpt(opt.id);
    if (opt.correct) {
      playSuccessChime();
    } else {
      playErrorSfx();
    }
  };

  const radarTargets = [
    { code: 'PIN #02', name: 'Soket Prosesor CPU', type: 'cpu', coords: 'X: +0.00  Y: +0.42  Z: -0.60' },
    { code: 'PIN #04', name: 'Slot Dual DDR5 RAM', type: 'ram', coords: 'X: +1.85  Y: +0.35  Z: +0.20' },
    { code: 'PIN #03', name: 'Slot M.2 NVMe SSD', type: 'ssd', coords: 'X: -1.40  Y: +0.28  Z: +1.65' },
  ];

  return (
    <div
      key={challenge.id}
      className="w-full h-full rounded-xl bg-white border border-slate-200 p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden select-none animate-fade-slide-up"
    >
      {/* Top Tritone Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-violet-500 to-amber-500" />

      {/* 1. PREVIEW HEADER STRIP */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2.5 mb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-xs h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
            SIMULASI MISI // {challenge.number}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-violet-50 border border-violet-200 text-[10px] font-mono font-bold text-violet-700 uppercase">
            {challenge.badge || challenge.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[10px] font-mono font-bold text-amber-700">
            {challenge.xpReward || '+500 XP'}
          </span>
        </div>
      </div>

      {/* 2. CHALLENGE TITLE & DESCRIPTION */}
      <div className="relative z-10 mb-2.5 shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          {challenge.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mt-0.5 line-clamp-2">
          {challenge.description}
        </p>
      </div>

      {/* 3. DYNAMIC GAMEPLAY SIMULATION VIEWPORT (rounded-lg) */}
      <div className="relative z-10 flex-1 min-h-[215px] sm:min-h-[245px] rounded-lg bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border border-slate-200 p-3.5 my-auto flex flex-col justify-between overflow-hidden">
        
        {/* STATE 01: QUICK QUIZ INTERACTIVE PREVIEW (With 3D CPU + Clickable A/B/C/D) */}
        {challenge.id === 'quiz' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold">
                  PERTANYAAN 01 / 10
                </span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-md border ${
                    previewTimer <= 10
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  WAKTU: 00:{String(previewTimer).padStart(2, '0')}
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 rounded-xs bg-slate-200 overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${Math.max(15, (previewTimer / 30) * 100)}%` }}
                />
              </div>
            </div>

            {/* 3D Component + Question Prompt */}
            <div className="flex items-center gap-3 my-1 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="w-20 h-16 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                <Component3DViewer
                  type="cpu"
                  heightClass="h-16"
                  className="border-0 bg-transparent shadow-none"
                  autoRotateSpeed={2.5}
                />
              </div>
              <p className="text-xs font-sans font-semibold text-slate-800 leading-snug">
                &ldquo;Komponen manakah yang berfungsi sebagai otak utama laptop untuk mengeksekusi instruksi komputasi dan logika?&rdquo;
              </p>
            </div>

            {/* Interactive Clickable A, B, C, D Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1">
              {quizPreviewOptions.map((opt) => {
                const isPicked = selectedPreviewOpt === opt.id;
                let styleClass =
                  'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40';

                if (isPicked) {
                  if (opt.correct) {
                    styleClass =
                      'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/20';
                  } else {
                    styleClass =
                      'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400/20';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-no-sfx="true"
                    onClick={() => handleSelectPreviewOption(opt)}
                    className={`p-2 rounded-lg border text-xs font-mono text-left flex items-center justify-between transition-all duration-150 active:scale-95 cursor-pointer ${styleClass}`}
                  >
                    <span className="truncate">
                      {opt.id}. {opt.text}
                    </span>
                    {isPicked && opt.correct && (
                      <Check strokeWidth={2.25} className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                    )}
                    {isPicked && !opt.correct && (
                      <X strokeWidth={2.25} className="w-4 h-4 text-rose-600 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-emerald-700 font-bold">
                COBA KLIK PILIHAN A/B/C/D DI ATAS
              </span>
              <span className="text-amber-700 font-bold">STREAK BONUS +25 XP</span>
            </div>
          </div>
        )}

        {/* STATE 02: MATCH IT INTERACTIVE PREVIEW */}
        {challenge.id === 'match' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-200 pb-1.5">
              <span className="text-violet-700 font-bold">INTERKONEKSI LASER KOMPONEN 3D</span>
              <button
                type="button"
                onClick={() => {
                  setMatchMode((m) => (m === 'both' ? 'cpu' : 'both'));
                  playSuccessChime();
                }}
                className="px-2 py-0.5 rounded-md bg-violet-50 border border-violet-200 text-violet-700 font-bold cursor-pointer hover:bg-violet-100 transition-colors"
              >
                {matchMode === 'both' ? '2 / 2 TERHUBUNG' : '1 / 2 TERHUBUNG'} (KLIK UJI)
              </button>
            </div>

            <div className="relative my-auto py-2">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 400 110"
                preserveAspectRatio="none"
              >
                <path
                  d="M 145 28 C 200 28, 200 82, 255 82"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  className="neon-dash-flow"
                />
                {matchMode === 'both' && (
                  <path
                    d="M 145 82 C 200 82, 200 28, 255 28"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    className="neon-dash-flow"
                  />
                )}
              </svg>

              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-400 flex items-center justify-between text-xs font-mono text-emerald-900 font-bold shadow-2xs">
                    <span>01. CPU CORE</span>
                    <Check strokeWidth={2.25} className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div
                    onClick={() => {
                      setMatchMode((m) => (m === 'both' ? 'cpu' : 'both'));
                      playSuccessChime();
                    }}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono font-bold cursor-pointer transition-all ${
                      matchMode === 'both'
                        ? 'bg-violet-50 border-violet-400 text-violet-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-400'
                    }`}
                  >
                    <span>02. GPU RTX</span>
                    {matchMode === 'both' && (
                      <Check strokeWidth={2.25} className="w-3.5 h-3.5 text-violet-600" />
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div
                    onClick={() => {
                      setMatchMode('both');
                      playSuccessChime();
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                      matchMode === 'both'
                        ? 'bg-violet-50 border-violet-400 text-violet-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-violet-400'
                    }`}
                  >
                    <span className="block font-bold text-slate-900 text-[11px]">Render Grafis 3D</span>
                    <span className="text-[10px] text-violet-700">Pemrosesan Shader</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-400 text-xs font-mono text-emerald-900">
                    <span className="block font-bold text-slate-900 text-[11px]">Eksekusi Logika Inti</span>
                    <span className="text-[10px] text-emerald-700">Instruksi Mesin</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-violet-700 font-bold">KLIK KARTU GPU UNTUK UJI KONEKSI LASER</span>
              <span className="text-amber-700 font-bold">+100 XP / PASANG</span>
            </div>
          </div>
        )}

        {/* STATE 03: DRAG & PLACE INTERACTIVE 3D PREVIEW */}
        {challenge.id === 'drag' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-200 pb-1.5">
              <span className="text-amber-700 font-bold">WORKBENCH PERAKITAN SOKET 3D</span>
              <span className="text-emerald-700 font-bold">KLIK SOKET UNTUK INSPEKSI 3D</span>
            </div>

            <div className="my-auto py-1.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Live 3D Component Preview for Selected Socket */}
              <div className="sm:col-span-5 h-32 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-between p-2 shadow-2xs">
                <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase">
                  MODUL 3D: {activeSocket.toUpperCase()}
                </span>
                <div className="w-full h-20 flex items-center justify-center">
                  <Component3DViewer
                    key={activeSocket}
                    type={activeSocket}
                    heightClass="h-20"
                    className="border-0 bg-transparent shadow-none"
                    autoRotateSpeed={2.6}
                  />
                </div>
                <span className="text-[9px] font-mono text-amber-700 font-semibold">
                  SIAP DIPASANG KE PCB
                </span>
              </div>

              {/* 3 Interactive Socket Targets */}
              <div className="sm:col-span-7 space-y-2">
                {[
                  { id: 'cpu', code: 'SOKET BGA-1964', title: 'Prosesor Intel Core i7', meta: 'Pin 001 Sejajar' },
                  { id: 'ram', code: 'SLOT SO-DIMM DDR5', title: 'Memori Dual-Channel', meta: '262-Pin Key Notch' },
                  { id: 'ssd', code: 'SLOT M.2 2280', title: 'NVMe PCIe Gen 4 SSD', meta: 'Key-M Standoff' },
                ].map((sock) => {
                  const isAct = activeSocket === sock.id;
                  return (
                    <button
                      key={sock.id}
                      type="button"
                      onClick={() => {
                        setActiveSocket(sock.id);
                        playSuccessChime();
                      }}
                      className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                        isAct
                          ? 'bg-amber-50/80 border-amber-400 text-slate-900 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-700 block">
                          {sock.code}
                        </span>
                        <span className="text-xs font-display font-bold text-slate-900">
                          {sock.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {sock.meta}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-amber-700 font-bold">DRAG &amp; DROP LANGSUNG DI PAPAN SIRKUIT 3D</span>
              <span className="text-emerald-700 font-bold">REWARD +500 XP</span>
            </div>
          </div>
        )}

        {/* STATE 04: FIND COMPONENT INTERACTIVE 3D RADAR PREVIEW */}
        {challenge.id === 'find' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-200 pb-1.5">
              <span className="text-teal-700 font-bold">PEMINDAIAN LOKASI PIN MOTHERBOARD 3D</span>
              <span className="text-emerald-700 font-bold">
                {radarTargets[activeRadarPin].code} AKTIF
              </span>
            </div>

            <div className="my-auto py-1.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-6 h-32 rounded-lg bg-white border border-teal-300 relative flex items-center justify-center overflow-hidden shadow-2xs">
                <Component3DViewer
                  key={radarTargets[activeRadarPin].type}
                  type={radarTargets[activeRadarPin].type}
                  heightClass="h-28"
                  className="border-0 bg-transparent shadow-none"
                  autoRotateSpeed={2.5}
                />
                <div className="absolute top-1.5 left-2 text-[9px] font-mono text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded-xs border border-teal-200">
                  RAYCAST 3D LOCK
                </div>
                <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-500">
                  {radarTargets[activeRadarPin].coords}
                </div>
              </div>

              <div className="sm:col-span-6 space-y-2">
                {radarTargets.map((rt, idx) => (
                  <button
                    key={rt.code}
                    type="button"
                    onClick={() => {
                      setActiveRadarPin(idx);
                      playSuccessChime();
                    }}
                    className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                      activeRadarPin === idx
                        ? 'bg-teal-50/80 border-teal-500 text-slate-900 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-teal-700 font-bold block">
                        {rt.code}
                      </span>
                      <span className="text-xs font-display font-bold text-slate-900">
                        {rt.name}
                      </span>
                    </div>
                    <Check
                      strokeWidth={2.25}
                      className={`w-4 h-4 ${
                        activeRadarPin === idx ? 'text-teal-600' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-teal-700 font-bold">NAVIGASI ORBIT 360° PADA PCB UTAMA</span>
              <span className="text-amber-700 font-bold">5 TARGET SPASIAL</span>
            </div>
          </div>
        )}

        {/* STATE 05: SPEED CHALLENGE INTERACTIVE PREVIEW */}
        {challenge.id === 'speed' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-200 pb-1.5">
              <span className="text-rose-700 font-bold">SPRINT IDENTIFIKASI 3D</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                  STREAK ×3
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold">
                  00:{String(previewTimer).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="my-auto py-1.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5 h-28 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                <Component3DViewer
                  type="cpu"
                  heightClass="h-24"
                  className="border-0 bg-transparent shadow-none"
                  autoRotateSpeed={3.5}
                />
              </div>

              <div className="sm:col-span-7 grid grid-cols-2 gap-2">
                {['CPU Die', 'GPU VRM', 'BIOS Chip', 'Audio Codec'].map((opt) => {
                  const isCorrect = opt === 'CPU Die';
                  const isPicked = speedPicked === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      data-no-sfx="true"
                      onClick={() => {
                        setSpeedPicked(opt);
                        if (isCorrect) playSuccessChime();
                        else playErrorSfx();
                      }}
                      className={`p-2.5 rounded-lg border text-center font-mono text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
                        isPicked
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      <span>{opt}</span>
                      {isPicked && isCorrect && (
                        <Check strokeWidth={2.25} className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {isPicked && !isCorrect && (
                        <X strokeWidth={2.25} className="w-3.5 h-3.5 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-rose-700 font-bold">MULTIPLIER HINGGA 5X XP</span>
              <span className="text-emerald-700 font-bold">+2 DETIK TIAP JAWABAN BENAR</span>
            </div>
          </div>
        )}

        {/* STATE 06: HARDWARE IDENTIFICATION INTERACTIVE PREVIEW */}
        {challenge.id === 'identify' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-200 pb-1.5">
              <span className="text-purple-700 font-bold">ANALISIS MATRIKS SPESIFIKASI 3D</span>
              <span className="text-emerald-700 font-bold">5 MODUL SILIKON</span>
            </div>

            <div className="my-auto py-1.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5 h-28 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                <Component3DViewer
                  type="ssd"
                  heightClass="h-24"
                  className="border-0 bg-transparent shadow-none"
                  autoRotateSpeed={2.5}
                />
              </div>

              <div className="sm:col-span-7 space-y-2">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded-md bg-purple-50/70 border border-purple-200 text-center">
                    <span className="text-[9px] font-mono text-purple-700 block font-bold">BUS INTERFACE</span>
                    <span className="text-[11px] font-mono text-slate-900 font-bold">PCIe Gen4 x4</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-amber-50/70 border border-amber-200 text-center">
                    <span className="text-[9px] font-mono text-amber-700 block font-bold">THROUGHPUT</span>
                    <span className="text-[11px] font-mono text-slate-900 font-bold">7,000 MB/s</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: 'nvme', label: 'M.2 2280 NVMe SSD Gen4', correct: true },
                    { id: 'ram', label: 'DDR5 SO-DIMM Memory', correct: false },
                  ].map((item) => {
                    const isPicked = identifyPicked === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-no-sfx="true"
                        onClick={() => {
                          setIdentifyPicked(item.id);
                          if (item.correct) playSuccessChime();
                          else playErrorSfx();
                        }}
                        className={`w-full p-2 rounded-lg border flex items-center justify-between text-xs font-mono font-bold transition-all cursor-pointer ${
                          isPicked
                            ? item.correct
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-rose-50 border-rose-400 text-rose-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-purple-400'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isPicked && item.correct && (
                          <Check strokeWidth={2.25} className="w-4 h-4 text-emerald-600" />
                        )}
                        {isPicked && !item.correct && (
                          <X strokeWidth={2.25} className="w-4 h-4 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              <span className="text-purple-700 font-bold">INSPEKSI 3D + FOTO FISIK RIIL</span>
              <span className="text-amber-700 font-bold">REWARD +500 XP</span>
            </div>
          </div>
        )}

      </div>

      {/* 4. PREVIEW FOOTER & VIBRANT EMERALD PRIMARY LAUNCH CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200 mt-2.5 shrink-0">
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>LEVEL: </span>
            <strong className="text-slate-900">{challenge.difficulty}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span>ESTIMASI: </span>
            <strong className="text-emerald-700">{challenge.estimatedTime}</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onLaunchGame(challenge.id)}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-display text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Mulai Tantangan</span>
          <ArrowRight
            strokeWidth={2}
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
