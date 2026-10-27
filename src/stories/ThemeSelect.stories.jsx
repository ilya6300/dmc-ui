import React, { useState } from "react";
import { Box, Main, ThemeProvider, ThemeSelect } from "../index.js";
import {
  componentDoc,
  importBlock,
  ROOT_NOTE,
  STYLE_CSS_NOTE,
} from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/ThemeSelect",
  component: ThemeSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDoc(
          "Выпадающий список тем: светлая, тёмная, серая. Uncontrolled — через `ThemeProvider`; controlled: `theme` и `onThemeChange`.",
          "Цвета компонентов ДС с классами `dmc-*` задаются в `style.css` пакета (переменные `--dmc-color-*` на `data-dmc-theme`).",
          STYLE_CSS_NOTE,
          ROOT_NOTE,
          importBlock("ThemeProvider", "ThemeSelect", "Main", "Box"),
          "**Состав:** опционально `label`, `options`; controlled — `theme` и `onThemeChange`; `style`, `disabled`.",
          "```jsx\n<ThemeProvider>\n  <Main style={{ padding: 24 }}>\n    <ThemeSelect />\n    <Box title=\"Раздел\">Контент</Box>\n  </Main>\n</ThemeProvider>\n```",
          "```jsx\nconst [theme, setTheme] = useState(\"light\");\n\n<ThemeProvider theme={theme} onThemeChange={setTheme}>\n  <ThemeSelect theme={theme} onThemeChange={setTheme} />\n</ThemeProvider>\n```",
        ),
      },
    },
  },
  argTypes: {
    label: { description: "Подпись над select; пустая строка — без подписи." },
    disabled: { control: "boolean" },
    theme: { control: false },
    onThemeChange: { control: false },
  },
};

export default meta;

export const WithPreview = {
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
        Контент меняет оформление при смене темы в toolbar или в списке.
      </Box>
    </Main>
  ),
};

export const Minimal = {
  name: "Минимальный",
  parameters: {
    docs: { source: { code: '<ThemeSelect label="" />' } },
  },
  render: () => <ThemeSelect label="" />,
};

function ControlledDemo() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <Main style={{ padding: 24 }}>
        <ThemeSelect theme={theme} onThemeChange={setTheme} />
        <p style={{ marginTop: 12 }}>Тема: {theme}</p>
      </Main>
    </ThemeProvider>
  );
}

export const Controlled = {
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
