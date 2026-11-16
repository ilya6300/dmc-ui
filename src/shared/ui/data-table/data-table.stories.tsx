import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState, type ReactNode } from "react";
import { importBlock, ROOT_NOTE } from "../../../stories/docsFragments";
import { Button } from "../button";
import { Input } from "../input";
import { Main } from "../main";
import { useTheme } from "../theme-context";
import { DataTable } from "./data-table";
import type { DataTableColumnProps, DataTableRowAction, DataTableRowActionsPanelProps } from "./types";

type MultiGroupRow = { region: string; category: string; status: string; name: string; amount: number };
type UnifiedRow = { department: string; employee: string; role: string; salary: number };
type NestedItem = { warehouse?: string; zone?: string; product: string; sku: string; qty: number };
type CombinedRow = NestedItem & { items: NestedItem[] };
type ActionRow = { id: number; name: string; role: string };
type CellEditRow = { name: string; qty: number };
type ElementRow = { position: number; mass: number; symbol: string; name: string; group?: ElementRow[] };

const multiGroupData: MultiGroupRow[] = [
  { region: "Европа", category: "Электроника", status: "active", name: "Телефон A", amount: 120 },
  { region: "Европа", category: "Электроника", status: "draft", name: "Планшет X", amount: 210 },
  { region: "Европа", category: "Одежда", status: "archived", name: "Шарф", amount: 12 },
  { region: "Азия", category: "Электроника", status: "active", name: "Ноутбук Pro", amount: 890 },
  { region: "Азия", category: "Мебель", status: "active", name: "Стул", amount: 65 },
  { region: "Америка", category: "Одежда", status: "draft", name: "Футболка", amount: 25 },
];

const unifiedData: UnifiedRow[] = [
  { department: "Разработка", employee: "Иванов А.", role: "Team Lead", salary: 185000 },
  { department: "Разработка", employee: "Петров Б.", role: "Middle", salary: 145000 },
  { department: "Маркетинг", employee: "Новикова Е.", role: "Head", salary: 156000 },
  { department: "Продажи", employee: "Морозов К.", role: "Manager", salary: 112000 },
];

const combinedData: CombinedRow[] = [
  {
    warehouse: "Склад A",
    zone: "Z-1",
    product: "Ноутбук Pro",
    sku: "NB-PRO",
    qty: 12,
    items: [
      { product: "RAM 16GB", sku: "RAM-16", qty: 12 },
      { product: "SSD 512GB", sku: "SSD-512", qty: 12 },
    ],
  },
  {
    warehouse: "Склад A",
    zone: "Z-2",
    product: "Клавиатура",
    sku: "KB-01",
    qty: 24,
    items: [],
  },
  {
    warehouse: "Склад B",
    zone: "Z-1",
    product: "Стул офисный",
    sku: "CHR-01",
    qty: 15,
    items: [{ product: "Подлокотники", sku: "ARM-01", qty: 15 }],
  },
];

const actionSeed: ActionRow[] = [
  { id: 1, name: "Анна К.", role: "Менеджер" },
  { id: 2, name: "Борис Л.", role: "Разработчик" },
  { id: 3, name: "Вера М.", role: "Аналитик" },
];

const cellEditSeed: CellEditRow[] = [
  { name: "Болт M8", qty: 120 },
  { name: "Гайка M8", qty: 340 },
  { name: "Шайба 8", qty: 500 },
];

