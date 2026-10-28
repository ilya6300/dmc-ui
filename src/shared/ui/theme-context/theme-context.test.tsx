import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme, type ThemeContextValue } from "./theme-context";

function Probe({ onRead }: { onRead: (ctx: ThemeContextValue) => void }) {
  const ctx = useTheme();
  onRead(ctx);
  return null;
}

describe("useTheme", () => {
  it("defaults to light without provider", () => {
    let snapshot: ThemeContextValue | undefined;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <Probe
          onRead={(c) => {
            snapshot = c;
          }}
        />,
      );
    });
    expect(snapshot?.theme).toBe("light");
    expect(snapshot?.colors.background).toBe("#ffffff");
    act(() => {
      root.unmount();
    });
  });

  it("controlled provider calls onThemeChange", () => {
    const onThemeChange = vi.fn();
    let setTheme: ThemeContextValue["setTheme"] | undefined;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider theme="light" onThemeChange={onThemeChange}>
          <Probe
            onRead={(c) => {
              setTheme = c.setTheme;
            }}
          />
        </ThemeProvider>,
      );
    });
    act(() => {
      setTheme?.("dark");
    });
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    act(() => {
      root.unmount();
    });
  });
});
