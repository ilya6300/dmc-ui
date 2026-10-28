import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Main, Toggle, type ToggleProps } from "../index";
import { importBlock, ROOT_NOTE } from "./docsFragments";

function ToggleStory(args: ToggleProps) {
  const [, updateArgs] = useArgs<ToggleProps>();
  const { variant = "switch" } = args;

  return (
    <Toggle
      {...args}
      onChange={
        variant === "text"
          ? args.onChange
          : (next) => updateArgs({ active: next })
      }
    />
  );
}

const meta = {
  title: "Design System/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  render: ToggleStory,
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
    onChange: { control: false },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  name: "С подписью",
  args: { active: true, label: "Мои" },
};

export const SwitchOnly: Story = {
  name: "Только switch",
  args: { active: false },
};

export const TextOnly: Story = {
  name: "Только текст",
  args: { variant: "text", label: "Подпись без переключателя" },
};
