import React from "react";
import { mergeStyle, tokens } from "./tokens";

const BOX_STYLE = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 10,
  backgroundColor: tokens.bgCard,
  borderRadius: 12,
  padding: 24,
  boxShadow: tokens.cardShadow,
  border: tokens.borderLight,
  boxSizing: "border-box",
};

const BOX_TITLE_STYLE = {
  fontSize: 16,
  fontWeight: 600,
  color: tokens.mastBlue,
};

/** Карточка контента — inline-стили в компоненте. */
export function Box({
  children,
  style,
  title,
  w,
  as = "div",
  ...rest
}) {
  const Component = as;
  return (
    <Component
      style={mergeStyle(BOX_STYLE, { width: w ?? "100%" }, style)}
      {...rest}
    >
      {title ? <span style={BOX_TITLE_STYLE}>{title}</span> : null}
      {children}
    </Component>
  );
}
