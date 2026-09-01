import multipleChoiceData from "../data/multiple-choice.json";
import translationData from "../data/translation.json";
import type { Question, QuestionType } from "../types/question";

const ALL_QUESTIONS: Question[] = [
  ...(multipleChoiceData as Question[]),
  ...(translationData as Question[]),
];

const QUESTIONS_BY_ID = new Map<number, Question>(ALL_QUESTIONS.map((q) => [q.id, q]));

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export function getQuestionById(id: number): Question | undefined {
  return QUESTIONS_BY_ID.get(id);
}

/** All tags present in the question bank, discovered from the data itself. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const q of ALL_QUESTIONS) {
    for (const t of q.tags) tags.add(t);
  }
  return Array.from(tags).sort();
}

export interface QuestionFilter {
  types?: QuestionType[];
  /** A question must include every tag listed here (AND across groups). */
  tags?: string[];
  minDifficulty?: number;
  maxDifficulty?: number;
}

export function filterQuestions(filter: QuestionFilter): Question[] {
  return ALL_QUESTIONS.filter((q) => {
    if (filter.types && filter.types.length > 0 && !filter.types.includes(q.type)) return false;
    if (filter.tags && filter.tags.length > 0 && !filter.tags.every((t) => q.tags.includes(t))) return false;
    if (filter.minDifficulty !== undefined && q.difficulty < filter.minDifficulty) return false;
    if (filter.maxDifficulty !== undefined && q.difficulty > filter.maxDifficulty) return false;
    return true;
  });
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Picks up to `count` questions at random from `pool` without repeats.
 * If the pool is smaller than `count`, the whole (shuffled) pool is returned
 * rather than repeating questions within a session.
 */
export function selectRandomQuestions(pool: Question[], count: number): Question[] {
  return shuffle(pool).slice(0, count);
}
