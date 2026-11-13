import type { DataTableGroupLayout, DataTableNode } from "../types";
import { cellText } from "../columns/text";

export function groupNodes<T extends object>(
  rows: Array<{ row: T; index: number }>,
  keys: string[],
  level = 0,
): DataTableNode<T>[] {
  if (keys.length === 0) {
    return rows.map((item) => ({
      data: item.row,
      index: item.index,
      isParent: false,
      isChildren: level > 0,
      nodes: [],
      groupLevel: level,
      expandKey: String(item.index),
    }));
  }
  const [key, ...rest] = keys;
  const buckets = new Map<string, Array<{ row: T; index: number }>>();
  for (const item of rows) {
    const label = cellText(item.row, key);
    const bucket = buckets.get(label);
    if (bucket) bucket.push(item);
    else buckets.set(label, [item]);
  }
  return [...buckets.entries()].map(([label, bucket]) => ({
    data: bucket[0].row,
    index: `g:${key}:${label}`,
    isParent: true,
    isChildren: level > 0,
    nodes: groupNodes(bucket, rest, level + 1),
    groupLevel: level,
    expandKey: `${key}:${label}`,
    label,
  }));
}

export function leafNodes<T>(nodes: DataTableNode<T>[]): DataTableNode<T>[] {
  return nodes.flatMap((node) => (node.isParent ? leafNodes(node.nodes) : [node]));
}

export type NestedExpandKind = "group" | "grouped";

export type NestedExpandLayout = {
  padStart: number;
  padEnd: number;
  nestedColspan: number;
  leafOffset: number;
};

export type ExpandPresentation = "inline" | "nested-table";

/**
 * Presentation раскрытия grouped-уровня:
 * только grouped → inline (та же таблица);
 * group+grouped на колонке уровня / unified → nested-table.
 */
export function resolveGroupedPresentation(
  levelField: string | undefined,
  leaves: Array<{ field: string; source: { group?: boolean; grouped?: boolean } }>,
  groupLayout: DataTableGroupLayout = "default",
): ExpandPresentation {
  if (groupLayout === "unified") return "nested-table";
  if (!levelField) return "inline";
  const leaf = leaves.find((item) => item.field === levelField);
  if (leaf?.source.group && leaf.source.grouped) return "nested-table";
  return "inline";
}

/** Шаг отступа (px) в колонке уровня при inline-grouped. */
export const GROUPED_INDENT_STEP = 16;

export type GroupedInlineLayout = {
  /** Глубина раскрытия (1 = после первой группировки). */
  level: number;
};

/**
 * Матрица диагональных отступов (индекс leaf-колонки j, 0-based):
 * level 1: |1|0|0|…
 * level 2: |2|1|0|…
 * steps(j) = max(0, level - j)
 */
export function groupedInlineLayout(indentLevel: number): GroupedInlineLayout {
  return { level: Math.max(0, indentLevel) };
}

export function groupedIndentSteps(level: number, columnIndex: number): number {
  if (level <= 0 || columnIndex < 0) return 0;
  return Math.max(0, level - columnIndex);
}

export function groupedIndentPx(level: number, columnIndex: number): number {
  const steps = groupedIndentSteps(level, columnIndex);
  return steps > 0 ? 8 + steps * GROUPED_INDENT_STEP : 0;
}

/** Legacy helper: диагональный pad (для тестов совместимости; presentation канона — resolveGroupedPresentation). */
export function nestedExpandLayout(
  leafCount: number,
  expandIndex: number,
  groupAt: "start" | "end" = "start",
  kind: NestedExpandKind = "grouped",
): NestedExpandLayout {
  if (expandIndex < 0 || leafCount <= 0) {
    return { padStart: 0, padEnd: 0, nestedColspan: Math.max(leafCount, 0), leafOffset: 0 };
  }
  const offset = kind === "group" ? expandIndex + 1 : expandIndex;
  const leafOffset = Math.min(Math.max(offset, 0), leafCount);
  const nestedColspan = leafCount - leafOffset;
  if (groupAt === "end") {
    return { padStart: 0, padEnd: leafOffset, nestedColspan, leafOffset };
  }
  return { padStart: leafOffset, padEnd: 0, nestedColspan, leafOffset };
}
