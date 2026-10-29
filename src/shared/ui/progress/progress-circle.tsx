import { useId, type CSSProperties, type ReactNode } from "react";
import { cls } from "../../lib";
import type { ProgressColor } from "./progress-bar";
import "./progress.css";

export type ProgressCircleProps = {
  children?: ReactNode;
  className?: string;
  value?: number | string;
  buffer?: number | string;
  color?: ProgressColor;
  label?: boolean;
  indeterminate?: boolean;
  size?: number;
  thickness?: number;
  reverse?: boolean;
  /** Рамка вокруг круга (круглая). */
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

/** Круговой индикатор прогресса. */
export function ProgressCircle({
  children,
  className,
  value,
  buffer,
  color,
  label = false,
  indeterminate = false,
  size = 128,
  thickness = 5,
  reverse = false,
  border = false,
  style,
}: ProgressCircleProps) {
  const gradientId = useId().replace(/:/g, "");
  const safeSize = size > 0 ? size : 128;
  const safeThickness = thickness > 0 ? thickness : 5;
  const radius = safeSize / 2 - safeThickness / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = clampPercent(value);
  const normalizedBuffer = clampPercent(buffer);
  const strokeDashOffset = ((100 - normalizedValue) / 100) * circumference;
  const strokeDashOffsetBuffer = ((100 - normalizedBuffer) / 100) * circumference;
  const diameter = (radius / (1 - safeThickness / safeSize)) * 2;
  const strokeWidth = (safeThickness / safeSize) * diameter;
  const offsetSign = reverse ? "-" : "";

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : normalizedValue}
      style={{ width: diameter, height: diameter, ...style }}
      className={cls(
        "dmc-progress-circular",
        color ? `dmc-progress-circular--${color}` : undefined,
        indeterminate ? "dmc-progress-circular--indeterminate" : undefined,
        reverse ? "dmc-progress-circular--reverse" : undefined,
        border ? "dmc-progress-circular--border" : undefined,
        className,
      )}
    >
      <svg
        style={{ transform: "rotate(-90deg)" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <defs>
          <linearGradient id={gradientId || "dmc-progress-gradient"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--dmc-color-primary)" />
            <stop offset="25%" stopColor="var(--dmc-color-secondary)" />
            <stop offset="50%" stopColor="var(--dmc-color-success)" />
            <stop offset="75%" stopColor="var(--dmc-color-warning)" />
            <stop offset="100%" stopColor="var(--dmc-color-error)" />
          </linearGradient>
        </defs>
        <circle
          className="dmc-progress-circular__underlay"
          fill="transparent"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={
            offsetSign + (!indeterminate ? strokeDashOffsetBuffer : 0)
          }
        />
        <circle
          className="dmc-progress-circular__overlay"
          fill="transparent"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetSign + strokeDashOffset}
          style={
            color === "gradient"
              ? { stroke: `url(#${gradientId || "dmc-progress-gradient"})` }
              : undefined
          }
        />
      </svg>
      {children ? <div className="dmc-progress-circular__label">{children}</div> : null}
      {!indeterminate && !children && label ? (
        <div className="dmc-progress-circular__label">{normalizedValue}%</div>
      ) : null}
    </div>
  );
}
