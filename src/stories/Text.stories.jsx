import React from "react";
import { Main, SIZE_KEYS, Text, useTheme } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Text",
  component: Text,
  tags: ["autodocs"],
  render: (args) => <Text {...args} />,
  args: { size: "m" },
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

**Состав:** обязательно \`children\`; опционально \`variant\` (\`subt\` | \`title\` | \`p\` | \`li\` | \`span\`, по умолчанию \`span\`), \`size\` (\`xs\` … \`xl\`), \`color\`, \`style\`.

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
    size: { options: SIZE_KEYS, control: "select" },
    style: { control: false, description: "Дополнительные inline-стили." },
  },
};

export default meta;

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

export const Variants = {
  name: "Варианты",
  render: () => <AllVariantsDemo />,
};

export const Minimal = {
  name: "Минимальный",
  args: {
    children: "Текст по умолчанию (span)",
  },
};

export const SizeScale = {
  name: "Размеры",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {SIZE_KEYS.map((size) => (
        <Text key={size} size={size} variant="p">
          size={size} — абзац
        </Text>
      ))}
    </div>
  ),
};
