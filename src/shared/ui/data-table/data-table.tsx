import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { MarkupTableProps } from "../markup-table";
import { useTheme } from "../theme-context";
import {
  breakpointQuery,
  collectLeaves,
  collectSegments,
  dataColumnsSpan,
  dataSegmentsWithoutActions,
  DataTableColumn,
  orderSegments,
  applyColumnResizePair,
  partitionActionLeaves,
  presentSegments,
  readColumns,
  MIN_COLUMN_WIDTH,
} from "./columns";
import { DataTableView } from "./view/screen";
import { filterRows, groupNodes, leafNodes, paginateRows, sortRows, toCsv, windowRows } from "./pipeline";
import { createTableStorage, readStored, type DataTableStorage } from "./storage";
import type {
  DataTableBulkAction,
  DataTableFetcher,
  DataTableFilterValue,
  DataTableGroupLayout,
  DataTableLeaf,
  DataTableNode,
  DataTableRowAction,
  DataTableRowActionsPanelProps,
  DataTableRowEvents,
  DataTableSortRule,
} from "./types";
import "./data-table.css";

const ROW_HEIGHT = 40;

export type DataTableLayout<T> = (props: {
  nodes: DataTableNode<T>[];
  columns: DataTableLeaf<T>[];
  onRow?: DataTableRowEvents<T>;
}) => ReactNode;

/** Визуальные свойства MarkupTable. `layout` здесь — table-layout, не раскладка DataTable. */
export type DataTableMarkup = Pick<
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

export type DataTableProps<T extends object> = {
  data: T[] | DataTableFetcher<T>;
  children?: ReactNode;
  style?: CSSProperties;
  noDataText?: string;
  loading?: boolean;
  error?: ReactNode;
  limit?: number;
  limits?: number[];
  page?: number;
  onPageChange?: (page: number) => void;
  withPagination?: boolean;
  withHeader?: boolean;
  withHeaderToggling?: boolean;
  withExcelExport?: boolean;
  excelFileName?: string;
  selectable?: "start" | "end";
  selectedRows?: Array<number | string>;
  onSelectedRowsChange?: (rows: Array<number | string>) => void;
  storage?: string;
  hiddenColumns?: string[];
  onToggleColumn?: (field: string, hidden: boolean) => void;
  columnOrder?: string[];
  onColumnOrder?: (order: string[]) => void;
  columnWidths?: Record<string, number>;
  onColumnResize?: (field: string, width: number) => void;
  columnFilters?: Record<string, DataTableFilterValue | undefined>;
  onColumnFiltersChange?: (filters: Record<string, DataTableFilterValue | undefined>) => void;
  filterMode?: "client" | "server";
  sortKey?: string;
  sortDesc?: boolean;
  sortRules?: DataTableSortRule[];
  onSortRulesChange?: (rules: DataTableSortRule[]) => void;
  multiSort?: boolean;
  groupKeys?: string[];
  groupLayout?: DataTableGroupLayout;
  groupAt?: "start" | "end";
  editMode?: "cell" | "row";
  onRowEditComplete?: (item: T, index: number | string) => void;
  rowActions?: DataTableRowAction<T>[];
  rowActionsPanel?: (props: DataTableRowActionsPanelProps<T>) => ReactNode;
  rowActionsAt?: "start" | "end";
  rowActionsOnHover?: boolean;
  bulkActions?: DataTableBulkAction<T>[];
  breakpoint?: string;
  layout?: DataTableLayout<T>;
  onRow?: DataTableRowEvents<T>;
  /** Оформление таблицы: размер, зебра, границы, dense, stickyHeader. */
  markup?: DataTableMarkup;
  virtualizeThreshold?: number;
  maxBodyHeight?: number;
};

function useCompact(breakpoint?: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (!breakpoint || typeof window.matchMedia !== "function") {
      setMatches(false);
      return;
    }
    const media = window.matchMedia(breakpointQuery(breakpoint));
    const apply = () => setMatches(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [breakpoint]);
  return matches;
}

