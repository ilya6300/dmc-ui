import{j as r}from"./iframe-BV7CKJmH.js";import{d as g,M as O}from"./theme-toggle-CEYbH-lm.js";import{R as v,i as b}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const{useArgs:T}=__STORYBOOK_MODULE_PREVIEW_API__;function _(e){const[,x]=T(),{variant:E="switch"}=e;return r.jsx(g,{...e,onChange:E==="text"?e.onChange:h=>x({active:h})})}const w={title:"Design System/Toggle",component:g,tags:["autodocs"],render:_,decorators:[e=>r.jsx(O,{style:{padding:24},children:r.jsx(e,{})})],parameters:{docs:{description:{component:`
Переключатель на inline-стилях. \`variant="text"\` — только подпись.

${v}

${b("Toggle","Main")}

\`\`\`jsx
<Toggle active={on} label="Мои" onChange={setOn} />
\`\`\`
        `}}},argTypes:{active:{control:"boolean"},label:{description:"Подпись."},variant:{options:["switch","text"],control:"radio"},style:{description:"Стили на кнопке-обёртке.",control:!1},disabled:{control:"boolean"},onChange:{control:!1}}},a={name:"С подписью",args:{active:!0,label:"Мои"}},t={name:"Только switch",args:{active:!1}},o={name:"Только текст",args:{variant:"text",label:"Подпись без переключателя"}},B=["WithLabel","SwitchOnly","TextOnly"];var n,s,u;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "С подписью",
  args: {
    active: true,
    label: "Мои"
  }
}`,...(u=(s=a.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};var c,i,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Только switch",
  args: {
    active: false
  }
}`,...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,p,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Только текст",
  args: {
    variant: "text",
    label: "Подпись без переключателя"
  }
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};export{t as SwitchOnly,o as TextOnly,a as WithLabel,B as __namedExportsOrder,w as default};
