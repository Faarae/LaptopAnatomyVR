import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Laptop, Cpu, Trophy, HelpCircle, Shuffle, Move, Search, Timer, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Top Navigation Header (Global UI Revision)
 * - NO laptop icon, pure clean typography: "Laptop Anatomy VR"
 * - NO header box or divider: 100% transparent at top, subtle translucent blur on scroll
 * - Hierarchical dropdowns: Explore ▾ and Challenge ▾
 * - Smooth sliding active indicator & hover micro-interactions
 * - Responsive mobile accordion menu
 */
export default function Navbar({ currentPage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'explore' | 'challenge' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'explore' | 'challenge' | null

  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Scroll listener for subtle translucent background transition (Section 30 & 31)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active parent section
  const getActiveParent = () => {
    if (currentPage === 'landing') return 'home';
    if (currentPage === 'laptop-selection' || currentPage === 'laptop-detail' || currentPage === 'component-library') {
      return 'explore';
    }
    if (currentPage === 'challenge-lab') return 'challenge';
    if (currentPage === 'how-it-works') return 'how-it-works';
    if (currentPage === 'about') return 'about';
    return 'home';
  };

  const activeParent = getActiveParent();

  // Update sliding active indicator
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector(`[data-parent-id="${activeParent}"]`);
    if (activeBtn) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    }
  }, [activeParent, currentPage]);

  const handleDropdownItemClick = (page, options) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(page, options);
  };

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 select-none
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5' 
          : 'bg-transparent border-b border-transparent pt-5 pb-3 sm:pt-6 sm:pb-3.5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* ─────────────────────────────────────────────────────────────
            1. PURE TYPOGRAPHIC BRANDING (Clean modern typography)
           ───────────────────────────────────────────────────────────── */}
        <button
          onClick={() => onNavigate('landing')}
          className="text-left group transition-all duration-200 focus:outline-none flex items-center gap-2"
        >
          <span className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
            Laptop Anatomy VR
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* ─────────────────────────────────────────────────────────────
            2. DESKTOP HIERARCHICAL NAVIGATION WITH DROPDOWNS
           ───────────────────────────────────────────────────────────── */}
        <nav ref={navRef} className="hidden md:flex items-center gap-7 lg:gap-9 relative">
          
          {/* HOME (Direct Link) */}
          <button
            data-parent-id="home"
            onClick={() => onNavigate('landing')}
            className={`
              group relative text-sm font-sans py-1 font-medium transition-colors duration-200
              ${activeParent === 'home' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}
            `}
          >
            <span>Home</span>
            {activeParent !== 'home' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500/50 rounded-full transition-all duration-300 group-hover:w-full" />
            )}
          </button>

          {/* EXPLORE ▾ (Dropdown Menu) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('explore')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              data-parent-id="explore"
              onClick={() => onNavigate('laptop-selection')}
              className={`
                group relative text-sm font-sans py-1 font-medium flex items-center gap-1.5 transition-colors duration-200
                ${activeParent === 'explore' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}
              `}
            >
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'explore' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              {activeParent !== 'explore' && (
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500/50 rounded-full transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            {/* Explore Dropdown Panel */}
            {openDropdown === 'explore' && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200/90 p-2 shadow-xl shadow-slate-900/5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <button
                  onClick={() => handleDropdownItemClick('laptop-selection')}
                  className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-slate-800 group-hover:text-emerald-600">
                      Laptop Explorer
                    </h5>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                      Explore different laptop models
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleDropdownItemClick('component-library')}
                  className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors flex items-start gap-3 group mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-slate-800 group-hover:text-emerald-600">
                      Components
                    </h5>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                      Learn about laptop hardware
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* CHALLENGE ▾ (Dropdown Menu with Mini-Games) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('challenge')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              data-parent-id="challenge"
              onClick={() => onNavigate('challenge-lab')}
              className={`
                group relative text-sm font-sans py-1 font-medium flex items-center gap-1.5 transition-colors duration-200
                ${activeParent === 'challenge' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}
              `}
            >
              <span>Challenge</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'challenge' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              {activeParent !== 'challenge' && (
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500/50 rounded-full transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            {/* Challenge Dropdown Panel */}
            {openDropdown === 'challenge' && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 p-2.5 shadow-xl shadow-slate-900/5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {/* Primary Hub Link */}
                <button
                  onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'hub' })}
                  className="w-full p-2.5 rounded-xl text-left bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-colors flex items-center justify-between group mb-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="font-display font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                      Challenge Lab Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold">All Missions →</span>
                </button>

                {/* Categorized Mini-Games List */}
                <div className="space-y-1 pt-1 border-t border-slate-100">
                  <span className="text-[9px] font-mono text-slate-400 px-2 uppercase tracking-wider block mb-1">
                    Direct Mini-Games:
                  </span>
                  {[
                    { id: 'quiz', label: 'Quick Quiz', icon: HelpCircle },
                    { id: 'match', label: 'Match It', icon: Shuffle },
                    { id: 'drag', label: 'Drag & Place', icon: Move },
                    { id: 'find', label: 'Find Component', icon: Search },
                    { id: 'speed', label: 'Speed Challenge', icon: Timer },
                    { id: 'identify', label: 'Hardware Identification', icon: ShieldCheck },
                  ].map((game) => {
                    const Icon = game.icon;
                    return (
                      <button
                        key={game.id}
                        onClick={() => handleDropdownItemClick('challenge-lab', { tab: game.id })}
                        className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-sans text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2"
                      >
                        <Icon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{game.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* HOW IT WORKS (Direct Link) */}
          <button
            data-parent-id="how-it-works"
            onClick={() => onNavigate('how-it-works')}
            className={`
              group relative text-sm font-sans py-1 font-medium transition-colors duration-200
              ${activeParent === 'how-it-works' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}
            `}
          >
            <span>How It Works</span>
            {activeParent !== 'how-it-works' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500/50 rounded-full transition-all duration-300 group-hover:w-full" />
            )}
          </button>

          {/* ABOUT (Direct Link) */}
          <button
            data-parent-id="about"
            onClick={() => onNavigate('about')}
            className={`
              group relative text-sm font-sans py-1 font-medium transition-colors duration-200
              ${activeParent === 'about' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}
            `}
          >
            <span>About</span>
            {activeParent !== 'about' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500/50 rounded-full transition-all duration-300 group-hover:w-full" />
            )}
          </button>

          {/* Smooth Sliding Primary Green Active Indicator */}
          <div
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
            className="absolute bottom-0 left-0 h-[2.5px] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 ease-out pointer-events-none"
          />
        </nav>

        {/* ─────────────────────────────────────────────────────────────
            3. MOBILE MENU TOGGLE BUTTON
           ───────────────────────────────────────────────────────────── */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE ACCORDION MENU OVERLAY
         ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-6 py-4 backdrop-blur-xl shadow-lg animate-in fade-in duration-200">
          <div className="space-y-3">
            {/* Home */}
            <button
              onClick={() => handleDropdownItemClick('landing')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Home
            </button>

            {/* Explore Accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(mobileAccordion === 'explore' ? null : 'explore')}
                className="w-full flex items-center justify-between py-2 font-display text-sm font-semibold text-slate-800 border-b border-slate-100"
              >
                <span>Explore</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'explore' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'explore' && (
                <div className="pl-4 py-2 space-y-2 bg-slate-50 rounded-xl mt-1">
                  <button
                    onClick={() => handleDropdownItemClick('laptop-selection')}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Laptop Explorer
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('component-library')}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Components
                  </button>
                </div>
              )}
            </div>

            {/* Challenge Accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(mobileAccordion === 'challenge' ? null : 'challenge')}
                className="w-full flex items-center justify-between py-2 font-display text-sm font-semibold text-slate-800 border-b border-slate-100"
              >
                <span>Challenge</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'challenge' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'challenge' && (
                <div className="pl-4 py-2 space-y-2 bg-slate-50 rounded-xl mt-1">
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'hub' })}
                    className="w-full text-left text-xs font-sans text-amber-600 font-semibold py-1 flex items-center justify-between"
                  >
                    <span>Challenge Lab Hub</span>
                    <span className="text-[10px] text-slate-400 font-mono">Overview →</span>
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'quiz' })}
                    className="w-full text-left text-xs font-sans text-emerald-600 font-semibold py-1 flex items-center justify-between"
                  >
                    <span>Quick Quiz (Q&A Game)</span>
                    <span className="text-[10px] text-amber-500 font-mono">Play →</span>
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'match' })}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Match It
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'drag' })}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Drag & Place
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'find' })}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Find Component
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'speed' })}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Speed Challenge
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'identify' })}
                    className="w-full text-left text-xs font-sans text-slate-600 hover:text-emerald-600 py-1"
                  >
                    Hardware Identification
                  </button>
                </div>
              )}
            </div>

            {/* How It Works */}
            <button
              onClick={() => handleDropdownItemClick('how-it-works')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              How It Works
            </button>

            {/* About */}
            <button
              onClick={() => handleDropdownItemClick('about')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-slate-800"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
