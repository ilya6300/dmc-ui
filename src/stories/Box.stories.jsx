import { Box, DashCard, Main, tokens } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

const titleStyle = {
  margin: 0,
  fontSize: 24,
  color: tokens.mastBlue,
  fontWeight: 700,
};

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Корневой **контейнер**: layout через \`style\`.

${ROOT_NOTE}

${importBlock("Box", "DashCard")}

\`\`\`jsx
<Box style={{ padding: 16 }}>
  <DashCard>…</DashCard>
</Box>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: { control: false },
    style: { control: false },
    as: { control: "text" },
  },
};

export default meta;

export const PageShell = {
  name: "Не использовать!",
  render: () => (
    <Box style={{ padding: 16, minHeight: 280 }}>
      <DashCard>
        <span style={{ fontSize: 12, color: tokens.textMuted }}>Каталог</span>
        <h1 style={titleStyle}>Компании</h1>
      </DashCard>
    </Box>
  ),
};

export const SectionOnly = {
  name: "Вложенный Box",
  render: () => (
    <Main style={{ padding: 16, background: "#e2e8f0" }}>
      <Box style={{ marginTop: 8 }}>
        <DashCard>Блок внутри Box</DashCard>
      </Box>
    </Main>
  ),
};
