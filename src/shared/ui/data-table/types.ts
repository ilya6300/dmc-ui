import type { MouseEvent, ReactNode } from "react";

export type DataTableAlign = "left" | "center" | "right";

export type DataTableCompareOp = "gt" | "lt" | "gte" | "lte" | "eq";

export type DataTableFilterValue =
  | string
  | { op: DataTableCompareOp; value: string }
  | Array<string | number | boolean>
  | Record<string, unknown>
  | null;

export type DataTableFilterDropdownProps = {
  selectedKeys: DataTableFilterValue[];
  setSelectedKeys: (keys: DataTableFilterValue[]) => void;
  confirm: () => void;
  clearFilters: () => void;
  close: () => void;
};

export type DataTableFilter<T> =
  | { type: "search"; operator?: "contains" | "equals"; placeholder?: string }
  | { type: "compare"; operators?: DataTableCompareOp[]; valueType?: "number" | "date" }
  | {
      type: "select";
      multiple?: boolean;
      filters: Array<{ text: ReactNode; value: string | number | boolean }>;
    }
  | { type: "custom"; filterDropdown: (props: DataTableFilterDropdownProps) => ReactNode };

export type DataTableColumnProps<T> = {
  field?: string;
  header?: ReactNode;
  body?: (row: T, column: DataTableColumnProps<T>) => ReactNode;
  editor?: (
    row: T,
    column: DataTableColumnProps<T>,
    onChange: (value: unknown) => void,
    onSave: () => void,
  ) => ReactNode;
  footer?: ReactNode;
  align?: DataTableAlign;
  width?: number;
  sortable?: boolean;
  toggleable?: boolean;
  filterable?: boolean;
  filter?: DataTableFilter<T>;
  onFilter?: (value: DataTableFilterValue, row: T) => boolean;
  resizable?: boolean;
  draggable?: boolean;
  ellipsis?: boolean;
  grouped?: boolean;
  group?: boolean;
  actions?: boolean;
  actionsMenu?: boolean;
  actionsAt?: "start" | "end";
  children?: ReactNode;
};

export type DataTableColumnNode<T> = DataTableColumnProps<T> & {
  nested: DataTableColumnNode<T>[];
};

export type DataTableLeaf<T> = {
  field: string;
  header: ReactNode;
  source: DataTableColumnProps<T>;
  segmentId: string;
};

export type DataTableSegment<T> = {
  id: string;
  kind: "leaf" | "group" | "split";
  header: ReactNode;
  source: DataTableColumnProps<T>;
  leaves: DataTableLeaf<T>[];
  subheaders: ReactNode[];
};

export type DataTableSortRule = { key: string; descending: boolean };

export type DataTableGroupLayout = "default" | "group-first" | "grouped-first" | "unified";

export type DataTableNode<T> = {
  data: T;
  index: number | string;
  isParent: boolean;
  isChildren: boolean;
  nodes: DataTableNode<T>[];
  groupLevel: number;
  expandKey: string;
  label?: string;
};

export type DataTableRowEvents<T> = {
  onClick?: (event: MouseEvent, row: T, node: DataTableNode<T>) => void;
  onDoubleClick?: (event: MouseEvent, row: T, node: DataTableNode<T>) => void;
  onMouseEnter?: (event: MouseEvent, row: T, node: DataTableNode<T>) => void;
  onMouseLeave?: (event: MouseEvent, row: T, node: DataTableNode<T>) => void;
  onContextMenu?: (event: MouseEvent, row: T, node: DataTableNode<T>) => void;
};

export type DataTableRowAction<T> = {
  id: string;
  label: ReactNode;
  disabled?: boolean | ((node: DataTableNode<T>) => boolean);
  hidden?: boolean | ((node: DataTableNode<T>) => boolean);
  /** Встроенное редактирование строки — только при `editMode="row"` и колонках с `editor`. */
  edit?: boolean;
  /** Обработчик; не нужен при `edit: true`. */
  onClick?: (item: T, node: DataTableNode<T>) => void;
};

export type DataTableRowActionsPanelProps<T> = {
  node: DataTableNode<T>;
  actions: DataTableRowAction<T>[];
  /** Запускает редактирование строки (те же правила, что у действия с `edit: true`). */
  beginEdit?: (node: DataTableNode<T>) => void;
  /** Строка в режиме `editMode="row"`. */
  editingRow?: boolean;
  /** Сохранить правку текущей строки. */
  saveEdit?: () => void;
};

export type DataTableBulkContext<T> = {
  items: T[];
  indexes: Array<number | string>;
};

export type DataTableBulkAction<T> = {
  id: string;
  label: ReactNode;
  disabled?: boolean | ((context: DataTableBulkContext<T>) => boolean);
  hidden?: boolean | ((context: DataTableBulkContext<T>) => boolean);
  onClick: (context: DataTableBulkContext<T>) => void;
};

export type DataTablePageResult<T> = {
  data: T[];
  next: number | string;
  total?: number;
  pages?: number;
};

export type DataTableFetcher<T> = (input: {
  limit: number;
  page: number;
  filters?: Record<string, DataTableFilterValue | undefined>;
}) => Promise<DataTablePageResult<T>>;
