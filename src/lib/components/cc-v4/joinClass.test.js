import { describe, expect, it } from "vitest";
import { joinClass } from "./joinClass";

describe("joinClass", () => {
  it("joins truthy parts", () => {
    expect(joinClass("a", false, "b", null, "c")).toBe("a b c");
  });
});
