import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
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
} from "./index";

const VARIANTS: Array<{ elem: ReactNode; code: string }> = [
  { elem: <SpinnerPie size="48px" />, code: '<SpinnerPie size="48px" />' },
  {
    elem: <SpinnerIos color="primary" size={48} />,
    code: '<SpinnerIos color="primary" size={48} />',
  },
  {
    elem: <SpinnerCube color="secondary" size="3rem" />,
    code: '<SpinnerCube color="secondary" size="3rem" />',
  },
  {
    elem: <SpinnerGrid color="success" size="3em" />,
    code: '<SpinnerGrid color="success" size="3em" />',
  },
  {
    elem: <SpinnerOval color="success" size="3em" />,
    code: '<SpinnerOval color="success" size="3em" />',
  },
  {
    elem: <SpinnerRadio color="error" size="3em" />,
    code: '<SpinnerRadio color="error" size="3em" />',
  },
  {
    elem: <SpinnerClock color="primary" size="3em" />,
    code: '<SpinnerClock color="primary" size="3em" />',
  },
  {
    elem: <SpinnerComment color="warning" size="3em" />,
    code: '<SpinnerComment color="warning" size="3em" />',
  },
  { elem: <SpinnerHourglass size="3em" />, code: '<SpinnerHourglass size="3em" />' },
];

function VariantsList() {
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
      {VARIANTS.map((item) => (
        <div key={item.code} style={row}>
          <div style={{ width: 56, display: "flex", justifyContent: "center" }}>{item.elem}</div>
          <pre style={code}>{item.code}</pre>
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
  parameters: { controls: { disable: true } },
  render: () => <VariantsList />,
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => <Spinner />,
};
