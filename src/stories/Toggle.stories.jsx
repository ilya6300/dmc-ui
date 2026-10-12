import { Main, Toggle } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "Design System/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Main style={{ padding: 24 }}>
        <Story />
      </Main>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Переключатель на inline-стилях. \`variant="text"\` — только подпись.

${ROOT_NOTE}

${importBlock("Toggle", "Main")}

\`\`\`jsx
<Toggle active={on} label="Мои" onChange={setOn} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    active: { control: "boolean" },
    label: { description: "Подпись." },
    variant: { options: ["switch", "text"], control: "radio" },
    style: { description: "Стили на кнопке-обёртке.", control: false },
    disabled: { control: "boolean" },
  },
};

export default meta;

export const WithLabel = {
  name: "С подписью",
  args: { active: true, label: "Мои" },
};

export const SwitchOnly = {
  name: "Только switch",
  args: { active: false },
};

export const TextOnly = {
  name: "Только текст",
  args: { variant: "text", label: "Подпись без переключателя" },
};
