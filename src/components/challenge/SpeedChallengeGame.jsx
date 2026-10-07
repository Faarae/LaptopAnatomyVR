import React, { useState, useEffect } from 'react';
import { Timer, Zap, Trophy, Cpu, MemoryStick as Memory, HardDrive, Wifi, Wind, Battery, Radio } from 'lucide-react';

/**
 * SpeedChallengeGame
 * Mini-game 05: Fast-paced diagnostic sprint under a countdown clock.
 * Features combo streaks, urgency-scaled timer animations, and rapid component identification.
 */
export default function SpeedChallengeGame({ onScoreChange, onComplete }) {
  const challengePool = [
    {
      id: 'cpu',
      name: 'CPU Die',
      category: 'Processing Core',
      options: ['CPU Die', 'GPU VRM', 'BIOS Chip', 'Audio Codec'],
      correct: 'CPU Die',
      icon: Cpu,
    },
    {
      id: 'ram',
      name: 'DDR5 SO-DIMM',
      category: 'System Memory',
      options: ['NVMe Slot', 'DDR5 SO-DIMM', 'Thunderbolt IC', 'CMOS Battery'],
      correct: 'DDR5 SO-DIMM',
      icon: Memory,
    },
    {
      id: 'ssd',
      name: 'M.2 NVMe SSD',
      category: 'Solid Storage',
      options: ['Wi-Fi Card', 'Touchpad Controller', 'M.2 NVMe SSD', 'PCIe Switch'],
      correct: 'M.2 NVMe SSD',
      icon: HardDrive,
    },
    {
      id: 'wifi',
      name: 'Wi-Fi 6E Module',
      category: 'Wireless RF',
      options: ['Ethernet PHY', 'Wi-Fi 6E Module', 'Bluetooth Ant-2', 'eDP Driver'],
      correct: 'Wi-Fi 6E Module',
      icon: Wifi,
    },
    {
      id: 'fan',
      name: 'Blower Fan & Fins',
      category: 'Thermal System',
      options: ['Speaker Chamber', 'Blower Fan & Fins', 'Hinge Assembly', 'Battery Rail'],
      correct: 'Blower Fan & Fins',
      icon: Wind,
    },
    {
      id: 'battery',
      name: 'Li-Polymer Battery',
      category: 'Power Reservoir',
      options: ['Subwoofer Unit', 'Keyboard Matrix', 'Li-Polymer Battery', 'Type-C PD Chip'],
      correct: 'Li-Polymer Battery',
      icon: Battery,
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
  const Icon = curChallenge.icon;

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
    <div className="w-full h-full max-w-4xl mx-auto px-4 py-2 flex flex-col justify-between select-none">
      
      {/* Top Timer Bar & Streak Multiplier */}
      <div className="flex items-center justify-between shrink-0">
        
        {/* Urgency-scaled timer badge */}
        <div className={`
          flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono transition-all duration-300
          ${timeLeft <= 5 
            ? 'bg-red-950/80 border-red-500 animate-emergency-pulse text-red-400 font-bold' 
            : timeLeft <= 10 
              ? 'bg-[#261E0A]/90 border-[#FACC15] animate-amber-pulse text-[#FACC15] font-bold' 
              : 'bg-[#092217] border-[#22C55E]/40 text-[#4ADE80]'
          }
        `}>
          <Timer className="w-4 h-4 animate-spin" style={{ animationDuration: timeLeft <= 10 ? '2s' : '5s' }} />
          <span className="text-sm sm:text-base font-bold">
            00:{String(timeLeft).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-400">
            {timeLeft <= 5 ? 'CRITICAL' : timeLeft <= 10 ? 'URGENT' : 'REMAINING'}
          </span>
        </div>

        {/* Streak Combo Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0F2D1E] border border-[#FACC15]/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          <Zap className="w-4 h-4 text-[#FACC15] animate-bounce" />
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FACC15]">
            STREAK × {streak}
          </span>
          <span className="text-[9px] font-mono text-[#4ADE80]">
            +{streak * 100} XP
          </span>
        </div>

      </div>

      {/* Center Highlighted Hardware Module Target */}
      <div className={`
        relative w-full max-w-md mx-auto h-[180px] sm:h-[210px] rounded-2xl bg-[#061A12] border-2 border-[#22C55E] p-4 my-auto flex flex-col items-center justify-between shadow-[0_0_30px_rgba(34,197,94,0.3)]
        ${shakeWrong ? 'animate-shake border-red-500' : ''}
      `}>
        {/* Circuit Pattern */}
        <div className="absolute inset-0 cyber-circuit-grid opacity-40 pointer-events-none" />

        {/* Target Header */}
        <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-[#22C55E]/20 pb-1">
          <span className="text-[#4ADE80] font-bold">DIAGNOSTIC TARGET // #{roundIdx + 1}</span>
          <span>{curChallenge.category}</span>
        </div>

        {/* Glowing Center Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="relative w-16 h-16 rounded-2xl bg-[#0D3824] border border-[#4ADE80] flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            <Icon className="w-9 h-9 text-[#4ADE80] animate-pulse" />
          </div>
          <span className="text-[11px] font-mono text-[#FACC15] font-bold mt-2 uppercase tracking-wider">
            IDENTIFY THIS COMPONENT
          </span>
        </div>

        {/* Status Line */}
        <div className="relative z-10 text-[9px] font-mono text-slate-400">
          RAPID SELECTION ACTIVE • TAP CORRECT NAME BELOW
        </div>
      </div>

      {/* 4 Rapid Options (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 max-w-2xl mx-auto w-full shrink-0 pt-1">
        {curChallenge.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(opt)}
            className="p-3 sm:p-3.5 rounded-xl bg-[#09261A]/90 hover:bg-[#0E3B27] border border-[#22C55E]/40 hover:border-[#4ADE80] text-center font-mono text-xs sm:text-sm font-bold text-white transition-all duration-150 active:scale-95 shadow-sm"
          >
            {opt}
          </button>
        ))}
      </div>

    </div>
  );
}
