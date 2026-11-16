import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseThemeBlock, extractThemeBlock, parseRootVars } from "./parseStyleCss.js";
import { THEME_OPTIONS, themes } from "./themes.js";

const styleCssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../style.css",
);
const tokensCssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../styles/tokens.css",
);

describe("themes.js from style.css", () => {
  const css =
    readFileSync(tokensCssPath, "utf8") + "\n" + readFileSync(styleCssPath, "utf8");

  for (const { value: themeId } of THEME_OPTIONS) {
    it(`${themeId} palette matches style.css block`, () => {
      const block = extractThemeBlock(css, themeId);
      const fromCss = parseThemeBlock(block, parseRootVars(css));
      const fromThemes = themes[themeId];
      for (const [key, value] of Object.entries(fromCss)) {
        expect(fromThemes[key]).toBe(value);
      }
    });
  }
});
