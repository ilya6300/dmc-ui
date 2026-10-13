import React from "react";
import { describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext.jsx";

function Probe({ onRead }) {
  const ctx = useTheme();
  onRead(ctx);
  return null;
}

describe("useTheme", () => {
  it("defaults to light without provider", () => {
    let snapshot;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(<Probe onRead={(c) => { snapshot = c; }} />);
    });
    expect(snapshot.theme).toBe("light");
    expect(snapshot.colors.background).toBe("#ffffff");
    root.unmount();
  });

  it("controlled provider calls onThemeChange", () => {
    const onThemeChange = vi.fn();
    let setTheme;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider theme="light" onThemeChange={onThemeChange}>
          <Probe onRead={(c) => { setTheme = c.setTheme; }} />
        </ThemeProvider>,
      );
    });
    act(() => {
      setTheme("dark");
    });
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    root.unmount();
  });
});
