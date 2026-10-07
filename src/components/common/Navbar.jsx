import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Laptop, Cpu, Trophy, HelpCircle, Shuffle, Move, Search, Timer, ArrowRight } from 'lucide-react';

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
          ? 'bg-[#04150F]/75 backdrop-blur-md border-b border-[#22C55E]/15 py-4' 
          : 'bg-transparent border-b border-transparent pt-7 pb-4 sm:pt-8 sm:pb-5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* ─────────────────────────────────────────────────────────────
            1. PURE TYPOGRAPHIC BRANDING (NO LAPTOP ICON, NO LOGO CONTAINER)
           ───────────────────────────────────────────────────────────── */}
        <button
          onClick={() => onNavigate('landing')}
          className="text-left group transition-all duration-200 focus:outline-none"
        >
          <span className="font-display font-bold text-lg sm:text-xl text-white tracking-wide group-hover:text-[#4ADE80] group-hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.5)] transition-all">
            Laptop Anatomy VR
          </span>
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
              ${activeParent === 'home' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}
            `}
          >
            <span>Home</span>
            {activeParent !== 'home' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC15]/60 rounded-full transition-all duration-300 group-hover:w-full" />
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
                ${activeParent === 'explore' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}
              `}
            >
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'explore' ? 'rotate-180 text-[#FACC15]' : ''}`} />
              {activeParent !== 'explore' && (
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC15]/60 rounded-full transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            {/* Explore Dropdown Panel */}
            {openDropdown === 'explore' && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-[#071911]/95 border border-[#22C55E]/30 p-2 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(34,197,94,0.15)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <button
                  onClick={() => handleDropdownItemClick('laptop-selection')}
                  className="w-full p-2.5 rounded-lg text-left hover:bg-[#0E2E20] transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0C2017] border border-[#22C55E]/30 flex items-center justify-center text-[#4ADE80] shrink-0 mt-0.5 group-hover:border-[#4ADE80]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white group-hover:text-[#4ADE80]">
                      Laptop Explorer
                    </h5>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Explore different laptop models
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleDropdownItemClick('component-library')}
                  className="w-full p-2.5 rounded-lg text-left hover:bg-[#0E2E20] transition-colors flex items-start gap-3 group mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0C2017] border border-[#22C55E]/30 flex items-center justify-center text-[#4ADE80] shrink-0 mt-0.5 group-hover:border-[#4ADE80]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white group-hover:text-[#4ADE80]">
                      Components
                    </h5>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">
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
                ${activeParent === 'challenge' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}
              `}
            >
              <span>Challenge</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'challenge' ? 'rotate-180 text-[#FACC15]' : ''}`} />
              {activeParent !== 'challenge' && (
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC15]/60 rounded-full transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            {/* Challenge Dropdown Panel */}
            {openDropdown === 'challenge' && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#071911]/95 border border-[#22C55E]/30 p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(34,197,94,0.15)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {/* Primary Hub Link */}
                <button
                  onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'hub' })}
                  className="w-full p-2.5 rounded-lg text-left bg-[#0A261A] border border-[#22C55E]/40 hover:border-[#4ADE80] transition-colors flex items-center justify-between group mb-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Trophy className="w-4 h-4 text-[#FACC15]" />
                    <span className="font-display font-bold text-xs text-white group-hover:text-[#4ADE80]">
                      Challenge Lab Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">All Missions →</span>
                </button>

                {/* Categorized Mini-Games List */}
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 px-2 uppercase tracking-wider block mb-1">
                    Direct Mini-Games:
                  </span>
                  {[
                    { id: 'quiz', label: 'Quick Quiz', icon: HelpCircle },
                    { id: 'match', label: 'Match It', icon: Shuffle },
                    { id: 'drag', label: 'Drag & Place', icon: Move },
                    { id: 'find', label: 'Find Component', icon: Search },
                    { id: 'speed', label: 'Speed Challenge', icon: Timer },
                  ].map((game) => {
                    const Icon = game.icon;
                    return (
                      <button
                        key={game.id}
                        onClick={() => handleDropdownItemClick('challenge-lab', { tab: game.id })}
                        className="w-full px-2.5 py-1.5 rounded-md text-left text-xs font-sans text-slate-300 hover:text-white hover:bg-[#0E2E20] transition-colors flex items-center gap-2"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#4ADE80]" />
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
              ${activeParent === 'how-it-works' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}
            `}
          >
            <span>How It Works</span>
            {activeParent !== 'how-it-works' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC15]/60 rounded-full transition-all duration-300 group-hover:w-full" />
            )}
          </button>

          {/* ABOUT (Direct Link) */}
          <button
            data-parent-id="about"
            onClick={() => onNavigate('about')}
            className={`
              group relative text-sm font-sans py-1 font-medium transition-colors duration-200
              ${activeParent === 'about' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}
            `}
          >
            <span>About</span>
            {activeParent !== 'about' && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC15]/60 rounded-full transition-all duration-300 group-hover:w-full" />
            )}
          </button>

          {/* Smooth Sliding Yellow Active Bar */}
          <div
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
            className="absolute bottom-0 left-0 h-[2.5px] bg-[#FACC15] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.7)] transition-all duration-300 ease-out pointer-events-none"
          />
        </nav>

        {/* ─────────────────────────────────────────────────────────────
            3. MOBILE MENU TOGGLE BUTTON (Section 13)
           ───────────────────────────────────────────────────────────── */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0E2E20] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE ACCORDION MENU OVERLAY (Section 13)
         ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071911]/95 border-b border-[#22C55E]/30 px-6 py-4 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="space-y-3">
            {/* Home */}
            <button
              onClick={() => handleDropdownItemClick('landing')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-white border-b border-slate-800"
            >
              Home
            </button>

            {/* Explore Accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(mobileAccordion === 'explore' ? null : 'explore')}
                className="w-full flex items-center justify-between py-2 font-display text-sm font-semibold text-white border-b border-slate-800"
              >
                <span>Explore</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'explore' ? 'rotate-180 text-[#FACC15]' : ''}`} />
              </button>
              {mobileAccordion === 'explore' && (
                <div className="pl-4 py-2 space-y-2 bg-[#04120B] rounded-lg mt-1">
                  <button
                    onClick={() => handleDropdownItemClick('laptop-selection')}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
                  >
                    Laptop Explorer
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('component-library')}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
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
                className="w-full flex items-center justify-between py-2 font-display text-sm font-semibold text-white border-b border-slate-800"
              >
                <span>Challenge</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'challenge' ? 'rotate-180 text-[#FACC15]' : ''}`} />
              </button>
              {mobileAccordion === 'challenge' && (
                <div className="pl-4 py-2 space-y-2 bg-[#04120B] rounded-lg mt-1">
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'hub' })}
                    className="w-full text-left text-xs font-sans text-[#FACC15] font-semibold py-1 flex items-center justify-between"
                  >
                    <span>Challenge Lab Hub</span>
                    <span className="text-[10px] text-slate-400 font-mono">Overview →</span>
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'quiz' })}
                    className="w-full text-left text-xs font-sans text-[#4ADE80] font-semibold py-1 flex items-center justify-between"
                  >
                    <span>Quick Quiz (Q&A Game)</span>
                    <span className="text-[10px] text-[#FACC15] font-mono">Play →</span>
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'match' })}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
                  >
                    Match It
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'drag' })}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
                  >
                    Drag & Place
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'find' })}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
                  >
                    Find Component
                  </button>
                  <button
                    onClick={() => handleDropdownItemClick('challenge-lab', { tab: 'speed' })}
                    className="w-full text-left text-xs font-sans text-slate-300 py-1"
                  >
                    Speed Challenge
                  </button>
                </div>
              )}
            </div>

            {/* How It Works */}
            <button
              onClick={() => handleDropdownItemClick('how-it-works')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-white border-b border-slate-800"
            >
              How It Works
            </button>

            {/* About */}
            <button
              onClick={() => handleDropdownItemClick('about')}
              className="w-full text-left py-2 font-display text-sm font-semibold text-white"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
