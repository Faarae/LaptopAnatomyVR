import React, { useState, useEffect } from 'react';
import ChallengeLabHub from '../challenge/ChallengeLabHub';
import GameShell from '../challenge/GameShell';
import MissionCompleteModal from '../challenge/MissionCompleteModal';
import GameBriefingView from '../challenge/GameBriefingView';
import QuickQuizGame from '../challenge/QuickQuizGame';
import MatchItGame from '../challenge/MatchItGame';
import DragPlaceGame from '../challenge/DragPlaceGame';
import FindComponentGame from '../challenge/FindComponentGame';
import SpeedChallengeGame from '../challenge/SpeedChallengeGame';
import HardwareIdentificationGame from '../challenge/HardwareIdentificationGame';

/**
 * CHALLENGE LAB CONTROLLER & HUB CONDUCTOR
 * - Main Hub: ChallengeLabHub (central interactive schematic & 5 cards)
 * - Individual sub-pages for each game:
 *   1. Hardware Quiz
 *   2. Match It (3D + Randomized)
 *   3. Drag & Place (3D Assets)
 *   4. Find Component (3D Spatial locator)
 *   5. Speed Challenge (3D Target)
 * - REQUIREMENT 7: Every challenge sub-page starts at GameBriefingView (Penjelasan Game) first!
 *   When the game ends or player backs out, it returns to the briefing view first before the hub.
 */
