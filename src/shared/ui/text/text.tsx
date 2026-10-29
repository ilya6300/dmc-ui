import type { CSSProperties, ReactNode } from "react";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const VARIANTS = {
  subt: { tag: "span" },
  title: { tag: "span" },
  p: { tag: "p" },
  li: { tag: "li" },
  span: { tag: "span" },
} as const satisfies Record<string, { tag: "span" | "p" | "li" }>;

export type TextVariant = keyof typeof VARIANTS;

export type TextProps = {
  children?: ReactNode;
  variant?: TextVariant;
  color?: string;
  size?: SizeName;
  style?: CSSProperties;
};

function resolveVariant(variant: string): TextVariant {
  return Object.hasOwn(VARIANTS, variant) ? (variant as TextVariant) : "span";
}

/** Типографический текст с вариантами оформления. */
export function Text({ children, variant = "span", color, size, style }: TextProps) {
  const { colors } = useTheme();
  const key = resolveVariant(variant);
  const { tag: Tag } = VARIANTS[key];
  const resolvedSize = resolveSize(size);

  const textStyle = mergeStyle(color != null ? { color } : { color: colors.textPrimary }, style);

  return (
    <Tag
      className={cls("dmc-text")}
      data-dmc-variant={key}
      data-dmc-size={resolvedSize}
      style={textStyle}
    >
      {children}
    </Tag>
  );
}
