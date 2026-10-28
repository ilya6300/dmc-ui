import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Sections } from "../sections";
import styles from "../sections.module.css";

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

describe("Sections", () => {
	it("renders the body and both sides", () => {
		const view = mount(
			<Sections leftSection="L" rightSection="R">
				body
			</Sections>,
		);
		const root = view.container.querySelector("div");
		expect(root?.textContent).toBe("LbodyR");
		expect(root?.className).toContain(styles.box);
		expect(root?.querySelectorAll("span")).toHaveLength(3);
		view.unmount();
	});

	it("skips an empty side and marks a column", () => {
		const view = mount(
			<Sections col leftSection="" rightSection="R">
				body
			</Sections>,
		);
		const root = view.container.querySelector("div");
		expect(root?.className).toContain(styles.col);
		expect(root?.querySelectorAll(`.${styles.side}`)).toHaveLength(1);
		expect(root?.textContent).toBe("bodyR");
		view.unmount();
	});
});
