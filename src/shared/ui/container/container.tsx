import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Unstyled, type Align, type Justify } from "../../internal";
import { mergeStyle } from "../tokens";

export type ContainerFlex =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "between"
  | "around"
  | "evenly";

export type ContainerDirection = "row" | "col";

const JUSTIFIES = new Set<ContainerFlex>([
  "start",
  "end",
  "center",
  "stretch",
  "between",
  "around",
  "evenly",
]);

const ALIGNS = new Set<Align>(["start", "end", "center", "stretch"]);

const ALIGN_SPACE = {
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
} as const satisfies Record<string, CSSProperties["alignItems"]>;

function resolveJustify(key: string | undefined): Justify {
  return JUSTIFIES.has(key as ContainerFlex) ? (key as Justify) : "start";
}

function resolveAlign(key: string | undefined): {
  align?: Align;
  alignItems?: CSSProperties["alignItems"];
} {
  if (key === "between" || key === "around" || key === "evenly") {
    return { alignItems: ALIGN_SPACE[key] };
  }
  if (ALIGNS.has(key as Align)) {
    return { align: key as Align };
  }
  return { align: "stretch" };
}

type FlexOptions = {
  direction?: ContainerDirection;
  justify?: ContainerFlex;
  align?: ContainerFlex;
  gap?: CSSProperties["gap"];
  w?: string;
};

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  FlexOptions & {
    children?: ReactNode;
    style?: CSSProperties;
  };

/** Flex-строка или колонка для группировки контента. Раскладка через Unstyled. */
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
  const resolvedAlign = resolveAlign(align);

  return (
    <Unstyled
      {...rest}
      d="flex"
      wrap="wrap"
      dir={direction === "col" ? "column" : "row"}
      justify={resolveJustify(justify)}
      align={resolvedAlign.align}
      gap={gap}
      w={w ?? "100%"}
      c="primary"
      style={mergeStyle(
        { boxSizing: "border-box" },
        resolvedAlign.alignItems ? { alignItems: resolvedAlign.alignItems } : undefined,
        style,
      )}
    >
      {children}
    </Unstyled>
  );
}
