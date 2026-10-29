import type { CSSProperties, ReactNode } from "react";
import { Unstyled, type Color } from "../../internal";
import { cls } from "../../lib";

const VARIANTS = {
  subt: { tag: "span" },
  title: { tag: "span" },
  p: { tag: "p" },
  li: { tag: "li" },
  span: { tag: "span" },
} as const satisfies Record<string, { tag: "span" | "p" | "li" }>;

export type TextVariant = keyof typeof VARIANTS;

type TextColor = Color | (string & {}) | number;
type TextFontSize = string | number;

export type TextProps = {
  children?: ReactNode;
  variant?: TextVariant;
  /** Синоним `c` — цвет текста (ключевое слово темы или CSS-значение). */
  color?: TextColor;
  c?: TextColor;
  /** Синоним `fz` — размер шрифта. */
  size?: TextFontSize;
  fz?: TextFontSize;
  style?: CSSProperties;
};

function resolveVariant(variant: string): TextVariant {
  return Object.hasOwn(VARIANTS, variant) ? (variant as TextVariant) : "span";
}

/** Типографический текст с вариантами оформления. */
export function Text({
  children,
  variant = "span",
  color,
  c,
  size,
  fz,
  style,
  ...props
}: TextProps) {
  const key = resolveVariant(variant);
  const { tag: Tag } = VARIANTS[key];

  return (
    <Unstyled
      as={Tag}
      {...props}
      className={cls("dmc-text")}
      data-dmc-variant={key}
      c={c ?? color}
      fz={fz ?? size}
      style={style}
    >
      {children}
    </Unstyled>
  );
}
