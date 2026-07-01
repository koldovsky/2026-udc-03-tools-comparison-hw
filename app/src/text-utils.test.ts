import { describe, expect, it } from "vitest";
import { capitalizeWords, parseTags, slugify, truncate } from "./text-utils.js";

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

  it("truncates long input and appends the suffix within maxLength", () => {
    const result = truncate("hello world", 5);
    expect(result.length).toBeLessThanOrEqual(5);
    expect(result.endsWith("...")).toBe(true);
  });

  // Regression test for BUG-101: the final string (text + suffix) must never
  // exceed maxLength — the suffix length must be reserved out of the budget.
  it("BUG-101: never returns a string longer than maxLength once the suffix is included", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result).toBe("a long ...");
    expect(result.length).toBe(10);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("BUG-101 edge case: returns the (truncated) suffix itself when suffix.length >= maxLength", () => {
    expect(truncate("a long sentence here", 2, "...")).toBe("..".slice(0, 2));
    expect(truncate("a long sentence here", 2, "...").length).toBe(2);
  });
});

describe("capitalizeWords", () => {
  it("capitalizes the first letter of each word and lowercases the rest", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words without collapsing them", () => {
    expect(capitalizeWords("red   t-shirt")).toBe("Red   T-shirt");
  });

  it("preserves leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("returns an empty string unchanged", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("returns a whitespace-only string unchanged", () => {
    expect(capitalizeWords("   ")).toBe("   ");
  });

  it("is idempotent on already-title-cased input", () => {
    expect(capitalizeWords("already Title Case")).toBe("Already Title Case");
  });
});
