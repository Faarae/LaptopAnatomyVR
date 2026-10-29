import React from 'react';
import { ArrowRight } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * Tactical Briefing Metadata for all 6 Challenges
 */
const BRIEFING_CONFIGS = {
  quiz: {
    missionNum: 'MISI 01 / 06',
    title: 'QUICK QUIZ',
    subtitle: 'Hardware Diagnostic Q&A System',
    category: 'Architecture & Logic',
    difficulty: 'Adaptif',
    xpReward: '+500 XP',
    threeType: 'cpu',
    overview:
      'Uji pemahaman komprehensif Anda mengenai arsitektur prosesor, topologi bus motherboard, protokol memori DDR5, dan sistem pendingin termal melalui simulasi ujian teknis berstandar industri.',
    rules: [
      {
        title: '10 Soal Acak Tiap Sesi',
        desc: 'Setiap sesi memilih 10 soal acak dari bank soal 20 modul teknis dengan pilihan jawaban A/B/C/D yang diacak.',
      },
      {
        title: 'Combo Streak Multiplier',
        desc: 'Jawab benar berturut-turut tanpa salah untuk menaikkan combo multiplier (+25 XP ekstra per tingkat combo).',
      },
      {
        title: 'Tingkat Kelulusan Grade',
        desc: 'Dapatkan Grade S (9-10 benar) atau Grade A (8 benar) untuk mencatatkan rekor nilai tertinggi pada profil Anda.',
      },
    ],
    metrics: [
      { label: 'Target Soal', value: '10 Pertanyaan', color: 'emerald' },
      { label: 'Bank Pertanyaan', value: '20 Modul', color: 'violet' },
      { label: 'Standar Lulus', value: 'Min. Grade B', color: 'teal' },
      { label: 'Maksimal Streak', value: 'Combo 10x', color: 'amber' },
    ],
    hint: 'Perhatikan model 3D komponen yang berputar di samping setiap pertanyaan untuk membantu mengidentifikasi komponen yang dimaksud.',
  },
  match: {
    missionNum: 'MISI 02 / 06',
    title: 'MATCH IT',
    subtitle: '3D Bus Interconnect Matching',
    category: 'Hardware Interfacing',
    difficulty: 'Menengah',
    xpReward: '+400 XP',
    threeType: 'gpu',
    overview:
      'Hubungkan model 3D komponen hardware internal di sisi kiri dengan peran komputasi dan pemrosesan data sehari-harinya di sisi kanan melalui simulasi kabel interkoneksi laser neon.',
    rules: [
      {
        title: 'Komponen 3D Teracak',
        desc: 'Empat komponen 3D dipilih secara acak dari pool 8 komponen perangkat keras dan diacak setiap kali bermain.',
      },
      {
        title: 'Sistem Seleksi Dua Arah',
        desc: 'Klik salah satu komponen 3D di kolom kiri, lalu klik blok deskripsi fungsi yang bersesuaian di kolom kanan.',
      },
      {
        title: 'Koneksi Laser Interkoneksi',
        desc: 'Pasangan yang cocok akan terhubung secara otomatis oleh kurva laser neon beranimasi dan status COCOK.',
      },
    ],
    metrics: [
      { label: 'Jumlah Modul', value: '4 Pasang 3D', color: 'violet' },
      { label: 'Pool Komponen', value: '8 Komponen Acak', color: 'emerald' },
      { label: 'Poin per Match', value: '100 XP', color: 'amber' },
      { label: 'Target Akurasi', value: '100% Ideal', color: 'teal' },
    ],
    hint: 'Manfaatkan tombol Acak Komponen di footer jika Anda ingin mencoba variasi 4 komponen hardware yang berbeda.',
  },
  drag: {
    missionNum: 'MISI 03 / 06',
    title: 'DRAG & PLACE',
    subtitle: '3D Motherboard Assembly Workbench',
    category: 'Physical Assembly',
    difficulty: 'Praktik',
    xpReward: '+500 XP',
    threeType: 'ram',
    overview:
      'Pasang modul prosesor CPU, modul memori RAM, dan kartu NVMe SSD 3D ke soket yang tepat pada papan sirkuit utama motherboard X-Series Pro sebelum mengunci retaining bracket.',
    rules: [
      {
        title: 'Identifikasi Aset 3D',
        desc: 'Amati aset 3D pada baki inventaris di bawah. Setiap modul memiliki spesifikasi pinout dan kunci fisik yang unik.',
      },
      {
        title: 'Drag atau Tap to Snap',
        desc: 'Tarik (drag) modul 3D atau klik untuk memilih, kemudian letakkan ke soket motherboard yang menyala hijau/kuning.',
      },
      {
        title: 'Verifikasi Alignment Pin',
        desc: 'Pastikan segitiga penanda Pin 001 dan notch kunci DDR5 terpasang sejajar untuk mengunci interface termal.',
      },
    ],
    metrics: [
      { label: 'Soket Target', value: '3 Soket Kunci', color: 'amber' },
      { label: 'Interface', value: 'BGA, DIMM, M.2', color: 'violet' },
      { label: 'Bonus Perakitan', value: '+500 Total XP', color: 'emerald' },
      { label: 'Toleransi Pin', value: '0% Error', color: 'teal' },
    ],
    hint: 'Gunakan panel 3D Telemetry di sebelah kanan untuk melihat sudut putar dan kelurusan pin modul sebelum diletakkan.',
  },
  find: {
    missionNum: 'MISI 04 / 06',
    title: 'FIND COMPONENT',
    subtitle: '3D Spatial PCB Discovery',
    category: 'Spatial Recognition',
    difficulty: 'Eksplorasi',
    xpReward: '+500 XP',
    threeType: 'motherboard',
    overview:
      'Lakukan pemindaian spasial pada Digital Twin Motherboard 3D interaktif. Temukan dan identifikasi posisi fisik komponen yang ditugaskan melalui navigasi kamera 360 derajat.',
    rules: [
      {
        title: 'Analisis Target Misi',
        desc: 'Baca deskripsi modul target diagnostik dan petunjuk lokasi pada panel atas sebelum memutar motherboard.',
      },
      {
        title: 'Navigasi Spasial 360°',
        desc: 'Gunakan klik & drag untuk memutar sudut pandang, serta scroll untuk zoom in ke komponen mikroskopis pada PCB.',
      },
      {
        title: 'Raycasting Click Selection',
        desc: 'Klik langsung pada modul atau pin nomor pada motherboard 3D untuk memverifikasi penemuan lokasi target.',
      },
    ],
    metrics: [
      { label: 'Target Modul', value: '5 Lokasi 3D', color: 'teal' },
      { label: 'Kontrol Kamera', value: 'Orbit & Zoom', color: 'violet' },
      { label: 'Poin per Target', value: '100 XP', color: 'amber' },
      { label: 'Quick Take', value: 'Dossier Edukasi', color: 'emerald' },
    ],
    hint: 'Jika kesulitan menemukan posisi, periksa petunjuk arah seperti slot memori berada di kanan soket CPU dan VRM di bagian atas belakang.',
  },
  speed: {
    missionNum: 'MISI 05 / 06',
    title: 'SPEED CHALLENGE',
    subtitle: 'Overclock 3D Diagnostic Sprint',
    category: 'Reaction & Knowledge',
    difficulty: 'Kecepatan Tinggi',
    xpReward: '5x COMBO XP',
    threeType: 'fan',
    overview:
      'Uji kecepatan refleks diagnostik Anda dalam sprint berwaktu! Kenali dan identifikasi model 3D komponen yang berputar di ruang diagnostik sebelum batas waktu 45 detik habis.',
    rules: [
      {
        title: 'Amati Model 3D Berputar',
        desc: 'Setiap ronde menampilkan modul 3D baru yang berputar di podium diagnostik tengah.',
      },
      {
        title: 'Pilih Jawaban Secepatnya',
        desc: 'Pilih nama komponen yang benar dari 4 opsi tombol yang tersedia sebelum waktu berjalan habis.',
      },
      {
        title: 'Mekanisme Bonus & Penalti',
        desc: 'Jawaban benar menambah waktu (+2 detik) dan menaikkan streak multiplier. Jawaban salah memotong waktu (-2 detik).',
      },
    ],
    metrics: [
      { label: 'Waktu Awal', value: '45 Detik', color: 'amber' },
      { label: 'Bonus Benar', value: '+2 Detik Waktu', color: 'emerald' },
      { label: 'Penalti Salah', value: '-2 Detik Waktu', color: 'violet' },
      { label: 'Streak Multiplier', value: 'Hingga 5x XP', color: 'teal' },
    ],
    hint: 'Pertahankan combo streak setinggi mungkin untuk mendongkrak total perolehan skor hingga ratusan XP per ronde.',
  },
  identify: {
    missionNum: 'MISI 06 / 06',
    title: 'HARDWARE IDENTIFICATION',
    subtitle: 'Component Recognition & Spec Analysis',
    category: 'Component Recognition',
    difficulty: 'Teknikal',
    xpReward: '+500 XP',
    threeType: 'ssd',
    overview:
      'Analisis spesifikasi teknis, arsitektur bus, form factor, dan inspeksi fisik 3D untuk mengidentifikasi modul perangkat keras laptop yang tepat.',
    rules: [
      {
        title: 'Analisis Matriks Parameter',
        desc: 'Periksa tegangan operasional, antarmuka bus (PCIe/DDR5/BGA), dan form factor fisik pada lembar data.',
      },
      {
        title: 'Inspeksi Model 3D',
        desc: 'Amati bentuk fisik, pinout konektor, dan lapisan pelindung komponen pada viewport 3D interaktif.',
      },
      {
        title: 'Pilih Klasifikasi Modul',
        desc: 'Tentukan identitas modul yang paling tepat dari pilihan yang tersedia untuk mengumpulkan skor.',
      },
    ],
    metrics: [
      { label: 'Target Modul', value: '5 Spesifikasi', color: 'violet' },
      { label: 'Metode Uji', value: 'Analisis Spek', color: 'emerald' },
      { label: 'Poin per Modul', value: '100 XP', color: 'amber' },
      { label: 'Target Akurasi', value: '100% Ideal', color: 'teal' },
    ],
    hint: 'Perhatikan parameter kunci seperti jalur PCIe x4 NVMe untuk SSD atau jumlah pin 262-pin untuk RAM SO-DIMM.',
  },
};

