import { Fragment, useMemo, type DragEvent as ReactDragEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Button } from "../../button";
import { Box } from "../../box";
import { MarkupTable, type MarkupTableProps } from "../../markup-table";
import { cls } from "../../../lib";
import { mergeStyle } from "../../theme-context/tokens";
import { cellText, headerText, segmentSpan } from "../columns";
import { groupedIndentPx, groupedInlineLayout, leafNodes, nextSortRules, resolveGroupedPresentation, type GroupedInlineLayout } from "../pipeline";
import type {
  DataTableBulkAction,
  DataTableGroupLayout,
  DataTableLeaf,
  DataTableNode,
  DataTableRowAction,
  DataTableRowActionsPanelProps,
  DataTableRowEvents,
  DataTableSortRule,
} from "../types";
import { FilterPanel } from "./filter-panel";

export type DataTableViewModel<T extends object> = {
  colors: { textPrimary: string; surface: string; border: string };
  style?: import("react").CSSProperties;
  noDataText: string;
  error?: ReactNode;
  withPagination: boolean;
  withHeader: boolean;
  withHeaderToggling: boolean;
  withExcelExport: boolean;
  selectable?: "start" | "end";
  rowActions?: DataTableRowAction<T>[];
  rowActionsPanel?: (props: DataTableRowActionsPanelProps<T>) => ReactNode;
  rowActionsAt: "start" | "end";
  rowActionsOnHover: boolean;
  hasActionsColumn: boolean;
  showHoverSlot: boolean;
  hoverSlotStart: boolean;
  hoverSlotEnd: boolean;
  actionLeavesStart: DataTableLeaf<T>[];
  actionLeavesEnd: DataTableLeaf<T>[];
  dataSegments: import("../types").DataTableSegment<T>[];
  bulkActions?: DataTableBulkAction<T>[];
  breakpoint?: string;
  layout?: (props: { nodes: DataTableNode<T>[]; columns: DataTableLeaf<T>[]; onRow?: DataTableRowEvents<T> }) => ReactNode;
  onRow?: DataTableRowEvents<T>;
  maxBodyHeight?: number;
  limits: number[];
  groupLayout: DataTableGroupLayout;
  groupAt: "start" | "end";
  editMode?: "cell" | "row";
  multiSort: boolean;
  selected: Array<number | string>;
  setSelected: (next: Array<number | string>) => void;
  edit: { index: number | string; field?: string } | null;
  draft: T | null;
  setDraft: (value: T | null | ((current: T | null) => T | null)) => void;
  startEdit: (row: T, index: number | string, field?: string) => void;
  saveEdit: () => void;
  openArrays: string[];
  setOpenArrays: (value: string[] | ((current: string[]) => string[])) => void;
  menuKey: string | null;
  setMenuKey: (value: string | null) => void;
  toggleExpand: (key: string) => void;
  filters: Record<string, import("../types").DataTableFilterValue | undefined>;
  setFilters: (next: Record<string, import("../types").DataTableFilterValue | undefined>) => void;
  openFilter: string | null;
  setOpenFilter: (value: string | null | ((current: string | null) => string | null)) => void;
  filterAnchors: { current: Record<string, HTMLButtonElement | null> };
  rules: DataTableSortRule[];
  commitRules: (next: DataTableSortRule[]) => void;
  setPage: (next: number) => void;
  widths: Record<string, number>;
  startResize: (field: string, event: import("react").PointerEvent<HTMLSpanElement>) => void;
  drag: { kind: "segment"; id: string } | { kind: "field"; segmentId: string; field: string } | null;
  setDrag: (value: DataTableViewModel<T>["drag"]) => void;
  dragOver: { kind: "segment"; id: string } | { kind: "field"; segmentId: string; field: string } | null;
  setDragOver: (value: DataTableViewModel<T>["dragOver"]) => void;
  dropSegment: (targetId: string) => void;
  dropField: (segmentId: string, targetField: string) => void;
  segments: import("../types").DataTableSegment<T>[];
  ordered: DataTableLeaf<T>[];
  keys: string[];
  pageNodes: DataTableNode<T>[];
  bodyNodes: DataTableNode<T>[];
  windowed: { items: DataTableNode<T>[]; padTop: number; padBottom: number } | null;
  busy: boolean;
  colSpan: number;
  source: T[];
  leaves: DataTableLeaf<T>[];
  columnsOpen: boolean;
  setColumnsOpen: (value: boolean | ((value: boolean) => boolean)) => void;
  hideField: (field: string, nextHidden: boolean) => void;
  hidden: string[];
  downloadCsv: () => void;
  safePage: number;
  isFetcher: boolean;
  remotePages?: number;
  pageCount: number;
  clientPageCount: number;
  pageSize: number;
  setLimitState: (value: number) => void;
  setScrollTop: (value: number) => void;
  compact: boolean;
  expanded: string[];
  markup?: Pick<
    MarkupTableProps,
    | "size"
    | "striped"
    | "hover"
    | "dense"
    | "borders"
    | "rowBorder"
    | "colBorder"
    | "border"
    | "showTitle"
    | "layout"
    | "stickyHeader"
  >;
};

