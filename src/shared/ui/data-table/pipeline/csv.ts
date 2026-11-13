import type { ReactNode } from "react";
import { cellText, headerText } from "../columns/text";

function csvCell(value: string): string {
  if (/[",\n;]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function toCsv<T extends object>(rows: T[], columns: Array<{ field: string; header: ReactNode }>): string {
  const head = columns.map((column) => csvCell(headerText(column.header, column.field))).join(",");
  const body = rows.map((row) => columns.map((column) => csvCell(cellText(row, column.field))).join(","));
  return [head, ...body].join("\n");
}
