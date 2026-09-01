import { useMemo, useState } from "react";
import { Button } from "../components/Button";
import { TENSE_TAGS, VERB_TAGS, labelForTag } from "../data/tagGroups";
import { filterQuestions } from "../services/questionService";
import type { QuizConfig } from "../types/quiz";

interface HomeProps {
  onStart: (config: QuizConfig) => void;
}

const ROUND_LENGTHS = [10, 15, 20, 30];

export function Home({ onStart }: HomeProps) {
  const [count, setCount] = useState(20);
  const [verbTag, setVerbTag] = useState<string>("");
  const [tenseTag, setTenseTag] = useState<string>("");

  const targetTags = useMemo(() => [verbTag, tenseTag].filter(Boolean), [verbTag, tenseTag]);
  const matchCount = useMemo(() => filterQuestions({ tags: targetTags }).length, [targetTags]);

  function startTargeted() {
    const label = targetTags.length > 0 ? targetTags.map(labelForTag).join(" + ").toUpperCase() : "TARGET PRACTICE";
    onStart({ label, filter: { tags: targetTags }, count });
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-5xl leading-[0.95] uppercase md:text-7xl">
          French
          <br />
          Reflex
        </h1>
        <p className="text-lg font-medium text-brand-black/70 md:text-xl">Train your French. Fast.</p>
      </header>

      <section className="flex flex-col gap-4">
        <Button size="lg" className="w-full py-6 text-2xl md:text-3xl" onClick={() => onStart({ label: "QUICK FIRE", filter: {}, count })}>
          Quick fire
        </Button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onStart({ label: "MULTIPLE CHOICE", filter: { types: ["multiple_choice"] }, count })}
          >
            Multiple choice
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onStart({ label: "TRANSLATION", filter: { types: ["translation"] }, count })}
          >
            Translation
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="font-display text-sm tracking-wide text-brand-black/60 uppercase">Round length</p>
        <div className="flex gap-3">
          {ROUND_LENGTHS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`border-4 border-brand-black px-4 py-2 font-display shadow-brutal-sm transition-colors ${
                count === n ? "bg-brand-black text-white" : "bg-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t-4 border-dashed border-brand-black/30 pt-8">
        <h2 className="font-display text-2xl uppercase">Target practice</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="font-display text-xs tracking-wide text-brand-black/60 uppercase">Verb</span>
            <select
              value={verbTag}
              onChange={(e) => setVerbTag(e.target.value)}
              className="border-4 border-brand-black bg-white px-4 py-3 font-semibold shadow-brutal-sm"
            >
              <option value="">All</option>
              {VERB_TAGS.map((t) => (
                <option key={t.tag} value={t.tag}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-display text-xs tracking-wide text-brand-black/60 uppercase">Tense</span>
            <select
              value={tenseTag}
              onChange={(e) => setTenseTag(e.target.value)}
              className="border-4 border-brand-black bg-white px-4 py-3 font-semibold shadow-brutal-sm"
            >
              <option value="">All</option>
              {TENSE_TAGS.map((t) => (
                <option key={t.tag} value={t.tag}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-sm font-medium text-brand-black/60">
          {matchCount === 0 ? "No questions match this combination yet." : `${matchCount} question${matchCount === 1 ? "" : "s"} match.`}
        </p>

        <Button variant="primary" size="lg" className="w-full" disabled={matchCount === 0} onClick={startTargeted}>
          Start
        </Button>
      </section>
    </div>
  );
}
