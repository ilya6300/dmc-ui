/** Общие фрагменты для Storybook Docs. */

export const ROOT_NOTE =
  "Достаточно `import { … } from \"@dmc/ui\"`. Отдельный CSS не подключают — стили внутри компонентов (`style`).";

export function importBlock(...names) {
  const list = names.join(", ");
  return `\`\`\`jsx
import { ${list} } from "@dmc/ui";
\`\`\``;
}
