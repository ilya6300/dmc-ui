/** Палитры тем для useTheme().colors — парсятся из style.css (единый источник литералов). */

import styleCss from "virtual:dmc-style-css";
import { parseThemesFromCss } from "./parseStyleCss.js";

const CARD_SHADOW_OFFSET_Y = 4;

const parsedThemes = parseThemesFromCss(styleCss);

/** @param {Record<string, string>} semantic */
function withLegacyAliases(semantic) {
  const borderLight = `1px solid ${semantic.border}`;
  return {
    ...semantic,
    cardShadow: getCardShadow(semantic, 12),
    mainBlue1: semantic.primary,
    textMain: semantic.textPrimary,
    textMuted: semantic.textSecondary,
    bgCard: semantic.surface,
    borderLight,
    lightGrey: parsedThemes.light?.border ?? semantic.border,
    borderInput: semantic.border,
    inputTextPrimary: semantic.inputTextPrimary ?? semantic.textPrimary,
    inputTextMuted: semantic.inputTextMuted ?? semantic.textSecondary,
  };
}

/** @param {Record<string, string>} colors @param {number} [shadow=12] */
export function getCardShadow(colors, shadow = 12) {
  if (shadow === 0) return "none";
  const color = colors.cardShadowColor ?? "rgba(0, 0, 0, 0.25)";
  return `0 ${CARD_SHADOW_OFFSET_Y}px ${shadow}px ${color}`;
}

function buildThemes() {
  const out = {};
  for (const [themeId, semantic] of Object.entries(parsedThemes)) {
    out[themeId] = withLegacyAliases(semantic);
  }
  return out;
}

export const themes = buildThemes();

export const MAST_BLUE = themes.light?.primary ?? "#2196f3";
export const LIGHT_GREY = themes.light?.border ?? "#e2e8f0";

export const THEME_OPTIONS = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "gray", label: "Серая" },
];

/** @param {string} [theme] */
export function getThemeColors(theme) {
  return themes[theme] ?? themes.light;
}
