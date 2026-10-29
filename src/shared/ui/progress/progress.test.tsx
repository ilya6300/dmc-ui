import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Progress, ProgressBar, ProgressCircle } from "./index";

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

describe("Progress", () => {
  it("renders a bar with value and buffer widths", () => {
    const view = mount(<ProgressBar value={33} buffer={66} thickness={8} />);
    const bar = view.container.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-valuenow")).toBe("33");
    expect((view.container.querySelector(".dmc-progress-bar__value") as HTMLElement)?.style.width).toBe(
      "33%",
    );
    expect((view.container.querySelector(".dmc-progress-bar__track") as HTMLElement)?.style.width).toBe(
      "66%",
    );
    view.unmount();
  });

  it("omits aria-valuenow when indeterminate", () => {
    const view = mount(<ProgressBar indeterminate />);
    const bar = view.container.querySelector('[role="progressbar"]');
    expect(bar?.hasAttribute("aria-valuenow")).toBe(false);
    expect(bar?.className).toContain("dmc-progress-bar--indeterminate");
    view.unmount();
  });

  it("renders a circular progress with size", () => {
    const view = mount(<ProgressCircle size={100} thickness={5} value={40} />);
    const circle = view.container.querySelector(".dmc-progress-circular") as HTMLElement;
    expect(circle?.style.width).toBeTruthy();
    expect(circle?.getAttribute("aria-valuenow")).toBe("40");
    expect(view.container.querySelector("svg")).toBeTruthy();
    view.unmount();
  });

  it("facade switches to circle by type", () => {
    const view = mount(<Progress type="circle" size={80} value={10} />);
    expect(view.container.querySelector(".dmc-progress-circular")).toBeTruthy();
    expect(view.container.querySelector(".dmc-progress-bar")).toBeNull();
    view.unmount();
  });

  it("applies type-specific border class", () => {
    const bar = mount(<ProgressBar border value={20} />);
    expect(bar.container.querySelector(".dmc-progress-bar--border")).toBeTruthy();
    bar.unmount();

    const circle = mount(<ProgressCircle border size={80} value={20} />);
    expect(circle.container.querySelector(".dmc-progress-circular--border")).toBeTruthy();
    circle.unmount();
  });
});
