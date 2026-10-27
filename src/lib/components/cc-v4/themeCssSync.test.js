import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseThemeBlock, extractThemeBlock } from "./parseStyleCss.js";
import { THEME_OPTIONS, themes } from "./themes.js";

const styleCssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../style.css",
);

describe("themes.js from style.css", () => {
  const css = readFileSync(styleCssPath, "utf8");

  for (const { value: themeId } of THEME_OPTIONS) {
    it(`${themeId} palette matches style.css block`, () => {
      const block = extractThemeBlock(css, themeId);
      const fromCss = parseThemeBlock(block);
      const fromThemes = themes[themeId];
      for (const [key, value] of Object.entries(fromCss)) {
        expect(fromThemes[key]).toBe(value);
      }
    });
  }
});
