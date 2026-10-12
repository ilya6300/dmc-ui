import React from "react";
import { joinClass } from "./joinClass";

/**
 * Единая кнопка v4: primary | outline | icon (mobile «+»).
 * @deprecated Используйте CcV4Button напрямую; BtnPrimaryv4/BtnOutlineV4 — re-export.
 */
export function CcV4Button({
  variant = "primary",
  onClick,
  text,
  children,
  className,
  type = "button",
  disabled,
  compact,
  footerSize,
  ...rest
}) {
  if (variant === "icon") {
    return (
      <div
        className={joinClass("btn_func_container_v4", className)}
        onClick={disabled ? undefined : onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(e);
          }
        }}
        {...rest}
      >
        <span className="btn_func_container_v4_span">+</span>
        {text !== undefined ? (
          <span className="btn_func_container_v4_text">{text}</span>
        ) : null}
      </div>
    );
  }

  const useCompactAction =
    variant === "primary" && !(footerSize || compact);

  const primaryClass = useCompactAction
    ? "btn-primary-v4 sub-status-action-btn"
    : "btn-primary-v4";

  const variantClass =
    variant === "outline" ? "btn-outline-v4" : primaryClass;

  return (
    <button
      type={type}
      className={joinClass(variantClass, className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children ?? text ?? (variant === "primary" ? "Добавить" : null)}
    </button>
  );
}
