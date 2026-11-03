import type { CSSProperties } from "react";
import { COLOR_OVERRIDE_TO_CSS_VAR } from "./parseStyleCss";
import type { ThemeColors } from "./themes";

/** Inline CSS-переменные цветов на корне ThemeProvider (метрики не переопределяются). */
export function buildRootCssVars(colors?: Partial<ThemeColors>): CSSProperties {
  const style: Record<string, string> = {};

  if (colors) {
    for (const [key, value] of Object.entries(colors)) {
      if (value == null || value === "") continue;
      const cssVar = COLOR_OVERRIDE_TO_CSS_VAR[key];
      if (!cssVar) continue;
      style[cssVar] = String(value);
    }
  }

  return style as CSSProperties;
}
