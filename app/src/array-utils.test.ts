import { describe, expect, it } from "vitest";
import { chunk, groupBy, unique } from "./array-utils.js";

describe("unique", () => {
  it("removes duplicate primitive values while preserving order", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it("returns an empty array for empty input", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("chunk", () => {
  it("splits an array into chunks of the given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns an empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws when size is not greater than 0", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow();
  });
});

describe("groupBy", () => {
  it("groups items by the key returned from keyFn", () => {
    const result = groupBy(["a", "bb", "cc", "d"], (item) => item.length);
    expect(result).toEqual({ 1: ["a", "d"], 2: ["bb", "cc"] });
  });

  it("returns an empty object for empty input", () => {
    expect(groupBy([], (item: string) => item)).toEqual({});
  });
});
