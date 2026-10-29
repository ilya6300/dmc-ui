/** Общие фрагменты для Storybook Docs. */

export const ROOT_NOTE =
  "Один раз в entry приложения: `import \"@dmc/ui/styles.css\"`. Компоненты: `import { … } from \"@dmc/ui\"`.";

export function importBlock(...names: string[]): string {
  const list = names.join(", ");
  return `\`\`\`jsx
import "@dmc/ui/styles.css";
import { ${list} } from "@dmc/ui";
\`\`\``;
}
