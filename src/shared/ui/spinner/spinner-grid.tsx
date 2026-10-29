import { SpinnerBase, type SpinnerVariantProps } from "./spinner-base";

const CELLS: Array<[number, number, string, string | undefined]> = [
  [12.5, 12.5, "0s", undefined],
  [12.5, 52.5, "100ms", ".5"],
  [52.5, 12.5, "300ms", undefined],
  [52.5, 52.5, "600ms", undefined],
  [92.5, 12.5, "800ms", undefined],
  [92.5, 52.5, "400ms", undefined],
  [12.5, 92.5, "700ms", undefined],
  [52.5, 92.5, "500ms", undefined],
  [92.5, 92.5, "200ms", undefined],
];

export function SpinnerGrid({ size = "1em", color, className }: SpinnerVariantProps) {
  return (
    <SpinnerBase
      color={color}
      size={size}
      className={className}
      viewBox="0 0 105 105"
      fill="currentColor"
    >
      {CELLS.map(([cx, cy, begin, fillOpacity]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="12.5" fillOpacity={fillOpacity}>
          <animate
            attributeName="fill-opacity"
            begin={begin}
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </SpinnerBase>
  );
}
