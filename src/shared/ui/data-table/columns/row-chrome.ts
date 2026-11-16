import type { DataTableLeaf, DataTableSegment } from "../types";
import { segmentSpan } from "./segments";

export function partitionActionLeaves<T>(ordered: DataTableLeaf<T>[], rowActionsAt: "start" | "end") {
  const actionLeaves = ordered.filter((leaf) => leaf.source.actions);
  const actionLeavesStart = actionLeaves.filter((leaf) => (leaf.source.actionsAt ?? rowActionsAt) === "start");
  const actionLeavesEnd = actionLeaves.filter((leaf) => (leaf.source.actionsAt ?? rowActionsAt) === "end");
  const dataLeaves = ordered.filter((leaf) => !leaf.source.actions);
  return { dataLeaves, actionLeavesStart, actionLeavesEnd };
}

export function dataSegmentsWithoutActions<T>(segments: DataTableSegment<T>[]): DataTableSegment<T>[] {
  return segments.flatMap((segment) => {
    const leaves = segment.leaves.filter((leaf) => !leaf.source.actions);
    if (leaves.length === 0) return [];
    return [{ ...segment, leaves }];
  });
}

export function dataColumnsSpan<T>(segments: DataTableSegment<T>[]): number {
  return dataSegmentsWithoutActions(segments).reduce((sum, segment) => sum + segmentSpan(segment), 0);
}