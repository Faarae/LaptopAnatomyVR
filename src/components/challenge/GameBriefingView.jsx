import React from 'react';
import { 
  ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Target 
} from 'lucide-react';

/**
 * Tactical Briefing Metadata for all 6 Challenges
 */
const BRIEFING_CONFIGS = {
  quiz: {
    missionNum: "MISI 01 / 06",
    title: "QUICK QUIZ",
    subtitle: "Hardware Diagnostic Q&A System",
    category: "Architecture & Logic",
    difficulty: "Adaptif",
    threeType: "cpu",
    overview: "Uji pemahaman komprehensif Anda mengenai arsitektur prosesor, topologi bus motherboard, protokol memori DDR5, dan sistem pendingin termal melalui simulasi ujian teknis berstandar industri.",
    rules: [
      {
        title: "10 Soal Acak Tiap Sesi",
        desc: "Setiap sesi memilih 10 soal acak dari bank soal 20 modul teknis dengan pilihan jawaban A/B/C/D yang diacak.",
      },
      {
        title: "Combo Streak Multiplier",
        desc: "Jawab benar berturut-turut tanpa salah untuk menaikkan combo multiplier (+25 XP ekstra per tingkat combo).",
      },
      {
        title: "Tingkat Kelulusan Grade",
        desc: "Dapatkan Grade S (9-10 benar) atau Grade A (8 benar) untuk mencatatkan rekor nilai tertinggi pada profil Anda.",
      },
    ],
    metrics: [
      { label: "Target Soal", value: "10 Pertanyaan" },
      { label: "Bank Pertanyaan", value: "20 Modul" },
      { label: "Standar Kelulusan", value: "Min. Grade B" },
      { label: "Maksimal Streak", value: "Combo 10x" },
    ],
    hint: "Perhatikan diagram 3D pin motherboard yang muncul di samping setiap pertanyaan untuk membantu mengidentifikasi komponen yang dimaksud.",
  },
  match: {
    missionNum: "MISI 02 / 06",
    title: "MATCH IT",
    subtitle: "3D Bus Interconnect Matching",
    category: "Hardware Interfacing",
    difficulty: "Menengah",
    threeType: "motherboard",
    overview: "Hubungkan model 3D komponen hardware internal di sisi kiri dengan peran komputasi dan pemrosesan data sehari-harinya di sisi kanan melalui simulasi kabel interkoneksi laser neon.",
    rules: [
      {
        title: "Komponen 3D Teracak",
        desc: "Empat komponen 3D dipilih secara acak dari pool 8 komponen perangkat keras dan diacak setiap kali bermain.",
      },
      {
        title: "Sistem Seleksi Dua Arah",
        desc: "Klik salah satu komponen 3D di kolom kiri, lalu klik blok deskripsi fungsi yang bersesuaian di kolom kanan.",
      },
      {
        title: "Koneksi Laser Interkoneksi",
        desc: "Pasangan yang cocok akan terhubung secara otomatis oleh kurva laser neon beranimasi dan status MATCHED.",
      },
    ],
    metrics: [
      { label: "Jumlah Modul", value: "4 Pasang 3D" },
      { label: "Pool Komponen", value: "8 Komponen Acak" },
      { label: "Poin per Match", value: "100 XP" },
      { label: "Target Akurasi", value: "100% Ideal" },
    ],
    hint: "Manfaatkan tombol RANDOMIZE COMPONENTS di footer jika Anda ingin mencoba variasi 4 komponen hardware yang berbeda.",
  },
  drag: {
    missionNum: "MISI 03 / 06",
    title: "DRAG & PLACE",
    subtitle: "3D Motherboard Assembly Workbench",
    category: "Physical Assembly",
    difficulty: "Praktik",
    threeType: "socket",
    overview: "Pasang modul prosesor CPU, modul memori RAM, dan kartu NVMe SSD 3D ke soket yang tepat pada papan sirkuit utama motherboard X-Series Pro sebelum mengunci retaining bracket.",
    rules: [
      {
        title: "Identifikasi Aset 3D",
        desc: "Amati aset 3D pada baki inventaris di bawah. Setiap modul memiliki spesifikasi pinout dan kunci fisik yang unik.",
      },
      {
        title: "Drag atau Tap to Snap",
        desc: "Tarik (drag) modul 3D atau klik untuk memilih, kemudian letakkan ke soket motherboard yang menyala hijau/kuning.",
      },
      {
        title: "Verifikasi Alignment Pin",
        desc: "Pastikan segitiga penanda Pin 001 dan notch kunci DDR5 terpasang sejajar untuk mengunci interface termal.",
      },
    ],
    metrics: [
      { label: "Soket Target", value: "3 Soket Kunci" },
      { label: "Interface", value: "BGA, DIMM, M.2" },
      { label: "Bonus Perakitan", value: "+500 Total XP" },
      { label: "Toleransi Pin", value: "0% Error" },
    ],
    hint: "Gunakan panel 3D Telemetry di sebelah kanan untuk melihat sudut putar dan kelurusan pin modul sebelum diletakkan.",
  },
  find: {
    missionNum: "MISI 04 / 06",
    title: "FIND COMPONENT",
    subtitle: "3D Spatial PCB Discovery",
    category: "Spatial Recognition",
    difficulty: "Eksplorasi",
    threeType: "pcie",
    overview: "Lakukan pemindaian spasial pada Digital Twin Motherboard 3D interaktif. Temukan dan identifikasi posisi fisik komponen yang ditugaskan melalui navigasi kamera 360 derajat.",
    rules: [
      {
        title: "Analisis Target Misi",
        desc: "Baca deskripsi modul target diagnostik dan petunjuk lokasi pada panel atas sebelum memutar motherboard.",
      },
      {
        title: "Navigasi Spasial 360°",
        desc: "Gunakan klik & drag untuk memutar sudut pandang, serta scroll untuk zoom in ke komponen mikroskopis pada PCB.",
      },
      {
        title: "Raycasting Click Selection",
        desc: "Klik langsung pada modul atau pin nomor pada motherboard 3D untuk memverifikasi penemuan lokasi target.",
      },
    ],
    metrics: [
      { label: "Target Modul", value: "5 Lokasi 3D" },
      { label: "Kontrol Kamera", value: "Orbit & Zoom" },
      { label: "Poin per Target", value: "100 XP" },
      { label: "Quick Take", value: "Dossier Edukasi" },
    ],
    hint: "Jika kesulitan menemukan posisi, periksa petunjuk arah seperti slot memori berada di kanan soket CPU dan VRM di bagian atas belakang.",
  },
  speed: {
    missionNum: "MISI 05 / 06",
    title: "SPEED CHALLENGE",
    subtitle: "Overclock 3D Diagnostic Sprint",
    category: "Reaction & Knowledge",
    difficulty: "Kecepatan Tinggi",
    threeType: "fan",
    overview: "Uji kecepatan refleks diagnostik Anda dalam sprint berwaktu! Kenali dan identifikasi model 3D komponen yang berputar di ruang diagnostik sebelum batas waktu 45 detik habis.",
    rules: [
      {
        title: "Amati Model 3D Berputar",
        desc: "Setiap ronde menampilkan modul 3D baru yang berputar di podium diagnostik tengah.",
      },
      {
        title: "Pilih Jawaban Secepatnya",
        desc: "Pilih nama komponen yang benar dari 4 opsi tombol yang tersedia sebelum waktu berjalan habis.",
      },
      {
        title: "Mekanisme Bonus & Penalti",
        desc: "Jawaban benar menambah waktu (+2 detik) dan menaikkan streak multiplier. Jawaban salah memotong waktu (-2 detik).",
      },
    ],
    metrics: [
      { label: "Waktu Awal", value: "45 Detik" },
      { label: "Bonus Benar", value: "+2 Detik Waktu" },
      { label: "Penalti Salah", value: "-2 Detik Waktu" },
      { label: "Streak Multiplier", value: "Hingga 5x XP" },
    ],
    hint: "Pertahankan combo streak setinggi mungkin untuk mendongkrak total perolehan skor hingga ratusan XP per ronde.",
  },
  identify: {
    missionNum: "MISI 06 / 06",
    title: "HARDWARE IDENTIFICATION",
    subtitle: "Component Recognition & Spec Analysis",
    category: "Component Recognition",
    difficulty: "Teknikal",
    threeType: "ssd",
    overview: "Analisis spesifikasi teknis, arsitektur bus, form factor, dan inspeksi fisik 3D untuk mengidentifikasi modul perangkat keras laptop yang tepat.",
    rules: [
      {
        title: "Analisis Matriks Parameter",
        desc: "Periksa tegangan operasional, antarmuka bus (PCIe/DDR5/BGA), dan form factor fisik pada lembar data.",
      },
      {
        title: "Inspeksi Model 3D",
        desc: "Amati bentuk fisik, pinout konektor, dan lapisan pelindung komponen pada viewport 3D interaktif.",
      },
      {
        title: "Pilih Klasifikasi Modul",
        desc: "Tentukan identitas modul yang paling tepat dari pilihan yang tersedia untuk mengumpulkan skor.",
      },
    ],
    metrics: [
      { label: "Target Modul", value: "5 Spesifikasi" },
      { label: "Metode Uji", value: "Analisis Spek" },
      { label: "Poin per Modul", value: "100 XP" },
      { label: "Target Akurasi", value: "100% Ideal" },
    ],
    hint: "Perhatikan parameter kunci seperti jalur PCIe x4 NVMe untuk SSD atau jumlah pin 262-pin untuk RAM SO-DIMM.",
  },
};

