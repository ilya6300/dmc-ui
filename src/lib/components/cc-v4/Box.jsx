import React from "react";
import { mergeStyle } from "./tokens";

const BOX_LAYOUT = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  textAlign: "left",
  boxSizing: "border-box",
};

/** Корневой контейнер страницы — layout через `style`. */
export function Box({
  children,
  style,
  as = "div",
  ...rest
}) {
  const Component = as;
  return (
    <Component
      style={mergeStyle(BOX_LAYOUT, style)}
      {...rest}
    >
      {children}
    </Component>
  );
}
