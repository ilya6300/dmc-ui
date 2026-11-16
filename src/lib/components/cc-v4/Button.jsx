import React from "react";
import { mergeStyle } from "./tokens";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

const VARIANTS = new Set(["primary", "error", "outline", "green"]);

function resolveVariant(variant) {
  return VARIANTS.has(variant) ? variant : "primary";
}

export function Button({
  children,
  variant = "primary",
  size,
  type = "button",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const resolvedVariant = resolveVariant(variant);
  const resolvedSize = resolveSize(size);

  return (
    <button
      type={type}
      className={joinClass("dmc-button")}
      data-dmc-variant={resolvedVariant}
      data-dmc-size={resolvedSize}
      data-disabled={disabled ? "true" : "false"}
      disabled={disabled}
      style={mergeStyle(undefined, style)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}