import type { CSSProperties } from "react";
import { themes } from "./themes";

/**
 * Снимок светлой палитры (не реагирует на ThemeProvider).
 * Для текущей темы в компонентах: `useTheme().colors`.
 */
export const tokens = themes.light;

export { themes, getThemeColors, MAST_BLUE, LIGHT_GREY } from "./themes";
export type { ThemeColors, ThemeName } from "./themes";

export type StyleArg = CSSProperties | false | null | undefined;

export function mergeStyle(...styles: StyleArg[]): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}
