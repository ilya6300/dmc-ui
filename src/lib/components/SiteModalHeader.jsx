import React from "react";
import { mergeStyle, tokens } from "./cc-v4/tokens.js";

const HEADER_STYLE = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0,
};

const TITLE_STYLE = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: tokens.mastBlue,
  lineHeight: 1.3,
};

const TOOLBAR_STYLE = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0,
};

export const SiteModalHeader = ({
  title,
  titleId,
  toolbar,
  toolbarWrap = true,
  style,
}) => (
  <header style={mergeStyle(HEADER_STYLE, style)}>
    <h2 id={titleId} style={TITLE_STYLE}>{title}</h2>
    {toolbar
      ? toolbarWrap
        ? <div style={TOOLBAR_STYLE}>{toolbar}</div>
        : toolbar
      : null}
  </header>
);
