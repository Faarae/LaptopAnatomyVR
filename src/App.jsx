import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/common/Navbar';
import ImmersiveBackground from './components/common/ImmersiveBackground';
import LandingPage from './components/pages/LandingPage';
import LaptopSelection from './components/pages/LaptopSelection';
import LaptopDetail from './components/pages/LaptopDetail';
import ComponentLibrary from './components/pages/ComponentLibrary';
import ChallengeLab from './components/pages/ChallengeLab';
import HowItWorks from './components/pages/HowItWorks';
import About from './components/pages/About';
import WebARPage from './components/pages/WebARPage';
import { playClickSfx } from './utils/soundEffects';
import { APP_VERSION } from './constants/version';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedLaptopId, setSelectedLaptopId] = useState('laptop-a');
  const [challengeTab, setChallengeTab] = useState('hub');
  
  // Page Transition state (smooth fade-in & slide-up ~220ms)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState('landing');
  const mainRef = useRef(null);

  // Mouse coordinates for global subtle parallax and interactive lighting
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Global subtle mechanical click SFX on interactive buttons
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const btn = e.target.closest('button, a, [data-sfx="click"]');
      if (btn && !btn.disabled && !btn.dataset.noSfx) {
        playClickSfx();
      }
    };
    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  // Smooth fade-in & slide-up page transition coordinator (~220ms)
  const handleNavigate = (page, options = {}) => {
    if (page === 'challenge-lab') {
      setChallengeTab(options?.tab || 'hub');
    } else if (options?.tab) {
      setChallengeTab(options.tab);
    }
    if (page === currentPage && !options?.tab) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(page);
      setDisplayPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      setIsTransitioning(false);
    }, 200);
  };

  const handleSelectLaptop = (laptopId) => {
    setSelectedLaptopId(laptopId);
    handleNavigate('laptop-detail');
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans select-none relative">
      
      {/* Reusable Multi-Layer Ambient Interactive Technology Background */}
      <ImmersiveBackground activePage={currentPage} mousePos={mousePos} />

      {/* Persistent Global Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />

      {/* Main Page Viewport with Smooth Fade-In & Slide-Up Transition (220ms) */}
      <main 
        ref={mainRef}
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0px)',
          transition: 'opacity 0.22s ease-out, transform 0.22s ease-out',
        }}
        className="flex-1 flex flex-col relative z-10 overflow-y-auto overflow-x-hidden lg:overflow-hidden"
      >
        {displayPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {displayPage === 'laptop-selection' && (
          <LaptopSelection 
            onSelectLaptop={handleSelectLaptop} 
            onNavigate={handleNavigate} 
          />
        )}

        {displayPage === 'laptop-detail' && (
          <LaptopDetail 
            laptopId={selectedLaptopId} 
            onNavigate={handleNavigate} 
          />
        )}

        {displayPage === 'component-library' && (
          <ComponentLibrary onNavigate={handleNavigate} />
        )}

        {displayPage === 'challenge-lab' && (
          <ChallengeLab 
            onNavigate={handleNavigate} 
            initialTab={challengeTab} 
          />
        )}

        {displayPage === 'how-it-works' && (
          <HowItWorks onNavigate={handleNavigate} />
        )}

        {displayPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {displayPage === 'webar' && (
          <WebARPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Bottom-Right Version Indicator */}
      <div className="fixed bottom-2 right-2.5 sm:bottom-2.5 sm:right-3.5 z-40 pointer-events-none select-none">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs text-[10px] font-mono font-bold text-slate-500">
          <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500" />
          <span>{APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
}
