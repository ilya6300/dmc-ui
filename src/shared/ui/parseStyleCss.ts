/** Парсинг литералов тем из style.css (единый источник для CSS и JS). */

const CSS_VAR_TO_SEMANTIC = {
  "--dmc-color-background": "background",
  "--dmc-color-surface": "surface",
  "--dmc-color-text-primary": "textPrimary",
  "--dmc-color-text-secondary": "textSecondary",
  "--dmc-color-border": "border",
  "--dmc-color-primary": "primary",
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

export function extractThemeBlock(css: string, themeId: string): string {
  const marker = `[data-dmc-theme="${themeId}"]`;
  const start = css.indexOf(marker);
  if (start === -1) return "";
  const brace = css.indexOf("{", start);
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
