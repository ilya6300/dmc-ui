import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { SiteModalHeader } from "../../../lib/components/SiteModalHeader";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const CLOSE_BTN_BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  padding: 0,
  borderRadius: 6,
  cursor: "pointer",
  transition:
    "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease",
};

const CLOSE_BTN_FOCUS: CSSProperties = { outline: "none" };

export type SideDrawerCloseButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  style?: CSSProperties;
};

export function SideDrawerCloseButton({ onClick, title = "Закрыть", style }: SideDrawerCloseButtonProps) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const highlighted = hover || focused;

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      style={mergeStyle(
        CLOSE_BTN_BASE,
        {
          border: `1px solid ${colors.borderInput}`,
          background: colors.bgCard,
          color: colors.textMuted,
        },
        highlighted && {
          borderColor: colors.mainBlue1,
          color: colors.mainBlue1,
          backgroundColor: colors.focusBg,
        },
        focused && CLOSE_BTN_FOCUS,
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

const LAYOUT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0,
};

const PANEL_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%",
};

const FOOTER_STYLE: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16,
};

const ROOT_BASE: CSSProperties = {
  position: "fixed",
  zIndex: 3,
  top: 0,
  right: 0,
  bottom: 0,
  boxShadow: "0 0 10px 1px #00000070",
  borderRadius: 3,
  height: "100%",
  minHeight: 500,
  padding: "20px 24px",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  boxSizing: "border-box",
  transition: "transform 0.6s ease, opacity 0.6s ease",
};

export type SideDrawerProps = {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  titleId?: string;
  toolbar?: ReactNode;
  headerActions?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  w?: string;
  style?: CSSProperties;
  layoutStyle?: CSSProperties;
  rootStyle?: CSSProperties;
  usePortal?: boolean;
  closeOnBackdrop?: boolean;
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
  w,
  style,
  layoutStyle,
  rootStyle,
  usePortal = true,
  closeOnBackdrop = true,
}: SideDrawerProps) {
  const { colors } = useTheme();
  const [entered, setEntered] = useState(false);

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
    const onKeyDown = (e: KeyboardEvent) => {
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

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const headerToolbar = toolbar ?? headerActions;

  const rootMotion: CSSProperties = {
    transform: entered ? "translateX(0)" : "translateX(100%)",
    opacity: entered ? 1 : 0.92,
  };

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      style={mergeStyle(
        ROOT_BASE,
        { background: colors.bgCard, color: colors.textPrimary },
        rootMotion,
        w != null && { width: w },
        rootStyle,
      )}
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
