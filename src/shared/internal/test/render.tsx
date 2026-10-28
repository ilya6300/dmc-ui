import { act, Fragment, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { render, RenderProvider } from "../render";

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

describe("render", () => {
	it("renders the default tag and maps to to an anchor", () => {
		function TagHost() {
			return render("span", { children: "text" });
		}

		function LinkHost() {
			return render("span", { to: "/go", children: "go" });
		}

		const plain = mount(<TagHost />);
		expect(plain.container.querySelector("span")?.textContent).toBe("text");
		plain.unmount();

		const linked = mount(
			<RenderProvider>
				<LinkHost />
			</RenderProvider>,
		);
		expect(linked.container.querySelector("a")?.textContent).toBe("go");
		expect(linked.container.querySelector("span")).toBeNull();
		linked.unmount();
	});

	it("returns nothing when if is false", () => {
		function Host() {
			return render("div", { if: () => false, children: "hidden" });
		}

		const view = mount(<Host />);
		expect(view.container.innerHTML).toBe("");
		view.unmount();
	});

	it("resolves className from state", () => {
		function Host() {
			return render(
				"div",
				{
					className: (state: { on: boolean }) => (state.on ? "on" : "off"),
					children: "c",
				},
				{ on: true },
			);
		}

		const view = mount(<Host />);
		expect(view.container.querySelector("div")?.className).toBe("on");
		view.unmount();
	});

	it("merges a fragment class onto one child and keeps a text child", () => {
		function MergeHost() {
			return render(Fragment, {
				className: "parent",
				children: <span className="child">t</span>,
			});
		}

		function TextHost() {
			return render(Fragment, { children: "plain" });
		}

		const merged = mount(<MergeHost />);
		expect(merged.container.querySelector("span")?.className).toBe(
			"child parent",
		);
		merged.unmount();

		const text = mount(<TextHost />);
		expect(text.container.textContent).toBe("plain");
		expect(text.container.querySelector("span")).toBeNull();
		text.unmount();
	});

	it("lets RenderProvider replace as resolution", () => {
		function Host() {
			return render("div", { children: "x" });
		}

		const view = mount(
			<RenderProvider render={() => "section"}>
				<Host />
			</RenderProvider>,
		);
		expect(view.container.querySelector("section")?.textContent).toBe("x");
		view.unmount();
	});
});
