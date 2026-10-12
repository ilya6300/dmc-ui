import{j as e}from"./index-83DXtIcG.js";import{r as s}from"./iframe-DQQUhNoo.js";import{R as p,c,i as m,C as u,a as r}from"./docsFragments-C_nPw_XH.js";import"./index-B6A0Fjfh.js";import"./preload-helper-Dp1pzeXC.js";const j={title:"CC-V4/SideDrawer",component:c,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Боковая панель v4: \`posi-abs subscription-drawer-v4\`, layout drawer, \`site-modal\`, опциональный footer с кнопками.

${p}

### Импорт

${m("CcV4SideDrawer","CcV4Button","CcV4Root")}

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
        `}}},argTypes:{open:{description:"Показать панель (по умолчанию `true`, если родитель всегда монтирует).",control:"boolean"},onClose:{description:"Закрытие: Escape, backdrop (если включён).",action:"closed"},title:{description:"Заголовок в SiteModalHeader."},titleId:{description:"id для `aria-labelledby`."},toolbar:{description:"Слот toolbar (кнопка закрыть и т.д.).",control:!1},headerActions:{description:"Алиас для `toolbar`.",control:!1},children:{description:"Тело drawer (обычно `site-modal-body`).",control:!1},footer:{description:"Слот кнопок в `subscription-drawer-actions`.",control:!1},className:{description:"Классы на `subscription-drawer-main`."},rootClassName:{description:"Доп. классы на корень, например `role-card-v4`."},usePortal:{description:"Рендер через `createPortal` в `document.body` (по умолчанию true).",control:"boolean"},closeOnBackdrop:{description:"Клик по фону вызывает `onClose`.",control:"boolean"}}};function b(){const d=s.useId(),[a,o]=s.useState(!0);return e.jsxs(u,{withMainPage:!0,style:{padding:24,minHeight:400},children:[a?null:e.jsx(r,{variant:"primary",text:"Открыть drawer",onClick:()=>o(!0)}),e.jsx(c,{open:a,onClose:()=>o(!1),title:"Пример боковой панели",titleId:d,usePortal:!1,toolbar:e.jsx("button",{type:"button",className:"site-modal-toolbar-btn",onClick:()=>o(!1),"aria-label":"Закрыть",children:"×"}),footer:e.jsxs(e.Fragment,{children:[e.jsx(r,{variant:"primary",text:"Сохранить",footerSize:!0,onClick:()=>o(!1)}),e.jsx(r,{variant:"outline",text:"Отмена",onClick:()=>o(!1)})]}),children:e.jsx("div",{className:"site-modal-body",children:e.jsx("p",{className:"description-text",children:"Контент формы или списка."})})})]})}const t={render:()=>e.jsx(b,{})},v=["Default"];var i,l,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <DrawerDemo />
}`,...(n=(l=t.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};export{t as Default,v as __namedExportsOrder,j as default};
