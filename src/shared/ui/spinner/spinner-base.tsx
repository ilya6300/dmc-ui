import type { CSSProperties, ReactNode, SVGAttributes } from "react";
import { cls } from "../../lib";
import "./spinner.css";

export type SpinnerColor = "primary" | "secondary" | "success" | "error" | "warning";

export type SpinnerVariantProps = {
  size?: string | number;
  color?: SpinnerColor;
  className?: string;
};

export type SpinnerBaseProps = Omit<SVGAttributes<SVGSVGElement>, "color"> & {
  children?: ReactNode;
  className?: string;
  size?: string | number;
  color?: SpinnerColor;
  viewBox?: string;
  style?: CSSProperties;
};

/** Общая SVG-обёртка для вариантов Spinner. */
export function SpinnerBase({
  children,
  className,
  size = "1em",
  color,
  viewBox = "0 0 100 100",
  style,
  ...props
}: SpinnerBaseProps) {
  return (
    <svg
      {...props}
      className={cls("dmc-spinner", color ? `dmc-spinner--${color}` : undefined, className)}
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-hidden={props["aria-label"] || props["aria-labelledby"] ? undefined : true}
      style={style}
    >
      {children}
    </svg>
  );
}
