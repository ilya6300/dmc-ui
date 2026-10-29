import type { CSSProperties, ReactNode } from "react";
import { cls } from "../../lib";
import "./progress.css";

export type ProgressColor = "primary" | "secondary" | "success" | "error" | "warning" | "gradient";

export type ProgressBarProps = {
  children?: ReactNode;
  className?: string;
  value?: number | string;
  buffer?: number | string;
  color?: ProgressColor;
  label?: boolean;
  stripe?: boolean;
  animation?: boolean;
  indeterminate?: boolean;
  thickness?: number | string;
  reverse?: boolean;
  /** Рамка вокруг полосы (прямоугольная). */
  border?: boolean;
  style?: CSSProperties;
};

function clampPercent(value: number | string | undefined): number {
  const next = Number.parseFloat(String(value ?? 0));
  if (!Number.isFinite(next)) {
    return 0;
  }
  return Math.max(0, Math.min(100, next));
}

/** Линейный индикатор прогресса. */
export function ProgressBar({
  children,
  className,
  value,
  buffer,
  color,
  label = false,
  stripe = false,
  animation = false,
  indeterminate = false,
  thickness = 4,
  reverse = false,
  border = false,
  style,
}: ProgressBarProps) {
  const normalizedValue = clampPercent(value);
  const normalizedBuffer = clampPercent(buffer);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : normalizedValue}
      className={cls(
        "dmc-progress-bar",
        color ? `dmc-progress-bar--${color}` : undefined,
        !indeterminate && stripe ? "dmc-progress-bar--stripe" : undefined,
        !indeterminate && animation ? "dmc-progress-bar--animation" : undefined,
        indeterminate ? "dmc-progress-bar--indeterminate" : undefined,
        reverse ? "dmc-progress-bar--reverse" : undefined,
        border ? "dmc-progress-bar--border" : undefined,
        className,
      )}
      style={{ height: thickness, ...style }}
    >
      <div
        className="dmc-progress-bar__track"
        style={{
          width: buffer != null && !indeterminate ? `${normalizedBuffer}%` : undefined,
        }}
      />
      <div
        className="dmc-progress-bar__value"
        style={{
          width: value != null && !indeterminate ? `${normalizedValue}%` : undefined,
        }}
      />
      {!indeterminate && children ? <div className="dmc-progress-bar__label">{children}</div> : null}
      {!indeterminate && !children && label ? (
        <div className="dmc-progress-bar__label">{normalizedValue}%</div>
      ) : null}
    </div>
  );
}
