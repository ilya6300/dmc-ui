import type { DataTableColumnProps, DataTableCompareOp, DataTableFilterValue } from "../types";
import { cellText } from "../columns/text";

export function compareDraft(value: DataTableFilterValue | undefined): { op: DataTableCompareOp; value: string } {
  if (value && isCompare(value)) return { op: value.op, value: String(value.value) };
  return { op: "eq", value: "" };
}

function isCompare(value: DataTableFilterValue): value is { op: DataTableCompareOp; value: string } {
  if (!value || Array.isArray(value) || typeof value !== "object" || !("op" in value)) return false;
  return value.op === "gt" || value.op === "lt" || value.op === "gte" || value.op === "lte" || value.op === "eq";
}

function isEmptyFilter(value: DataTableFilterValue): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if ("op" in value && "value" in value) return String(value.value).trim() === "";
  return Object.keys(value).length === 0;
}

function matchFilter<T extends object>(
  text: string,
  row: T,
  column: DataTableColumnProps<T>,
  filter: DataTableFilterValue,
): boolean {
  if (column.onFilter) return column.onFilter(filter, row);
  const kind = column.filter?.type ?? "search";
  if (kind === "search" || typeof filter === "string") {
    const query = typeof filter === "string" ? filter.trim() : "";
    const operator = column.filter?.type === "search" ? (column.filter.operator ?? "contains") : "contains";
    if (operator === "equals") return text === query;
    return text.toLowerCase().includes(query.toLowerCase());
  }
  if (kind === "compare" && isCompare(filter)) {
    const left = Number(text);
    const right = Number(filter.value);
    if (!Number.isFinite(left) || !Number.isFinite(right)) return false;
    switch (filter.op) {
      case "gt":
        return left > right;
      case "lt":
        return left < right;
      case "gte":
        return left >= right;
      case "lte":
        return left <= right;
      case "eq":
        return left === right;
      default: {
        const unreachable: never = filter.op;
        return unreachable;
      }
    }
  }
  if (kind === "select" && Array.isArray(filter)) {
    const raw = (row as Record<string, unknown>)[column.field ?? ""];
    return filter.some((option) => option === raw || String(option) === text);
  }
  return true;
}

export function filterRows<T extends object>(
  rows: Array<{ row: T; index: number }>,
  columns: DataTableColumnProps<T>[],
  filters: Record<string, DataTableFilterValue | undefined>,
): Array<{ row: T; index: number }> {
  const active = columns.filter((column) => {
    if (!column.field) return false;
    const value = filters[column.field];
    return value != null && !isEmptyFilter(value);
  });
  if (active.length === 0) return rows;
  return rows.filter((item) =>
    active.every((column) =>
      matchFilter(cellText(item.row, column.field!), item.row, column, filters[column.field!]!),
    ),
  );
}
