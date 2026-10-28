/** Палитры light / dark — единый источник цветов для useTheme().colors */

const CARD_SHADOW_OFFSET_Y = 4;

/** Brand-синий и интерактивный primary — одинаковые в light и dark. */
export const MAST_BLUE = "#2196f3";
/** Основной цвет текста UI в тёмной теме (кроме Input). */
export const DARK_UI_TEXT = "rgb(233, 233, 233)";
/** Светло-серая рамка полей ввода (и связанный UI). */
export const LIGHT_GREY = "#e2e8f0";
const PRIMARY = MAST_BLUE;

export type ThemeName = "light" | "dark";

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

const LIGHT_SEMANTIC: SemanticColors = {
  background: "#ffffff",
  surface: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  border: LIGHT_GREY,
  primary: PRIMARY,
  error: "#df2727",
  mastBlue: MAST_BLUE,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.25)",
  focusBg: "#f0f7ff",
  toggleTrackOff: "#cbd5e1",
  knob: "#ffffff",
};

const DARK_SEMANTIC: SemanticColors = {
  background: "#121212",
  surface: "#1e1e1e",
  textPrimary: DARK_UI_TEXT,
  textSecondary: DARK_UI_TEXT,
  inputTextPrimary: "#ffffff",
  inputTextMuted: "#b3b3b3",
  border: "#383838",
  primary: PRIMARY,
  error: "#f87171",
  mastBlue: MAST_BLUE,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.45)",
  focusBg: "#1e3a5f",
  toggleTrackOff: "#475569",
  knob: "#ffffff",
};

/** `shadow` — blur тени карточки в px; 0 — без тени. */
export function getCardShadow(
  colors: Pick<ThemeColors, "cardShadowColor">,
  shadow = 12,
): string {
  if (shadow === 0) return "none";
  return `0 ${CARD_SHADOW_OFFSET_Y}px ${shadow}px ${colors.cardShadowColor}`;
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
    lightGrey: LIGHT_GREY,
    borderInput: semantic.border,
    inputTextPrimary: semantic.inputTextPrimary ?? semantic.textPrimary,
    inputTextMuted: semantic.inputTextMuted ?? semantic.textSecondary,
  };
}

export const themes: Record<ThemeName, ThemeColors> = {
  light: withLegacyAliases(LIGHT_SEMANTIC),
  dark: withLegacyAliases(DARK_SEMANTIC),
};

export function getThemeColors(theme?: string): ThemeColors {
  return themes[theme as ThemeName] ?? themes.light;
}
