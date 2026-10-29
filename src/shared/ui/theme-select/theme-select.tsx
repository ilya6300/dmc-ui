import { useId, type CSSProperties, type ChangeEvent } from "react";
import { useTheme } from "../theme-context";
import { THEME_OPTIONS, type ThemeName } from "../themes";
import { mergeStyle } from "../tokens";

const SELECT_BASE: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.35,
  minHeight: 37,
  padding: "7px 28px 7px 11px",
  borderRadius: 6,
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  maxWidth: "100%",
};

export type ThemeOption = {
  value: ThemeName;
  label: string;
};

export type ThemeSelectProps = {
  theme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  label?: string;
  options?: ThemeOption[];
  disabled?: boolean;
  style?: CSSProperties;
  id?: string;
};

export function ThemeSelect({
  theme: themeProp,
  onThemeChange,
  label = "Тема",
  options = THEME_OPTIONS,
  disabled = false,
  style,
  id: idProp,
}: ThemeSelectProps) {
  const generatedId = useId();
  const { theme: ctxTheme, setTheme, colors } = useTheme();
  const theme = themeProp ?? ctxTheme;
  const isControlled = themeProp !== undefined && onThemeChange !== undefined;
  const selectId = idProp ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as ThemeName;
    if (isControlled) {
      onThemeChange(next);
      return;
    }
    setTheme(next);
  };

  const selectStyle = mergeStyle(
    SELECT_BASE,
    {
      color: colors.textPrimary,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    style,
  );

  return (
    <label
      htmlFor={selectId}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 4,
        color: colors.textPrimary,
        fontSize: 13,
      }}
    >
      {label ? <span style={{ fontSize: 12, color: colors.textSecondary }}>{label}</span> : null}
      <select
        id={selectId}
        value={theme}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label || "Выбор темы"}
        style={selectStyle}
      >
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
