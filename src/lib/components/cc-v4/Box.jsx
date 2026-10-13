import React from "react";

import { mergeStyle } from "./tokens";
import { getCardShadow } from "./themes.js";
import { useTheme } from "./ThemeContext.jsx";

/** Карточка контента — inline-стили в компоненте. */
export function Box({ children, style, title, w, shadow = 12, ...rest }) {
  const { colors } = useTheme();

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: getCardShadow(colors, shadow),
    border: colors.borderLight,
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: colors.mastBlue,
  };

  return (
    <div style={mergeStyle(boxStyle, { width: w ?? "100%" }, style)} {...rest}>
      {title ? <span style={titleStyle}>{title}</span> : null}
      {children}
    </div>
  );
}
