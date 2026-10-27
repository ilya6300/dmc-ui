import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const styleCssPath = resolve(__dirname, "style.css");
const VIRTUAL_STYLE_CSS = "virtual:dmc-style-css";

function styleCssPlugin() {
  return {
    name: "dmc-style-css",
    resolveId(source) {
      if (source === VIRTUAL_STYLE_CSS) {
        return "\0" + VIRTUAL_STYLE_CSS;
      }
    },
    load(id) {
      if (id === "\0" + VIRTUAL_STYLE_CSS) {
        const css = readFileSync(styleCssPath, "utf8");
        return `export default ${JSON.stringify(css)}`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), styleCssPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "DmcUi",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
