import{j as a}from"./iframe-BtHEu9Ll.js";import{S as v,h as o,f as O,i as C,R as T,M as _}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const{useArgs:z}=__STORYBOOK_MODULE_PREVIEW_API__;function j(e){const[,b]=z(),{variant:y="switch"}=e;return a.jsx(o,{...e,onChange:y==="text"?e.onChange:f=>b({active:f})})}const R={title:"Design System/Toggle",component:o,tags:["autodocs"],render:j,args:{size:"m"},decorators:[e=>a.jsx(_,{style:{padding:24},children:a.jsx(e,{})})],parameters:{docs:{description:{component:O('Переключатель. `variant="text"` — только подпись. Опционально `size` (`xs` … `xl`, по умолчанию `m`).',T,C("Toggle","Main"),'```jsx\n<Toggle active={on} label="Мои" onChange={setOn} />\n```')}}},argTypes:{active:{control:"boolean"},label:{description:"Подпись."},variant:{options:["switch","text"],control:"radio"},style:{description:"Стили на кнопке-обёртке.",control:!1},disabled:{control:"boolean"},size:{options:v,control:"select"},onChange:{control:!1}}},n={name:"С подписью",args:{active:!0,label:"Мои"}},s={name:"Только switch",args:{active:!1}},r={name:"Только текст",args:{variant:"text",label:"Подпись без переключателя"}},t={name:"Размеры",parameters:{controls:{disable:!0}},render:()=>a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:v.map(e=>a.jsx(o,{size:e,active:!0,label:`size=${e}`,onChange:()=>{}},e))})},I=["WithLabel","SwitchOnly","TextOnly","SizeScale"];var u,c,i;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "С подписью",
  args: {
    active: true,
    label: "Мои"
  }
}`,...(i=(c=n.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var l,m,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Только switch",
  args: {
    active: false
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var d,g,x;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Только текст",
  args: {
    variant: "text",
    label: "Подпись без переключателя"
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var E,S,h;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Размеры",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>\r
      {SIZE_KEYS.map(size => <Toggle key={size} size={size} active label={\`size=\${size}\`} onChange={() => {}} />)}\r
    </div>
}`,...(h=(S=t.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};export{t as SizeScale,s as SwitchOnly,r as TextOnly,n as WithLabel,I as __namedExportsOrder,R as default};
