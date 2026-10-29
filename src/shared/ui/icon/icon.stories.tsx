import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Icon, Main, ThemeSelect } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

type DemoIconProps = { style?: CSSProperties };

function SunIcon({ style }: DemoIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ style }: DemoIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M14 3a7 7 0 1 0 0 14 9 9 0 0 1 0-14z" fill="currentColor" />
    </svg>
  );
}

const meta = {
  title: "Design System/Icon",
  component: Icon,
  tags: ["autodocs"],
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
      options: ["xs", "s", "m", "l", "xl"],
      control: "select",
      description: "Шкала размера, если не заданы width и height. По умолчанию m.",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImagePair: Story = {
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

export const ImageFallback: Story = {
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

export const ComponentPair: Story = {
  name: "React-компоненты",
  render: () => (
    <Icon
      component={SunIcon}
      darkComponent={MoonIcon}
      style={{ color: "#2196f3" }}
    />
  ),
};

export const Minimal: Story = {
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
