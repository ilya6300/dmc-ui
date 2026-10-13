import { getThemeColors, themes } from "./themes.js";

/**
 * Снимок светлой палитры (не реагирует на ThemeProvider).
 * Для текущей темы в компонентах: `useTheme().colors`.
 */
export const tokens = themes.light;

export { themes, getThemeColors, MAST_BLUE } from "./themes.js";

export function mergeStyle(...styles) {
  return Object.assign({}, ...styles.filter(Boolean));
}
