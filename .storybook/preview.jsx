import React, { useEffect, useState } from "react";
import "../src/styles/dmc-ui.css";
import { ThemeProvider } from "../src/lib/components/cc-v4/ThemeContext.jsx";
function StoryThemeShell({ theme: globalTheme, children }) {
  const [theme, setTheme] = useState(globalTheme ?? "light");
  useEffect(() => {
    setTheme(globalTheme ?? "light");
  }, [globalTheme]);
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <div
        className="dmc-story-canvas"
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "var(--dmc-color-background)",
          color: "var(--dmc-color-text-primary)",
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
      description: "Светлая / тёмная / серая тема",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "gray", title: "Gray" },
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
