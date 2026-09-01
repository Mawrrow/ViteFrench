import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllAttempts } from "../services/progressService";
import type { QuestionAttempt } from "../types/progress";
import { computeCategoryStats, computeOverallStats, computeWeaknesses } from "../utils/statistics";

/** Loads raw attempt history and derives all dashboard stats from it on demand. */
export function useProgress() {
  const [attempts, setAttempts] = useState<QuestionAttempt[] | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const all = await getAllAttempts();
    setAttempts(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const overall = useMemo(() => computeOverallStats(attempts ?? []), [attempts]);
  const categories = useMemo(() => computeCategoryStats(attempts ?? []), [attempts]);
  const weaknesses = useMemo(() => computeWeaknesses(attempts ?? [], categories), [attempts, categories]);

  return { attempts: attempts ?? [], loading, overall, categories, weaknesses, refresh };
}
