import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Box, Main, ThemeProvider, ThemeToggle, type ThemeName } from "../index";
import { importBlock, ROOT_NOTE } from "./docsFragments";

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

**Состав:** опционально \`label\`; controlled — \`theme\` и \`onThemeChange\`; \`style\`, \`disabled\`.

\`\`\`jsx
<ThemeProvider>
  <Main style={{ padding: 24 }}>
    <ThemeToggle />
    <Box title="Раздел">Контент</Box>
  </Main>
</ThemeProvider>
\`\`\`

Controlled (состояние темы в приложении):

\`\`\`jsx
const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeToggle theme={theme} onThemeChange={setTheme} label="Тёмная тема" />
</ThemeProvider>
\`\`\`
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
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithPreview: Story = {
  name: "С Box",
  parameters: {
    docs: {
      source: {
        code: `<Main style={{ padding: 24 }}>
  <ThemeToggle />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>`,
      },
    },
  },
  render: () => (
    <Main style={{ padding: 24 }}>
      <ThemeToggle />
      <Box title="Карточка" style={{ marginTop: 16 }}>
        Контент меняет оформление при смене темы в toolbar или переключателе.
      </Box>
    </Main>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  parameters: {
    docs: { source: { code: "<ThemeToggle />" } },
  },
  render: () => <ThemeToggle label="" />,
};

function ControlledDemo() {
  const [theme, setTheme] = useState<ThemeName>("light");
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <Main style={{ padding: 24 }}>
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
        <p style={{ marginTop: 12 }}>Тема: {theme}</p>
      </Main>
    </ThemeProvider>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeToggle theme={theme} onThemeChange={setTheme} />
</ThemeProvider>`,
      },
    },
  },
  render: () => <ControlledDemo />,
};
