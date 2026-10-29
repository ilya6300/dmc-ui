import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../theme-context";
import { ThemeSelect } from "./theme-select";

describe("ThemeSelect", () => {
  it("calls onThemeChange when selection changes", () => {
    const onThemeChange = vi.fn();
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider theme="light">
          <ThemeSelect theme="light" onThemeChange={onThemeChange} label="Тема" />
        </ThemeProvider>,
      );
    });
    const select = container.querySelector("select");
    if (!select) {
      throw new Error("select not found");
    }
    act(() => {
      select.value = "gray";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onThemeChange).toHaveBeenCalledWith("gray");
    act(() => {
      root.unmount();
    });
  });
});
