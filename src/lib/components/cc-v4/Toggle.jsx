import React from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";

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
}) {
  const { colors } = useTheme();

  const labelStyle = {
    color: colors.textMain,
    fontWeight: 400,
    fontSize: 14,
  };

  const wrapperStyle = {
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

  const trackBase = {
    position: "relative",
    width: 36,
    height: 20,
    borderRadius: 20,
    flexShrink: 0,
    transition: "background-color 0.2s",
  };

  const knobStyle = {
    position: "absolute",
    top: 2,
    left: 2,
    width: 16,
    height: 16,
    backgroundColor: colors.knob,
    borderRadius: "50%",
    transition: "transform 0.2s",
    zIndex: 1,
  };

  if (variant === "text") {
    return label ? (
      <span style={mergeStyle(labelStyle, style)}>{label}</span>
    ) : null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onClick?.(e);
    onChange?.(!active);
  };

  const trackStyle = mergeStyle(trackBase, {
    backgroundColor: active ? colors.mainBlue1 : colors.toggleTrackOff,
  });

  const trackIconsLayer = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 3px",
    boxSizing: "border-box",
    pointerEvents: "none",
    color: active ? colors.knob : colors.textMuted,
  };

  const knobMerged = mergeStyle(knobStyle, {
    transform: active ? "translateX(16px)" : "translateX(0)",
  });

  const buttonStyle = mergeStyle(
    wrapperStyle,
    disabled && { cursor: "not-allowed", opacity: 0.55 },
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
        {(trackStartIcon || trackEndIcon) ? (
          <span style={trackIconsLayer}>
            <span style={{ display: "flex", lineHeight: 0 }}>{trackStartIcon}</span>
            <span style={{ display: "flex", lineHeight: 0 }}>{trackEndIcon}</span>
          </span>
        ) : null}
        <span style={knobMerged} />
      </span>
      {label ? <span style={labelStyle}>{label}</span> : null}
    </button>
  );
}
