import { Box, DashCard, Main } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
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
<Main style={{ minHeight: "100vh" }}>
  <Box style={{ padding: 24 }}>…</Box>
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
};

export default meta;

export const ScrollablePage = {
  name: "Страница со скроллом",
  render: () => (
    <Main style={{ height: 320, overflow: "auto", background: "#e2e8f0" }}>
      <Box style={{ padding: 24 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <DashCard key={i} style={{ marginBottom: 10 }}>
            Блок {i + 1}
          </DashCard>
        ))}
      </Box>
    </Main>
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => (
    <Main style={{ padding: 16 }}>
      <p style={{ margin: 0, fontSize: 12 }}>Main без вложенного Box</p>
    </Main>
  ),
};