export function DataTable<T extends object>({
  data,
  children,
  style,
  noDataText = "Нет данных",
  loading = false,
  error,
  limit = 15,
  limits = [15, 30, 50, 75, 100],
  page: pageProp,
  onPageChange,
  withPagination = true,
  withHeader = true,
  withHeaderToggling = true,
  withExcelExport = false,
  excelFileName = "table",
  selectable,
  selectedRows,
  onSelectedRowsChange,
  storage,
  hiddenColumns,
  onToggleColumn,
  columnOrder,
  onColumnOrder,
  columnWidths,
  onColumnResize,
  columnFilters,
  onColumnFiltersChange,
  filterMode,
  sortKey,
  sortDesc = false,
  sortRules,
  onSortRulesChange,
  multiSort = false,
  groupKeys,
  groupLayout = "default",
  groupAt = "start",
  editMode,
  onRowEditComplete,
  rowActions,
  rowActionsPanel,
  rowActionsAt = "end",
  rowActionsOnHover,
  bulkActions,
  breakpoint,
  layout,
  onRow,
  markup,
  virtualizeThreshold,
  maxBodyHeight,
}: DataTableProps<T>) {
  const { colors } = useTheme();
  const store = useMemo<DataTableStorage | undefined>(() => (storage ? createTableStorage(storage) : undefined), [storage]);
  const columns = useMemo(() => readColumns<T>(children), [children]);
  const leaves = useMemo(() => collectLeaves(columns), [columns]);
  const compact = useCompact(breakpoint);
  const isFetcher = typeof data === "function";
  const resolvedFilterMode = filterMode ?? (isFetcher ? "server" : "client");

  const [hiddenState, setHiddenState] = useState<string[]>(() => readStored(store, "columns.hidden", []));
  const [orderState, setOrderState] = useState<string[]>(() => readStored(store, "columns.sorted", []));
  const [segmentState, setSegmentState] = useState<string[]>(() => readStored(store, "columns.segments", []));
  const [rulesState, setRulesState] = useState<DataTableSortRule[]>(() =>
    readStored(store, "columns.sort", sortRules ?? (sortKey ? [{ key: sortKey, descending: sortDesc }] : [])),
  );
  const [filtersState, setFiltersState] = useState<Record<string, DataTableFilterValue | undefined>>(() =>
    readStored(store, "columns.filters", {}),
  );
  const [widthsState, setWidthsState] = useState<Record<string, number>>({});
  const [selectedState, setSelectedState] = useState<Array<number | string>>(() => readStored(store, "nodes.selected", []));
  const [limitState, setLimitState] = useState(limit);
  const [internalPage, setInternalPage] = useState(1);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [openArrays, setOpenArrays] = useState<string[]>([]);
  const [menuKey, setMenuKey] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ kind: "segment"; id: string } | { kind: "field"; segmentId: string; field: string } | null>(null);
  const [dragOver, setDragOver] = useState<{ kind: "segment"; id: string } | { kind: "field"; segmentId: string; field: string } | null>(null);
  const [edit, setEdit] = useState<{ index: number | string; field?: string } | null>(null);
  const [draft, setDraft] = useState<T | null>(null);
  const [remote, setRemote] = useState<T[]>([]);
  const [remotePages, setRemotePages] = useState<number | undefined>();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const filterAnchors = useRef<Record<string, HTMLButtonElement | null>>({});
  const widthsLoaded = useRef(false);

  const hidden = hiddenColumns ?? hiddenState;
  const order = columnOrder ?? orderState;
  const rules = sortRules ?? rulesState;
  const filters = columnFilters ?? filtersState;
  const widths = { ...widthsState, ...columnWidths };
  const selected = selectedRows ?? selectedState;
  const page = pageProp ?? internalPage;
  const pageSize = limitState > 0 ? limitState : 15;

  useEffect(() => {
    if (!store || widthsLoaded.current) return;
    widthsLoaded.current = true;
    const next: Record<string, number> = {};
    for (const leaf of leaves) {
      const width = store.getItem(`columns.${leaf.field}.width`);
      if (typeof width === "number") next[leaf.field] = width;
    }
    if (Object.keys(next).length > 0) setWidthsState(next);
  }, [store, leaves]);

  const filterKey = JSON.stringify(filters);
  useEffect(() => {
    if (typeof data !== "function") return;
    let cancel = false;
    setFetchLoading(true);
    data({ limit: pageSize, page, filters })
      .then((result) => {
        if (cancel) return;
        setRemote(result.data);
        setRemotePages(result.pages ?? (result.total != null ? Math.max(1, Math.ceil(result.total / pageSize)) : undefined));
        setFetchLoading(false);
      })
      .catch(() => {
        if (!cancel) setFetchLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [data, page, pageSize, filterKey, filters]);

  const source = isFetcher ? remote : data;
  const indexed = source.map((row, index) => ({ row, index }));
  const filtered = resolvedFilterMode === "client" ? filterRows(indexed, leaves.map((leaf) => leaf.source), filters) : indexed;
  const sorted = sortRows(filtered, rules);
  const keys = groupKeys ?? leaves.filter((leaf) => leaf.source.grouped).map((leaf) => leaf.field);
  const nodes = keys.length > 0 ? groupNodes(sorted, keys) : groupNodes(sorted, []);
  const clientPageCount = Math.max(1, Math.ceil(nodes.length / pageSize));
  const pageCount = isFetcher ? (remotePages ?? page) : clientPageCount;
  const safePage = isFetcher ? page : Math.min(page, clientPageCount);
  const pageNodes = isFetcher ? nodes : paginateRows(nodes, safePage, pageSize);
  const built = useMemo(() => collectSegments(columns), [columns]);
  const segments = presentSegments(orderSegments(built, segmentState, order), hidden);
  const ordered = segments.flatMap((segment) => segment.leaves);
  const hasActionsColumn = ordered.some((leaf) => leaf.source.actions);
  const resolvedRowActionsOnHover = rowActionsOnHover ?? (Boolean(rowActions?.length) && !hasActionsColumn);
  const showHoverSlot = resolvedRowActionsOnHover && !hasActionsColumn && Boolean(rowActions?.length);
  const editHoverSlot = editMode === "row" && edit !== null && !hasActionsColumn && !showHoverSlot;
  const hoverSlotStart = (showHoverSlot && rowActionsAt === "start") || (editHoverSlot && rowActionsAt === "start");
  const hoverSlotEnd = (showHoverSlot && rowActionsAt === "end") || (editHoverSlot && rowActionsAt === "end");
  const { actionLeavesStart, actionLeavesEnd } = partitionActionLeaves(ordered, rowActionsAt);
  const dataSegments = useMemo(() => dataSegmentsWithoutActions(segments), [segments]);
  const dataBodySpan = dataColumnsSpan(segments);
  const colSpan =
    dataBodySpan +
    (selectable ? 1 : 0) +
    actionLeavesStart.length +
    actionLeavesEnd.length +
    (hoverSlotStart ? 1 : 0) +
    (hoverSlotEnd ? 1 : 0) +
    (groupLayout === "unified" && keys.length > 0 ? 1 : 0);
  const flatPage = leafNodes(pageNodes);
  const virtual =
    keys.length === 0 &&
    virtualizeThreshold != null &&
    maxBodyHeight != null &&
    flatPage.length >= virtualizeThreshold;
  const windowed = virtual && maxBodyHeight != null ? windowRows(flatPage, scrollTop, maxBodyHeight, ROW_HEIGHT) : null;
  const bodyNodes = windowed ? windowed.items : pageNodes;
  const busy = loading || fetchLoading;

  const setPage = (next: number) => {
    onPageChange?.(next);
    if (pageProp === undefined) setInternalPage(next);
  };

  const setSelected = (next: Array<number | string>) => {
    onSelectedRowsChange?.(next);
    if (selectedRows === undefined) {
      setSelectedState(next);
      store?.setItem("nodes.selected", next);
    }
  };

  const setFilters = (next: Record<string, DataTableFilterValue | undefined>) => {
    onColumnFiltersChange?.(next);
    if (columnFilters === undefined) {
      setFiltersState(next);
      store?.setItem("columns.filters", next);
    }
    setPage(1);
  };

  const hideField = (field: string, nextHidden: boolean) => {
    const next = nextHidden ? [...new Set([...hidden, field])] : hidden.filter((item) => item !== field);
    onToggleColumn?.(field, nextHidden);
    if (hiddenColumns === undefined) {
      setHiddenState(next);
      store?.setItem("columns.hidden", next);
    }
  };

  const commitRules = (next: DataTableSortRule[]) => {
    onSortRulesChange?.(next);
    if (sortRules === undefined) {
      setRulesState(next);
      store?.setItem("columns.sort", next);
    }
  };

  const toggleExpand = (key: string) => {
    setExpanded((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  };

  const startEdit = (row: T, index: number | string, field?: string) => {
    setEdit({ index, field });
    setDraft({ ...row });
  };

  const saveEdit = () => {
    if (!edit || !draft) return;
    onRowEditComplete?.(draft, edit.index);
    setEdit(null);
    setDraft(null);
  };

  const downloadCsv = () => {
    const text = toCsv(sorted.map((item) => item.row), ordered);
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${excelFileName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const startResize = (field: string, event: ReactPointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const resizeFields = ordered.filter((leaf) => !leaf.source.actions).map((leaf) => leaf.field);
    const fieldIndex = resizeFields.indexOf(field);
    const nextField = fieldIndex >= 0 ? resizeFields[fieldIndex + 1] : undefined;
    if (!nextField) return;

    const startX = event.clientX;
    const leafWidth = (key: string) =>
      widths[key] ?? leaves.find((leaf) => leaf.field === key)?.source.width ?? 160;
    const startWidth = leafWidth(field);
    const nextStartWidth = leafWidth(nextField);

    const applySizes = (deltaX: number) => {
      const { width, nextWidth } = applyColumnResizePair(startWidth, nextStartWidth, deltaX, MIN_COLUMN_WIDTH);
      setWidthsState((current) => ({ ...current, [field]: width, [nextField]: nextWidth }));
      return { width, nextWidth };
    };

    const move = (moveEvent: PointerEvent) => {
      applySizes(moveEvent.clientX - startX);
    };
    const up = (upEvent: PointerEvent) => {
      const { width, nextWidth } = applySizes(upEvent.clientX - startX);
      onColumnResize?.(field, width);
      onColumnResize?.(nextField, nextWidth);
      store?.setItem(`columns.${field}.width`, width);
      store?.setItem(`columns.${nextField}.width`, nextWidth);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const commitSegments = (segmentIds: string[], fieldIds: string[]) => {
    onColumnOrder?.(fieldIds);
    if (columnOrder === undefined) {
      setOrderState(fieldIds);
      store?.setItem("columns.sorted", fieldIds);
    }
    setSegmentState(segmentIds);
    store?.setItem("columns.segments", segmentIds);
  };

  const dropSegment = (targetId: string) => {
    const current = drag;
    setDrag(null);
    setDragOver(null);
    if (!current || current.kind !== "segment" || current.id === targetId) return;
    const ids = segments.map((segment) => segment.id);
    const fromIndex = ids.indexOf(current.id);
    const toIndex = ids.indexOf(targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const nextIds = [...ids];
    const [moved] = nextIds.splice(fromIndex, 1);
    nextIds.splice(toIndex, 0, moved);
    const next = orderSegments(built, nextIds, order);
    commitSegments(
      next.map((segment) => segment.id),
      next.flatMap((segment) => segment.leaves.map((leaf) => leaf.field)),
    );
  };

  const dropField = (segmentId: string, targetField: string) => {
    const current = drag;
    setDrag(null);
    setDragOver(null);
    if (!current || current.kind !== "field" || current.segmentId !== segmentId || current.field === targetField) return;
    const next = segments.map((segment) => {
      if (segment.id !== segmentId) return segment;
      const fields = segment.leaves.map((leaf) => leaf.field);
      const fromIndex = fields.indexOf(current.field);
      const toIndex = fields.indexOf(targetField);
      if (fromIndex < 0 || toIndex < 0) return segment;
      const moved = [...fields];
      const [field] = moved.splice(fromIndex, 1);
      moved.splice(toIndex, 0, field);
      const map = new Map(segment.leaves.map((leaf) => [leaf.field, leaf]));
      return { ...segment, leaves: moved.map((fieldName) => map.get(fieldName)!) };
    });
    commitSegments(
      next.map((segment) => segment.id),
      next.flatMap((segment) => segment.leaves.map((leaf) => leaf.field)),
    );
  };

  return (
    <DataTableView
      colors={colors}
      style={style}
      noDataText={noDataText}
      error={error}
      withPagination={withPagination}
      withHeader={withHeader}
      withHeaderToggling={withHeaderToggling}
      withExcelExport={withExcelExport}
      selectable={selectable}
      rowActions={rowActions}
      rowActionsPanel={rowActionsPanel}
      rowActionsAt={rowActionsAt}
      rowActionsOnHover={resolvedRowActionsOnHover}
      hasActionsColumn={hasActionsColumn}
      showHoverSlot={showHoverSlot}
      hoverSlotStart={hoverSlotStart}
      hoverSlotEnd={hoverSlotEnd}
      actionLeavesStart={actionLeavesStart}
      actionLeavesEnd={actionLeavesEnd}
      dataSegments={dataSegments}
      bulkActions={bulkActions}
      breakpoint={breakpoint}
      layout={layout}
      onRow={onRow}
      maxBodyHeight={maxBodyHeight}
      limits={limits}
      groupLayout={groupLayout}
      groupAt={groupAt}
      editMode={editMode}
      multiSort={multiSort}
      selected={selected}
      setSelected={setSelected}
      edit={edit}
      draft={draft}
      setDraft={setDraft}
      startEdit={startEdit}
      saveEdit={saveEdit}
      openArrays={openArrays}
      setOpenArrays={setOpenArrays}
      menuKey={menuKey}
      setMenuKey={setMenuKey}
      toggleExpand={toggleExpand}
      filters={filters}
      setFilters={setFilters}
      openFilter={openFilter}
      setOpenFilter={setOpenFilter}
      filterAnchors={filterAnchors}
      rules={rules}
      commitRules={commitRules}
      setPage={setPage}
      widths={widths}
      startResize={startResize}
      drag={drag}
      setDrag={setDrag}
      dragOver={dragOver}
      setDragOver={setDragOver}
      dropSegment={dropSegment}
      dropField={dropField}
      segments={segments}
      ordered={ordered}
      keys={keys}
      pageNodes={pageNodes}
      bodyNodes={bodyNodes}
      windowed={windowed}
      busy={busy}
      colSpan={colSpan}
      source={source}
      leaves={leaves}
      columnsOpen={columnsOpen}
      setColumnsOpen={setColumnsOpen}
      hideField={hideField}
      hidden={hidden}
      downloadCsv={downloadCsv}
      safePage={safePage}
      isFetcher={isFetcher}
      remotePages={remotePages}
      pageCount={pageCount}
      clientPageCount={clientPageCount}
      pageSize={pageSize}
      setLimitState={setLimitState}
      setScrollTop={setScrollTop}
      compact={compact}
      expanded={expanded}
      markup={markup}
    />
  );
}

DataTable.Column = DataTableColumn;
