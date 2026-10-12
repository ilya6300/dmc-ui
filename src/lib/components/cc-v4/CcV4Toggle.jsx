import React from "react";
import { joinClass } from "./joinClass";

export function CcV4Toggle({
  active,
  label,
  description,
  onClick,
  onChange,
  className = "",
  disabled = false,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onClick?.(e);
    onChange?.(!active);
  };

  const hasText = Boolean(label || description);

  return (
    <button
      type="button"
      className={joinClass(
        "cc-v4-toggle-wrapper",
        hasText && "cc-v4-toggle-wrapper--with-text",
        className,
      )}
      onClick={handleClick}
      aria-pressed={!!active}
      disabled={disabled}
    >
      <span
        className={joinClass(
          "cc-v4-toggle",
          active && "cc-v4-toggle--on",
        )}
        aria-hidden="true"
      />
      {hasText ? (
        <span className="cc-v4-toggle-text">
          {label ? <span className="cc-v4-toggle-label">{label}</span> : null}
          {description ? (
            <span className="cc-v4-toggle-description">{description}</span>
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
