import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { MarkupTable, type MarkupTableBorders } from "./markup-table";
import type { SizeName } from "../theme-context/sizes";

const SIZES: SizeName[] = ["xs", "s", "m", "l", "xl"];
const BORDERS: MarkupTableBorders[] = ["none", "rows", "columns", "all"];

function Sample({
  caption,
  size,
  striped,
  hover,
  dense,
  borders,
  border,
  showTitle,
}: {
  caption?: ReactNode;
  size?: SizeName;
  striped?: boolean;
  hover?: boolean;
  dense?: boolean;
  borders?: MarkupTableBorders;
  border?: boolean;
  showTitle?: boolean;
}) {
  return (
    <MarkupTable size={size} striped={striped} hover={hover} dense={dense} borders={borders} border={border} showTitle={showTitle}>
      <MarkupTable.Table>
        {caption ? <MarkupTable.Caption>{caption}</MarkupTable.Caption> : null}
        <MarkupTable.Thead>
          <MarkupTable.Tr>
            <MarkupTable.Th>Имя</MarkupTable.Th>
            <MarkupTable.Th>Город</MarkupTable.Th>
            <MarkupTable.Th align="end">Сумма</MarkupTable.Th>
          </MarkupTable.Tr>
        </MarkupTable.Thead>
        <MarkupTable.Tbody>
          <MarkupTable.Tr>
            <MarkupTable.Td>
              {showTitle ? <MarkupTable.CellTitle>Имя</MarkupTable.CellTitle> : null}
              Альфа
            </MarkupTable.Td>
            <MarkupTable.Td>
              {showTitle ? <MarkupTable.CellTitle>Город</MarkupTable.CellTitle> : null}
              Москва
            </MarkupTable.Td>
            <MarkupTable.Td align="end">
              {showTitle ? <MarkupTable.CellTitle>Сумма</MarkupTable.CellTitle> : null}
              120
            </MarkupTable.Td>
          </MarkupTable.Tr>
          <MarkupTable.Tr>
            <MarkupTable.Td>Бета</MarkupTable.Td>
            <MarkupTable.Td>Казань</MarkupTable.Td>
            <MarkupTable.Td align="end">80</MarkupTable.Td>
          </MarkupTable.Tr>
        </MarkupTable.Tbody>
      </MarkupTable.Table>
    </MarkupTable>
  );
}

const meta = {
  title: "Design System/MarkupTable",
  component: MarkupTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Семантическая разметка таблицы: размер, границы, зебра, hover и цвет ячеек. Записи, сортировка и фильтры остаются в DataTable.

${ROOT_NOTE}

${importBlock("MarkupTable")}

**Обязательно:** \`MarkupTable\`, \`MarkupTable.Table\`, строка \`Tr\` и ячейка \`Td\` или \`Th\`.

**Можно не передавать:** \`Caption\`, \`Thead\`, \`Tbody\`, \`Tfoot\`, \`Col\`, \`CellTitle\`, \`size\` (по умолчанию \`m\`), \`striped\`, \`hover\`, \`dense\`, \`borders\` / \`rowBorder\` / \`colBorder\` / \`border\`, \`showTitle\`, \`layout\`, \`stickyHeader\`, \`style\`.

**Можно добавить:** у \`Table\`, \`Tr\`, \`Th\` и \`Td\` — \`bg\` и \`c\` (токен \`surface\`, \`primary\` или CSS-цвет). \`CellTitle\` виден при \`showTitle\`.

\`\`\`jsx
<MarkupTable striped hover borders="rows">
  <MarkupTable.Table>
    <MarkupTable.Caption>Сотрудники</MarkupTable.Caption>
    <MarkupTable.Thead>
      <MarkupTable.Tr>
        <MarkupTable.Th>Имя</MarkupTable.Th>
        <MarkupTable.Th align="end">Сумма</MarkupTable.Th>
      </MarkupTable.Tr>
    </MarkupTable.Thead>
    <MarkupTable.Tbody>
      <MarkupTable.Tr>
        <MarkupTable.Td>Альфа</MarkupTable.Td>
        <MarkupTable.Td align="end">120</MarkupTable.Td>
      </MarkupTable.Tr>
    </MarkupTable.Tbody>
  </MarkupTable.Table>
</MarkupTable>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      description: "Шкала xs, s, m (по умолчанию), l, xl. Меняет padding и font через data-dmc-size.",
      control: "select",
      options: ["xs", "s", "m", "l", "xl"],
    },
    striped: { description: "Зебра: чётные строки тела чуть темнее поверхности." },
    hover: { description: "Подсветка строки тела при наведении." },
    dense: { description: "Меньший вертикальный padding ячеек." },
    borders: {
      description: "Краткая форма границ, если rowBorder, colBorder и border не заданы: none, rows, columns, all.",
      control: "select",
      options: ["none", "rows", "columns", "all"],
    },
    rowBorder: { description: "Линия между строками. Если задан, перекрывает borders." },
    colBorder: { description: "Линия между колонками. Если задан, перекрывает borders." },
    border: { description: "Внешняя рамка таблицы. Если задан, перекрывает borders." },
    showTitle: { description: "Показывает MarkupTable.CellTitle внутри ячеек." },
    layout: {
      description: "CSS table-layout: fixed (по умолчанию) или auto.",
      control: "select",
      options: ["fixed", "auto"],
    },
    stickyHeader: { description: "Липкая шапка. true или { top: number } в пикселях." },
    style: { control: false, description: "Inline-стиль корня, перекрывает CSS." },
  },
} satisfies Meta<typeof MarkupTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Базовая",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable striped hover borders="rows">
  <MarkupTable.Table>
    <MarkupTable.Caption>Сотрудники</MarkupTable.Caption>
    <MarkupTable.Thead>
      <MarkupTable.Tr>
        <MarkupTable.Th>Имя</MarkupTable.Th>
        <MarkupTable.Th>Город</MarkupTable.Th>
        <MarkupTable.Th align="end">Сумма</MarkupTable.Th>
      </MarkupTable.Tr>
    </MarkupTable.Thead>
    <MarkupTable.Tbody>
      <MarkupTable.Tr>
        <MarkupTable.Td>Альфа</MarkupTable.Td>
        <MarkupTable.Td>Москва</MarkupTable.Td>
        <MarkupTable.Td align="end">120</MarkupTable.Td>
      </MarkupTable.Tr>
      <MarkupTable.Tr>
        <MarkupTable.Td>Бета</MarkupTable.Td>
        <MarkupTable.Td>Казань</MarkupTable.Td>
        <MarkupTable.Td align="end">80</MarkupTable.Td>
      </MarkupTable.Tr>
    </MarkupTable.Tbody>
  </MarkupTable.Table>
</MarkupTable>`,
      },
    },
  },
  render: () => <Sample caption="Сотрудники" striped hover borders="rows" />,
};

