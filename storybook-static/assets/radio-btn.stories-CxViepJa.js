import{j as s,r as d}from"./iframe-BV7CKJmH.js";import{R as l,M as v}from"./theme-toggle-CEYbH-lm.js";import{R as x,i as B}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";function C(){const[e,o]=d.useState("more"),p=[{name:"Меньше",active:e==="less",action:()=>o("less")},{name:"Равно",active:e==="equal",action:()=>o("equal")},{name:"Больше",active:e==="more",action:()=>o("more")}];return s.jsx(l,{items:p})}const y={title:"Design System/RadioBtn",component:l,tags:["autodocs"],decorators:[e=>s.jsx(v,{style:{padding:24},children:s.jsx(e,{})})],parameters:{docs:{description:{component:`
Горизонтальная группа chip-кнопок (кастомные «радио»). Состояние \`active\` и обработчик \`action\` задаются в каждом элементе \`items\`; взаимоисключение — на стороне родителя.

${x}

${B("RadioBtn","Main")}

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
        `}}},argTypes:{items:{description:"Массив вариантов: name (подпись), active (выбран), action (клик).",control:!1},style:{description:"Стили корневой обёртки.",control:!1}}},a={name:"Сравнение (Меньше / Равно / Больше)",render:()=>s.jsx(C,{})},t={name:"Минимальный",args:{items:[{name:"A",active:!0,action:()=>{}},{name:"B",active:!1,action:()=>{}}]}},M=["Comparison","Minimal"];var n,r,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Сравнение (Меньше / Равно / Больше)",
  render: () => <ComparisonDemo />
}`,...(i=(r=a.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var u,m,c;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};export{a as Comparison,t as Minimal,M as __namedExportsOrder,y as default};
