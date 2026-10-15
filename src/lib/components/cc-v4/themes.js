/** Палитры light / dark — единый источник цветов для useTheme().colors */

const CARD_SHADOW_OFFSET_Y = 4;

/** Brand-синий и интерактивный primary — одинаковые в light и dark. */
export const MAST_BLUE = "#2196f3";
/** Основной цвет текста UI в тёмной теме (кроме Input). */
export const DARK_UI_TEXT = "rgb(233, 233, 233)";
/** Светло-серая рамка полей ввода (и связанный UI). */
export const LIGHT_GREY = "#e2e8f0";
const PRIMARY = MAST_BLUE;

const LIGHT_SEMANTIC = {
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

const DARK_SEMANTIC = {
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

/** @param {typeof themes.light} colors @param {number} [shadow=12] blur тени карточки в px; 0 — без тени */
export function getCardShadow(colors, shadow = 12) {
  if (shadow === 0) return "none";
  return `0 ${CARD_SHADOW_OFFSET_Y}px ${shadow}px ${colors.cardShadowColor}`;
}

function withLegacyAliases(semantic) {
  const borderLight = `1px solid ${semantic.border}`;
  const colors = { ...semantic };
  return {
    ...colors,
    cardShadow: getCardShadow(colors, 12),
    mainBlue1: semantic.primary,
    textMain: semantic.textPrimary,
    textMuted: semantic.textSecondary,
    bgCard: semantic.surface,
    borderLight,
    lightGrey: LIGHT_GREY,
    borderInput: semantic.border,
    inputTextPrimary: semantic.inputTextPrimary ?? semantic.textPrimary,
    inputTextMuted: semantic.inputTextMuted ?? semantic.textSecondary,
  };
}

export const themes = {
  light: withLegacyAliases(LIGHT_SEMANTIC),
  dark: withLegacyAliases(DARK_SEMANTIC),
};

/** @param {'light' | 'dark' | string} [theme] */
export function getThemeColors(theme) {
  return themes[theme] ?? themes.light;
}
