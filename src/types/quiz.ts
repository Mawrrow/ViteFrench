import type { QuestionFilter } from "../services/questionService";

export interface QuizConfig {
  label: string;
  filter: QuestionFilter;
  count: number;
}
