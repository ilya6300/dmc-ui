import { describe, expect, it } from "vitest";
import { getCardShadow, getThemeColors, themes } from "./themes.js";

describe("getThemeColors", () => {
  it("returns light palette by default", () => {
    expect(getThemeColors()).toBe(themes.light);
    expect(getThemeColors("unknown")).toBe(themes.light);
  });

  it("returns dark palette", () => {
    expect(getThemeColors("dark").background).toBe("#121212");
    expect(getThemeColors("dark").primary).toBe("#2196f3");
  });

  it("returns gray palette from style.css", () => {
    expect(getThemeColors("gray").background).toBe("#3c3c3d");
    expect(getThemeColors("gray").surface).toBe("#94a3b8");
  });

  it("keeps mastBlue and primary invariant across themes", () => {
    expect(themes.light.mastBlue).toBe("#236192");
    expect(themes.dark.mastBlue).toBe("#236192");
    expect(themes.gray.mastBlue).toBe("#236192");
    expect(themes.light.primary).toBe(themes.dark.primary);
    expect(themes.light.primary).toBe(themes.gray.primary);
    expect(themes.light.mainBlue1).toBe("#2196f3");
    expect(themes.dark.mainBlue1).toBe("#2196f3");
    expect(themes.gray.mainBlue1).toBe("#2196f3");
  });

  it("exposes legacy aliases on light", () => {
    expect(themes.light.bgCard).toBe(themes.light.surface);
    expect(themes.light.mainBlue1).toBe(themes.light.primary);
    expect(themes.light.cardShadow).toBe("0 4px 12px rgba(0, 0, 0, 0.25)");
  });
});

describe("getCardShadow", () => {
  it("returns none when shadow is 0", () => {
    expect(getCardShadow(themes.light, 0)).toBe("none");
  });

  it("builds blur from shadow px", () => {
    expect(getCardShadow(themes.light, 24)).toBe("0 4px 24px rgba(0, 0, 0, 0.25)");
    expect(getCardShadow(themes.dark, 12)).toBe("0 4px 12px rgba(0, 0, 0, 0.45)");
  });
});
