import React from "react";
import { mergeStyle } from "./tokens";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

export function Toggle({
  active,
  label,
  variant = "switch",
  onClick,
  onChange,
  style,
  size,
  disabled = false,
  ariaLabel,
  trackStartIcon,
  trackEndIcon,
}) {
  const resolvedSize = resolveSize(size);

  if (variant === "text") {
    return label ? (
      <span
        className={joinClass("dmc-toggle", "dmc-toggle--text")}
        data-dmc-size={resolvedSize}
        style={style}
      >
        <span className="dmc-toggle__label">{label}</span>
      </span>
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

  return (
    <button
      type="button"
      className={joinClass("dmc-toggle")}
      data-dmc-size={resolvedSize}
      data-active={active ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      style={mergeStyle(undefined, style)}
      onClick={handleClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || (label ? undefined : "Переключатель")}
      disabled={disabled}
    >
      <span className="dmc-toggle__track" aria-hidden="true">
        {trackStartIcon || trackEndIcon ? (
          <span className="dmc-toggle__track-icons">
            <span className="dmc-toggle__track-icon">{trackStartIcon}</span>
            <span className="dmc-toggle__track-icon">{trackEndIcon}</span>
          </span>
        ) : null}
        <span className="dmc-toggle__knob" />
      </span>
      {label ? <span className="dmc-toggle__label">{label}</span> : null}
    </button>
  );
}
