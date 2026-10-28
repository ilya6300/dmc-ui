import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Main } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

const meta = {
  title: "Design System/Main",
  component: Main,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Обёртка страницы — только \`style\`.

${ROOT_NOTE}

${importBlock("Main", "Box")}

\`\`\`jsx
<Main style={{ minHeight: "100vh", padding: 24 }}>
  <Box title="Раздел">…</Box>
</Main>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: { control: false },
    style: { description: "Inline-стили корня.", control: false },
  },
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScrollablePage: Story = {
  name: "Страница со скроллом",
  render: () => (
    <Main style={{ height: 320, overflow: "auto", background: "#e2e8f0", padding: 24 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i} style={{ marginBottom: 10 }}>
          Блок {i + 1}
        </Box>
      ))}
    </Main>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => (
    <Main style={{ padding: 16 }}>
      <p style={{ margin: 0, fontSize: 12 }}>Main без вложенного Box</p>
    </Main>
  ),
};
