import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./input";

function mount(node: ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(node);
  });
  return {
    container,
    unmount() {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

function focusInput(container: HTMLElement) {
  const input = container.querySelector("input");
  act(() => {
    input?.focus();
  });
  return input;
}

describe("Input", () => {
  it("renders a text field with label", () => {
    const view = mount(<Input label="Имя" defaultValue="Анна" />);
    const input = view.container.querySelector("input");
    expect(input?.value).toBe("Анна");
    expect(input?.type).toBe("text");
    expect(view.container.querySelector(".dmc-input__label")?.textContent).toContain("Имя");
    view.unmount();
  });

  it("shows error message when error and msg are set", () => {
    const view = mount(<Input label="Email" error msg="Неверно" defaultValue="x" />);
    expect(view.container.querySelector(".dmc-input__error")?.textContent).toBe("Неверно");
    expect(view.container.querySelector(".dmc-input")?.className).toContain("dmc-input--error");
    view.unmount();
  });

  it("shows keypad on focus and appends digits", () => {
    const onChange = vi.fn();
    const view = mount(<Input type="key" label="Код" defaultValue="" onChange={onChange} />);
    expect(view.container.querySelector(".dmc-input__keypad")).toBeNull();

    focusInput(view.container);
    const zero = view.container.querySelector('button[aria-label="Цифра 0"]');
    expect(zero).toBeTruthy();
    act(() => {
      zero?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(view.container.querySelector("input")?.value).toBe("0");
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0].target.value).toBe("0");
    view.unmount();
  });

  it("calls onChange from keypad in controlled mode", () => {
    const onChange = vi.fn();
    const view = mount(<Input type="key" value="1" onChange={onChange} />);
    focusInput(view.container);
    const two = view.container.querySelector('button[aria-label="Цифра 2"]');
    act(() => {
      two?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0].target.value).toBe("12");
    expect(view.container.querySelector("input")?.value).toBe("1");
    view.unmount();
  });

  it("does not show keypad when disabled", () => {
    const onChange = vi.fn();
    const view = mount(<Input type="key" disabled defaultValue="" onChange={onChange} />);
    focusInput(view.container);
    expect(view.container.querySelector(".dmc-input__keypad")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    view.unmount();
  });

  it("changes number value by wheel when wheel is enabled", () => {
    const onChange = vi.fn();
    const view = mount(
      <Input type="number" wheel step={2} defaultValue={4} min={0} max={10} onChange={onChange} />,
    );
    const input = focusInput(view.container);
    act(() => {
      input?.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, bubbles: true }));
    });
    expect(view.container.querySelector("input")?.value).toBe("6");
    expect(onChange.mock.calls[0][0].target.value).toBe("6");
    act(() => {
      input?.dispatchEvent(new WheelEvent("wheel", { deltaY: 100, bubbles: true }));
    });
    expect(view.container.querySelector("input")?.value).toBe("4");
    view.unmount();
  });

  it("ignores wheel when the prop is off", () => {
    const onChange = vi.fn();
    const view = mount(<Input type="number" defaultValue={4} onChange={onChange} />);
    const input = focusInput(view.container);
    act(() => {
      input?.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, bubbles: true }));
    });
    expect(view.container.querySelector("input")?.value).toBe("4");
    expect(onChange).not.toHaveBeenCalled();
    view.unmount();
  });
});
