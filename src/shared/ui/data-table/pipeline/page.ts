export function paginateRows<T>(rows: T[], page: number, limit: number): T[] {
  const size = limit > 0 ? limit : rows.length || 1;
  const start = Math.max(0, page - 1) * size;
  return rows.slice(start, start + size);
}

export function windowRows<T>(
  rows: T[],
  scrollTop: number,
  height: number,
  rowHeight: number,
): { items: T[]; padTop: number; padBottom: number } {
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const count = Math.ceil(height / rowHeight) + 4;
  const items = rows.slice(start, start + count);
  return {
    items,
    padTop: start * rowHeight,
    padBottom: Math.max(0, (rows.length - start - items.length) * rowHeight),
  };
}
