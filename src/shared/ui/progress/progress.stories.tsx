import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { Main } from "../main";
import { useTheme } from "../theme-context";
import { Progress, ProgressBar, ProgressCircle } from "./index";

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

function ProgressExamples() {
  const { colors } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720, color: colors.textPrimary }}>
      <section>
        <h3 style={{ margin: "0 0 8px" }}>ProgressBar</h3>
        <ExampleRow elem={<ProgressBar value={33} style={{ height: 8 }} />} code={'<ProgressBar value={33} style={{ height: 8 }} />'} />
        <ExampleRow
          elem={<ProgressBar value={33} buffer={66} style={{ height: 8 }} />}
          code={'<ProgressBar value={33} buffer={66} style={{ height: 8 }} />'}
        />
        <ExampleRow
          elem={<ProgressBar indeterminate style={{ height: 8 }} />}
          code={'<ProgressBar indeterminate style={{ height: 8 }} />'}
        />
        <ExampleRow
          elem={<ProgressBar stripe value={33} style={{ height: 8 }} />}
          code={'<ProgressBar stripe value={33} style={{ height: 8 }} />'}
        />
        <ExampleRow
          elem={<ProgressBar stripe animation value={33} style={{ height: 8 }} />}
          code={'<ProgressBar stripe animation value={33} style={{ height: 8 }} />'}
        />
        <ExampleRow
          elem={<ProgressBar label value={33} style={{ height: 24 }} />}
          code={'<ProgressBar label value={33} style={{ height: 24 }} />'}
        />
        <ExampleRow
          elem={
            <ProgressBar value={33} style={{ height: 24 }}>
              label
            </ProgressBar>
          }
          code={'<ProgressBar value={33} style={{ height: 24 }}>label</ProgressBar>'}
        />
        <ExampleRow
          elem={<ProgressBar border value={33} style={{ height: 8 }} />}
          code={'<ProgressBar border value={33} style={{ height: 8 }} />'}
        />
      </section>
      <section>
        <h3 style={{ margin: "0 0 8px" }}>ProgressCircle</h3>
        <ExampleRow
          elem={<ProgressCircle size={96} thickness={5} value={33} />}
          code="<ProgressCircle size={96} thickness={5} value={33} />"
        />
        <ExampleRow
          elem={<ProgressCircle size={96} thickness={5} value={33} buffer={66} />}
          code="<ProgressCircle size={96} thickness={5} value={33} buffer={66} />"
        />
        <ExampleRow
          elem={<ProgressCircle size={96} thickness={5} indeterminate />}
          code="<ProgressCircle size={96} thickness={5} indeterminate />"
        />
        <ExampleRow
          elem={<ProgressCircle size={96} thickness={5} color="gradient" indeterminate />}
          code={'<ProgressCircle size={96} thickness={5} color="gradient" indeterminate />'}
        />
        <ExampleRow
          elem={<ProgressCircle size={96} thickness={5} label value={33} />}
          code="<ProgressCircle size={96} thickness={5} label value={33} />"
        />
        <ExampleRow
          elem={
            <ProgressCircle size={96} thickness={5} value={33}>
              label
            </ProgressCircle>
          }
          code="<ProgressCircle size={96} thickness={5} value={33}>label</ProgressCircle>"
        />
        <ExampleRow
          elem={<ProgressCircle border size={96} thickness={5} value={33} />}
          code="<ProgressCircle border size={96} thickness={5} value={33} />"
        />
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
  parameters: { controls: { disable: true } },
  render: () => <ProgressExamples />,
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => <ProgressBar value={25} style={{ height: 6 }} />,
};
