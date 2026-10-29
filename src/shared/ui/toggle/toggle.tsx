import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
import { mergeStyle } from "../tokens";

export type ToggleProps = {
  active?: boolean;
  label?: ReactNode;
  variant?: "switch" | "text";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (active: boolean) => void;
  style?: CSSProperties;
  size?: SizeName;
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
  size,
  disabled = false,
  ariaLabel,
  trackStartIcon,
  trackEndIcon,
}: ToggleProps) {
  const resolvedSize = resolveSize(size);

  if (variant === "text") {
    return label ? (
      <span className={cls("dmc-toggle", "dmc-toggle--text")} data-dmc-size={resolvedSize} style={style}>
        <span className="dmc-toggle__label">{label}</span>
      </span>
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

  return (
    <button
      type="button"
      className={cls("dmc-toggle")}
      data-dmc-size={resolvedSize}
      data-active={active ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      style={mergeStyle(style)}
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
