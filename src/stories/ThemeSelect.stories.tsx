import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Box, Main, ThemeProvider, ThemeSelect, type ThemeName } from "../index";
import { importBlock, ROOT_NOTE } from "./docsFragments";

const meta = {
  title: "Design System/ThemeSelect",
  component: ThemeSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Выбор темы: светлая, тёмная и серая. Uncontrolled — через \`ThemeProvider\`; controlled: \`theme\` и \`onThemeChange\`.

${ROOT_NOTE}

${importBlock("ThemeProvider", "ThemeSelect", "Main", "Box")}

**Состав:** опционально \`label\` (по умолчанию «Тема»); controlled — \`theme\` и \`onThemeChange\`; \`options\`, \`style\`, \`disabled\`, \`id\`.

\`\`\`jsx
<ThemeProvider>
  <Main style={{ padding: 24 }}>
    <ThemeSelect />
    <Box title="Раздел">Контент</Box>
  </Main>
</ThemeProvider>
\`\`\`

Controlled (состояние темы в приложении):

\`\`\`jsx
const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeSelect theme={theme} onThemeChange={setTheme} />
</ThemeProvider>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      description: "Подпись над списком. Пустая строка скрывает её; доступное имя остаётся.",
    },
    disabled: { control: "boolean" },
    theme: { control: false },
    onThemeChange: { control: false },
    options: { control: false },
  },
} satisfies Meta<typeof ThemeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithPreview: Story = {
  name: "С Box",
  parameters: {
    docs: {
      source: {
        code: `<Main style={{ padding: 24 }}>
  <ThemeSelect />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>`,
      },
    },
  },
  render: () => (
    <Main style={{ padding: 24 }}>
      <ThemeSelect />
      <Box title="Карточка" style={{ marginTop: 16 }}>
        Контент меняет оформление при смене темы в toolbar или списке.
      </Box>
    </Main>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  parameters: {
    docs: { source: { code: "<ThemeSelect />" } },
  },
  render: () => <ThemeSelect label="" />,
};

function ControlledDemo() {
  const [theme, setTheme] = useState<ThemeName>("light");
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <Main style={{ padding: 24 }}>
        <ThemeSelect theme={theme} onThemeChange={setTheme} />
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
  <ThemeSelect theme={theme} onThemeChange={setTheme} />
</ThemeProvider>`,
      },
    },
  },
  render: () => <ControlledDemo />,
};
