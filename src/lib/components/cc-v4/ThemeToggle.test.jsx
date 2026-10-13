import React from "react";
import { describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { ThemeToggle } from "./ThemeToggle.jsx";

describe("ThemeToggle controlled", () => {
  it("calls onThemeChange when toggled", () => {
    const onThemeChange = vi.fn();
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeToggle theme="light" onThemeChange={onThemeChange} label="Тема" />,
      );
    });
    const button = container.querySelector("button");
    act(() => {
      button.click();
    });
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    root.unmount();
  });
});
