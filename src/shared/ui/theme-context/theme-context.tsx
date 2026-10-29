import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getThemeColors, type ThemeColors, type ThemeName } from "../themes";

type ThemeUpdate = ThemeName | ((current: ThemeName) => ThemeName);

export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (next: ThemeUpdate) => void;
  colors: ThemeColors;
};

const defaultSetTheme = () => {};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: defaultSetTheme,
  colors: getThemeColors("light"),
});

export type ThemeProviderProps = {
  children?: ReactNode;
  theme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  defaultTheme?: ThemeName;
};

export function ThemeProvider({
  children,
  theme: themeProp,
  onThemeChange,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [internalTheme, setInternalTheme] = useState<ThemeName>(defaultTheme);
  const isControlled = themeProp !== undefined;
  const theme = isControlled ? themeProp : internalTheme;

  const setTheme = useCallback(
    (next: ThemeUpdate) => {
      const value = typeof next === "function" ? next(theme) : next;
      if (!isControlled) {
        setInternalTheme(value);
      }
      onThemeChange?.(value);
    },
    [isControlled, onThemeChange, theme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      colors: getThemeColors(theme),
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className="dmc-root" data-dmc-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
