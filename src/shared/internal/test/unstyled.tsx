import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Unstyled } from "../unstyled";

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

describe("Unstyled", () => {
	it("maps numeric width to pixels and keeps a string padding", () => {
		const view = mount(
			<Unstyled d="flex" w={12} p="8px">
				text
			</Unstyled>,
		);
		const node = view.container.querySelector("div");
		expect(node?.style.width).toBe("12px");
		expect(node?.style.padding).toBe("8px");
		expect(node?.style.display).toBe("flex");
		expect(node?.getAttribute("d")).toBeNull();
		expect(node?.getAttribute("w")).toBeNull();
		view.unmount();
	});

	it("keeps a zero margin and lets style override a shorthand", () => {
		const view = mount(
			<Unstyled m={0} w={12} style={{ width: "50%" }}>
				text
			</Unstyled>,
		);
		const node = view.container.querySelector("div");
		expect(node?.style.margin).toBe("0px");
		expect(node?.style.width).toBe("50%");
		view.unmount();
	});
});
