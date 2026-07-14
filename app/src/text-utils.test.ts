import { describe, expect, it } from "vitest";
import { parseTags, slugify, truncate } from "./text-utils.js";

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

  it("respects maxLength including the suffix", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result).toBe("a long ...");
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("handles edge case when suffix length >= maxLength", () => {
    const result = truncate("hello world", 2, "...");
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it("never returns a string longer than maxLength", () => {
    const testCases = [
      { text: "a long sentence here", maxLength: 10, suffix: "..." },
      { text: "hello world", maxLength: 8, suffix: "!" },
      { text: "test", maxLength: 5, suffix: ".." },
      { text: "abc", maxLength: 3, suffix: "..." },
    ];

    testCases.forEach(({ text, maxLength, suffix }) => {
      const result = truncate(text, maxLength, suffix);
      expect(result.length).toBeLessThanOrEqual(maxLength);
    });
  });
});
