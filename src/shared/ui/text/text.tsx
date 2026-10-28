import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const TEXT_BASE: CSSProperties = { fontFamily: "inherit" };

const VARIANTS = {
  subt: { tag: "span", style: { fontSize: 15, fontWeight: 600 } },
  title: { tag: "span", style: { fontSize: 24, fontWeight: 700 } },
  p: { tag: "p", style: { fontSize: 14, fontWeight: 400, margin: 0 } },
  li: { tag: "li", style: { fontSize: 14, fontWeight: 400 } },
  span: { tag: "span", style: { fontSize: 14, fontWeight: 400 } },
} as const satisfies Record<string, { tag: "span" | "p" | "li"; style: CSSProperties }>;

export type TextVariant = keyof typeof VARIANTS;

export type TextProps = {
  children?: ReactNode;
  variant?: TextVariant;
  color?: string;
  style?: CSSProperties;
};

function resolveVariant(variant: string): TextVariant {
  return Object.hasOwn(VARIANTS, variant) ? (variant as TextVariant) : "span";
}

/** Типографический текст с вариантами оформления. */
export function Text({ children, variant = "span", color, style }: TextProps) {
  const { colors } = useTheme();
  const { tag: Tag, style: variantStyle } = VARIANTS[resolveVariant(variant)];

  const textStyle = mergeStyle(
    TEXT_BASE,
    { color: color ?? colors.textPrimary },
    variantStyle,
    style,
  );

  return <Tag style={textStyle}>{children}</Tag>;
}
