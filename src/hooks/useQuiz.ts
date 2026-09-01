import { useEffect, useMemo, useRef, useState } from "react";
import { checkMultipleChoice, checkTranslation } from "../services/answerChecker";
import { recordAttempt } from "../services/progressService";
import type { Question } from "../types/question";

export interface AnsweredRecord {
  question: Question;
  userAnswer: string;
  correct: boolean;
  responseTimeMs: number;
}

export type QuizPhase = "question" | "feedback";

/**
 * Drives a single quiz session: current question, timing, scoring, and
 * persistence of each attempt. `questions` is expected to already be
 * filtered/shuffled/sliced by the caller (question selection stays a
 * separate, swappable concern from the quiz loop itself).
 */
export function useQuiz(questions: Question[]) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>("question");
  const [lastAnswer, setLastAnswer] = useState<{ userAnswer: string; correct: boolean } | null>(null);
  const [records, setRecords] = useState<AnsweredRecord[]>([]);
  const startTimeRef = useRef(performance.now());

  const currentQuestion = index < questions.length ? questions[index] : undefined;
  const isComplete = index >= questions.length;

  useEffect(() => {
    if (!isComplete) startTimeRef.current = performance.now();
  }, [index, isComplete]);

  function submitAnswer(userAnswer: string) {
    if (phase !== "question" || !currentQuestion) return;

    const responseTimeMs = Math.round(performance.now() - startTimeRef.current);
    const correct =
      currentQuestion.type === "multiple_choice"
        ? checkMultipleChoice(userAnswer, currentQuestion.answer)
        : checkTranslation(userAnswer, currentQuestion.answers);

    void recordAttempt({
      questionId: currentQuestion.id,
      questionType: currentQuestion.type,
      correct,
      responseTimeMs,
      timestamp: new Date().toISOString(),
    });

    setRecords((prev) => [...prev, { question: currentQuestion, userAnswer, correct, responseTimeMs }]);
    setLastAnswer({ userAnswer, correct });
    setPhase("feedback");
  }

  function next() {
    setPhase("question");
    setLastAnswer(null);
    setIndex((i) => i + 1);
  }

  const summary = useMemo(() => {
    const total = records.length;
    const correctCount = records.filter((r) => r.correct).length;
    const avgResponseTimeMs = total > 0 ? records.reduce((s, r) => s + r.responseTimeMs, 0) / total : 0;
    return { total, correctCount, avgResponseTimeMs };
  }, [records]);

  return {
    currentQuestion,
    index,
    total: questions.length,
    phase,
    lastAnswer,
    records,
    isComplete,
    submitAnswer,
    next,
    summary,
  };
}
