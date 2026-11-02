import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  extractRootBlock,
  extractThemeBlock,
  listThemeIds,
  parseRootMetrics,
  parseScaleSizes,
  parseThemeBlock,
  parseThemesFromCss,
} from "./parseStyleCss";

const dir = dirname(fileURLToPath(import.meta.url));
const styleCssPath = join(dir, "../../../style.css");
const scaleCssPath = join(dir, "../../styles/ds/scale.css");

describe("parseStyleCss", () => {
  const css = readFileSync(styleCssPath, "utf8");
  const scaleCss = readFileSync(scaleCssPath, "utf8");

  it("lists light, dark, gray", () => {
    expect(listThemeIds(css)).toEqual(["light", "dark", "gray"]);
  });

  it("parses gray background from style.css", () => {
    const gray = parseThemeBlock(extractThemeBlock(css, "gray"));
    expect(gray.background).toBe("#3c3c3d");
  });

  it("resolves var() for primary-backed aliases in block", () => {
    const light = parseThemeBlock(extractThemeBlock(css, "light"));
    expect(light.primary).toBe("#2196f3");
    expect(light.secondary).toBe("#236192");
    expect(light.success).toBe("#24bd2c");
    expect(light.warning).toBe("#f0b323");
  });

  it("parseThemesFromCss returns all themes", () => {
    const all = parseThemesFromCss(css);
    expect(Object.keys(all).sort()).toEqual(["dark", "gray", "light"]);
  });

  it("parses fixed :root spacing and size ladder from scale.css", () => {
    expect(extractRootBlock(css)).toContain("--dmc-spacing:");
    expect(extractRootBlock(css)).not.toContain("--dmc-spacing-m");
    const root = parseRootMetrics(css, scaleCss);
    expect(root.spacing.m).toBe("16px");
    expect(root.spacing.xs).toBe("8px");
    expect(root.spacing.xl).toBe("32px");
    expect(root.padding.m).toBe("16px");
    expect(root.margin.s).toBe("12px");
    expect(root.radius.m).toBe("8px");
    expect(root.fontSize.l).toBe("18px");
  });

  it("parses scale.css control metrics for m", () => {
    const sizes = parseScaleSizes(scaleCss);
    expect(sizes.m.controlMinHeight).toBe("40px");
    expect(sizes.m.controlFontSize).toBe("14px");
    expect(sizes.m.gap).toBe("8px");
    expect(sizes.xs.controlMinHeight).toBe("34px");
  });
});
