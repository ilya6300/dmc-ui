import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { Unstyled } from "../../internal";
import { mergeStyle } from "../theme-context/tokens";

export type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  children?: ReactNode;
  style?: CSSProperties;
  title?: ReactNode;
  w?: string;
  shadow?: number;
  as?: ElementType;
};

/** Карточка контента. Раскладка через Unstyled, тема — CSS-переменные. */
export function Box({
  children,
  style,
  title,
  w,
  shadow = 12,
  as: Tag = "div",
  ...rest
}: BoxProps) {
  return (
    <Unstyled
      {...rest}
      as={Tag}
      d="flex"
      dir="column"
      justify="start"
      gap={10}
      p={24}
      w={w ?? "100%"}
      bg="surface"
      c="var(--dmc-color-text-primary)"
      bd="1px solid var(--dmc-color-border)"
      style={mergeStyle(
        {
          boxSizing: "border-box",
          borderRadius: 12,
          boxShadow:
            shadow === 0 ? "none" : `0 4px ${shadow}px var(--dmc-card-shadow-color)`,
        },
        style,
      )}
    >
      {title ? (
        <Unstyled as="span" fz={16} c="secondary" style={{ fontWeight: 600 }}>
          {title}
        </Unstyled>
      ) : null}
      {children}
    </Unstyled>
  );
}
