import type { DataTableSortRule } from "../types";
import { cellText } from "../columns/text";

function compareText(left: string, right: string): number {
  const leftNum = Number(left);
  const rightNum = Number(right);
  if (left !== "" && right !== "" && Number.isFinite(leftNum) && Number.isFinite(rightNum)) {
    return leftNum - rightNum;
  }
  return left.localeCompare(right, "ru");
}

export function sortRows<T extends object>(
  rows: Array<{ row: T; index: number }>,
  rules: DataTableSortRule[],
): Array<{ row: T; index: number }> {
  if (rules.length === 0) return rows;
  const next = [...rows];
  next.sort((a, b) => {
    for (const rule of rules) {
      const cmp = compareText(cellText(a.row, rule.key), cellText(b.row, rule.key));
      if (cmp !== 0) return rule.descending ? -cmp : cmp;
    }
    return 0;
  });
  return next;
}

/** Цикл поля: нет → asc → desc → нет. */
export function nextSortRules(current: DataTableSortRule[], field: string, multi: boolean): DataTableSortRule[] {
  const existing = current.findIndex((rule) => rule.key === field);
  if (existing < 0) {
    const next = { key: field, descending: false };
    return multi ? [...current, next] : [next];
  }
  const rule = current[existing];
  if (!rule.descending) {
    const toggled = { key: field, descending: true };
    if (!multi) return [toggled];
    return current.map((item, index) => (index === existing ? toggled : item));
  }
  if (!multi) return [];
  return current.filter((_, index) => index !== existing);
}
