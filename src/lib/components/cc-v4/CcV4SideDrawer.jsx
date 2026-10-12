import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { joinClass } from "./joinClass";
import { SiteModalHeader } from "../SiteModalHeader";

/**
 * Боковая панель v4: `posi-abs` + `subscription-drawer-v4`.
 * По умолчанию `open={true}` — родитель монтирует/размонтирует.
 */
export function CcV4SideDrawer({
  open = true,
  onClose,
  title,
  titleId,
  toolbar,
  headerActions,
  children,
  footer,
  className,
  style,
  layoutStyle,
  rootClassName,
  usePortal = true,
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !onClose) {
      return undefined;
    }
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const headerToolbar = toolbar ?? headerActions;

  const content = (
    <div
      className={joinClass("posi-abs", "subscription-drawer-v4", rootClassName)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
    >
      <div className="flex_center subscription-drawer-layout" style={layoutStyle}>
        <section
          className={joinClass(
            "subscription-drawer-main",
            "site-modal",
            className,
          )}
          style={style}
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          {title ? (
            <SiteModalHeader
              title={title}
              titleId={titleId}
              toolbar={headerToolbar}
            />
          ) : null}
          {children}
        </section>
        {footer ? (
          <div className="btn-container-new-company subscription-drawer-actions">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (usePortal) {
    return createPortal(content, document.body);
  }
  return content;
}
