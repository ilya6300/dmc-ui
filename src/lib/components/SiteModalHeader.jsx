import React from "react";
import { mergeStyle } from "./cc-v4/tokens.js";
import { useTheme } from "./cc-v4/ThemeContext.jsx";

const HEADER_STYLE = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0,
};

const TOOLBAR_STYLE = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0,
};

export function SiteModalHeader({
  title,
  titleId,
  toolbar,
  toolbarWrap = true,
  style,
}) {
  const { colors } = useTheme();

  const titleStyle = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: colors.mastBlue,
    lineHeight: 1.3,
  };

  return (
    <header style={mergeStyle(HEADER_STYLE, style)}>
      <h2 id={titleId} style={titleStyle}>{title}</h2>
      {toolbar
        ? toolbarWrap
          ? <div style={TOOLBAR_STYLE}>{toolbar}</div>
          : toolbar
        : null}
    </header>
  );
}
