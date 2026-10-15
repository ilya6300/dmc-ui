import React, { useId, useRef, useState } from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";

/** Семантика пропа `type` → нативный `input.type`. */
export const INPUT_NATIVE_TYPE = {
  text: "text",
  number: "number",
  key: "number",
};

const WIDTH_BY_SEMANTIC_TYPE = {
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

function resolveSemanticType(type) {
  return Object.hasOwn(INPUT_NATIVE_TYPE, type) ? type : "text";
}

function KeypadButton({ digit, disabled, onPress, colors, gridColumn }) {
  const [pressed, setPressed] = useState(false);

  const borderColor = pressed && !disabled ? colors.mastBlue : colors.lightGrey;
  const textColor = pressed && !disabled ? colors.mastBlue : colors.inputTextPrimary;

  const buttonStyle = {
    boxSizing: "border-box",
    minHeight: 36,
    minWidth: 36,
    padding: "6px 8px",
    borderRadius: 6,
    border: `1px solid ${borderColor}`,
    backgroundColor: colors.surface,
    color: textColor,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    outline: "none",
    boxShadow: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "border-color 0.15s ease, color 0.15s ease",
    ...(gridColumn ? { gridColumn } : {}),
  };

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

function NumericKeypad({ disabled, onDigit, colors }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    flexShrink: 0,
  };

  return (
    <div style={gridStyle} role="group" aria-label="Цифровая клавиатура">
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
}) {
  const { colors } = useTheme();
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const semanticType = resolveSemanticType(type);
  const nativeType = INPUT_NATIVE_TYPE[semanticType];
  const widths = WIDTH_BY_SEMANTIC_TYPE[semanticType];

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? (value ?? "") : internalValue;
  const showPlaceholderOverlay =
    placeholder && String(currentValue).length === 0 && !focused;

  const labelRootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 140,
    flex: "0 0 auto",
    color: colors.inputTextPrimary,
    justifyContent: "space-between",
    height: "100%",
  };

  const captionStyle = {
    fontSize: 12,
    color: colors.inputTextMuted,
  };

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

  const errorMsgStyle = {
    fontSize: 12,
    lineHeight: 1.35,
    color: colors.error,
  };

  const inputBase = {
    boxSizing: "border-box",
    width: "100%",
    minWidth: widths.minWidth,
    maxWidth: widths.maxWidth,
    minHeight: 40,
    padding: "8px 12px",
    border: `1px solid ${inputBorderColor}`,
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: MONO_FONT,
    color: colors.inputTextPrimary,
    backgroundColor: colors.surface,
    outline: "none",
    boxShadow:
      !error && inputFocused ? "0 0 0 3px rgba(33, 150, 243, 0.15)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };

  const inputWrapStyle = {
    position: "relative",
    width: "100%",
    maxWidth: widths.maxWidth,
  };

  const placeholderOverlayStyle = {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    color: colors.inputTextMuted,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: MONO_FONT,
  };

  const fieldDisabled = disabled || readOnly;

  const handleInputChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const dispatchValueChange = (next) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    const el = inputRef.current;
    if (el) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      const handleValueChange = (next) => {
        if (readOnly || disabled) return;
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next);
      };
    }
  };

  const appendDigit = (digit) => {
    if (fieldDisabled) return;
    const next = `${currentValue}${digit}`;
    dispatchValueChange(next);
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
        ref={inputRef}
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
        style={mergeStyle(
          inputBase,
          disabled && { opacity: 0.55, cursor: "not-allowed" },
          inputStyle,
        )}
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
        <span id={`${inputId}-hint`} style={{ display: "none" }}>
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
    const keyShellStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: 12,
      border: `1px solid ${colors.lightGrey}`,
      borderRadius: 8,
      backgroundColor: colors.surface,
      color: colors.inputTextPrimary,
      flex: "0 0 auto",
      height: "165px",
    };

    const keyRowStyle = {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    };

    const keyColumnStyle = mergeStyle(labelRootStyle, { minWidth: 0 });

    return (
      <div style={mergeStyle(keyShellStyle, style)}>
        <div style={keyRowStyle}>
          <label htmlFor={inputId} style={keyColumnStyle}>
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
