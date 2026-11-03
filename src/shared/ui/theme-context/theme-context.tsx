import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  controlSizes,
  rootMetrics,
  type ControlMetrics,
  type ScaleSizeKey,
  type SizeScale,
} from "./metrics";
import { getThemeColors, type ThemeChoice, type ThemeColors, type ThemeName } from "./themes";
import { buildRootCssVars } from "./themeCssVars";

type ThemeUpdate = ThemeChoice | ((current: ThemeChoice) => ThemeChoice);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function readSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

function resolveTheme(choice: ThemeChoice, systemTheme: "light" | "dark"): ThemeName {
  if (choice === "system") return systemTheme;
  return choice;
}

export type ThemeContextValue = {
  /** Разрешённая палитра: light, dark или gray. */
  theme: ThemeName;
  /** Выбранный пункт, включая system. */
  preference: ThemeChoice;
  setTheme: (next: ThemeUpdate) => void;
  colors: ThemeColors;
  /** Read-only из CSS (`--dmc-spacing` по data-dmc-size). */
  spacing: SizeScale;
  padding: SizeScale;
  margin: SizeScale;
  radius: SizeScale;
  fontSize: SizeScale;
  sizes: Record<ScaleSizeKey, ControlMetrics>;
};

const defaultColors = getThemeColors("light");

const defaultSetTheme = () => {};

function sameColorOverride(
  prev: Partial<ThemeColors> | undefined,
  next: Partial<ThemeColors> | undefined,
): boolean {
  if (prev === next) return true;
  if (!prev || !next) return false;
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  if (prevKeys.length !== nextKeys.length) return false;
  for (const key of nextKeys) {
    if (prev[key as keyof ThemeColors] !== next[key as keyof ThemeColors]) return false;
  }
  return true;
}

function useStableColorOverride(colors: Partial<ThemeColors> | undefined) {
  const ref = useRef(colors);
  if (!sameColorOverride(ref.current, colors)) {
    ref.current = colors;
  }
  return ref.current;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  preference: "light",
  setTheme: defaultSetTheme,
  colors: defaultColors,
  spacing: rootMetrics.spacing,
  padding: rootMetrics.padding,
  margin: rootMetrics.margin,
  radius: rootMetrics.radius,
  fontSize: rootMetrics.fontSize,
  sizes: controlSizes,
});

export type ThemeProviderProps = {
  children?: ReactNode;
  theme?: ThemeChoice;
  onThemeChange?: (theme: ThemeChoice) => void;
  defaultTheme?: ThemeChoice;
  /** Переопределение цветов темы (CSS vars на корне + useTheme().colors). */
  colors?: Partial<ThemeColors>;
};

export function ThemeProvider({
  children,
  theme: themeProp,
  onThemeChange,
  defaultTheme = "light",
  colors: colorsOverride,
}: ThemeProviderProps) {
  const stableColors = useStableColorOverride(colorsOverride);
  const [internalPreference, setInternalPreference] = useState<ThemeChoice>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(readSystemTheme);
  const isControlled = themeProp !== undefined;
  const preference = isControlled ? themeProp : internalPreference;
  const theme = resolveTheme(preference, systemTheme);

  useEffect(() => {
    if (preference !== "system" || typeof window.matchMedia !== "function") {
      return;
    }
    const query = window.matchMedia(COLOR_SCHEME_QUERY);
    const apply = () => setSystemTheme(query.matches ? "dark" : "light");
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [preference]);

  const setTheme = useCallback(
    (next: ThemeUpdate) => {
      const value = typeof next === "function" ? next(preference) : next;
      if (!isControlled) {
        setInternalPreference(value);
      }
      onThemeChange?.(value);
    },
    [isControlled, onThemeChange, preference],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const baseColors = getThemeColors(theme);
    return {
      theme,
      preference,
      setTheme,
      colors: stableColors ? { ...baseColors, ...stableColors } : baseColors,
      spacing: rootMetrics.spacing,
      padding: rootMetrics.padding,
      margin: rootMetrics.margin,
      radius: rootMetrics.radius,
      fontSize: rootMetrics.fontSize,
      sizes: controlSizes,
    };
  }, [theme, preference, setTheme, stableColors]);

  const rootStyle = useMemo(() => buildRootCssVars(stableColors), [stableColors]);

  return (
    <ThemeContext.Provider value={value}>
      <div className="dmc-root" data-dmc-theme={theme} style={rootStyle}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
