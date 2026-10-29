import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { extractThemeBlock, parseThemeBlock } from "./parseStyleCss";
import { THEME_OPTIONS, themes } from "./themes";

const styleCssPath = join(dirname(fileURLToPath(import.meta.url)), "../../../style.css");

describe("themes from style.css", () => {
  const css = readFileSync(styleCssPath, "utf8");

  for (const { value: themeId } of THEME_OPTIONS) {
    it(`${themeId} palette matches style.css block`, () => {
      const fromCss = parseThemeBlock(extractThemeBlock(css, themeId));
      const fromThemes = themes[themeId];
      for (const [key, value] of Object.entries(fromCss)) {
        expect(fromThemes[key as keyof typeof fromThemes]).toBe(value);
      }
    });
  }
});
