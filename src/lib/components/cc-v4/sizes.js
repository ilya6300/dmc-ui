/** Шкала размеров ДС: xs | s | m | l | xl. База `m` = legacy inline-эталон. */

export const SIZE_KEYS = ["xs", "s", "m", "l", "xl"];

/** Эталон `m` — совпадает с прежними литералами в компонентах (регрессия). */
export const LEGACY_M_TOKENS = {
  controlMinHeight: 40,
  controlPaddingY: 8,
  controlPaddingX: 12,
  controlFontSize: 14,
  captionFontSize: 12,
  chipPaddingY: 8,
  chipPaddingX: 14,
  chipMinHeight: 30,
  groupGap: 8,
  toggleTrackW: 36,
  toggleTrackH: 20,
  toggleKnob: 16,
  toggleKnobTranslate: 16,
  iconSize: 20,
};

const FONT_SCALE = {
  xs: 0.85,
  s: 0.92,
  m: 1,
  l: 1.08,
  xl: 1.16,
};

/** @param {string | undefined} size */
export function resolveSize(size) {
  return SIZE_KEYS.includes(size) ? size : "m";
}

export function getFontScale(size) {
  return FONT_SCALE[resolveSize(size)];
}

/** @param {number} basePx @param {string | undefined} size */
export function scalePx(basePx, size) {
  return Math.round(basePx * FONT_SCALE[resolveSize(size)]);
}

export { FONT_SCALE };
