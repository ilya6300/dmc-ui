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

	it("maps align and justify keywords to flex values", () => {
		const view = mount(
			<Unstyled d="flex" align="start" justify="between">
				text
			</Unstyled>,
		);
		const node = view.container.querySelector("div");
		expect(node?.style.alignItems).toBe("flex-start");
		expect(node?.style.justifyContent).toBe("space-between");
		view.unmount();
	});

	it("maps color keywords to theme variables", () => {
		const view = mount(
			<Unstyled bg="primary" c="surface">
				text
			</Unstyled>,
		);
		const node = view.container.querySelector("div");
		expect(node?.style.background).toBe("var(--dmc-color-primary)");
		expect(node?.style.color).toBe("var(--dmc-color-surface)");
		view.unmount();
	});

	it("keeps a raw color string", () => {
		const view = mount(<Unstyled bg="#fff" c="red" />);
		const node = view.container.querySelector("div");
		expect(node?.style.background).toBe("rgb(255, 255, 255)");
		expect(node?.style.color).toBe("red");
		view.unmount();
	});

	it("maps spacing keywords to theme variables", () => {
		const view = mount(<Unstyled p="m" mx="xs" bd="l" />);
		const node = view.container.querySelector("div");
		expect(node?.style.padding).toBe("var(--dmc-padding-m)");
		expect(node?.style.marginInline).toBe("var(--dmc-margin-xs)");
		expect(node?.style.border).toBe("var(--dmc-border-radius-l)");
		view.unmount();
	});

	it("inserts prefix into loaded theme variables", () => {
		const view = mount(<Unstyled prefix="button" bg="primary" p="m" bd="l" />);
		const node = view.container.querySelector("div");
		expect(node?.style.background).toBe("var(--dmc-button-color-primary)");
		expect(node?.style.padding).toBe("var(--dmc-button-padding-m)");
		expect(node?.style.border).toBe("var(--dmc-button-border-radius-l)");
		expect(node?.getAttribute("prefix")).toBeNull();
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
