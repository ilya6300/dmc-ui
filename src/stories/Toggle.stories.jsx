import React from "react";
import { useArgs } from "storybook/preview-api";
import { Main, SIZE_KEYS, Toggle } from "../index.js";
import { componentDoc, importBlock, ROOT_NOTE } from "./docsFragments.js";

function ToggleStory(args) {
  const [, updateArgs] = useArgs();
  const { variant = "switch" } = args;

  return (
    <Toggle
      {...args}
      onChange={
        variant === "text"
          ? args.onChange
          : (next) => updateArgs({ active: next })
      }
    />
  );
}

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  render: ToggleStory,
  args: { size: "m" },
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
          'Переключатель. `variant="text"` — только подпись. Опционально `size` (`xs` … `xl`, по умолчанию `m`).',
          ROOT_NOTE,
          importBlock("Toggle", "Main"),
          "```jsx\n<Toggle active={on} label=\"Мои\" onChange={setOn} />\n```",
        ),
      },
    },
  },
  argTypes: {
    active: { control: "boolean" },
    label: { description: "Подпись." },
    variant: { options: ["switch", "text"], control: "radio" },
    style: { description: "Стили на кнопке-обёртке.", control: false },
    disabled: { control: "boolean" },
    size: { options: SIZE_KEYS, control: "select" },
    onChange: { control: false },
  },
};

export default meta;

export const WithLabel = {
  name: "С подписью",
  args: { active: true, label: "Мои" },
};

export const SwitchOnly = {
  name: "Только switch",
  args: { active: false },
};

export const TextOnly = {
  name: "Только текст",
  args: { variant: "text", label: "Подпись без переключателя" },
};

export const SizeScale = {
  name: "Размеры",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {SIZE_KEYS.map((size) => (
        <Toggle key={size} size={size} active label={`size=${size}`} onChange={() => {}} />
      ))}
    </div>
  ),
};
