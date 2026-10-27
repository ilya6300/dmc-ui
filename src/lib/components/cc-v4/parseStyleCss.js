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
};

export function extractThemeBlock(css, themeId) {
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

function parseDeclarations(block) {
  const vars = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

function resolveVarValue(value, vars, depth = 0) {
  if (depth > 8) return value;
  const varMatch = /^var\(\s*(--[\w-]+)\s*\)$/.exec(value);
  if (!varMatch) return value;
  const target = vars[varMatch[1]];
  if (target === undefined) return value;
  return resolveVarValue(target, vars, depth + 1);
}

export function parseThemeBlock(block) {
  const vars = parseDeclarations(block);
  const semantic = {};
  for (const [cssVar, jsKey] of Object.entries(CSS_VAR_TO_SEMANTIC)) {
    const raw = vars[cssVar];
    if (raw === undefined) continue;
    semantic[jsKey] = resolveVarValue(raw, vars);
  }
  return semantic;
}

const THEME_BLOCK_RE = /\[data-dmc-theme="([^"]+)"\]\s*\{/g;

export function listThemeIds(css) {
  const ids = [];
  let match;
  while ((match = THEME_BLOCK_RE.exec(css)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

export function parseThemesFromCss(css) {
  const themes = {};
  for (const themeId of listThemeIds(css)) {
    const block = extractThemeBlock(css, themeId);
    themes[themeId] = parseThemeBlock(block);
  }
  return themes;
}
