import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { useDisclosure } from "../use-disclosure";

function mount(node: ReactNode) {
	const container = document.createElement("div");
	const root = createRoot(container);
	act(() => {
		root.render(node);
	});
	return {
		container,
		rerender(next: ReactNode) {
			act(() => {
				root.render(next);
			});
		},
		unmount() {
			act(() => {
				root.unmount();
			});
		},
	};
}

function click(container: HTMLElement, name: string) {
	act(() => {
		container.querySelector(`button[data-${name}]`)?.dispatchEvent(
			new MouseEvent("click", { bubbles: true }),
		);
	});
}

describe("useDisclosure", () => {
	it("opens once and ignores a second open", () => {
		const onOpen = vi.fn();
		const onClose = vi.fn();
		function Probe() {
			const [opened, handlers] = useDisclosure(false, { onOpen, onClose });
			return (
				<div>
					<span data-opened={String(opened)} />
					<button type="button" data-open onClick={handlers.open} />
					<button type="button" data-close onClick={handlers.close} />
					<button type="button" data-toggle onClick={handlers.toggle} />
				</div>
			);
		}
		const view = mount(<Probe />);
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("false");

		click(view.container, "open");
		click(view.container, "open");
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("true");
		expect(onOpen).toHaveBeenCalledOnce();
		expect(onClose).not.toHaveBeenCalled();

		click(view.container, "close");
		click(view.container, "close");
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("false");
		expect(onClose).toHaveBeenCalledOnce();
		view.unmount();
	});

	it("toggles from the latest state", () => {
		const onOpen = vi.fn();
		const onClose = vi.fn();
		function Probe() {
			const [opened, handlers] = useDisclosure(false, { onOpen, onClose });
			return (
				<div>
					<span data-opened={String(opened)} />
					<button type="button" data-toggle onClick={handlers.toggle} />
				</div>
			);
		}
		const view = mount(<Probe />);
		click(view.container, "toggle");
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("true");
		expect(onOpen).toHaveBeenCalledOnce();
		click(view.container, "toggle");
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("false");
		expect(onClose).toHaveBeenCalledOnce();
		view.unmount();
	});

	it("starts opened", () => {
		function Probe() {
			const [opened] = useDisclosure(true);
			return <span data-opened={String(opened)} />;
		}
		const view = mount(<Probe />);
		expect(view.container.querySelector("[data-opened]")?.getAttribute("data-opened")).toBe("true");
		view.unmount();
	});
});
