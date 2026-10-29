import React, { useRef, useState, useEffect } from 'react';
import {
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  RefreshCw,
  Volume2,
  VolumeX,
  Info,
  Maximize,
  Minimize,
  X,
} from 'lucide-react';
import {
  playSuccessChime,
  isSfxMuted,
  toggleSfxMuted,
  subscribeSfxMute,
} from '../../utils/soundEffects';

const AR_TARGETS = [
  {
    index: 0,
    code: 'TARGET 01: CPU',
    id: 'cpu',
    name: 'CPU (Central Processing Unit)',
    fullName: 'Intel Core i7-14650HX Mobile Processor',
    markerImg: '/ar/markers/marker-cpu.png',
    specsHighlight: '16 Cores (8P + 8E) • 24 Threads • 5.0 GHz Turbo • 55W TDP',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-500 ring-emerald-500/20 bg-emerald-50/40',
    accentBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    description:
      'Prosesor komputasi utama yang mendekode, mengoordinasikan, dan mengeksekusi instruksi di semua beban kerja sistem operasi serta aplikasi laptop.',
    laptopRole:
      'Secara langsung menentukan daya tanggap laptop, kompilasi kode, multitasking sistem operasi, dan efisiensi termal.',
    workingPrinciple:
      'Mengambil instruksi mesin dari RAM, mendekodekannya melalui unit mikro-kode, mengeksekusi logika aritmatika via ALU, dan menyimpan memori berulang di cache SRAM L1/L2/L3.',
    specs: {
      'Konfigurasi Core': '16 Cores (8P + 8E) / 24 Threads',
      'Base & Turbo Clock': '2.2 GHz Base / 5.0 GHz Max Turbo',
      'Smart Cache L3': '24 MB Intel Smart Cache',
      'Thermal Power (TDP)': '55W Base (Hingga 115W Turbo)',
      'Proses Fabrikasi': 'Intel 7 (10nm SuperFin)',
      'Paket Soket': 'BGA1964 Soldered Mobile Substrate',
    },
  },
  {
    index: 1,
    code: 'TARGET 02: RAM',
    id: 'ram',
    name: 'RAM (Random Access Memory)',
    fullName: 'Dual-Channel DDR5 SO-DIMM System Memory',
    markerImg: '/ar/markers/marker-ram.png',
    specsHighlight: 'DDR5-5600 MT/s • Dual-Channel • 1.1V Low Voltage • On-Die ECC',
    accentText: 'text-violet-700',
    accentBorder: 'border-violet-500 ring-violet-500/20 bg-violet-50/40',
    accentBadge: 'bg-violet-50 border-violet-200 text-violet-700',
    description:
      'Memori kerja volatil berkecepatan tinggi yang menyimpan aplikasi yang sedang aktif, tab browser terbuka, dan dataset kerja untuk akses instan oleh prosesor.',
    laptopRole:
      'Memungkinkan multitasking mulus di antara puluhan program tanpa harus memindahkan memori ke penyimpanan sekunder.',
    workingPrinciple:
      'Menyimpan data biner dalam kapasitor mikroskopis yang diperbarui ribuan kali per detik dengan konfigurasi saluran ganda (dual-channel).',
    specs: {
      'Standar Memori': 'DDR5 SO-DIMM 262-Pin',
      'Kecepatan Transfer': '5600 MT/s',
      'Lebar Bus & Saluran': 'Dual 32-bit Subchannels',
      'Bandwidth Puncak': 'Hingga 89.6 GB/s',
      'Tegangan Operasi': '1.1 Volt',
      'Latensi CAS': 'CL40 @ 5600 MT/s',
    },
  },
  {
    index: 2,
    code: 'TARGET 03: SSD',
    id: 'ssd',
    name: 'SSD (Solid State Drive)',
    fullName: '1 TB M.2 2280 NVMe PCIe Gen 4.0 x4 SSD',
    markerImg: '/ar/markers/marker-ssd.png',
    specsHighlight: 'PCIe 4.0 x4 • 7000 MB/s Read • 3D TLC NAND Flash • 600 TBW',
    accentText: 'text-amber-700',
    accentBorder: 'border-amber-500 ring-amber-500/20 bg-amber-50/40',
    accentBadge: 'bg-amber-50 border-amber-200 text-amber-700',
    description:
      'Media penyimpanan permanen non-volatile berkecepatan tinggi yang memuat sistem operasi, aplikasi, dan data pengguna dengan kecepatan transfer gigabyte per detik.',
    laptopRole:
      'Mempercepat waktu boot sistem operasi menjadi hitungan detik serta memuat aset aplikasi besar secara instan.',
    workingPrinciple:
      'Berkomunikasi langsung dengan CPU melalui 4 jalur PCIe Gen 4 menggunakan protokol NVMe tanpa latensi mekanis.',
    specs: {
      'Form Factor': 'M.2 2280 (22mm x 80mm)',
      'Antarmuka Bus': 'PCIe Gen 4.0 x4 NVMe 1.4',
      'Kecepatan Baca': 'Hingga 7,000 MB/s',
      'Kecepatan Tulis': 'Hingga 5,500 MB/s',
      'Ketahanan': '600 TBW (Terabytes Written)',
      'Konektor': 'Key-M Gold Pin Edge Connector',
    },
  },
];

