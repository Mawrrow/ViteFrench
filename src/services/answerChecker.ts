import { normalizeAnswer } from "../utils/normalization";

/** Multiple-choice: options are pre-defined, so an exact string match is correct. */
export function checkMultipleChoice(selected: string, answer: string): boolean {
  return selected === answer;
}

/** Translation: accept any of the question's known-good variants after normalization. */
export function checkTranslation(userAnswer: string, acceptedAnswers: string[]): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  if (normalizedUser.length === 0) return false;
  return acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalizedUser);
}
