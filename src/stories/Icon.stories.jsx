import React from "react";
import { Icon, Main, ThemeToggle } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

function SunIcon({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M14 3a7 7 0 1 0 0 14 9 9 0 0 1 0-14z" fill="currentColor" />
    </svg>
  );
}

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Icon",
  component: Icon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Main style={{ padding: 24 }}>
        <ThemeToggle />
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

${importBlock("Icon", "ThemeProvider", "ThemeToggle")}
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
  },
};

export default meta;

export const ImagePair = {
  name: "Img с darkSrc",
  render: () => (
    <Icon
      src="https://placehold.co/32x32/2196f3/ffffff?text=L"
      darkSrc="https://placehold.co/32x32/2196f3/121212?text=D"
      alt="Демо"
      width={32}
      height={32}
    />
  ),
};

export const ImageFallback = {
  name: "Img без darkSrc",
  render: () => (
    <Icon
      src="https://placehold.co/32x32/2196f3/ffffff?text=1"
      alt="Одна картинка"
      width={32}
      height={32}
    />
  ),
};

export const ComponentPair = {
  name: "React-компоненты",
  render: () => (
    <Icon
      component={SunIcon}
      darkComponent={MoonIcon}
      style={{ color: "#2196f3" }}
    />
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => (
    <Icon
      src="https://placehold.co/24x24/000000/ffffff?text=i"
      alt=""
      width={24}
      height={24}
    />
  ),
};
