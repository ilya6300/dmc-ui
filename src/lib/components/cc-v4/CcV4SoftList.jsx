import React from "react";
import { joinClass } from "./joinClass";

export function CcV4SoftList({ children, className }) {
  return (
    <div className={joinClass("cc-v4-soft-list-root", className)}>{children}</div>
  );
}

export function CcV4SoftListHeader({ gridClass, columns, children, className }) {
  return (
    <div
      className={joinClass("cc-v4-soft-header", gridClass, className)}
    >
      {children ??
        columns?.map((col) => (
          <span key={col.key} className="cc-v4-soft-th-static">
            <span className="cc-v4-soft-th-label">{col.label}</span>
          </span>
        ))}
    </div>
  );
}

export function CcV4SoftListBody({ children, className }) {
  return (
    <div className={joinClass("cc-v4-soft-body", className)}>{children}</div>
  );
}

export function CcV4SoftListRow({
  as: Component = "div",
  gridClass,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={joinClass(
        "cc-v4-soft-row",
        gridClass,
        "reports-soft-row",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
