/** Общие фрагменты для Storybook Docs. */

export const ROOT_NOTE =
  "В entry приложения подключите стили: `import \"@dmc/ui/styles.css\"`, затем компоненты из `@dmc/ui`.";

export const STYLE_CSS_NOTE =
  "Литералы тем — `style.css` в корне пакета (`@dmc/ui/style.css` или через `styles.css`). `themes` и `useTheme().colors` парсят тот же файл; переопределение — свой CSS после `styles.css` с `--dmc-color-*` на `[data-dmc-theme=\"…\"]`.";

export function importBlock(...names) {
  const list = names.join(", ");
  return [
    "```jsx",
    'import "@dmc/ui/styles.css";',
    `import { ${list} } from "@dmc/ui";`,
    "```",
  ].join("\n");
}

/** Сборка текста Docs без ${} в meta stories (индексатор Storybook). */
export function componentDoc(...sections) {
  return sections.filter(Boolean).join("\n\n");
}
