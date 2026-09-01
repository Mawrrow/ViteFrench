import type { QuestionType } from "./question";

/** A single answered question. The atomic unit of persisted history —
 * every aggregate stat is recomputed from a list of these. */
export interface QuestionAttempt {
  questionId: number;
  questionType: QuestionType;
  correct: boolean;
  responseTimeMs: number;
  timestamp: string;
}

export interface CategoryStats {
  tag: string;
  attempts: number;
  correct: number;
  accuracy: number;
  avgResponseTimeMs: number;
}

export interface OverallStats {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
  avgResponseTimeMs: number;
  currentStreak: number;
}

export interface Weakness extends CategoryStats {
  score: number;
}

export interface ProgressExport {
  version: 1;
  exportedAt: string;
  attempts: QuestionAttempt[];
}
