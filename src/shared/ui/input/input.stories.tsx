import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Main } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

const meta = {
  title: "Design System/Input",
  component: Input,
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
Поле ввода с опциональной подписью и вариантами \`type\`: \`text\`, \`number\`, \`key\` (поле + цифровая клавиатура).

${ROOT_NOTE}

${importBlock("Input", "Main")}

**Состав:** опционально \`label\`, \`placeholder\`, \`type\` (\`text\` | \`number\` | \`key\`), \`value\` / \`defaultValue\`, \`onChange\`, \`disabled\`, \`readOnly\`, \`error\`, \`msg\` (текст под полем только при \`error\` и непустом \`msg\`), \`name\`, \`id\`, \`style\`, \`inputStyle\`, \`aria-label\` (если нет \`label\`).

Для \`type\` \`number\` и \`key\` (нативный \`number\`): по умолчанию \`min={0}\`, верхней границы нет; можно передать свои \`min\` и \`max\`.

Семантический \`type\` не совпадает с нативным HTML: для \`key\` в DOM — \`type="number"\`, справа сетка цифр; при удержании кнопки — рамка и цифра \`mastBlue\` (фон без заливки), «0» на всю ширину сетки.

\`\`\`jsx
<Input label="Версия" type="key" placeholder="..." value={v} onChange={(e) => setV(e.target.value)} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      options: ["text", "number", "key"],
      control: "radio",
      description: "Семантический тип поля.",
    },
    label: { description: "Подпись над полем." },
    placeholder: { description: "Подсказка; цвет из темы." },
    value: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: {
      control: "boolean",
      description: "Состояние ошибки: красная рамка поля (colors.error).",
    },
    msg: {
      control: "text",
      description: "Сообщение под полем; показывается только при error и непустом msg.",
    },
    min: {
      description: "Нижняя граница для number/key (по умолчанию 0).",
      control: "number",
    },
    max: {
      description: "Верхняя граница для number/key; без пропа — без ограничения.",
      control: "number",
    },
    style: { control: false },
    inputStyle: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextWithLabel: Story = {
  name: "Текст с подписью",
  args: {
    type: "text",
    label: "Название",
    placeholder: "...",
    defaultValue: "",
  },
};

export const NumberField: Story = {
  name: "Число",
  args: {
    type: "number",
    label: "Количество",
    placeholder: "0",
    defaultValue: "",
  },
};

export const KeyWithKeypad: Story = {
  name: "Клавиатура (key)",
  args: {
    type: "key",
    label: "Версия",
    placeholder: "...",
    defaultValue: "",
  },
};

export const Minimal: Story = {
  name: "Минимальный",
  args: {
    placeholder: "...",
  },
};

export const WithValidationError: Story = {
  name: "С ошибкой",
  args: {
    type: "text",
    label: "Email",
    placeholder: "user@example.com",
    defaultValue: "not-an-email",
    error: true,
    msg: "Введите корректный адрес электронной почты",
  },
};