const elementRows: ElementRow[] = [
  {
    position: 6,
    mass: 12.011,
    symbol: "C",
    name: "Carbon",
    group: [
      { position: 8, mass: 15.999, symbol: "O", name: "Oxygen" },
      { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    ],
  },
  {
    position: 7,
    mass: 14.007,
    symbol: "N",
    name: "Nitrogen",
    group: [{ position: 6, mass: 12.011, symbol: "C", name: "Carbon" }],
  },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
];

function StorySection({ title, description, children }: { title: string; description?: ReactNode; children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <section style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <h3 style={{ margin: 0, color: colors.textPrimary }}>{title}</h3>
        {description ? <p style={{ margin: "4px 0 0", color: colors.textSecondary }}>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Sections({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>{children}</div>;
}

function StatusText({ status }: { status: string }) {
  const { colors } = useTheme();
  const color = status === "active" ? colors.success : status === "draft" ? colors.warning : colors.textMuted;
  return <span style={{ color }}>{status}</span>;
}

function editorField<T extends Record<string, unknown>>(
  item: T,
  column: DataTableColumnProps<T>,
  onChange: (value: unknown) => void,
  onSave: () => void,
  numeric: boolean,
) {
  const field = column.field ?? "";
  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Enter") onSave();
      }}
    >
      <Input
        aria-label={String(column.header ?? field)}
        type={numeric ? "number" : "text"}
        defaultValue={String(item[field] ?? "")}
        onChange={(event) => onChange(numeric ? Number(event.target.value) : event.target.value)}
      />
    </div>
  );
}

function elementEditor(item: ElementRow, column: DataTableColumnProps<ElementRow>, onChange: (value: unknown) => void, onSave: () => void) {
  return editorField(item, column, onChange, onSave, column.field === "position" || column.field === "mass");
}

function cellEditor(item: CellEditRow, column: DataTableColumnProps<CellEditRow>, onChange: (value: unknown) => void, onSave: () => void) {
  return editorField(item, column, onChange, onSave, column.field === "qty");
}

function ActionsPanel({ node, actions, beginEdit, editingRow, saveEdit }: DataTableRowActionsPanelProps<ActionRow>) {
  const { colors } = useTheme();
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: colors.textSecondary }}>#{node.data.id}</span>
      {actions.map((action) =>
        editingRow && action.edit ? (
          <Button
            key="save"
            type="button"
            variant="text"
            onClick={(event) => {
              event.stopPropagation();
              saveEdit?.();
            }}
          >
            Сохранить
          </Button>
        ) : (
          <Button
            key={action.id}
            type="button"
            variant="text"
            onClick={(event) => {
              event.stopPropagation();
              if (action.edit) {
                beginEdit?.(node);
                return;
              }
              action.onClick?.(node.data, node);
            }}
          >
            {action.label}
          </Button>
        ),
      )}
      {editingRow && !actions.some((action) => action.edit) ? (
        <Button
          type="button"
          variant="text"
          onClick={(event) => {
            event.stopPropagation();
            saveEdit?.();
          }}
        >
          Сохранить
        </Button>
      ) : null}
    </span>
  );
}

