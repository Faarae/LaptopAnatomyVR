import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import ImmersiveBackground from './components/common/ImmersiveBackground';
import LandingPage from './components/pages/LandingPage';
import LaptopSelection from './components/pages/LaptopSelection';
import LaptopDetail from './components/pages/LaptopDetail';
import ComponentLibrary from './components/pages/ComponentLibrary';
import ChallengeLab from './components/pages/ChallengeLab';
import HowItWorks from './components/pages/HowItWorks';
import About from './components/pages/About';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedLaptopId, setSelectedLaptopId] = useState('laptop-a');
  const [challengeTab, setChallengeTab] = useState('hub');
  
  // Page Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState('landing');

  // Mouse coordinates for global subtle parallax and interactive lighting
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Smooth page transition coordinator (Section 18 & 19)
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
      setIsTransitioning(false);
    }, 250);
  };

  const handleSelectLaptop = (laptopId) => {
    setSelectedLaptopId(laptopId);
    handleNavigate('laptop-detail');
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#04150F] text-[#F8FAFC] flex flex-col font-sans select-none relative">
      
      {/* Reusable Multi-Layer Ambient Interactive Technology Background (Sections 14-25, 29) */}
      <ImmersiveBackground activePage={currentPage} mousePos={mousePos} />

      {/* Unified Top Navigation Bar (Always visible across all pages) */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />

      {/* Main Page Viewport with Smooth Scale & Fade Transition */}
      <main 
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'scale(0.985)' : 'scale(1)',
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        }}
        className="flex-1 flex flex-col relative z-10 overflow-hidden"
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
      </main>
    </div>
  );
}
