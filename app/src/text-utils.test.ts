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
    // result should be no longer than maxLength and should include the suffix
    expect(result.length).toBeLessThanOrEqual(5);
    expect(result.endsWith("...")).toBe(true);
  });

  it("regression: ensures suffix is counted against maxLength", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result).toBe("a long ...");
  });

  it("returns the input unchanged when shorter than maxLength even if a suffix is provided", () => {
    const result = truncate("short", 10, "...");
    expect(result).toBe("short");
  });

  it("returns trimmed suffix when suffix.length >= maxLength", () => {
    const result = truncate("hello world", 2, "...");
    expect(result).toBe("..");
    expect(result.length).toBe(2);
  });
});
