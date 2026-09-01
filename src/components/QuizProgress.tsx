interface QuizProgressProps {
  label: string;
  current: number;
  total: number;
}

export function QuizProgress({ label, current, total }: QuizProgressProps) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between font-display text-sm uppercase tracking-wide md:text-base">
        <span>{label}</span>
        <span className="tabular-nums">
          {Math.min(current + 1, total)} / {total}
        </span>
      </div>
      <div className="mt-2 h-3 w-full border-2 border-brand-black bg-white">
        <div className="h-full bg-brand-blue transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
