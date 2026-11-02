/** Парсинг литералов тем и метрик из CSS (единый источник для CSS и JS). */

export const CSS_VAR_TO_SEMANTIC = {
  "--dmc-color-background": "background",
  "--dmc-color-surface": "surface",
  "--dmc-color-text-primary": "textPrimary",
  "--dmc-color-text-secondary": "textSecondary",
  "--dmc-color-border": "border",
  "--dmc-color-primary": "primary",
  "--dmc-color-secondary": "secondary",
  "--dmc-color-success": "success",
  "--dmc-color-warning": "warning",
  "--dmc-color-error": "error",
  "--dmc-color-toggle-track-off": "toggleTrackOff",
  "--dmc-color-knob": "knob",
  "--dmc-color-input-text-primary": "inputTextPrimary",
  "--dmc-color-input-text-muted": "inputTextMuted",
  "--dmc-color-focus-bg": "focusBg",
  "--dmc-card-shadow-color": "cardShadowColor",
  "--mast-blue": "mastBlue",
  "--mast-yellow": "mastYellow",
} as const;

export type SemanticColorKey = (typeof CSS_VAR_TO_SEMANTIC)[keyof typeof CSS_VAR_TO_SEMANTIC];

export const SEMANTIC_TO_CSS_VAR: Record<SemanticColorKey, string> = Object.fromEntries(
  Object.entries(CSS_VAR_TO_SEMANTIC).map(([cssVar, key]) => [key, cssVar]),
) as Record<SemanticColorKey, string>;

/** Legacy / alias keys → CSS var (для ThemeProvider colors override). */
export const COLOR_OVERRIDE_TO_CSS_VAR: Record<string, string> = {
  ...SEMANTIC_TO_CSS_VAR,
  mainBlue1: "--dmc-color-primary",
  textMain: "--dmc-color-text-primary",
  textMuted: "--dmc-color-text-secondary",
  bgCard: "--dmc-color-surface",
  lightGrey: "--dmc-color-border",
  borderInput: "--dmc-color-border",
};

export const SCALE_SIZE_KEYS = ["xs", "s", "m", "l", "xl"] as const;
export type ScaleSizeKey = (typeof SCALE_SIZE_KEYS)[number];

export const ROOT_SCALE_KEYS = ["base", "xs", "s", "m", "l", "xl"] as const;
export type RootScaleKey = (typeof ROOT_SCALE_KEYS)[number];

export type SizeScale = Record<RootScaleKey, string>;

/** Фиксированные токены шкалы (без суффиксов size). */
export const FIXED_SPACE_CSS_VARS = {
  spacing: "--dmc-spacing",
  padding: "--dmc-padding",
  margin: "--dmc-margin",
  radius: "--dmc-border-radius",
  fontSize: "--dmc-font-size",
} as const;

export const CONTROL_CSS_VAR_TO_KEY = {
  "--dmc-font-scale": "fontScale",
  "--dmc-control-min-height": "controlMinHeight",
  "--dmc-control-padding-y": "controlPaddingY",
  "--dmc-control-padding-x": "controlPaddingX",
  "--dmc-control-font-size": "controlFontSize",
  "--dmc-caption-font-size": "captionFontSize",
  "--dmc-chip-padding-y": "chipPaddingY",
  "--dmc-chip-padding-x": "chipPaddingX",
  "--dmc-chip-min-height": "chipMinHeight",
  "--dmc-chip-font-size": "chipFontSize",
  "--dmc-gap": "gap",
  "--dmc-icon-size": "iconSize",
  "--dmc-toggle-track-w": "toggleTrackW",
  "--dmc-toggle-track-h": "toggleTrackH",
  "--dmc-toggle-knob": "toggleKnob",
  "--dmc-toggle-knob-translate": "toggleKnobTranslate",
  "--dmc-keypad-min": "keypadMin",
} as const;

export type ControlMetricKey = (typeof CONTROL_CSS_VAR_TO_KEY)[keyof typeof CONTROL_CSS_VAR_TO_KEY];
export type ControlMetrics = Record<ControlMetricKey, string>;

export const CONTROL_KEY_TO_CSS_VAR: Record<ControlMetricKey, string> = Object.fromEntries(
  Object.entries(CONTROL_CSS_VAR_TO_KEY).map(([cssVar, key]) => [key, cssVar]),
) as Record<ControlMetricKey, string>;

function extractBlockAfterMarker(css: string, marker: string): string {
  const start = css.indexOf(marker);
  if (start === -1) return "";
  const brace = css.indexOf("{", start);
  if (brace === -1) return "";
  let depth = 0;
  for (let i = brace; i < css.length; i++) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(brace + 1, i);
    }
  }
  return "";
}

export function extractThemeBlock(css: string, themeId: string): string {
  return extractBlockAfterMarker(css, `[data-dmc-theme="${themeId}"]`);
}

export function extractRootBlock(css: string): string {
  return extractBlockAfterMarker(css, ":root");
}

