import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { useStateObject } from "../use-state-object";

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

describe("useStateObject", () => {
	it("merges a partial patch and keeps the other keys", () => {
		function Probe() {
			const [state, update] = useStateObject({ count: 1, name: "a" });
			return (
				<div>
					<span data-count={state.count} />
					<span data-name={state.name} />
					<button type="button" onClick={() => update({ count: state.count + 1 })} />
				</div>
			);
		}
		const view = mount(<Probe />);
		act(() => {
			view.container.querySelector("button")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		});
		expect(view.container.querySelector("[data-count]")?.getAttribute("data-count")).toBe("2");
		expect(view.container.querySelector("[data-name]")?.getAttribute("data-name")).toBe("a");
		view.unmount();
	});

	it("accepts a function of the previous state", () => {
		function Probe() {
			const [state, update] = useStateObject({ name: "a" });
			return (
				<div>
					<span data-name={state.name} />
					<button type="button" onClick={() => update((prev) => ({ name: `${prev.name}b` }))} />
				</div>
			);
		}
		const view = mount(<Probe />);
		act(() => {
			view.container.querySelector("button")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		});
		expect(view.container.querySelector("[data-name]")?.getAttribute("data-name")).toBe("ab");
		view.unmount();
	});
});
