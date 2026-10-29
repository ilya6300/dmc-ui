/** Шкала размеров: xs | s | m | l | xl. База `m` = прежний визуальный эталон. */

export const SIZE_KEYS = ["xs", "s", "m", "l", "xl"] as const;

export type SizeName = (typeof SIZE_KEYS)[number];

/** Эталон `m` — совпадает с прежними литералами в компонентах. */
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

export const FONT_SCALE: Record<SizeName, number> = {
  xs: 0.85,
  s: 0.92,
  m: 1,
  l: 1.08,
  xl: 1.16,
};

export function resolveSize(size?: string): SizeName {
  return (SIZE_KEYS as readonly string[]).includes(size ?? "") ? (size as SizeName) : "m";
}

export function getFontScale(size?: string): number {
  return FONT_SCALE[resolveSize(size)];
}

export function scalePx(basePx: number, size?: string): number {
  return Math.round(basePx * FONT_SCALE[resolveSize(size)]);
}
