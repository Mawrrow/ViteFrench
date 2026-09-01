/**
 * Display metadata for the two dropdown groups on the home screen's
 * "Target Practice" section. This is UI presentation only — the actual
 * filtering logic (questionService.filterQuestions) works on plain tag
 * arrays and has no knowledge of "verb" or "tense" as concepts, so new
 * tags work everywhere else the moment they appear on a question; they
 * just won't get a dedicated dropdown entry until added here.
 */
export interface TagOption {
  tag: string;
  label: string;
}

export const VERB_TAGS: TagOption[] = [
  { tag: "etre", label: "Être" },
  { tag: "avoir", label: "Avoir" },
  { tag: "aller", label: "Aller" },
  { tag: "faire", label: "Faire" },
  { tag: "prendre", label: "Prendre" },
  { tag: "venir", label: "Venir" },
  { tag: "pouvoir", label: "Pouvoir" },
  { tag: "devoir", label: "Devoir" },
  { tag: "vouloir", label: "Vouloir" },
  { tag: "savoir", label: "Savoir" },
  { tag: "connaitre", label: "Connaître" },
  { tag: "dire", label: "Dire" },
  { tag: "voir", label: "Voir" },
  { tag: "mettre", label: "Mettre" },
  { tag: "partir", label: "Partir" },
  { tag: "sortir", label: "Sortir" },
  { tag: "dormir", label: "Dormir" },
  { tag: "boire", label: "Boire" },
  { tag: "lire", label: "Lire" },
  { tag: "ecrire", label: "Écrire" },
];

export const TENSE_TAGS: TagOption[] = [
  { tag: "present", label: "Présent" },
  { tag: "passe_compose", label: "Passé composé" },
  { tag: "imparfait", label: "Imparfait" },
  { tag: "futur", label: "Futur" },
  { tag: "conditionnel", label: "Conditionnel" },
  { tag: "subjonctif", label: "Subjonctif" },
];

const KNOWN_LABELS = new Map<string, string>([...VERB_TAGS, ...TENSE_TAGS].map((t) => [t.tag, t.label]));

/** Human-readable label for any tag, known or not — falls back to title-casing the raw tag. */
export function labelForTag(tag: string): string {
  const known = KNOWN_LABELS.get(tag);
  if (known) return known;
  return tag
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