export default function ChallengeLab({ onNavigate, initialTab = 'hub' }) {
  // Active game: 'hub' | 'quiz' | 'match' | 'drag' | 'find' | 'speed'
  const [activeGame, setActiveGame] = useState(() => initialTab || 'hub');

  // Game lifecycle mode: 'briefing' | 'playing'
  const [gameMode, setGameMode] = useState('briefing');

  // Sync with Navbar dropdown navigation
  useEffect(() => {
    if (initialTab) {
      setActiveGame(initialTab);
      setGameMode('briefing');
    }
  }, [initialTab]);

  // Session score and feedback tracking
  const [sessionScore, setSessionScore] = useState(0);
  const [scoreDelta, setScoreDelta] = useState(0);

  // Mini-game completion modal data
  const [completionData, setCompletionData] = useState(null);

  // Key to restart a game instance
  const [gameKey, setGameKey] = useState(0);
  const [curTactileStep, setCurTactileStep] = useState(1);

  // Reset step on game change or restart
  useEffect(() => {
    setCurTactileStep(1);
  }, [activeGame, gameKey]);

  const handleScoreAdd = (points) => {
    setScoreDelta(points);
    setSessionScore(prev => prev + points);
  };

  const handleGameComplete = (results) => {
    setCompletionData(results);
  };

  const handlePlayAgain = () => {
    setCompletionData(null);
    setCurTactileStep(1);
    setGameMode('playing');
    setGameKey(k => k + 1);
  };

  // Back to game explanation / briefing page first
  const handleBackToBriefing = () => {
    setCompletionData(null);
    setCurTactileStep(1);
    setGameMode('briefing');
  };

  // Back to Challenge Hub from briefing
  const handleBackToHub = () => {
    setCompletionData(null);
    setCurTactileStep(1);
    setGameMode('briefing');
    setActiveGame('hub');
  };

  // Mini-game metadata
  const gameConfigs = {
    match: {
      title: "MATCH IT",
      mission: "02 / 05",
      hintText: "Pair 3D silicon modules with their roles: GPU handles raster graphics, CPU runs logic, RAM stores active program memory, and SSD holds permanent files.",
      totalSteps: 4,
    },
    drag: {
      title: "DRAG & PLACE",
      mission: "03 / 05",
      hintText: "Look for Socket Pin 001 corner marking on the CPU socket, key notch on the DDR5 slot, and the standoff screw on the M.2 NVMe slot.",
      totalSteps: 3,
    },
    find: {
      title: "FIND COMPONENT",
      mission: "04 / 05",
      hintText: "Scan the motherboard: RAM modules sit beside the CPU socket, while the NVMe SSD card lies parallel with high-speed PCIe traces.",
      totalSteps: 5,
    },
    speed: {
      title: "SPEED CHALLENGE",
      mission: "05 / 05",
      hintText: "Observe the rotating 3D diagnostic target in the center and select the matching component name rapidly to preserve your combo multiplier.",
      totalSteps: 8,
    },
    identify: {
      title: "HARDWARE IDENTIFICATION",
      mission: "06 / 06",
      hintText: "Analyze the technical specifications matrix and 3D silicon geometry to identify the matching hardware module.",
      totalSteps: 5,
    },
  };

  const curConfig = gameConfigs[activeGame] || gameConfigs.match;

  return (
    <div className="w-full h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden flex flex-col justify-between bg-transparent text-[#E8EEEA] select-none relative">
      
      {/* ─────────────────────────────────────────────────────────────
          1. CHALLENGE LAB MAIN LANDING HUB
         ───────────────────────────────────────────────────────────── */}
      {activeGame === 'hub' && (
        <ChallengeLabHub
          onSelectGame={(gameId) => {
            setActiveGame(gameId);
            setGameMode('briefing');
            setCompletionData(null);
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. GAME EXPLANATION & BRIEFING SUB-PAGE (Requirement 7)
          Shown whenever a challenge sub-page is active and in 'briefing' mode
         ───────────────────────────────────────────────────────────── */}
      {activeGame !== 'hub' && gameMode === 'briefing' && (
        <div className="w-full max-w-5xl mx-auto py-2 px-3 sm:px-6 flex-1 flex flex-col justify-center overflow-hidden animate-in fade-in duration-300">
          <GameBriefingView
            gameId={activeGame}
            onStartGame={() => {
              setGameMode('playing');
              setGameKey(k => k + 1);
            }}
            onBackToHub={handleBackToHub}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. HARDWARE QUIZ PLAYING SUB-PAGE (Full Q&A System)
         ───────────────────────────────────────────────────────────── */}
      {activeGame === 'quiz' && gameMode === 'playing' && (
        <div className="w-full max-w-5xl mx-auto py-2 px-4 sm:px-6 flex-1 flex flex-col justify-center overflow-hidden animate-in fade-in duration-300">
          <QuickQuizGame
            key={gameKey}
            autoStart={true}
            onScoreChange={handleScoreAdd}
            onComplete={handleGameComplete}
            onBackToHub={handleBackToBriefing}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. FULLSCREEN 3D DRAG & PLACE WORKBENCH (Like Laptop Explore)
         ───────────────────────────────────────────────────────────── */}
      {activeGame === 'drag' && gameMode === 'playing' && (
        <div className="relative w-full h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden select-none bg-slate-100 animate-in fade-in duration-300">
          <DragPlaceGame
            key={gameKey}
            onScoreChange={handleScoreAdd}
            onComplete={handleGameComplete}
            onBackToBriefing={handleBackToBriefing}
            sessionScore={sessionScore}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. TACTILE MINI-GAME PLAYING SUB-PAGES (Match, Find, Speed, Identify)
         ───────────────────────────────────────────────────────────── */}
      {activeGame !== 'hub' && activeGame !== 'quiz' && activeGame !== 'drag' && gameMode === 'playing' && (
        <div className="w-full max-w-5xl mx-auto py-2 px-4 sm:px-6 flex-1 flex flex-col justify-center overflow-hidden animate-in fade-in duration-300">
          <GameShell
            title={curConfig.title}
            mission={curConfig.mission}
            score={sessionScore}
            scoreDelta={scoreDelta}
            currentStep={curTactileStep}
            totalSteps={curConfig.totalSteps}
            hintText={curConfig.hintText}
            onBackToHub={handleBackToBriefing}
          >
            {activeGame === 'match' && (
              <MatchItGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
              />
            )}

            {activeGame === 'find' && (
              <FindComponentGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
                onStepChange={(step) => setCurTactileStep(step)}
              />
            )}

            {activeGame === 'speed' && (
              <SpeedChallengeGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
              />
            )}

            {activeGame === 'identify' && (
              <HardwareIdentificationGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
                onStepChange={(step) => setCurTactileStep(step)}
              />
            )}
          </GameShell>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. MISSION COMPLETE DEBRIEFING MODAL (For mini-games)
          Back returns to the Game Explanation Page (handleBackToBriefing)!
         ───────────────────────────────────────────────────────────── */}
      {completionData && activeGame !== 'quiz' && (
        <MissionCompleteModal
          title={`${curConfig.title} COMPLETE`}
          score={completionData.score || sessionScore}
          accuracy={completionData.accuracy || "100%"}
          timeSpent={completionData.timeSpent || "01:12"}
          onPlayAgain={handlePlayAgain}
          onBackToHub={handleBackToBriefing}
        />
      )}

    </div>
  );
}
