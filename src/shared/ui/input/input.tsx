import {
  useId,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { ThemeColors } from "../themes";
import { useTheme } from "../theme-context";
import { mergeStyle } from "../tokens";

/** Семантика пропа `type` → нативный `input.type`. */
export const INPUT_NATIVE_TYPE = {
  text: "text",
  number: "number",
  key: "number",
} as const;

export type InputType = keyof typeof INPUT_NATIVE_TYPE;

const WIDTH_BY_SEMANTIC_TYPE: Record<InputType, { minWidth: number; maxWidth: number }> = {
  text: { minWidth: 132, maxWidth: 500 },
  number: { minWidth: 80, maxWidth: 120 },
  key: { minWidth: 80, maxWidth: 120 },
};

const KEYPAD_ROWS = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
];

const MONO_FONT =
  'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace';

const KEYPAD_BUTTON_BASE: CSSProperties = {
  boxSizing: "border-box",
  minHeight: 36,
  minWidth: 36,
  padding: "6px 8px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
  boxShadow: "none",
  WebkitTapHighlightColor: "transparent",
  transition: "border-color 0.15s ease, color 0.15s ease",
};

const KEYPAD_GRID: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 6,
  flexShrink: 0,
};

const LABEL_ROOT_BASE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 140,
  flex: "0 0 auto",
  justifyContent: "space-between",
  height: "100%",
};

const CAPTION_BASE: CSSProperties = { fontSize: 12 };

const ERROR_MSG_BASE: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.35,
};

const INPUT_BASE: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  minHeight: 40,
  padding: "8px 12px",
  borderRadius: 6,
  fontSize: 14,
  lineHeight: 1.35,
  fontFamily: MONO_FONT,
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

const INPUT_DISABLED: CSSProperties = { opacity: 0.55, cursor: "not-allowed" };

const PLACEHOLDER_BASE: CSSProperties = {
  position: "absolute",
  left: 12,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  fontSize: 14,
  lineHeight: 1.35,
  fontFamily: MONO_FONT,
};

const KEY_SHELL_BASE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 12,
  borderRadius: 8,
  flex: "0 0 auto",
  height: "165px",
};

const KEY_ROW: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
};

const INPUT_WRAP_BASE: CSSProperties = {
  position: "relative",
  width: "100%",
};

const KEY_COLUMN: CSSProperties = { minWidth: 0 };

const SR_ONLY: CSSProperties = { display: "none" };

function resolveSemanticType(type: string): InputType {
  return Object.hasOwn(INPUT_NATIVE_TYPE, type) ? (type as InputType) : "text";
}

type KeypadButtonProps = {
  digit: string;
  disabled: boolean;
  onPress: (digit: string) => void;
  colors: ThemeColors;
  gridColumn?: string;
};

function KeypadButton({ digit, disabled, onPress, colors, gridColumn }: KeypadButtonProps) {
  const [pressed, setPressed] = useState(false);

  const borderColor = pressed && !disabled ? colors.mastBlue : colors.lightGrey;
  const textColor = pressed && !disabled ? colors.mastBlue : colors.inputTextPrimary;

  const buttonStyle = mergeStyle(
    KEYPAD_BUTTON_BASE,
    {
      border: `1px solid ${borderColor}`,
      backgroundColor: colors.surface,
      color: textColor,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
    },
    gridColumn ? { gridColumn } : null,
  );

  const clearPressed = () => setPressed(false);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={`Цифра ${digit}`}
      style={buttonStyle}
      onMouseDown={(e) => {
        if (disabled) return;
        e.preventDefault();
      }}
      onPointerDown={(e) => {
        if (disabled) return;
        e.preventDefault();
        setPressed(true);
      }}
      onPointerUp={clearPressed}
      onPointerLeave={clearPressed}
      onPointerCancel={clearPressed}
      onBlur={clearPressed}
      onClick={(e) => {
        if (!disabled) onPress(digit);
        e.currentTarget.blur();
      }}
    >
      {digit}
    </button>
  );
}

type NumericKeypadProps = {
  disabled: boolean;
  onDigit: (digit: string) => void;
  colors: ThemeColors;
};

function NumericKeypad({ disabled, onDigit, colors }: NumericKeypadProps) {
  return (
    <div style={KEYPAD_GRID} role="group" aria-label="Цифровая клавиатура">
      {KEYPAD_ROWS.flatMap((row, rowIndex) =>
        row.map((digit) => (
          <KeypadButton
            key={`${rowIndex}-${digit}`}
            digit={digit}
            disabled={disabled}
            colors={colors}
            onPress={onDigit}
          />
        )),
      )}
      <KeypadButton
        digit="0"
        disabled={disabled}
        colors={colors}
        onPress={onDigit}
        gridColumn="1 / -1"
      />
    </div>
  );
}

