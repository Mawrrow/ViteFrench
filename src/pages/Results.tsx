import { Button } from "../components/Button";
import { labelForTag } from "../data/tagGroups";
import type { AnsweredRecord } from "../hooks/useQuiz";

interface ResultsProps {
  records: AnsweredRecord[];
  onPracticeAgain: () => void;
  onHome: () => void;
}

const MIN_TAG_SAMPLE = 2;

export function Results({ records, onPracticeAgain, onHome }: ResultsProps) {
  const total = records.length;
  const correct = records.filter((r) => r.correct).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgResponseSec = total > 0 ? records.reduce((s, r) => s + r.responseTimeMs, 0) / total / 1000 : 0;

  const byTag = new Map<string, { correct: number; total: number }>();
  for (const r of records) {
    for (const tag of r.question.tags) {
      const entry = byTag.get(tag) ?? { correct: 0, total: 0 };
      entry.total++;
      if (r.correct) entry.correct++;
      byTag.set(tag, entry);
    }
  }

  const tagStats = Array.from(byTag.entries())
    .map(([tag, s]) => ({ tag, accuracy: s.correct / s.total }))
    .filter((s) => (byTag.get(s.tag)?.total ?? 0) >= MIN_TAG_SAMPLE)
    .sort((a, b) => b.accuracy - a.accuracy);

  const best = tagStats[0];
  const worst = tagStats[tagStats.length - 1];
  const hasSpread = best && worst && best.tag !== worst.tag && best.accuracy !== worst.accuracy;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-16 text-center">
      <p className="font-display text-sm tracking-widest text-brand-black/60 uppercase">Quiz complete</p>
      <p className="font-display text-6xl">
        {correct} / {total}
      </p>
      <p className="font-display text-2xl text-brand-blue">{accuracy}% accuracy</p>

      <div className="mt-4 grid w-full grid-cols-2 gap-4">
        <StatBlock label="Avg response" value={`${avgResponseSec.toFixed(2)}s`} />
        <StatBlock label="Questions" value={String(total)} />
      </div>

      {hasSpread && (
        <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border-4 border-brand-black bg-white px-4 py-3 shadow-brutal-sm">
            <p className="font-display text-xs text-brand-green uppercase">Best category</p>
            <p className="font-display text-lg">{labelForTag(best.tag)}</p>
          </div>
          <div className="border-4 border-brand-black bg-white px-4 py-3 shadow-brutal-sm">
            <p className="font-display text-xs text-brand-red uppercase">Needs work</p>
            <p className="font-display text-lg">{labelForTag(worst.tag)}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex w-full flex-col gap-4 sm:flex-row">
        <Button variant="primary" size="lg" className="flex-1" onClick={onPracticeAgain}>
          Practice again
        </Button>
        <Button variant="outline" size="lg" className="flex-1" onClick={onHome}>
          Home
        </Button>
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-4 border-brand-black bg-white px-4 py-3 shadow-brutal-sm">
      <p className="font-display text-xs text-brand-black/60 uppercase">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  );
}
