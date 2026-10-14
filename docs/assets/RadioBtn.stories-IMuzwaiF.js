import{j as a,T as d,r as v}from"./iframe-CiYZLyXL.js";import{R as x,b as l,i as B,M as C}from"./docsFragments-Drh3_ADq.js";import"./preload-helper-Dp1pzeXC.js";import"./index-UK0xwPLs.js";import"./index-DKkv2d_9.js";function D(){const[e,n]=v.useState("more"),p=[{name:"Меньше",active:e==="less",action:()=>n("less")},{name:"Равно",active:e==="equal",action:()=>n("equal")},{name:"Больше",active:e==="more",action:()=>n("more")}];return a.jsx(l,{items:p})}const T={title:"Design System/RadioBtn",component:l,tags:["autodocs"],decorators:[e=>a.jsx(d,{children:a.jsx(C,{style:{padding:24},children:a.jsx(e,{})})})],parameters:{docs:{description:{component:`
Горизонтальная группа chip-кнопок (кастомные «радио»). Состояние \`active\` и обработчик \`action\` задаются в каждом элементе \`items\`; взаимоисключение — на стороне родителя.

${x}

${B("RadioBtn","Main","ThemeProvider")}

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

**Состав:** обязательно \`items\` (\`name\`, \`active\`, \`action\`); опционально \`style\` на обёртке группы.
        `}}},argTypes:{items:{description:"Массив вариантов: name (подпись), active (выбран), action (клик).",control:!1},style:{description:"Стили корневой обёртки.",control:!1}}},t={name:"Сравнение (Меньше / Равно / Больше)",render:()=>a.jsx(D,{})},s={name:"Минимальный",args:{items:[{name:"A",active:!0,action:()=>{}},{name:"B",active:!1,action:()=>{}}]}},h=["Comparison","Minimal"];var o,r,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Сравнение (Меньше / Равно / Больше)",
  render: () => <ComparisonDemo />
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var u,m,c;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};export{t as Comparison,s as Minimal,h as __namedExportsOrder,T as default};
