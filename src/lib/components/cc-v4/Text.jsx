import React from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";

const VARIANTS = {
  subt: {
    tag: "span",
    fontSize: 15,
    fontWeight: 600,
  },
  title: {
    tag: "span",
    fontSize: 24,
    fontWeight: 700,
  },
  p: {
    tag: "p",
    fontSize: 14,
    fontWeight: 400,
    margin: 0,
  },
  li: {
    tag: "li",
    fontSize: 14,
    fontWeight: 400,
  },
  span: {
    tag: "span",
    fontSize: 14,
    fontWeight: 400,
  },
};

function resolveVariant(variant) {
  return Object.hasOwn(VARIANTS, variant) ? variant : "span";
}

/** Типографический текст с вариантами оформления. */
export function Text({ children, variant = "span", color, style }) {
  const { colors } = useTheme();
  const key = resolveVariant(variant);
  const { tag, ...variantStyle } = VARIANTS[key];
  const Tag = tag;

  const textStyle = mergeStyle(
    {
      fontFamily: "inherit",
      color: color ?? colors.textPrimary,
      ...variantStyle,
    },
    style,
  );

  return <Tag style={textStyle}>{children}</Tag>;
}
