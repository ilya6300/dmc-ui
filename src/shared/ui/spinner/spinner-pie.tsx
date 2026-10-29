import { SpinnerBase, type SpinnerVariantProps } from "./spinner-base";

export function SpinnerPie({ size = "1em", color, className }: SpinnerVariantProps) {
  return (
    <SpinnerBase
      size={size}
      color={color}
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      preserveAspectRatio="xMidYMid"
    >
      {[
        ["M0 50A50 50 0 0 1 50 0L50 50L0 50", "0.8s"],
        ["M50 0A50 50 0 0 1 100 50L50 50L50 0", "1.6s"],
        ["M100 50A50 50 0 0 1 50 100L50 50L100 50", "2.4s"],
        ["M50 100A50 50 0 0 1 0 50L50 50L50 100", "3.2s"],
      ].map(([d, dur]) => (
        <path key={dur} d={d} fill="currentColor" opacity="0.5">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={dur}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </SpinnerBase>
  );
}
