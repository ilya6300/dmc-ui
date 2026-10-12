import { Box, CcV4Button } from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "CC-V4/Button",
  component: CcV4Button,
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
Единая кнопка v4: \`btn-primary-v4\`, \`btn-outline-v4\`, мобильная «+» (variant icon).

${ROOT_NOTE}

### Импорт

${importBlock("CcV4Button", "Box")}

\`\`\`jsx
<Box>
  <CcV4Button variant="primary" text="Добавить" onClick={handleAdd} />
  <CcV4Button variant="outline" text="Отмена" onClick={onClose} />
</Box>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "`primary` | `outline` | `icon` (кнопка «+»).",
      control: "select",
      options: ["primary", "outline", "icon"],
    },
    text: { description: "Текст кнопки (для primary/outline)." },
    children: {
      description: "Альтернатива `text` — содержимое кнопки.",
      control: false,
    },
    onClick: { description: "Обработчик клика.", action: "clicked" },
    compact: {
      description:
        "Для primary: компактный класс `sub-status-action-btn` (по умолчанию включён, если нет footerSize).",
      control: "boolean",
    },
    footerSize: {
      description: "Для primary: отключить компактный action-класс (кнопки в footer drawer).",
      control: "boolean",
    },
    disabled: { control: "boolean" },
    className: { description: "Дополнительные классы." },
    type: { description: "Атрибут type у `<button>` (по умолчанию `button`)." },
  },
};

export default meta;

export const Primary = {
  args: { variant: "primary", text: "Добавить" },
};

export const Outline = {
  args: { variant: "outline", text: "Отмена" },
};

export const Icon = {
  args: { variant: "icon", onClick: () => {} },
};
