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
export default function QuickQuizGame({ onScoreChange, onComplete, onBackToHub, autoStart = true }) {
  // Game lifecycle stage: 'overview' | 'playing' | 'result'
  const [gameStage, setGameStage] = useState(autoStart ? 'playing' : 'overview');

  // Persistent Player Records
  const [records, setRecords] = useState(getQuizRecords);

  // Match State
  const [matchQuestions, setMatchQuestions] = useState(() => autoStart ? getRandomQuizMatch(10) : []);
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
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <button
              onClick={onBackToHub}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono hover:border-emerald-300 hover:text-emerald-700 transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Panduan</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">3D HARDWARE QUIZ (10 QUESTIONS)</span>
          </div>
        )}

        {/* Header Badge & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono mb-2 shadow-2xs font-semibold">
            <Box className="w-3.5 h-3.5 text-amber-500" />
            <span>3D HARDWARE Q&A • 20 QUESTION BANK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight mb-2">
            Hardware 3D Quiz Game
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-xl mx-auto leading-relaxed">
            Uji pemahaman Anda mengenai arsitektur hardware laptop dengan tampilan 3D komponen yang menyorot posisi komponen secara real-time.
          </p>
        </div>

        {/* ── PLAYER RECORDS / BEST SCORE CARD ── */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-md mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                Rekor Karier Pemain
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200">
              SAVED LOCALLY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Best Score */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Skor Terbaik
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-amber-600 mt-1">
                {records.bestScore}
              </span>
            </div>

            {/* Best Accuracy */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Akurasi
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-emerald-700 mt-1">
                {records.bestAccuracy}%
              </span>
            </div>

            {/* Best Streak / Combo */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Streak Terbaik
              </span>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xl sm:text-2xl font-display font-bold text-amber-600">
                  {records.bestStreak}
                </span>
              </div>
            </div>

            {/* Games Played */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Total Main
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-slate-800 mt-1">
                {records.gamesPlayed}
              </span>
            </div>

            {/* Highest Grade */}
            <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Grade Tertinggi
              </span>
              <span className={`text-xl sm:text-2xl font-display font-bold mt-1 ${
                records.highestGrade === 'S' ? 'text-amber-600' :
                records.highestGrade === 'A' ? 'text-emerald-700' :
                records.highestGrade === 'B' ? 'text-sky-600' : 'text-slate-500'
              }`}>
                {records.highestGrade}
              </span>
            </div>
          </div>
        </div>

        {/* ── MATCH INTEL & RULES CARD ── */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 mb-6 shadow-xs">
          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            Fitur Kuis Interaktif 3D
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Visual 3D Real-Time</strong>: Setiap pertanyaan didampingi model 3D komponen terkait.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>10 Pertanyaan Acak</strong>: Diambil secara acak dari bank soal 20 materi arsitektur.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Combo Streaks</strong>: Benar beruntun memberi poin bonus <strong>+100 base + (25 × combo)</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Grade Ranks</strong>: Grade <strong>S</strong> (9-10 benar), <strong>A</strong> (8 benar), <strong>B</strong> (7 benar).</span>
            </div>
          </div>
        </div>

        {/* ── START GAME CTA BUTTON ── */}
        <div className="flex justify-center">
          <button
            onClick={handleStartMatch}
            className="group px-8 py-3 rounded-xl font-display text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all duration-200 flex items-center gap-3 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>MULAI KUIS 3D (10 SOAL)</span>
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
        <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 backdrop-blur-md mb-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            {/* Question Counter */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-emerald-800 font-mono text-xs font-bold">
                PERTANYAAN {currentIdx + 1} / {matchQuestions.length}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ({progressPercent}%)
              </span>
            </div>

            {/* Score & Combo Badges */}
            <div className="flex items-center gap-3">
              {combo > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono text-xs font-bold animate-pulse shadow-2xs">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  <span>COMBO x{combo}</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs font-bold shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>SKOR: {score}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── MAIN PLAY AREA: 3D INSPECTOR ON LEFT, QUESTION & OPTIONS ON RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mb-4">
          
          {/* Left Column: 3D Hardware Component Stage */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                    3D COMPONENT VISUAL
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold uppercase">
                  {currentQ.componentType || 'HARDWARE'}
                </span>
              </div>

              {/* Component Visual Label */}
              <div className="text-xs font-mono text-slate-800 font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">{currentQ.visualLabel || 'Model 3D Komponen'}</span>
              </div>

              {/* 3D Component Viewer with isolated model */}
              <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <Component3DViewer
                  key={currentQ.id}
                  type={currentQ.componentType || 'cpu'}
                  heightClass="h-[220px] sm:h-[250px]"
                  className="border-0 bg-transparent shadow-none"
                />
              </div>

              <p className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Putar model 3D komponen ini untuk mengamati detail fisiknya.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Question Card & Options */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* ── QUESTION CARD ── */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono uppercase mb-2 font-semibold">
                <HelpCircle className="w-3 h-3 text-emerald-600" />
                <span>HARDWARE ARCHITECTURE CHALLENGE</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* ── 4 OPTIONS GRID (A, B, C, D) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrectAnswer = opt.id === currentQ.correctAnswer;
                
                let cardStyle = "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800 cursor-pointer shadow-2xs";
                let badgeStyle = "bg-slate-100 border-slate-200 text-slate-600";

                if (isAnswered) {
                  if (isCorrectAnswer) {
                    cardStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500/20";
                    badgeStyle = "bg-emerald-600 text-white font-bold";
                  } else if (isSelected && !isCorrectAnswer) {
                    cardStyle = "bg-red-50 border-red-300 text-red-950 shadow-xs";
                    badgeStyle = "bg-red-600 text-white font-bold";
                  } else {
                    cardStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50 cursor-default";
                    badgeStyle = "bg-slate-100 text-slate-400";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`
                      w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200
                      flex items-start gap-2.5 group select-none relative
                      ${cardStyle}
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors
                      ${badgeStyle}
                    `}>
                      {opt.id}
                    </div>

                    <div className="flex-1 text-xs font-sans leading-relaxed pt-0.5">
                      {opt.text}
                    </div>

                    {isAnswered && isCorrectAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── ANSWER FEEDBACK & EXPLANATION DRAWER ── */}
            {isAnswered && (
              <div className="rounded-2xl bg-white border border-slate-200 p-4 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-md">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentQ.correctAnswer ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-display font-bold text-xs sm:text-sm text-emerald-700">
                          BENAR! +100 POIN
                        </span>
                        {comboGainNotice && comboGainNotice.comboCount > 1 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[10px] font-bold">
                            🔥 COMBO x{comboGainNotice.comboCount} (+{comboGainNotice.comboCount * 25} BONUS)
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                          <XCircle className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-display font-bold text-xs sm:text-sm text-red-600">
                          KURANG TEPAT
                        </span>
                        <span className="text-xs font-mono text-slate-500 ml-2">
                          Jawaban Benar: <strong className="text-emerald-700 font-bold">{currentQ.correctAnswer}</strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs font-sans text-slate-600 leading-relaxed mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block font-display mb-0.5">Penjelasan Arsitektur:</strong>
                    {currentQ.explanation}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="group px-6 py-2 rounded-xl font-display text-xs sm:text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>
                      {currentIdx + 1 < matchQuestions.length ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
      S: { color: 'text-amber-600', border: 'border-amber-300', stars: '★★★★★', label: 'ELITE MASTER' },
      A: { color: 'text-emerald-700', border: 'border-emerald-300', stars: '★★★★☆', label: 'EXCELLENT' },
      B: { color: 'text-sky-600', border: 'border-sky-300', stars: '★★★☆☆', label: 'PROFICIENT' },
      C: { color: 'text-slate-600', border: 'border-slate-300', stars: '★★☆☆☆', label: 'NEEDS PRACTICE' },
    }[matchResult.grade] || { color: 'text-slate-800', border: 'border-slate-200', stars: '★★☆☆☆', label: '' };

    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-between select-none animate-in fade-in duration-300">
        
        {/* Main Result Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          
          <div className="flex items-center justify-center gap-2 mb-3">
            {matchResult.isNewHighScore && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-700 font-mono text-xs font-bold animate-bounce shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                REKOR SKOR BARU!
              </span>
            )}
            {matchResult.isNewBestStreak && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-700 font-mono text-xs font-bold shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                REKOR STREAK BARU!
              </span>
            )}
          </div>

          <h3 className="font-mono text-xs text-emerald-700 uppercase tracking-widest mb-1 font-semibold">
            UJIAN TEKNIS SELESAI
          </h3>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
            Hasil Diagnostik Hardware
          </h2>

          {/* Grade Badge Circle */}
          <div className="flex flex-col items-center justify-center my-3">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-50 border-2 ${gradeConfig.border} flex flex-col items-center justify-center mb-2 shadow-xs`}>
              <span className={`text-4xl sm:text-5xl font-display font-black ${gradeConfig.color}`}>
                {matchResult.grade}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-0.5">
                GRADE
              </span>
            </div>

            <div className={`text-sm font-display font-bold tracking-wider ${gradeConfig.color} mb-0.5`}>
              {gradeConfig.label}
            </div>
            <div className="text-amber-500 text-xs tracking-widest">
              {gradeConfig.stars}
            </div>
          </div>

          {/* Performance Metrics Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5 max-w-xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Skor Akhir
              </span>
              <span className="text-xl font-display font-bold text-amber-600">
                {matchResult.score}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Akurasi
              </span>
              <span className="text-xl font-display font-bold text-emerald-700">
                {matchResult.accuracy}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Benar / Total
              </span>
              <span className="text-xl font-display font-bold text-slate-800">
                {matchResult.correctCount} / {matchResult.totalQuestions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Max Streak
              </span>
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xl font-display font-bold text-amber-600">
                  {matchResult.maxCombo}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={handleStartMatch}
              className="w-full sm:w-auto px-7 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>MAIN LAGI</span>
            </button>

            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-medium bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>PANDUAN MISI</span>
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  return null;
}
