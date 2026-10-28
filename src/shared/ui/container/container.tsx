import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const CONTAINER_BASE: CSSProperties = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap",
};

const FLEX = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
} as const;

export type ContainerFlex = keyof typeof FLEX;

function resolveFlex(key: string | undefined, fallback: ContainerFlex): string {
  return FLEX[key as ContainerFlex] ?? FLEX[fallback];
}

const DIRECTIONS = {
  row: "row",
  col: "column",
} as const;

export type ContainerDirection = keyof typeof DIRECTIONS;

function flexDirectionFrom(direction: string | undefined): CSSProperties["flexDirection"] {
  return DIRECTIONS[direction as ContainerDirection] ?? "row";
}

type FlexOptions = {
  direction?: ContainerDirection;
  justify?: ContainerFlex;
  align?: ContainerFlex;
  gap?: CSSProperties["gap"];
  w?: string;
};

function containerFlexStyle({ direction, justify, align, gap, w }: FlexOptions): CSSProperties {
  return {
    flexDirection: flexDirectionFrom(direction),
    justifyContent: resolveFlex(justify, "start"),
    alignItems: resolveFlex(align, "stretch"),
    gap,
    width: w ?? "100%",
  };
}

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  FlexOptions & {
    children?: ReactNode;
    style?: CSSProperties;
  };

/** Flex-строка или колонка для группировки контента (отступы и gap по умолчанию). */
export function Container({
  children,
  style,
  w,
  direction = "row",
  justify = "start",
  align = "stretch",
  gap = 10,
  ...rest
}: ContainerProps) {
  const { colors } = useTheme();

  return (
    <div
      style={mergeStyle(
        CONTAINER_BASE,
        containerFlexStyle({ direction, justify, align, gap, w }),
        { color: colors.textPrimary },
        style,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
