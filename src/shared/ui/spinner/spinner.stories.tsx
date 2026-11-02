import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Main } from "../main";
import { useTheme } from "../theme-context";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import {
  Spinner,
  SpinnerClock,
  SpinnerComment,
  SpinnerCube,
  SpinnerGrid,
  SpinnerHourglass,
  SpinnerIos,
  SpinnerOval,
  SpinnerPie,
  SpinnerRadio,
  type SpinnerProps,
} from "./index";

const VARIANT_ROWS: Array<{ name: string; View: typeof SpinnerPie }> = [
  { name: "SpinnerPie", View: SpinnerPie },
  { name: "SpinnerIos", View: SpinnerIos },
  { name: "SpinnerCube", View: SpinnerCube },
  { name: "SpinnerGrid", View: SpinnerGrid },
  { name: "SpinnerOval", View: SpinnerOval },
  { name: "SpinnerRadio", View: SpinnerRadio },
  { name: "SpinnerClock", View: SpinnerClock },
  { name: "SpinnerComment", View: SpinnerComment },
  { name: "SpinnerHourglass", View: SpinnerHourglass },
];

function VariantsList({ size, color, thickness }: SpinnerProps) {
  const { colors } = useTheme();
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "8px 0",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
  };
  const code: CSSProperties = {
    margin: 0,
    padding: "8px 12px",
    borderRadius: 6,
    background: colors.focusBg,
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
      <div style={row}>
        <div style={{ width: 56, display: "flex", justifyContent: "center" }}>
          <Spinner size={size} color={color} thickness={thickness} />
        </div>
        <pre style={code}>{`<Spinner size={${JSON.stringify(size)}} color="${color ?? ""}" thickness={${thickness ?? ""}} />`}</pre>
      </div>
      {VARIANT_ROWS.map(({ name, View }) => (
        <div key={name} style={row}>
          <div style={{ width: 56, display: "flex", justifyContent: "center" }}>
            <View size={size} color={color} />
          </div>
          <pre style={code}>{`<${name} size={${JSON.stringify(size)}} color="${color ?? ""}" />`}</pre>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Design System/Spinner",
  component: Spinner,
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
Индикаторы загрузки: базовый Material-spinner и набор SVG-вариантов.

${ROOT_NOTE}

${importBlock("Spinner", "SpinnerIos", "SpinnerPie")}

**Состав:** \`size\` (по умолчанию \`1em\`), \`thickness\` (у \`Spinner\`), \`color\` (\`primary\` | \`secondary\` | \`success\` | \`error\` | \`warning\`).

Варианты: \`Spinner\`, \`SpinnerIos\`, \`SpinnerPie\`, \`SpinnerCube\`, \`SpinnerGrid\`, \`SpinnerOval\`, \`SpinnerRadio\`, \`SpinnerClock\`, \`SpinnerComment\`, \`SpinnerHourglass\`.

\`\`\`jsx
<Spinner color="primary" size={32} thickness={4} />
<SpinnerIos color="secondary" size="3em" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: "text", description: "Ширина и высота SVG." },
    thickness: { control: "number", description: "Толщина дуги у Spinner." },
    color: {
      options: ["primary", "secondary", "success", "error", "warning"],
      control: "select",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Базовый",
  args: {
    size: "2em",
    thickness: 5,
    color: "primary",
  },
};

export const Variants: Story = {
  name: "Варианты",
  args: {
    size: "3em",
    thickness: 5,
    color: "primary",
  },
  render: (args) => <VariantsList {...args} />,
};

export const Minimal: Story = {
  name: "Минимальный",
  args: {
    size: "1em",
    thickness: 5,
  },
};