export function extractSizeBlock(css: string, sizeId: string): string {
  return extractBlockAfterMarker(css, `[data-dmc-size="${sizeId}"]`);
}

function parseDeclarations(block: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(block)) !== null) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

function resolveVarValue(value: string, vars: Record<string, string>, depth = 0): string {
  if (depth > 8) return value;
  const varMatch = /^var\(\s*(--[\w-]+)\s*\)$/.exec(value);
  if (!varMatch) return value;
  const target = vars[varMatch[1]];
  if (target === undefined) return value;
  return resolveVarValue(target, vars, depth + 1);
}

export function parseThemeBlock(block: string): Record<string, string> {
  const vars = parseDeclarations(block);
  const semantic: Record<string, string> = {};
  for (const [cssVar, jsKey] of Object.entries(CSS_VAR_TO_SEMANTIC)) {
    const raw = vars[cssVar];
    if (raw === undefined) continue;
    semantic[jsKey] = resolveVarValue(raw, vars);
  }
  return semantic;
}

const THEME_BLOCK_RE = /\[data-dmc-theme="([^"]+)"\]\s*\{/g;

export function listThemeIds(css: string): string[] {
  const ids: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = THEME_BLOCK_RE.exec(css)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

export function parseThemesFromCss(css: string): Record<string, Record<string, string>> {
  const themes: Record<string, Record<string, string>> = {};
  for (const themeId of listThemeIds(css)) {
    themes[themeId] = parseThemeBlock(extractThemeBlock(css, themeId));
  }
  return themes;
}

function emptySizeScale(): SizeScale {
  return { base: "", xs: "", s: "", m: "", l: "", xl: "" };
}

function readFixedToken(
  vars: Record<string, string>,
  cssVar: string,
): string {
  const raw = vars[cssVar];
  if (raw === undefined) return "";
  return resolveVarValue(raw, vars);
}

export type RootMetrics = {
  spacing: SizeScale;
  padding: SizeScale;
  margin: SizeScale;
  radius: SizeScale;
  fontSize: SizeScale;
};

/** Дефолт `:root` (size m) + шкала из каждого `[data-dmc-size]`. */
export function parseRootMetrics(styleCss: string, scaleCss: string): RootMetrics {
  const rootVars = parseDeclarations(extractRootBlock(styleCss));
  const spacing = emptySizeScale();
  const padding = emptySizeScale();
  const margin = emptySizeScale();
  const radius = emptySizeScale();
  const fontSize = emptySizeScale();

  const rootSpacing = readFixedToken(rootVars, FIXED_SPACE_CSS_VARS.spacing);
  const rootPadding = readFixedToken(rootVars, FIXED_SPACE_CSS_VARS.padding);
  const rootMargin = readFixedToken(rootVars, FIXED_SPACE_CSS_VARS.margin);
  const rootRadius = readFixedToken(rootVars, FIXED_SPACE_CSS_VARS.radius);
  const rootFontSize = readFixedToken(rootVars, FIXED_SPACE_CSS_VARS.fontSize);

  spacing.base = rootSpacing;
  spacing.m = rootSpacing;
  padding.base = rootPadding;
  padding.m = rootPadding;
  margin.base = rootMargin;
  margin.m = rootMargin;
  radius.base = rootRadius;
  radius.m = rootRadius;
  fontSize.base = rootFontSize;
  fontSize.m = rootFontSize;

  for (const sizeId of SCALE_SIZE_KEYS) {
    const vars = parseDeclarations(extractSizeBlock(scaleCss, sizeId));
    spacing[sizeId] = readFixedToken(vars, FIXED_SPACE_CSS_VARS.spacing) || spacing[sizeId];
    padding[sizeId] = readFixedToken(vars, FIXED_SPACE_CSS_VARS.padding) || padding[sizeId];
    margin[sizeId] = readFixedToken(vars, FIXED_SPACE_CSS_VARS.margin) || margin[sizeId];
    radius[sizeId] = readFixedToken(vars, FIXED_SPACE_CSS_VARS.radius) || radius[sizeId];
    fontSize[sizeId] = readFixedToken(vars, FIXED_SPACE_CSS_VARS.fontSize) || fontSize[sizeId];
  }

  return { spacing, padding, margin, radius, fontSize };
}

export function parseControlMetrics(block: string): Partial<ControlMetrics> {
  const vars = parseDeclarations(block);
  const out: Partial<ControlMetrics> = {};
  for (const [cssVar, jsKey] of Object.entries(CONTROL_CSS_VAR_TO_KEY)) {
    const raw = vars[cssVar];
    if (raw === undefined) continue;
    out[jsKey] = resolveVarValue(raw, vars);
  }
  return out;
}

export function parseScaleSizes(
  css: string,
): Record<ScaleSizeKey, ControlMetrics> {
  const out = {} as Record<ScaleSizeKey, ControlMetrics>;
  for (const sizeId of SCALE_SIZE_KEYS) {
    const partial = parseControlMetrics(extractSizeBlock(css, sizeId));
    out[sizeId] = partial as ControlMetrics;
  }
  return out;
}
