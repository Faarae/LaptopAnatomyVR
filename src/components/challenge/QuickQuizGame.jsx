import React, { useState, useEffect } from 'react';
import { 
  Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  HelpCircle, Flame, Award, Zap, Play, ArrowLeft, Lightbulb, Star, ShieldCheck, BarChart3
} from 'lucide-react';
import { getRandomQuizMatch } from '../../data/quizQuestions';
import { getQuizRecords, saveQuizMatchResult } from '../../utils/quizStorage';

/**
 * QUICK QUIZ GAME & Q&A SYSTEM
 * Fully aligned with the Laptop Anatomy VR Design System:
 * - 20 Hardware Question Bank
 * - 10 Randomized questions per match (no duplicates)
 * - Shuffled A/B/C/D options per question with preserved answer key
 * - Combo / Streak multiplier (+100 base, +25 * combo)
 * - Grade rating system (S: 9-10, A: 8, B: 7, C: 0-6)
 * - Answer feedback with educational explanation
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
      else finalGrade = 'C';

      // Save to localStorage
      const saveOutcome = saveQuizMatchResult({
        score,
        accuracy: finalAccuracy,
        bestCombo: maxCombo,
        grade: finalGrade,
      });

      // Update local view records
      setRecords(saveOutcome.records);

      setMatchResult({
        finalScore: score,
        accuracy: finalAccuracy,
        correctCount,
        wrongCount,
        totalQuestions: matchQuestions.length,
        maxCombo,
        grade: finalGrade,
        isNewRecord: saveOutcome.isNewRecord,
        isNewBestScore: saveOutcome.isNewBestScore,
      });

      setGameStage('result');
      onComplete?.({
        score,
        accuracy: `${finalAccuracy}%`,
        grade: finalGrade,
      });
    }
  };

  /**
   * Return back to Overview / Records screen.
   */
  const handleBackToOverview = () => {
    setRecords(getQuizRecords());
    setGameStage('overview');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. OVERVIEW & PLAYER RECORDS SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'overview') {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-300">
        
        {/* Back to Hub Navigation */}
        {onBackToHub && (
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBackToHub}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#22C55E]/30 bg-[#081810] hover:bg-[#0E2E20] hover:border-[#4ADE80] text-slate-300 hover:text-[#4ADE80] transition-all text-xs font-mono active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>← CHALLENGE HUB</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">HARDWARE QUIZ (10 QUESTIONS)</span>
          </div>
        )}

        {/* Header Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C2017] border border-[#22C55E]/30 text-[#4ADE80] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Q&A SYSTEM • 20 QUESTION BANK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-3">
            Hardware Quiz Game
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
            Test your understanding of laptop hardware architecture across 10 randomized tactical questions with dynamic streak multipliers.
          </p>
        </div>

        {/* ── PLAYER RECORDS / BEST SCORE CARD (Section 4) ── */}
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
            Match Protocol & Scoring Rules
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80] font-bold">•</span>
              <span><strong>10 Randomized Questions</strong> drawn from the 20-question hardware architecture bank without repetition.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80] font-bold">•</span>
              <span><strong>Shuffled Options</strong>: Pilihan A/B/C/D diacak setiap soal dengan kunci jawaban akurat.</span>
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
            <span>START GAME (10 QUESTIONS)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. ACTIVE QUESTION PLAYING SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'playing' && currentQ) {
    const progressPercent = Math.round(((currentIdx + 1) / matchQuestions.length) * 100);

    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-200">
        
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

        {/* ── QUESTION CARD ── */}
        <div className="rounded-2xl bg-[#0C2017]/85 border border-[#22C55E]/30 p-6 sm:p-8 backdrop-blur-md mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#081810] border border-slate-700 text-slate-400 text-[10px] font-mono uppercase mb-4">
            <HelpCircle className="w-3 h-3 text-[#4ADE80]" />
            <span>HARDWARE ARCHITECTURE CHALLENGE</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-bold font-display text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* ── 4 OPTIONS GRID (A, B, C, D) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrectAnswer = opt.id === currentQ.correctAnswer;
            
            // Styling logic based on answer state
            let cardStyle = "bg-[#0C2017]/70 border-[#22C55E]/25 hover:border-[#4ADE80] hover:bg-[#0E2E20] text-slate-200 cursor-pointer";
            let badgeStyle = "bg-[#081810] border-[#22C55E]/30 text-[#4ADE80]";

            if (isAnswered) {
              if (isCorrectAnswer) {
                // Correct answer lights green
                cardStyle = "bg-[#166534]/30 border-[#22C55E] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]";
                badgeStyle = "bg-[#22C55E] text-[#04150F] font-bold";
              } else if (isSelected && !isCorrectAnswer) {
                // Chosen wrong answer lights red
                cardStyle = "bg-[#991B1B]/30 border-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                badgeStyle = "bg-[#EF4444] text-white font-bold";
              } else {
                // Other options fade
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
                  w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200
                  flex items-start gap-3.5 group select-none relative
                  ${cardStyle}
                `}
              >
                {/* Option Letter Circle (A, B, C, D) */}
                <div className={`
                  w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors
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
          <div className="rounded-2xl bg-[#0C2017]/90 border border-[#22C55E]/40 p-5 sm:p-6 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-2 duration-250 shadow-xl">
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
            <div className="flex items-start gap-3 bg-[#081810]/80 rounded-xl p-3.5 border border-slate-800 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed mb-4">
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
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. MATCH COMPLETE & RESULT SCREEN (Section 8)
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'result' && matchResult) {
    // Grade Color and Star mapping
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
          
          {/* Subtle Ambient Radial Light behind Grade */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* New Record Banner if applicable */}
          {matchResult.isNewRecord && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-[#FACC15] text-[#FACC15] text-xs font-mono font-bold mb-6 animate-bounce shadow-[0_0_20px_rgba(250,204,21,0.35)]">
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
              <span>🎉 NEW RECORD ACHIEVED! Best Score: {matchResult.finalScore}</span>
            </div>
          )}

          {/* Subtitle Eyebrow */}
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            MISSION EVALUATION COMPLETE
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-6">
            Match Performance
          </h2>

          {/* Grade Badge */}
          <div className="inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-[#081810]/90 border border-[#22C55E]/30 mb-8 min-w-[220px]">
            <span className="text-xs font-mono tracking-widest text-slate-400 mb-1">
              {gradeConfig.stars}
            </span>
            <span className={`text-6xl sm:text-7xl font-bold font-display tracking-tight leading-none ${gradeConfig.color}`}>
              GRADE {matchResult.grade}
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-2">
              {gradeConfig.label}
            </span>
          </div>

          {/* 4 Performance Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
            {/* Final Score */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-4 text-center">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">FINAL SCORE</span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#FACC15]">
                {matchResult.finalScore}
              </span>
            </div>

            {/* Accuracy */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-4 text-center">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">ACCURACY</span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4ADE80]">
                {matchResult.accuracy}%
              </span>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                {matchResult.correctCount}/10 Correct
              </span>
            </div>

            {/* Wrong Answers */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-4 text-center">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">INCORRECT</span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-slate-300">
                {matchResult.wrongCount}/10
              </span>
            </div>

            {/* Best Combo */}
            <div className="rounded-xl bg-[#081810] border border-[#22C55E]/20 p-4 text-center">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">BEST STREAK</span>
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
                <span className="text-2xl sm:text-3xl font-display font-bold text-orange-400">
                  {matchResult.maxCombo}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons (Play Again, Overview & Hub) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartMatch}
              className="w-full sm:w-auto px-7 py-3 rounded-full font-display text-sm font-bold bg-[#22C55E] text-[#04150F] hover:bg-[#4ADE80] hover:shadow-[0_0_20px_rgba(34,197,94,0.45)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>

            <button
              onClick={handleBackToOverview}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-display text-sm font-medium bg-[#081810] border border-slate-700 hover:border-[#22C55E] hover:text-[#4ADE80] text-white transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>GAME OVERVIEW</span>
            </button>

            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-display text-sm font-medium bg-[#081810] border border-[#22C55E]/30 hover:border-[#4ADE80] hover:text-[#4ADE80] text-slate-300 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>CHALLENGE HUB →</span>
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  return null;
}
