import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";
import { SiteModalHeader } from "../SiteModalHeader";

export function SideDrawerCloseButton({ onClick, title = "Закрыть", style }) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);

  const closeBtnBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    padding: 0,
    border: `1px solid ${colors.borderInput}`,
    borderRadius: 6,
    background: colors.bgCard,
    color: colors.textMuted,
    cursor: "pointer",
    transition:
      "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease",
  };

  const closeBtnHover = {
    borderColor: colors.mainBlue1,
    color: colors.mainBlue1,
    backgroundColor: colors.focusBg,
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      style={mergeStyle(
        closeBtnBase,
        (hover || focused) && closeBtnHover,
        focused && { outline: "none" },
        style,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

const LAYOUT_STYLE = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0,
};

const PANEL_STYLE = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%",
};

const FOOTER_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16,
};

export function SideDrawer({
  open = true,
  onClose,
  title,
  titleId,
  toolbar,
  headerActions,
  children,
  footer,
  style,
  layoutStyle,
  rootStyle,
  usePortal = true,
  closeOnBackdrop = true,
}) {
  const { colors } = useTheme();
  const [entered, setEntered] = useState(false);

  const rootBase = {
    position: "fixed",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 0 10px 1px #00000070",
    borderRadius: 3,
    background: colors.bgCard,
    height: "100%",
    minHeight: 500,
    padding: "20px 24px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    color: colors.textPrimary,
    transition: "transform 0.6s ease, opacity 0.6s ease",
  };

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return undefined;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

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

  const rootMotion = {
    transform: entered ? "translateX(0)" : "translateX(100%)",
    opacity: entered ? 1 : 0.92,
  };

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      style={mergeStyle(rootBase, rootMotion, rootStyle)}
    >
      <div
        style={mergeStyle(LAYOUT_STYLE, layoutStyle)}
        onClick={(e) => e.stopPropagation()}
      >
        <section
          style={mergeStyle(PANEL_STYLE, style)}
          aria-labelledby={titleId}
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
        {footer ? <div style={FOOTER_STYLE}>{footer}</div> : null}
      </div>
    </div>
  );

  if (usePortal) {
    return createPortal(content, document.body);
  }
  return content;
}
