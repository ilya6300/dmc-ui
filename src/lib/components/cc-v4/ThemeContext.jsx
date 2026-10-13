import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getThemeColors } from "./themes.js";

const defaultSetTheme = () => {};

const ThemeContext = createContext({
  theme: "light",
  setTheme: defaultSetTheme,
  colors: getThemeColors("light"),
});

export function ThemeProvider({
  children,
  theme: themeProp,
  onThemeChange,
  defaultTheme = "light",
}) {
  const [internalTheme, setInternalTheme] = useState(defaultTheme);
  const isControlled = themeProp !== undefined;
  const theme = isControlled ? themeProp : internalTheme;

  const setTheme = useCallback(
    (next) => {
      const value = typeof next === "function" ? next(theme) : next;
      if (!isControlled) {
        setInternalTheme(value);
      }
      onThemeChange?.(value);
    },
    [isControlled, onThemeChange, theme],
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      colors: getThemeColors(theme),
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
