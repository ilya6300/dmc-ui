import { Box, CcV4Toggle } from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "CC-V4/Toggle",
  component: CcV4Toggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box withMainPage style={{ padding: 24 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Переключатель v4 (\`cc-v4-toggle\`). Три режима: только switch; с \`label\`; с \`label\` + \`description\`.

${ROOT_NOTE}

### Импорт

${importBlock("CcV4Toggle", "Box")}

\`\`\`jsx
<CcV4Toggle
  active={showMineOnly}
  label="Мои"
  onClick={() => setShowMineOnly((v) => !v)}
/>
\`\`\`

\`onChange\` вызывается с новым boolean после клика (опционально, вместе с \`onClick\`).
        `,
      },
    },
  },
  argTypes: {
    active: { description: "Включённое состояние.", control: "boolean" },
    label: { description: "Подпись справа от switch; можно не передавать." },
    description: {
      description: "Вторичный текст под подписью (muted, 12px).",
    },
    onClick: { description: "Событие клика (как в legacy CcV4Toggle).", action: "clicked" },
    onChange: {
      description: "Колбэк `(nextActive: boolean)` после переключения.",
      action: "changed",
    },
    disabled: { control: "boolean" },
    className: { description: "Класс на `cc-v4-toggle-wrapper`." },
  },
};

export default meta;

export const LabelOnly = {
  args: { active: true, label: "Мои" },
};

export const WithDescription = {
  args: {
    active: false,
    label: "Только мои",
    description: "Показывать уведомления, где вы ответственный менеджер",
  },
};

export const SwitchOnly = {
  args: { active: true },
};
