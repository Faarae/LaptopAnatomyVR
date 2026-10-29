import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { getRandomQuizMatch, COMPONENT_REAL_PHOTOS } from '../../data/quizQuestions';
import { getQuizRecords, saveQuizMatchResult } from '../../utils/quizStorage';
import Component3DViewer from '../3d/Component3DViewer';
import {
  playSuccessChime,
  playErrorSfx,
  isSfxMuted,
  toggleSfxMuted,
  subscribeSfxMute,
} from '../../utils/soundEffects';

/**
 * QUICK QUIZ GAME & Q&A SYSTEM WITH 3D COMPONENT INSPECTOR
 * - Standardized radii: rounded-xl for cards, rounded-lg for buttons/options (zero rounded-full / rounded-3xl)
 * - Responsive 30s per-question countdown timer + animated progress bar ("PERTANYAAN 01 / 10")
 * - Count-up score animation & visual streak counter
 * - Responsive A/B/C/D options with hover border, active:scale-95 click feedback, and instant emerald/crimson state with Check / X icons
 * - Synthesized futuristic chime on correct answer + SFX mute/unmute toggle in panel corner
 */
export default function QuickQuizGame({
  onScoreChange,
  onComplete,
  onBackToHub,
  autoStart = true,
}) {
  const [gameStage, setGameStage] = useState(autoStart ? 'playing' : 'overview');
  const [records, setRecords] = useState(getQuizRecords);

  // Match State
  const [matchQuestions, setMatchQuestions] = useState(() =>
    autoStart ? getRandomQuizMatch(10) : []
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Question Timer (30 seconds per question)
  const [questionTimer, setQuestionTimer] = useState(30);

  // Active Question Answer State
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [comboGainNotice, setComboGainNotice] = useState(null);
  const [quizViewMode, setQuizViewMode] = useState('3d'); // '3d' | 'photo'
  const [sfxMuted, setSfxMutedState] = useState(() => isSfxMuted());

  // Result Summary State
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    setRecords(getQuizRecords());
    return subscribeSfxMute((muted) => setSfxMutedState(muted));
  }, []);

  // Count-up animation for score display
  useEffect(() => {
    if (displayScore === score) return;
    const diff = score - displayScore;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 14));
    const timer = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev < score) return Math.min(score, prev + step);
        if (prev > score) return Math.max(score, prev - step);
        clearInterval(timer);
        return score;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [score, displayScore]);

  const currentQ = matchQuestions[currentIdx] || null;

  // Responsive 30s countdown timer per question
  useEffect(() => {
    if (gameStage !== 'playing' || isAnswered || !currentQ) return;

    if (questionTimer <= 0) {
      // Time out counts as wrong answer
      setIsAnswered(true);
      setCombo(0);
      setWrongCount((prev) => prev + 1);
      setComboGainNotice(null);
      playErrorSfx();
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStage, isAnswered, questionTimer, currentQ]);

  const handleStartMatch = () => {
    const newQuestions = getRandomQuizMatch(10);
    setMatchQuestions(newQuestions);
    setCurrentIdx(0);
    setScore(0);
    setDisplayScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setQuestionTimer(30);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setComboGainNotice(null);
    setQuizViewMode('3d');
    setMatchResult(null);
    setGameStage('playing');
  };

  const handleSelectOption = (optionId) => {
    if (isAnswered || !currentQ) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctAnswer;

    if (isCorrect) {
      playSuccessChime();
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
      playErrorSfx();
      setCombo(0);
      setWrongCount((prev) => prev + 1);
      setComboGainNotice(null);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < matchQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setQuestionTimer(30);
      setComboGainNotice(null);
      setQuizViewMode('3d');
    } else {
      const finalAccuracy = Math.round((correctCount / matchQuestions.length) * 100);

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

      const saveResponse = saveQuizMatchResult(outcome);
      setRecords(saveResponse.records);

      setMatchResult({
        ...outcome,
        isNewHighScore: saveResponse.isNewHighScore,
        isNewBestStreak: saveResponse.isNewBestStreak,
      });

      playSuccessChime();
      setGameStage('result');
      onComplete?.(outcome);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. OVERVIEW & START SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (gameStage === 'overview') {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between select-none animate-fade-slide-up">
        {onBackToHub && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
            <button
              type="button"
              onClick={onBackToHub}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              ← Kembali ke Panduan
            </button>
            <span className="text-xs font-mono text-slate-500">
              MISI 01 • QUICK QUIZ (10 PERTANYAAN)
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Sistem Evaluasi Diagnostik • 20 Bank Soal Teknis
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight mb-2">
            Quick Quiz Perangkat Keras 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-xl mx-auto leading-relaxed">
            Uji pemahaman Anda mengenai arsitektur hardware laptop dengan tampilan 3D komponen yang menyorot geometri fisik secara real-time.
          </p>
        </div>

        {/* PLAYER RECORDS CARD */}
        <div className="rounded-xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
              Rekor Karier Pemain
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              TERSIMPAN LOKAL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Skor Terbaik
              </span>
              <span className="text-xl font-display font-bold text-slate-900 mt-1 block">
                {records.bestScore}
              </span>
            </div>

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Akurasi
              </span>
              <span className="text-xl font-display font-bold text-emerald-700 mt-1 block">
                {records.bestAccuracy}%
              </span>
            </div>

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Streak Terbaik
              </span>
              <span className="text-xl font-display font-bold text-amber-600 mt-1 block">
                {records.bestStreak}x
              </span>
            </div>

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Total Main
              </span>
              <span className="text-xl font-display font-bold text-slate-800 mt-1 block">
                {records.gamesPlayed}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-lg bg-slate-50 border border-slate-200 p-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Grade Tertinggi
              </span>
              <span className="text-xl font-display font-bold text-emerald-700 mt-1 block">
                {records.highestGrade}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleStartMatch}
            className="group px-8 py-3 rounded-lg font-display text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Mulai Kuis 3D (10 Soal)</span>
            <ArrowRight
              strokeWidth={2}
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
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
    const questionNumFormatted = String(currentIdx + 1).padStart(2, '0');
    const totalNumFormatted = String(matchQuestions.length).padStart(2, '0');

    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-between select-none animate-fade-slide-up">
        
        {/* TOP HUD / PROGRESS RIBBON */}
        <div className="rounded-xl bg-white border border-slate-200 p-3.5 sm:p-4 mb-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            
            {/* Left: Back Button & Question Header */}
            <div className="flex items-center gap-3">
              {onBackToHub && (
                <button
                  type="button"
                  onClick={onBackToHub}
                  className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium active:scale-95 transition-all cursor-pointer"
                >
                  ← Panduan
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shadow-2xs">
                  PERTANYAAN {questionNumFormatted} / {totalNumFormatted}
                </span>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Right: Countdown Timer, Visual Streak Counter, Count-Up Score & Mute Toggle */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Countdown Timer */}
              <div
                className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold transition-colors ${
                  questionTimer <= 8
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                    : questionTimer <= 15
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                WAKTU: 00:{String(questionTimer).padStart(2, '0')}
              </div>

              {/* Visual Streak Counter */}
              <div
                className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                  combo > 0
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>STREAK ×{combo}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <span
                      key={bar}
                      className={`w-1.5 h-3 rounded-xs transition-colors ${
                        combo >= bar ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Animated Count-Up Score */}
              <div className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs font-bold">
                <span className="text-slate-400 font-normal mr-1">SKOR:</span>
                <span className="text-emerald-700">{String(displayScore).padStart(4, '0')}</span>
              </div>

              {/* Audio SFX Mute/Unmute Toggle */}
              <button
                type="button"
                data-no-sfx="true"
                onClick={() => setSfxMutedState(toggleSfxMuted())}
                title={sfxMuted ? 'Aktifkan Efek Suara (SFX)' : 'Matikan Efek Suara (SFX)'}
                className={`p-1.5 rounded-lg border transition-all active:scale-90 cursor-pointer ${
                  sfxMuted
                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                {sfxMuted ? (
                  <VolumeX strokeWidth={1.75} className="w-4 h-4" />
                ) : (
                  <Volume2 strokeWidth={1.75} className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-1.5 rounded-xs bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* MAIN PLAY AREA: 3D INSPECTOR ON LEFT, QUESTION & OPTIONS ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mb-4">
          
          {/* Left Column: 3D Hardware Component Stage */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 font-bold">
                  {quizViewMode === '3d' ? 'VISUALISASI 3D' : 'FOTO FISIK RIIL'}
                </span>

                {/* Clean Segmented Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setQuizViewMode('3d')}
                    className={`px-2.5 py-0.5 rounded-md font-semibold transition-all active:scale-95 cursor-pointer ${
                      quizViewMode === '3d'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3D Model
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizViewMode('photo')}
                    className={`px-2.5 py-0.5 rounded-md font-semibold transition-all active:scale-95 cursor-pointer ${
                      quizViewMode === 'photo'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Foto Fisik
                  </button>
                </div>
              </div>

              {/* Component Visual Label */}
              <div className="text-xs font-mono text-slate-800 font-bold mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-xs h-2 w-2 bg-emerald-500" />
                </span>
                <span className="truncate">{currentQ.visualLabel || 'Model 3D Komponen'}</span>
              </div>

              {/* 3D Component Viewer or Real Hardware Photo */}
              <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200/80 h-[220px] sm:h-[250px] flex items-center justify-center relative">
                {quizViewMode === '3d' ? (
                  <Component3DViewer
                    key={currentQ.id}
                    type={currentQ.componentType || 'cpu'}
                    heightClass="h-[220px] sm:h-[250px]"
                    className="border-0 bg-transparent shadow-none"
                  />
                ) : (
                  <div className="w-full h-full relative group">
                    <img
                      src={
                        COMPONENT_REAL_PHOTOS[currentQ.componentType] ||
                        '/images/components/pin-1.jpg'
                      }
                      alt={currentQ.visualLabel}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      Foto Riil Hardware
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[11px] font-mono text-slate-500 mt-2">
                {quizViewMode === '3d'
                  ? 'Putar model 3D untuk menginspeksi geometri komponen 360°.'
                  : 'Dokumentasi foto fisik komponen perangkat keras aktual.'}
              </p>
            </div>
          </div>

          {/* Right Column: Question Card & Responsive Options (A, B, C, D) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* QUESTION CARD */}
            <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1.5">
                Pertanyaan Diagnostik Arsitektur
              </p>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* 4 OPTIONS GRID (A, B, C, D) WITH CHECK / X VALIDATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrectAnswer = opt.id === currentQ.correctAnswer;

                let cardStyle =
                  'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-800 cursor-pointer shadow-2xs active:scale-[0.98]';
                let badgeStyle =
                  'bg-slate-100 border-slate-200 text-slate-700 group-hover:border-emerald-300 group-hover:text-emerald-700';

                if (isAnswered) {
                  if (isCorrectAnswer) {
                    cardStyle =
                      'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-semibold shadow-sm ring-2 ring-emerald-500/15';
                    badgeStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold';
                  } else if (isSelected && !isCorrectAnswer) {
                    cardStyle =
                      'bg-rose-50 border-2 border-rose-400 text-rose-950 font-semibold shadow-sm animate-shake';
                    badgeStyle = 'bg-rose-600 border-rose-600 text-white font-bold';
                  } else {
                    cardStyle =
                      'bg-slate-50 border-slate-200 text-slate-400 opacity-55 cursor-default';
                    badgeStyle = 'bg-slate-100 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-no-sfx="true"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`
                      w-full text-left p-3.5 rounded-lg border transition-all duration-150
                      flex items-start gap-3 group select-none relative
                      ${cardStyle}
                    `}
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-md border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors
                        ${badgeStyle}
                      `}
                    >
                      {opt.id}
                    </div>

                    <div className="flex-1 text-xs font-sans leading-relaxed pt-0.5">
                      {opt.text}
                    </div>

                    {isAnswered && isCorrectAnswer && (
                      <Check
                        strokeWidth={2.25}
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                      />
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <X
                        strokeWidth={2.25}
                        className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ANSWER FEEDBACK & EXPLANATION PANEL */}
            {isAnswered && (
              <div className="rounded-xl bg-white border border-slate-200 p-4 animate-fade-slide-up shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentQ.correctAnswer ? (
                      <>
                        <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                          <Check strokeWidth={2.25} className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-display font-bold text-xs sm:text-sm text-emerald-700">
                          JAWABAN BENAR (+{comboGainNotice ? comboGainNotice.points : 100} XP)
                        </span>
                        {comboGainNotice && comboGainNotice.comboCount > 1 && (
                          <span className="ml-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] font-bold">
                            STREAK ×{comboGainNotice.comboCount}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center">
                          <X strokeWidth={2.25} className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-display font-bold text-xs sm:text-sm text-rose-600">
                          {selectedOptionId === null ? 'WAKTU HABIS' : 'KURANG TEPAT'}
                        </span>
                        <span className="text-xs font-mono text-slate-500 ml-2">
                          Kunci Jawaban:{' '}
                          <strong className="text-emerald-700 font-bold">
                            {currentQ.correctAnswer}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 text-xs font-sans text-slate-600 leading-relaxed mb-3">
                  <strong className="text-slate-900 block font-display mb-0.5">
                    Penjelasan Teknis Arsitektur:
                  </strong>
                  {currentQ.explanation}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="group px-6 py-2.5 rounded-lg font-display text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentIdx + 1 < matchQuestions.length
                        ? 'Pertanyaan Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight
                      strokeWidth={2}
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    />
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
    const gradeConfig =
      {
        S: { color: 'text-amber-600', border: 'border-amber-300', label: 'ELITE MASTER' },
        A: { color: 'text-emerald-700', border: 'border-emerald-300', label: 'EXCELLENT' },
        B: { color: 'text-sky-600', border: 'border-sky-300', label: 'PROFICIENT' },
        C: { color: 'text-slate-600', border: 'border-slate-300', label: 'NEEDS PRACTICE' },
      }[matchResult.grade] || {
        color: 'text-slate-800',
        border: 'border-slate-200',
        label: '',
      };

    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-between select-none animate-fade-slide-up">
        <div className="rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2">
            {matchResult.isNewHighScore && (
              <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 font-mono text-xs font-bold">
                REKOR SKOR BARU
              </span>
            )}
            {matchResult.isNewBestStreak && (
              <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs font-bold">
                REKOR STREAK BARU
              </span>
            )}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            Ujian Teknis Selesai
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
            Hasil Diagnostik Hardware
          </h2>

          {/* Grade Box */}
          <div className="flex flex-col items-center justify-center my-3">
            <div
              className={`w-24 h-24 rounded-xl bg-slate-50 border-2 ${gradeConfig.border} flex flex-col items-center justify-center mb-2 shadow-2xs`}
            >
              <span className={`text-4xl font-display font-black ${gradeConfig.color}`}>
                {matchResult.grade}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-0.5">
                GRADE
              </span>
            </div>

            <div className={`text-sm font-display font-bold tracking-wider ${gradeConfig.color}`}>
              {gradeConfig.label}
            </div>
          </div>

          {/* Performance Metrics Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 max-w-xl mx-auto">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Skor Akhir
              </span>
              <span className="text-xl font-display font-bold text-slate-900">
                {matchResult.score}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Akurasi
              </span>
              <span className="text-xl font-display font-bold text-emerald-700">
                {matchResult.accuracy}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Benar / Total
              </span>
              <span className="text-xl font-display font-bold text-slate-800">
                {matchResult.correctCount} / {matchResult.totalQuestions}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                Max Streak
              </span>
              <span className="text-xl font-display font-bold text-amber-600">
                {matchResult.maxCombo}x
              </span>
            </div>
          </div>

          {/* Action CTAs: 1 Secondary + 1 Primary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 pt-4 border-t border-slate-100">
            {onBackToHub && (
              <button
                type="button"
                onClick={onBackToHub}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-display text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              >
                Panduan Misi
              </button>
            )}

            <button
              type="button"
              onClick={handleStartMatch}
              className="w-full sm:w-auto px-7 py-2.5 rounded-lg font-display text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw strokeWidth={1.75} className="w-4 h-4" />
              <span>Main Lagi</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
