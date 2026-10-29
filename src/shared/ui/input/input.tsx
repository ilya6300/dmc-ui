import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Sections, Unstyled } from "../../internal";
import { cls } from "../../lib";
import { resolveSize, type SizeName } from "../sizes";
import { mergeStyle } from "../tokens";
import "./input.css";

/** Семантика пропа `type` → нативный `input.type`. */
export const INPUT_NATIVE_TYPE = {
  text: "text",
  number: "number",
  key: "number",
} as const;

export type InputType = keyof typeof INPUT_NATIVE_TYPE;
export type InputColor = "primary" | "secondary" | "success" | "error" | "warning";

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

function resolveSemanticType(type: string): InputType {
  return Object.hasOwn(INPUT_NATIVE_TYPE, type) ? (type as InputType) : "text";
}

function makeChangeEvent(value: string): ChangeEvent<HTMLInputElement> {
  return {
    target: { value },
    currentTarget: { value },
  } as ChangeEvent<HTMLInputElement>;
}

function toFiniteNumber(value: string | number, fallback = 0): number {
  const next = typeof value === "number" ? value : Number(value);
  return Number.isFinite(next) ? next : fallback;
}

function clampNumber(value: number, minBound?: number, maxBound?: number): number {
  let next = value;
  if (minBound != null && Number.isFinite(minBound)) {
    next = Math.max(minBound, next);
  }
  if (maxBound != null && Number.isFinite(maxBound)) {
    next = Math.min(maxBound, next);
  }
  return next;
}

