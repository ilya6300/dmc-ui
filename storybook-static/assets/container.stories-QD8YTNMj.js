import{j as e}from"./iframe-BV7CKJmH.js";import{C as o,M as y,B as E}from"./theme-toggle-CEYbH-lm.js";import{R as h,i as S,t as A}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const i={control:"select",options:["start","end","center","stretch","between","around","evenly"]},F={title:"Design System/Container",component:o,tags:["autodocs"],decorators:[a=>e.jsx(y,{style:{padding:24,background:"#e2e8f0"},children:e.jsx(a,{})})],parameters:{docs:{description:{component:`
Flex-обёртка: по умолчанию строка (\`direction="row"\`), колонка — \`direction="col"\`. Выравнивание по главной и поперечной оси — ключи \`start\`, \`end\`, \`center\`, \`between\` (распределение по сторонам) и др.

${h}

${S("Container","Main")}

**Состав:** \`children\` — содержимое; опционально \`direction\` (\`row\` | \`col\`, по умолчанию \`row\`), \`justify\`, \`align\`, \`gap\`, \`w\`, \`style\`.

\`\`\`jsx
<Container direction="row" justify="between" gap={12}>
  <Box w="120px">A</Box>
  <Box w="120px">B</Box>
</Container>
\`\`\`
        `}}},argTypes:{direction:{description:"Главная ось: `row` (строка, по умолчанию) или `col` (колонка).",control:"select",options:["row","col"]},justify:{description:"Выравнивание по главной оси (`justify-content`).",...i},align:{description:"Выравнивание по поперечной оси (`align-items`).",...i},gap:{description:"Расстояние между детьми (px или CSS-строка)."},w:{description:"Ширина контейнера; по умолчанию `100%`."},children:{control:!1},style:{control:!1}}},r=a=>e.jsx(E,{w:"auto",style:{padding:12,minWidth:72},children:e.jsx("span",{style:{fontSize:14,color:A.textMuted},children:a})}),n={name:"Строка",render:()=>e.jsxs(o,{children:[r("1"),r("2")]})},t={name:"Колонка",render:()=>e.jsxs(o,{direction:"col",children:[r("1"),r("2")]})},s={name:"Строка, расход по сторонам",render:()=>e.jsxs(o,{direction:"row",justify:"between",children:[r("Слева"),r("Справа")]})},u={name:"Минимальный",render:()=>e.jsx(o,{children:"Только текст"})},T=["Default","Column","RowBetween","Minimal"];var c,d,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Строка",
  render: () => <Container>\r
      {demoBox("1")}\r
      {demoBox("2")}\r
    </Container>
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,p,x;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Колонка",
  render: () => <Container direction="col">\r
      {demoBox("1")}\r
      {demoBox("2")}\r
    </Container>
}`,...(x=(p=t.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var C,w,B;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Строка, расход по сторонам",
  render: () => <Container direction="row" justify="between">\r
      {demoBox("Слева")}\r
      {demoBox("Справа")}\r
    </Container>
}`,...(B=(w=s.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var f,j,g;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Container>Только текст</Container>
}`,...(g=(j=u.parameters)==null?void 0:j.docs)==null?void 0:g.source}}};export{t as Column,n as Default,u as Minimal,s as RowBetween,T as __namedExportsOrder,F as default};
