import React, { useState, useEffect } from 'react';
import { 
  Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  HelpCircle, Flame, Award, Zap, Play, ArrowLeft, Lightbulb, Star, ShieldCheck, BarChart3,
  Box, Compass
} from 'lucide-react';
import { getRandomQuizMatch } from '../../data/quizQuestions';
import { getQuizRecords, saveQuizMatchResult } from '../../utils/quizStorage';
import Component3DViewer from '../3d/Component3DViewer';

/**
 * QUICK QUIZ GAME & Q&A SYSTEM WITH 3D COMPONENT INSPECTOR
 * Fully aligned with the Laptop Anatomy VR Design System:
 * - 20 Hardware Question Bank with 3D Pin mappings (Pins 1..10)
 * - 10 Randomized questions per match (no duplicates)
 * - Shuffled A/B/C/D options per question with preserved answer key
 * - Interactive 3D Motherboard Digital Twin alongside questions
 * - Combo / Streak multiplier (+100 base, +25 * combo)
 * - Grade rating system (S: 9-10, A: 8, B: 7, C: 0-6)
 * - Answer feedback with educational explanation & 3D architecture insights
 * - Persistent Player Records (Best Score, Best Accuracy, Best Streak, Games Played, Highest Grade)
 * - Results screen with New Record detection
 */
