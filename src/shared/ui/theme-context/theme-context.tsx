import {
  createContext,
  useCallback,
  useContext,
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
} from "../metrics";
import { getThemeColors, type ThemeColors, type ThemeName } from "../themes";
import { buildRootCssVars } from "../themeCssVars";

type ThemeUpdate = ThemeName | ((current: ThemeName) => ThemeName);

export type ThemeContextValue = {
  theme: ThemeName;
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
  theme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  defaultTheme?: ThemeName;
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

  const value = useMemo<ThemeContextValue>(() => {
    const baseColors = getThemeColors(theme);
    return {
      theme,
      setTheme,
      colors: stableColors ? { ...baseColors, ...stableColors } : baseColors,
      spacing: rootMetrics.spacing,
      padding: rootMetrics.padding,
      margin: rootMetrics.margin,
      radius: rootMetrics.radius,
      fontSize: rootMetrics.fontSize,
      sizes: controlSizes,
    };
  }, [theme, setTheme, stableColors]);

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
