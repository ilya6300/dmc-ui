import React from "react";
import { mergeStyle } from "./tokens.js";
import { useTheme } from "./ThemeContext.jsx";

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
  ...rest
}) {
  const { theme } = useTheme();
  const Component = resolveIconComponent(theme, { component, darkComponent });

  if (Component) {
    const Resolved = Component;
    return (
      <Resolved
        style={mergeStyle(
          width != null || height != null
            ? { width, height, display: "block" }
            : null,
          style,
        )}
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
      style={mergeStyle({ display: "block" }, style)}
      {...rest}
    />
  );
}
