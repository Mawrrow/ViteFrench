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
    <>
      {/* Below sm: a grid this wide has no room to breathe, so stack one bordered
          card per pronoun instead — normal vertical scrolling, nothing clipped
          or requiring a sideways swipe. */}
      <div className="flex flex-col gap-3 sm:hidden">
        {PRONOUNS.map((pronoun) => (
          <div key={pronoun} className="border-4 border-brand-black bg-white shadow-brutal-sm">
            <div className="bg-brand-black px-3 py-2 font-display text-sm text-white uppercase">{pronoun}</div>
            <dl>
              {verb.tenses.map((t, i) => (
                <div
                  key={t.tenseTag}
                  className={`flex items-center justify-between gap-3 px-3 py-2 ${i > 0 ? "border-t border-brand-black/15" : ""} ${
                    i % 2 === 1 ? "bg-brand-cream/60" : "bg-white"
                  }`}
                >
                  <dt className="font-display text-xs text-brand-black/60 uppercase">{TENSE_HEADER_LABELS[t.tenseTag] ?? t.tenseTag}</dt>
                  <dd className="font-medium">{formatCell(pronoun, t.forms[pronoun])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto border-4 border-brand-black shadow-brutal-sm sm:block">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-20" />
            {verb.tenses.map((t) => (
              <col key={t.tenseTag} />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-brand-black">
              <th className="px-3 py-3">
                <span className="sr-only">Pronoun</span>
              </th>
              {verb.tenses.map((t) => (
                <th key={t.tenseTag} className="px-3 py-3 text-left font-display text-xs leading-tight text-white uppercase">
                  {TENSE_HEADER_LABELS[t.tenseTag] ?? t.tenseTag}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRONOUNS.map((pronoun, i) => (
              <tr key={pronoun} className={i % 2 === 1 ? "bg-brand-cream/60" : "bg-white"}>
                <th scope="row" className="border-r-4 border-brand-black px-3 py-3 text-left font-display text-sm uppercase">
                  {pronoun}
                </th>
                {verb.tenses.map((t) => (
                  <td key={t.tenseTag} className="border-t border-brand-black/15 px-3 py-3 text-base font-medium wrap-break-word">
                    {formatCell(pronoun, t.forms[pronoun])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
