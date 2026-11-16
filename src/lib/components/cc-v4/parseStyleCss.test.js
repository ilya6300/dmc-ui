import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  extractThemeBlock,
  listThemeIds,
  parseRootVars,
  parseThemeBlock,
  parseThemesFromCss,
} from "./parseStyleCss.js";

const styleCssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../style.css",
);
const tokensCssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../styles/tokens.css",
);

describe("parseStyleCss", () => {
  const css =
    readFileSync(tokensCssPath, "utf8") + "\n" + readFileSync(styleCssPath, "utf8");

  it("lists light, dark, gray", () => {
    expect(listThemeIds(css)).toEqual(["light", "dark", "gray"]);
  });

  it("parses gray background from style.css", () => {
    const rootVars = parseRootVars(css);
    const gray = parseThemeBlock(extractThemeBlock(css, "gray"), rootVars);
    expect(gray.background).toBe("#3c3c3d");
  });

  it("resolves var() from tokens.css :root", () => {
    const rootVars = parseRootVars(css);
    const light = parseThemeBlock(extractThemeBlock(css, "light"), rootVars);
    expect(light.primary).toBe("#2196f3");
    expect(light.error).toBe("#df2727");
    expect(light.mastBlue).toBe("#236192");
  });

  it("parseThemesFromCss returns all themes", () => {
    const all = parseThemesFromCss(css);
    expect(Object.keys(all).sort()).toEqual(["dark", "gray", "light"]);
  });
});
