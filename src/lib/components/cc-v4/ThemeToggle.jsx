import React from "react";
import { mergeStyle } from "./tokens.js";
import { useTheme } from "./ThemeContext.jsx";
import { Toggle } from "./Toggle.jsx";

const THEME_TOGGLE_STYLE = {
  border: "none",
  outline: "none",
  boxShadow: "none",
};

const ICON_WRAP = { display: "flex", lineHeight: 0 };

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

/** Переключатель темы на базе Toggle с иконками луны и солнца в треке. */
export function ThemeToggle({
  theme: themeProp,
  onThemeChange,
  label = "Тёмная тема",
  style,
  disabled = false,
}) {
  const { theme: ctxTheme, setTheme } = useTheme();
  const theme = themeProp ?? ctxTheme;
  const isControlled = themeProp !== undefined && onThemeChange !== undefined;
  const isDark = theme === "dark";

  const handleChange = (active) => {
    const next = active ? "dark" : "light";
    if (isControlled) {
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
      trackStartIcon={
        <span style={ICON_WRAP}>
          <MoonIcon />
        </span>
      }
      trackEndIcon={
        <span style={ICON_WRAP}>
          <SunIcon />
        </span>
      }
      style={mergeStyle(THEME_TOGGLE_STYLE, style)}
    />
  );
}
