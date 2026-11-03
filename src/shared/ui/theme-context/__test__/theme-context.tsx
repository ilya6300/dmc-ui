import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme, type ThemeContextValue } from "../theme-context";

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
    expect(snapshot?.spacing.m).toBe("16px");
    expect(snapshot?.sizes.m.controlMinHeight).toBe("40px");
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

  it("applies colors override to CSS vars and useTheme", () => {
    let snapshot: ThemeContextValue | undefined;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider colors={{ primary: "red" }}>
          <Probe
            onRead={(c) => {
              snapshot = c;
            }}
          />
        </ThemeProvider>,
      );
    });
    const host = container.querySelector(".dmc-root") as HTMLElement;
    expect(host.style.getPropertyValue("--dmc-color-primary")).toBe("red");
    expect(snapshot?.colors.primary).toBe("red");
    act(() => {
      root.unmount();
    });
  });

  it("exposes read-only spacing from CSS without override prop", () => {
    let snapshot: ThemeContextValue | undefined;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider>
          <Probe
            onRead={(c) => {
              snapshot = c;
            }}
          />
        </ThemeProvider>,
      );
    });
    const host = container.querySelector(".dmc-root") as HTMLElement;
    expect(host.style.getPropertyValue("--dmc-spacing")).toBe("");
    expect(snapshot?.spacing.m).toBe("16px");
    expect(snapshot?.spacing.xs).toBe("8px");
    act(() => {
      root.unmount();
    });
  });

  it("resolves system preference to the OS color scheme", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: () => {},
      removeEventListener: () => {},
    }));

    let snapshot: ThemeContextValue | undefined;
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider defaultTheme="system">
          <Probe
            onRead={(ctx) => {
              snapshot = ctx;
            }}
          />
        </ThemeProvider>,
      );
    });
    const host = container.querySelector(".dmc-root") as HTMLElement;
    expect(host.getAttribute("data-dmc-theme")).toBe("dark");
    expect(snapshot?.preference).toBe("system");
    expect(snapshot?.theme).toBe("dark");
    act(() => {
      root.unmount();
    });
    vi.unstubAllGlobals();
  });
});
