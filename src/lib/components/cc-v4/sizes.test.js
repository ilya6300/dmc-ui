import { describe, expect, it } from "vitest";
import {
  FONT_SCALE,
  LEGACY_M_TOKENS,
  getFontScale,
  resolveSize,
  scalePx,
} from "./sizes.js";

describe("resolveSize", () => {
  it("defaults to m", () => {
    expect(resolveSize(undefined)).toBe("m");
    expect(resolveSize("invalid")).toBe("m");
  });

  it("accepts xs through xl", () => {
    expect(resolveSize("xs")).toBe("xs");
    expect(resolveSize("xl")).toBe("xl");
  });
});

describe("LEGACY_M_TOKENS", () => {
  it("matches documented control baseline", () => {
    expect(LEGACY_M_TOKENS.controlMinHeight).toBe(40);
    expect(LEGACY_M_TOKENS.controlPaddingY).toBe(8);
    expect(LEGACY_M_TOKENS.controlPaddingX).toBe(12);
    expect(LEGACY_M_TOKENS.controlFontSize).toBe(14);
    expect(LEGACY_M_TOKENS.toggleTrackW).toBe(36);
    expect(LEGACY_M_TOKENS.toggleTrackH).toBe(20);
    expect(LEGACY_M_TOKENS.iconSize).toBe(20);
  });
});

describe("font scale", () => {
  it("m is unity", () => {
    expect(getFontScale("m")).toBe(1);
    expect(scalePx(14, "m")).toBe(14);
  });

  it("uses stepped multipliers", () => {
    expect(FONT_SCALE.xs).toBe(0.85);
    expect(FONT_SCALE.xl).toBe(1.16);
  });
});
