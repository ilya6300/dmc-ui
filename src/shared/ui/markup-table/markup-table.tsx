import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cls } from "../../lib";
import { useTheme } from "../theme-context";
import { resolveSize, type SizeName } from "../theme-context/sizes";
import { mergeStyle } from "../theme-context/tokens";
import {
  MarkupTableCaption,
  MarkupTableCellTitle,
  MarkupTableCol,
  MarkupTableContainer,
  MarkupTableTable,
  MarkupTableTbody,
  MarkupTableTd,
  MarkupTableTfoot,
  MarkupTableTh,
  MarkupTableThead,
  MarkupTableTr,
} from "./parts";
import "./markup-table.css";

export type MarkupTableBorders = "none" | "rows" | "columns" | "all";
export type MarkupTableLayout = "auto" | "fixed";

export type MarkupTableProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  size?: SizeName;
  striped?: boolean;
  hover?: boolean;
  dense?: boolean;
  /** Краткая форма границ, если rowBorder / colBorder / border не заданы. */
  borders?: MarkupTableBorders;
  rowBorder?: boolean;
  colBorder?: boolean;
  border?: boolean;
  showTitle?: boolean;
  layout?: MarkupTableLayout;
  stickyHeader?: boolean | { top: number };
  style?: CSSProperties;
};

function resolveBorderFlags(
  borders: MarkupTableBorders | undefined,
  rowBorder: boolean | undefined,
  colBorder: boolean | undefined,
  border: boolean | undefined,
) {
  const mode = borders ?? "rows";
  return {
    row: rowBorder ?? (mode === "rows" || mode === "all"),
    col: colBorder ?? (mode === "columns" || mode === "all"),
    outer: border ?? mode === "all",
  };
}

export function MarkupTable({
  children,
  size = "m",
  striped = false,
  hover = false,
  dense = false,
  borders,
  rowBorder,
  colBorder,
  border,
  showTitle = false,
  layout = "fixed",
  stickyHeader = false,
  style,
  className,
  ...rest
}: MarkupTableProps) {
  const { colors } = useTheme();
  const stickyTop = typeof stickyHeader === "object" ? stickyHeader.top : 0;
  const flags = resolveBorderFlags(borders, rowBorder, colBorder, border);
  return (
    <div
      {...rest}
      className={cls(
        "dmc-markup-table",
        striped && "dmc-markup-table--striped",
        hover && "dmc-markup-table--hover",
        dense && "dmc-markup-table--dense",
        flags.row && "dmc-markup-table--row-border",
        flags.col && "dmc-markup-table--col-border",
        flags.outer && "dmc-markup-table--border",
        showTitle && "dmc-markup-table--show-title",
        className,
      )}
      data-dmc-size={resolveSize(size)}
      data-layout={layout}
      data-sticky={stickyHeader ? "true" : undefined}
      style={mergeStyle(
        { color: colors.textPrimary },
        stickyHeader ? ({ ["--dmc-markup-sticky-top" as string]: `${stickyTop}px` } as CSSProperties) : undefined,
        style,
      )}
    >
      {children}
    </div>
  );
}

MarkupTable.Container = MarkupTableContainer;
MarkupTable.Table = MarkupTableTable;
MarkupTable.Caption = MarkupTableCaption;
MarkupTable.CellTitle = MarkupTableCellTitle;
MarkupTable.Col = MarkupTableCol;
MarkupTable.Thead = MarkupTableThead;
MarkupTable.Tbody = MarkupTableTbody;
MarkupTable.Tfoot = MarkupTableTfoot;
MarkupTable.Tr = MarkupTableTr;
MarkupTable.Th = MarkupTableTh;
MarkupTable.Td = MarkupTableTd;
