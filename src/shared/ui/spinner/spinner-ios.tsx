import { SpinnerBase, type SpinnerVariantProps } from "./spinner-base";

export type { SpinnerVariantProps };

export function SpinnerIos({ size = "1em", color, className }: SpinnerVariantProps) {
  return (
    <SpinnerBase
      size={size}
      color={color}
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      stroke="currentColor"
    >
      <g strokeWidth="4" strokeLinecap="round">
        {[
          ["180", "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"],
          ["210", "0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0"],
          ["240", ".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1"],
          ["270", ".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15"],
          ["300", ".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25"],
          ["330", ".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35"],
          ["0", ".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45"],
          ["30", ".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55"],
          ["60", ".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65"],
          ["90", ".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7"],
          ["120", ".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85"],
          ["150", "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"],
        ].map(([rotate, values]) => (
          <line key={rotate} y1="17" y2="29" transform={`translate(32,32) rotate(${rotate})`}>
            <animate
              attributeName="stroke-opacity"
              dur="750ms"
              values={values}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>
    </SpinnerBase>
  );
}
