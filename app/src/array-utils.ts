// Tiny array helpers shared across the WS3 tool-comparison exercise.

export function unique<T>(input: T[]): T[] {
  return Array.from(new Set(input));
}

export function chunk<T>(input: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("size must be greater than 0");
  }

  const chunks: T[][] = [];

  for (let i = 0; i < input.length; i += size) {
    chunks.push(input.slice(i, i + size));
  }

  return chunks;
}

export function groupBy<T, K extends string | number>(
  input: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;

  for (const item of input) {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }

  return groups;
}
