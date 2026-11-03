import { useEffect, useState, type ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import { ThemeProvider, useTheme } from "../src/shared/ui/theme-context";
import type { ThemeChoice } from "../src/shared/ui/theme-context/themes";
import "../src/styles/dmc-ui.css";

type StoryThemeShellProps = {
  theme?: ThemeChoice;
  children?: ReactNode;
};

function StoryCanvas({ children }: { children?: ReactNode }) {
  const { colors } = useTheme();
  return (
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
  );
}

function StoryThemeShell({ theme: globalTheme, children }: StoryThemeShellProps) {
  const [theme, setTheme] = useState<ThemeChoice>(globalTheme ?? "light");
  useEffect(() => {
    setTheme(globalTheme ?? "light");
  }, [globalTheme]);
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <StoryCanvas>{children}</StoryCanvas>
    </ThemeProvider>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Светлая / тёмная / серая / системная тема",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "system", title: "System" },
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
      <StoryThemeShell theme={context.globals.theme as ThemeChoice | undefined}>
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
