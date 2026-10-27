import React, { useState } from "react";
import { Main, RadioBtn, SIZE_KEYS } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

function ComparisonDemo({ size }) {
  const [value, setValue] = useState("more");

  const items = [
    {
      name: "Меньше",
      active: value === "less",
      action: () => setValue("less"),
    },
    {
      name: "Равно",
      active: value === "equal",
      action: () => setValue("equal"),
    },
    {
      name: "Больше",
      active: value === "more",
      action: () => setValue("more"),
    },
  ];

  return <RadioBtn items={items} size={size} />;
}

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/RadioBtn",
  component: RadioBtn,
  tags: ["autodocs"],
  render: (args) => <RadioBtn {...args} />,
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
        component: `
Горизонтальная группа chip-кнопок (кастомные «радио»). Состояние \`active\` и обработчик \`action\` задаются в каждом элементе \`items\`; взаимоисключение — на стороне родителя.

${ROOT_NOTE}

${importBlock("RadioBtn", "Main")}

\`\`\`jsx
const [value, setValue] = useState("more");

<RadioBtn
  items={[
    { name: "Меньше", active: value === "less", action: () => setValue("less") },
    { name: "Равно", active: value === "equal", action: () => setValue("equal") },
    { name: "Больше", active: value === "more", action: () => setValue("more") },
  ]}
/>
\`\`\`

**Состав:** обязательно \`items\` (\`name\`, \`active\`, \`action\`); опционально \`size\` (\`xs\` … \`xl\`), \`style\` на обёртке группы.
        `,
      },
    },
  },
  argTypes: {
    items: {
      description:
        "Массив вариантов: name (подпись), active (выбран), action (клик).",
      control: false,
    },
    size: { options: SIZE_KEYS, control: "select" },
    style: { description: "Стили корневой обёртки.", control: false },
  },
};

export default meta;

export const Comparison = {
  name: "Сравнение (Меньше / Равно / Больше)",
  render: (args) => <ComparisonDemo size={args.size} />,
};

export const Minimal = {
  name: "Минимальный",
  args: {
    items: [
      { name: "A", active: true, action: () => {} },
      { name: "B", active: false, action: () => {} },
    ],
  },
};

export const SizeScale = {
  name: "Размеры",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {SIZE_KEYS.map((size) => (
        <RadioBtn
          key={size}
          size={size}
          items={[
            { name: `${size}-1`, active: true, action: () => {} },
            { name: `${size}-2`, active: false, action: () => {} },
          ]}
        />
      ))}
    </div>
  ),
};
