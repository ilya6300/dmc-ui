import type { CSSProperties, ElementType } from "react";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

const BLOCK: CSSProperties = { display: "block" };

type IconComponentSource = {
  component?: ElementType;
  darkComponent?: ElementType;
};

type IconSrcSource = {
  src?: string;
  darkSrc?: string;
};

export function resolveIconComponent(
  theme: string,
  { component, darkComponent }: IconComponentSource,
): ElementType | null {
  if (theme === "dark" && darkComponent) {
    return darkComponent;
  }
  if (component) {
    return component;
  }
  return null;
}

export function resolveIconSrc(theme: string, { src, darkSrc }: IconSrcSource): string | undefined {
  if (theme === "dark") {
    return darkSrc || src;
  }
  return src;
}

export type IconProps = IconComponentSource &
  IconSrcSource & {
    alt?: string;
    style?: CSSProperties;
    width?: number | string;
    height?: number | string;
    [key: string]: unknown;
  };

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
}: IconProps) {
  const { theme } = useTheme();
  const Component = resolveIconComponent(theme, { component, darkComponent });

  if (Component) {
    return (
      <Component
        style={mergeStyle(
          width != null || height != null ? { width, height, ...BLOCK } : null,
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
      style={mergeStyle(BLOCK, style)}
      {...rest}
    />
  );
}
