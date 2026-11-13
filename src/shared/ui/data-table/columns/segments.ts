import type { DataTableColumnNode, DataTableColumnProps, DataTableLeaf, DataTableSegment } from "../types";
import { headerText } from "./text";

function isDataField(field?: string): field is string {
  return Boolean(field) && !field!.startsWith(".");
}

function toLeaf<T>(column: DataTableColumnNode<T>, segmentId: string): DataTableLeaf<T> {
  return {
    field: column.field!,
    header: column.header ?? column.field!,
    source: column,
    segmentId,
  };
}

export function collectLeaves<T>(columns: DataTableColumnNode<T>[]): DataTableLeaf<T>[] {
  return collectSegments(columns).flatMap((segment) => segment.leaves);
}

export function collectSegments<T>(columns: DataTableColumnNode<T>[]): DataTableSegment<T>[] {
  const segments: DataTableSegment<T>[] = [];
  columns.forEach((column, index) => {
    const dataChildren = column.nested.filter((child) => isDataField(child.field));
    const headerChildren = column.nested.filter((child) => !isDataField(child.field));
    if (dataChildren.length > 0) {
      const id = column.field ?? `group:${index}:${headerText(column.header, String(index))}`;
      segments.push({
        id,
        kind: "group",
        header: column.header ?? "",
        source: column,
        leaves: dataChildren.map((child) => toLeaf(child, id)),
        subheaders: [],
      });
      return;
    }
    if (column.field && headerChildren.length > 0) {
      segments.push({
        id: column.field,
        kind: "split",
        header: column.header ?? column.field,
        source: column,
        leaves: [toLeaf(column, column.field)],
        subheaders: headerChildren.map((child) => child.header ?? child.field ?? ""),
      });
      return;
    }
    if (isDataField(column.field)) {
      segments.push({
        id: column.field,
        kind: "leaf",
        header: column.header ?? column.field,
        source: column,
        leaves: [toLeaf(column, column.field)],
        subheaders: [],
      });
    }
  });
  return segments;
}

export function segmentSpan<T>(segment: DataTableSegment<T>): number {
  if (segment.kind === "split") return Math.max(1, segment.subheaders.length);
  return Math.max(1, segment.leaves.length);
}

export function orderSegments<T>(segments: DataTableSegment<T>[], segmentOrder: string[], fieldOrder: string[]): DataTableSegment<T>[] {
  const map = new Map(segments.map((segment) => [segment.id, segment]));
  const used = segmentOrder.filter((id) => map.has(id));
  const rest = segments.map((segment) => segment.id).filter((id) => !used.includes(id));
  return [...used, ...rest].map((id) => {
    const segment = map.get(id)!;
    if (segment.kind !== "group") return segment;
    return { ...segment, leaves: orderLeaves(segment.leaves, fieldOrder) };
  });
}

export function presentSegments<T>(segments: DataTableSegment<T>[], hidden: string[]): DataTableSegment<T>[] {
  return segments.flatMap((segment) => {
    if (segment.kind === "split") {
      const field = segment.leaves[0]?.field;
      if (!field || hidden.includes(field)) return [];
      return [segment];
    }
    const leaves = segment.leaves.filter((leaf) => !hidden.includes(leaf.field));
    if (leaves.length === 0) return [];
    return [{ ...segment, leaves }];
  });
}

export function orderLeaves<T>(leaves: DataTableLeaf<T>[], order: string[]): DataTableLeaf<T>[] {
  const map = new Map(leaves.map((leaf) => [leaf.field, leaf]));
  const used = order.filter((field) => map.has(field));
  const rest = leaves.map((leaf) => leaf.field).filter((field) => !used.includes(field));
  return [...used, ...rest].map((field) => map.get(field)!);
}
