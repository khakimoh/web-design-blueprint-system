/**
 * Defensive coercion helpers for boundary normalization (API responses,
 * storage, query parameters). Inside the application, types are trusted.
 */

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/** Keeps only values allowed by `allowed`; otherwise returns `fallback`. */
export function asOneOf<const T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** Maps an unknown value to an array, dropping entries the mapper rejects (returns null). */
export function asArray<T>(value: unknown, map: (entry: unknown) => T | null): T[] {
  if (!Array.isArray(value)) return [];
  return value.map(map).filter((entry): entry is T => entry !== null);
}