/**
 * GameBriefingView (Clean Light Theme)
 * Pre-game tactical briefing page shown before entering any challenge game,
 * and returned to when game finishes or player backs out.
 */
export default function GameBriefingView({ gameId, onStartGame, onBackToHub }) {
  const config = BRIEFING_CONFIGS[gameId] || BRIEFING_CONFIGS.quiz;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-between select-none py-1 sm:py-2 px-3 sm:px-4 animate-in fade-in duration-300">
      
      {/* ── Top Navigation & Breadcrumb ── */}
      <div className="flex items-center justify-between shrink-0 mb-3 sm:mb-4 border-b border-slate-200 pb-2.5">
        <button
          onClick={onBackToHub}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-all text-xs font-mono active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>← KEMBALI KE CHALLENGE HUB</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-700 font-bold">
            {config.missionNum}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            {config.difficulty}
          </span>
        </div>
      </div>

      {/* ── Main Briefing Grid: 2 Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch my-auto">
        
        {/* Left Column: Mission Target Dossier & Metrics (lg:col-span-5) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl shadow-slate-900/5 relative overflow-hidden">
          {/* Dossier Header */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-2 shrink-0">
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              MISSION BRIEFING DOSSIER
            </span>
            <span className="text-slate-600 font-medium">{config.category}</span>
          </div>

          {/* Central Graphical Mission Emblem Card (Non-3D) */}
          <div className="relative z-10 my-3 flex-1 min-h-[170px] sm:min-h-[190px] rounded-2xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 border border-slate-200/80 flex flex-col items-center justify-center p-4 text-center shadow-xs">
            {/* Ambient Pulse Ring */}
            <div className="relative mb-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center shadow-md shadow-emerald-500/10">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-mono font-bold shadow-xs">
                {config.difficulty}
              </div>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-tight">
              {config.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {config.subtitle}
            </p>

            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>REWARD: +500 XP ON COMPLETION</span>
            </div>
          </div>

          {/* Mission Metrics Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 shrink-0">
            {config.metrics.map((metric, idx) => (
              <div 
                key={idx}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center"
              >
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide block">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mission Objectives, Rules & Launch Action (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xl shadow-slate-900/5">
          
          <div>
            {/* Title & Lore */}
            <div className="mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
                PANDUAN & ATURAN MISI
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5 mb-1">
                {config.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-2">
                // {config.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {config.overview}
              </p>
            </div>

            {/* Step-by-Step Rules of Engagement */}
            <div className="space-y-2.5 my-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                CARA BERMAIN (RULES OF ENGAGEMENT):
              </span>
              {config.rules.map((rule, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-800 mb-0.5">
                      {rule.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans leading-tight">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tactical Hint */}
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 my-2 text-[11px] font-sans text-amber-900 leading-snug">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-800 font-mono mr-1">TIPS MISI:</strong>
                {config.hint}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100 mt-2">
            <button
              onClick={onBackToHub}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>KEMBALI KE HUB</span>
            </button>

            <button
              onClick={onStartGame}
              className="w-full sm:flex-1 py-3 px-6 rounded-xl font-display text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-[0.99] group"
            >
              <span>MULAI TANTANGAN</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
