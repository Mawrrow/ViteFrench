import { getQuestionById } from "../services/questionService";
import type { CategoryStats, OverallStats, QuestionAttempt, Weakness } from "../types/progress";

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function dateKey(timestamp: string): string {
  return new Date(timestamp).toDateString();
}

/** Consecutive-day practice streak, ending today (or yesterday, if today has no attempts yet). */
export function computeStreak(attempts: QuestionAttempt[]): number {
  if (attempts.length === 0) return 0;

  const practicedDays = new Set(attempts.map((a) => dateKey(a.timestamp)));
  const cursor = new Date();
  const today = dateKey(cursor.toISOString());

  if (!practicedDays.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!practicedDays.has(dateKey(cursor.toISOString()))) return 0;
  }

  let streak = 0;
  while (practicedDays.has(dateKey(cursor.toISOString()))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function computeOverallStats(attempts: QuestionAttempt[]): OverallStats {
  const totalAnswered = attempts.length;
  const totalCorrect = attempts.filter((a) => a.correct).length;
  return {
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? totalCorrect / totalAnswered : 0,
    avgResponseTimeMs: average(attempts.map((a) => a.responseTimeMs)),
    currentStreak: computeStreak(attempts),
  };
}

/** Buckets attempts by every tag on their question, recomputed fresh from raw attempts each time. */
export function computeCategoryStats(attempts: QuestionAttempt[]): CategoryStats[] {
  const byTag = new Map<string, QuestionAttempt[]>();
  for (const attempt of attempts) {
    const question = getQuestionById(attempt.questionId);
    if (!question) continue;
    for (const tag of question.tags) {
      const bucket = byTag.get(tag);
      if (bucket) bucket.push(attempt);
      else byTag.set(tag, [attempt]);
    }
  }

  return Array.from(byTag.entries())
    .map(([tag, tagAttempts]) => {
      const correct = tagAttempts.filter((a) => a.correct).length;
      return {
        tag,
        attempts: tagAttempts.length,
        correct,
        accuracy: tagAttempts.length > 0 ? correct / tagAttempts.length : 0,
        avgResponseTimeMs: average(tagAttempts.map((a) => a.responseTimeMs)),
      };
    })
    .sort((a, b) => b.attempts - a.attempts);
}

const MIN_ATTEMPTS_FOR_WEAKNESS = 3;
const RECENT_WINDOW = 10;

/**
 * Simple, deterministic weakness score — not adaptive/ML. Weighs recent
 * accuracy (most of the signal) plus how much slower than average the
 * category is. A category only qualifies once it has enough data to be
 * meaningful, and only surfaces if it's actually below par.
 */
export function computeWeaknesses(attempts: QuestionAttempt[], categoryStats: CategoryStats[]): Weakness[] {
  const overallAvgTime = average(attempts.map((a) => a.responseTimeMs));

  const byTag = new Map<string, QuestionAttempt[]>();
  for (const attempt of attempts) {
    const question = getQuestionById(attempt.questionId);
    if (!question) continue;
    for (const tag of question.tags) {
      const bucket = byTag.get(tag);
      if (bucket) bucket.push(attempt);
      else byTag.set(tag, [attempt]);
    }
  }

  const weaknesses: Weakness[] = [];
  for (const stats of categoryStats) {
    if (stats.attempts < MIN_ATTEMPTS_FOR_WEAKNESS) continue;

    const tagAttempts = (byTag.get(stats.tag) ?? []).slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    const recent = tagAttempts.slice(0, RECENT_WINDOW);
    const recentAccuracy = average(recent.map((a) => (a.correct ? 1 : 0)));
    const recentAvgTime = average(recent.map((a) => a.responseTimeMs));

    const accuracyPenalty = (1 - recentAccuracy) * 100;
    const speedPenalty = overallAvgTime > 0 ? Math.max(0, (recentAvgTime - overallAvgTime) / overallAvgTime) * 20 : 0;
    const score = accuracyPenalty + speedPenalty;

    const isWeak = recentAccuracy < 0.85 || recentAvgTime > overallAvgTime * 1.3;
    if (isWeak) {
      weaknesses.push({ ...stats, accuracy: recentAccuracy, avgResponseTimeMs: recentAvgTime, score });
    }
  }

  return weaknesses.sort((a, b) => b.score - a.score);
}
