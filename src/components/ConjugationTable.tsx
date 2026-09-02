import { PRONOUNS } from "../data/conjugations";
import type { Pronoun, VerbConjugation } from "../types/conjugation";

const VOWEL_SOUND = /^[aeiouhàâéèêëîïôùûü]/i;

/**
 * Short header labels for the table specifically — long single-word tense
 * names (no space to wrap at) would otherwise break mid-word on narrow
 * screens. Falls back to the tense tag itself for anything not listed.
 */
const TENSE_HEADER_LABELS: Record<string, string> = {
  present: "Présent",
  passe_compose: "Passé composé",
  imparfait: "Imparf.",
  futur: "Futur",
  conditionnel: "Cond.",
  subjonctif: "Subj.",
};

/** "je" elides to "j'" before a vowel sound; no other pronoun here ever does. */
function formatCell(pronoun: Pronoun, form: string): string {
  if (pronoun === "je" && VOWEL_SOUND.test(form)) return `j’${form}`;
  return `${pronoun} ${form}`;
}

interface ConjugationTableProps {
  verb: VerbConjugation;
}

export function ConjugationTable({ verb }: ConjugationTableProps) {
  return (
    <div className="overflow-x-auto border-4 border-brand-black shadow-brutal-sm">
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-14 sm:w-20" />
          {verb.tenses.map((t) => (
            <col key={t.tenseTag} />
          ))}
        </colgroup>
        <thead>
          <tr className="bg-brand-black">
            <th className="px-2 py-3 sm:px-3">
              <span className="sr-only">Pronoun</span>
            </th>
            {verb.tenses.map((t) => (
              <th
                key={t.tenseTag}
                className="px-2 py-3 text-left font-display text-[10px] leading-tight text-white uppercase sm:px-3 sm:text-xs"
              >
                {TENSE_HEADER_LABELS[t.tenseTag] ?? t.tenseTag}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRONOUNS.map((pronoun, i) => (
            <tr key={pronoun} className={i % 2 === 1 ? "bg-brand-cream/60" : "bg-white"}>
              <th
                scope="row"
                className="border-r-4 border-brand-black px-2 py-3 text-left font-display text-xs uppercase sm:px-3 sm:text-sm"
              >
                {pronoun}
              </th>
              {verb.tenses.map((t) => (
                <td
                  key={t.tenseTag}
                  className="border-t border-brand-black/15 px-2 py-3 text-sm font-medium wrap-break-word sm:px-3 sm:text-base"
                >
                  {formatCell(pronoun, t.forms[pronoun])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
