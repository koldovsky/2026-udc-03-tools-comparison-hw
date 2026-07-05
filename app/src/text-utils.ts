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

  // maxLength is a hard cap for the final string, suffix included.
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

/**
 * Capitalizes the first letter of each word in the input string and lowercases the rest.
 * A word is a sequence of characters separated by spaces.
 * Multiple spaces, leading, and trailing spaces are preserved.
 *
 * @param input - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeWords(input: string): string {
  if (!input || !input.trim()) {
    return input;
  }

  return input.replace(/\S+/g, (word) => {
    const chars = Array.from(word);
    const firstLetterIdx = chars.findIndex((c) => /\p{L}/u.test(c));
    if (firstLetterIdx === -1) {
      return word.toLocaleLowerCase();
    }
    return chars
      .map((c, i) => (i === firstLetterIdx ? c.toLocaleUpperCase() : c.toLocaleLowerCase()))
      .join("");
  });
}


