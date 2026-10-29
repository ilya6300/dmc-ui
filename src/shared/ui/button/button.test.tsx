import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

function mount(node: ReactNode) {
  const container = document.createElement("div");
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
    },
  };
}

describe("Button", () => {
  it("renders a button with the label", () => {
    const view = mount(<Button>Сохранить</Button>);
    const button = view.container.querySelector("button");
    expect(button?.textContent).toBe("Сохранить");
    expect(button?.type).toBe("button");
    expect(button?.className).toContain("dmc-button");
    expect(button?.style.padding).toBe("var(--dmc-button-padding-m)");
    expect(button?.getAttribute("prefix")).toBeNull();
    view.unmount();
  });

  it("renders side sections around the label", () => {
    const view = mount(
      <Button leftSection="L" rightSection="R">
        Да
      </Button>,
    );
    expect(view.container.querySelector("button")?.textContent).toBe("LДаR");
    view.unmount();
  });

  it("calls onClick", () => {
    const onClick = vi.fn();
    const view = mount(<Button onClick={onClick}>Да</Button>);
    const button = view.container.querySelector("button");
    act(() => {
      button?.click();
    });
    expect(onClick).toHaveBeenCalledOnce();
    view.unmount();
  });

  it("does not call onClick when disabled or loading", () => {
    const onClick = vi.fn();
    const view = mount(
      <div>
        <Button disabled onClick={onClick}>
          Нет
        </Button>
        <Button loading onClick={onClick}>
          Ждём
        </Button>
      </div>,
    );
    const buttons = view.container.querySelectorAll("button");
    act(() => {
      buttons.forEach((button) => button.click());
    });
    expect(onClick).not.toHaveBeenCalled();
    view.unmount();
  });
});