function formatStepValue(value: number, step: number): string {
  if (!Number.isFinite(step) || step <= 0) {
    return String(value);
  }
  const decimals = String(step).includes(".")
    ? (String(step).split(".")[1]?.length ?? 0)
    : 0;
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

type KeypadButtonProps = {
  digit: string;
  disabled: boolean;
  onPress: (digit: string) => void;
  wide?: boolean;
};

function KeypadButton({ digit, disabled, onPress, wide }: KeypadButtonProps) {
  const [pressed, setPressed] = useState(false);
  const clearPressed = () => setPressed(false);

  return (
    <button
      type="button"
      className={cls("dmc-input__keypad-btn", wide ? "dmc-input__keypad-btn--wide" : undefined)}
      data-pressed={pressed && !disabled ? "true" : "false"}
      disabled={disabled}
      aria-label={`Цифра ${digit}`}
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
      <KeypadButton digit="0" disabled={disabled} onPress={onDigit} wide />
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
  required?: boolean;
  name?: string;
  id?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  size?: SizeName;
  min?: number | string;
  max?: number | string;
  /** Шаг для нативного number и для колеса мыши. По умолчанию 1. */
  step?: number;
  /**
   * Колесо мыши меняет значение на `step` у `number` и `key` (только в фокусе).
   * По умолчанию выключено.
   */
  wheel?: boolean;
  error?: boolean;
  msg?: ReactNode;
  hint?: ReactNode;
  hideHint?: boolean;
  hideMessage?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  color?: InputColor;
  outline?: boolean;
  filled?: boolean;
  underlined?: boolean;
  square?: boolean;
  stackLabel?: boolean;
  dense?: boolean;
  "aria-label"?: string;
};

/** Поле ввода: секции, варианты оформления, floating/stack label; `type="key"` — с клавиатурой. */
export function Input({
  type = "text",
  label,
  value,
  defaultValue,
  onChange,
  placeholder = " ",
  disabled = false,
  readOnly = false,
  required = false,
  name,
  id: idProp,
  style,
  inputStyle,
  className,
  size,
  min = 0,
  max,
  step = 1,
  wheel = false,
  error = false,
  msg,
  hint,
  hideHint = false,
  hideMessage = false,
  leftSection,
  rightSection,
  before,
  after,
  color,
  outline = false,
  filled = false,
  underlined = false,
  square = false,
  stackLabel = false,
  dense = false,
  "aria-label": ariaLabel,
}: InputProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const resolvedSize = resolveSize(size);

  const semanticType = resolveSemanticType(type);
  const nativeType = INPUT_NATIVE_TYPE[semanticType];
  const widths = WIDTH_BY_SEMANTIC_TYPE[semanticType];

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue ?? "");
  const currentValue = isControlled ? (value ?? "") : internalValue;
  const valueText = String(currentValue);
  const hasValue = valueText.length > 0;
  const labelFloat = Boolean(label) && (stackLabel || focused || hasValue);

  const showErrorMsg = Boolean(error && msg);
  const showHint = Boolean(hint) && !hideHint && !showErrorMsg;
  const showMessages = !hideMessage && (showErrorMsg || Boolean(hint && !hideHint));
  const errorMessageId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const ariaDescribedBy =
    [showHint ? hintId : null, showErrorMsg ? errorMessageId : null].filter(Boolean).join(" ") ||
    undefined;

  const fieldDisabled = disabled || readOnly;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const commitValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(makeChangeEvent(next));
  };

  const appendDigit = (digit: string) => {
    if (fieldDisabled) return;
    commitValue(`${valueText}${digit}`);
  };

  const minBound = min === undefined || min === null || min === "" ? undefined : Number(min);
  const maxBound = max === undefined || max === null || max === "" ? undefined : Number(max);
  const stepValue = Number.isFinite(step) && step > 0 ? step : 1;
  const wheelEnabled =
    wheel && !fieldDisabled && (semanticType === "number" || semanticType === "key");

  const wheelStateRef = useRef({
    enabled: wheelEnabled,
    focused,
    currentValue,
    stepValue,
    minBound,
    maxBound,
    isControlled,
    onChange,
  });
  wheelStateRef.current = {
    enabled: wheelEnabled,
    focused,
    currentValue,
    stepValue,
    minBound,
    maxBound,
    isControlled,
    onChange,
  };

  useEffect(() => {
    const node = inputRef.current;
    if (!node || !wheel) {
      return;
    }
    const onWheel = (event: globalThis.WheelEvent) => {
      const state = wheelStateRef.current;
      if (!state.enabled || !state.focused) {
        return;
      }
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : event.deltaY > 0 ? -1 : 0;
      if (direction === 0) {
        return;
      }
      const base = toFiniteNumber(state.currentValue, toFiniteNumber(state.minBound ?? 0));
      const next = clampNumber(base + direction * state.stepValue, state.minBound, state.maxBound);
      const nextText = formatStepValue(next, state.stepValue);
      if (!state.isControlled) {
        setInternalValue(nextText);
      }
      state.onChange?.(makeChangeEvent(nextText));
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
    };
  }, [wheel]);

  const numberInputBounds =
    nativeType === "number"
      ? {
          min,
          step: stepValue,
          ...(max !== undefined && max !== null ? { max } : {}),
        }
      : {};

  const rootClassName = cls(
    "dmc-input",
    color ? `dmc-input--${color}` : undefined,
    outline ? "dmc-input--outline" : undefined,
    filled ? "dmc-input--filled" : undefined,
    underlined ? "dmc-input--underlined" : undefined,
    square ? "dmc-input--square" : undefined,
    stackLabel ? "dmc-input--stack-label" : undefined,
    dense ? "dmc-input--dense" : undefined,
    disabled ? "dmc-input--disabled" : undefined,
    error ? "dmc-input--error" : undefined,
    semanticType === "key" ? "dmc-input--key" : undefined,
    className,
  );

  const field = (
    <Sections
      className={cls(
        "dmc-input__field",
        leftSection ? "dmc-input__field--with-left" : undefined,
        rightSection ? "dmc-input__field--with-right" : undefined,
      )}
      noWrap
      noPadding
      align="center"
      justify="start"
      bodyClass="dmc-input__control"
      leftSection={
        leftSection ? <span className="dmc-input__section">{leftSection}</span> : undefined
      }
      rightSection={
        rightSection ? <span className="dmc-input__section">{rightSection}</span> : undefined
      }
      style={{ padding: 0, borderRadius: "inherit", maxWidth: widths.maxWidth, gap: 0 }}
    >
      <Unstyled
        as="input"
        ref={inputRef}
        id={inputId}
        className="dmc-input__native"
        type={nativeType}
        name={name}
        {...numberInputBounds}
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        required={required || undefined}
        placeholder={placeholder || " "}
        aria-label={!label ? ariaLabel || undefined : undefined}
        aria-invalid={error || undefined}
        aria-describedby={ariaDescribedBy}
        style={mergeStyle(
          {
            minWidth: widths.minWidth,
            maxWidth: widths.maxWidth,
          },
          inputStyle,
        )}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {label ? (
        <label
          htmlFor={inputId}
          className={cls("dmc-input__label", labelFloat ? "dmc-input__label--float" : undefined)}
        >
          {label}
          {required ? (
            <span className="dmc-input__required" aria-hidden>
              {" *"}
            </span>
          ) : null}
        </label>
      ) : null}
    </Sections>
  );

  const messages = showMessages ? (
    <div
      className={cls(
        "dmc-input__messages",
        showErrorMsg ? "dmc-input__messages--error" : undefined,
        showHint ? "dmc-input__messages--hint" : undefined,
      )}
      role={showErrorMsg ? "alert" : undefined}
      aria-live="polite"
    >
      {hint && !hideHint ? (
        <span id={hintId} className="dmc-input__hint">
          {hint}
        </span>
      ) : null}
      {showErrorMsg ? (
        <span id={errorMessageId} className="dmc-input__error">
          {msg}
        </span>
      ) : null}
    </div>
  ) : null;

  const body = (
    <>
      {before ? <div className="dmc-input__before">{before}</div> : null}
      {field}
      {after ? <div className="dmc-input__after">{after}</div> : null}
      {messages}
    </>
  );

  const root = (
    <Unstyled
      prefix="input"
      d="flex"
      wrap="wrap"
      pos="relative"
      className={rootClassName}
      data-dmc-size={resolvedSize}
      style={mergeStyle({ maxWidth: widths.maxWidth }, semanticType === "key" ? undefined : style)}
    >
      {body}
    </Unstyled>
  );

  if (semanticType === "key") {
    const showKeypad = focused && !fieldDisabled;
    return (
      <div className="dmc-input--key-shell" data-dmc-size={resolvedSize} style={mergeStyle(style)}>
        {root}
        {showKeypad ? <NumericKeypad disabled={fieldDisabled} onDigit={appendDigit} /> : null}
      </div>
    );
  }

  return root;
}
