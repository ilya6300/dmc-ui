import { describe, expect, it } from "vitest";
import { resolveIconComponent, resolveIconSrc } from "./icon";

describe("resolveIconSrc", () => {
  it("uses darkSrc in dark when set", () => {
    expect(
      resolveIconSrc("dark", { src: "/a.svg", darkSrc: "/b.svg" }),
    ).toBe("/b.svg");
  });

  it("falls back to src in dark when darkSrc missing", () => {
    expect(resolveIconSrc("dark", { src: "/a.svg" })).toBe("/a.svg");
  });

  it("uses src in light", () => {
    expect(
      resolveIconSrc("light", { src: "/a.svg", darkSrc: "/b.svg" }),
    ).toBe("/a.svg");
  });
});

describe("resolveIconComponent", () => {
  const A = () => null;
  const B = () => null;

  it("prefers darkComponent in dark", () => {
    expect(resolveIconComponent("dark", { component: A, darkComponent: B })).toBe(
      B,
    );
  });

  it("uses component when no darkComponent", () => {
    expect(resolveIconComponent("dark", { component: A })).toBe(A);
  });
});
