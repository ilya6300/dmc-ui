/** Общие фрагменты для Storybook Docs (CC-V4). */

export const STYLES_IMPORT = `import "@dmc/ui/styles.css";`;

export const ROOT_NOTE =
  "Стили v4 действуют на потомков `.company-card-v4`. Оберните страницу или секцию в `Box` (класс `company-card-v4`).";

export function importBlock(...names) {
  const list = names.join(", ");
  return `\`\`\`jsx
import { ${list} } from "@dmc/ui";
${STYLES_IMPORT}
\`\`\``;
}
