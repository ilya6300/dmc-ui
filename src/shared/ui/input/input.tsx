import { useId, useState, type ChangeEvent, type CSSProperties, type ReactNode } from "react";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
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

const SR_ONLY: CSSProperties = { display: "none" };

function resolveSemanticType(type: string): InputType {
  return Object.hasOwn(INPUT_NATIVE_TYPE, type) ? (type as InputType) : "text";
}

type KeypadButtonProps = {
  digit: string;
  disabled: boolean;
  onPress: (digit: string) => void;
  gridColumn?: string;
};

function KeypadButton({ digit, disabled, onPress, gridColumn }: KeypadButtonProps) {
  const [pressed, setPressed] = useState(false);
  const clearPressed = () => setPressed(false);

  return (
    <button
      type="button"
      className={cls(
        "dmc-input__keypad-btn",
        gridColumn ? "dmc-input__keypad-btn--wide" : undefined,
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

type NumericKeypadProps = {
  disabled: boolean;
  onDigit: (digit: string) => void;
};

function NumericKeypad({ disabled, onDigit }: NumericKeypadProps) {
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
      <KeypadButton digit="0" disabled={disabled} onPress={onDigit} gridColumn="1 / -1" />
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
  size?: SizeName;
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
  size,
  min = 0,
  max,
  error = false,
  msg,
  "aria-label": ariaLabel,
}: InputProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const [focused, setFocused] = useState(false);
  const resolvedSize = resolveSize(size);

  const semanticType = resolveSemanticType(type);
  const nativeType = INPUT_NATIVE_TYPE[semanticType];
  const widths = WIDTH_BY_SEMANTIC_TYPE[semanticType];

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue ?? "");
  const currentValue = isControlled ? (value ?? "") : internalValue;
  const showPlaceholderOverlay = placeholder && String(currentValue).length === 0 && !focused;

  const showErrorMsg = Boolean(error && msg);
  const errorMessageId = `${inputId}-error`;
  const hintId = placeholder && label ? `${inputId}-hint` : null;
  const ariaDescribedBy =
    [hintId, showErrorMsg ? errorMessageId : null].filter(Boolean).join(" ") || undefined;

  const wrapWidthStyle: CSSProperties = { maxWidth: widths.maxWidth };
  const fieldWidthStyle: CSSProperties = {
    minWidth: widths.minWidth,
    maxWidth: widths.maxWidth,
  };
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
    <div className="dmc-input__wrap" style={wrapWidthStyle}>
      <input
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
        <span id={`${inputId}-hint`} style={SR_ONLY}>
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
      <div className={cls("dmc-input--key-shell")} data-dmc-size={resolvedSize} style={mergeStyle(style)}>
        <div className="dmc-input--key-row">
          <label htmlFor={inputId} className={cls("dmc-input", "dmc-input--key-column")}>
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
      className={cls("dmc-input")}
      data-dmc-size={resolvedSize}
      style={mergeStyle(style)}
    >
      {labelBlock}
    </label>
  );
}
