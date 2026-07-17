import { describe, it, expect } from "vitest";
import { getLanguageDisplayName } from "./languageUtils";

describe("getLanguageDisplayName", () => {
  it("formats a known lowercase code as 'Name (CODE)'", () => {
    expect(getLanguageDisplayName("en")).toBe("English (EN)");
    expect(getLanguageDisplayName("de")).toBe("German (DE)");
  });

  it("is case-insensitive on the input code", () => {
    expect(getLanguageDisplayName("EN")).toBe("English (EN)");
    expect(getLanguageDisplayName("De")).toBe("German (DE)");
  });

  it("uppercases the code in the parenthetical regardless of input case", () => {
    expect(getLanguageDisplayName("fr")).toBe("French (FR)");
  });

  it("falls back to the uppercased code when the language is unknown", () => {
    expect(getLanguageDisplayName("xx")).toBe("XX");
    expect(getLanguageDisplayName("zz")).toBe("ZZ");
  });
});
