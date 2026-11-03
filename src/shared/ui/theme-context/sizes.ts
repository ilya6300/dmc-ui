/** Шкала размеров: xs | s | m | l | xl. База `m` = прежний визуальный эталон. */

import { controlSizes } from "./metrics";
import type { ScaleSizeKey } from "./parseStyleCss";

export const SIZE_KEYS = ["xs", "s", "m", "l", "xl"] as const;

export type SizeName = (typeof SIZE_KEYS)[number];

function px(value: string | undefined): number {
  if (value == null) return 0;
  const next = Number.parseFloat(value);
  return Number.isFinite(next) ? next : 0;
}

const m = controlSizes.m;

/** Эталон `m` — из scale.css (через parse). */
export const LEGACY_M_TOKENS = {
  controlMinHeight: px(m.controlMinHeight),
  controlPaddingY: px(m.controlPaddingY),
  controlPaddingX: px(m.controlPaddingX),
  controlFontSize: px(m.controlFontSize),
  captionFontSize: px(m.captionFontSize),
  chipPaddingY: px(m.chipPaddingY),
  chipPaddingX: px(m.chipPaddingX),
  chipMinHeight: px(m.chipMinHeight),
  groupGap: px(m.gap),
  toggleTrackW: px(m.toggleTrackW),
  toggleTrackH: px(m.toggleTrackH),
  toggleKnob: px(m.toggleKnob),
  toggleKnobTranslate: px(m.toggleKnobTranslate),
  iconSize: px(m.iconSize),
};

export const FONT_SCALE: Record<SizeName, number> = SIZE_KEYS.reduce(
  (acc, key: ScaleSizeKey) => {
    acc[key] = Number.parseFloat(controlSizes[key]?.fontScale ?? "1") || 1;
    return acc;
  },
  {} as Record<SizeName, number>,
);

export function resolveSize(size?: string): SizeName {
  return (SIZE_KEYS as readonly string[]).includes(size ?? "") ? (size as SizeName) : "m";
}

export function getFontScale(size?: string): number {
  return FONT_SCALE[resolveSize(size)];
}

export function scalePx(basePx: number, size?: string): number {
  return Math.round(basePx * FONT_SCALE[resolveSize(size)]);
}
