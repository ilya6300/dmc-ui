import { useId, useState } from "react";
import { Box, SideDrawer, SideDrawerCloseButton, tokens } from "../index.js";
import { importBlock, ROOT_NOTE } from "./docsFragments.js";

const bodyStyle = { flex: 1, minHeight: 0 };
const muted = { color: tokens.textMuted, fontSize: 14, margin: 0 };

const openBtn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: tokens.mainBlue1,
  color: "#fff",
  cursor: "pointer",
};

/** @type { import('@storybook/react-vite').Meta } */
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

${ROOT_NOTE}

${importBlock("SideDrawer", "SideDrawerCloseButton", "Box")}
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
  },
};

export default meta;

function DrawerDemo({ usePortal = false }) {
  const titleId = useId();
  const [open, setOpen] = useState(true);

  return (
    <Box style={{ padding: 24, minHeight: 400 }}>
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
    </Box>
  );
}

export const Default = {
  render: () => <DrawerDemo />,
};

export const WithPortal = {
  name: "С portal в body",
  render: () => <DrawerDemo usePortal />,
};

export const Minimal = {
  name: "Минимальный (без title)",
  render: () => (
    <Box style={{ padding: 24, minHeight: 200 }}>
      <SideDrawer open usePortal={false}>
        <div style={bodyStyle}>Только тело панели</div>
      </SideDrawer>
    </Box>
  ),
};
