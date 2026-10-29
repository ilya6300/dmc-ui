import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Main, RadioBtn, type RadioBtnItem } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

function ComparisonDemo() {
  const [value, setValue] = useState("more");

  const items: RadioBtnItem[] = [
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

const meta = {
  title: "Design System/RadioBtn",
  component: RadioBtn,
  tags: ["autodocs"],
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

**Состав:** обязательно \`items\` (\`name\`, \`active\`, \`action\`); опционально \`size\` (\`xs\` | \`s\` | \`m\` | \`l\` | \`xl\`, по умолчанию \`m\`) и \`style\` на обёртке группы.
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
    size: {
      options: ["xs", "s", "m", "l", "xl"],
      control: "select",
      description: "Шкала размера. По умолчанию m.",
    },
  },
} satisfies Meta<typeof RadioBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Comparison: Story = {
  name: "Сравнение (Меньше / Равно / Больше)",
  render: () => <ComparisonDemo />,
};

export const Minimal: Story = {
  name: "Минимальный",
  args: {
    items: [
      { name: "A", active: true, action: () => {} },
      { name: "B", active: false, action: () => {} },
    ],
  },
};
