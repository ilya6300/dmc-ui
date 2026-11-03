import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { Template } from "../../ui/template";
import { templateStore } from "../template";

function mount(node: ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
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
      container.remove();
    },
  };
}

describe("template slots", () => {
  it("does not change the footer snapshot when title updates", () => {
    function View({ title }: { title: string }) {
      return (
        <>
          <Template slot="title">{title}</Template>
          <Template slot="footer">foot</Template>
          <Template.Slot name="footer" />
          <Template.Slot name="title" />
        </>
      );
    }

    const view = mount(<View title="a" />);
    const before = templateStore.getSlot("footer");
    view.rerender(<View title="b" />);
    expect(templateStore.getSlot("footer")).toBe(before);
    view.unmount();
  });

  it("does not notify when the same owner registers the same key", () => {
    const listener = vi.fn();
    const stop = templateStore.subscribe("same", listener);
    templateStore.register("same", "one", "k", "owner-a");
    templateStore.register("same", "one-again", "k", "owner-a");
    expect(listener).toHaveBeenCalledTimes(1);
    expect(templateStore.getSlot("same")).toBe("one");
    templateStore.unregister("same", "owner-a");
    stop();
  });

  it("keeps a slot when a different owner unregisters", () => {
    templateStore.register("keep", "node", "k", "owner-a");
    templateStore.unregister("keep", "owner-b");
    expect(templateStore.getSlot("keep")).toBe("node");
    templateStore.unregister("keep", "owner-a");
    expect(templateStore.getSlot("keep")).toBeUndefined();
  });

  it("updates a slot when primitive props change", () => {
    function Probe() {
      const api = Template.use();
      return <span>{String(api.has("labeled"))}</span>;
    }
    function View({ label }: { label: string }) {
      return (
        <>
          <Template slot="labeled" data-label={label}>
            <b>x</b>
          </Template>
          <Probe />
        </>
      );
    }
    const view = mount(<View label="a" />);
    const first = templateStore.getSlot("labeled");
    view.rerender(<View label="b" />);
    expect(templateStore.getSlot("labeled")).not.toBe(first);
    view.unmount();
  });

  it("renders slot content without extra clone when slot has no props", () => {
    const view = mount(
      <>
        <Template slot="plain">
          <em>hi</em>
        </Template>
        <Template.Slot name="plain" />
      </>,
    );
    expect(view.container.querySelector("em")?.textContent).toBe("hi");
    view.unmount();
  });
});

describe("template hook isolation", () => {
  it("footer listener is not called when only title emits", () => {
    const footer = vi.fn();
    const stop = templateStore.subscribe("footer", footer);
    templateStore.register("title", "t", "1", "o");
    expect(footer).not.toHaveBeenCalled();
    templateStore.unregister("title", "o");
    stop();
  });
});
