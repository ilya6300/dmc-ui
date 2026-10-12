import React from "react";
import { mergeStyle, tokens } from "./tokens";

const DASH_CARD_STYLE = {
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

const CARD_TITLE_STYLE = {
  fontSize: 16,
  fontWeight: 600,
  color: tokens.mastBlue,
};

export function DashCard({
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
      style={mergeStyle(DASH_CARD_STYLE, { width: w ?? "100%" }, style)}
      {...rest}
    >
      {title ? <span style={CARD_TITLE_STYLE}>{title}</span> : null}
      {children}
    </Component>
  );
}
