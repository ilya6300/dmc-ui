import React from "react";
import { describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { ThemeSelect } from "./ThemeSelect.jsx";

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
    act(() => {
      select.value = "gray";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onThemeChange).toHaveBeenCalledWith("gray");
    root.unmount();
  });
});
