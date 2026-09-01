import type { TranslationQuestion } from "../types/question";
import type { QuizPhase } from "../hooks/useQuiz";
import { Button } from "./Button";

interface Props {
  question: TranslationQuestion;
  phase: QuizPhase;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  correct: boolean | null;
}

export function TranslationQuestionView({ question, phase, value, onChange, onSubmit, correct }: Props) {
  const feedbackBorder = phase === "feedback" ? (correct ? "border-brand-green" : "border-brand-red") : "border-brand-black";

  return (
    <div className="flex flex-col gap-8">
      <p className="text-center text-2xl leading-snug font-bold text-balance md:text-4xl">{question.english}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col items-center gap-4"
      >
        <input
          autoFocus
          disabled={phase === "feedback"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Écrivez votre réponse…"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className={`w-full max-w-xl border-4 bg-white px-5 py-4 text-lg font-medium shadow-brutal-sm outline-none disabled:bg-brand-cream ${feedbackBorder}`}
        />
        {phase === "question" && (
          <Button type="submit" variant="secondary" disabled={value.trim().length === 0}>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
