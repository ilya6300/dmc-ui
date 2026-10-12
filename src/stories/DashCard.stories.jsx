import { Box, DashCard, tokens } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/DashCard",
  component: DashCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box style={{ padding: 24 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Карточка дашборда — inline-стили в компоненте.

${ROOT_NOTE}

${importBlock("DashCard", "Box")}

**Состав:** \`children\` — содержимое; опционально \`title\` (заголовок в карточке), \`w\` (ширина, строка CSS; без \`w\` — \`100%\`), \`style\`, \`as\`.

\`\`\`jsx
<DashCard title="Подписка" w="320px">
  <p style={{ margin: 0, color: tokens.textMuted, fontSize: 14 }}>…</p>
</DashCard>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { description: "Заголовок карточки; без значения заголовок не показывается." },
    w: { description: "Ширина (например `100%`, `320px`, `auto`); по умолчанию `100%`." },
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
    <DashCard {...args}>
      <p style={{ margin: 0, color: tokens.textMuted, fontSize: 14 }}>
        Пример содержимого.
      </p>
    </DashCard>
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => <DashCard>Только текст в карточке</DashCard>,
};

export const CustomWidth = {
  name: "Ширина w",
  render: () => (
    <DashCard title="Узкая карточка" w="280px">
      <p style={{ margin: 0, fontSize: 14 }}>Ширина задаётся пропом w.</p>
    </DashCard>
  ),
};
