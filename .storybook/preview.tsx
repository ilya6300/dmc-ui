import { useEffect, useState, type ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "../src/shared/ui/theme-context";
import { getThemeColors, type ThemeName } from "../src/shared/ui/themes";
import "../src/styles/dmc-ui.css";

type StoryThemeShellProps = {
  theme?: ThemeName;
  children?: ReactNode;
};

function StoryThemeShell({ theme: globalTheme, children }: StoryThemeShellProps) {
  const [theme, setTheme] = useState<ThemeName>(globalTheme ?? "light");
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

const preview: Preview = {
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
      <StoryThemeShell theme={context.globals.theme as ThemeName | undefined}>
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
