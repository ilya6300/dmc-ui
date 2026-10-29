import { SpinnerBase, type SpinnerVariantProps } from "./spinner-base";

function CubeCell({
  x,
  y,
  opacity,
  begin,
}: {
  x: number;
  y: number;
  opacity: string;
  begin: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity={opacity}>
        <animateTransform
          attributeName="transform"
          type="scale"
          from="1.5"
          to="1"
          repeatCount="indefinite"
          begin={begin}
          dur="1s"
          calcMode="spline"
          keySplines="0.2 0.8 0.2 0.8"
          keyTimes="0;1"
        />
      </rect>
    </g>
  );
}

export function SpinnerCube({ size = "1em", color, className }: SpinnerVariantProps) {
  return (
    <SpinnerBase
      color={color}
      size={size}
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <rect x="0" y="0" width="100" height="100" fill="none" />
      <CubeCell x={25} y={25} opacity="0.9" begin="0s" />
      <CubeCell x={75} y={25} opacity="0.8" begin="0.1s" />
      <CubeCell x={25} y={75} opacity="0.7" begin="0.3s" />
      <CubeCell x={75} y={75} opacity="0.6" begin="0.2s" />
    </SpinnerBase>
  );
}