export default function QuickQuizGame({ onScoreChange, onComplete, onBackToHub }) {
  // Game lifecycle stage: 'overview' | 'playing' | 'result'
  const [gameStage, setGameStage] = useState('overview');

  // Persistent Player Records
  const [records, setRecords] = useState(getQuizRecords);

  // Match State
  const [matchQuestions, setMatchQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Active Question Answer State
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [comboGainNotice, setComboGainNotice] = useState(null);

  // Result Summary State
  const [matchResult, setMatchResult] = useState(null);

  // Refresh records on mount
  useEffect(() => {
    setRecords(getQuizRecords());
  }, []);

  // Current active question
  const currentQ = matchQuestions[currentIdx] || null;

  /**
   * Starts a brand new match with 10 newly randomized questions and shuffled options.
   */
  const handleStartMatch = () => {
    const newQuestions = getRandomQuizMatch(10);
    setMatchQuestions(newQuestions);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setComboGainNotice(null);
    setMatchResult(null);
    setGameStage('playing');
  };

  /**
   * Handles player selecting an option (A, B, C, or D).
   */
  const handleSelectOption = (optionId) => {
    if (isAnswered || !currentQ) return; // Locked once chosen

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctAnswer;

    if (isCorrect) {
      const nextCombo = combo + 1;
      const comboBonus = nextCombo * 25;
      const pointsGained = 100 + comboBonus;

      setCombo(nextCombo);
      setMaxCombo((prev) => Math.max(prev, nextCombo));
      setScore((prev) => prev + pointsGained);
      setCorrectCount((prev) => prev + 1);
      setComboGainNotice({ points: pointsGained, comboCount: nextCombo });

      onScoreChange?.(pointsGained);
    } else {
      // Wrong answer resets streak
      setCombo(0);
      setWrongCount((prev) => prev + 1);
      setComboGainNotice(null);
    }
  };

  /**
   * Advances to next question or finalizes match on question 10.
   */
  const handleNextQuestion = () => {
    if (currentIdx + 1 < matchQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setComboGainNotice(null);
    } else {
      // Match Complete - Evaluate Grade & Save Records
      const finalAccuracy = Math.round((correctCount / matchQuestions.length) * 100);
      
      // Grade criteria based on correct answers out of 10
      let finalGrade = 'C';
      if (correctCount >= 9) finalGrade = 'S';
      else if (correctCount === 8) finalGrade = 'A';
      else if (correctCount === 7) finalGrade = 'B';

      const outcome = {
        score,
        correctCount,
        wrongCount,
        totalQuestions: matchQuestions.length,
        accuracy: finalAccuracy,
        maxCombo,
        grade: finalGrade,
      };

      // Save match to persistent storage
      const saveResponse = saveQuizMatchResult(outcome);
      setRecords(saveResponse.records);

      setMatchResult({
        ...outcome,
        isNewHighScore: saveResponse.isNewHighScore,
        isNewBestStreak: saveResponse.isNewBestStreak,
      });

      setGameStage('result');
      onComplete?.(outcome);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. OVERVIEW & START SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'overview') {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-300">
        
        {/* Navigation Breadcrumb & Back to Hub */}
        {onBackToHub && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <button
              onClick={onBackToHub}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C2017] border border-slate-700/80 text-white text-xs font-mono hover:border-[#22C55E] hover:text-[#4ADE80] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Challenge Hub</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">3D HARDWARE QUIZ (10 QUESTIONS)</span>
          </div>
        )}

        {/* Header Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C2017] border border-[#22C55E]/30 text-[#4ADE80] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <Box className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>3D HARDWARE Q&A • 20 QUESTION BANK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-3">
            Hardware 3D Quiz Game
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
            Test your understanding of laptop hardware architecture with an interactive 3D Motherboard Digital Twin that highlights target components in real time.
          </p>
        </div>

        {/* ── PLAYER RECORDS / BEST SCORE CARD ── */}
        <div className="rounded-2xl bg-[#0C2017]/85 border border-[#22C55E]/30 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md mb-8">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#22C55E]/20">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#FACC15]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Player Career Records
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-[#081810] border border-slate-800">
              SAVED LOCALLY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {/* Best Score */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-3.5 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Best Score
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#FACC15] mt-1">
                {records.bestScore}
              </span>
            </div>

            {/* Best Accuracy */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-3.5 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Best Accuracy
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4ADE80] mt-1">
                {records.bestAccuracy}%
              </span>
            </div>

            {/* Best Streak / Combo */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-3.5 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Best Streak
              </span>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
                <span className="text-2xl sm:text-3xl font-display font-bold text-orange-400">
                  {records.bestStreak}
                </span>
              </div>
            </div>

            {/* Games Played */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-3.5 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Games Played
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                {records.gamesPlayed}
              </span>
            </div>

            {/* Highest Grade */}
            <div className="col-span-2 sm:col-span-1 rounded-xl bg-[#081810] border border-[#22C55E]/20 p-3.5 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Highest Grade
              </span>
              <span className={`text-2xl sm:text-3xl font-display font-bold mt-1 ${
                records.highestGrade === 'S' ? 'text-[#FACC15]' :
                records.highestGrade === 'A' ? 'text-[#4ADE80]' :
                records.highestGrade === 'B' ? 'text-[#38BDF8]' : 'text-slate-300'
              }`}>
                {records.highestGrade}
              </span>
            </div>
          </div>
        </div>

        {/* ── MATCH INTEL & RULES CARD ── */}
        <div className="rounded-2xl bg-[#0C2017]/50 border border-slate-800 p-6 mb-8">
          <h4 className="font-display font-bold text-sm text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#4ADE80]" />
            Match Protocol & 3D Interactive Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80] font-bold">•</span>
              <span><strong>Interactive 3D Stage</strong>: Setiap soal secara otomatis mengarahkan kamera 3D ke pin komponen hardware yang ditanyakan.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80] font-bold">•</span>
              <span><strong>10 Randomized Questions</strong>: Dipilih secara acak dari 20 bank soal arsitektur hardware tanpa repetisi.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FACC15] font-bold">•</span>
              <span><strong>Combo Streaks</strong>: Benar beruntun memberi bonus <strong>+100 base + (25 × combo)</strong>. Salah mereset combo ke 0.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FACC15] font-bold">•</span>
              <span><strong>Grade Ranks</strong>: Grade <strong>S</strong> (9-10 benar), <strong>A</strong> (8 benar), <strong>B</strong> (7 benar), <strong>C</strong> (≤ 6).</span>
            </div>
          </div>
        </div>

        {/* ── START GAME CTA BUTTON ── */}
        <div className="flex justify-center">
          <button
            onClick={handleStartMatch}
            className="group px-8 py-3.5 rounded-full font-display text-base font-bold bg-[#22C55E] text-[#04150F] hover:bg-[#4ADE80] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-200 flex items-center gap-3 active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START 3D QUIZ (10 QUESTIONS)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. ACTIVE QUESTION PLAYING SCREEN (WITH 3D HARDWARE INSPECTOR)
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'playing' && currentQ) {
    const progressPercent = Math.round(((currentIdx + 1) / matchQuestions.length) * 100);

    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-200">
        
        {/* ── TOP HUD / PROGRESS RIBBON ── */}
        <div className="rounded-2xl bg-[#0C2017]/80 border border-[#22C55E]/30 p-4 sm:p-5 backdrop-blur-md mb-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* Question Counter */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#081810] border border-[#22C55E]/30 text-[#4ADE80] font-mono text-xs font-semibold">
                QUESTION {currentIdx + 1} / {matchQuestions.length}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ({progressPercent}%)
              </span>
            </div>

            {/* Score & Combo Badges */}
            <div className="flex items-center gap-3">
              {/* Combo Streak Badge */}
              {combo > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold animate-pulse shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  <span>COMBO x{combo}</span>
                </div>
              )}

              {/* Score Display */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#081810] border border-[#FACC15]/40 text-[#FACC15] font-mono text-xs font-bold shadow-[0_0_12px_rgba(250,204,21,0.2)]">
                <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
                <span>SCORE: {score}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#081810] overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80] rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── MAIN PLAY AREA: 3D INSPECTOR ON LEFT, QUESTION & OPTIONS ON RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
          
          {/* Left Column: 3D Hardware Component Stage (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-[#0C2017]/90 border border-[#22C55E]/30 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#FACC15]" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#4ADE80] font-semibold">
                    3D COMPONENT VISUAL
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 font-semibold uppercase">
                  {currentQ.componentType || 'HARDWARE'}
                </span>
              </div>

              {/* Component Visual Label */}
              <div className="text-xs font-mono text-[#FACC15] font-bold mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                <span className="truncate">{currentQ.visualLabel || 'Model 3D Komponen'}</span>
              </div>

              {/* 3D Component Viewer with isolated model */}
              <Component3DViewer
                key={currentQ.id}
                type={currentQ.componentType || 'cpu'}
                heightClass="h-[250px] sm:h-[280px]"
                className="border-[#22C55E]/40"
              />

              <p className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>Putar model 3D komponen ini untuk mengamati detail fisiknya.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Question Card & Options (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* ── QUESTION CARD ── */}
            <div className="rounded-2xl bg-[#0C2017]/85 border border-[#22C55E]/30 p-5 sm:p-6 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#081810] border border-slate-700 text-slate-400 text-[10px] font-mono uppercase mb-3">
                <HelpCircle className="w-3 h-3 text-[#4ADE80]" />
                <span>HARDWARE ARCHITECTURE CHALLENGE</span>
              </div>

              <h3 className="text-base sm:text-xl font-bold font-display text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* ── 4 OPTIONS GRID (A, B, C, D) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrectAnswer = opt.id === currentQ.correctAnswer;
                
                // Styling logic based on answer state
                let cardStyle = "bg-[#0C2017]/70 border-[#22C55E]/25 hover:border-[#4ADE80] hover:bg-[#0E2E20] text-slate-200 cursor-pointer";
                let badgeStyle = "bg-[#081810] border-[#22C55E]/30 text-[#4ADE80]";

                if (isAnswered) {
                  if (isCorrectAnswer) {
                    cardStyle = "bg-[#166534]/30 border-[#22C55E] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]";
                    badgeStyle = "bg-[#22C55E] text-[#04150F] font-bold";
                  } else if (isSelected && !isCorrectAnswer) {
                    cardStyle = "bg-[#991B1B]/30 border-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                    badgeStyle = "bg-[#EF4444] text-white font-bold";
                  } else {
                    cardStyle = "bg-[#081810]/40 border-slate-800 text-slate-500 opacity-40 cursor-default";
                    badgeStyle = "bg-transparent border-slate-800 text-slate-600";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`
                      w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200
                      flex items-start gap-3 group select-none relative
                      ${cardStyle}
                    `}
                  >
                    {/* Option Letter Circle (A, B, C, D) */}
                    <div className={`
                      w-7 h-7 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors
                      ${badgeStyle}
                    `}>
                      {opt.id}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 text-xs sm:text-sm font-sans leading-relaxed pt-0.5">
                      {opt.text}
                    </div>

                    {/* Answer Icon Feedback */}
                    {isAnswered && isCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5 animate-in zoom-in-75 duration-200" />
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5 animate-in zoom-in-75 duration-200" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── ANSWER FEEDBACK & EXPLANATION DRAWER ── */}
            {isAnswered && (
              <div className="rounded-2xl bg-[#0C2017]/90 border border-[#22C55E]/40 p-4 sm:p-5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-250 shadow-xl">
                {/* Feedback Banner */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#22C55E]/20">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentQ.correctAnswer ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 border border-[#22C55E] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                        </div>
                        <span className="font-display font-bold text-sm sm:text-base text-[#4ADE80]">
                          CORRECT! +100 POINTS
                        </span>
                        {comboGainNotice && comboGainNotice.comboCount > 1 && (
                          <span className="ml-2 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold">
                            🔥 COMBO x{comboGainNotice.comboCount} (+{comboGainNotice.comboCount * 25} BONUS)
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full bg-[#EF4444]/20 border border-[#EF4444] flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-[#EF4444]" />
                        </div>
                        <span className="font-display font-bold text-sm sm:text-base text-[#EF4444]">
                          INCORRECT
                        </span>
                        <span className="text-xs font-mono text-slate-300 ml-2">
                          Correct Answer: <strong className="text-[#4ADE80] font-bold">{currentQ.correctAnswer}</strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex items-start gap-3 bg-[#081810]/80 rounded-xl p-3 border border-slate-800 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed mb-4">
                  <Lightbulb className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-display mb-0.5">Architecture Insight:</strong>
                    {currentQ.explanation}
                  </div>
                </div>

                {/* Next Question / Finish Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="group px-6 py-2.5 rounded-full font-display text-sm font-semibold bg-[#22C55E] text-[#04150F] hover:bg-[#4ADE80] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>
                      {currentIdx + 1 < matchQuestions.length ? 'Next Question' : 'See Results'}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. MATCH COMPLETE & RESULT SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'result' && matchResult) {
    const gradeConfig = {
      S: { color: 'text-[#FACC15]', border: 'border-[#FACC15]', glow: 'shadow-[0_0_30px_rgba(250,204,21,0.4)]', stars: '★★★★★', label: 'ELITE MASTER' },
      A: { color: 'text-[#4ADE80]', border: 'border-[#4ADE80]', glow: 'shadow-[0_0_30px_rgba(74,222,128,0.4)]', stars: '★★★★☆', label: 'EXCELLENT' },
      B: { color: 'text-[#38BDF8]', border: 'border-[#38BDF8]', glow: 'shadow-[0_0_25px_rgba(56,189,248,0.35)]', stars: '★★★☆☆', label: 'PROFICIENT' },
      C: { color: 'text-amber-400', border: 'border-amber-400', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.25)]', stars: '★★☆☆☆', label: 'NEEDS PRACTICE' },
    }[matchResult.grade] || { color: 'text-white', border: 'border-slate-600', glow: '', stars: '★★☆☆☆', label: '' };

    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-300">
        
        {/* Main Result Card */}
        <div className="rounded-3xl bg-[#0C2017]/90 border border-[#22C55E]/30 p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
          
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* New High Score / Streak Flash Badges */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {matchResult.isNewHighScore && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FACC15]/20 border border-[#FACC15]/50 text-[#FACC15] font-mono text-xs font-bold animate-bounce shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                <Sparkles className="w-3.5 h-3.5" />
                NEW HIGH SCORE!
              </span>
            )}
            {matchResult.isNewBestStreak && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 font-mono text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Flame className="w-3.5 h-3.5" />
                NEW BEST STREAK!
              </span>
            )}
          </div>

          <h3 className="font-mono text-xs text-[#4ADE80] uppercase tracking-widest mb-1">
            EXAM PROTOCOL CONCLUDED
          </h3>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
            Hardware Diagnostic Results
          </h2>

          {/* Grade Badge Circle */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#081810] border-2 ${gradeConfig.border} ${gradeConfig.glow} flex flex-col items-center justify-center mb-3 transition-transform hover:scale-105 duration-300`}>
              <span className={`text-5xl sm:text-6xl font-display font-black ${gradeConfig.color}`}>
                {matchResult.grade}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-0.5">
                GRADE
              </span>
            </div>

            <div className={`text-base font-display font-bold tracking-wider ${gradeConfig.color} mb-1`}>
              {gradeConfig.label}
            </div>
            <div className="text-[#FACC15] text-sm tracking-widest">
              {gradeConfig.stars}
            </div>
          </div>

          {/* Performance Metrics Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 max-w-xl mx-auto">
            <div className="p-3.5 rounded-xl bg-[#081810] border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Final Score
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#FACC15]">
                {matchResult.score}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081810] border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Accuracy
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#4ADE80]">
                {matchResult.accuracy}%
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081810] border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Correct / Total
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-white">
                {matchResult.correctCount} / {matchResult.totalQuestions}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081810] border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Max Streak
              </span>
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="text-xl sm:text-2xl font-display font-bold text-orange-400">
                  {matchResult.maxCombo}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handleStartMatch}
              className="w-full sm:w-auto px-7 py-3 rounded-full font-display text-sm font-bold bg-[#22C55E] text-[#04150F] hover:bg-[#4ADE80] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>

            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-display text-sm font-medium bg-[#081810] border border-slate-700 text-slate-200 hover:text-white hover:border-[#22C55E] transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO CHALLENGE HUB</span>
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  return null;
}
