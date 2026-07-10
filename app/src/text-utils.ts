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

  if (suffix.length >= maxLength) {
    return suffix.slice(0, maxLength);
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

export function capitalizeWords(input: string): string {
  // Split on whitespace boundaries but KEEP the separators (capturing group),
  // so multiple/leading/trailing spaces are preserved exactly — only the
  // casing of letters changes.
  return input
    .split(/(\s+)/)
    .map((part) =>
      part.length === 0 || /\s/.test(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join("");
}
