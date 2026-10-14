import{j as r}from"./iframe-CiYZLyXL.js";import{R as g,e as x,i as E,M as b}from"./docsFragments-Drh3_ADq.js";import"./preload-helper-Dp1pzeXC.js";import"./index-UK0xwPLs.js";import"./index-DKkv2d_9.js";const f={title:"Design System/Toggle",component:x,tags:["autodocs"],decorators:[d=>r.jsx(b,{style:{padding:24},children:r.jsx(d,{})})],parameters:{docs:{description:{component:`
Переключатель на inline-стилях. \`variant="text"\` — только подпись.

${g}

${E("Toggle","Main")}

\`\`\`jsx
<Toggle active={on} label="Мои" onChange={setOn} />
\`\`\`
        `}}},argTypes:{active:{control:"boolean"},label:{description:"Подпись."},variant:{options:["switch","text"],control:"radio"},style:{description:"Стили на кнопке-обёртке.",control:!1},disabled:{control:"boolean"}}},e={name:"С подписью",args:{active:!0,label:"Мои"}},a={name:"Только switch",args:{active:!1}},t={name:"Только текст",args:{variant:"text",label:"Подпись без переключателя"}},C=["WithLabel","SwitchOnly","TextOnly"];var s,o,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "С подписью",
  args: {
    active: true,
    label: "Мои"
  }
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var u,c,i;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Только switch",
  args: {
    active: false
  }
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var l,m,p;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Только текст",
  args: {
    variant: "text",
    label: "Подпись без переключателя"
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};export{a as SwitchOnly,t as TextOnly,e as WithLabel,C as __namedExportsOrder,f as default};
