import React from "react";
import { mergeStyle } from "./tokens.js";
import { useTheme } from "./ThemeContext.jsx";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

/**
 * @returns {React.ElementType | null}
 */
export function resolveIconComponent(theme, { component, darkComponent }) {
  if (theme === "dark" && darkComponent) {
    return darkComponent;
  }
  if (component) {
    return component;
  }
  return null;
}

export function resolveIconSrc(theme, { src, darkSrc }) {
  if (theme === "dark") {
    return darkSrc || src;
  }
  return src;
}

/** Иконка: img (src / darkSrc) или React-компонент (component / darkComponent). */
export function Icon({
  src,
  darkSrc,
  component,
  darkComponent,
  alt = "",
  style,
  width,
  height,
  size,
  ...rest
}) {
  const { theme } = useTheme();
  const resolvedSize = resolveSize(size);
  const Component = resolveIconComponent(theme, { component, darkComponent });
  const hasExplicitSize = width != null || height != null;

  const sizeStyle =
    !hasExplicitSize
      ? {
          width: "var(--dmc-icon-size)",
          height: "var(--dmc-icon-size)",
        }
      : width != null || height != null
        ? { width, height, display: "block" }
        : null;

  if (Component) {
    const Resolved = Component;
    return (
      <Resolved
        className={joinClass("dmc-icon")}
        data-dmc-size={!hasExplicitSize ? resolvedSize : undefined}
        style={mergeStyle(sizeStyle, style)}
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        {...rest}
      />
    );
  }

  const iconSrc = resolveIconSrc(theme, { src, darkSrc });
  if (!iconSrc) {
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={alt}
      width={width}
      height={height}
      className={joinClass("dmc-icon")}
      data-dmc-size={!hasExplicitSize ? resolvedSize : undefined}
      style={mergeStyle(sizeStyle ?? { display: "block" }, style)}
      {...rest}
    />
  );
}
