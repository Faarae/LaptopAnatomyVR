/**
 * Quiz Storage Utility
 * Manages player records in client-side localStorage.
 * 
 * Stored Metrics:
 * - bestScore: highest score achieved
 * - bestAccuracy: highest percentage accuracy achieved
 * - bestStreak: longest consecutive combo achieved
 * - gamesPlayed: total completed matches
 * - highestGrade: best letter grade ('S' > 'A' > 'B' > 'C' > '-')
 */

const STORAGE_KEY = 'laptop_anatomy_vr_quiz_records_v1';

const DEFAULT_RECORDS = {
  bestScore: 0,
  bestAccuracy: 0,
  bestStreak: 0,
  gamesPlayed: 0,
  highestGrade: '-',
};

const GRADE_RANKS = {
  'S': 4,
  'A': 3,
  'B': 2,
  'C': 1,
  '-': 0,
};

/**
 * Retrieves current player records from localStorage.
 * @returns {typeof DEFAULT_RECORDS}
 */
export function getQuizRecords() {
  if (typeof window === 'undefined') return { ...DEFAULT_RECORDS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_RECORDS };
    const parsed = JSON.parse(raw);
    return {
      bestScore: Number(parsed.bestScore) || 0,
      bestAccuracy: Number(parsed.bestAccuracy) || 0,
      bestStreak: Number(parsed.bestStreak) || 0,
      gamesPlayed: Number(parsed.gamesPlayed) || 0,
      highestGrade: parsed.highestGrade || '-',
    };
  } catch (e) {
    console.error('Failed to read quiz records from localStorage:', e);
    return { ...DEFAULT_RECORDS };
  }
}

/**
 * Saves a completed match result and checks for new records.
 * 
 * @param {Object} matchResult
 * @param {number} matchResult.score
 * @param {number} matchResult.accuracy (0 - 100)
 * @param {number} matchResult.bestCombo
 * @param {string} matchResult.grade ('S' | 'A' | 'B' | 'C')
 * 
 * @returns {{
 *   records: typeof DEFAULT_RECORDS,
 *   isNewBestScore: boolean,
 *   isNewBestAccuracy: boolean,
 *   isNewBestStreak: boolean,
 *   isNewRecord: boolean
 * }}
 */
export function saveQuizMatchResult({ score, accuracy, bestCombo, grade }) {
  const current = getQuizRecords();

  const isNewBestScore = score > current.bestScore && score > 0;
  const isNewBestAccuracy = accuracy > current.bestAccuracy && accuracy > 0;
  const isNewBestStreak = bestCombo > current.bestStreak && bestCombo > 0;

  const currentGradeRank = GRADE_RANKS[current.highestGrade] || 0;
  const newGradeRank = GRADE_RANKS[grade] || 0;
  const isNewHighestGrade = newGradeRank > currentGradeRank;

  const updatedRecords = {
    bestScore: Math.max(current.bestScore, score),
    bestAccuracy: Math.max(current.bestAccuracy, accuracy),
    bestStreak: Math.max(current.bestStreak, bestCombo),
    gamesPlayed: current.gamesPlayed + 1,
    highestGrade: isNewHighestGrade ? grade : current.highestGrade,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    } catch (e) {
      console.error('Failed to save quiz records to localStorage:', e);
    }
  }

  return {
    records: updatedRecords,
    isNewBestScore,
    isNewBestAccuracy,
    isNewBestStreak,
    isNewHighestGrade,
    isNewRecord: isNewBestScore || isNewBestAccuracy || isNewBestStreak,
  };
}
