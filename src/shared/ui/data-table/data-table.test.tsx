import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { applyColumnResizePair, collectSegments } from "./columns";
import {
  filterRows,
  groupNodes,
  groupedIndentPx,
  groupedIndentSteps,
  groupedInlineLayout,
  GROUPED_INDENT_STEP,
  nestedExpandLayout,
  nextSortRules,
  paginateRows,
  resolveGroupedPresentation,
  sortRows,
  toCsv,
} from "./pipeline";
import { createTableStorage } from "./storage";
import { DataTable } from "./data-table";

type Row = { name: string; amount: number; city: string };

const rows: Row[] = [
  { name: "Бета", amount: 2, city: "Казань" },
  { name: "Альфа", amount: 1, city: "Москва" },
  { name: "Гамма", amount: 3, city: "Москва" },
];

function mount(node: ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
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
      container.remove();
    },
  };
}

describe("column resize pair", () => {
  it("shifts width to the next column", () => {
    expect(applyColumnResizePair(200, 150, 40)).toEqual({ width: 240, nextWidth: 110 });
    expect(applyColumnResizePair(200, 150, -40)).toEqual({ width: 160, nextWidth: 190 });
  });

  it("does not shrink below min width", () => {
    expect(applyColumnResizePair(90, 200, -50, 80)).toEqual({ width: 80, nextWidth: 210 });
    expect(applyColumnResizePair(200, 90, 50, 80)).toEqual({ width: 210, nextWidth: 80 });
  });
});

describe("data table model", () => {
  const indexed = rows.map((row, index) => ({ row, index }));
  const columns = [{ field: "name", header: "Название", filterable: true, filter: { type: "search" as const } }];

  it("sorts by several rules", () => {
    expect(sortRows(indexed, [{ key: "city", descending: false }, { key: "name", descending: false }]).map((item) => item.row.name)).toEqual([
      "Бета",
      "Альфа",
      "Гамма",
    ]);
  });

  it("cycles sort rules none → asc → desc → none", () => {
    const asc = nextSortRules([], "name", false);
    expect(asc).toEqual([{ key: "name", descending: false }]);
    const desc = nextSortRules(asc, "name", false);
    expect(desc).toEqual([{ key: "name", descending: true }]);
    expect(nextSortRules(desc, "name", false)).toEqual([]);
    const multiAsc = nextSortRules([{ key: "city", descending: false }], "name", true);
    expect(multiAsc).toEqual([
      { key: "city", descending: false },
      { key: "name", descending: false },
    ]);
    const multiDesc = nextSortRules(multiAsc, "name", true);
    expect(multiDesc).toEqual([
      { key: "city", descending: false },
      { key: "name", descending: true },
    ]);
    expect(nextSortRules(multiDesc, "name", true)).toEqual([{ key: "city", descending: false }]);
  });

  it("filters by search contains", () => {
    expect(filterRows(indexed, columns, { name: "ам" }).map((item) => item.row.name)).toEqual(["Гамма"]);
  });

  it("paginates a page", () => {
    expect(paginateRows(rows, 2, 2).map((row) => row.name)).toEqual(["Гамма"]);
  });

  it("groups rows by city", () => {
    const groups = groupNodes(indexed, ["city"]);
    expect(groups.map((group) => group.label)).toEqual(["Казань", "Москва"]);
    expect(groups[1]?.nodes).toHaveLength(2);
  });

  it("builds csv", () => {
    expect(toCsv(rows.slice(0, 1), [{ field: "name", header: "Название" }])).toBe("Название\nБета");
  });

  it("treats a parent field as a header group when children have data fields", () => {
    const segments = collectSegments<Row>([
      {
        field: ".groupMeta",
        header: "Группа",
        nested: [
          { field: "city", header: "Город", nested: [] },
          { field: "name", header: "Название", nested: [] },
        ],
      },
      {
        field: ".symbolMeta",
        header: "Символ",
        nested: [
          { field: ".symbol1", header: "1", nested: [] },
          { field: ".symbol2", header: "2", nested: [] },
        ],
      },
    ]);
    expect(segments[0]?.kind).toBe("group");
    expect(segments[0]?.leaves.map((leaf) => leaf.field)).toEqual(["city", "name"]);
    expect(segments[1]?.kind).toBe("split");
    expect(segments[1]?.leaves.map((leaf) => leaf.field)).toEqual([".symbolMeta"]);
    expect(segments[1]?.subheaders).toEqual(["1", "2"]);
  });
});

