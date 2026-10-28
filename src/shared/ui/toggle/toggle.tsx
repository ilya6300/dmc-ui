import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const LABEL_FONT: CSSProperties = {
  fontWeight: 400,
  fontSize: 14,
};

const WRAPPER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  margin: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "none",
  font: "inherit",
  color: "inherit",
  textAlign: "left",
};

const TRACK_BASE: CSSProperties = {
  position: "relative",
  width: 36,
  height: 20,
  borderRadius: 20,
  flexShrink: 0,
  transition: "background-color 0.2s",
};

const KNOB_BASE: CSSProperties = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 16,
  height: 16,
  borderRadius: "50%",
  transition: "transform 0.2s",
  zIndex: 1,
};

const TRACK_ICONS_BASE: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 3px",
  boxSizing: "border-box",
  pointerEvents: "none",
};

const ICON_SLOT: CSSProperties = { display: "flex", lineHeight: 0 };
const DISABLED_STYLE: CSSProperties = { cursor: "not-allowed", opacity: 0.55 };

export type ToggleProps = {
  active?: boolean;
  label?: ReactNode;
  variant?: "switch" | "text";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (active: boolean) => void;
  style?: CSSProperties;
  disabled?: boolean;
  ariaLabel?: string;
  trackStartIcon?: ReactNode;
  trackEndIcon?: ReactNode;
};

export function Toggle({
  active,
  label,
  variant = "switch",
  onClick,
  onChange,
  style,
  disabled = false,
  ariaLabel,
  trackStartIcon,
  trackEndIcon,
}: ToggleProps) {
  const { colors } = useTheme();
  const labelStyle = mergeStyle(LABEL_FONT, { color: colors.textMain });

  if (variant === "text") {
    return label ? (
      <span style={mergeStyle(labelStyle, style)}>{label}</span>
    ) : null;
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onClick?.(e);
    onChange?.(!active);
  };

  const trackStyle = mergeStyle(TRACK_BASE, {
    backgroundColor: active ? colors.mainBlue1 : colors.toggleTrackOff,
  });

  const trackIconsLayer = mergeStyle(TRACK_ICONS_BASE, {
    color: active ? colors.knob : colors.textMuted,
  });

  const knobMerged = mergeStyle(KNOB_BASE, {
    backgroundColor: colors.knob,
    transform: active ? "translateX(16px)" : "translateX(0)",
  });

  const buttonStyle = mergeStyle(
    WRAPPER_STYLE,
    disabled && DISABLED_STYLE,
    style,
  );

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={handleClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || (label ? undefined : "Переключатель")}
      disabled={disabled}
    >
      <span style={trackStyle} aria-hidden="true">
        {trackStartIcon || trackEndIcon ? (
          <span style={trackIconsLayer}>
            <span style={ICON_SLOT}>{trackStartIcon}</span>
            <span style={ICON_SLOT}>{trackEndIcon}</span>
          </span>
        ) : null}
        <span style={knobMerged} />
      </span>
      {label ? <span style={labelStyle}>{label}</span> : null}
    </button>
  );
}