function actionNameEditor(item: ActionRow, column: DataTableColumnProps<ActionRow>, onChange: (value: unknown) => void) {
  return (
    <input
      aria-label={`edit-${column.field}`}
      value={String((item as Record<string, unknown>)[column.field!] ?? "")}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function useActionRows() {
  const [rows, setRows] = useState(actionSeed);
  const rowActions = useMemo<DataTableRowAction<ActionRow>[]>(
    () => [
      { id: "edit", label: "Изменить", edit: true },
      {
        id: "delete",
        label: "Удалить",
        onClick: (_item, node) => {
          setRows((current) => current.filter((_row, index) => index !== Number(node.index)));
        },
      },
    ],
    [],
  );
  return { rows, rowActions };
}

const meta = {
  title: "Design System/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Main style={{ padding: 24 }}>
        <Story />
      </Main>
    ),
  ],
  argTypes: {
    data: { description: "Строки или функция загрузки страницы.", control: false },
    children: { description: "Колонки DataTable.Column.", control: false },
    noDataText: { description: "Текст пустого состояния." },
    loading: { description: "Показать строку загрузки." },
    error: { description: "Сообщение об ошибке вместо строк.", control: false },
    limit: { description: "Начальный размер страницы." },
    limits: { description: "Варианты размера страницы." },
    page: { description: "Номер страницы с 1." },
    storage: { description: "Ключ localStorage. Состояния колонок, фильтров, сортировки, ширин и выбора пишутся с префиксом ключа." },
    breakpoint: { description: "Порог карточек: xs, s, m, l, xl или CSS-длина. Ниже порога таблица становится карточками." },
    selectable: { description: "Колонка выбора: start или end.", options: ["start", "end"], control: "radio" },
    groupKeys: { description: "Ключи группировки строк. Если не задан, берутся колонки с grouped." },
    groupLayout: {
      description:
        "Legacy-раскладка. Канон: только grouped — та же таблица; group — вложенная таблица; group+grouped — группировка + вложенная таблица.",
    },
    groupAt: { description: "Кнопка раскрытия группы в ячейке колонки уровня: start или end.", options: ["start", "end"], control: "radio" },
    editMode: { description: "Редактирование ячейки или строки; вход по двойному клику.", options: ["cell", "row"], control: "radio" },
    multiSort: { description: "Клик по заголовкам добавляет поле в цепочку сортировки (без Shift)." },
    onRow: { description: "События строки: onClick, onDoubleClick, onMouseEnter, onMouseLeave, onContextMenu.", control: false },
    rowActions: { description: "Действия строки (редактирование, удаление и т.п.).", control: false },
    rowActionsPanel: { description: "Свой блок вместо кнопок действий.", control: false },
    rowActionsOnHover: {
      description: "Панель при наведении, если нет колонки actions. По умолчанию true при rowActions без actions-колонки.",
    },
    rowActionsAt: { description: "Сторона hover-слота или выравнивания actions-колонки (fallback для actionsAt).", options: ["start", "end"], control: "radio" },
    withExcelExport: { description: "Кнопка скачивания CSV." },
    markup: {
      control: false,
      description: "Оформление MarkupTable: size, striped, hover, dense, borders, rowBorder, colBorder, border, showTitle, layout, stickyHeader.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Таблица данных: колонки через \`DataTable.Column\`, сортировка, фильтр, страницы, выбор строк, группы заголовков, группировка строк, действия строки и карточки по \`breakpoint\`.

**group / grouped:** только \`grouped\` — та же таблица, смещение в колонке уровня; только \`group\` — вложенная таблица из \`field\` с колонками родителя; \`group\`+\`grouped\` — группировка + вложенная таблица.

${ROOT_NOTE}

${importBlock("DataTable", "Main")}

**Состав:** \`data\` обязателен. Опционально \`storage\`, \`breakpoint\`, \`layout\`, \`onRow\`, \`groupKeys\`, \`groupAt\`, \`editMode\`, \`multiSort\`, \`rowActions\`, \`rowActionsPanel\`, \`selectable\`, \`withExcelExport\`, \`markup\`.

При \`multiSort\` каждый клик по sortable-заголовку добавляет поле в цепочку (⇅ → ▲ → ▼ → снять). Редактирование — двойной клик по ячейке (\`editMode="cell"\`) или по строке (\`editMode="row"\`). \`onRow\` вешается на строки таблицы и карточки; тот же объект передаётся в \`layout({ nodes, columns, onRow })\`.

Оформление таблицы — \`markup\`: размер, зебра, границы, \`dense\`, \`stickyHeader\` (свойства MarkupTable). По умолчанию зебра, hover и границы строк.

В заголовке колонки название слева; sort (⇅ / ▲ / ▼), filter, hide и drag-handle (⠿) — справа. Перетаскивание колонки только за handle.

**Действия строки:** \`rowActions\` — список кнопок. Для встроенного редактирования — \`{ edit: true }\` при \`editMode="row"\` и \`editor\` на колонках. Три режима отображения: (1) hover — без колонки \`actions\`, панель в нулевом hover-слоте при наведении; (2) колонка \`actions\` + \`rowActionsOnHover={false}\`, позиция по порядку колонок и \`actionsAt\` (или \`rowActionsAt\`); (3) \`actionsMenu\` — выпадающее меню в колонке. Слева порядок: выбор → actions/hover → данные; справа: данные → hover/actions → выбор.

\`\`\`jsx
<DataTable data={rows} limit={15} storage="orders" breakpoint="s" selectable="start">
  <DataTable.Column field="name" header="Название" sortable filterable toggleable />
  <DataTable.Column field="amount" header="Сумма" align="right" sortable />
</DataTable>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Базовая таблица",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows.slice(0, 5)} storage="storybook.table.basic" withPagination={false}>
  <DataTable.Column field="name" header="Название" sortable resizable />
  <DataTable.Column field="amount" header="Сумма" sortable align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <DataTable data={multiGroupData.slice(0, 5)} storage="storybook.table.basic" withPagination={false}>
      <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable resizable />
      <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" sortable align="right" />
    </DataTable>
  ),
};

export const Minimal: Story = {
  name: "Минимальный",
  args: { data: [{ name: "Альфа" }] },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={[{ name: "Альфа" }]}>
  <DataTable.Column field="name" header="Название" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <DataTable data={[{ name: "Альфа" }]}>
      <DataTable.Column field="name" header="Название" />
    </DataTable>
  ),
};

export const GroupColumns: Story = {
  name: "Группировка колонок",
  args: { data: elementRows },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} storage="storybook.table.group-columns" limit={50}>
  <DataTable.Column field=".groupMeta" header="Group" align="center" draggable>
    <DataTable.Column group field="group" />
    <DataTable.Column draggable field="position" header="Element position" />
    <DataTable.Column draggable field="name" header="Element name" />
  </DataTable.Column>
  <DataTable.Column field=".symbolMeta" header="Symbol" align="center" draggable>
    <DataTable.Column field=".symbol1" header="Symbol 1" align="center" />
    <DataTable.Column field=".symbol2" header="Symbol 2" align="center" />
  </DataTable.Column>
  <DataTable.Column draggable field="mass" header="Atomic mass" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Группировка колонок">
      <DataTable data={elementRows} storage="storybook.table.group-columns" limit={50}>
        <DataTable.Column<ElementRow> field=".groupMeta" header="Group" align="center" draggable>
          <DataTable.Column<ElementRow> group field="group" />
          <DataTable.Column<ElementRow> draggable field="position" header="Element position" />
          <DataTable.Column<ElementRow> draggable field="name" header="Element name" />
        </DataTable.Column>
        <DataTable.Column<ElementRow> field=".symbolMeta" header="Symbol" align="center" draggable>
          <DataTable.Column<ElementRow> field=".symbol1" header="Symbol 1" align="center" />
          <DataTable.Column<ElementRow> field=".symbol2" header="Symbol 2" align="center" />
        </DataTable.Column>
        <DataTable.Column<ElementRow> draggable field="mass" header="Atomic mass" />
      </DataTable>
    </StorySection>
  ),
};

export const GroupRows: Story = {
  name: "Группа строк",
  args: { data: elementRows },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} storage="storybook.table.group-rows" limit={50}>
  <DataTable.Column group field="group" />
  <DataTable.Column resizable draggable field="position" header="Element position" />
  <DataTable.Column draggable resizable field="name" header="Element name" />
  <DataTable.Column draggable resizable toggleable field="symbol" header="Symbol" />
  <DataTable.Column draggable resizable toggleable field="mass" header="Atomic mass" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection
      title="Группа"
      description="Только group: данные из ячейки field, раскрытие — вложенная таблица с колонками родителя."
    >
      <DataTable data={elementRows} storage="storybook.table.group-rows" limit={50}>
        <DataTable.Column<ElementRow> group field="group" />
        <DataTable.Column<ElementRow> resizable draggable field="position" header="Element position" />
        <DataTable.Column<ElementRow> draggable resizable field="name" header="Element name" />
        <DataTable.Column<ElementRow> draggable resizable toggleable field="symbol" header="Symbol" />
        <DataTable.Column<ElementRow> draggable resizable toggleable field="mass" header="Atomic mass" />
      </DataTable>
    </StorySection>
  ),
};

export const MultiGrouped: Story = {
  name: "Мульти-группировка",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} storage="storybook.table.multi-group" limit={50}>
  <DataTable.Column field="region" grouped header="Регион" />
  <DataTable.Column field="category" grouped header="Категория" />
  <DataTable.Column field="status" grouped header="Статус" />
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="amount" header="Сумма" sortable align="right" />
</DataTable>

<DataTable data={rows} storage="storybook.table.multi-group-end" limit={50} groupAt="end">
  <DataTable.Column field="region" grouped header="Регион" />
  <DataTable.Column field="category" grouped header="Категория" />
  <DataTable.Column field="status" grouped header="Статус" />
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="amount" header="Сумма" sortable align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <Sections>
      <StorySection
        title="3 уровня: region, category, status"
        description="Только grouped: та же таблица; матрица отступов по колонкам (level1: 1 0 0…, level2: 2 1 0…)."
      >
        <DataTable data={multiGroupData} storage="storybook.table.multi-group" limit={50}>
          <DataTable.Column<MultiGroupRow> field="region" grouped header="Регион" />
          <DataTable.Column<MultiGroupRow> field="category" grouped header="Категория" />
          <DataTable.Column<MultiGroupRow> field="status" grouped header="Статус" />
          <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
          <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" sortable align="right" />
        </DataTable>
      </StorySection>
      <StorySection title='3 уровня с groupAt="end"'>
        <DataTable data={multiGroupData} storage="storybook.table.multi-group-end" limit={50} groupAt="end">
          <DataTable.Column<MultiGroupRow> field="region" grouped header="Регион" />
          <DataTable.Column<MultiGroupRow> field="category" grouped header="Категория" />
          <DataTable.Column<MultiGroupRow> field="status" grouped header="Статус" />
          <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
          <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" sortable align="right" />
        </DataTable>
      </StorySection>
    </Sections>
  ),
};

export const GroupAndGrouped: Story = {
  name: "group + grouped",
  args: { data: unifiedData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} groupAt="start" storage="storybook.table.group-grouped-unified" limit={50}>
  <DataTable.Column field="department" group grouped header="Отдел" />
  <DataTable.Column field="employee" header="Сотрудник" sortable />
  <DataTable.Column field="role" header="Должность" />
  <DataTable.Column field="salary" header="Зарплата" sortable align="right" />
</DataTable>

<DataTable data={rows} groupAt="start" storage="storybook.table.group-grouped-combined" limit={50}>
  <DataTable.Column field="items" group header="Комплектация" />
  <DataTable.Column field="warehouse" grouped header="Склад" />
  <DataTable.Column field="zone" grouped header="Зона" />
  <DataTable.Column field="product" header="Товар" sortable />
  <DataTable.Column field="sku" header="SKU" />
  <DataTable.Column field="qty" header="Кол-во" sortable align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <Sections>
      <StorySection
        title="group + grouped — одна колонка"
        description="grouped формирует узлы; group задаёт presentation — вложенная таблица с колонками родителя."
      >
        <DataTable data={unifiedData} groupAt="start" storage="storybook.table.group-grouped-unified" limit={50}>
          <DataTable.Column<UnifiedRow> field="department" group grouped header="Отдел" />
          <DataTable.Column<UnifiedRow> field="employee" header="Сотрудник" sortable />
          <DataTable.Column<UnifiedRow> field="role" header="Должность" />
          <DataTable.Column<UnifiedRow> field="salary" header="Зарплата" sortable align="right" />
        </DataTable>
      </StorySection>
      <StorySection
        title="group и grouped — разные колонки"
        description="Независимо: warehouse/zone — inline grouped; items — вложенная таблица из ячейки."
      >
        <DataTable data={combinedData} groupAt="start" storage="storybook.table.group-grouped-combined" limit={50}>
          <DataTable.Column<CombinedRow> field="items" group header="Комплектация" />
          <DataTable.Column<CombinedRow> field="warehouse" grouped header="Склад" />
          <DataTable.Column<CombinedRow> field="zone" grouped header="Зона" />
          <DataTable.Column<CombinedRow> field="product" header="Товар" sortable />
          <DataTable.Column<CombinedRow> field="sku" header="SKU" />
          <DataTable.Column<CombinedRow> field="qty" header="Кол-во" sortable align="right" />
        </DataTable>
      </StorySection>
    </Sections>
  ),
};

export const MultiSort: Story = {
  name: "Мульти-сортировка",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} multiSort storage="storybook.table.multi-sort" limit={50}>
  <DataTable.Column field="region" header="Регион" sortable />
  <DataTable.Column field="category" header="Категория" sortable />
  <DataTable.Column field="status" header="Статус" sortable />
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="amount" header="Сумма" sortable align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Мульти-сортировка" description="Клик по заголовкам по очереди добавляет поля в цепочку сортировки.">
      <DataTable data={multiGroupData} multiSort storage="storybook.table.multi-sort" limit={50}>
        <DataTable.Column<MultiGroupRow> field="region" header="Регион" sortable />
        <DataTable.Column<MultiGroupRow> field="category" header="Категория" sortable />
        <DataTable.Column<MultiGroupRow> field="status" header="Статус" sortable />
        <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" sortable align="right" />
      </DataTable>
    </StorySection>
  ),
};

function RowEditDemo() {
  const [data, setData] = useState(elementRows);
  return (
    <DataTable
      data={data}
      editMode="row"
      breakpoint="s"
      groupAt="start"
      storage="storybook.table.edit"
      onRowEditComplete={(item, index) => setData((rows) => rows.map((row, i) => (i === index ? item : row)))}
    >
      <DataTable.Column<ElementRow> field="group" group header="" />
      <DataTable.Column<ElementRow> resizable editor={elementEditor} sortable field="position" header="Element position" />
      <DataTable.Column<ElementRow> resizable editor={elementEditor} sortable field="name" header="Element name" />
      <DataTable.Column<ElementRow> resizable editor={elementEditor} field="symbol" header="Symbol" />
      <DataTable.Column<ElementRow> resizable editor={elementEditor} field="mass" header="Atomic mass" />
    </DataTable>
  );
}

export const RowEdit: Story = {
  name: "Редактирование строк",
  args: { data: elementRows },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={rows}
  editMode="row"
  breakpoint="s"
  groupAt="start"
  storage="storybook.table.edit"
  onRowEditComplete={(item, index) => setRows((current) => current.map((row, i) => (i === index ? item : row)))}
>
  <DataTable.Column field="group" group header="" />
  <DataTable.Column resizable editor={editor} sortable field="position" header="Element position" />
  <DataTable.Column resizable editor={editor} sortable field="name" header="Element name" />
  <DataTable.Column resizable editor={editor} field="symbol" header="Symbol" />
  <DataTable.Column resizable editor={editor} field="mass" header="Atomic mass" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection
      title="Редактирование строк и вложенная группа"
      description="Двойной клик по строке открывает редактор; «Сохранить» в панели действий при наведении (или заменяет «Изменить»)."
    >
      <RowEditDemo />
    </StorySection>
  ),
};

function RowActionsHoverDemo() {
  const { rows, rowActions } = useActionRows();
  return (
    <DataTable data={rows} rowActions={rowActions} rowActionsPanel={ActionsPanel} rowActionsAt="end" selectable="start" storage="storybook.table.row-actions-hover" limit={50}>
      <DataTable.Column<ActionRow> field="name" header="Имя" sortable />
      <DataTable.Column<ActionRow> field="role" header="Роль" />
    </DataTable>
  );
}

function RowActionsColumnDemo() {
  const { rows, rowActions } = useActionRows();
  return (
    <DataTable data={rows} rowActions={rowActions} rowActionsOnHover={false} selectable="start" storage="storybook.table.row-actions-column" limit={50}>
      <DataTable.Column<ActionRow> field="name" header="Имя" sortable />
      <DataTable.Column<ActionRow> field="role" header="Роль" />
      <DataTable.Column<ActionRow> field="_actions" actions actionsAt="end" header="" width={160} />
    </DataTable>
  );
}

function RowActionsEditDemo() {
  const [rows, setRows] = useState(actionSeed);
  const rowActions = useMemo<DataTableRowAction<ActionRow>[]>(
    () => [
      { id: "edit", label: "Изменить", edit: true },
      {
        id: "delete",
        label: "Удалить",
        onClick: (_item, node) => {
          setRows((current) => current.filter((_row, index) => index !== Number(node.index)));
        },
      },
    ],
    [],
  );
  return (
    <DataTable
      data={rows}
      rowActions={rowActions}
      editMode="row"
      rowActionsOnHover={false}
      selectable="start"
      storage="storybook.table.row-actions-edit"
      limit={50}
      onRowEditComplete={(item, index) => setRows((current) => current.map((row, i) => (i === index ? item : row)))}
    >
      <DataTable.Column<ActionRow> field="name" header="Имя" sortable editor={actionNameEditor} />
      <DataTable.Column<ActionRow> field="role" header="Роль" editor={actionNameEditor} />
      <DataTable.Column<ActionRow> field="_actions" actions actionsAt="end" header="" width={160} />
    </DataTable>
  );
}

function RowActionsMenuDemo() {
  const { rows, rowActions } = useActionRows();
  return (
    <DataTable data={rows} rowActions={rowActions} rowActionsOnHover={false} selectable="start" storage="storybook.table.row-actions-menu" limit={50}>
      <DataTable.Column<ActionRow> field="_actions" align="left" actions actionsMenu actionsAt="start" header="" width={48} />
      <DataTable.Column<ActionRow> field="name" header="Имя" sortable />
      <DataTable.Column<ActionRow> field="role" header="Роль" />
    </DataTable>
  );
}

export const RowActions: Story = {
  name: "Действия со строкой",
  args: { data: actionSeed },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} rowActions={rowActions} rowActionsPanel={ActionsPanel} rowActionsAt="end" selectable="start" storage="storybook.table.row-actions-hover" limit={50}>
  <DataTable.Column field="name" header="Имя" sortable />
  <DataTable.Column field="role" header="Роль" />
</DataTable>

<DataTable data={rows} rowActions={rowActions} rowActionsOnHover={false} selectable="start" storage="storybook.table.row-actions-column" limit={50}>
  <DataTable.Column field="name" header="Имя" sortable />
  <DataTable.Column field="role" header="Роль" />
  <DataTable.Column field="_actions" actions actionsAt="end" header="" width={160} />
</DataTable>

<DataTable data={rows} rowActions={rowActions} rowActionsOnHover={false} selectable="start" storage="storybook.table.row-actions-menu" limit={50}>
  <DataTable.Column field="_actions" align="left" actions actionsMenu actionsAt="start" header="" width={48} />
  <DataTable.Column field="name" header="Имя" sortable />
  <DataTable.Column field="role" header="Роль" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <Sections>
      <StorySection title="Панель при наведении" description="Наведите на строку — справа появится блок действий.">
        <RowActionsHoverDemo />
      </StorySection>
      <StorySection title="Колонка действий">
        <RowActionsColumnDemo />
      </StorySection>
      <StorySection title="Колонка с меню">
        <RowActionsMenuDemo />
      </StorySection>
      <StorySection
        title="Изменить через rowActions"
        description='Действие с edit: true и editMode="row" открывает редакторы колонок. Без editMode или editor кнопка неактивна.'
      >
        <RowActionsEditDemo />
      </StorySection>
    </Sections>
  ),
};

export const CustomBody: Story = {
  name: "Кастомный body",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} storage="storybook.table.custom-body" limit={20}>
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="status" header="Статус" body={(item) => <StatusText status={item.status} />} />
  <DataTable.Column field="amount" header="Сумма" align="right" body={(item) => <span>{item.amount} ₽</span>} />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Кастомный body" description="Подпись статуса и сумма через body колонки.">
      <AmountTable />
    </StorySection>
  ),
};

function AmountTable() {
  const { colors } = useTheme();
  return (
    <DataTable data={multiGroupData.slice(0, 6)} storage="storybook.table.custom-body" limit={20}>
      <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
      <DataTable.Column<MultiGroupRow> field="status" header="Статус" body={(item) => <StatusText status={item.status} />} />
      <DataTable.Column<MultiGroupRow>
        field="amount"
        header="Сумма"
        align="right"
        body={(item) => <span style={{ color: colors.textPrimary, fontWeight: 600 }}>{item.amount.toLocaleString("ru-RU")} ₽</span>}
      />
    </DataTable>
  );
}

export const ColumnFeatures: Story = {
  name: "Колонки: resize, drag, toggle",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} storage="storybook.table.columns" limit={15}>
  <DataTable.Column field="region" header="Регион" sortable resizable draggable toggleable />
  <DataTable.Column field="category" header="Категория" sortable resizable draggable toggleable />
  <DataTable.Column field="name" header="Название" sortable resizable draggable />
  <DataTable.Column field="amount" header="Сумма" sortable resizable draggable toggleable align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Колонки: resize, drag, toggle">
      <DataTable data={multiGroupData} storage="storybook.table.columns" limit={15}>
        <DataTable.Column<MultiGroupRow> field="region" header="Регион" sortable resizable draggable toggleable />
        <DataTable.Column<MultiGroupRow> field="category" header="Категория" sortable resizable draggable toggleable />
        <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable resizable draggable />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" sortable resizable draggable toggleable align="right" />
      </DataTable>
    </StorySection>
  ),
};

function ControlledSelectionDemo() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<Array<number | string>>([]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <p style={{ margin: 0, color: colors.textSecondary }}>Выбрано: {selected.length ? selected.join(", ") : "—"}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="button" variant="outline" onClick={() => setSelected([])}>
          Сбросить
        </Button>
        <Button type="button" variant="outline" onClick={() => setSelected(actionSeed.map((_row, index) => index))}>
          Выбрать все
        </Button>
      </div>
      <DataTable data={actionSeed} selectable="start" selectedRows={selected} onSelectedRowsChange={setSelected} storage="storybook.table.controlled-select" limit={20}>
        <DataTable.Column<ActionRow> field="name" header="Имя" />
        <DataTable.Column<ActionRow> field="role" header="Роль" />
      </DataTable>
    </div>
  );
}

export const ControlledSelection: Story = {
  name: "Controlled selection",
  args: { data: actionSeed },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} selectable="start" selectedRows={selected} onSelectedRowsChange={setSelected} storage="storybook.table.controlled-select" limit={20}>
  <DataTable.Column field="name" header="Имя" />
  <DataTable.Column field="role" header="Роль" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Управляемый выбор">
      <ControlledSelectionDemo />
    </StorySection>
  ),
};

export const SelectableEnd: Story = {
  name: "Выделение справа",
  args: { data: actionSeed },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} selectable="end" storage="storybook.table.select-end" limit={20}>
  <DataTable.Column field="name" header="Имя" />
  <DataTable.Column field="role" header="Роль" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title='selectable="end"'>
      <DataTable data={actionSeed} selectable="end" storage="storybook.table.select-end" limit={20}>
        <DataTable.Column<ActionRow> field="name" header="Имя" />
        <DataTable.Column<ActionRow> field="role" header="Роль" />
      </DataTable>
    </StorySection>
  ),
};

function CellEditDemo() {
  const [data, setData] = useState(cellEditSeed);
  return (
    <DataTable
      data={data}
      editMode="cell"
      storage="storybook.table.cell-edit"
      onRowEditComplete={(item, index) => setData((rows) => rows.map((row, i) => (i === index ? item : row)))}
    >
      <DataTable.Column<CellEditRow> field="name" header="Наименование" editor={cellEditor} />
      <DataTable.Column<CellEditRow> field="qty" header="Кол-во" align="right" editor={cellEditor} />
    </DataTable>
  );
}

export const CellEdit: Story = {
  name: "editMode: cell",
  args: { data: cellEditSeed },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={rows}
  editMode="cell"
  storage="storybook.table.cell-edit"
  onRowEditComplete={(item, index) => setRows((current) => current.map((row, i) => (i === index ? item : row)))}
>
  <DataTable.Column field="name" header="Наименование" editor={editor} />
  <DataTable.Column field="qty" header="Кол-во" align="right" editor={editor} />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="editMode: cell" description="Двойной клик по ячейке с editor открывает поле. Enter сохраняет значение.">
      <CellEditDemo />
    </StorySection>
  ),
};

export const WithPagination: Story = {
  name: "Локальная пагинация",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} limit={5} limits={[5, 10, 20]} storage="storybook.table.pagination">
  <DataTable.Column field="region" header="Регион" sortable />
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="amount" header="Сумма" align="right" sortable />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Локальная пагинация">
      <DataTable data={multiGroupData} limit={5} limits={[5, 10, 20]} storage="storybook.table.pagination">
        <DataTable.Column<MultiGroupRow> field="region" header="Регион" sortable />
        <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" align="right" sortable />
      </DataTable>
    </StorySection>
  ),
};

export const GroupAtEnd: Story = {
  name: "groupAt: end",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} groupAt="end" storage="storybook.table.group-at-end" limit={20}>
  <DataTable.Column field="region" grouped header="Регион" />
  <DataTable.Column field="category" grouped header="Категория" />
  <DataTable.Column field="name" header="Название" />
  <DataTable.Column field="amount" header="Сумма" align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="groupAt: end">
      <DataTable data={multiGroupData.slice(0, 5)} groupAt="end" storage="storybook.table.group-at-end" limit={20}>
        <DataTable.Column<MultiGroupRow> field="region" grouped header="Регион" />
        <DataTable.Column<MultiGroupRow> field="category" grouped header="Категория" />
        <DataTable.Column<MultiGroupRow> field="name" header="Название" />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" align="right" />
      </DataTable>
    </StorySection>
  ),
};

function RowActionsStartDemo() {
  const { rows, rowActions } = useActionRows();
  return (
    <DataTable data={rows} rowActions={rowActions} rowActionsAt="start" storage="storybook.table.hover-start" limit={20}>
      <DataTable.Column<ActionRow> field="name" header="Имя" />
      <DataTable.Column<ActionRow> field="role" header="Роль" />
    </DataTable>
  );
}

export const RowActionsAtStart: Story = {
  name: "Действия слева",
  args: { data: actionSeed },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} rowActions={rowActions} rowActionsAt="start" storage="storybook.table.hover-start" limit={20}>
  <DataTable.Column field="name" header="Имя" />
  <DataTable.Column field="role" header="Роль" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title='rowActionsAt="start"'>
      <RowActionsStartDemo />
    </StorySection>
  ),
};

function StatesDemo() {
  const [state, setState] = useState<"empty" | "loading" | "error">("empty");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="button" variant={state === "empty" ? "filled" : "outline"} onClick={() => setState("empty")}>
          empty
        </Button>
        <Button type="button" variant={state === "loading" ? "filled" : "outline"} onClick={() => setState("loading")}>
          loading
        </Button>
        <Button type="button" variant={state === "error" ? "filled" : "outline"} onClick={() => setState("error")}>
          error
        </Button>
      </div>
      <DataTable
        data={[]}
        loading={state === "loading"}
        error={state === "error" ? "Не удалось загрузить данные" : undefined}
        noDataText="Нет записей для отображения"
        withPagination={false}
        storage="storybook.table.states"
      >
        <DataTable.Column<MultiGroupRow> field="name" header="Название" />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" />
      </DataTable>
    </div>
  );
}

export const States: Story = {
  name: "Состояния: empty, loading, error",
  args: { data: [] },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={[]}
  loading={state === "loading"}
  error={state === "error" ? "Не удалось загрузить данные" : undefined}
  noDataText="Нет записей для отображения"
  withPagination={false}
  storage="storybook.table.states"
>
  <DataTable.Column field="name" header="Название" />
  <DataTable.Column field="amount" header="Сумма" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Состояния">
      <StatesDemo />
    </StorySection>
  ),
};

export const Breakpoint: Story = {
  name: "Карточки",
  args: { data: unifiedData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={rows} breakpoint="m" storage="storybook.table.breakpoint" limit={20}>
  <DataTable.Column field="department" header="Отдел" />
  <DataTable.Column field="employee" header="Сотрудник" />
  <DataTable.Column field="salary" header="Зарплата" align="right" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <StorySection title="Карточки по breakpoint" description="Ниже порога m таблица переключается в карточки.">
      <DataTable data={unifiedData} breakpoint="m" storage="storybook.table.breakpoint" limit={20}>
        <DataTable.Column<UnifiedRow> field="department" header="Отдел" />
        <DataTable.Column<UnifiedRow> field="employee" header="Сотрудник" />
        <DataTable.Column<UnifiedRow> field="salary" header="Зарплата" align="right" />
      </DataTable>
    </StorySection>
  ),
};

export const Loading: Story = {
  name: "Загрузка",
  args: { data: [] },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={[]} loading withPagination={false} storage="storybook.table.loading">
  <DataTable.Column field="name" header="Название" />
  <DataTable.Column field="amount" header="Сумма" />
</DataTable>`,
      },
    },
  },
  render: () => (
    <DataTable data={[]} loading withPagination={false} storage="storybook.table.loading">
      <DataTable.Column<MultiGroupRow> field="name" header="Название" />
      <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" />
    </DataTable>
  ),
};

