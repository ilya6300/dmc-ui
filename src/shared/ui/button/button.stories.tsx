import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { useTheme } from "../theme-context";
import { Button, type ButtonColor, type ButtonVariant } from "./button";

const VARIANTS: ButtonVariant[] = ["filled", "outline", "tonal", "text", "plain", "link"];
const COLORS: ButtonColor[] = ["primary", "secondary", "success", "error", "warning"];

function ColorVariantTable() {
  const { colors } = useTheme();
  const border = `1px solid ${colors.border}`;
  const cell: CSSProperties = {
    padding: "12px 16px",
    border,
    textAlign: "center",
    verticalAlign: "middle",
  };
  const head: CSSProperties = {
    ...cell,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 600,
  };

  return (
    <table style={{ borderCollapse: "collapse", color: colors.textPrimary }}>
      <thead>
        <tr>
          <th style={{ ...head, textAlign: "left" }}>Вариант</th>
          {COLORS.map((color) => (
            <th key={color} style={head}>{color}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <th style={{ ...head, textAlign: "left" }}>{variant}</th>
            {COLORS.map((color) => (
              <td key={color} style={cell}>
                <Button variant={variant} color={color}>Кнопка</Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Кнопка действия. Внешний вид (заливка, контур, тон, текст, ссылка, форма) задаётся в компоненте.

${ROOT_NOTE}

${importBlock("Button")}

**Состав:** \`children\` — подпись. Опционально \`variant\` (\`filled\` по умолчанию, \`outline\`, \`tonal\`, \`text\`, \`plain\`, \`link\`), \`color\` (\`primary\`, \`error\`, \`warning\`), \`size\` (\`s\`, \`m\`, \`l\`), \`shape\` (\`default\`, \`round\`, \`rounded\`, \`square\`), \`block\`, \`flat\`, \`loading\`, \`disabled\`, \`active\`, \`leftSection\`, \`rightSection\`, \`style\`.

Цвета берутся из переменных темы \`--dmc-color-*\`. \`loading\` и \`disabled\` не вызывают \`onClick\`.

\`\`\`jsx
<Button variant="filled">Сохранить</Button>
<Button variant="outline" color="error">Удалить</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: { description: "Подпись или содержимое кнопки." },
    variant: {
      description:
        "filled — заливка; outline — контур; tonal — лёгкий фон; text и plain — без заливки; link — ссылка без верхнего регистра.",
    },
    color: {
      description: "primary — основной синий темы; error; warning.",
    },
    size: { description: "s, m (по умолчанию) или l." },
    shape: {
      description: "default — скругление 4px; round — круг; rounded — капсула; square — без скругления.",
    },
    block: { description: "Растянуть на всю ширину родителя." },
    flat: { description: "Без тени у filled и outline." },
    loading: { description: "Блокирует нажатие и снижает непрозрачность." },
    disabled: { description: "Неактивная кнопка." },
    active: { description: "Нажатый вид без клика." },
    leftSection: { control: false, description: "Узел слева от подписи." },
    rightSection: { control: false, description: "Узел справа от подписи." },
    style: { control: false },
    onClick: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Заливка",
  args: { children: "Сохранить" },
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => <Button>OK</Button>,
};

export const ColorsAndVariants: Story = {
  name: "Цвета и варианты",
  parameters: { controls: { disable: true } },
  render: () => <ColorVariantTable />,
};
