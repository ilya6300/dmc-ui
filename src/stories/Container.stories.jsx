import { Box, Container, Main, tokens } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

const flexControl = {
  control: "select",
  options: ["start", "end", "center", "stretch", "between", "around", "evenly"],
};

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Container",
  component: Container,
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
Flex-обёртка: по умолчанию строка (\`direction="row"\`), колонка — \`direction="col"\`. Выравнивание по главной и поперечной оси — ключи \`start\`, \`end\`, \`center\`, \`between\` (распределение по сторонам) и др.

${ROOT_NOTE}

${importBlock("Container", "Main")}

**Состав:** \`children\` — содержимое; опционально \`direction\` (\`row\` | \`col\`, по умолчанию \`row\`), \`justify\`, \`align\`, \`gap\`, \`w\`, \`style\`.

\`\`\`jsx
<Container direction="row" justify="between" gap={12}>
  <Box w="120px">A</Box>
  <Box w="120px">B</Box>
</Container>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    direction: {
      description: "Главная ось: `row` (строка, по умолчанию) или `col` (колонка).",
      control: "select",
      options: ["row", "col"],
    },
    justify: { description: "Выравнивание по главной оси (`justify-content`).", ...flexControl },
    align: { description: "Выравнивание по поперечной оси (`align-items`).", ...flexControl },
    gap: { description: "Расстояние между детьми (px или CSS-строка)." },
    w: { description: "Ширина контейнера; по умолчанию `100%`." },
    children: { control: false },
    style: { control: false },
  },
};

export default meta;

const demoBox = (label) => (
  <Box w="auto" style={{ padding: 12, minWidth: 72 }}>
    <span style={{ fontSize: 14, color: tokens.textMuted }}>{label}</span>
  </Box>
);

export const Default = {
  name: "Строка",
  render: () => (
    <Container>
      {demoBox("1")}
      {demoBox("2")}
    </Container>
  ),
};

export const Column = {
  name: "Колонка",
  render: () => (
    <Container direction="col">
      {demoBox("1")}
      {demoBox("2")}
    </Container>
  ),
};

export const RowBetween = {
  name: "Строка, расход по сторонам",
  render: () => (
    <Container direction="row" justify="between">
      {demoBox("Слева")}
      {demoBox("Справа")}
    </Container>
  ),
};

export const Minimal = {
  name: "Минимальный",
  render: () => <Container>Только текст</Container>,
};
