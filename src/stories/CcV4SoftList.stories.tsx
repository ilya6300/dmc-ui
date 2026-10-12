import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  CcV4SoftList,
  CcV4SoftListBody,
  CcV4SoftListHeader,
  CcV4SoftListRow,
} from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

const GRID = "cc-v4-soft-grid company-list-grid";

const meta: Meta = {
  title: "CC-V4/SoftList",
  component: CcV4SoftList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Составной список v4: \`cc-v4-soft-list-root\`, заголовок колонок, тело и строки (\`cc-v4-soft-row\`).

${ROOT_NOTE}

### Импорт

${importBlock(
  "CcV4SoftList",
  "CcV4SoftListHeader",
  "CcV4SoftListBody",
  "CcV4SoftListRow",
  "Box",
)}

\`\`\`jsx
const GRID_CLASS = "cc-v4-soft-grid company-list-grid";

<CcV4SoftList>
  <CcV4SoftListHeader gridClass={GRID_CLASS} columns={[...]} />
  <CcV4SoftListBody className="company-list-body">
    <CcV4SoftListRow as={Link} gridClass={GRID_CLASS} to={url}>…</CcV4SoftListRow>
  </CcV4SoftListBody>
</CcV4SoftList>
\`\`\`

\`gridClass\` задаётся снаружи (разные сетки отчётов, софта, каталога).
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <Box withMainPage style={{ padding: 24 }}>
        <div className="card dash-card">
          <Story />
        </div>
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const ThreeColumns: Story = {
  name: "Три колонки",
  render: () => (
    <CcV4SoftList>
      <CcV4SoftListHeader
        gridClass={GRID}
        columns={[
          { key: "a", label: "Название" },
          { key: "b", label: "ИНН" },
          { key: "c", label: "Адрес" },
        ]}
      />
      <CcV4SoftListBody>
        <CcV4SoftListRow gridClass={GRID}>
          <span>ООО Пример</span>
          <span className="company-card-v4-mono">7700000000</span>
          <span>Москва</span>
        </CcV4SoftListRow>
      </CcV4SoftListBody>
    </CcV4SoftList>
  ),
};
