import{j as r}from"./index-83DXtIcG.js";import{R as m,h as C,i as b,C as h}from"./docsFragments-C_nPw_XH.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";const w={title:"CC-V4/Toggle",component:C,tags:["autodocs"],decorators:[g=>r.jsx(h,{withMainPage:!0,style:{padding:24},children:r.jsx(g,{})})],parameters:{docs:{description:{component:`
Переключатель v4 (\`cc-v4-toggle\`). Три режима: только switch; с \`label\`; с \`label\` + \`description\`.

${m}

### Импорт

${b("CcV4Toggle","CcV4Root")}

\`\`\`jsx
<CcV4Toggle
  active={showMineOnly}
  label="Мои"
  onClick={() => setShowMineOnly((v) => !v)}
/>
\`\`\`

\`onChange\` вызывается с новым boolean после клика (опционально, вместе с \`onClick\`).
        `}}},argTypes:{active:{description:"Включённое состояние.",control:"boolean"},label:{description:"Подпись справа от switch; можно не передавать."},description:{description:"Вторичный текст под подписью (muted, 12px)."},onClick:{description:"Событие клика (как в legacy CcV4Toggle).",action:"clicked"},onChange:{description:"Колбэк `(nextActive: boolean)` после переключения.",action:"changed"},disabled:{control:"boolean"},className:{description:"Класс на `cc-v4-toggle-wrapper`."}}},e={args:{active:!0,label:"Мои"}},o={args:{active:!1,label:"Только мои",description:"Показывать уведомления, где вы ответственный менеджер"}},a={args:{active:!0}},T=["LabelOnly","WithDescription","SwitchOnly"];var t,s,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    active: true,
    label: "Мои"
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var u,n,i;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    active: false,
    label: "Только мои",
    description: "Показывать уведомления, где вы ответственный менеджер"
  }
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var l,p,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    active: true
  }
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};export{e as LabelOnly,a as SwitchOnly,o as WithDescription,T as __namedExportsOrder,w as default};
