import type { MultipleChoiceQuestion } from "../types/question";
import type { QuizPhase } from "../hooks/useQuiz";

interface Props {
  question: MultipleChoiceQuestion;
  phase: QuizPhase;
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

function renderSentence(sentence: string) {
  const parts = sentence.split("______");
  if (parts.length === 1) return sentence;
  return (
    <>
      {parts[0]}
      <span className="mx-1 inline-block min-w-[3.5ch] border-b-4 border-brand-black align-middle">&nbsp;</span>
      {parts[1]}
    </>
  );
}

export function MultipleChoiceQuestionView({ question, phase, selectedOption, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-center text-2xl leading-snug font-bold text-balance md:text-4xl">
        {renderSentence(question.sentence)}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === question.answer;

          let stateClasses = "bg-white hover:bg-brand-cream";
          if (phase === "feedback") {
            if (isCorrectOption) stateClasses = "bg-brand-green text-white";
            else if (isSelected) stateClasses = "bg-brand-red text-white";
            else stateClasses = "bg-white opacity-60";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={phase === "feedback"}
              onClick={() => onSelect(option)}
              className={`flex items-center gap-3 border-4 border-brand-black px-5 py-4 text-left text-lg font-semibold shadow-brutal-sm transition-colors disabled:cursor-default hover:cursor-pointer ${stateClasses}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-brand-black font-display text-sm">
                {i + 1}
              </span>
              <span className="uppercase">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
