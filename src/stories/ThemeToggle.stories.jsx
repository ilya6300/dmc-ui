import React, { useState } from "react";
import { Box, Main, ThemeProvider, ThemeToggle } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Переключатель \`Toggle\` с иконками луны (слева в треке) и солнца (справа); \`currentColor\` на треке.
Uncontrolled — \`ThemeProvider\`; controlled: \`theme\` и \`onThemeChange\`.

Вложенный \`ThemeProvider\` перекрывает внешний.

${ROOT_NOTE}

${importBlock("ThemeProvider", "ThemeToggle", "Main", "Box")}
        `,
      },
    },
  },
  argTypes: {
    label: {
      description:
        "Опциональная подпись; без неё доступное имя задаётся автоматически.",
    },
    disabled: { control: "boolean" },
    theme: { control: false },
    onThemeChange: { control: false },
  },
};

export default meta;

export const WithPreview = {
  name: "С Box",
  render: () => (
    <Main style={{ padding: 24 }}>
      <ThemeToggle />
      <Box title="Карточка" style={{ marginTop: 16 }}>
        Контент меняет оформление при смене темы в toolbar или переключателе.
      </Box>
    </Main>
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => <ThemeToggle label="" />,
};

function ControlledDemo() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <Main style={{ padding: 24 }}>
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
        <p style={{ marginTop: 12 }}>Тема: {theme}</p>
      </Main>
    </ThemeProvider>
  );
}

export const Controlled = {
  render: () => <ControlledDemo />,
};
