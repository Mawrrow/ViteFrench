/**
 * Normalizes a French sentence for comparison: trims, lowercases,
 * collapses whitespace, unifies apostrophe styles, and strips
 * trailing/isolated punctuation that shouldn't affect correctness.
 * Accents are preserved on purpose — they can be grammatically meaningful.
 */
export function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}
