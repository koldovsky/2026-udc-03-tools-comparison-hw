// Tiny string helpers following the pattern of text-utils.ts.

export function capitalize(input: string): string {
  if (!input) {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function camelCase(input: string): string {
  const words = input
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return "";
  }

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
