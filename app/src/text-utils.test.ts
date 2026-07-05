import { describe, expect, it } from "vitest";
import { parseTags, slugify, truncate, wordCount } from "./text-utils.js";

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

describe("wordCount", () => {
  it("counts words separated by whitespace", () => {
    expect(wordCount("hello world from tests")).toBe(4);
  });

  it("returns 0 for blank input", () => {
    expect(wordCount("   ")).toBe(0);
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

  it("BUG-101 regression: counts the suffix within maxLength (materials/task-bug-fix.md)", () => {
    const input = "a long sentence here";
    const result = truncate(input, 10, "...");
    expect(result).toBe("a long ...");
    expect(result.length).toBe(10);
  });

  it("handles edge case where suffix.length >= maxLength by returning sliced suffix", () => {
    expect(truncate("hello world", 2, "...")).toBe("..");
    expect(truncate("hello world", 3, "...")).toBe("...");
  });

  it("returns an empty string if maxLength is 0 or negative", () => {
    expect(truncate("hello world", 0)).toBe("");
    expect(truncate("hello world", -5)).toBe("");
  });
});
