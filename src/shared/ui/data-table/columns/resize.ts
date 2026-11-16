const MIN_COLUMN_WIDTH = 80;

/** Парный resize: текущая колонка ±δ, соседняя справа ∓δ (как в prototype Table). */
export function applyColumnResizePair(
  startWidth: number,
  nextStartWidth: number,
  deltaX: number,
  minWidth = MIN_COLUMN_WIDTH,
): { width: number; nextWidth: number } {
  const maxShrinkCurrent = startWidth - minWidth;
  const maxShrinkNext = nextStartWidth - minWidth;
  const constrainedDelta = Math.max(-maxShrinkCurrent, Math.min(deltaX, maxShrinkNext));
  return {
    width: startWidth + constrainedDelta,
    nextWidth: nextStartWidth - constrainedDelta,
  };
}

export { MIN_COLUMN_WIDTH };