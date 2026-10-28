import {
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { ThemeColors } from "../themes";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

export type ButtonVariant = "filled" | "outline" | "tonal" | "text" | "plain" | "link";
export type ButtonColor = "primary" | "error" | "warning";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "round" | "rounded" | "square";

const SIZES: Record<ButtonSize, { minHeight: number; padding: string; fontSize: number }> = {
  sm: { minHeight: 28, padding: "4px 8px", fontSize: 12 },
  md: { minHeight: 36, padding: "8px 12px", fontSize: 14 },
  lg: { minHeight: 44, padding: "10px 16px", fontSize: 16 },
};

const BUTTON_BASE: CSSProperties = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  boxSizing: "border-box",
  margin: 0,
  borderStyle: "solid",
  borderWidth: 1,
  fontFamily: "inherit",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "0.04em",
  userSelect: "none",
  overflow: "hidden",
  transition:
    "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
};

const SECTION: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const SHADOW = "0 1px 3px rgba(0, 0, 0, 0.35)";
const SHADOW_HOVER = "0 8px 16px rgba(0, 0, 0, 0.28)";
const SHADOW_FOCUS = "0 4px 12px rgba(0, 0, 0, 0.32)";

const SOFT: Partial<Record<ButtonVariant, true>> = {
  text: true,
  plain: true,
  link: true,
};

function withAlpha(hex: string, alpha: number): string {
  if (typeof hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hex)) {
    return hex;
  }
  const channel = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${channel}`;
}

function inkOf(color: ButtonColor, colors: ThemeColors): string {
  if (color === "error") return colors.error;
  if (color === "warning") return colors.mastYellow;
  return colors.primary;
}

function labelOnFill(color: ButtonColor, colors: ThemeColors): string {
  if (color === "warning") return colors.textPrimary;
  return colors.knob;
}

function radiusOf(shape: ButtonShape): string | number {
  if (shape === "round") return "50%";
  if (shape === "rounded") return 999;
  if (shape === "square") return 0;
  return 4;
}

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "type"> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  block?: boolean;
  flat?: boolean;
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/** Кнопка: заливка, контур, тон и текст. Цвета — из текущей темы. */
export function Button({
  children,
  variant = "filled",
  color = "primary",
  size = "md",
  shape = "default",
  block = false,
  flat = false,
  loading = false,
  disabled = false,
  active = false,
  leftSection,
  rightSection,
  type = "button",
  style,
  onClick,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  const metrics = SIZES[size] ?? SIZES.md;
  const ink = inkOf(color, colors);
  const locked = disabled || loading;
  const hot = !locked && (hover || focused || pressed || active);
  const down = !locked && (pressed || active);
  const iconOnly = !children && !!leftSection !== !!rightSection;
  const soft = Boolean(SOFT[variant]);
  const raised = variant === "filled" || variant === "outline";

  let background = ink;
  let label = labelOnFill(color, colors);
  let borderColor = "transparent";

  if (variant === "outline") {
    background = "transparent";
    label = ink;
    borderColor = ink;
  } else if (variant === "tonal") {
    background = withAlpha(ink, hot ? 0.28 : 0.2);
    label = ink;
  } else if (soft) {
    background = hot ? withAlpha(ink, down ? 0.16 : 0.1) : "transparent";
    label = ink;
  } else if (hot) {
    background = ink;
  }

  const inset =
    variant === "filled" && hot && !locked
      ? `inset 0 0 0 999px rgba(0, 0, 0, ${down ? 0.22 : 0.12})`
      : null;
  const drop = !raised || flat || locked
    ? null
    : down
      ? null
      : hover
        ? SHADOW_HOVER
        : focused
          ? SHADOW_FOCUS
          : SHADOW;
  const focusRing =
    focused && !locked ? `0 0 0 3px ${withAlpha(colors.primary, 0.35)}` : null;
  const boxShadow = [inset, drop, focusRing].filter(Boolean).join(", ") || "none";

  const buttonStyle = mergeStyle(BUTTON_BASE, {
    minHeight: metrics.minHeight,
    minWidth: iconOnly || shape === "round" ? metrics.minHeight : undefined,
    padding: iconOnly || shape === "round" ? 0 : metrics.padding,
    fontSize: metrics.fontSize,
    width: block ? "100%" : undefined,
    borderRadius: radiusOf(shape),
    textTransform: variant === "link" ? "none" : "uppercase",
    textDecoration: variant === "link" && hover && !locked ? "underline" : "none",
    letterSpacing: variant === "link" ? "normal" : BUTTON_BASE.letterSpacing,
    backgroundColor: background,
    color: label,
    borderColor,
    boxShadow,
    opacity: locked ? 0.5 : soft && !hot ? 0.92 : 1,
    cursor: locked ? "not-allowed" : "pointer",
    transform: down ? "scale(0.98)" : "none",
    outline: "none",
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (locked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...rest}
      type={type}
      disabled={locked}
      aria-busy={loading || undefined}
      aria-pressed={active || undefined}
      style={mergeStyle(buttonStyle, style)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={handleClick}
    >
      {leftSection ? <span style={SECTION}>{leftSection}</span> : null}
      {children}
      {rightSection ? <span style={SECTION}>{rightSection}</span> : null}
    </button>
  );
}
