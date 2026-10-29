import { ProgressBar, type ProgressBarProps } from "./progress-bar";
import { ProgressCircle, type ProgressCircleProps } from "./progress-circle";

export type ProgressProps = ProgressBarProps &
  ProgressCircleProps & {
    type?: "bar" | "circle";
  };

/** Индикатор прогресса: линейный (`bar`) или круговой (`circle`). */
export function Progress({ type = "bar", ...props }: ProgressProps) {
  if (type === "circle") {
    return <ProgressCircle {...props} />;
  }
  return <ProgressBar {...props} />;
}
