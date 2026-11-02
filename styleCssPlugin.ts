import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const VIRTUAL_STYLE_CSS = "virtual:dmc-style-css";
const VIRTUAL_SCALE_CSS = "virtual:dmc-scale-css";
const RESOLVED_STYLE = `\0${VIRTUAL_STYLE_CSS}`;
const RESOLVED_SCALE = `\0${VIRTUAL_SCALE_CSS}`;

/** Отдаёт текст style.css / scale.css как модули для палитр и метрик JS. */
export function styleCssPlugin(): Plugin {
  const styleCssPath = path.resolve(rootDir, "style.css");
  const scaleCssPath = path.resolve(rootDir, "src/styles/ds/scale.css");
  return {
    name: "dmc-style-css",
    resolveId(source) {
      if (source === VIRTUAL_STYLE_CSS) {
        return RESOLVED_STYLE;
      }
      if (source === VIRTUAL_SCALE_CSS) {
        return RESOLVED_SCALE;
      }
    },
    load(id) {
      if (id === RESOLVED_STYLE) {
        const css = readFileSync(styleCssPath, "utf8");
        return `export default ${JSON.stringify(css)}`;
      }
      if (id === RESOLVED_SCALE) {
        const css = readFileSync(scaleCssPath, "utf8");
        return `export default ${JSON.stringify(css)}`;
      }
    },
  };
}
