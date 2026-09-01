import { useEffect, useRef, useState } from "react";

interface TimerProps {
  /** Ticks while true; freezes at the current value while false. */
  active: boolean;
  /** Changing this resets the displayed time back to zero. */
  resetKey: number | string;
}

function formatElapsed(ms: number): string {
  const totalCentiseconds = Math.floor(ms / 10);
  const seconds = Math.floor(totalCentiseconds / 100);
  const centiseconds = totalCentiseconds % 100;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const cc = String(centiseconds).padStart(2, "0");
  return `${mm}:${ss}.${cc}`;
}

export function Timer({ active, resetKey }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    setElapsed(0);
  }, [resetKey]);

  useEffect(() => {
    if (!active) return;
    let rafId: number;
    const tick = () => {
      setElapsed(performance.now() - startRef.current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, resetKey]);

  return <span className="font-display text-2xl tabular-nums">{formatElapsed(elapsed)}</span>;
}
