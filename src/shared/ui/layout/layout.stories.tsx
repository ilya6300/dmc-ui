import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Layout, Main } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

const meta = {
  title: "Design System/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Колонка контента: flex-колонка, отступы \`0 2% 4%\`, при монтировании — сдвиг справа (0.6s), как legacy \`animation_move_list\`.

${ROOT_NOTE}

${importBlock("Layout", "Main", "Box")}

**Состав:** \`children\` — обязательно; опционально \`animate\` (по умолчанию \`false\`), \`style\`.

\`\`\`jsx
<Main style={{ minHeight: "100vh" }}>
  <Layout>
    <Box title="Раздел">…</Box>
  </Layout>
</Main>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: { control: false },
    animate: {
      description: "Входная анимация; при `false` — только базовый layout.",
      control: "boolean",
    },
    style: { control: false },
  },
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "С анимацией",
  render: () => (
    <Main style={{ minHeight: 320, background: "#e2e8f0" }}>
      <Layout animate>
        <Box title="Список">Контент внутри Layout</Box>
      </Layout>
    </Main>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => (
    <Main style={{ minHeight: 200, background: "#e2e8f0" }}>
      <Layout>
        <p style={{ margin: 0, fontSize: 14 }}>Только Layout без анимации</p>
      </Layout>
    </Main>
  ),
};