export const Minimal: Story = {
  name: "Минимальный",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable>
  <MarkupTable.Table>
    <MarkupTable.Tbody>
      <MarkupTable.Tr>
        <MarkupTable.Td>Ячейка</MarkupTable.Td>
      </MarkupTable.Tr>
    </MarkupTable.Tbody>
  </MarkupTable.Table>
</MarkupTable>`,
      },
    },
  },
  render: () => (
    <MarkupTable>
      <MarkupTable.Table>
        <MarkupTable.Tbody>
          <MarkupTable.Tr>
            <MarkupTable.Td>Ячейка</MarkupTable.Td>
          </MarkupTable.Tr>
        </MarkupTable.Tbody>
      </MarkupTable.Table>
    </MarkupTable>
  ),
};

export const Sizes: Story = {
  name: "Размеры",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable size="xs" striped hover borders="rows">{/* … */}</MarkupTable>
<MarkupTable size="s" striped hover borders="rows">{/* … */}</MarkupTable>
<MarkupTable size="m" striped hover borders="rows">{/* … */}</MarkupTable>
<MarkupTable size="l" striped hover borders="rows">{/* … */}</MarkupTable>
<MarkupTable size="xl" striped hover borders="rows">{/* … */}</MarkupTable>`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {SIZES.map((size) => (
        <Sample key={size} caption={size} size={size} striped hover borders="rows" />
      ))}
    </div>
  ),
};

export const Borders: Story = {
  name: "Границы",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable borders="none">{/* … */}</MarkupTable>
<MarkupTable borders="rows">{/* … */}</MarkupTable>
<MarkupTable borders="columns">{/* … */}</MarkupTable>
<MarkupTable borders="all">{/* … */}</MarkupTable>
<MarkupTable borders="none" border>{/* внешняя рамка */}</MarkupTable>`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {BORDERS.map((borders) => (
        <Sample key={borders} caption={borders} borders={borders} />
      ))}
      <Sample caption="border" borders="none" border />
    </div>
  ),
};

export const Dense: Story = {
  name: "Плотная",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable dense striped hover borders="rows">
  <MarkupTable.Table>{/* … */}</MarkupTable.Table>
</MarkupTable>`,
      },
    },
  },
  render: () => <Sample caption="dense" dense striped hover borders="rows" />,
};

export const Titles: Story = {
  name: "Подписи ячеек",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable showTitle borders="rows">
  <MarkupTable.Table>
    <MarkupTable.Tbody>
      <MarkupTable.Tr>
        <MarkupTable.Td>
          <MarkupTable.CellTitle>Имя</MarkupTable.CellTitle>
          Альфа
        </MarkupTable.Td>
      </MarkupTable.Tr>
    </MarkupTable.Tbody>
  </MarkupTable.Table>
</MarkupTable>`,
      },
    },
  },
  render: () => <Sample caption="showTitle" showTitle borders="rows" />,
};

export const Colors: Story = {
  name: "Цвет",
  parameters: {
    docs: {
      source: {
        code: `<MarkupTable borders="rows">
  <MarkupTable.Table>
    <MarkupTable.Tbody>
      <MarkupTable.Tr bg="surface" c="primary">
        <MarkupTable.Td>Бета</MarkupTable.Td>
        <MarkupTable.Td align="end" bg="primary" c="surface">80</MarkupTable.Td>
      </MarkupTable.Tr>
    </MarkupTable.Tbody>
  </MarkupTable.Table>
</MarkupTable>`,
      },
    },
  },
  render: () => (
    <MarkupTable borders="rows">
      <MarkupTable.Table>
        <MarkupTable.Caption>Цвет строки и ячейки</MarkupTable.Caption>
        <MarkupTable.Thead>
          <MarkupTable.Tr>
            <MarkupTable.Th>Имя</MarkupTable.Th>
            <MarkupTable.Th>Город</MarkupTable.Th>
            <MarkupTable.Th align="end">Сумма</MarkupTable.Th>
          </MarkupTable.Tr>
        </MarkupTable.Thead>
        <MarkupTable.Tbody>
          <MarkupTable.Tr bg="surface" c="primary">
            <MarkupTable.Td>Бета</MarkupTable.Td>
            <MarkupTable.Td>Казань</MarkupTable.Td>
            <MarkupTable.Td align="end" bg="primary" c="surface">
              80
            </MarkupTable.Td>
          </MarkupTable.Tr>
        </MarkupTable.Tbody>
      </MarkupTable.Table>
    </MarkupTable>
  ),
};
