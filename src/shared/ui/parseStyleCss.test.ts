import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  extractThemeBlock,
  listThemeIds,
  parseThemeBlock,
  parseThemesFromCss,
} from "./parseStyleCss";

const styleCssPath = join(dirname(fileURLToPath(import.meta.url)), "../../../style.css");

describe("parseStyleCss", () => {
  const css = readFileSync(styleCssPath, "utf8");

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
  });

  it("parseThemesFromCss returns all themes", () => {
    const all = parseThemesFromCss(css);
    expect(Object.keys(all).sort()).toEqual(["dark", "gray", "light"]);
  });
});
