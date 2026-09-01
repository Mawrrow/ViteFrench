import { type DBSchema, type IDBPDatabase, openDB } from "idb";
import type { ProgressExport, QuestionAttempt } from "../types/progress";

interface ViteFrenchDB extends DBSchema {
  attempts: {
    key: number;
    value: QuestionAttempt;
    indexes: { timestamp: string };
  };
}

const DB_NAME = "vitefrench-db";
const DB_VERSION = 1;
const STORE = "attempts";

let dbPromise: Promise<IDBPDatabase<ViteFrenchDB>> | null = null;

function getDb(): Promise<IDBPDatabase<ViteFrenchDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ViteFrenchDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        store.createIndex("timestamp", "timestamp");
      },
    });
  }
  return dbPromise;
}

/**
 * Persistence layer for raw practice history. Deliberately stores only
 * individual attempts, not derived stats — everything in statistics.ts is
 * recomputed from this list so it can never drift out of sync, and this
 * whole module could be swapped for a backend-backed implementation later
 * without touching any UI or stats code.
 */
export async function recordAttempt(attempt: QuestionAttempt): Promise<void> {
  const db = await getDb();
  await db.add(STORE, attempt);
}

export async function getAllAttempts(): Promise<QuestionAttempt[]> {
  const db = await getDb();
  const attempts = await db.getAllFromIndex(STORE, "timestamp");
  return attempts;
}

export async function clearAllAttempts(): Promise<void> {
  const db = await getDb();
  await db.clear(STORE);
}

export async function exportProgress(): Promise<ProgressExport> {
  const attempts = await getAllAttempts();
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    attempts,
  };
}

function isValidAttempt(value: unknown): value is QuestionAttempt {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.questionId === "number" &&
    (v.questionType === "multiple_choice" || v.questionType === "translation") &&
    typeof v.correct === "boolean" &&
    typeof v.responseTimeMs === "number" &&
    typeof v.timestamp === "string" &&
    !Number.isNaN(Date.parse(v.timestamp))
  );
}

export class InvalidProgressFileError extends Error {
  constructor() {
    super("This file doesn't look like a valid ViteFrench progress export.");
    this.name = "InvalidProgressFileError";
  }
}

/**
 * Merges attempts from a previously exported file into local storage.
 * Merge (rather than replace) is the safe default: importing on a device
 * that already has history won't silently wipe it. Duplicate attempts
 * (same question, timestamp, and outcome) are skipped.
 */
export async function importProgress(data: unknown): Promise<{ imported: number; skipped: number }> {
  if (typeof data !== "object" || data === null || !("attempts" in data) || !Array.isArray((data as { attempts: unknown }).attempts)) {
    throw new InvalidProgressFileError();
  }
  const incoming = (data as { attempts: unknown[] }).attempts;
  if (!incoming.every(isValidAttempt)) {
    throw new InvalidProgressFileError();
  }

  const existing = await getAllAttempts();
  const existingKeys = new Set(existing.map((a) => `${a.questionId}|${a.timestamp}|${a.correct}|${a.responseTimeMs}`));

  const db = await getDb();
  const tx = db.transaction(STORE, "readwrite");
  let imported = 0;
  let skipped = 0;
  for (const attempt of incoming as QuestionAttempt[]) {
    const key = `${attempt.questionId}|${attempt.timestamp}|${attempt.correct}|${attempt.responseTimeMs}`;
    if (existingKeys.has(key)) {
      skipped++;
      continue;
    }
    existingKeys.add(key);
    await tx.store.add(attempt);
    imported++;
  }
  await tx.done;

  return { imported, skipped };
}
