import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../button";
import { Input } from "../../input";
import { useTheme } from "../../theme-context";
import { headerText } from "../columns";
import { compareDraft } from "../pipeline";
import type { DataTableCompareOp, DataTableFilter, DataTableFilterDropdownProps, DataTableFilterValue, DataTableLeaf } from "../types";

const COMPARE_OPS: DataTableCompareOp[] = ["gt", "gte", "eq", "lte", "lt"];

export function FilterPanel<T>({
  anchor,
  column,
  value,
  onApply,
  onClear,
  onClose,
}: {
  anchor: HTMLElement | null;
  column: DataTableLeaf<T>;
  value: DataTableFilterValue | undefined;
  onApply: (value: DataTableFilterValue) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const { colors } = useTheme();
  const filter: DataTableFilter<T> = column.source.filter ?? { type: "search" };
  const [draft, setDraft] = useState<DataTableFilterValue>(
    value ?? (filter.type === "select" ? [] : filter.type === "compare" ? { op: "eq", value: "" } : ""),
  );
  const [place, setPlace] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setPlace({ top: rect.bottom + 4, left: rect.left });
  }, [anchor]);

  const dropdownProps: DataTableFilterDropdownProps = {
    selectedKeys: draft == null ? [] : [draft],
    setSelectedKeys: (keys) => setDraft(keys[0] ?? null),
    confirm: () => onApply(draft),
    clearFilters: onClear,
    close: onClose,
  };

  return createPortal(
    <div
      className="dmc-data-table__filter"
      role="dialog"
      aria-label={`Фильтр ${headerText(column.header, column.field)}`}
      style={{
        top: place.top,
        left: place.left,
        background: colors.surface,
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
      }}
    >
      {filter.type === "search" ? (
        <Input
          placeholder={filter.placeholder ?? "Поиск"}
          value={typeof draft === "string" ? draft : ""}
          onChange={(event) => setDraft(event.target.value)}
        />
      ) : null}
      {filter.type === "compare" ? (
        <div className="dmc-data-table__compare">
          <select
            aria-label="Оператор"
            value={compareDraft(draft).op}
            onChange={(event) =>
              setDraft({
                op: event.target.value as DataTableCompareOp,
                value: compareDraft(draft).value,
              })
            }
          >
            {(filter.operators ?? COMPARE_OPS).map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          <Input
            type={filter.valueType === "date" ? "text" : "number"}
            value={compareDraft(draft).value}
            onChange={(event) =>
              setDraft({
                op: compareDraft(draft).op,
                value: event.target.value,
              })
            }
          />
        </div>
      ) : null}
      {filter.type === "select" ? (
        <div className="dmc-data-table__select-list">
          {filter.filters.map((option) => {
            const picked = Array.isArray(draft) ? draft : [];
            const checked = picked.includes(option.value);
            return (
              <label key={String(option.value)}>
                <input
                  type={filter.multiple ? "checkbox" : "radio"}
                  name={column.field}
                  checked={checked}
                  onChange={() => {
                    if (filter.multiple) {
                      setDraft(checked ? picked.filter((item) => item !== option.value) : [...picked, option.value]);
                      return;
                    }
                    setDraft([option.value]);
                  }}
                />
                {option.text}
              </label>
            );
          })}
        </div>
      ) : null}
      {filter.type === "custom" ? filter.filterDropdown(dropdownProps) : null}
      {filter.type === "custom" ? null : (
        <div className="dmc-data-table__filter-actions">
          <Button type="button" onClick={() => onApply(draft)}>Ок</Button>
          <Button type="button" variant="text" onClick={onClear}>Сброс</Button>
        </div>
      )}
    </div>,
    document.body,
  );
}
