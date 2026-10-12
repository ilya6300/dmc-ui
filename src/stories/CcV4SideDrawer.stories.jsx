import { useId, useState } from "react";
import {
  Box,
  CcV4Button,
  CcV4SideDrawer,
} from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "CC-V4/SideDrawer",
  component: CcV4SideDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Боковая панель v4: \`posi-abs subscription-drawer-v4\`, layout drawer, \`site-modal\`, опциональный footer с кнопками.

${ROOT_NOTE}

### Импорт

${importBlock("CcV4SideDrawer", "CcV4Button", "Box")}

\`\`\`jsx
<CcV4SideDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Заголовок"
  titleId={titleId}
  toolbar={<SiteModalToolbarBtn variant="close" onClick={close} />}
  footer={
    <>
      <CcV4Button variant="primary" text="Сохранить" footerSize />
      <CcV4Button variant="outline" text="Отмена" onClick={close} />
    </>
  }
>
  <div className="site-modal-body">…</div>
</CcV4SideDrawer>
\`\`\`

\`usePortal={false}\` — рендер без portal (как в overlay внутри уже смонтированной карточки).
        `,
      },
    },
  },
  argTypes: {
    open: {
      description: "Показать панель (по умолчанию `true`, если родитель всегда монтирует).",
      control: "boolean",
    },
    onClose: { description: "Закрытие: Escape, backdrop (если включён).", action: "closed" },
    title: { description: "Заголовок в SiteModalHeader." },
    titleId: { description: "id для `aria-labelledby`." },
    toolbar: { description: "Слот toolbar (кнопка закрыть и т.д.).", control: false },
    headerActions: { description: "Алиас для `toolbar`.", control: false },
    children: { description: "Тело drawer (обычно `site-modal-body`).", control: false },
    footer: { description: "Слот кнопок в `subscription-drawer-actions`.", control: false },
    className: { description: "Классы на `subscription-drawer-main`." },
    style: { description: "Inline-стили панели (`subscription-drawer-main`).", control: false },
    layoutStyle: {
      description: "Inline-стили колонки drawer (`subscription-drawer-layout`).",
      control: false,
    },
    rootClassName: {
      description: "Доп. классы на корень, например `role-card-v4`.",
    },
    usePortal: {
      description: "Рендер через `createPortal` в `document.body` (по умолчанию true).",
      control: "boolean",
    },
    closeOnBackdrop: {
      description: "Клик по фону вызывает `onClose`.",
      control: "boolean",
    },
  },
};

export default meta;

function DrawerDemo() {
  const titleId = useId();
  const [open, setOpen] = useState(true);

  return (
    <Box withMainPage style={{ padding: 24, minHeight: 400 }}>
      {!open ? (
        <CcV4Button variant="primary" text="Открыть drawer" onClick={() => setOpen(true)} />
      ) : null}
      <CcV4SideDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Пример боковой панели"
        titleId={titleId}
        usePortal={false}
        toolbar={
          <button
            type="button"
            className="site-modal-toolbar-btn"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
          >
            ×
          </button>
        }
        footer={
          <>
            <CcV4Button variant="primary" text="Сохранить" footerSize onClick={() => setOpen(false)} />
            <CcV4Button variant="outline" text="Отмена" onClick={() => setOpen(false)} />
          </>
        }
      >
        <div className="site-modal-body">
          <p className="description-text">Контент формы или списка.</p>
        </div>
      </CcV4SideDrawer>
    </Box>
  );
}

export const Default = {
  render: () => <DrawerDemo />,
};
