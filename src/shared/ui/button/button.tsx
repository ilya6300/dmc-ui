import type { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";
import { Sections, Unstyled } from "../../internal";
import { cls } from "../../lib";
import "./button.css";

export type ButtonVariant = "filled" | "outline" | "tonal" | "text" | "plain" | "link";
export type ButtonColor = "primary" | "error" | "warning" | "secondary" | "success";
export type ButtonSize = "s" | "m" | "l";
export type ButtonShape = "default" | "round" | "rounded" | "square";

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

/** Кнопка на Unstyled и Sections. Цвета и состояния — в button.css, токены `--dmc-button-`. */
export function Button({
  children,
  variant = "filled",
  color = "primary",
  size = "m",
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
  className,
  ...rest
}: ButtonProps) {
  const locked = disabled || loading;
  const iconOnly = !children && !!leftSection !== !!rightSection;
  const compact = iconOnly || shape === "round";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (locked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <Unstyled
      as="button"
      type={type}
      prefix="button"
      d="inline-flex"
      align="center"
      justify="center"
      pos="relative"
      p={compact ? 0 : size}
      {...rest}
      data-dmc-size={size}
      data-color={color}
      className={cls(
        "dmc-button",
        `dmc-button--${variant}`,
        shape !== "default" ? `dmc-button--${shape}` : undefined,
        block ? "dmc-button--block" : undefined,
        flat ? "dmc-button--flat" : undefined,
        loading ? "dmc-button--loading" : undefined,
        active ? "dmc-button--active" : undefined,
        iconOnly ? "dmc-button--icon" : undefined,
        className,
      )}
      style={style}
      disabled={locked}
      aria-busy={loading || undefined}
      aria-pressed={active || undefined}
      onClick={handleClick}
    >
      <Sections
        row
        noWrap
        align="center"
        justify="center"
        leftSection={leftSection}
        rightSection={rightSection}
        style={{ padding: 0, borderRadius: 0 }}
      >
        {children}
      </Sections>
    </Unstyled>
  );
}
