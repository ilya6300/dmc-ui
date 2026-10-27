import React from "react";
import { Icon, Main, SIZE_KEYS, ThemeSelect } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

function SunIcon({ style }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ style }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M14 3a7 7 0 1 0 0 14 9 9 0 0 1 0-14z" fill="currentColor" />
    </svg>
  );
}

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Icon",
  component: Icon,
  tags: ["autodocs"],
  render: (args) => <Icon {...args} />,
  args: { size: "m" },
  decorators: [
    (Story) => (
      <Main style={{ padding: 24 }}>
        <ThemeSelect />
        <div style={{ marginTop: 16 }}>
          <Story />
        </div>
      </Main>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Иконка с поддержкой тёмной темы: \`src\` / \`darkSrc\` для img или \`component\` / \`darkComponent\` для SVG как React-компонентов.

${ROOT_NOTE}

${importBlock("Icon", "ThemeProvider", "ThemeSelect")}
        `,
      },
    },
  },
  argTypes: {
    src: { description: "URL изображения (светлая тема)." },
    darkSrc: { description: "URL для тёмной темы; если нет — используется src." },
    alt: { description: "Обязателен для ветки img." },
    component: { control: false },
    darkComponent: { control: false },
    size: {
      options: SIZE_KEYS,
      control: "select",
      description: "Размер по шкале, если не заданы width/height.",
    },
  },
};

export default meta;

export const ImagePair = {
  name: "Img с darkSrc",
  args: {
    src: "https://placehold.co/32x32/2196f3/ffffff?text=L",
    darkSrc: "https://placehold.co/32x32/2196f3/121212?text=D",
    alt: "Демо",
    width: 32,
    height: 32,
  },
};

export const ImageFallback = {
  name: "Img без darkSrc",
  args: {
    src: "https://placehold.co/32x32/2196f3/ffffff?text=1",
    alt: "Одна картинка",
    width: 32,
    height: 32,
  },
};

export const ComponentPair = {
  name: "React-компоненты",
  args: {
    size: "m",
    style: { color: "#2196f3" },
  },
  render: (args) => (
    <Icon
      {...args}
      component={SunIcon}
      darkComponent={MoonIcon}
      width={undefined}
      height={undefined}
    />
  ),
};

export const Minimal = {
  name: "Минимальный",
  args: {
    size: "m",
    src: "https://placehold.co/48x48/2196f3/ffffff?text=i",
    alt: "Демо",
  },
};

export const SizeScale = {
  name: "Размеры",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {SIZE_KEYS.map((size) => (
        <Icon
          key={size}
          size={size}
          component={SunIcon}
          style={{ color: "#2196f3" }}
        />
      ))}
    </div>
  ),
};
