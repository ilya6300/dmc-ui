import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "../../shared/ui/theme-context";
import { mergeStyle } from "../../shared/ui/tokens";

const HEADER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0,
};

const TOOLBAR_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0,
};

const TITLE_BASE: CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.3,
};

export type SiteModalHeaderProps = {
  title?: ReactNode;
  titleId?: string;
  toolbar?: ReactNode;
  toolbarWrap?: boolean;
  style?: CSSProperties;
};

export function SiteModalHeader({
  title,
  titleId,
  toolbar,
  toolbarWrap = true,
  style,
}: SiteModalHeaderProps) {
  const { colors } = useTheme();

  const titleStyle = mergeStyle(TITLE_BASE, { color: colors.mastBlue });

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
