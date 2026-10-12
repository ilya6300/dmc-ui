import React from "react";
import { mergeStyle } from "./tokens";

const MAIN_STYLE = {
  minHeight: "100%",
  boxSizing: "border-box",
};

/** Обёртка страницы ЛК; оформление только через `style`. */
export function Main({ children, style, ...rest }) {
  return (
    <div style={mergeStyle(MAIN_STYLE, style)} {...rest}>
      {children}
    </div>
  );
}
