import React from "react";
import { joinClass } from "./joinClass";

export function CcV4Input({
  className,
  legacy = false,
  v4 = true,
  error,
  ...inputProps
}) {
  const inputClass = joinClass(
    legacy && "input_edit_v1",
    v4 && "site-form-control",
    error && "cc-v4-input--error",
    className,
  );

  return <input className={inputClass} {...inputProps} />;
}
