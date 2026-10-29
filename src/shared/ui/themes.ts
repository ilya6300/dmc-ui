/** Палитры тем для useTheme().colors — парсятся из style.css. */

import styleCss from "virtual:dmc-style-css";
import { parseThemesFromCss } from "./parseStyleCss";

const CARD_SHADOW_OFFSET_Y = 4;

export type ThemeName = "light" | "dark" | "gray";

type SemanticColors = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  inputTextPrimary?: string;
  inputTextMuted?: string;
  border: string;
  primary: string;
  error: string;
  mastBlue: string;
  mastYellow: string;
  cardShadowColor: string;
  focusBg: string;
  toggleTrackOff: string;
  knob: string;
};

export type ThemeColors = Omit<SemanticColors, "inputTextPrimary" | "inputTextMuted"> & {
  cardShadow: string;
  mainBlue1: string;
  textMain: string;
  textMuted: string;
  bgCard: string;
  borderLight: string;
  lightGrey: string;
  borderInput: string;
  inputTextPrimary: string;
  inputTextMuted: string;
};

const parsedThemes = parseThemesFromCss(styleCss) as Record<ThemeName, SemanticColors>;

/** `shadow` — blur тени карточки в px; 0 — без тени. */
export function getCardShadow(
  colors: Pick<ThemeColors, "cardShadowColor">,
  shadow = 12,
): string {
  if (shadow === 0) return "none";
  const color = colors.cardShadowColor ?? "rgba(0, 0, 0, 0.25)";
  return `0 ${CARD_SHADOW_OFFSET_Y}px ${shadow}px ${color}`;
}

function withLegacyAliases(semantic: SemanticColors): ThemeColors {
  return {
    ...semantic,
    cardShadow: getCardShadow(semantic, 12),
    mainBlue1: semantic.primary,
    textMain: semantic.textPrimary,
    textMuted: semantic.textSecondary,
    bgCard: semantic.surface,
    borderLight: `1px solid ${semantic.border}`,
    lightGrey: parsedThemes.light?.border ?? semantic.border,
    borderInput: semantic.border,
    inputTextPrimary: semantic.inputTextPrimary ?? semantic.textPrimary,
    inputTextMuted: semantic.inputTextMuted ?? semantic.textSecondary,
  };
}

function buildThemes(): Record<ThemeName, ThemeColors> {
  const out = {} as Record<ThemeName, ThemeColors>;
  for (const themeId of Object.keys(parsedThemes) as ThemeName[]) {
    out[themeId] = withLegacyAliases(parsedThemes[themeId]);
  }
  return out;
}

export const themes = buildThemes();

export const MAST_BLUE = themes.light?.primary ?? "#2196f3";
export const LIGHT_GREY = themes.light?.border ?? "#e2e8f0";

export const THEME_OPTIONS: { value: ThemeName; label: string }[] = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "gray", label: "Серая" },
];

export function getThemeColors(theme?: string): ThemeColors {
  if (theme && Object.hasOwn(themes, theme)) {
    return themes[theme as ThemeName];
  }
  return themes.light;
}
