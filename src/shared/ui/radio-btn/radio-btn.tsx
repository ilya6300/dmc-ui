import { useState, type CSSProperties, type MouseEvent } from "react";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
import { mergeStyle } from "../tokens";

export type RadioBtnItem = {
  name: string;
  active?: boolean;
  action?: () => void;
};

function RadioChip({ name, active, action }: RadioBtnItem) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const highlight = hovered || focused;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    action?.();
  };

  return (
    <button
      type="button"
      className={cls("dmc-radio-btn__chip")}
      data-active={active ? "true" : "false"}
      data-highlight={highlight ? "true" : "false"}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {name}
    </button>
  );
}

export type RadioBtnProps = {
  items?: RadioBtnItem[];
  style?: CSSProperties;
  size?: SizeName;
};

/** Группа chip-кнопок; выбор и `active` управляются родителем через `items`. */
export function RadioBtn({ items, style, size }: RadioBtnProps) {
  const resolvedSize = resolveSize(size);

  return (
    <div
      className={cls("dmc-radio-btn")}
      data-dmc-size={resolvedSize}
      style={mergeStyle(style)}
    >
      {items?.map((item) => (
        <RadioChip key={item.name} name={item.name} active={item.active} action={item.action} />
      ))}
    </div>
  );
}
