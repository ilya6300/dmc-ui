import React, { useState } from "react";
import { mergeStyle } from "./tokens";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

function RadioChip({ name, active, action }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const highlight = hovered || focused;

  const handleClick = (e) => {
    e.preventDefault();
    action?.();
  };

  return (
    <button
      type="button"
      className={joinClass("dmc-radio-btn__chip")}
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

/** Группа chip-кнопок; выбор и `active` управляются родителем через `items`. */
export function RadioBtn({ items, style, size }) {
  const resolvedSize = resolveSize(size);

  return (
    <div
      className={joinClass("dmc-radio-btn")}
      data-dmc-size={resolvedSize}
      style={mergeStyle(undefined, style)}
    >
      {items?.map((item) => (
        <RadioChip
          key={item.name}
          name={item.name}
          active={item.active}
          action={item.action}
        />
      ))}
    </div>
  );
}