const METRIC_STYLES = {
  emerald: 'bg-emerald-50/60 border-emerald-200/80 text-emerald-800',
  violet: 'bg-violet-50/60 border-violet-200/80 text-violet-800',
  amber: 'bg-amber-50/60 border-amber-200/80 text-amber-800',
  teal: 'bg-teal-50/60 border-teal-200/80 text-teal-800',
};

/**
 * GameBriefingView — Vibrant Tritone Pre-Game Mission Dossier
 * - Left: 3D Component Preview + Radiant Gold XP Reward Banner + 4 Color-Coded Telemetry Metrics
 * - Right: Step-by-Step Rules with Tritone Badges, Tactical Hint, and Emerald Primary CTA
 */
export default function GameBriefingView({ gameId, onStartGame, onBackToHub }) {
  const config = BRIEFING_CONFIGS[gameId] || BRIEFING_CONFIGS.quiz;

  const stepColors = [
    'bg-emerald-600 text-white',
    'bg-violet-600 text-white',
    'bg-amber-500 text-white',
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-between select-none py-2 px-4 animate-fade-slide-up">
      
      {/* ── Top Navigation & Breadcrumb ── */}
      <div className="flex items-center justify-between shrink-0 mb-3 border-b border-slate-200 pb-2.5">
        <button
          type="button"
          onClick={onBackToHub}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
        >
          ← Kembali ke Challenge Hub
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold uppercase tracking-wider">
            {config.missionNum}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-violet-50 border border-violet-200 text-violet-700 font-bold">
            Level: {config.difficulty}
          </span>
        </div>
      </div>

      {/* ── Main Briefing Grid: 2 Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-auto">
        
        {/* Left Column: Mission 3D Target Dossier & Metrics (lg:col-span-5) */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-violet-500 to-amber-500" />

          {/* Dossier Header */}
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2.5 shrink-0">
            <span className="text-emerald-700 font-bold">DOSSIER MISI 3D</span>
            <span className="text-violet-700 font-mono text-[11px] font-bold">{config.category}</span>
          </div>

          {/* Central 3D Component Preview & Gold Reward Card */}
          <div className="my-3 flex-1 min-h-[190px] rounded-xl bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-slate-200/80 flex flex-col items-center justify-between p-4 text-center">
            <div className="w-full h-32 flex items-center justify-center">
              <Component3DViewer
                key={config.threeType}
                type={config.threeType}
                heightClass="h-32"
                className="border-0 bg-transparent shadow-none"
                autoRotateSpeed={2.5}
              />
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">
                {config.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {config.subtitle}
              </p>
            </div>

            <div className="mt-2.5 py-1.5 px-3 rounded-lg bg-amber-50 border border-amber-300/80 w-full text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
              TARGET REWARD: {config.xpReward}
            </div>
          </div>

          {/* Mission Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-100 shrink-0">
            {config.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-left ${
                  METRIC_STYLES[metric.color] || METRIC_STYLES.emerald
                }`}
              >
                <span className="text-[10px] font-mono opacity-75 uppercase tracking-wider block font-semibold">
                  {metric.label}
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 mt-0.5 block">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mission Objectives, Rules & Launch Action (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm">
          
          <div>
            {/* Title & Lore */}
            <div className="mb-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-0.5">
                Panduan &amp; Aturan Misi Evaluasi
              </p>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-1">
                {config.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {config.overview}
              </p>
            </div>

            {/* Step-by-Step Rules of Engagement */}
            <div className="space-y-2.5 my-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tahapan Bermain:
              </p>
              {config.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div
                    className={`w-6 h-6 rounded-lg ${
                      stepColors[idx % stepColors.length]
                    } font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tactical Hint */}
            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs font-sans text-amber-950 leading-relaxed">
              <strong className="text-amber-800 font-semibold mr-1.5">Tips Misi:</strong>
              {config.hint}
            </div>
          </div>

          {/* Action CTAs: 1 Secondary + 1 Primary (Vibrant Emerald) */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-3.5 border-t border-slate-100 mt-3.5">
            <button
              type="button"
              onClick={onBackToHub}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
            >
              Kembali ke Hub
            </button>

            <button
              type="button"
              onClick={onStartGame}
              className="group w-full sm:flex-1 py-2.5 px-6 rounded-lg font-display text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mulai Tantangan</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
