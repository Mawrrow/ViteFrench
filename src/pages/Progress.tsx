import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { labelForTag } from "../data/tagGroups";
import { useProgress } from "../hooks/useProgress";
import { InvalidProgressFileError, exportProgress, importProgress } from "../services/progressService";

export function Progress() {
  const { attempts, loading, overall, categories, weaknesses, refresh } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  async function handleExport() {
    const data = await exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vitefrench-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const { imported, skipped } = await importProgress(json);
      setImportMessage(
        `Imported ${imported} attempt${imported === 1 ? "" : "s"}${skipped ? `, skipped ${skipped} duplicate${skipped === 1 ? "" : "s"}` : ""}.`,
      );
      await refresh();
    } catch (err) {
      setImportMessage(err instanceof InvalidProgressFileError ? err.message : "Couldn't read that file — is it a ViteFrench export?");
    }
  }

  if (loading) {
    return <div className="px-4 py-24 text-center text-brand-black/60">Loading…</div>;
  }

  const sortedCategories = [...categories].sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Progress</h1>

      {attempts.length === 0 ? (
        <section className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="font-display text-2xl uppercase">No practice yet</p>
          <p className="text-brand-black/70">Finish a round to start building your stats — or import a backup below.</p>
        </section>
      ) : (
        <>
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Answered" value={String(overall.totalAnswered)} />
            <StatCard label="Accuracy" value={`${Math.round(overall.accuracy * 100)}%`} />
            <StatCard label="Avg time" value={`${(overall.avgResponseTimeMs / 1000).toFixed(2)}s`} />
            <StatCard label="Streak" value={`${overall.currentStreak}d`} />
          </section>

          {weaknesses.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-xl uppercase">Weak areas</h2>
              <div className="flex flex-col gap-3">
                {weaknesses.slice(0, 5).map((w) => (
                  <div
                    key={w.tag}
                    className="flex items-center justify-between border-4 border-brand-black bg-white px-4 py-3 shadow-brutal-sm"
                  >
                    <span className="font-display uppercase">{labelForTag(w.tag)}</span>
                    <span className="font-display text-brand-red">{Math.round(w.accuracy * 100)}% accuracy</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl uppercase">By category</h2>
            <div className="flex flex-col gap-2">
              {sortedCategories.map((c) => (
                <div key={c.tag} className="border-2 border-brand-black bg-white px-4 py-3">
                  <div className="flex items-center justify-between font-semibold">
                    <span>{labelForTag(c.tag)}</span>
                    <span className="tabular-nums">
                      {Math.round(c.accuracy * 100)}% &middot; {(c.avgResponseTimeMs / 1000).toFixed(2)}s
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full border border-brand-black bg-brand-cream">
                    <div className="h-full bg-brand-blue" style={{ width: `${c.accuracy * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="flex flex-col gap-3 border-t-4 border-dashed border-brand-black/30 pt-8">
        <h2 className="font-display text-xl uppercase">Backup</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={handleExport}>
            Export progress
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Import progress
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
        {importMessage && <p className="text-sm text-brand-black/70">{importMessage}</p>}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-4 border-brand-black bg-white px-4 py-3 text-center shadow-brutal-sm">
      <p className="font-display text-xs text-brand-black/60 uppercase">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  );
}
