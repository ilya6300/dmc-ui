import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { styleCssPlugin } from "./styleCssPlugin";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), styleCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
      "#": path.resolve(rootDir, "."),
    },
  },
  build: {
    lib: {
      entry: path.resolve(rootDir, "src/index.ts"),
      name: "DmcUi",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