export type InputProps = {
  type?: InputType;
  label?: ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  min?: number | string;
  max?: number | string;
  error?: boolean;
  msg?: ReactNode;
  "aria-label"?: string;
};

export function Input({
  type = "text",
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  name,
  id: idProp,
  style,
  inputStyle,
  min = 0,
  max,
  error = false,
  msg,
  "aria-label": ariaLabel,
}: InputProps) {
  const { colors } = useTheme();
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const [focused, setFocused] = useState(false);

  const semanticType = resolveSemanticType(type);
  const nativeType = INPUT_NATIVE_TYPE[semanticType];
  const widths = WIDTH_BY_SEMANTIC_TYPE[semanticType];

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue ?? "");
  const currentValue = isControlled ? (value ?? "") : internalValue;
  const showPlaceholderOverlay =
    placeholder && String(currentValue).length === 0 && !focused;

  const labelRootStyle = mergeStyle(LABEL_ROOT_BASE, {
    color: colors.inputTextPrimary,
  });

  const captionStyle = mergeStyle(CAPTION_BASE, {
    color: colors.inputTextMuted,
  });

  const inputFocused = !disabled && focused;
  const inputBorderColor = error
    ? colors.error
    : inputFocused
      ? colors.mastBlue
      : colors.lightGrey;

  const showErrorMsg = Boolean(error && msg);
  const errorMessageId = `${inputId}-error`;
  const hintId = placeholder && label ? `${inputId}-hint` : null;
  const ariaDescribedBy =
    [hintId, showErrorMsg ? errorMessageId : null].filter(Boolean).join(" ") ||
    undefined;

  const errorMsgStyle = mergeStyle(ERROR_MSG_BASE, { color: colors.error });

  const inputBase = mergeStyle(INPUT_BASE, {
    minWidth: widths.minWidth,
    maxWidth: widths.maxWidth,
    border: `1px solid ${inputBorderColor}`,
    color: colors.inputTextPrimary,
    backgroundColor: colors.surface,
    boxShadow:
      !error && inputFocused ? "0 0 0 3px rgba(33, 150, 243, 0.15)" : "none",
  });

  const inputWrapStyle = mergeStyle(INPUT_WRAP_BASE, {
    maxWidth: widths.maxWidth,
  });

  const placeholderOverlayStyle = mergeStyle(PLACEHOLDER_BASE, {
    color: colors.inputTextMuted,
  });

  const fieldDisabled = disabled || readOnly;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const appendDigit = (digit: string) => {
    if (fieldDisabled || isControlled) return;
    setInternalValue(`${currentValue}${digit}`);
  };

  const numberInputBounds =
    nativeType === "number"
      ? {
          min,
          ...(max !== undefined && max !== null ? { max } : {}),
        }
      : {};

  const inputElement = (
    <div style={inputWrapStyle}>
      <input
        id={inputId}
        type={nativeType}
        name={name}
        {...numberInputBounds}
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        placeholder=""
        aria-label={!label ? ariaLabel || placeholder : undefined}
        aria-invalid={error || undefined}
        aria-describedby={ariaDescribedBy}
        style={mergeStyle(inputBase, disabled && INPUT_DISABLED, inputStyle)}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {showPlaceholderOverlay ? (
        <span style={placeholderOverlayStyle} aria-hidden="true">
          {placeholder}
        </span>
      ) : null}
    </div>
  );

  const labelBlock = (
    <>
      {label ? <span style={captionStyle}>{label}</span> : null}
      {placeholder && label ? (
        <span id={`${inputId}-hint`} style={SR_ONLY}>
          {placeholder}
        </span>
      ) : null}
      {inputElement}
      {showErrorMsg ? (
        <span id={errorMessageId} style={errorMsgStyle}>
          {msg}
        </span>
      ) : null}
    </>
  );

  if (semanticType === "key") {
    const keyShellStyle = mergeStyle(KEY_SHELL_BASE, {
      border: `1px solid ${colors.lightGrey}`,
      backgroundColor: colors.surface,
      color: colors.inputTextPrimary,
    });

    return (
      <div style={mergeStyle(keyShellStyle, style)}>
        <div style={KEY_ROW}>
          <label htmlFor={inputId} style={mergeStyle(labelRootStyle, KEY_COLUMN)}>
            {labelBlock}
          </label>
          <NumericKeypad
            disabled={fieldDisabled}
            onDigit={appendDigit}
            colors={colors}
          />
        </div>
      </div>
    );
  }

  return (
    <label htmlFor={inputId} style={mergeStyle(labelRootStyle, style)}>
      {labelBlock}
    </label>
  );
}
