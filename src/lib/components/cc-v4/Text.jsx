import React from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

const VARIANTS = {
  subt: { tag: "span" },
  title: { tag: "span" },
  p: { tag: "p" },
  li: { tag: "li" },
  span: { tag: "span" },
};

function resolveVariant(variant) {
  return Object.hasOwn(VARIANTS, variant) ? variant : "span";
}

/** Типографический текст с вариантами оформления. */
export function Text({ children, variant = "span", color, size, style }) {
  const { colors } = useTheme();
  const key = resolveVariant(variant);
  const { tag } = VARIANTS[key];
  const Tag = tag;
  const resolvedSize = resolveSize(size);

  const textStyle = mergeStyle(
    color != null ? { color } : { color: colors.textPrimary },
    style,
  );

  return (
    <Tag
      className={joinClass("dmc-text")}
      data-dmc-variant={key}
      data-dmc-size={resolvedSize}
      style={textStyle}
    >
      {children}
    </Tag>
  );
}
