import { Box, CcV4Input } from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "CC-V4/Input",
  component: CcV4Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box withMainPage style={{ padding: 24, maxWidth: 420 }}>
        <div className="card site-modal">
          <Story />
        </div>
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Поле ввода v4: классы \`site-form-control\` и при \`legacy\` — \`input_edit_v1\` (совместимость с InputEditVer1).

${ROOT_NOTE}

### Импорт

${importBlock("CcV4Input", "Box")}

\`\`\`jsx
<div className="site-form-field">
  <span className="site-form-label">Название</span>
  <CcV4Input value={name} onChange={(e) => setName(e.target.value)} />
</div>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "text", description: "Тип input (text, number, …)." },
    legacy: {
      description: "Добавить класс `input_edit_v1` (по умолчанию true).",
      control: "boolean",
    },
    v4: {
      description: "Добавить класс `site-form-control` (по умолчанию true).",
      control: "boolean",
    },
    error: {
      description: "Добавить модификатор `cc-v4-input--error`.",
      control: "boolean",
    },
    className: { description: "Дополнительные классы." },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <div className="site-form-field">
      <span className="site-form-label">ИНН</span>
      <CcV4Input {...args} placeholder="10 цифр" />
    </div>
  ),
  args: { value: "", legacy: true, v4: true },
};
