import React, { useState } from "react";
import { Main, RadioBtn, ThemeProvider } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

function ComparisonDemo() {
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

  return <RadioBtn items={items} />;
}

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/RadioBtn",
  component: RadioBtn,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Main style={{ padding: 24 }}>
          <Story />
        </Main>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Горизонтальная группа chip-кнопок (кастомные «радио»). Состояние \`active\` и обработчик \`action\` задаются в каждом элементе \`items\`; взаимоисключение — на стороне родителя.

${ROOT_NOTE}

${importBlock("RadioBtn", "Main", "ThemeProvider")}

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

**Состав:** обязательно \`items\` (\`name\`, \`active\`, \`action\`); опционально \`style\` на обёртке группы.
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
    style: { description: "Стили корневой обёртки.", control: false },
  },
};

export default meta;

export const Comparison = {
  name: "Сравнение (Меньше / Равно / Больше)",
  render: () => <ComparisonDemo />,
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
