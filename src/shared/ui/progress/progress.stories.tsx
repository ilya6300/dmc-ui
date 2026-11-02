import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { Main } from "../main";
import { useTheme } from "../theme-context";
import { Progress, ProgressBar, ProgressCircle, type ProgressProps } from "./index";

function ExampleRow({ elem, code }: { elem: ReactNode; code: string }) {
  const { colors } = useTheme();
  const row: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "12px 0",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
  };
  const codeStyle: CSSProperties = {
    margin: 0,
    padding: "8px 12px",
    borderRadius: 6,
    background: colors.focusBg,
    fontSize: 13,
    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
  };
  return (
    <div style={row}>
      {elem}
      <pre style={codeStyle}>{code}</pre>
    </div>
  );
}

function ProgressExamples({
  value = 33,
  color = "primary",
  thickness = 8,
  size = 96,
  border = false,
  reverse = false,
}: ProgressProps) {
  const { colors } = useTheme();
  const bar = { value, color, thickness, border, reverse };
  const circle = { value, color, thickness, size, border, reverse };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720, color: colors.textPrimary }}>
      <section>
        <h3 style={{ margin: "0 0 8px" }}>ProgressBar</h3>
        <ExampleRow elem={<ProgressBar {...bar} />} code="<ProgressBar />" />
        <ExampleRow elem={<ProgressBar {...bar} buffer={66} />} code="<ProgressBar buffer={66} />" />
        <ExampleRow elem={<ProgressBar {...bar} indeterminate />} code="<ProgressBar indeterminate />" />
        <ExampleRow elem={<ProgressBar {...bar} stripe />} code="<ProgressBar stripe />" />
        <ExampleRow
          elem={<ProgressBar {...bar} stripe animation />}
          code="<ProgressBar stripe animation />"
        />
        <ExampleRow elem={<ProgressBar {...bar} label />} code="<ProgressBar label />" />
        <ExampleRow elem={<ProgressBar {...bar}>label</ProgressBar>} code="<ProgressBar>label</ProgressBar>" />
        <ExampleRow elem={<ProgressBar {...bar} border />} code="<ProgressBar border />" />
      </section>
      <section>
        <h3 style={{ margin: "0 0 8px" }}>ProgressCircle</h3>
        <ExampleRow elem={<ProgressCircle {...circle} />} code="<ProgressCircle />" />
        <ExampleRow
          elem={<ProgressCircle {...circle} buffer={66} />}
          code="<ProgressCircle buffer={66} />"
        />
        <ExampleRow
          elem={<ProgressCircle {...circle} indeterminate />}
          code="<ProgressCircle indeterminate />"
        />
        <ExampleRow
          elem={<ProgressCircle {...circle} color="gradient" indeterminate />}
          code='<ProgressCircle color="gradient" indeterminate />'
        />
        <ExampleRow elem={<ProgressCircle {...circle} label />} code="<ProgressCircle label />" />
        <ExampleRow
          elem={<ProgressCircle {...circle}>label</ProgressCircle>}
          code="<ProgressCircle>label</ProgressCircle>"
        />
        <ExampleRow elem={<ProgressCircle {...circle} border />} code="<ProgressCircle border />" />
      </section>
    </div>
  );
}

const meta = {
  title: "Design System/Progress",
  component: Progress,
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
Индикатор прогресса: линейный (\`ProgressBar\`) и круговой (\`ProgressCircle\`). Facade \`Progress\` переключает \`type\`.

${ROOT_NOTE}

${importBlock("Progress", "ProgressBar", "ProgressCircle")}

**Состав:** \`value\`, \`buffer\`, \`thickness\`, \`size\` (circle), \`color\`, \`label\`, \`stripe\`, \`animation\`, \`indeterminate\`, \`reverse\`, \`border\` (рамка: прямоугольная у bar, круглая у circle), \`children\`.

\`\`\`jsx
<Progress type="bar" value={40} color="primary" />
<ProgressCircle size={96} value={60} label />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: { options: ["bar", "circle"], control: "radio" },
    value: { control: { type: "range", min: 0, max: 100 } },
    buffer: { control: { type: "range", min: 0, max: 100 } },
    thickness: { control: "number" },
    size: { control: "number" },
    color: {
      options: ["primary", "secondary", "success", "error", "warning", "gradient"],
      control: "select",
    },
    label: { control: "boolean" },
    stripe: { control: "boolean" },
    animation: { control: "boolean" },
    indeterminate: { control: "boolean" },
    reverse: { control: "boolean" },
    border: { control: "boolean", description: "Рамка вокруг: прямоугольная (bar) или круглая (circle)" },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Bar",
  args: {
    type: "bar",
    value: 33,
    thickness: 8,
    color: "primary",
  },
};

export const Circle: Story = {
  name: "Circle",
  args: {
    type: "circle",
    value: 33,
    size: 96,
    thickness: 5,
    color: "primary",
    label: true,
  },
};

export const Examples: Story = {
  name: "Примеры",
  args: {
    type: "bar",
    value: 33,
    thickness: 8,
    size: 96,
    color: "primary",
    border: false,
    reverse: false,
  },
  render: (args) => <ProgressExamples {...args} />,
};

export const Minimal: Story = {
  name: "Минимальный",
  args: {
    type: "bar",
    value: 25,
    thickness: 6,
  },
};
