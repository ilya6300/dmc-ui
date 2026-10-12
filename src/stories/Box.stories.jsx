import { Box, Main, tokens } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Box",
  component: Box,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Main style={{ padding: 24, background: "#e2e8f0" }}>
        <Story />
      </Main>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Карточка контента — inline-стили в компоненте.

${ROOT_NOTE}

${importBlock("Box", "Main")}

**Состав:** \`children\` — содержимое; опционально \`title\` (заголовок), \`w\` (ширина CSS-строкой; без \`w\` — \`100%\`), \`style\`, \`as\`.

\`\`\`jsx
<Box title="Подписка" w="320px">
  <p style={{ margin: 0, color: tokens.textMuted, fontSize: 14 }}>…</p>
</Box>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { description: "Заголовок; без значения заголовок не показывается." },
    w: { description: "Ширина (`100%`, `320px`, `auto`…); по умолчанию `100%`." },
    children: { control: false },
    style: { control: false },
    as: { control: "text" },
  },
};

export default meta;

export const Default = {
  name: "С заголовком",
  args: { title: "Подписка" },
  render: (args) => (
    <Box {...args}>
      <p style={{ margin: 0, color: tokens.textMuted, fontSize: 14 }}>
        Пример содержимого.
      </p>
    </Box>
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => <Box>Только текст в карточке</Box>,
};

export const CustomWidth = {
  name: "Ширина w",
  render: () => (
    <Box title="Узкая карточка" w="280px">
      <p style={{ margin: 0, fontSize: 14 }}>Ширина задаётся пропом w.</p>
    </Box>
  ),
};
