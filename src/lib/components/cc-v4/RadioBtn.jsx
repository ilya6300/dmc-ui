import React, { useState } from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";

const GROUP_BASE = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
};

const CHIP_BASE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 14px",
  minHeight: 30,
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  margin: 0,
  font: "inherit",
  boxSizing: "border-box",
  transition:
    "border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease",
};

function chipColors(active, accentHover, colors) {
  const highlighted = active || accentHover;
  return {
    borderColor: highlighted ? colors.primary : colors.toggleTrackOff,
    color: highlighted ? colors.primary : colors.textPrimary,
    backgroundColor: active ? colors.focusBg : colors.surface,
  };
}

function RadioChip({ name, active, action }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const accentHover = hovered || focused;

  const handleClick = (e) => {
    e.preventDefault();
    action?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={mergeStyle(CHIP_BASE, chipColors(active, accentHover, colors), {
        outline: focused ? "none" : undefined,
      })}
    >
      {name}
    </button>
  );
}

/** Группа chip-кнопок; выбор и `active` управляются родителем через `items`. */
export function RadioBtn({ items, style }) {
  const { colors } = useTheme();

  return (
    <div style={mergeStyle(GROUP_BASE, { color: colors.textPrimary }, style)}>
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
