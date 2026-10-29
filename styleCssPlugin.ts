import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const VIRTUAL_STYLE_CSS = "virtual:dmc-style-css";
const RESOLVED_ID = `\0${VIRTUAL_STYLE_CSS}`;

/** Отдаёт текст корневого style.css как модуль для палитр JS. */
export function styleCssPlugin(): Plugin {
  const styleCssPath = path.resolve(rootDir, "style.css");
  return {
    name: "dmc-style-css",
    resolveId(source) {
      if (source === VIRTUAL_STYLE_CSS) {
        return RESOLVED_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_ID) {
        const css = readFileSync(styleCssPath, "utf8");
        return `export default ${JSON.stringify(css)}`;
      }
    },
  };
}
