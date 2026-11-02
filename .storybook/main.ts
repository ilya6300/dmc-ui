import type { StorybookConfig } from "@storybook/react-vite";
import { styleCssPlugin } from "../styleCssPlugin.ts";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), styleCssPlugin()];
    return config;
  },
};

export default config;
