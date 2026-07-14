// Tiny text helpers shared across the WS3 tool-comparison exercise.

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(input: string, maxLength: number, suffix = "..."): string {
  if (input.length <= maxLength) {
    return input;
  }

  const availableLength = maxLength - suffix.length;
  if (availableLength <= 0) {
    return suffix.slice(0, maxLength);
  }

  return input.slice(0, availableLength) + suffix;
}

export function parseTags(input: string): string[] {
  const tags = input
    .split(/[,#]/)
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  return Array.from(new Set(tags));
}
