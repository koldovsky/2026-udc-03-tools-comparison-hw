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

describe("capitalizeWords", () => {
  it("title-cases a mixed-case string", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words and only touches the first letter of each word", () => {
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

  it("normalizes already title-cased input consistently", () => {
    expect(capitalizeWords("already Title Case")).toBe("Already Title Case");
  });
});

describe("truncate", () => {
  it("returns the input unchanged when it is already within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long input while keeping the suffix within maxLength", () => {
    expect(truncate("a long sentence here", 10, "...")).toBe("a long ...");
  });

  it("never returns a string longer than maxLength when truncated", () => {
    const result = truncate("a long sentence here", 10, "...");

    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("returns a trimmed suffix when the suffix is at least as long as maxLength", () => {
    expect(truncate("hello world", 3, "...")).toBe("...");
    expect(truncate("hello world", 2, "...")).toBe("..");
  });
});
