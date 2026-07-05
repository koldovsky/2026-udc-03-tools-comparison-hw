import { describe, expect, it } from "vitest";
import { parseTags, slugify, truncate, capitalizeWords } from "./text-utils.js";

describe("slugify", () => {
  it("lowercases and hyphenates a plain title", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses punctuation and extra spaces into single hyphens", () => {
    expect(slugify("  AI Tools: A Comparison!! ")).toBe("ai-tools-a-comparison");
  });
});

describe("parseTags", () => {
  it("splits on commas and hashes, trims, lowercases, and dedupes", () => {
    expect(parseTags("#AI, Tools,#ai, dev ")).toEqual(["ai", "tools", "dev"]);
  });

  it("returns an empty array for blank input", () => {
    expect(parseTags("   ")).toEqual([]);
  });
});

describe("truncate", () => {
  it("returns the input unchanged when it is already within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long input and appends the suffix", () => {
    const result = truncate("hello world", 5);
    expect(result.length).toBeLessThan("hello world".length);
    expect(result.endsWith("...")).toBe(true);
  });

  it("keeps the final length within maxLength, counting the suffix (BUG-101)", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result).toBe("a long ...");
    expect(result.length).toBe(10);
  });

  it("never returns a string longer than maxLength for any input", () => {
    const cases: Array<[string, number, string]> = [
      ["a long sentence here", 10, "..."],
      ["hello world", 5, "..."],
      ["abcdefghij", 4, ".."],
    ];
    for (const [input, maxLength, suffix] of cases) {
      expect(truncate(input, maxLength, suffix).length).toBeLessThanOrEqual(maxLength);
    }
  });

  it("returns the suffix clipped to maxLength when suffix.length >= maxLength", () => {
    const result = truncate("hello world", 2, "...");
    expect(result.length).toBeLessThanOrEqual(2);
    expect(result).toBe("..");
  });
});

describe("capitalizeWords", () => {
  it("capitalizes the first letter of each word and lowercases the rest", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words exactly", () => {
    expect(capitalizeWords("red   t-shirt")).toBe("Red   T-shirt");
  });

  it("preserves leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("returns empty string unchanged", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("preserves already capitalized Title Case string", () => {
    expect(capitalizeWords("already Title Case")).toBe("Already Title Case");
  });

  it("preserves space-only strings unchanged", () => {
    expect(capitalizeWords("   ")).toBe("   ");
  });

  it("handles punctuation prefixes on words correctly", () => {
    expect(capitalizeWords("(hello) world!")).toBe("(Hello) World!");
  });

  it("capitalizes non-English Unicode characters", () => {
    expect(capitalizeWords("яблоко груша")).toBe("Яблоко Груша");
    expect(capitalizeWords("élan café")).toBe("Élan Café");
  });

  it("preserves emojis and handles surrogate pairs correctly", () => {
    expect(capitalizeWords("👋 hello 🌍")).toBe("👋 Hello 🌍");
  });

  it("handles alphanumeric words correctly", () => {
    expect(capitalizeWords("123hello world123")).toBe("123Hello World123");
  });
});
