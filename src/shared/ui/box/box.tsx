import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { getCardShadow } from "../themes";
import { mergeStyle } from "../tokens";

const BOX_BASE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 10,
  borderRadius: 12,
  padding: 24,
  boxSizing: "border-box",
};

const TITLE_BASE: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
};

export type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  children?: ReactNode;
  style?: CSSProperties;
  title?: ReactNode;
  w?: string;
  shadow?: number;
  as?: ElementType;
};

/** Карточка контента — inline-стили в компоненте. */
export function Box({
  children,
  style,
  title,
  w,
  shadow = 12,
  as: Tag = "div",
  ...rest
}: BoxProps) {
  const { colors } = useTheme();

  return (
    <Tag
      style={mergeStyle(
        BOX_BASE,
        {
          width: w ?? "100%",
          backgroundColor: colors.bgCard,
          boxShadow: getCardShadow(colors, shadow),
          border: colors.borderLight,
          color: colors.textPrimary,
        },
        style,
      )}
      {...rest}
    >
      {title ? (
        <span style={mergeStyle(TITLE_BASE, { color: colors.mastBlue })}>
          {title}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
