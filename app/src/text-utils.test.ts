import { describe, expect, it } from "vitest";
import { capitalize, parseTags, slugify, truncate } from "./text-utils.js";

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

  it("regression BUG-101: result never exceeds maxLength including suffix", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result).toBe("a long ...");
  });

  it("regression BUG-101 edge case: suffix.length >= maxLength", () => {
    const result = truncate("hello world", 2, "...");
    expect(result.length).toBeLessThanOrEqual(2);
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter, leaves the rest unchanged", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("returns an empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });

  it("does not alter already-capitalized input", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("capitalizes a single character", () => {
    expect(capitalize("a")).toBe("A");
  });
});
