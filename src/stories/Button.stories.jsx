import React from "react";
import { fn } from "storybook/test";
import { Button, Main, SIZE_KEYS } from "../index.js";
import { componentDoc, importBlock, ROOT_NOTE } from "./docsFragments.js";

const logClick = fn();

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  render: (args) => <Button {...args} />,
  args: { children: "Сгенерировать", variant: "primary", onClick: logClick },
  decorators: [
    (Story) => (
      <Main style={{ padding: 24 }}>
        <Story />
      </Main>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: componentDoc(
          "Кнопка действия. Варианты: `primary`, `error`, `outline`, `green`.",
          'Опционально `size` (`xs` … `xl`, по умолчанию `m`) — шкала как у Input и Toggle.',
          ROOT_NOTE,
          importBlock("Button", "Main"),
          "```jsx\n<Button variant=\"primary\" onClick={() => {}}>Сгенерировать</Button>\n```",
          "**Состав:** обязательно `children`; опционально `variant`, `size`, `type` (`button` по умолчанию), `disabled`, **`onClick`** (событие в Actions), `style`.",
        ),
      },
    },
  },
  argTypes: {
    children: { control: "text", description: "Подпись кнопки." },
    variant: {
      options: ["primary", "error", "outline", "green"],
      control: "radio",
      description: "Визуальный вариант.",
    },
    size: { options: SIZE_KEYS, control: "select", description: "Размер по шкале ДС." },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
    onClick: { action: "clicked", description: "Обработчик клика (панель Actions)." },
    style: { control: false },
  },
};

export default meta;

export const Default = {
  name: "Сгенерировать",
  args: { children: "Сгенерировать", variant: "primary" },
};

export const Minimal = {
  name: "Минимальный",
  args: { children: "OK" },
};

export const Variants = {
  name: "Варианты",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button variant="primary" onClick={logClick}>
        Primary
      </Button>
      <Button variant="error" onClick={logClick}>
        Error
      </Button>
      <Button variant="outline" onClick={logClick}>
        Outline
      </Button>
      <Button variant="green" onClick={logClick}>
        Green
      </Button>
    </div>
  ),
};

export const SizeScale = {
  name: "Размеры",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      {SIZE_KEYS.map((size) => (
        <Button key={size} size={size} variant="primary" onClick={logClick}>
          Кнопка {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled = {
  name: "Disabled",
  args: { children: "Недоступно", disabled: true },
};