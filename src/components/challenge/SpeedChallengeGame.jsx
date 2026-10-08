import React, { useState, useEffect } from 'react';
import { Timer, Zap, Trophy } from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * SpeedChallengeGame
 * Mini-game 05: Fast-paced diagnostic sprint under a countdown clock with REAL 3D HARDWARE MODELS.
 * Features combo streaks, urgency-scaled timer animations, and rapid 3D component identification.
 */
export default function SpeedChallengeGame({ onScoreChange, onComplete }) {
  const challengePool = [
    {
      id: 'cpu',
      name: 'CPU Die',
      category: 'Processing Core',
      options: ['CPU Die', 'GPU VRM', 'BIOS Chip', 'Audio Codec'],
      correct: 'CPU Die',
      threeType: 'cpu',
    },
    {
      id: 'ram',
      name: 'DDR5 SO-DIMM',
      category: 'System Memory',
      options: ['NVMe Slot', 'DDR5 SO-DIMM', 'Thunderbolt IC', 'CMOS Battery'],
      correct: 'DDR5 SO-DIMM',
      threeType: 'ram',
    },
    {
      id: 'ssd',
      name: 'M.2 NVMe SSD',
      category: 'Solid Storage',
      options: ['Wi-Fi Card', 'Touchpad Controller', 'M.2 NVMe SSD', 'PCIe Switch'],
      correct: 'M.2 NVMe SSD',
      threeType: 'ssd',
    },
    {
      id: 'gpu',
      name: 'Discrete GPU Die',
      category: 'Graphics Silicon',
      options: ['Discrete GPU Die', 'Sound Blaster', 'LAN PHY', 'Hall Sensor'],
      correct: 'Discrete GPU Die',
      threeType: 'gpu',
    },
    {
      id: 'wifi',
      name: 'Wi-Fi 6E Module',
      category: 'Wireless RF',
      options: ['Ethernet PHY', 'Wi-Fi 6E Module', 'Bluetooth Ant-2', 'eDP Driver'],
      correct: 'Wi-Fi 6E Module',
      threeType: 'wifi',
    },
    {
      id: 'fan',
      name: 'Blower Fan & Fins',
      category: 'Thermal System',
      options: ['Speaker Chamber', 'Blower Fan & Fins', 'Hinge Assembly', 'Battery Rail'],
      correct: 'Blower Fan & Fins',
      threeType: 'fan',
    },
    {
      id: 'battery',
      name: 'CMOS / Battery Cell',
      category: 'Power Reservoir',
      options: ['Subwoofer Unit', 'Keyboard Matrix', 'CMOS / Battery Cell', 'Type-C PD Chip'],
      correct: 'CMOS / Battery Cell',
      threeType: 'battery',
    },
    {
      id: 'motherboard',
      name: 'Motherboard PCB',
      category: 'Main Logic Board',
      options: ['Daughterboard', 'Motherboard PCB', 'Trackpad Controller', 'IO Hub'],
      correct: 'Motherboard PCB',
      threeType: 'motherboard',
    },
  ];

  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds countdown
  const [roundIdx, setRoundIdx] = useState(0);
  const [streak, setStreak] = useState(1);
  const [localScore, setLocalScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const curChallenge = challengePool[roundIdx % challengePool.length];

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0 || isGameOver) {
      handleFinishGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleFinishGame = () => {
    if (isGameOver) return;
    setIsGameOver(true);

    const accuracyVal = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
    onComplete?.({
      score: localScore,
      accuracy: `${accuracyVal}%`,
      timeSpent: `00:${String(45 - timeLeft).padStart(2, '0')}`,
    });
  };

  const handleSelectOption = (opt) => {
    if (isGameOver) return;

    setTotalAnswered(prev => prev + 1);

    if (opt === curChallenge.correct) {
      // Correct!
      const earnedScore = 100 * streak;
      setLocalScore(prev => prev + earnedScore);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => Math.min(prev + 1, 5)); // Cap streak at 5x
      setTimeLeft(prev => Math.min(prev + 2, 60)); // +2s bonus
      onScoreChange?.(earnedScore);
      setRoundIdx(prev => prev + 1);
    } else {
      // Wrong!
      setStreak(1); // Reset streak
      setTimeLeft(prev => Math.max(prev - 2, 0)); // -2s penalty
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 400);
      setRoundIdx(prev => prev + 1);
    }
  };

  return (
    <div className="w-full h-full max-w-4xl mx-auto px-4 py-1.5 flex flex-col justify-between select-none">
      
      {/* Top Timer Bar & Streak Multiplier */}
      <div className="flex items-center justify-between shrink-0 mb-1">
        
        {/* Urgency-scaled timer badge */}
        <div className={`
          flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border font-mono transition-all duration-300 shadow-xs
          ${timeLeft <= 5 
            ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' 
            : timeLeft <= 10 
              ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold' 
              : 'bg-white border-slate-200/90 text-emerald-700 font-bold'
          }
        `}>
          <Timer className="w-4 h-4 animate-spin" style={{ animationDuration: timeLeft <= 10 ? '2s' : '5s' }} />
          <span className="text-sm sm:text-base font-bold">
            00:{String(timeLeft).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
            {timeLeft <= 5 ? 'CRITICAL' : timeLeft <= 10 ? 'URGENT' : 'REMAINING'}
          </span>
        </div>

        {/* Streak Combo Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="font-mono text-xs sm:text-sm font-bold text-amber-700">
            STREAK × {streak}
          </span>
          <span className="text-[9px] font-mono text-emerald-700 font-semibold">
            +{streak * 100} XP
          </span>
        </div>

      </div>

      {/* Center 3D Hardware Diagnostic Target */}
      <div className={`
        relative w-full max-w-lg mx-auto h-[210px] sm:h-[240px] rounded-2xl bg-white border border-slate-200/90 p-3 my-auto flex flex-col items-center justify-between shadow-sm
        ${shakeWrong ? 'animate-shake border-rose-400 ring-2 ring-rose-200' : ''}
      `}>
        {/* Circuit Pattern */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-10 pointer-events-none rounded-2xl overflow-hidden" />

        {/* Target Header */}
        <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-1.5 shrink-0">
          <span className="text-emerald-700 font-bold">3D DIAGNOSTIC TARGET // #{roundIdx + 1}</span>
          <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{curChallenge.category}</span>
        </div>

        {/* REAL 3D MODEL VIEWPORT */}
        <div className="relative z-10 w-full h-[140px] sm:h-[165px] my-auto flex items-center justify-center">
          <Component3DViewer 
            key={`${curChallenge.id}-${roundIdx}`}
            type={curChallenge.threeType}
            heightClass="h-[135px] sm:h-[160px]"
            className="border-0 bg-transparent shadow-none"
            autoRotateSpeed={2.8}
          />
        </div>

        {/* Status Line */}
        <div className="relative z-10 text-[9px] font-mono text-slate-500 shrink-0 border-t border-slate-200 pt-1.5 w-full text-center font-medium">
          ORBIT 3D TARGET • SELECT MATCHING COMPONENT NAME
        </div>
      </div>

      {/* 4 Rapid Options (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto w-full shrink-0 pt-1">
        {curChallenge.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(opt)}
            className="p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-500 text-center font-mono text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-800 transition-all duration-150 active:scale-95 shadow-xs hover:shadow-sm"
          >
            {opt}
          </button>
        ))}
      </div>

    </div>
  );
}
