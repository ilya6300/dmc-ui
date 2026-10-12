import{j as e}from"./index-83DXtIcG.js";import{R as c,b as n,i,C as l}from"./docsFragments-C_nPw_XH.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";const g={title:"CC-V4/Input",component:n,tags:["autodocs"],decorators:[r=>e.jsx(l,{withMainPage:!0,style:{padding:24,maxWidth:420},children:e.jsx("div",{className:"card site-modal",children:e.jsx(r,{})})})],parameters:{docs:{description:{component:`
Поле ввода v4: классы \`site-form-control\` и при \`legacy\` — \`input_edit_v1\` (совместимость с InputEditVer1).

${c}

### Импорт

${i("CcV4Input","CcV4Root")}

\`\`\`jsx
<div className="site-form-field">
  <span className="site-form-label">Название</span>
  <CcV4Input value={name} onChange={(e) => setName(e.target.value)} />
</div>
\`\`\`
        `}}},argTypes:{value:{control:"text"},placeholder:{control:"text"},type:{control:"text",description:"Тип input (text, number, …)."},legacy:{description:"Добавить класс `input_edit_v1` (по умолчанию true).",control:"boolean"},v4:{description:"Добавить класс `site-form-control` (по умолчанию true).",control:"boolean"},error:{description:"Добавить модификатор `cc-v4-input--error`.",control:"boolean"},className:{description:"Дополнительные классы."},disabled:{control:"boolean"},onChange:{action:"changed"}}},t={render:r=>e.jsxs("div",{className:"site-form-field",children:[e.jsx("span",{className:"site-form-label",children:"ИНН"}),e.jsx(n,{...r,placeholder:"10 цифр"})]}),args:{value:"",legacy:!0,v4:!0}},f=["Default"];var a,o,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => <div className="site-form-field">\r
      <span className="site-form-label">ИНН</span>\r
      <CcV4Input {...args} placeholder="10 цифр" />\r
    </div>,
  args: {
    value: "",
    legacy: true,
    v4: true
  }
}`,...(s=(o=t.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};export{t as Default,f as __namedExportsOrder,g as default};
