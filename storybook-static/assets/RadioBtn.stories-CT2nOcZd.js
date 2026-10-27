import{j as a,r as z}from"./iframe-BtHEu9Ll.js";import{S as f,R as B,b as i,i as C,M as D}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";function j({size:e}){const[o,r]=z.useState("more"),g=[{name:"Меньше",active:o==="less",action:()=>r("less")},{name:"Равно",active:o==="equal",action:()=>r("equal")},{name:"Больше",active:o==="more",action:()=>r("more")}];return a.jsx(i,{items:g,size:e})}const V={title:"Design System/RadioBtn",component:i,tags:["autodocs"],render:e=>a.jsx(i,{...e}),args:{size:"m"},decorators:[e=>a.jsx(D,{style:{padding:24},children:a.jsx(e,{})})],parameters:{docs:{description:{component:`
Горизонтальная группа chip-кнопок (кастомные «радио»). Состояние \`active\` и обработчик \`action\` задаются в каждом элементе \`items\`; взаимоисключение — на стороне родителя.

${B}

${C("RadioBtn","Main")}

\`\`\`jsx
const [value, setValue] = useState("more");

<RadioBtn
  items={[
    { name: "Меньше", active: value === "less", action: () => setValue("less") },
    { name: "Равно", active: value === "equal", action: () => setValue("equal") },
    { name: "Больше", active: value === "more", action: () => setValue("more") },
  ]}
/>
\`\`\`

**Состав:** обязательно \`items\` (\`name\`, \`active\`, \`action\`); опционально \`size\` (\`xs\` … \`xl\`), \`style\` на обёртке группы.
        `}}},argTypes:{items:{description:"Массив вариантов: name (подпись), active (выбран), action (клик).",control:!1},size:{options:f,control:"select"},style:{description:"Стили корневой обёртки.",control:!1}}},n={name:"Сравнение (Меньше / Равно / Больше)",render:e=>a.jsx(j,{size:e.size})},s={name:"Минимальный",args:{items:[{name:"A",active:!0,action:()=>{}},{name:"B",active:!1,action:()=>{}}]}},t={name:"Размеры",parameters:{controls:{disable:!0}},render:()=>a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:f.map(e=>a.jsx(i,{size:e,items:[{name:`${e}-1`,active:!0,action:()=>{}},{name:`${e}-2`,active:!1,action:()=>{}}]},e))})},_=["Comparison","Minimal","SizeScale"];var c,u,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Сравнение (Меньше / Равно / Больше)",
  render: args => <ComparisonDemo size={args.size} />
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var l,p,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    items: [{
      name: "A",
      active: true,
      action: () => {}
    }, {
      name: "B",
      active: false,
      action: () => {}
    }]
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var v,x,S;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Размеры",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>\r
      {SIZE_KEYS.map(size => <RadioBtn key={size} size={size} items={[{
      name: \`\${size}-1\`,
      active: true,
      action: () => {}
    }, {
      name: \`\${size}-2\`,
      active: false,
      action: () => {}
    }]} />)}\r
    </div>
}`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};export{n as Comparison,s as Minimal,t as SizeScale,_ as __namedExportsOrder,V as default};
