import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState, type CSSProperties } from "react";
import { Main, SideDrawer, SideDrawerCloseButton, tokens } from "../index";
import { importBlock, ROOT_NOTE } from "./docsFragments";

const bodyStyle: CSSProperties = { flex: 1, minHeight: 0 };
const muted: CSSProperties = { color: tokens.textMuted, fontSize: 14, margin: 0 };

const openBtn: CSSProperties = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: tokens.mainBlue1,
  color: "#fff",
  cursor: "pointer",
};

const meta = {
  title: "Design System/SideDrawer",
  component: SideDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Боковая панель — стили только в компоненте.

**Состав:** обязательные — контент (\`children\`); опциональные — \`open\`, \`onClose\`, \`title\`, \`titleId\`, \`toolbar\` / \`headerActions\`, \`footer\`, \`w\` (ширина панели, CSS-строка), \`usePortal\`, \`closeOnBackdrop\`, \`style\`, \`layoutStyle\`, \`rootStyle\`.

${ROOT_NOTE}

${importBlock("SideDrawer", "SideDrawerCloseButton", "Main")}
        `,
      },
    },
  },
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "closed" },
    title: {},
    titleId: {},
    toolbar: { control: false },
    children: { control: false },
    usePortal: { control: "boolean" },
    w: {
      control: "text",
      description: "Ширина панели (CSS, например 400px или 40%). Без значения — по контенту.",
    },
  },
} satisfies Meta<typeof SideDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

function DrawerDemo({ usePortal = false }: { usePortal?: boolean }) {
  const titleId = useId();
  const [open, setOpen] = useState(true);

  return (
    <Main style={{ padding: 24, minHeight: 400 }}>
      {!open ? (
        <button type="button" style={openBtn} onClick={() => setOpen(true)}>
          Открыть drawer
        </button>
      ) : null}
      <SideDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Комментарии по лицензиям"
        titleId={titleId}
        usePortal={usePortal}
        toolbar={<SideDrawerCloseButton onClick={() => setOpen(false)} />}
      >
        <div style={bodyStyle}>
          <p style={muted}>Контент боковой панели.</p>
        </div>
      </SideDrawer>
    </Main>
  );
}

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const WithPortal: Story = {
  name: "С portal в body",
  render: () => <DrawerDemo usePortal />,
};

export const Minimal: Story = {
  name: "Минимальный (без title)",
  render: () => (
    <Main style={{ padding: 24, minHeight: 200 }}>
      <SideDrawer open usePortal={false}>
        <div style={bodyStyle}>Только тело панели</div>
      </SideDrawer>
    </Main>
  ),
};

export const CustomWidth: Story = {
  name: "Ширина (w)",
  render: () => (
    <Main style={{ padding: 24, minHeight: 200 }}>
      <SideDrawer open usePortal={false} w="360px" title="Узкая панель">
        <div style={bodyStyle}>
          <p style={muted}>Ширина задана через w=&quot;360px&quot;.</p>
        </div>
      </SideDrawer>
    </Main>
  ),
};
