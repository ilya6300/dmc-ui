import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../src/lib/components/cc-v4/ThemeContext.jsx";
import { getThemeColors } from "../src/lib/components/cc-v4/themes.js";

function StoryThemeShell({ theme: globalTheme, children }) {
  const [theme, setTheme] = useState(globalTheme ?? "light");
  useEffect(() => {
    setTheme(globalTheme ?? "light");
  }, [globalTheme]);
  const colors = getThemeColors(theme);
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <div
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          background: colors.background,
          color: colors.textPrimary,
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Светлая / тёмная тема",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <StoryThemeShell theme={context.globals.theme}>
        <Story />
      </StoryThemeShell>
    ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ["Design System", ["Введение", "Box", "*"]],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