function isActive<T>(value: boolean | ((arg: T) => boolean) | undefined, arg: T): boolean {
  if (typeof value === "function") return value(arg);
  return Boolean(value);
}

export function DataTableView<T extends object>(model: DataTableViewModel<T>) {
  const {
    colors,
    style,
    noDataText,
    error,
    withPagination,
    withHeader,
    withHeaderToggling,
    withExcelExport,
    selectable,
    rowActions,
    rowActionsPanel,
    rowActionsAt,
    rowActionsOnHover,
    showHoverSlot,
    hoverSlotStart,
    hoverSlotEnd,
    actionLeavesStart,
    actionLeavesEnd,
    dataSegments,
    bulkActions,
    breakpoint,
    layout,
    onRow,
    maxBodyHeight,
    limits,
    groupLayout,
    groupAt,
    editMode,
    multiSort,
    selected,
    setSelected,
    edit,
    draft,
    setDraft,
    startEdit,
    saveEdit,
    openArrays,
    setOpenArrays,
    menuKey,
    setMenuKey,
    toggleExpand,
    filters,
    setFilters,
    openFilter,
    setOpenFilter,
    filterAnchors,
    rules,
    commitRules,
    setPage,
    widths,
    startResize,
    drag,
    setDrag,
    dragOver,
    setDragOver,
    dropSegment,
    dropField,
    segments,
    ordered,
    keys,
    pageNodes,
    bodyNodes,
    windowed,
    busy,
    colSpan,
    source,
    leaves,
    columnsOpen,
    setColumnsOpen,
    hideField,
    hidden,
    downloadCsv,
    safePage,
    isFetcher,
    remotePages,
    pageCount,
    clientPageCount,
    pageSize,
    setLimitState,
    setScrollTop,
    compact,
    expanded,
    markup,
  } = model;

  const pageIndexes = leafNodes(pageNodes).map((node) => node.index);
  const allPageSelected = pageIndexes.length > 0 && pageIndexes.every((index) => selected.includes(index));
  const resizeFields = useMemo(
    () => ordered.filter((leaf) => !leaf.source.actions).map((leaf) => leaf.field),
    [ordered],
  );
  const canPairResizeColumn = (field: string, resizable?: boolean) => {
    if (!resizable) return false;
    const index = resizeFields.indexOf(field);
    return index >= 0 && index < resizeFields.length - 1;
  };

  const toggleRow = (index: number | string) => {
    setSelected(selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index]);
  };

  const togglePage = () => {
    if (allPageSelected) {
      setSelected(selected.filter((index) => !pageIndexes.includes(index)));
      return;
    }
    setSelected([...new Set([...selected, ...pageIndexes])]);
  };

  const selectionCell = (index: number | string) => (
    <MarkupTable.Td className="dmc-data-table__select">
      <input
        type="checkbox"
        aria-label={`Выбрать строку ${index}`}
        checked={selected.includes(index)}
        onChange={() => toggleRow(index)}
      />
    </MarkupTable.Td>
  );

  const renderValue = (row: T, leaf: DataTableLeaf<T>, index: number | string) => {
    const editingCell = edit?.index === index && (editMode === "row" || edit.field === leaf.field);
    if (editingCell && draft && leaf.source.editor) {
      return leaf.source.editor(
        draft,
        leaf.source,
        (value) => setDraft((current) => (current ? { ...current, [leaf.field]: value } : current)),
        saveEdit,
      );
    }
    if (leaf.source.body) return leaf.source.body(row, leaf.source);
    const raw = (row as Record<string, unknown>)[leaf.field];
    if (leaf.source.group && Array.isArray(raw)) {
      const key = `${index}:${leaf.field}`;
      return (
        <button type="button" className="dmc-data-table__expand" onClick={() => setOpenArrays((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]))}>
          {openArrays.includes(key) ? "▾" : "▸"} {raw.length}
        </button>
      );
    }
    return cellText(row, leaf.field);
  };

  const visibleActions = (node: DataTableNode<T>) => (rowActions ?? []).filter((action) => !isActive(action.hidden, node));

  const hasRowEditors = ordered.some((leaf) => leaf.source.editor);

  const canRowEditFromAction = (node: DataTableNode<T>) =>
    editMode === "row" && hasRowEditors && !node.isParent;

  const beginEditFromAction = (node: DataTableNode<T>) => {
    if (!canRowEditFromAction(node)) return;
    if (edit?.index === node.index) return;
    startEdit(node.data, node.index);
  };

  const isRowActionDisabled = (action: DataTableRowAction<T>, node: DataTableNode<T>) =>
    isActive(action.disabled, node) || Boolean(action.edit && !canRowEditFromAction(node));

  const handleRowActionClick = (action: DataTableRowAction<T>, node: DataTableNode<T>, event?: { stopPropagation: () => void }) => {
    event?.stopPropagation();
    if (action.edit) {
      beginEditFromAction(node);
      return;
    }
    action.onClick?.(node.data, node);
  };

  const isEditingRow = (node: DataTableNode<T>) => edit?.index === node.index && editMode === "row";

  const renderActions = (node: DataTableNode<T>, menu: boolean) => {
    const actions = visibleActions(node);
    const editingRow = isEditingRow(node);
    const hasEditAction = actions.some((action) => action.edit);

    if (rowActionsPanel) {
      return rowActionsPanel({
        node,
        actions,
        beginEdit: beginEditFromAction,
        editingRow,
        saveEdit: editingRow ? saveEdit : undefined,
      });
    }

    const saveButton = (
      <Button
        key="__save__"
        type="button"
        variant="text"
        onClick={(event) => {
          event.stopPropagation();
          saveEdit();
        }}
      >
        Сохранить
      </Button>
    );

    const buttons =
      editingRow && actions.length === 0
        ? [saveButton]
        : actions.map((action) => {
            if (editingRow && action.edit) {
              return saveButton;
            }
            return (
              <Button
                key={action.id}
                type="button"
                variant="text"
                disabled={isRowActionDisabled(action, node)}
                onClick={(event) => handleRowActionClick(action, node, event)}
              >
                {action.label}
              </Button>
            );
          });

    if (editingRow && !hasEditAction && actions.length > 0) {
      buttons.push(saveButton);
    }
    if (!menu) return buttons;
    const open = menuKey === node.expandKey;
    return (
      <div className="dmc-data-table__menu">
        <button type="button" className="dmc-data-table__expand" aria-label="Действия" aria-expanded={open} onClick={() => setMenuKey(open ? null : node.expandKey)}>
          ⋯
        </button>
        {open ? (
          <div className="dmc-data-table__menu-list" style={{ background: colors.surface, color: colors.textPrimary, borderColor: colors.border }}>
            {buttons}
          </div>
        ) : null}
      </div>
    );
  };

  const leadingExtras =
    (groupLayout === "unified" && keys.length > 0 ? 1 : 0) +
    (selectable === "start" ? 1 : 0) +
    actionLeavesStart.length +
    (hoverSlotStart ? 1 : 0);
  const trailingExtras = (hoverSlotEnd ? 1 : 0) + actionLeavesEnd.length + (selectable === "end" ? 1 : 0);

  const actionAlign = (leaf: DataTableLeaf<T>) => ((leaf.source.actionsAt ?? rowActionsAt) === "start" ? "flex-start" : "flex-end");

  const rowDomHandlers = (node: DataTableNode<T>) => ({
    onClick: onRow?.onClick ? (event: ReactMouseEvent<HTMLTableRowElement>) => onRow.onClick!(event, node.data, node) : undefined,
    onDoubleClick: (event: ReactMouseEvent<HTMLTableRowElement>) => {
      if (editMode === "row") startEdit(node.data, node.index);
      onRow?.onDoubleClick?.(event, node.data, node);
    },
    onMouseEnter: onRow?.onMouseEnter
      ? (event: ReactMouseEvent<HTMLTableRowElement>) => onRow.onMouseEnter!(event, node.data, node)
      : undefined,
    onMouseLeave: onRow?.onMouseLeave
      ? (event: ReactMouseEvent<HTMLTableRowElement>) => onRow.onMouseLeave!(event, node.data, node)
      : undefined,
    onContextMenu: onRow?.onContextMenu
      ? (event: ReactMouseEvent<HTMLTableRowElement>) => onRow.onContextMenu!(event, node.data, node)
      : undefined,
  });

  const cardDomHandlers = (node: DataTableNode<T>) => ({
    onClick: onRow?.onClick ? (event: ReactMouseEvent<HTMLDivElement>) => onRow.onClick!(event, node.data, node) : undefined,
    onDoubleClick: (event: ReactMouseEvent<HTMLDivElement>) => {
      if (editMode === "row") startEdit(node.data, node.index);
      onRow?.onDoubleClick?.(event, node.data, node);
    },
    onMouseEnter: onRow?.onMouseEnter
      ? (event: ReactMouseEvent<HTMLDivElement>) => onRow.onMouseEnter!(event, node.data, node)
      : undefined,
    onMouseLeave: onRow?.onMouseLeave
      ? (event: ReactMouseEvent<HTMLDivElement>) => onRow.onMouseLeave!(event, node.data, node)
      : undefined,
    onContextMenu: onRow?.onContextMenu
      ? (event: ReactMouseEvent<HTMLDivElement>) => onRow.onContextMenu!(event, node.data, node)
      : undefined,
  });

  const renderLeafCell = (
    node: DataTableNode<T>,
    leaf: DataTableLeaf<T>,
    groupControl?: { field: string; open: boolean },
    inlineLayout?: GroupedInlineLayout,
    columnIndex = 0,
  ) => {
    const indentPx = inlineLayout ? groupedIndentPx(inlineLayout.level, columnIndex) : 0;
    return (
      <MarkupTable.Td
        key={leaf.field}
        className={cls(
          leaf.source.align ? `dmc-data-table__align-${leaf.source.align}` : undefined,
          leaf.source.ellipsis ? "dmc-data-table__ellipsis" : undefined,
          indentPx > 0 ? "dmc-data-table__grouped-indent" : undefined,
        )}
        style={indentPx > 0 ? { paddingLeft: `${indentPx}px` } : undefined}
        onDoubleClick={() => {
          if (editMode === "cell" && leaf.source.editor) startEdit(node.data, node.index, leaf.field);
        }}
      >
        {leaf.source.actions ? (
          <span style={{ display: "flex", justifyContent: actionAlign(leaf) }}>
            {renderActions(node, Boolean(leaf.source.actionsMenu))}
          </span>
        ) : groupControl?.field === leaf.field ? (
          <span className="dmc-data-table__group-cell">
            {groupAt === "end" ? null : (
              <button type="button" className="dmc-data-table__expand" aria-expanded={groupControl.open} onClick={() => toggleExpand(node.expandKey)}>
                {groupControl.open ? "▾" : "▸"}
              </button>
            )}
            <strong style={{ fontWeight: groupControl.open ? 700 : 400 }}>{node.label ?? renderValue(node.data, leaf, node.index)}</strong>
            {groupAt === "end" ? (
              <button type="button" className="dmc-data-table__expand" aria-expanded={groupControl.open} onClick={() => toggleExpand(node.expandKey)}>
                {groupControl.open ? "▾" : "▸"}
              </button>
            ) : null}
          </span>
        ) : (
          renderValue(node.data, leaf, node.index)
        )}
      </MarkupTable.Td>
    );
  };

  /** Вложенная таблица на всю ширину с колонками родителя (режимы group и group+grouped). */
  const renderFullNestRow = (nestKey: string, nestLeaves: DataTableLeaf<T>[], body: ReactNode, inNested: boolean) => {
    const lead = inNested ? 0 : leadingExtras;
    const trail = inNested ? 0 : trailingExtras;
    return (
      <MarkupTable.Tr key={nestKey} className="dmc-data-table__nest-row">
        {lead > 0 ? <MarkupTable.Td colSpan={lead} aria-hidden className="dmc-data-table__nest-pad" /> : null}
        <MarkupTable.Td colSpan={Math.max(nestLeaves.length, 1)} className="dmc-data-table__nest-cell">
          <MarkupTable.Table className="dmc-data-table__nested">
            <MarkupTable.Thead>
              <MarkupTable.Tr>
                {nestLeaves.map((leaf) => (
                  <MarkupTable.Th key={leaf.field} className="dmc-data-table__th">
                    {headerText(leaf.header, leaf.field)}
                  </MarkupTable.Th>
                ))}
              </MarkupTable.Tr>
            </MarkupTable.Thead>
            <MarkupTable.Tbody>{body}</MarkupTable.Tbody>
          </MarkupTable.Table>
        </MarkupTable.Td>
        {trail > 0 ? <MarkupTable.Td colSpan={trail} aria-hidden className="dmc-data-table__nest-pad" /> : null}
      </MarkupTable.Tr>
    );
  };

  const renderDataRow = (
    node: DataTableNode<T>,
    nestLeaves: DataTableLeaf<T>[],
    groupControl?: { field: string; open: boolean },
    inNested = false,
    inlineLayout?: GroupedInlineLayout,
  ) => {
    const row = node.data;
    const arrayLeaves = nestLeaves.filter(
      (leaf) => leaf.source.group && !leaf.source.grouped && openArrays.includes(`${node.index}:${leaf.field}`),
    );
    return (
      <Fragment key={node.expandKey}>
        <MarkupTable.Tr
          className={cls(
            selected.includes(node.index) ? "dmc-data-table__row--selected" : undefined,
            !inNested && (hoverSlotStart || hoverSlotEnd) ? "dmc-data-table__row--actions-hover" : undefined,
          )}
          data-selected={selected.includes(node.index) ? "true" : undefined}
          {...rowDomHandlers(node)}
        >
          {!inNested && groupLayout === "unified" && keys.length > 0 ? <MarkupTable.Td /> : null}
          {!inNested && selectable === "start" ? selectionCell(node.index) : null}
          {!inNested && nestLeaves === ordered ? actionLeavesStart.map((leaf) => renderLeafCell(node, leaf, groupControl, inlineLayout, 0)) : null}
          {!inNested && hoverSlotStart ? hoverSlotCell(node, "start") : null}
          {renderDataBodyCells(node, row, nestLeaves, groupControl, inlineLayout)}
          {!inNested && hoverSlotEnd ? hoverSlotCell(node, "end") : null}
          {!inNested && nestLeaves === ordered ? actionLeavesEnd.map((leaf) => renderLeafCell(node, leaf, groupControl, inlineLayout, 0)) : null}
          {!inNested && selectable === "end" ? selectionCell(node.index) : null}
        </MarkupTable.Tr>
        {arrayLeaves.map((leaf) => {
          const raw = (row as Record<string, unknown>)[leaf.field];
          const items = Array.isArray(raw) ? raw : [];
          return renderFullNestRow(
            `${node.expandKey}-${leaf.field}-group`,
            nestLeaves,
            items.map((item, itemIndex) => {
              const childIndex = `${node.index}:${leaf.field}:${itemIndex}`;
              if (item && typeof item === "object") {
                const child: DataTableNode<T> = {
                  data: item as T,
                  index: childIndex,
                  isParent: false,
                  isChildren: true,
                  nodes: [],
                  groupLevel: 0,
                  expandKey: childIndex,
                };
                return renderDataRow(child, nestLeaves, undefined, true);
              }
              return (
                <MarkupTable.Tr key={childIndex}>
                  <MarkupTable.Td colSpan={Math.max(nestLeaves.length, 1)}>{String(item)}</MarkupTable.Td>
                </MarkupTable.Tr>
              );
            }),
            inNested,
          );
        })}
      </Fragment>
    );
  };

  const hoverSlotCell = (node: DataTableNode<T>, position: "start" | "end") => {
    const showChrome = visibleActions(node).length > 0 || isEditingRow(node);
    return (
      <MarkupTable.Td key={`hover-${position}`} className="dmc-data-table__hover-slot">
        {showChrome ? (
          <div className="dmc-data-table__hover-overlay" data-position={position}>
            {renderActions(node, false)}
          </div>
        ) : null}
      </MarkupTable.Td>
    );
  };

  const renderDataBodyCells = (
    node: DataTableNode<T>,
    row: T,
    nestLeaves: DataTableLeaf<T>[],
    groupControl?: { field: string; open: boolean },
    inlineLayout?: GroupedInlineLayout,
  ) => {
    const leafCell = (leaf: DataTableLeaf<T>) => {
      const index = nestLeaves.findIndex((item) => item.field === leaf.field);
      return renderLeafCell(node, leaf, groupControl, inlineLayout, Math.max(0, index));
    };
    if (nestLeaves !== ordered) {
      return nestLeaves.map((leaf) => leafCell(leaf));
    }
  const renderSegmentCells = (sourceSegments: typeof segments) =>
      sourceSegments.flatMap((segment) =>
        segment.kind === "split" ? (
          <MarkupTable.Td
            key={segment.id}
            colSpan={segmentSpan(segment)}
            className={cls(segment.source.align ? `dmc-data-table__align-${segment.source.align}` : undefined, segment.source.ellipsis ? "dmc-data-table__ellipsis" : undefined)}
            onDoubleClick={() => {
              if (editMode === "cell" && segment.source.editor) startEdit(row, node.index, segment.leaves[0].field);
            }}
          >
            {renderValue(row, segment.leaves[0], node.index)}
          </MarkupTable.Td>
        ) : (
          segment.leaves.map((leaf) => leafCell(leaf))
        ),
      );
    return renderSegmentCells(dataSegments);
  };

  const renderGrouped = (
    list: DataTableNode<T>[],
    nestLeaves: DataTableLeaf<T>[],
    inNested = false,
    indentLevel = 0,
  ): ReactNode[] =>
    list.flatMap((node) => {
      const inlineLayout = groupedInlineLayout(indentLevel);
      if (!node.isParent) {
        return [renderDataRow(node, nestLeaves, undefined, inNested, inlineLayout)];
      }
      const open = expanded.includes(node.expandKey);
      const field = keys[node.groupLevel];
      const expandIndex = field ? nestLeaves.findIndex((leaf) => leaf.field === field) : -1;
      const hasColumn = expandIndex >= 0;
      const presentation = resolveGroupedPresentation(field, nestLeaves, groupLayout);
      const parentRow = hasColumn ? (
        renderDataRow(node, nestLeaves, { field: field!, open }, inNested, inlineLayout)
      ) : (
        <MarkupTable.Tr key={node.expandKey} className="dmc-data-table__group">
          {!inNested && groupLayout === "unified" ? (
            <MarkupTable.Td>
              <button type="button" className="dmc-data-table__expand" aria-expanded={open} onClick={() => toggleExpand(node.expandKey)}>
                {open ? "▾" : "▸"}
              </button>
            </MarkupTable.Td>
          ) : null}
          <MarkupTable.Td
            colSpan={Math.max(
              nestLeaves.length + (inNested ? 0 : leadingExtras + trailingExtras) - (!inNested && groupLayout === "unified" ? 1 : 0),
              1,
            )}
          >
            <span className="dmc-data-table__group-cell">
              {groupAt === "end" ? (
                <span>
                  {node.label} ({leafNodes(node.nodes).length})
                </span>
              ) : null}
              <button type="button" className="dmc-data-table__expand" aria-expanded={open} onClick={() => toggleExpand(node.expandKey)}>
                {open ? "▾" : "▸"}
              </button>
              {groupAt === "start" ? (
                <span>
                  {node.label} ({leafNodes(node.nodes).length})
                </span>
              ) : null}
            </span>
          </MarkupTable.Td>
        </MarkupTable.Tr>
      );
      if (!open) return [parentRow];
      if (presentation === "nested-table") {
        return [
          parentRow,
          renderFullNestRow(`${node.expandKey}-nest`, nestLeaves, renderGrouped(node.nodes, nestLeaves, true, 0), inNested),
        ];
      }
      return [parentRow, ...renderGrouped(node.nodes, nestLeaves, inNested, indentLevel + 1)];
    });

  const hasSecondHeader = dataSegments.some((segment) => segment.kind !== "leaf");
  const actionLeafHead = (leaf: DataTableLeaf<T>) => (
    <MarkupTable.Th key={leaf.field} className="dmc-data-table__th" style={{ width: widths[leaf.field] ?? leaf.source.width }}>
      {leafHead(leaf)}
    </MarkupTable.Th>
  );
  const sortMark = (field: string) => {
    const rule = rules.find((item) => item.key === field);
    if (!rule) return "⇅";
    return rule.descending ? "▼" : "▲";
  };
  const sortActive = (field: string) => rules.some((item) => item.key === field);
  const sortBy = (field: string) => {
    commitRules(nextSortRules(rules, field, multiSort));
    setPage(1);
  };
  const dragHandle = (label: string, onDragStart: (event: ReactDragEvent<HTMLSpanElement>) => void) => (
    <span
      className="dmc-data-table__drag-handle"
      role="button"
      tabIndex={0}
      draggable
      aria-label={`Перетащить ${label}`}
      onDragStart={onDragStart}
      onDragEnd={() => {
        setDrag(null);
        setDragOver(null);
      }}
    >
      ⠿
    </span>
  );
  const leafHead = (
    leaf: DataTableLeaf<T>,
    drag?: { onDragStart: (event: ReactDragEvent<HTMLSpanElement>) => void },
  ) => {
    const title = headerText(leaf.header, leaf.field);
    const hasActions = Boolean(drag || leaf.source.sortable || leaf.source.filterable || leaf.source.toggleable);
    return (
      <>
        <div className="dmc-data-table__head">
          <span className="dmc-data-table__head-title">{leaf.header ?? title}</span>
          {hasActions ? (
            <span className="dmc-data-table__head-actions">
              {drag ? dragHandle(title, drag.onDragStart) : null}
              {leaf.source.sortable ? (
                <button
                  type="button"
                  className={cls("dmc-data-table__sort", sortActive(leaf.field) ? "dmc-data-table__sort--on" : undefined)}
                  aria-label={`Сортировать ${title}`}
                  onClick={() => sortBy(leaf.field)}
                >
                  {sortMark(leaf.field)}
                </button>
              ) : null}
              {leaf.source.filterable ? (
                <button
                  type="button"
                  ref={(node) => {
                    filterAnchors.current[leaf.field] = node;
                  }}
                  className={cls("dmc-data-table__filter-btn", filters[leaf.field] ? "dmc-data-table__filter-btn--on" : undefined)}
                  aria-label={`Фильтр ${title}`}
                  onClick={() => setOpenFilter((current) => (current === leaf.field ? null : leaf.field))}
                >
                  ▾
                </button>
              ) : null}
              {leaf.source.toggleable ? (
                <button type="button" className="dmc-data-table__hide" aria-label={`Скрыть ${title}`} onClick={() => hideField(leaf.field, true)}>
                  ×
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
        {canPairResizeColumn(leaf.field, leaf.source.resizable) ? (
          <span
            className="dmc-data-table__resizer"
            role="separator"
            aria-orientation="vertical"
            aria-label={`Ширина ${title}`}
            onPointerDown={(event) => {
              const handle = event.currentTarget;
              handle.classList.add("dmc-data-table__resizer--active");
              const clearActive = () => {
                handle.classList.remove("dmc-data-table__resizer--active");
              };
              window.addEventListener("pointerup", clearActive, { once: true });
              window.addEventListener("pointercancel", clearActive, { once: true });
              startResize(leaf.field, event);
            }}
          />
        ) : null}
        {openFilter === leaf.field ? (
          <FilterPanel
            anchor={filterAnchors.current[leaf.field] ?? null}
            column={leaf}
            value={filters[leaf.field]}
            onApply={(value) => {
              setFilters({ ...filters, [leaf.field]: value });
              setOpenFilter(null);
            }}
            onClear={() => {
              setFilters({ ...filters, [leaf.field]: undefined });
              setOpenFilter(null);
            }}
            onClose={() => setOpenFilter(null)}
          />
        ) : null}
      </>
    );
  };
  const headerTop = dataSegments.map((segment) => {
    const span = segmentSpan(segment);
    const sortableField = segment.leaves[0]?.field;
    const groupTitle = headerText(segment.header, sortableField ?? segment.id);
    const groupDraggable = Boolean(segment.source.draggable);
    return (
      <MarkupTable.Th
        key={segment.id}
        colSpan={span > 1 ? span : undefined}
        rowSpan={segment.kind === "leaf" && hasSecondHeader ? 2 : undefined}
        onDragOver={(event) => {
          const canDrop = Boolean(segment.source.draggable || segment.leaves[0]?.source.draggable);
          const same = drag?.kind === "segment" && drag.id === segment.id;
          if (!canDrop || drag?.kind !== "segment" || same) return;
          event.preventDefault();
          setDragOver({ kind: "segment", id: segment.id });
        }}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setDragOver(null);
        }}
        onDrop={() => dropSegment(segment.id)}
        className={cls(
          "dmc-data-table__th",
          segment.source.align ? `dmc-data-table__align-${segment.source.align}` : undefined,
          dragOver?.kind === "segment" && dragOver.id === segment.id && "dmc-data-table__th--drop",
        )}
        style={segment.kind === "group" ? undefined : { width: widths[segment.leaves[0]?.field ?? ""] ?? segment.source.width }}
      >
        {segment.kind === "group" ? (
          <div className="dmc-data-table__head">
            <span className="dmc-data-table__head-title">{segment.header}</span>
            {groupDraggable || (segment.source.sortable && sortableField) ? (
              <span className="dmc-data-table__head-actions">
                {groupDraggable
                  ? dragHandle(groupTitle, () => setDrag({ kind: "segment", id: segment.id }))
                  : null}
                {segment.source.sortable && sortableField ? (
                  <button
                    type="button"
                    className={cls("dmc-data-table__sort", sortActive(sortableField) ? "dmc-data-table__sort--on" : undefined)}
                    aria-label={`Сортировать ${groupTitle}`}
                    onClick={() => sortBy(sortableField)}
                  >
                    {sortMark(sortableField)}
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        ) : (
          leafHead(
            segment.leaves[0],
            segment.source.draggable || segment.leaves[0]?.source.draggable
              ? {
                  onDragStart: () => setDrag({ kind: "segment", id: segment.id }),
                }
              : undefined,
          )
        )}
      </MarkupTable.Th>
    );
  });
  const headerSub = dataSegments.flatMap((segment) => {
    if (segment.kind === "leaf") return [];
    if (segment.kind === "split") {
      return segment.subheaders.map((header, index) => (
        <MarkupTable.Th key={`${segment.id}-${index}`} className="dmc-data-table__th">
          {header}
        </MarkupTable.Th>
      ));
    }
    return segment.leaves.map((leaf) => (
      <MarkupTable.Th
        key={leaf.field}
        onDragOver={(event) => {
          const same = drag?.kind === "field" && drag.segmentId === segment.id && drag.field === leaf.field;
          if (!leaf.source.draggable || drag?.kind !== "field" || drag.segmentId !== segment.id || same) return;
          event.preventDefault();
          setDragOver({ kind: "field", segmentId: segment.id, field: leaf.field });
        }}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setDragOver(null);
        }}
        onDrop={(event) => {
          event.stopPropagation();
          dropField(segment.id, leaf.field);
        }}
        className={cls(
          "dmc-data-table__th",
          leaf.source.align ? `dmc-data-table__align-${leaf.source.align}` : undefined,
          dragOver?.kind === "field" && dragOver.segmentId === segment.id && dragOver.field === leaf.field && "dmc-data-table__th--drop",
        )}
        style={{ width: widths[leaf.field] ?? leaf.source.width }}
      >
        {leafHead(
          leaf,
          leaf.source.draggable
            ? {
                onDragStart: (event) => {
                  event.stopPropagation();
                  setDrag({ kind: "field", segmentId: segment.id, field: leaf.field });
                },
              }
            : undefined,
        )}
      </MarkupTable.Th>
    ));
  });
  const selectedItems = source.filter((_, index) => selected.includes(index));
  const bulkContext = { items: selectedItems, indexes: selected };

  const cards = (
    <div className="dmc-data-table__cards">
      {leafNodes(pageNodes).map((node) => (
        <Box key={node.expandKey} style={{ cursor: onRow ? "pointer" : undefined }} {...cardDomHandlers(node)}>
          {ordered.map((leaf) => (
            <div key={leaf.field} className="dmc-data-table__card-row">
              <span>{headerText(leaf.header, leaf.field)}</span>
              <strong>{renderValue(node.data, leaf, node.index)}</strong>
            </div>
          ))}
        </Box>
      ))}
    </div>
  );

  const table = (
    <div
      className="dmc-data-table__scroll"
      style={maxBodyHeight ? { maxHeight: maxBodyHeight } : undefined}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <MarkupTable striped hover borders="rows" layout="fixed" {...markup}>
      <MarkupTable.Table className="dmc-data-table__table">
        {withHeader ? (
          <MarkupTable.Thead>
            <MarkupTable.Tr>
              {groupLayout === "unified" && keys.length > 0 ? <MarkupTable.Th className="dmc-data-table__select" /> : null}
              {selectable === "start" ? (
                <MarkupTable.Th className="dmc-data-table__select" rowSpan={hasSecondHeader ? 2 : undefined}>
                  <input type="checkbox" aria-label="Выбрать строки страницы" checked={allPageSelected} onChange={togglePage} />
                </MarkupTable.Th>
              ) : null}
              {actionLeavesStart.map((leaf) => actionLeafHead(leaf))}
              {hoverSlotStart ? <MarkupTable.Th className="dmc-data-table__hover-slot" rowSpan={hasSecondHeader ? 2 : undefined} aria-hidden /> : null}
              {headerTop}
              {hoverSlotEnd ? <MarkupTable.Th className="dmc-data-table__hover-slot" rowSpan={hasSecondHeader ? 2 : undefined} aria-hidden /> : null}
              {actionLeavesEnd.map((leaf) => actionLeafHead(leaf))}
              {selectable === "end" ? (
                <MarkupTable.Th className="dmc-data-table__select" rowSpan={hasSecondHeader ? 2 : undefined}>
                  <input type="checkbox" aria-label="Выбрать строки страницы" checked={allPageSelected} onChange={togglePage} />
                </MarkupTable.Th>
              ) : null}
            </MarkupTable.Tr>
            {hasSecondHeader ? <MarkupTable.Tr>{headerSub}</MarkupTable.Tr> : null}
          </MarkupTable.Thead>
        ) : null}
        <MarkupTable.Tbody>
          {busy ? (
            <MarkupTable.Tr>
              <MarkupTable.Td colSpan={colSpan} className="dmc-data-table__empty">Загрузка</MarkupTable.Td>
            </MarkupTable.Tr>
          ) : error ? (
            <MarkupTable.Tr>
              <MarkupTable.Td colSpan={colSpan} className="dmc-data-table__empty">{error}</MarkupTable.Td>
            </MarkupTable.Tr>
          ) : pageNodes.length === 0 ? (
            <MarkupTable.Tr>
              <MarkupTable.Td colSpan={colSpan} className="dmc-data-table__empty">{noDataText}</MarkupTable.Td>
            </MarkupTable.Tr>
          ) : (
            <>
              {windowed && windowed.padTop > 0 ? <MarkupTable.Tr aria-hidden="true" style={{ height: windowed.padTop }} /> : null}
              {keys.length > 0 ? renderGrouped(bodyNodes, ordered) : bodyNodes.map((node) => renderDataRow(node, ordered))}
              {windowed && windowed.padBottom > 0 ? <MarkupTable.Tr aria-hidden="true" style={{ height: windowed.padBottom }} /> : null}
            </>
          )}
        </MarkupTable.Tbody>
        {segments.some((segment) => segment.leaves.some((leaf) => leaf.source.footer) || segment.source.footer) ? (
          <MarkupTable.Tfoot>
            <MarkupTable.Tr>
              {segments.flatMap((segment) =>
                segment.kind === "split" ? (
                  <MarkupTable.Td key={segment.id} colSpan={segmentSpan(segment)}>
                    {segment.source.footer}
                  </MarkupTable.Td>
                ) : (
                  segment.leaves.map((leaf) => <MarkupTable.Td key={leaf.field}>{leaf.source.footer}</MarkupTable.Td>)
                ),
              )}
            </MarkupTable.Tr>
          </MarkupTable.Tfoot>
        ) : null}
      </MarkupTable.Table>
      </MarkupTable>
    </div>
  );

  const showCards = Boolean(breakpoint) && compact;

  return (
    <div className="dmc-data-table" style={mergeStyle({ color: colors.textPrimary }, style)}>
      <div className="dmc-data-table__toolbar">
        {withHeaderToggling && leaves.some((leaf) => leaf.source.toggleable) ? (
          <div className="dmc-data-table__columns">
            <Button type="button" variant="outline" onClick={() => setColumnsOpen((value) => !value)}>
              Колонки
            </Button>
            {columnsOpen ? (
              <div className="dmc-data-table__columns-menu" style={{ background: colors.surface, color: colors.textPrimary, borderColor: colors.border }}>
                {leaves
                  .filter((leaf) => leaf.source.toggleable)
                  .map((leaf) => (
                    <label key={leaf.field}>
                      <input
                        type="checkbox"
                        checked={!hidden.includes(leaf.field)}
                        onChange={() => hideField(leaf.field, !hidden.includes(leaf.field))}
                      />
                      {headerText(leaf.header, leaf.field)}
                    </label>
                  ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {withExcelExport ? (
          <Button type="button" variant="outline" onClick={downloadCsv}>Скачать CSV</Button>
        ) : null}
        {bulkActions && selected.length > 0 ? (
          <div className="dmc-data-table__bulk">
            {bulkActions
              .filter((action) => !isActive(action.hidden, bulkContext))
              .map((action) => (
                <Button
                  key={action.id}
                  type="button"
                  variant="text"
                  disabled={isActive(action.disabled, bulkContext)}
                  onClick={() => action.onClick(bulkContext)}
                >
                  {action.label}
                </Button>
              ))}
          </div>
        ) : null}
      </div>
      {showCards
        ? layout
          ? layout({ nodes: pageNodes, columns: ordered, onRow })
          : pageNodes.length === 0
            ? <div className="dmc-data-table__empty">{noDataText}</div>
            : cards
        : table}
      {withPagination ? (
        <div className="dmc-data-table__pager">
          <Button type="button" variant="outline" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>Назад</Button>
          <span>{safePage} / {isFetcher && remotePages == null ? "…" : pageCount}</span>
          <Button type="button" variant="outline" disabled={isFetcher ? remotePages != null && safePage >= remotePages : safePage >= clientPageCount} onClick={() => setPage(safePage + 1)}>Дальше</Button>
          <label className="dmc-data-table__limit">
            На странице
            <select
              aria-label="Размер страницы"
              value={pageSize}
              onChange={(event) => {
                setLimitState(Number(event.target.value));
                setPage(1);
              }}
            >
              {limits.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}

