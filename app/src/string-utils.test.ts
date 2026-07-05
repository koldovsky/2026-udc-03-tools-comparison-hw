import { describe, expect, it } from "vitest";
import { camelCase, capitalize } from "./string-utils.js";

describe("capitalize", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("leaves already capitalized words unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("handles empty strings", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("camelCase", () => {
  it("converts space-separated words to camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
  });

  it("converts kebab-case and snake_case to camelCase", () => {
    expect(camelCase("hello-world_test")).toBe("helloWorldTest");
  });

  it("handles empty input or special characters only", () => {
    expect(camelCase("   ")).toBe("");
    expect(camelCase("-__-")).toBe("");
  });
});
