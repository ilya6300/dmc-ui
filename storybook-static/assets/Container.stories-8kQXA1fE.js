import{j as e}from"./iframe-BAdS09qN.js";import{R as y,C as n,i as E,M as h,B as S,t as A}from"./docsFragments-WzdrOMoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BMp2QMW5.js";import"./index-Cw6mF6u-.js";const i={control:"select",options:["start","end","center","stretch","between","around","evenly"]},k={title:"Design System/Container",component:n,tags:["autodocs"],decorators:[a=>e.jsx(h,{style:{padding:24,background:"#e2e8f0"},children:e.jsx(a,{})})],parameters:{docs:{description:{component:`
Flex-обёртка: по умолчанию строка (\`direction="row"\`), колонка — \`direction="col"\`. Выравнивание по главной и поперечной оси — ключи \`start\`, \`end\`, \`center\`, \`between\` (распределение по сторонам) и др.

${y}

${E("Container","Main")}

**Состав:** \`children\` — содержимое; опционально \`direction\` (\`row\` | \`col\`, по умолчанию \`row\`), \`justify\`, \`align\`, \`gap\`, \`w\`, \`style\`.

\`\`\`jsx
<Container direction="row" justify="between" gap={12}>
  <Box w="120px">A</Box>
  <Box w="120px">B</Box>
</Container>
\`\`\`
        `}}},argTypes:{direction:{description:"Главная ось: `row` (строка, по умолчанию) или `col` (колонка).",control:"select",options:["row","col"]},justify:{description:"Выравнивание по главной оси (`justify-content`).",...i},align:{description:"Выравнивание по поперечной оси (`align-items`).",...i},gap:{description:"Расстояние между детьми (px или CSS-строка)."},w:{description:"Ширина контейнера; по умолчанию `100%`."},children:{control:!1},style:{control:!1}}},r=a=>e.jsx(S,{w:"auto",style:{padding:12,minWidth:72},children:e.jsx("span",{style:{fontSize:14,color:A.textMuted},children:a})}),o={name:"Строка",render:()=>e.jsxs(n,{children:[r("1"),r("2")]})},t={name:"Колонка",render:()=>e.jsxs(n,{direction:"col",children:[r("1"),r("2")]})},s={name:"Строка, расход по сторонам",render:()=>e.jsxs(n,{direction:"row",justify:"between",children:[r("Слева"),r("Справа")]})},u={name:"Минимальный",render:()=>e.jsx(n,{children:"Только текст"})},F=["Default","Column","RowBetween","Minimal"];var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Строка",
  render: () => <Container>\r
      {demoBox("1")}\r
      {demoBox("2")}\r
    </Container>
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,p,x;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(B=(w=s.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var j,f,g;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Container>Только текст</Container>
}`,...(g=(f=u.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};export{t as Column,o as Default,u as Minimal,s as RowBetween,F as __namedExportsOrder,k as default};
