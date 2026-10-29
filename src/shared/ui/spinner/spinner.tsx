import { cls } from "../../lib";
import { SpinnerBase, type SpinnerColor } from "./spinner-base";

export type SpinnerProps = {
  size?: string | number;
  thickness?: string | number;
  color?: SpinnerColor;
  className?: string;
};

/** Material-style круговой индикатор загрузки. */
export function Spinner({ size = "1em", thickness = 5, color, className }: SpinnerProps) {
  return (
    <SpinnerBase
      className={cls("dmc-spinner--mat", className)}
      size={size}
      color={color}
      viewBox="25 25 50 50"
    >
      <circle
        className="dmc-spinner__path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth={thickness}
        strokeMiterlimit={10}
      />
    </SpinnerBase>
  );
}