function AsyncFetchDemo() {
  const fetcher = useMemo(
    () => async ({ limit, page }: { limit: number; page: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const start = (page - 1) * limit;
      return {
        data: multiGroupData.slice(start, start + limit),
        next: start + limit < multiGroupData.length ? page + 1 : "",
        total: multiGroupData.length,
      };
    },
    [],
  );
  return (
    <StorySection title="Загрузка страницы">
      <DataTable data={fetcher} storage="storybook.table.fetch" limit={5} limits={[5, 10]}>
        <DataTable.Column<MultiGroupRow> field="region" header="Регион" sortable />
        <DataTable.Column<MultiGroupRow> field="name" header="Название" sortable />
        <DataTable.Column<MultiGroupRow> field="amount" header="Сумма" align="right" sortable />
      </DataTable>
    </StorySection>
  );
}

export const AsyncFetch: Story = {
  name: "Async fetch",
  args: { data: multiGroupData },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={fetcher} storage="storybook.table.fetch" limit={5} limits={[5, 10]}>
  <DataTable.Column field="region" header="Регион" sortable />
  <DataTable.Column field="name" header="Название" sortable />
  <DataTable.Column field="amount" header="Сумма" align="right" sortable />
</DataTable>`,
      },
    },
  },
  render: () => <AsyncFetchDemo />,
};
