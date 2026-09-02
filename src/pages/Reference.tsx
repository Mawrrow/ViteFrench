import { Link } from "react-router-dom";
import { CONJUGATIONS } from "../data/conjugations";
import { labelForTag } from "../data/tagGroups";

/**
 * Index of verbs with a conjugation table available. Driven entirely by
 * CONJUGATIONS' keys — adding a verb there is enough to get a card here.
 */
export function Reference() {
  const verbTags = Object.keys(CONJUGATIONS);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-4xl uppercase md:text-5xl">Reference</h1>
        <p className="text-lg font-medium text-brand-black/70">Conjugation tables — quick lookup, no lessons.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {verbTags.map((tag) => (
          <Link
            key={tag}
            to={`/reference/${tag}`}
            className="border-4 border-brand-black bg-white px-4 py-6 text-center font-display text-xl uppercase shadow-brutal-sm transition-colors hover:cursor-pointer hover:bg-brand-cream"
          >
            {labelForTag(tag)}
          </Link>
        ))}
      </div>
    </div>
  );
}
