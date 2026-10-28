import { useState, type CSSProperties, type MouseEvent } from "react";
import { useTheme } from "../theme-context";
import { DARK_UI_TEXT, themes, type ThemeColors } from "../themes";
import { mergeStyle } from "../tokens";

const GROUP_BASE: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
};

const CHIP_BASE: CSSProperties = {
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

function isDarkPalette(colors: ThemeColors) {
  return colors.background === themes.dark.background;
}

function chipColors(
  active: boolean | undefined,
  accentHover: boolean,
  colors: ThemeColors,
): CSSProperties {
  const highlighted = active || accentHover;
  const idleMuted = isDarkPalette(colors) ? DARK_UI_TEXT : colors.toggleTrackOff;
  const idleText = isDarkPalette(colors) ? DARK_UI_TEXT : colors.textPrimary;

  if (!active && isDarkPalette(colors)) {
    return {
      borderColor: highlighted ? colors.primary : idleMuted,
      color: highlighted ? colors.primary : idleText,
      backgroundColor: "transparent",
    };
  }

  return {
    borderColor: highlighted ? colors.primary : colors.toggleTrackOff,
    color: highlighted ? colors.primary : colors.textPrimary,
    backgroundColor: active ? colors.focusBg : "transparent",
  };
}

export type RadioBtnItem = {
  name: string;
  active?: boolean;
  action?: () => void;
};

function RadioChip({ name, active, action }: RadioBtnItem) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const accentHover = hovered || focused;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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

export type RadioBtnProps = {
  items?: RadioBtnItem[];
  style?: CSSProperties;
};

/** Группа chip-кнопок; выбор и `active` управляются родителем через `items`. */
export function RadioBtn({ items, style }: RadioBtnProps) {
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
