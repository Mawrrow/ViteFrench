import { useState } from "react";
import type { AnsweredRecord } from "./hooks/useQuiz";
import { Home } from "./pages/Home";
import { Progress } from "./pages/Progress";
import { Quiz } from "./pages/Quiz";
import { Results } from "./pages/Results";
import type { QuizConfig } from "./types/quiz";

type View =
  | { name: "home" }
  | { name: "quiz"; config: QuizConfig; sessionId: number }
  | { name: "results"; records: AnsweredRecord[]; config: QuizConfig }
  | { name: "progress" };

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });

  function startQuiz(config: QuizConfig) {
    setView({ name: "quiz", config, sessionId: Date.now() });
  }

  return (
    <div className="min-h-dvh bg-brand-cream">
      <nav className="border-b-4 border-brand-black bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <button
            onClick={() => setView({ name: "home" })}
            className="font-display text-lg tracking-tight uppercase"
          >
            ViteFrench
          </button>
          <div className="flex gap-2">
            <NavButton active={view.name === "home" || view.name === "quiz" || view.name === "results"} onClick={() => setView({ name: "home" })}>
              Practice
            </NavButton>
            <NavButton active={view.name === "progress"} onClick={() => setView({ name: "progress" })}>
              Progress
            </NavButton>
          </div>
        </div>
      </nav>

      <main>
        {view.name === "home" && <Home onStart={startQuiz} />}

        {view.name === "quiz" && (
          <Quiz
            key={view.sessionId}
            config={view.config}
            onExit={() => setView({ name: "home" })}
            onFinish={(records, config) => setView({ name: "results", records, config })}
          />
        )}

        {view.name === "results" && (
          <Results
            records={view.records}
            onPracticeAgain={() => startQuiz(view.config)}
            onHome={() => setView({ name: "home" })}
          />
        )}

        {view.name === "progress" && <Progress />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className={`border-4 border-brand-black px-4 py-2 font-display text-sm uppercase shadow-brutal-sm transition-colors ${
        active ? "bg-brand-blue text-white" : "bg-white"
      }`}
    >
      {children}
    </button>
  );
}
