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

  // maxLength is a hard limit that includes the suffix. Clamp at 0 because a
  // negative slice end counts from the end of the string and would overshoot.
  if (suffix.length >= maxLength) {
    return suffix.slice(0, Math.max(0, maxLength));
  }

  return input.slice(0, maxLength - suffix.length) + suffix;
}

export function parseTags(input: string): string[] {
  const tags = input
    .split(/[,#]/)
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  return Array.from(new Set(tags));
}
