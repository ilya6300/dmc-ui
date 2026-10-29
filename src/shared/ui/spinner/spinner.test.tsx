import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Spinner, SpinnerIos, SpinnerPie } from "./index";

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

describe("Spinner", () => {
  it("renders an svg with size and color class", () => {
    const view = mount(<Spinner size={32} color="primary" thickness={4} />);
    const svg = view.container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("32");
    expect(svg?.getAttribute("height")).toBe("32");
    expect(svg?.className.baseVal || svg?.getAttribute("class")).toContain("dmc-spinner--primary");
    expect(svg?.className.baseVal || svg?.getAttribute("class")).toContain("dmc-spinner--mat");
    view.unmount();
  });

  it("renders variant spinners", () => {
    const view = mount(
      <div>
        <SpinnerIos size="2em" color="secondary" />
        <SpinnerPie size="48px" />
      </div>,
    );
    expect(view.container.querySelectorAll("svg")).toHaveLength(2);
    view.unmount();
  });
});
