import type { CSSProperties, ElementType } from "react";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

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
    size?: SizeName;
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
  size,
  ...rest
}: IconProps) {
  const { theme } = useTheme();
  const resolvedSize = resolveSize(size);
  const Component = resolveIconComponent(theme, { component, darkComponent });
  const hasExplicitSize = width != null || height != null;

  const sizeStyle: CSSProperties | null = !hasExplicitSize
    ? { width: "var(--dmc-icon-size)", height: "var(--dmc-icon-size)" }
    : { width, height, display: "block" };

  if (Component) {
    return (
      <Component
        className={cls("dmc-icon")}
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
      className={cls("dmc-icon")}
      data-dmc-size={!hasExplicitSize ? resolvedSize : undefined}
      style={mergeStyle(sizeStyle, style)}
      {...rest}
    />
  );
}
