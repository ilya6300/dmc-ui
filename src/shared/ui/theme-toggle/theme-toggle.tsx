import type { CSSProperties } from "react";
import type { ThemeName } from "../themes";
import { useTheme } from "../theme-context";
import { Toggle } from "../toggle";
import { mergeStyle } from "../tokens";

const THEME_TOGGLE_STYLE: CSSProperties = {
  border: "none",
  outline: "none",
  boxShadow: "none",
};

const ICON_WRAP: CSSProperties = { display: "flex", lineHeight: 0 };

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.42 1.42" />
      <path d="m17.65 17.65 1.42 1.42" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.35 17.65-1.42 1.42" />
      <path d="m19.07 4.93-1.42 1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7.75 7.75 0 1 0 20.5 14.2Z" />
    </svg>
  );
}

const TRACK_START_ICON = (
  <span style={ICON_WRAP}>
    <MoonIcon />
  </span>
);
const TRACK_END_ICON = (
  <span style={ICON_WRAP}>
    <SunIcon />
  </span>
);

export type ThemeToggleProps = {
  theme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  label?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

/** Переключатель темы на базе Toggle с иконками луны и солнца в треке. */
export function ThemeToggle({
  theme: themeProp,
  onThemeChange,
  label = "Тёмная тема",
  style,
  disabled = false,
}: ThemeToggleProps) {
  const { theme: ctxTheme, setTheme } = useTheme();
  const theme = themeProp ?? ctxTheme;
  const isDark = theme === "dark";

  const handleChange = (active: boolean) => {
    const next: ThemeName = active ? "dark" : "light";
    if (themeProp !== undefined && onThemeChange) {
      onThemeChange(next);
      return;
    }
    setTheme(next);
  };

  const ariaLabel = isDark ? "Включить светлую тему" : "Включить тёмную тему";

  return (
    <Toggle
      active={isDark}
      label={label}
      onChange={handleChange}
      disabled={disabled}
      ariaLabel={label || ariaLabel}
      trackStartIcon={TRACK_START_ICON}
      trackEndIcon={TRACK_END_ICON}
      style={mergeStyle(THEME_TOGGLE_STYLE, style)}
    />
  );
}