/**
 * Edukasi AR — Integrated Workspace / Studio Sub-Page
 * - Streamlined zero-duplication layout:
 *   - Left/Center (8 cols): Dedicated Live WebAR Camera Scanner with scanning laser reticle + single unified 3D Toolbar
 *   - Right (4 cols): 3 Kartu Marker Sasaran (CPU, RAM, SSD) + Technical Dossier (Ikhtisar, Spesifikasi, Peran)
 * - No standalone tab redirect ("Tab Mandiri") and no duplicate floating controls inside the camera iframe.
 */
export default function WebARPage() {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const [selectedTargetIdx, setSelectedTargetIdx] = useState(0);
  const [detectedTargetIdx, setDetectedTargetIdx] = useState(null);
  const [inspectorTab, setInspectorTab] = useState('overview'); // 'overview' | 'specs' | 'role'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentScale, setCurrentScale] = useState(1.0);
  const [previewMarker, setPreviewMarker] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [sfxMuted, setSfxMutedState] = useState(() => isSfxMuted());

  const activeTarget = AR_TARGETS[selectedTargetIdx] || AR_TARGETS[0];

  useEffect(() => {
    return subscribeSfxMute((muted) => setSfxMutedState(muted));
  }, []);

  const sendToIframe = (action, payload = {}) => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.postMessage({ target: 'webar-iframe', action, ...payload }, '*');
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      if (!data || data.source !== 'webar-studio') return;
      if (data.type === 'targetFound' && typeof data.targetIndex === 'number') {
        setDetectedTargetIdx(data.targetIndex);
        setSelectedTargetIdx(data.targetIndex);
        playSuccessChime();
      } else if (data.type === 'targetLost') {
        setDetectedTargetIdx(null);
      } else if (data.type === 'autoRotateChanged') {
        setAutoRotate(Boolean(data.autoRotate));
      } else if (data.type === 'ttsState') {
        setIsSpeaking(Boolean(data.isSpeaking));
      } else if (data.type === 'scaleChanged' && typeof data.scale === 'number') {
        setCurrentScale(data.scale);
        if (typeof data.autoRotate === 'boolean') {
          setAutoRotate(data.autoRotate);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSelectTarget = (idx) => {
    setSelectedTargetIdx(idx);
    sendToIframe('selectTarget', { index: idx });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[calc(100dvh-3.75rem)] lg:h-[calc(100vh-3.75rem)] lg:max-h-[calc(100vh-3.75rem)] flex flex-col lg:overflow-hidden bg-transparent select-none"
    >
      {/* 1. COMPACT STUDIO SUB-HEADER */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 shrink-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-violet-700">
              Modul 02 • Edukasi Augmented Reality (MindAR)
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
              <h1 className="text-sm sm:text-lg font-bold font-display text-slate-900">
                Studio Pemindaian WebAR
              </h1>

              {/* Live Camera Detection Indicator */}
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 rounded-lg border text-[10px] sm:text-[11px] font-mono font-semibold transition-all duration-300 ${
                  detectedTargetIdx !== null
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm shadow-emerald-500/15'
                    : 'bg-amber-50/70 border-amber-300 text-amber-800'
                }`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-xs opacity-75 ${
                      detectedTargetIdx !== null ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-xs h-2 w-2 ${
                      detectedTargetIdx !== null ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span>
                  {detectedTargetIdx !== null
                    ? `TERDETEKSI: ${AR_TARGETS[detectedTargetIdx]?.code}`
                    : 'ARAHKAN KAMERA KE MARKER'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Action Controls: Quick Guide Modal + Fullscreen */}
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowGuideModal(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-violet-50/60 hover:border-violet-300 text-slate-700 hover:text-violet-700 text-xs font-sans font-semibold transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Info strokeWidth={1.75} className="w-3.5 h-3.5 text-violet-600" />
            <span>Cara Pindai</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50/60 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 text-xs font-sans font-semibold transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
          >
            {isFullscreen ? (
              <Minimize strokeWidth={1.75} className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Maximize strokeWidth={1.75} className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. STUDIO WORKSPACE GRID (CENTER VIEWPORT + RIGHT DRAWER) */}
      <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto p-3.5 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:overflow-hidden">
        
        {/* LEFT / CENTER COLUMN: LIVE CAMERA VIEWPORT & SINGLE 3D CONTROL TOOLBAR (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-3 min-h-0">
          
          {/* Main Interactive Camera Viewport Container */}
          <div
            className={`h-[46dvh] sm:h-[52dvh] lg:h-auto lg:flex-1 min-h-[260px] rounded-xl border bg-slate-900 overflow-hidden relative flex flex-col transition-all duration-300 ${
              detectedTargetIdx !== null
                ? 'border-emerald-500 ring-2 ring-emerald-500/25 shadow-lg shadow-emerald-500/15'
                : 'border-slate-300 shadow-sm'
            }`}
          >
            <iframe
              ref={iframeRef}
              src="/ar/index.html?embedded=1&studio=1&scan=1"
              title="Laptop Anatomy Education - WebAR Viewport"
              allow="camera *; microphone *; fullscreen *; accelerometer *; gyroscope *; xr-spatial-tracking *"
              className="w-full h-full flex-1 border-0 bg-transparent"
            />
          </div>

          {/* 3. UNIFIED 3D INTERACTION TOOLBAR (Zero Duplication) */}
          <div className="rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shrink-0 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mr-1">
                KONTROL 3D ({currentScale.toFixed(2)}x):
              </span>

              {/* Scale Controls: Zoom Out (-), Reset (1:1), Zoom In (+) */}
              <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 gap-0.5">
                <button
                  type="button"
                  onClick={() => sendToIframe('scaleDown')}
                  title="Perkecil Ukuran 3D (Zoom Out)"
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold text-slate-700 hover:bg-white hover:text-emerald-700 active:scale-90 transition-all cursor-pointer inline-flex items-center"
                >
                  <Minus strokeWidth={2} className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => sendToIframe('resetScale')}
                  title="Reset Ukuran & Rotasi (1:1)"
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-bold text-slate-700 hover:bg-white hover:text-emerald-700 border-x border-slate-200 active:scale-90 transition-all cursor-pointer"
                >
                  1:1
                </button>
                <button
                  type="button"
                  onClick={() => sendToIframe('scaleUp')}
                  title="Perbesar Ukuran 3D (Zoom In)"
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold text-slate-700 hover:bg-white hover:text-emerald-700 active:scale-90 transition-all cursor-pointer inline-flex items-center"
                >
                  <Plus strokeWidth={2} className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Manual Rotation Controls: Rotate Left / Rotate Right */}
              <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 gap-0.5">
                <button
                  type="button"
                  onClick={() => sendToIframe('rotLeft')}
                  title="Putar Kiri"
                  className="px-2.5 py-1.5 rounded-md text-xs font-sans font-semibold text-slate-700 hover:bg-white hover:text-violet-700 active:scale-90 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw strokeWidth={1.75} className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kiri</span>
                </button>
                <button
                  type="button"
                  onClick={() => sendToIframe('rotRight')}
                  title="Putar Kanan"
                  className="px-2.5 py-1.5 rounded-md text-xs font-sans font-semibold text-slate-700 hover:bg-white hover:text-violet-700 border-l border-slate-200 active:scale-90 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCw strokeWidth={1.75} className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kanan</span>
                </button>
              </div>

              {/* 360° Auto-Rotate Toggle */}
              <button
                type="button"
                onClick={() => sendToIframe('toggleAutoRotate')}
                title="Rotasi 360 Derajat Otomatis"
                className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  autoRotate
                    ? 'bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-violet-700 hover:bg-violet-50/40'
                }`}
              >
                <RefreshCw
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '6s' }}
                />
                <span>Rotasi 360°</span>
              </button>
            </div>

            {/* Right: Audio Narration (TTS) + SFX Mute */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => sendToIframe('toggleTTS')}
                className={`px-4 py-1.5 rounded-lg text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer inline-flex items-center gap-2 ${
                  isSpeaking
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-500/30'
                }`}
              >
                <Volume2
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`}
                />
                <span>{isSpeaking ? 'Hentikan Narasi' : 'Narasi Audio (TTS)'}</span>
              </button>

              <button
                type="button"
                data-no-sfx="true"
                onClick={() => setSfxMutedState(toggleSfxMuted())}
                title={sfxMuted ? 'Aktifkan Suara Efek (SFX)' : 'Matikan Suara Efek (SFX)'}
                className={`p-1.5 rounded-lg border transition-all active:scale-90 cursor-pointer ${
                  sfxMuted
                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                {sfxMuted ? (
                  <VolumeX strokeWidth={1.75} className="w-4 h-4" />
                ) : (
                  <Volume2 strokeWidth={1.75} className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TARGET MARKER SELECTOR & COMPONENT INSPECTOR (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 min-h-0 overflow-y-auto">
          
          {/* 1. Target Marker Cards Selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shrink-0 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Kartu Marker Sasaran
              </span>
              <span className="text-[11px] font-mono font-semibold text-violet-700">
                {detectedTargetIdx !== null
                  ? `Aktif: Target 0${detectedTargetIdx + 1}`
                  : 'Klik untuk Perbesar / Pindai'}
              </span>
            </div>

            <div className="space-y-2">
              {AR_TARGETS.map((target) => {
                const isSelected = selectedTargetIdx === target.index;
                const isDetected = detectedTargetIdx === target.index;
                return (
                  <div
                    key={target.id}
                    onClick={() => handleSelectTarget(target.index)}
                    className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-3 active:scale-[0.99] ${
                      isSelected
                        ? `${target.accentBorder} ring-2 shadow-xs`
                        : 'bg-white border-slate-200 hover:border-emerald-400/60 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={target.markerImg}
                      alt={target.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewMarker(target);
                      }}
                      title="Klik untuk memperbesar gambar marker"
                      className="w-12 h-14 object-cover rounded-md border border-slate-200 bg-slate-900 shrink-0 hover:opacity-90 transition-opacity"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold ${target.accentText}`}>
                          {target.code}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold">
                          {(isSelected || isDetected) && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-xs h-2 w-2 bg-emerald-500" />
                            </span>
                          )}
                          <span className={isDetected ? 'text-emerald-700' : 'text-slate-400'}>
                            {isDetected ? 'TERDETEKSI' : isSelected ? 'DIPILIH' : 'SIAP'}
                          </span>
                        </span>
                      </div>
                      <h3 className="text-xs font-bold font-display text-slate-900 truncate">
                        {target.name}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewMarker(target);
                          }}
                          className="px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-sans font-semibold cursor-pointer transition-colors"
                        >
                          Perbesar Marker
                        </button>
                        <a
                          href={target.markerImg}
                          download={`marker-${target.id}.png`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-sans font-semibold text-slate-600 hover:text-emerald-700"
                        >
                          Unduh PNG
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Active Target Technical Dossier */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex-1 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="border-b border-slate-200 pb-2.5 mb-2.5">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeTarget.accentText} block`}>
                  {activeTarget.code} • DATA EDUKASI
                </span>
                <h2 className="text-sm font-bold font-display text-slate-900 mt-0.5">
                  {activeTarget.fullName}
                </h2>
              </div>

              {/* Segmented Inspector Tabs */}
              <div className="grid grid-cols-3 rounded-lg border border-slate-200 bg-slate-100 p-0.5 mb-3">
                {[
                  { id: 'overview', label: 'Ikhtisar' },
                  { id: 'specs', label: 'Spesifikasi' },
                  { id: 'role', label: 'Peran' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInspectorTab(tab.id)}
                    className={`py-1.5 rounded-md text-xs font-sans font-semibold transition-all active:scale-95 cursor-pointer ${
                      inspectorTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {inspectorTab === 'overview' && (
                <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed animate-fade-slide-up">
                  <p>{activeTarget.description}</p>
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 block mb-0.5">
                      Ringkasan Spesifikasi
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">
                      {activeTarget.specsHighlight}
                    </span>
                  </div>
                </div>
              )}

              {inspectorTab === 'specs' && (
                <div className="divide-y divide-slate-100 text-xs animate-fade-slide-up">
                  {Object.entries(activeTarget.specs).map(([k, v]) => (
                    <div key={k} className="py-1.5 flex items-center justify-between gap-2">
                      <span className="text-slate-500">{k}</span>
                      <span className="font-mono font-semibold text-slate-800 text-right">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {inspectorTab === 'role' && (
                <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed animate-fade-slide-up">
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      Peran pada Laptop:
                    </span>
                    <p>{activeTarget.laptopRole}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      Prinsip Kerja:
                    </span>
                    <p>{activeTarget.workingPrinciple}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: PREVIEW KARTU MARKER UNTUK DIPINDAI DARI LAYAR */}
      {previewMarker && (
        <div
          onClick={() => setPreviewMarker(null)}
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-slide-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 flex flex-col items-center text-center shadow-2xl"
          >
            <span className={`text-xs font-mono font-bold ${previewMarker.accentText}`}>
              {previewMarker.code}
            </span>
            <h3 className="text-base font-bold font-display text-slate-900 mt-0.5 mb-3">
              {previewMarker.fullName}
            </h3>

            <img
              src={previewMarker.markerImg}
              alt={previewMarker.name}
              className="w-64 sm:w-72 aspect-[4/5] object-contain rounded-lg border border-slate-200 bg-slate-950 p-2 mb-4"
            />

            <p className="text-xs text-slate-500 mb-4">
              Arahkan kamera perangkat yang membuka Studio WebAR ke gambar kartu marker di atas.
            </p>

            <div className="flex items-center gap-3 w-full">
              <a
                href={previewMarker.markerImg}
                download={`marker-${previewMarker.id}.png`}
                className="flex-1 py-2.5 px-4 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold active:scale-95 transition-all"
              >
                Unduh PNG
              </a>
              <button
                type="button"
                onClick={() => setPreviewMarker(null)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PANDUAN CEPAT PEMINDAIAN WEBAR */}
      {showGuideModal && (
        <div
          onClick={() => setShowGuideModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-slide-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-700">
                  Panduan Cepat • MindAR Computer Vision
                </p>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Cara Memindai Kartu Marker WebAR
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200">
                <span className="text-xs font-mono font-bold text-emerald-700 block mb-0.5">
                  01 / IZINKAN AKSES KAMERA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pastikan browser mengizinkan akses kamera WebRTC. Area bidik tengah akan menampilkan garis laser hijau yang bergerak naik-turun.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-violet-50/50 border border-violet-200">
                <span className="text-xs font-mono font-bold text-violet-700 block mb-0.5">
                  02 / SIAPKAN &amp; ARAHKAN KARTU MARKER
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Klik tombol <strong>Perbesar Marker</strong> pada panel kanan untuk menampilkan marker di layar kedua/HP, lalu arahkan ke depan kamera pada jarak 20–35 cm.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200">
                <span className="text-xs font-mono font-bold text-amber-700 block mb-0.5">
                  03 / MANIPULASI 3D &amp; AUDIO NARASI
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Saat status berubah menjadi <strong>TERDETEKSI</strong>, gunakan toolbar di bawah kamera untuk mengatur skala (0.25x–2.5x), rotasi 360°, serta mendengarkan penjelasan suara TTS.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-display font-semibold active:scale-95 transition-all cursor-pointer"
            >
              Mengerti, Kembali ke Studio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
