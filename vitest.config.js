import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

import viteConfig from "./vite.config.js";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      projects: [
        {
          extends: true,
          plugins: [react()],
          test: {
            name: "unit",
            environment: "jsdom",
            include: ["src/**/*.test.{js,jsx}"],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({ configDir: path.join(dirname, ".storybook") }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  }),
);
