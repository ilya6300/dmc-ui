import React, { useId, useRef, useState } from "react";
import { mergeStyle } from "./tokens";
import { joinClass } from "./joinClass.js";
import { resolveSize } from "./sizes.js";

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

function resolveSemanticType(type) {
  return Object.hasOwn(INPUT_NATIVE_TYPE, type) ? type : "text";
}

function KeypadButton({ digit, disabled, onPress, gridColumn }) {
  const [pressed, setPressed] = useState(false);
  const clearPressed = () => setPressed(false);

  return (
    <button
      type="button"
      className={joinClass(
        "dmc-input__keypad-btn",
        gridColumn ? "dmc-input__keypad-btn--wide" : null,
      )}
      data-pressed={pressed && !disabled ? "true" : "false"}
      disabled={disabled}
      aria-label={`Цифра ${digit}`}
      style={gridColumn ? { gridColumn } : undefined}
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

function NumericKeypad({ disabled, onDigit }) {
  return (
    <div className="dmc-input__keypad" role="group" aria-label="Цифровая клавиатура">
      {KEYPAD_ROWS.flatMap((row, rowIndex) =>
        row.map((digit) => (
          <KeypadButton
            key={`${rowIndex}-${digit}`}
            digit={digit}
            disabled={disabled}
            onPress={onDigit}
          />
        )),
      )}
      <KeypadButton
        digit="0"
        disabled={disabled}
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
  size,
  min = 0,
  max,
  error = false,
  msg,
  "aria-label": ariaLabel,
}) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const resolvedSize = resolveSize(size);

  const semanticType = resolveSemanticType(type);
  const nativeType = INPUT_NATIVE_TYPE[semanticType];
  const widths = WIDTH_BY_SEMANTIC_TYPE[semanticType];

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? (value ?? "") : internalValue;
  const showPlaceholderOverlay =
    placeholder && String(currentValue).length === 0 && !focused;

  const showErrorMsg = Boolean(error && msg);
  const errorMessageId = `${inputId}-error`;
  const hintId = placeholder && label ? `${inputId}-hint` : null;
  const ariaDescribedBy =
    [hintId, showErrorMsg ? errorMessageId : null].filter(Boolean).join(" ") ||
    undefined;

  const wrapWidthStyle = {
    maxWidth: widths.maxWidth,
  };

  const fieldWidthStyle = {
    minWidth: widths.minWidth,
    maxWidth: widths.maxWidth,
  };

  const fieldDisabled = disabled || readOnly;

  const handleInputChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const dispatchValueChange = (next) => {
    if (readOnly || disabled) return;
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.({ target: { value: next, name: name ?? "" } });
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
    <div className="dmc-input__wrap" style={wrapWidthStyle}>
      <input
        ref={inputRef}
        id={inputId}
        className="dmc-input__field"
        data-focus={focused && !disabled ? "true" : "false"}
        data-error={error ? "true" : "false"}
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
        style={mergeStyle(fieldWidthStyle, inputStyle)}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {showPlaceholderOverlay ? (
        <span className="dmc-input__placeholder" aria-hidden="true">
          {placeholder}
        </span>
      ) : null}
    </div>
  );

  const labelBlock = (
    <>
      {label ? <span className="dmc-input__caption">{label}</span> : null}
      {placeholder && label ? (
        <span id={`${inputId}-hint`} style={{ display: "none" }}>
          {placeholder}
        </span>
      ) : null}
      {inputElement}
      {showErrorMsg ? (
        <span id={errorMessageId} className="dmc-input__error">
          {msg}
        </span>
      ) : null}
    </>
  );

  if (semanticType === "key") {
    return (
      <div
        className={joinClass("dmc-input--key-shell")}
        data-dmc-size={resolvedSize}
        style={mergeStyle(undefined, style)}
      >
        <div className="dmc-input--key-row">
          <label
            htmlFor={inputId}
            className={joinClass("dmc-input", "dmc-input--key-column")}
          >
            {labelBlock}
          </label>
          <NumericKeypad disabled={fieldDisabled} onDigit={appendDigit} />
        </div>
      </div>
    );
  }

  return (
    <label
      htmlFor={inputId}
      className={joinClass("dmc-input")}
      data-dmc-size={resolvedSize}
      style={mergeStyle(undefined, style)}
    >
      {labelBlock}
    </label>
  );
}
