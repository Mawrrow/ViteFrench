export type QuestionType = "multiple_choice" | "translation";

export interface BaseQuestion {
  id: number;
  difficulty: number;
  tags: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  sentence: string;
  options: string[];
  answer: string;
}

export interface TranslationQuestion extends BaseQuestion {
  type: "translation";
  english: string;
  answers: string[];
}

export type Question = MultipleChoiceQuestion | TranslationQuestion;
