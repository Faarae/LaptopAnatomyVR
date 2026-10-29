import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { isSfxMuted, toggleSfxMuted, subscribeSfxMute } from '../../utils/soundEffects';

/**
 * Global Navigation Bar — Laptop Anatomy Education
 * - Pure typographic brand header ("Laptop Anatomy Education") without logo icons or badges
 * - Click-to-toggle persistent Mega-Menu Popover dropdowns (w-88 to w-96) with smooth fade & slide-up
 * - Vibrant Tritone Palette accents (Emerald #10B981, Violet #8B5CF6, Amber/Gold #F59E0B) from DESKRIPSI_UI.md
 * - Built-in functional SFX Mute/Unmute toggle
 */
export default function Navbar({ currentPage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'explore' | 'challenge' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [sfxMuted, setSfxMutedState] = useState(() => isSfxMuted());

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return subscribeSfxMute((muted) => setSfxMutedState(muted));
  }, []);

  // Close dropdowns naturally when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveParent = () => {
    if (currentPage === 'landing') return 'home';
    if (
      currentPage === 'laptop-selection' ||
      currentPage === 'laptop-detail' ||
      currentPage === 'component-library'
    ) {
      return 'explore';
    }
    if (currentPage === 'webar') return 'webar';
    if (currentPage === 'challenge-lab') return 'challenge';
    if (currentPage === 'how-it-works') return 'how-it-works';
    if (currentPage === 'about') return 'about';
    return 'home';
  };

  const activeParent = getActiveParent();

  const handleToggleDropdown = (menuKey) => {
    setOpenDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleNavClick = (page, options) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(page, options);
  };

  const handleToggleMute = () => {
    const next = toggleSfxMuted();
    setSfxMutedState(next);
  };

  const navLinkClass = (parentKey) => `
    relative text-sm font-sans py-2 transition-colors duration-150 cursor-pointer border-b-2
    ${
      activeParent === parentKey
        ? 'border-emerald-600 text-emerald-700 font-semibold'
        : 'border-transparent text-slate-600 hover:text-emerald-600 font-medium'
    }
  `;

  const challengeMissions = [
    {
      id: 'quiz',
      num: '01',
      title: 'Quick Quiz',
      desc: 'Evaluasi diagnostik 10 soal & 3D pin',
      xp: '+500 XP',
      badgeClass: 'bg-emerald-50 border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
    },
    {
      id: 'match',
      num: '02',
      title: 'Match It',
      desc: 'Hubungkan komponen 3D dengan fungsinya',
      xp: '+400 XP',
      badgeClass: 'bg-violet-50 border-violet-200 text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600',
    },
    {
      id: 'drag',
      num: '03',
      title: 'Drag & Place',
      desc: 'Workbench perakitan soket PCB 3D',
      xp: '+500 XP',
      badgeClass: 'bg-amber-50 border-amber-200 text-amber-700 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
    },
    {
      id: 'find',
      num: '04',
      title: 'Find Component',
      desc: 'Pemindaian spasial titik lokasi PCB',
      xp: '+500 XP',
      badgeClass: 'bg-teal-50 border-teal-200 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
    },
    {
      id: 'speed',
      num: '05',
      title: 'Speed Challenge',
      desc: 'Sprint identifikasi 3D 45 detik',
      xp: '5x COMBO',
      badgeClass: 'bg-rose-50 border-rose-200 text-rose-700 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600',
    },
    {
      id: 'identify',
      num: '06',
      title: 'Hardware Identification',
      desc: 'Analisis matriks spesifikasi teknis',
      xp: '+500 XP',
      badgeClass: 'bg-purple-50 border-purple-200 text-purple-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
    },
  ];

  return (
    <header
      ref={headerRef}
      className={`
        sticky top-0 z-50 w-full transition-all duration-200 select-none
        ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs py-2.5'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">
        
        {/* 1. CLEAN TYPOGRAPHIC BRAND HEADER */}
        <button
          type="button"
          onClick={() => handleNavClick('landing')}
          className="text-left focus:outline-none cursor-pointer py-1 active:scale-[0.99] transition-transform"
        >
          <span className="font-display font-bold text-base sm:text-lg text-slate-900 tracking-tight hover:text-emerald-600 transition-colors">
            Laptop Anatomy Education
          </span>
        </button>

        {/* 2. DESKTOP NAVIGATION (CLICK-TO-TOGGLE MEGA-MENU POPOVERS) */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          <nav className="flex items-center gap-7 lg:gap-8">
            
            {/* Beranda */}
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className={navLinkClass('home')}
            >
              Beranda
            </button>

            {/* Edukasi VR (Click-to-Toggle Popover) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleToggleDropdown('explore')}
                aria-expanded={openDropdown === 'explore'}
                className={`${navLinkClass('explore')} flex items-center gap-1.5`}
              >
                <span>Edukasi VR</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'explore' ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Popover Mega-Menu Edukasi VR */}
              <div
                className={`
                  absolute top-full left-0 mt-2.5 w-80 sm:w-88 rounded-xl backdrop-blur-md bg-white/95 border border-slate-200/80 shadow-2xl p-3 z-50
                  transition-all duration-200 ease-out origin-top-left
                  ${
                    openDropdown === 'explore'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-1 pointer-events-none'
                  }
                `}
              >
                <div className="px-2 pb-2 mb-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    MODUL 01 • EDUKASI VR
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-600">
                    3D WebGL 60 FPS
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('laptop-selection')}
                    className={`group w-full p-2.5 rounded-lg text-left transition-all duration-150 flex items-start gap-3 cursor-pointer hover:bg-emerald-50/50 hover:translate-x-1 ${
                      currentPage === 'laptop-selection' || currentPage === 'laptop-detail'
                        ? 'bg-emerald-50/70 border border-emerald-200'
                        : 'border border-transparent'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      01
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Eksplorasi Arsitektur Laptop
                      </div>
                      <p className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                        Bedah motherboard 3D interaktif pada 3 kategori laptop
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('component-library')}
                    className={`group w-full p-2.5 rounded-lg text-left transition-all duration-150 flex items-start gap-3 cursor-pointer hover:bg-violet-50/50 hover:translate-x-1 ${
                      currentPage === 'component-library'
                        ? 'bg-violet-50/70 border border-violet-200'
                        : 'border border-transparent'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-md bg-violet-50 border border-violet-200 text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      02
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-violet-700 transition-colors">
                        Katalog Komponen 3D
                      </div>
                      <p className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                        Inspeksi 8 modul perangkat keras dan foto fisik asli
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Edukasi AR (Direct Link) */}
            <button
              type="button"
              onClick={() => handleNavClick('webar')}
              className={navLinkClass('webar')}
            >
              Edukasi AR
            </button>

            {/* Challenge (Click-to-Toggle Mega-Menu Popover) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleToggleDropdown('challenge')}
                aria-expanded={openDropdown === 'challenge'}
                className={`${navLinkClass('challenge')} flex items-center gap-1.5`}
              >
                <span>Challenge</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'challenge' ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Menu Popover Challenge (w-88 to w-96) */}
              <div
                className={`
                  absolute top-full right-0 lg:left-0 mt-2.5 w-88 sm:w-96 rounded-xl backdrop-blur-md bg-white/95 border border-slate-200/80 shadow-2xl p-3 z-50
                  transition-all duration-200 ease-out origin-top
                  ${
                    openDropdown === 'challenge'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-1 pointer-events-none'
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('challenge-lab', { tab: 'hub' })}
                  className="group w-full p-3 rounded-lg text-left bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 transition-all duration-150 flex items-center justify-between mb-2 cursor-pointer active:scale-[0.99]"
                >
                  <div>
                    <span className="font-display font-bold text-xs sm:text-sm block">
                      Challenge Lab Hub
                    </span>
                    <span className="text-[11px] text-emerald-50 font-sans">
                      Pusat kendali 6 misi evaluasi &amp; simulasi perakitan 3D
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-150 group-hover:translate-x-1 shrink-0" />
                </button>

                <div className="space-y-1 pt-1 border-t border-slate-100">
                  {challengeMissions.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleNavClick('challenge-lab', { tab: game.id })}
                      className="w-full p-2 rounded-lg text-left hover:bg-slate-50 hover:translate-x-1 transition-all duration-150 flex items-center gap-3 cursor-pointer group"
                    >
                      <span
                        className={`w-6 h-6 rounded-md border font-mono text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${game.badgeClass}`}
                      >
                        {game.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {game.title}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-amber-600">
                            {game.xp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans truncate">
                          {game.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panduan */}
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className={navLinkClass('how-it-works')}
            >
              Panduan
            </button>

            {/* Tentang */}
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={navLinkClass('about')}
            >
              Tentang
            </button>
          </nav>

          {/* 3. FUNCTIONAL SFX MUTE / UNMUTE TOGGLE */}
          <button
            type="button"
            data-no-sfx="true"
            onClick={handleToggleMute}
            title={sfxMuted ? 'Aktifkan Efek Suara (SFX)' : 'Matikan Efek Suara (SFX)'}
            className={`p-2 rounded-lg border text-xs font-mono transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-1.5 ${
              sfxMuted
                ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100/70'
            }`}
          >
            {sfxMuted ? (
              <VolumeX strokeWidth={1.75} className="w-4 h-4" />
            ) : (
              <Volume2 strokeWidth={1.75} className="w-4 h-4" />
            )}
            <span className="hidden lg:inline text-[11px] font-semibold">
              {sfxMuted ? 'SFX OFF' : 'SFX ON'}
            </span>
          </button>
        </div>

        {/* 4. MOBILE MENU & SFX CONTROLS */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            data-no-sfx="true"
            onClick={handleToggleMute}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 bg-white"
            title={sfxMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {sfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* 5. MOBILE ACCORDION MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden max-h-[calc(100dvh-3.75rem)] overflow-y-auto bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-4 shadow-xl animate-fade-slide-up">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className={`w-full text-left py-2.5 px-2 rounded-lg font-display text-sm border-b border-slate-100 ${
                activeParent === 'home' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-700'
              }`}
            >
              Beranda
            </button>

            {/* Edukasi VR Accordion */}
            <div className="border-b border-slate-100 pb-1.5">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'explore' ? null : 'explore')}
                className={`w-full flex items-center justify-between py-2.5 px-2 rounded-lg font-display text-sm ${
                  activeParent === 'explore' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-800'
                }`}
              >
                <span>Edukasi VR</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordion === 'explore' ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileAccordion === 'explore' && (
                <div className="p-2 space-y-1.5 bg-slate-50 rounded-lg mt-1 border border-slate-200/70">
                  <button
                    type="button"
                    onClick={() => handleNavClick('laptop-selection')}
                    className="w-full text-left text-xs font-sans font-semibold text-slate-800 hover:text-emerald-700 py-2 px-2.5 rounded-md flex items-center gap-2.5 active:bg-emerald-50"
                  >
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      01
                    </span>
                    <span>Eksplorasi Arsitektur Laptop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('component-library')}
                    className="w-full text-left text-xs font-sans font-semibold text-slate-800 hover:text-violet-700 py-2 px-2.5 rounded-md flex items-center gap-2.5 active:bg-violet-50"
                  >
                    <span className="w-6 h-6 rounded-md bg-violet-100 text-violet-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      02
                    </span>
                    <span>Katalog Komponen 3D</span>
                  </button>
                </div>
              )}
            </div>

            {/* Edukasi AR */}
            <button
              type="button"
              onClick={() => handleNavClick('webar')}
              className={`w-full text-left py-2.5 px-2 rounded-lg font-display text-sm border-b border-slate-100 ${
                activeParent === 'webar' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-700'
              }`}
            >
              Edukasi AR
            </button>

            {/* Challenge Accordion */}
            <div className="border-b border-slate-100 pb-1.5">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'challenge' ? null : 'challenge')}
                className={`w-full flex items-center justify-between py-2.5 px-2 rounded-lg font-display text-sm ${
                  activeParent === 'challenge' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-800'
                }`}
              >
                <span>Challenge</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordion === 'challenge' ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileAccordion === 'challenge' && (
                <div className="p-2 space-y-1.5 bg-slate-50 rounded-lg mt-1 border border-slate-200/70">
                  <button
                    type="button"
                    onClick={() => handleNavClick('challenge-lab', { tab: 'hub' })}
                    className="w-full text-left text-xs font-display font-bold text-white bg-emerald-600 py-2.5 px-3 rounded-lg flex items-center justify-between shadow-2xs"
                  >
                    <span>Challenge Lab Hub</span>
                    <span>→</span>
                  </button>
                  {challengeMissions.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleNavClick('challenge-lab', { tab: game.id })}
                      className="w-full text-left text-xs font-sans text-slate-700 hover:text-emerald-700 py-2 px-2 rounded-md flex items-center justify-between active:bg-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {game.num}
                        </span>
                        <span className="font-semibold">{game.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-600 font-bold">{game.xp}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className={`w-full text-left py-2.5 px-2 rounded-lg font-display text-sm border-b border-slate-100 ${
                activeParent === 'how-it-works' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-700'
              }`}
            >
              Panduan
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-2.5 px-2 rounded-lg font-display text-sm ${
                activeParent === 'about' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'font-medium text-slate-700'
              }`}
            >
              Tentang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