describe("DataTable", () => {
  it("sorts, filters, pages and selects rows", () => {
    const view = mount(
      <DataTable data={rows} limit={2} limits={[2, 3]} selectable="start">
        <DataTable.Column<Row> field="name" header="Название" sortable filterable />
      </DataTable>,
    );
    const cells = () => [...view.container.querySelectorAll("tbody td:last-child")].map((cell) => cell.textContent);
    expect(cells()).toEqual(["Бета", "Альфа"]);

    const sortBtn = () => view.container.querySelector(".dmc-data-table__sort");
    expect(sortBtn()?.textContent).toBe("⇅");
    expect(sortBtn()?.classList.contains("dmc-data-table__sort--on")).toBe(false);
    expect(view.container.querySelector(".dmc-data-table__head-title")?.textContent).toBe("Название");
    act(() => {
      sortBtn()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(sortBtn()?.textContent).toBe("▲");
    expect(sortBtn()?.classList.contains("dmc-data-table__sort--on")).toBe(true);
    expect(cells()).toEqual(["Альфа", "Бета"]);
    act(() => {
      sortBtn()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(sortBtn()?.textContent).toBe("▼");
    expect(cells()).toEqual(["Гамма", "Бета"]);
    act(() => {
      sortBtn()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(sortBtn()?.textContent).toBe("⇅");
    expect(sortBtn()?.classList.contains("dmc-data-table__sort--on")).toBe(false);
    expect(cells()).toEqual(["Бета", "Альфа"]);

    act(() => {
      sortBtn()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(cells()).toEqual(["Альфа", "Бета"]);

    const next = [...view.container.querySelectorAll("button")].find((button) => button.textContent === "Дальше");
    act(() => {
      next?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(cells()).toEqual(["Гамма"]);

    const filter = view.container.querySelector(".dmc-data-table__filter-btn");
    act(() => {
      filter?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const openPanel = document.querySelector(".dmc-data-table__filter") as HTMLElement | null;
    expect(openPanel?.style.backgroundColor).toBeTruthy();
    const input = document.querySelector(".dmc-data-table__filter input");
    act(() => {
      const prototype = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value");
      prototype?.set?.call(input, "ам");
      input?.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const ok = [...document.querySelectorAll(".dmc-data-table__filter button")].find((button) => button.textContent === "Ок");
    act(() => {
      ok?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(cells()).toEqual(["Гамма"]);

    const checkbox = view.container.querySelector("tbody input[type='checkbox']") as HTMLInputElement | null;
    act(() => {
      checkbox?.click();
    });
    expect(view.container.querySelector(".dmc-data-table__row--selected")).not.toBeNull();
    const panel = document.querySelector(".dmc-data-table__filter");
    expect(panel).toBeNull();
    view.unmount();
  });

  it("hides a column and stores the field", () => {
    const storage = createTableStorage("test.data-table");
    storage.clear();
    const view = mount(
      <DataTable data={rows} storage="test.data-table">
        <DataTable.Column<Row> field="name" header="Название" toggleable />
        <DataTable.Column<Row> field="city" header="Город" />
      </DataTable>,
    );
    const hide = view.container.querySelector("[aria-label='Скрыть Название']");
    act(() => {
      hide?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(view.container.textContent).not.toContain("Название");
    expect(storage.getItem("columns.hidden")).toEqual(["name"]);
    storage.clear();
    view.unmount();
  });

  it("renders cards below the breakpoint", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: true,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
      onchange: null,
    })) as typeof window.matchMedia;
    const view = mount(
      <DataTable data={rows.slice(0, 1)} breakpoint="s">
        <DataTable.Column<Row> field="name" header="Название" />
      </DataTable>,
    );
    expect(view.container.querySelector(".dmc-data-table__cards")).not.toBeNull();
    expect(view.container.querySelector("table")).toBeNull();
    view.unmount();
    window.matchMedia = original;
  });

  it("renders a grouped header and a split field", () => {
    const view = mount(
      <DataTable data={[{ left: "L", right: "R", symbol: "AB", city: "Москва" }]} withPagination={false}>
        <DataTable.Column header="Пара" sortable>
          <DataTable.Column field="left" header="Лево" />
          <DataTable.Column field="right" header="Право" />
        </DataTable.Column>
        <DataTable.Column field="symbol" header="Символ">
          <DataTable.Column header="A" />
          <DataTable.Column header="B" />
        </DataTable.Column>
        <DataTable.Column field="city" header="Город" />
      </DataTable>,
    );
    const rows = [...view.container.querySelectorAll("thead tr")];
    expect(rows).toHaveLength(2);
    const top = [...rows[0].querySelectorAll("th")];
    expect(top.find((cell) => cell.textContent?.includes("Пара"))?.getAttribute("colspan")).toBe("2");
    expect(top.find((cell) => cell.textContent?.includes("Символ"))?.getAttribute("colspan")).toBe("2");
    expect(top.find((cell) => cell.textContent?.includes("Город"))?.getAttribute("rowspan")).toBe("2");
    expect(rows[1].textContent).toContain("Лево");
    expect(rows[1].textContent).toContain("Право");
    expect(rows[1].textContent).toContain("A");
    expect(rows[1].textContent).toContain("B");
    expect(view.container.querySelector("tbody td[colspan='2']")?.textContent).toBe("AB");
    view.unmount();
  });

  it("sorts a header group by the first field and stores a dragged segment", () => {
    const storage = createTableStorage("test.data-table.segments");
    storage.clear();
    const view = mount(
      <DataTable
        data={[
          { left: "Б", right: "2", city: "Казань" },
          { left: "А", right: "1", city: "Москва" },
        ]}
        storage="test.data-table.segments"
        withPagination={false}
      >
        <DataTable.Column header="Пара" sortable draggable>
          <DataTable.Column field="left" header="Лево" draggable />
          <DataTable.Column field="right" header="Право" />
        </DataTable.Column>
        <DataTable.Column field="city" header="Город" draggable />
      </DataTable>,
    );
    const sort = view.container.querySelector("thead .dmc-data-table__sort");
    act(() => {
      sort?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const body = [...view.container.querySelectorAll("tbody tr")].map((row) => row.textContent);
    expect(body[0]).toContain("А");
    const group = [...view.container.querySelectorAll("thead th")].find((cell) => cell.textContent?.includes("Пара"));
    const city = [...view.container.querySelectorAll("thead th")].find((cell) => cell.textContent?.includes("Город"));
    const groupHandle = group?.querySelector(".dmc-data-table__drag-handle");
    expect(groupHandle).not.toBeNull();
    expect(group?.getAttribute("draggable")).toBeNull();
    act(() => {
      groupHandle?.dispatchEvent(new Event("dragstart", { bubbles: true }));
    });
    act(() => {
      city?.dispatchEvent(new Event("dragover", { bubbles: true }));
    });
    expect(city?.classList.contains("dmc-data-table__th--drop")).toBe(true);
    act(() => {
      city?.dispatchEvent(new Event("drop", { bubbles: true }));
    });
    expect(city?.classList.contains("dmc-data-table__th--drop")).toBe(false);
    const saved = storage.getItem("columns.segments");
    expect(Array.isArray(saved) && saved[0]).toBe("city");
    storage.clear();
    view.unmount();
  });

  it("renders group field as nested table with parent columns", () => {
    const view = mount(
      <DataTable
        data={[{ name: "Carbon", symbol: "C", group: [{ name: "Oxygen", symbol: "O" }, { name: "Nitrogen", symbol: "N" }] }]}
        withPagination={false}
      >
        <DataTable.Column group field="group" />
        <DataTable.Column field="name" header="Имя" />
        <DataTable.Column field="symbol" header="Символ" />
      </DataTable>,
    );
    const button = view.container.querySelector("tbody button");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const nested = view.container.querySelector(".dmc-data-table__nested");
    expect(nested).not.toBeNull();
    const headers = [...(nested?.querySelectorAll("thead th") ?? [])].map((th) => th.textContent);
    expect(headers).toEqual(["group", "Имя", "Символ"]);
    const body = nested?.querySelector("tbody")?.textContent ?? "";
    expect(body).toContain("Oxygen");
    expect(body).toContain("Nitrogen");
    expect(body).not.toContain("{");
    view.unmount();
  });

  it("keeps grouped-only children in the same table with matrix diagonal indent", () => {
    expect(resolveGroupedPresentation("region", [{ field: "region", source: { grouped: true } }], "default")).toBe("inline");
    expect(groupedInlineLayout(1)).toEqual({ level: 1 });
    expect([0, 1, 2, 3, 4].map((j) => groupedIndentSteps(1, j))).toEqual([1, 0, 0, 0, 0]);
    expect([0, 1, 2, 3, 4].map((j) => groupedIndentSteps(2, j))).toEqual([2, 1, 0, 0, 0]);
    expect([0, 1, 2, 3, 4].map((j) => groupedIndentSteps(3, j))).toEqual([3, 2, 1, 0, 0]);
    expect(groupedIndentPx(2, 0)).toBe(8 + GROUPED_INDENT_STEP * 2);
    expect(groupedIndentPx(2, 1)).toBe(8 + GROUPED_INDENT_STEP);
    expect(groupedIndentPx(2, 2)).toBe(0);
    expect(nestedExpandLayout(3, 1, "start", "grouped")).toEqual({
      padStart: 1,
      padEnd: 0,
      nestedColspan: 2,
      leafOffset: 1,
    });
    const view = mount(
      <DataTable
        data={[
          { region: "Европа", category: "Электроника", name: "Телефон" },
          { region: "Европа", category: "Одежда", name: "Куртка" },
        ]}
        withPagination={false}
      >
        <DataTable.Column field="region" grouped header="Регион" />
        <DataTable.Column field="category" grouped header="Категория" />
        <DataTable.Column field="name" header="Название" />
      </DataTable>,
    );
    act(() => {
      view.container.querySelector("tbody .dmc-data-table__expand")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(view.container.querySelector(".dmc-data-table__nested")).toBeNull();
    expect(view.container.querySelector("td.dmc-data-table__grouped-blank")).toBeNull();
    const level1Row = [...view.container.querySelectorAll("tbody tr")].find((tr) =>
      tr.querySelector("td.dmc-data-table__grouped-indent"),
    );
    const level1Cells = [...(level1Row?.querySelectorAll("td") ?? [])] as HTMLElement[];
    expect(level1Cells[0]?.style.paddingLeft).toBe(`${8 + GROUPED_INDENT_STEP}px`);
    expect(level1Cells[1]?.style.paddingLeft || "").toBe("");
    expect(level1Row?.textContent).toContain("Электроника");
    act(() => {
      level1Row?.querySelector(".dmc-data-table__expand")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(view.container.querySelector(".dmc-data-table__nested")).toBeNull();
    const level2Row = [...view.container.querySelectorAll("tbody tr")].find(
      (tr) =>
        tr.textContent?.includes("Телефон") &&
        [...tr.querySelectorAll("td.dmc-data-table__grouped-indent")].some(
          (td) => (td as HTMLElement).style.paddingLeft === `${8 + GROUPED_INDENT_STEP * 2}px`,
        ),
    );
    const level2Cells = [...(level2Row?.querySelectorAll("td") ?? [])] as HTMLElement[];
    expect(level2Cells[0]?.style.paddingLeft).toBe(`${8 + GROUPED_INDENT_STEP * 2}px`);
    expect(level2Cells[1]?.style.paddingLeft).toBe(`${8 + GROUPED_INDENT_STEP}px`);
    expect(level2Cells[2]?.style.paddingLeft || "").toBe("");
    expect(view.container.textContent).toContain("Телефон");
    view.unmount();
  });

  it("opens group+grouped as nested table with parent columns", () => {
    expect(
      resolveGroupedPresentation("department", [{ field: "department", source: { group: true, grouped: true } }], "default"),
    ).toBe("nested-table");
    const view = mount(
      <DataTable
        data={[
          { department: "IT", employee: "Аня", role: "Dev", salary: 100 },
          { department: "IT", employee: "Боря", role: "QA", salary: 90 },
        ]}
        withPagination={false}
      >
        <DataTable.Column field="department" group grouped header="Отдел" />
        <DataTable.Column field="employee" header="Сотрудник" />
        <DataTable.Column field="role" header="Должность" />
        <DataTable.Column field="salary" header="Зарплата" />
      </DataTable>,
    );
    act(() => {
      view.container.querySelector("tbody .dmc-data-table__expand")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const nested = view.container.querySelector(".dmc-data-table__nested");
    expect(nested).not.toBeNull();
    const headers = [...(nested?.querySelectorAll("thead th") ?? [])].map((th) => th.textContent);
    expect(headers).toEqual(["Отдел", "Сотрудник", "Должность", "Зарплата"]);
    expect(nested?.textContent).toContain("Аня");
    expect(nested?.textContent).toContain("Боря");
    view.unmount();
  });

  it("accumulates sort rules when multiSort is enabled", () => {
    const view = mount(
      <DataTable data={rows} multiSort withPagination={false}>
        <DataTable.Column<Row> field="city" header="Город" sortable />
        <DataTable.Column<Row> field="name" header="Название" sortable />
      </DataTable>,
    );
    const sorts = () => [...view.container.querySelectorAll(".dmc-data-table__sort")];
    const rowText = () => [...view.container.querySelectorAll("tbody tr")].map((row) => row.textContent);
    act(() => {
      sorts()[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(rowText()[0]).toContain("Казань");
    act(() => {
      sorts()[1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(rowText().map((text) => text?.replace(/\s+/g, " "))).toEqual([
      expect.stringContaining("Казань"),
      expect.stringContaining("Альфа"),
      expect.stringContaining("Гамма"),
    ]);
    view.unmount();
  });

  it("starts cell edit on double click", () => {
    const view = mount(
      <DataTable
        data={rows}
        editMode="cell"
        withPagination={false}
        onRowEditComplete={() => undefined}
      >
        <DataTable.Column<Row>
          field="name"
          header="Название"
          editor={(item, column, onChange) => (
            <input aria-label="edit-name" value={String((item as Record<string, unknown>)[column.field!] ?? "")} onChange={(event) => onChange(event.target.value)} />
          )}
        />
      </DataTable>,
    );
    const cell = view.container.querySelector("tbody td");
    act(() => {
      cell?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    });
    expect(view.container.querySelector("[aria-label='edit-name']")).not.toBeNull();
    view.unmount();
  });

  it("omits hover slot without rowActions", () => {
    const view = mount(
      <DataTable data={rows} withPagination={false}>
        <DataTable.Column<Row> field="name" header="Название" />
      </DataTable>,
    );
    expect(view.container.querySelector(".dmc-data-table__hover-slot")).toBeNull();
    view.unmount();
  });

  it("places selection before hover slot at row start", () => {
    const view = mount(
      <DataTable
        data={rows.slice(0, 1)}
        selectable="start"
        rowActions={[{ id: "a", label: "A", onClick: () => undefined }]}
        rowActionsAt="start"
        withPagination={false}
      >
        <DataTable.Column<Row> field="name" header="Название" />
      </DataTable>,
    );
    const cells = view.container.querySelectorAll("tbody tr td");
    expect(cells[0]?.querySelector("input[type='checkbox']")).not.toBeNull();
    expect(cells[1]?.classList.contains("dmc-data-table__hover-slot")).toBe(true);
    view.unmount();
  });

  it("starts row edit from rowActions edit action", () => {
    const view = mount(
      <DataTable
        data={rows}
        editMode="row"
        withPagination={false}
        onRowEditComplete={() => undefined}
        rowActions={[{ id: "edit", label: "Изменить", edit: true }]}
        rowActionsOnHover={false}
      >
        <DataTable.Column<Row>
          field="name"
          header="Название"
          editor={(item, column, onChange) => (
            <input aria-label="edit-name" value={String((item as Record<string, unknown>)[column.field!] ?? "")} onChange={(event) => onChange(event.target.value)} />
          )}
        />
        <DataTable.Column<Row> field="_actions" actions header="" />
      </DataTable>,
    );
    const editBtn = [...view.container.querySelectorAll("button")].find((button) => button.textContent === "Изменить");
    act(() => {
      editBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(view.container.querySelector("[aria-label='edit-name']")).not.toBeNull();
    const saveBtn = [...view.container.querySelectorAll("button")].find((button) => button.textContent === "Сохранить");
    expect(saveBtn).not.toBeNull();
    expect([...view.container.querySelectorAll("tbody tr")].some((row) => row.querySelector("td[colspan]")?.textContent === "Сохранить")).toBe(
      false,
    );
    view.unmount();
  });

  it("disables rowActions edit when editMode is cell", () => {
    const view = mount(
      <DataTable
        data={rows}
        editMode="cell"
        withPagination={false}
        rowActions={[{ id: "edit", label: "Изменить", edit: true }]}
        rowActionsOnHover={false}
      >
        <DataTable.Column<Row> field="name" header="Название" editor={() => null} />
        <DataTable.Column<Row> field="_actions" actions header="" />
      </DataTable>,
    );
    const editBtn = [...view.container.querySelectorAll("button")].find((button) => button.textContent === "Изменить");
    expect((editBtn as HTMLButtonElement | undefined)?.disabled).toBe(true);
    view.unmount();
  });

  it("pins actions column to end when actionsAt is end", () => {
    const view = mount(
      <DataTable
        data={rows.slice(0, 1)}
        rowActions={[{ id: "edit", label: "Изменить", onClick: () => undefined }]}
        rowActionsOnHover={false}
        withPagination={false}
      >
        <DataTable.Column<Row> field="_actions" actions actionsAt="end" header="" width={80} />
        <DataTable.Column<Row> field="name" header="Название" />
        <DataTable.Column<Row> field="city" header="Город" />
      </DataTable>,
    );
    const rowText = view.container.querySelector("tbody tr")?.textContent ?? "";
    expect(rowText.indexOf("Бета")).toBeLessThan(rowText.indexOf("Изменить"));
    view.unmount();
  });

  it("calls onRow.onClick for a data row", () => {
    let hit: string | null = null;
    const view = mount(
      <DataTable
        data={rows}
        withPagination={false}
        onRow={{ onClick: (_event, row) => { hit = row.name; } }}
      >
        <DataTable.Column<Row> field="name" header="Название" />
      </DataTable>,
    );
    const row = view.container.querySelector("tbody tr");
    act(() => {
      row?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(hit).toBe("Бета");
    view.unmount();
  });
});
