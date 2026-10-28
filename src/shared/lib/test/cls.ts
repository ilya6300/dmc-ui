import { describe, expect, it } from "vitest";
import { cls } from "../cls";

describe("cls", () => {
  it("joins truthy parts", () => {
    expect(cls("a", undefined, "b", "", "c")).toBe("a b c");
  });
});
