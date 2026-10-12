import{j as a}from"./index-83DXtIcG.js";import{R as C,a as x,i as y,C as g}from"./docsFragments-C_nPw_XH.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";const R={title:"CC-V4/Button",component:x,tags:["autodocs"],decorators:[d=>a.jsx(g,{withMainPage:!0,style:{padding:24},children:a.jsx(d,{})})],parameters:{docs:{description:{component:`
Единая кнопка v4: \`btn-primary-v4\`, \`btn-outline-v4\`, мобильная «+» (variant icon).

${C}

### Импорт

${y("CcV4Button","CcV4Root")}

\`\`\`jsx
<CcV4Root>
  <CcV4Button variant="primary" text="Добавить" onClick={handleAdd} />
  <CcV4Button variant="outline" text="Отмена" onClick={onClose} />
</CcV4Root>
\`\`\`
        `}}},argTypes:{variant:{description:"`primary` | `outline` | `icon` (кнопка «+»).",control:"select",options:["primary","outline","icon"]},text:{description:"Текст кнопки (для primary/outline)."},children:{description:"Альтернатива `text` — содержимое кнопки.",control:!1},onClick:{description:"Обработчик клика.",action:"clicked"},compact:{description:"Для primary: компактный класс `sub-status-action-btn` (по умолчанию включён, если нет footerSize).",control:"boolean"},footerSize:{description:"Для primary: отключить компактный action-класс (кнопки в footer drawer).",control:"boolean"},disabled:{control:"boolean"},className:{description:"Дополнительные классы."},type:{description:"Атрибут type у `<button>` (по умолчанию `button`)."}}},t={args:{variant:"primary",text:"Добавить"}},o={args:{variant:"outline",text:"Отмена"}},r={args:{variant:"icon",onClick:()=>{}}},B=["Primary","Outline","Icon"];var n,e,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    text: "Добавить"
  }
}`,...(i=(e=t.parameters)==null?void 0:e.docs)==null?void 0:i.source}}};var s,c,p;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    text: "Отмена"
  }
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,l;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: "icon",
    onClick: () => {}
  }
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};export{r as Icon,o as Outline,t as Primary,B as __namedExportsOrder,R as default};
