import type { ReactNode } from "react";

export const DATA_TABLE_BREAKPOINTS = {
  xs: "36em",
  s: "48em",
  m: "62em",
  l: "75em",
  xl: "88em",
} as const;

export type DataTableBreakpoint = keyof typeof DATA_TABLE_BREAKPOINTS;

export function breakpointQuery(value: string): string {
  const width = value in DATA_TABLE_BREAKPOINTS ? DATA_TABLE_BREAKPOINTS[value as DataTableBreakpoint] : value;
  return `(max-width: ${width})`;
}

export function headerText(header: ReactNode, field: string): string {
  if (typeof header === "string" || typeof header === "number") return String(header);
  return field;
}

export function cellText<T extends object>(row: T, field: string): string {
  const value = (row as Record<string, unknown>)[field];
  if (value == null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
