import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Box, Main, useTheme } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

function SecondaryText({ children }: { children?: ReactNode }) {
  const { colors } = useTheme();
  return (
    <p style={{ margin: 0, color: colors.textSecondary, fontSize: 14 }}>
      {children}
    </p>
  );
}

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

**Состав:** \`children\` — содержимое; опционально \`title\` (заголовок), \`w\` (ширина CSS-строкой; без \`w\` — \`100%\`), \`shadow\` (размытие тени в px, по умолчанию \`12\`; \`0\` — без тени), \`style\`, \`as\`.

Текст в \`children\` наследует \`textPrimary\` с карточки; вторичный — \`useTheme().colors.textSecondary\`.

\`\`\`jsx
const { colors } = useTheme();
<Box title="Подписка" w="320px">
  <p style={{ margin: 0, color: colors.textSecondary, fontSize: 14 }}>…</p>
</Box>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { description: "Заголовок; без значения заголовок не показывается." },
    w: { description: "Ширина (`100%`, `320px`, `auto`…); по умолчанию `100%`." },
    shadow: {
      control: { type: "number", min: 0, step: 1 },
      description: "Размытие тени карточки в px; по умолчанию 12; 0 — `box-shadow: none`.",
    },
    children: { control: false },
    style: { control: false },
    as: { control: "text" },
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "С заголовком",
  args: { title: "Подписка" },
  render: (args) => (
    <Box {...args}>
      <SecondaryText>Пример содержимого.</SecondaryText>
    </Box>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  render: () => <Box>Только текст в карточке</Box>,
};

export const CustomWidth: Story = {
  name: "Ширина w",
  render: () => (
    <Box title="Узкая карточка" w="280px">
      <p style={{ margin: 0, fontSize: 14 }}>Ширина задаётся пропом w.</p>
    </Box>
  ),
};

export const NoShadow: Story = {
  name: "Без тени",
  render: () => (
    <Box title="shadow={0}" shadow={0}>
      <p style={{ margin: 0, fontSize: 14 }}>Тень отключена пропом shadow.</p>
    </Box>
  ),
};
