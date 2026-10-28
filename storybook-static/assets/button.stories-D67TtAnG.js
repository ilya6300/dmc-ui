import{j as r}from"./iframe-BV7CKJmH.js";import{R as v,B as n,i as h}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";const S={title:"Design System/Button",component:n,tags:["autodocs"],parameters:{docs:{description:{component:`
Кнопка действия. Внешний вид исходной кнопки (заливка, контур, тон, текст, ссылка, форма) без классов и без отдельного CSS.

${v}

${h("Button")}

**Состав:** \`children\` — подпись. Опционально \`variant\` (\`filled\` по умолчанию, \`outline\`, \`tonal\`, \`text\`, \`plain\`, \`link\`), \`color\` (\`primary\`, \`error\`, \`warning\`), \`size\` (\`sm\`, \`md\`, \`lg\`), \`shape\` (\`default\`, \`round\`, \`rounded\`, \`square\`), \`block\`, \`flat\`, \`loading\`, \`disabled\`, \`active\`, \`leftSection\`, \`rightSection\`, \`style\`.

Цвета берутся из \`useTheme().colors\`. \`loading\` и \`disabled\` не вызывают \`onClick\`.

\`\`\`jsx
<Button variant="filled">Сохранить</Button>
<Button variant="outline" color="error">Удалить</Button>
\`\`\`
        `}}},argTypes:{children:{description:"Подпись или содержимое кнопки."},variant:{description:"filled — заливка; outline — контур; tonal — лёгкий фон; text и plain — без заливки; link — ссылка без верхнего регистра."},color:{description:"primary — основной синий темы; error; warning."},size:{description:"sm, md (по умолчанию) или lg."},shape:{description:"default — скругление 4px; round — круг; rounded — капсула; square — без скругления."},block:{description:"Растянуть на всю ширину родителя."},flat:{description:"Без тени у filled и outline."},loading:{description:"Блокирует нажатие и снижает непрозрачность."},disabled:{description:"Неактивная кнопка."},active:{description:"Нажатый вид без клика."},leftSection:{control:!1,description:"Узел слева от подписи."},rightSection:{control:!1,description:"Узел справа от подписи."},style:{control:!1},onClick:{control:!1}}},e={name:"Заливка",args:{children:"Сохранить"}},t={name:"Минимальный",render:()=>r.jsx(n,{children:"OK"})},o={name:"Варианты",render:()=>r.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12},children:[r.jsx(n,{children:"Заливка"}),r.jsx(n,{variant:"outline",children:"Контур"}),r.jsx(n,{variant:"tonal",children:"Тон"}),r.jsx(n,{variant:"text",children:"Текст"}),r.jsx(n,{variant:"plain",children:"Plain"}),r.jsx(n,{variant:"link",children:"Ссылка"})]})},a={name:"Цвета",render:()=>r.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12},children:[r.jsx(n,{color:"primary",children:"Основная"}),r.jsx(n,{color:"error",children:"Ошибка"}),r.jsx(n,{color:"warning",children:"Внимание"})]})},C=["Default","Minimal","Variants","Colors"];var u,i,s;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Заливка",
  args: {
    children: "Сохранить"
  }
}`,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var l,c,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Button>OK</Button>
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,m,B;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Варианты",
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 12
  }}>\r
      <Button>Заливка</Button>\r
      <Button variant="outline">Контур</Button>\r
      <Button variant="tonal">Тон</Button>\r
      <Button variant="text">Текст</Button>\r
      <Button variant="plain">Plain</Button>\r
      <Button variant="link">Ссылка</Button>\r
    </div>
}`,...(B=(m=o.parameters)==null?void 0:m.docs)==null?void 0:B.source}}};var x,f,g;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Цвета",
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 12
  }}>\r
      <Button color="primary">Основная</Button>\r
      <Button color="error">Ошибка</Button>\r
      <Button color="warning">Внимание</Button>\r
    </div>
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};export{a as Colors,e as Default,t as Minimal,o as Variants,C as __namedExportsOrder,S as default};
