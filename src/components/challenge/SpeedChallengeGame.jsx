import React, { useState, useEffect } from 'react';
import Component3DViewer from '../3d/Component3DViewer';
import { playSuccessChime, playErrorSfx } from '../../utils/soundEffects';

/**
 * SpeedChallengeGame
 * Mini-game 05: Fast-paced diagnostic sprint under a countdown clock with REAL 3D HARDWARE MODELS.
 * Standardized with rounded-xl / rounded-lg radii, streak counter, and futuristic chime SFX.
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
      realImage: '/images/components/pin-8.jpg',
    },
    {
      id: 'ram',
      name: 'DDR5 SO-DIMM',
      category: 'System Memory',
      options: ['NVMe Slot', 'DDR5 SO-DIMM', 'Thunderbolt IC', 'CMOS Battery'],
      correct: 'DDR5 SO-DIMM',
      threeType: 'ram',
      realImage: '/images/components/pin-4.jpg',
    },
    {
      id: 'ssd',
      name: 'M.2 NVMe SSD',
      category: 'Solid Storage',
      options: ['Wi-Fi Card', 'Touchpad Controller', 'M.2 NVMe SSD', 'PCIe Switch'],
      correct: 'M.2 NVMe SSD',
      threeType: 'ssd',
      realImage: '/images/components/pin-3.jpg',
    },
    {
      id: 'gpu',
      name: 'Discrete GPU Die',
      category: 'Graphics Silicon',
      options: ['Discrete GPU Die', 'Sound Blaster', 'LAN PHY', 'Hall Sensor'],
      correct: 'Discrete GPU Die',
      threeType: 'gpu',
      realImage: '/images/components/pin-1.jpg',
    },
    {
      id: 'wifi',
      name: 'Wi-Fi 6E Module',
      category: 'Wireless RF',
      options: ['Ethernet PHY', 'Wi-Fi 6E Module', 'Bluetooth Ant-2', 'eDP Driver'],
      correct: 'Wi-Fi 6E Module',
      threeType: 'wifi',
      realImage: '/images/components/pin-6.jpg',
    },
    {
      id: 'fan',
      name: 'Blower Fan & Fins',
      category: 'Thermal System',
      options: ['Speaker Chamber', 'Blower Fan & Fins', 'Hinge Assembly', 'Battery Rail'],
      correct: 'Blower Fan & Fins',
      threeType: 'fan',
      realImage: '/images/components/pin-2.jpg',
    },
    {
      id: 'battery',
      name: 'CMOS / Battery Cell',
      category: 'Power Reservoir',
      options: ['Subwoofer Unit', 'Keyboard Matrix', 'CMOS / Battery Cell', 'Type-C PD Chip'],
      correct: 'CMOS / Battery Cell',
      threeType: 'battery',
      realImage: '/images/components/pin-9.jpg',
    },
    {
      id: 'motherboard',
      name: 'Motherboard PCB',
      category: 'Main Logic Board',
      options: ['Daughterboard', 'Motherboard PCB', 'Trackpad Controller', 'IO Hub'],
      correct: 'Motherboard PCB',
      threeType: 'motherboard',
      realImage: '/images/components/pin-10.jpg',
    },
  ];

  const [timeLeft, setTimeLeft] = useState(45);
  const [roundIdx, setRoundIdx] = useState(0);
  const [streak, setStreak] = useState(1);
  const [localScore, setLocalScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const curChallenge = challengePool[roundIdx % challengePool.length];

  useEffect(() => {
    if (timeLeft <= 0 || isGameOver) {
      handleFinishGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

    const accuracyVal =
      totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
    onComplete?.({
      score: localScore,
      accuracy: `${accuracyVal}%`,
      timeSpent: `00:${String(45 - timeLeft).padStart(2, '0')}`,
    });
  };

  const handleSelectOption = (opt) => {
    if (isGameOver) return;

    setTotalAnswered((prev) => prev + 1);

    if (opt === curChallenge.correct) {
      playSuccessChime();
      const earnedScore = 100 * streak;
      setLocalScore((prev) => prev + earnedScore);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => Math.min(prev + 1, 5));
      setTimeLeft((prev) => Math.min(prev + 2, 60));
      onScoreChange?.(earnedScore);
      setRoundIdx((prev) => prev + 1);
    } else {
      playErrorSfx();
      setStreak(1);
      setTimeLeft((prev) => Math.max(prev - 2, 0));
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 400);
      setRoundIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full max-w-4xl mx-auto px-4 py-1.5 flex flex-col justify-between select-none">
      
      {/* Top Timer Bar & Visual Streak Multiplier */}
      <div className="flex items-center justify-between shrink-0 mb-2">
        
        {/* Urgency-scaled timer box */}
        <div
          className={`
            flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border font-mono transition-all duration-300 shadow-2xs
            ${
              timeLeft <= 5
                ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold animate-pulse'
                : timeLeft <= 10
                ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                : 'bg-white border-slate-200 text-emerald-700 font-bold'
            }
          `}
        >
          <span className="text-sm sm:text-base font-bold">
            00:{String(timeLeft).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            {timeLeft <= 5 ? 'KRITIS' : timeLeft <= 10 ? 'CEPAT' : 'SISA WAKTU'}
          </span>
        </div>

        {/* Visual Streak Combo Box */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
            STREAK ×{streak}
          </span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((bar) => (
              <span
                key={bar}
                className={`w-1.5 h-3.5 rounded-xs transition-colors ${
                  streak >= bar ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold">
            +{streak * 100} XP
          </span>
        </div>

      </div>

      {/* Center 3D Hardware Diagnostic Target */}
      <div
        className={`
          relative w-full max-w-lg mx-auto h-[210px] sm:h-[240px] rounded-xl bg-white border border-slate-200 p-3 my-auto flex flex-col items-center justify-between shadow-xs
          ${shakeWrong ? 'animate-shake border-rose-400 ring-2 ring-rose-200' : ''}
        `}
      >
        <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-1.5 shrink-0">
          <span className="text-emerald-700 font-bold">
            TARGET DIAGNOSTIK 3D // #{roundIdx + 1}
          </span>
          <span className="text-slate-700 font-semibold uppercase">
            {curChallenge.category}
          </span>
        </div>

        <div className="relative z-10 w-full h-[140px] sm:h-[165px] my-auto flex items-center justify-center">
          <Component3DViewer
            key={`${curChallenge.id}-${roundIdx}`}
            type={curChallenge.threeType}
            heightClass="h-[135px] sm:h-[160px]"
            className="border-0 bg-transparent shadow-none"
            autoRotateSpeed={2.8}
          />
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-500 shrink-0 border-t border-slate-200 pt-1.5 w-full text-center font-medium">
          AMATI OBJEK 3D • PILIH NAMA KOMPONEN YANG TEPAT
        </div>
      </div>

      {/* 4 Rapid Options (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mx-auto w-full shrink-0 pt-2">
        {curChallenge.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            data-no-sfx="true"
            onClick={() => handleSelectOption(opt)}
            className="p-3 rounded-lg bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-500 text-center font-mono text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-800 transition-all duration-150 active:scale-95 shadow-2xs hover:shadow-md cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>

    </div>
  );
}
