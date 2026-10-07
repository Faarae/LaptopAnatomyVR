import React, { useState, useEffect } from 'react';
import ChallengeLabHub from '../challenge/ChallengeLabHub';
import GameShell from '../challenge/GameShell';
import MissionCompleteModal from '../challenge/MissionCompleteModal';
import QuickQuizGame from '../challenge/QuickQuizGame';
import MatchItGame from '../challenge/MatchItGame';
import DragPlaceGame from '../challenge/DragPlaceGame';
import FindComponentGame from '../challenge/FindComponentGame';
import SpeedChallengeGame from '../challenge/SpeedChallengeGame';

/**
 * CHALLENGE LAB CONTROLLER & HUB CONDUCTOR
 * - Main Hub: ChallengeLabHub (central interactive motherboard schematic & 5 tactile cards)
 * - Individual sub-pages for each game:
 *   1. Hardware Quiz (20 Question Bank, 10 randomized Q&A, streaks, feedback, results, player records)
 *   2. Match It
 *   3. Drag & Place
 *   4. Find Component
 *   5. Speed Challenge
 * - Seamless integration with website Navbar and 7-layer ambient background
 */
export default function ChallengeLab({ onNavigate, initialTab = 'hub' }) {
  // Active view: 'hub' | 'quiz' | 'match' | 'drag' | 'find' | 'speed'
  const [activeGame, setActiveGame] = useState(() => initialTab || 'hub');

  // Sync with Navbar dropdown navigation
  useEffect(() => {
    if (initialTab) {
      setActiveGame(initialTab);
    }
  }, [initialTab]);

  // Session score and feedback tracking
  const [sessionScore, setSessionScore] = useState(0);
  const [scoreDelta, setScoreDelta] = useState(0);

  // Mini-game completion modal data
  const [completionData, setCompletionData] = useState(null);

  // Key to restart a game instance
  const [gameKey, setGameKey] = useState(0);

  const handleScoreAdd = (points) => {
    setScoreDelta(points);
    setSessionScore(prev => prev + points);
  };

  const handleGameComplete = (results) => {
    setCompletionData(results);
  };

  const handlePlayAgain = () => {
    setCompletionData(null);
    setGameKey(k => k + 1);
  };

  const handleBackToHub = () => {
    setCompletionData(null);
    setActiveGame('hub');
  };

  // Mini-game metadata
  const gameConfigs = {
    match: {
      title: "MATCH IT",
      mission: "02 / 05",
      hintText: "Pair silicon modules with their roles: GPU handles raster graphics, CPU runs logic, RAM stores active program memory, and SSD holds permanent files.",
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
      totalSteps: 3,
    },
    speed: {
      title: "SPEED CHALLENGE",
      mission: "05 / 05",
      hintText: "Observe the glowing diagnostic target icon in the center and select the matching component name rapidly to preserve your combo multiplier.",
      totalSteps: 8,
    },
  };

  const curConfig = gameConfigs[activeGame] || gameConfigs.match;

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between bg-transparent text-white select-none relative">
      
      {/* ─────────────────────────────────────────────────────────────
          1. CHALLENGE LAB MAIN LANDING HUB
         ───────────────────────────────────────────────────────────── */}
      {activeGame === 'hub' && (
        <ChallengeLabHub
          onSelectGame={(gameId) => {
            setActiveGame(gameId);
            setCompletionData(null);
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. HARDWARE QUIZ SUB-PAGE (Full Q&A System)
         ───────────────────────────────────────────────────────────── */}
      {activeGame === 'quiz' && (
        <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 flex-1 flex flex-col justify-center animate-in fade-in duration-300">
          <QuickQuizGame
            key={gameKey}
            onScoreChange={handleScoreAdd}
            onComplete={handleGameComplete}
            onBackToHub={handleBackToHub}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. TACTILE MINI-GAME SUB-PAGES (Match, Drag, Find, Speed)
         ───────────────────────────────────────────────────────────── */}
      {activeGame !== 'hub' && activeGame !== 'quiz' && (
        <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 flex-1 flex flex-col justify-center animate-in fade-in duration-300">
          <GameShell
            title={curConfig.title}
            mission={curConfig.mission}
            score={sessionScore}
            scoreDelta={scoreDelta}
            totalSteps={curConfig.totalSteps}
            hintText={curConfig.hintText}
            onBackToHub={handleBackToHub}
          >
            {activeGame === 'match' && (
              <MatchItGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
              />
            )}

            {activeGame === 'drag' && (
              <DragPlaceGame
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
              />
            )}

            {activeGame === 'speed' && (
              <SpeedChallengeGame
                key={gameKey}
                onScoreChange={handleScoreAdd}
                onComplete={handleGameComplete}
              />
            )}
          </GameShell>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. MISSION COMPLETE DEBRIEFING MODAL (For mini-games)
         ───────────────────────────────────────────────────────────── */}
      {completionData && activeGame !== 'quiz' && (
        <MissionCompleteModal
          title={`${curConfig.title} COMPLETE`}
          score={completionData.score || sessionScore}
          accuracy={completionData.accuracy || "100%"}
          timeSpent={completionData.timeSpent || "01:12"}
          onPlayAgain={handlePlayAgain}
          onBackToHub={handleBackToHub}
        />
      )}

    </div>
  );
}
