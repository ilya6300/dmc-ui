import React, { useState } from "react";
import { mergeStyle, tokens } from "./tokens";

const LABEL_STYLE = {
  color: tokens.textMain,
  fontWeight: 400,
  fontSize: 14,
};

const WRAPPER_STYLE = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  margin: 0,
  padding: 0,
  border: "none",
  background: "none",
  font: "inherit",
  color: "inherit",
  textAlign: "left",
};

const TRACK_BASE = {
  position: "relative",
  width: 36,
  height: 20,
  borderRadius: 20,
  flexShrink: 0,
  transition: "background-color 0.2s",
};

const KNOB_STYLE = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  transition: "transform 0.2s",
};

export function Toggle({
  active,
  label,
  variant = "switch",
  onClick,
  onChange,
  style,
  disabled = false,
}) {
  const [focused, setFocused] = useState(false);

  if (variant === "text") {
    return label ? (
      <span style={mergeStyle(LABEL_STYLE, style)}>{label}</span>
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

  const trackStyle = mergeStyle(TRACK_BASE, {
    backgroundColor: active ? tokens.mainBlue1 : tokens.toggleTrackOff,
  });

  const knobStyle = mergeStyle(KNOB_STYLE, {
    transform: active ? "translateX(16px)" : "translateX(0)",
  });

  const buttonStyle = mergeStyle(
    WRAPPER_STYLE,
    disabled && { cursor: "not-allowed", opacity: 0.55 },
    focused && {
      outline: `2px solid ${tokens.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4,
    },
    style,
  );

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={handleClick}
      aria-pressed={!!active}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span style={trackStyle} aria-hidden="true">
        <span style={knobStyle} />
      </span>
      {label ? <span style={LABEL_STYLE}>{label}</span> : null}
    </button>
  );
}
