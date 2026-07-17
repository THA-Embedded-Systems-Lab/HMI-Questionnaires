import { describe, it, expect } from "vitest";
import questionnaires from "./questionnaires";
import { Time } from "./types/Time";
import { ResponseFormat } from "./types/ResponseFormat";
import { getLanguageDisplayName } from "./utils/languageUtils";

const validTimes = new Set<string>(Object.values(Time));
const validResponseFormats = new Set<string>(Object.values(ResponseFormat));
const currentYear = new Date().getFullYear();

// A language code is valid when languageUtils resolves it to a real name,
// i.e. the returned string is not just the bare uppercased code.
const isValidLanguageCode = (code: string): boolean =>
  getLanguageDisplayName(code) !== code.toUpperCase();

describe("questionnaires dataset", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(questionnaires)).toBe(true);
    expect(questionnaires.length).toBeGreaterThan(0);
  });

  it("has unique, non-empty short codes", () => {
    const shorts = questionnaires.map((q) => q.short);
    for (const short of shorts) {
      expect(short.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(shorts).size).toBe(shorts.length);
  });

  it("has a non-empty name for every entry", () => {
    for (const q of questionnaires) {
      expect(q.name.trim().length, `name for ${q.short}`).toBeGreaterThan(0);
    }
  });

  describe("metadata", () => {
    it("uses only valid Time enum values (at least one)", () => {
      for (const q of questionnaires) {
        expect(q.metadata.time.length, `time for ${q.short}`).toBeGreaterThan(
          0
        );
        for (const t of q.metadata.time) {
          expect(validTimes.has(t), `invalid time "${t}" in ${q.short}`).toBe(
            true
          );
        }
      }
    });

    it("lists only valid ISO-639-1 language codes", () => {
      for (const q of questionnaires) {
        expect(
          q.metadata.languages.length,
          `languages for ${q.short}`
        ).toBeGreaterThan(0);
        for (const lang of q.metadata.languages) {
          expect(
            isValidLanguageCode(lang),
            `unknown language "${lang}" in ${q.short}`
          ).toBe(true);
        }
      }
    });

    it("has a plausible year when present", () => {
      for (const q of questionnaires) {
        if (q.metadata.year !== undefined) {
          expect(q.metadata.year, `year for ${q.short}`).toBeGreaterThanOrEqual(
            1900
          );
          expect(q.metadata.year, `year for ${q.short}`).toBeLessThanOrEqual(
            currentYear + 1
          );
        }
      }
    });

    it("has a positive item count when present", () => {
      for (const q of questionnaires) {
        if (q.metadata.items !== undefined) {
          expect(q.metadata.items, `items for ${q.short}`).toBeGreaterThan(0);
        }
      }
    });

    it("uses only valid ResponseFormat values when present", () => {
      for (const q of questionnaires) {
        if (q.metadata.responseFormat !== undefined) {
          expect(
            validResponseFormats.has(q.metadata.responseFormat),
            `invalid responseFormat in ${q.short}`
          ).toBe(true);
        }
      }
    });
  });

  describe("data entries", () => {
    it("has at least one data entry with a valid language", () => {
      for (const q of questionnaires) {
        expect(q.data.length, `data for ${q.short}`).toBeGreaterThan(0);
        for (const entry of q.data) {
          expect(
            isValidLanguageCode(entry.language),
            `unknown data language "${entry.language}" in ${q.short}`
          ).toBe(true);
        }
      }
    });

    it("has non-empty scale names for every data entry", () => {
      for (const q of questionnaires) {
        for (const entry of q.data) {
          expect(
            entry.scales.length,
            `scales for ${q.short}/${entry.language}`
          ).toBeGreaterThan(0);
          for (const scale of entry.scales) {
            expect(
              scale.name.trim().length,
              `scale name in ${q.short}/${entry.language}`
            ).toBeGreaterThan(0);
          }
        }
      }
    });

    it("keeps reliability coefficients within [0, 1]", () => {
      for (const q of questionnaires) {
        for (const entry of q.data) {
          for (const scale of entry.scales) {
            if (scale.cronbachsAlpha !== undefined) {
              expect(
                scale.cronbachsAlpha,
                `alpha for ${q.short}/${scale.name}`
              ).toBeGreaterThanOrEqual(0);
              expect(
                scale.cronbachsAlpha,
                `alpha for ${q.short}/${scale.name}`
              ).toBeLessThanOrEqual(1);
            }
            if (scale.omega !== undefined) {
              expect(
                scale.omega.value,
                `omega for ${q.short}/${scale.name}`
              ).toBeGreaterThanOrEqual(0);
              expect(
                scale.omega.value,
                `omega for ${q.short}/${scale.name}`
              ).toBeLessThanOrEqual(1);
            }
          }
        }
      }
    });

    it("has a positive participant count when reported", () => {
      for (const q of questionnaires) {
        for (const entry of q.data) {
          if (entry.participantDetails) {
            expect(
              entry.participantDetails.n,
              `n for ${q.short}/${entry.language}`
            ).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  describe("links", () => {
    it("has a parseable URL and non-empty title for every link", () => {
      for (const q of questionnaires) {
        for (const [type, links] of Object.entries(q.links ?? {})) {
          for (const link of links) {
            expect(
              link.title.trim().length,
              `link title (${type}) in ${q.short}`
            ).toBeGreaterThan(0);
            expect(
              () => new URL(link.url),
              `unparseable ${type} url in ${q.short}: ${link.url}`
            ).not.toThrow();
          }
        }
      }
    });
  });
});
