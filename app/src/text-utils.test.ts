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

  it("truncates long input and appends the suffix", () => {
    const result = truncate("hello world", 5);
    expect(result.length).toBeLessThan("hello world".length);
    expect(result.endsWith("...")).toBe(true);
  });

  it("keeps the result within maxLength, counting the suffix (BUG-101)", () => {
    const result = truncate("a long sentence here", 10, "...");
    expect(result.length).toBe(10);
    expect(result).toBe("a long ...");
  });

  it("returns the suffix trimmed to maxLength when suffix is at least maxLength", () => {
    const result = truncate("a long sentence here", 2, "...");
    expect(result.length).toBe(2);
    expect(result).toBe("..");
  });
});

describe("capitalizeWords", () => {
  it("uppercases the first letter of each word and lowercases the rest", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words without collapsing them", () => {
    expect(capitalizeWords("red   t-shirt")).toBe("Red   T-shirt");
  });

  it("preserves leading and trailing whitespace", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("returns an empty string unchanged", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("returns a whitespace-only string unchanged", () => {
    expect(capitalizeWords("   ")).toBe("   ");
  });

  it("normalizes an already Title Case string", () => {
    expect(capitalizeWords("already Title Case")).toBe("Already Title Case");
  });
});
