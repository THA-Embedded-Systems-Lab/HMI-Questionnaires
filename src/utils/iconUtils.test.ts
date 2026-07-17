import { describe, it, expect } from "vitest";
import { getIconForLink } from "./iconUtils";

// import.meta.env.BASE_URL is supplied by Vite/Vitest; matches vite.config base.
const base = import.meta.env.BASE_URL;

describe("getIconForLink", () => {
  it("returns the light and dark website icons", () => {
    expect(getIconForLink("website", false)).toBe(
      base + "open_in_new-black.svg"
    );
    expect(getIconForLink("website", true)).toBe(
      base + "open_in_new-white.svg"
    );
  });

  it("returns a theme-agnostic icon for doi", () => {
    expect(getIconForLink("doi", false)).toBe(base + "doi.svg");
    expect(getIconForLink("doi", true)).toBe(base + "doi.svg");
  });

  it("returns the light and dark git icons", () => {
    expect(getIconForLink("git", false)).toBe(base + "Git-Icon-Black.svg");
    expect(getIconForLink("git", true)).toBe(base + "Git-Icon-White.svg");
  });

  it("returns the light and dark osf icons", () => {
    expect(getIconForLink("osf", false)).toBe(base + "osf.svg");
    expect(getIconForLink("osf", true)).toBe(base + "osf-white.svg");
  });

  it("returns null for an unknown link type", () => {
    expect(getIconForLink("unknown")).toBeNull();
    expect(getIconForLink("")).toBeNull();
  });

  it("prefixes every icon with the app base URL", () => {
    const icon = getIconForLink("doi");
    expect(icon).not.toBeNull();
    expect(icon!.startsWith(base)).toBe(true);
  });
});
