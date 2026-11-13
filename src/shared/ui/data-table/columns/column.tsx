import { Children, isValidElement, type ReactNode } from "react";
import type { DataTableColumnNode, DataTableColumnProps } from "../types";

const COLUMN_MARK = "dmc-data-table-column";

export function DataTableColumn<T>(_props: DataTableColumnProps<T>) {
  return null;
}
DataTableColumn.displayName = COLUMN_MARK;

export function readColumns<T>(children: ReactNode): DataTableColumnNode<T>[] {
  const columns: DataTableColumnNode<T>[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const type = child.type as { displayName?: string };
    if (type.displayName !== COLUMN_MARK && child.type !== DataTableColumn) return;
    const props = child.props as DataTableColumnProps<T>;
    columns.push({ ...props, nested: readColumns<T>(props.children) });
  });
  return columns;
}
