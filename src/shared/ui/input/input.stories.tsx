import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type CSSProperties } from "react";
import { Input, Main, Toggle, type InputColor } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { useTheme } from "../theme-context";

const COLORS: Array<InputColor | "default"> = [
  "default",
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
];

const VARIANTS: Array<{ key: string; label: string; props: Record<string, boolean> }> = [
  { key: "standard", label: "standart", props: {} },
  { key: "filled", label: "filled", props: { filled: true } },
  { key: "outline", label: "outline", props: { outline: true } },
  { key: "underlined", label: "underlined", props: { underlined: true } },
];

function VariantsTable() {
  const { colors } = useTheme();
  const [dense, setDense] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const border = `1px solid ${colors.border}`;
  const cell: CSSProperties = {
    padding: 12,
    border,
    verticalAlign: "middle",
    minWidth: 160,
  };
  const head: CSSProperties = {
    ...cell,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, color: colors.textPrimary }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <Toggle active={dense} label="Dense" onChange={setDense} />
        <Toggle active={disabled} label="Disabled" onChange={setDisabled} />
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ ...head, textAlign: "left", width: 112 }}>color</th>
            {VARIANTS.map((variant) => (
              <th key={variant.key} style={head}>
                {variant.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map((color) => (
            <tr key={color}>
              <th style={{ ...head, textAlign: "left" }}>{color}</th>
              {VARIANTS.map((variant) => (
                <td key={variant.key} style={cell}>
                  <Input
                    {...variant.props}
                    color={color === "default" ? undefined : color}
                    dense={dense}
                    disabled={disabled}
                    label="Label"
                    placeholder="Placeholder"
                    defaultValue=""
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
Поле ввода с floating/stack label, секциями и вариантами оформления. Семантический \`type\`: \`text\`, \`number\`, \`key\` (поле + цифровая клавиатура).

${ROOT_NOTE}

${importBlock("Input", "Main")}

**Состав:** опционально \`label\`, \`placeholder\`, \`type\` (\`text\` | \`number\` | \`key\`), \`color\` (\`primary\` | \`secondary\` | \`success\` | \`error\` | \`warning\`), \`size\` (\`xs\`–\`xl\`, по умолчанию \`m\`), \`value\` / \`defaultValue\`, \`onChange\`, \`disabled\`, \`readOnly\`, \`required\`, \`error\`, \`msg\`, \`hint\`, \`hideHint\`, \`hideMessage\`, \`leftSection\` / \`rightSection\`, \`before\` / \`after\`, флаги \`outline\` / \`filled\` / \`underlined\` / \`square\` / \`stackLabel\` / \`dense\`, \`style\`, \`inputStyle\`.

Для \`number\` и \`key\`: по умолчанию \`min={0}\`; \`max\` опционален; \`step\` (по умолчанию 1) задаёт шаг стрелок/колеса. \`wheel\` включает изменение значения колесом мыши в фокусе. У \`key\` скрыты native-стрелки, клавиатура появляется при фокусе поверх разметки (\`position: absolute\`); нажатие вызывает \`onChange\` (в том числе в controlled-режиме).

\`\`\`jsx
<Input label="Версия" type="key" placeholder="..." value={v} onChange={(e) => setV(e.target.value)} />
<Input label="Email" outline color="primary" hint="Рабочий адрес" />
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
    color: {
      options: ["primary", "secondary", "success", "error", "warning"],
      control: "select",
      description: "Акцент рамки и filled-фона.",
    },
    label: { description: "Подпись; без stackLabel — floating." },
    placeholder: { description: "Подсказка в поле." },
    value: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    error: {
      control: "boolean",
      description: "Состояние ошибки: красная рамка.",
    },
    msg: {
      control: "text",
      description: "Сообщение об ошибке; видно при error.",
    },
    hint: { control: "text", description: "Подсказка под полем." },
    outline: { control: "boolean" },
    filled: { control: "boolean" },
    underlined: { control: "boolean" },
    square: { control: "boolean" },
    stackLabel: { control: "boolean" },
    dense: { control: "boolean" },
    step: {
      control: "number",
      description: "Шаг для number/key и для wheel. По умолчанию 1.",
    },
    wheel: {
      control: "boolean",
      description: "Колесо мыши меняет значение на step у number/key в фокусе.",
    },
    min: { description: "Нижняя граница для number/key.", control: "number" },
    max: { description: "Верхняя граница для number/key.", control: "number" },
    leftSection: { control: false },
    rightSection: { control: false },
    before: { control: false },
    after: { control: false },
    style: { control: false },
    inputStyle: { control: false },
    size: {
      options: ["xs", "s", "m", "l", "xl"],
      control: "select",
      description: "Шкала размера. По умолчанию m.",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VariantsMatrix: Story = {
  name: "Цвета и варианты",
  parameters: { controls: { disable: true } },
  render: () => <VariantsTable />,
};

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

export const WithSections: Story = {
  name: "Секции",
  args: {
    label: "Поиск",
    leftSection: "⌕",
    rightSection: "↵",
    placeholder: "Запрос",
    defaultValue: "",
  },
};

export const WithHint: Story = {
  name: "Подсказка",
  args: {
    label: "Логин",
    hint: "Только латиница",
    defaultValue: "",
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
