import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Feedback } from "../components/Feedback";
import { MultipleChoiceQuestionView } from "../components/MultipleChoiceQuestionView";
import { QuizProgress } from "../components/QuizProgress";
import { Timer } from "../components/Timer";
import { TranslationQuestionView } from "../components/TranslationQuestionView";
import { useQuiz } from "../hooks/useQuiz";
import { filterQuestions, selectRandomQuestions } from "../services/questionService";
import type { QuizConfig } from "../types/quiz";

/**
 * The quiz session lives entirely off `useLocation().state`, set by whatever
 * navigated here (Home, or Results' "Practice again"). There's no URL for a
 * quiz config — reloading /quiz directly has nothing to resume, so it bounces
 * home. `location.key` is unique per navigation entry (even to the same
 * path), so keying QuizSession on it forces a full reset every time a new
 * round starts instead of reusing stale useQuiz state from the last one.
 */
export function Quiz() {
  const location = useLocation();
  const config = location.state as QuizConfig | null;

  if (!config) return <Navigate to="/" replace />;

  return <QuizSession key={location.key} config={config} />;
}

function QuizSession({ config }: { config: QuizConfig }) {
  const navigate = useNavigate();
  const questions = useMemo(() => selectRandomQuestions(filterQuestions(config.filter), config.count), [config]);

  const quiz = useQuiz(questions);
  const [translationInput, setTranslationInput] = useState("");

  useEffect(() => {
    setTranslationInput("");
  }, [quiz.index]);

  useEffect(() => {
    // Only fire once, the moment completion flips true — quiz.records/config
    // intentionally excluded to avoid re-firing as records accumulate mid-session.
    if (quiz.isComplete) navigate("/results", { state: { records: quiz.records, config }, replace: true });
  }, [quiz.isComplete]);

  useEffect(() => {
    if (quiz.phase !== "question" || quiz.currentQuestion?.type !== "multiple_choice") return;
    const options = quiz.currentQuestion.options;
    function handleKey(e: KeyboardEvent) {
      const num = Number(e.key);
      if (num >= 1 && num <= options.length) {
        quiz.submitAnswer(options[num - 1]);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [quiz.phase, quiz.currentQuestion]);

  if (questions.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
        <p className="font-display text-2xl uppercase">No questions match this selection</p>
        <p className="text-brand-black/70">Try a broader combination of filters.</p>
        <button
          onClick={() => navigate("/")}
          className="border-4 border-brand-black bg-brand-blue px-6 py-3 font-display text-white uppercase shadow-brutal-sm hover:cursor-pointer"
        >
          Back to home
        </button>
      </div>
    );
  }

  if (quiz.isComplete || !quiz.currentQuestion) return null;

  const question = quiz.currentQuestion;
  const isLast = quiz.index === quiz.total - 1;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-3xl flex-col justify-between px-4 py-8">
      <QuizProgress label={config.label} current={quiz.index} total={quiz.total} />

      <div className="flex flex-1 flex-col justify-center py-10">
        {question.type === "multiple_choice" ? (
          <MultipleChoiceQuestionView
            question={question}
            phase={quiz.phase}
            selectedOption={quiz.phase === "feedback" ? (quiz.lastAnswer?.userAnswer ?? null) : null}
            onSelect={(option) => quiz.submitAnswer(option)}
          />
        ) : (
          <TranslationQuestionView
            question={question}
            phase={quiz.phase}
            value={translationInput}
            onChange={setTranslationInput}
            onSubmit={() => quiz.submitAnswer(translationInput)}
            correct={quiz.lastAnswer?.correct ?? null}
          />
        )}

        {quiz.phase === "feedback" && quiz.lastAnswer && (
          <Feedback
            question={question}
            userAnswer={quiz.lastAnswer.userAnswer}
            correct={quiz.lastAnswer.correct}
            onNext={quiz.next}
            isLast={isLast}
          />
        )}
      </div>

      <div className="flex justify-center">
        <Timer active={quiz.phase === "question"} resetKey={quiz.index} />
      </div>
    </div>
  );
}
