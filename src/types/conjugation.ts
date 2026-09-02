export type Pronoun = "je" | "tu" | "il" | "elle" | "on" | "nous" | "vous" | "ils" | "elles";

export interface TenseConjugation {
  /** Matches the tense tags used on questions (e.g. "present", "passe_compose"). */
  tenseTag: string;
  forms: Record<Pronoun, string>;
}

export interface VerbConjugation {
  /** Matches the verb tags used on questions (e.g. "etre", "avoir"). */
  verbTag: string;
  tenses: TenseConjugation[];
}
