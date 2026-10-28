import type { Meta, StoryObj } from "@storybook/react-vite";
import { Main, Text, useTheme } from "../../../index";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";

const meta = {
  title: "Design System/Text",
  component: Text,
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
Типографика: подзаголовок, заголовок, абзац, пункт списка, inline-текст. Цвет по умолчанию — основной текст темы.

${ROOT_NOTE}

${importBlock("Text", "Main")}

**Состав:** обязательно \`children\`; опционально \`variant\` (\`subt\` | \`title\` | \`p\` | \`li\` | \`span\`, по умолчанию \`span\`), \`color\`, \`style\`.

\`\`\`jsx
<Text variant="title">Заголовок</Text>
<Text variant="p">Абзац текста.</Text>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: { control: "text", description: "Содержимое." },
    variant: {
      options: ["subt", "title", "p", "li", "span"],
      control: "select",
      description: "Стиль и семантический тег; по умолчанию span.",
    },
    color: {
      control: "color",
      description: "CSS-цвет; перекрывает цвет темы.",
    },
    style: { control: false, description: "Дополнительные inline-стили." },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

function AllVariantsDemo() {
  const { colors } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text variant="title">Заголовок (title)</Text>
      <Text variant="subt">Подзаголовок (subt)</Text>
      <Text variant="p">Абзац (p) — основной текст блока.</Text>
      <ul style={{ margin: 0, paddingLeft: 20, color: colors.textPrimary }}>
        <Text variant="li">Пункт списка (li)</Text>
        <Text variant="li">Второй пункт</Text>
      </ul>
      <Text variant="span">Inline (span) внутри </Text>
      <Text variant="span" color={colors.mastBlue}>акцентного фрагмента</Text>
    </div>
  );
}

export const Variants: Story = {
  name: "Варианты",
  render: () => <AllVariantsDemo />,
};

export const Minimal: Story = {
  name: "Минимальный",
  args: {
    children: "Текст по умолчанию (span)",
  },
};
