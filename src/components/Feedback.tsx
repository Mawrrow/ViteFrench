import { useState } from "react";
import { CONJUGATIONS, findConjugatedVerbTag } from "../data/conjugations";
import { labelForTag } from "../data/tagGroups";
import type { Question } from "../types/question";
import { Button } from "./Button";
import { ConjugationTable } from "./ConjugationTable";
import { Modal } from "./Modal";

interface FeedbackProps {
  question: Question;
  userAnswer: string;
  correct: boolean;
  onNext: () => void;
  isLast: boolean;
}

export function Feedback({ question, userAnswer, correct, onNext, isLast }: FeedbackProps) {
  const [showConjugations, setShowConjugations] = useState(false);
  const verbTag = findConjugatedVerbTag(question.tags);

  return (
    <div className="mt-8 flex flex-col items-center gap-5">
      <div
        className={`w-full max-w-xl border-4 border-brand-black px-6 py-4 text-center font-display text-xl uppercase shadow-brutal-sm ${
          correct ? "bg-brand-green text-white" : "bg-brand-red text-white"
        }`}
      >
        {correct ? "✓ Correct" : "✕ Not quite"}
      </div>

      {question.type === "translation" && (
        <div className="flex w-full max-w-xl flex-col gap-3">
          {!correct && (
            <div>
              <p className="font-display text-xs tracking-wide text-brand-black/60 uppercase">Your answer</p>
              <p className="border-2 border-brand-black bg-white px-4 py-2 font-medium">{userAnswer || "(no answer)"}</p>
            </div>
          )}
          <div>
            <p className="font-display text-xs tracking-wide text-brand-black/60 uppercase">
              {correct ? "Correct answer" : "Expected"}
            </p>
            <p className="border-2 border-brand-black bg-brand-cream px-4 py-2 font-medium">{question.answers.join("  /  ")}</p>
          </div>
        </div>
      )}

      {verbTag && (
        <Button variant="outline" size="sm" onClick={() => setShowConjugations(true)}>
          {labelForTag(verbTag)} conjugations
        </Button>
      )}

      <Button variant="primary" size="lg" onClick={onNext} autoFocus>
        {isLast ? "See results →" : "Next →"}
      </Button>

      {verbTag && (
        <Modal open={showConjugations} onClose={() => setShowConjugations(false)} title={`${labelForTag(verbTag)} conjugations`}>
          <ConjugationTable verb={CONJUGATIONS[verbTag]} />
        </Modal>
      )}
    </div>
  );
}
