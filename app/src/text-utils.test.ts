import { describe, expect, it } from "vitest";
import { capitalizeWords, parseTags, reverseWords, slugify, truncate } from "./text-utils.js";

describe("capitalizeWords", () => {
  it("capitalizes first letter of each word and lowercases the rest", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words", () => {
    expect(capitalizeWords("red   t-shirt")).toBe("Red   T-shirt");
  });

  it("preserves leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("returns empty string unchanged", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("handles already Title Case input", () => {
    expect(capitalizeWords("already Title Case")).toBe("Already Title Case");
  });
});

describe("reverseWords", () => {
  it("reverses the order of words in a sentence", () => {
    expect(reverseWords("hello world")).toBe("world hello");
  });

  it("handles extra whitespace", () => {
    expect(reverseWords("  foo  bar  ")).toBe("bar foo");
  });
});

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

  it("regression BUG-101: result length never exceeds maxLength", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("regression BUG-101: returns exactly maxLength chars with suffix counted in", () => {
    expect(truncate("a long sentence here", 10, "...")).toBe("a long ...");
  });

  it("edge case: suffix length >= maxLength returns suffix sliced to maxLength", () => {
    expect(truncate("hello world", 2, "...").length).toBeLessThanOrEqual(2);
  });
});
